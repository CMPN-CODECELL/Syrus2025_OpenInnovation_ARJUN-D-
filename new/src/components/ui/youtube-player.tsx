"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useVideoTracking, useIsVideoCompleted, trackVideoProgress, markVideoAsCompleted } from '@/lib/videoVerification';
import { ConnectButton } from '@/components/wallet/connect-button';
import { useAccount } from 'wagmi';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Play, Pause, SkipForward, RotateCcw, CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    YT: {
      loaded: number;
      ready: (callback: () => void) => void;
      Player: any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YoutubePlayerProps {
  videoId: string;
  title?: string;
  description?: string;
  onComplete?: () => void;
}

export function YoutubePlayer({ videoId, title, description, onComplete }: YoutubePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const [isYouTubeApiReady, setIsYouTubeApiReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playerState, setPlayerState] = useState(-1);
  const [lastTimeReported, setLastTimeReported] = useState(0);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  
  // Blockchain integration
  const { updatePosition, progress, isRegistered } = useVideoTracking(videoId, videoDuration);
  const { isCompleted } = useIsVideoCompleted(videoId);
  
  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else if (window.YT.loaded) {
      initializePlayer();
    } else {
      window.YT.ready(initializePlayer);
    }
    
    return () => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Initialize YouTube player
  const initializePlayer = () => {
    if (playerRef.current && !youtubePlayerRef.current) {
      try {
        youtubePlayerRef.current = new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            fs: 1,
            modestbranding: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
      }
    }
  };

  // Handle player ready event
  const onPlayerReady = (event: any) => {
    // Get video duration
    const duration = event.target.getDuration();
    setVideoDuration(duration);
    
    // Set up interval to track time
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
    }
    
    timeUpdateIntervalRef.current = setInterval(() => {
      if (youtubePlayerRef.current && isPlaying && !isBuffering) {
        try {
          const currentTime = youtubePlayerRef.current.getCurrentTime();
          setCurrentTime(currentTime);
          
          // Report to blockchain if time has changed by at least 1 second
          if (Math.abs(currentTime - lastTimeReported) >= 1) {
            updatePosition(Math.floor(currentTime));
            setLastTimeReported(currentTime);
          }
        } catch (error) {
          console.error("Error getting current time:", error);
        }
      }
    }, 1000);
  };

  // Handle player state changes
  const onPlayerStateChange = (event: any) => {
    const newState = event.data;
    setPlayerState(newState);
    
    // YT.PlayerState values: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    switch (newState) {
      case 1: // playing
        setIsPlaying(true);
        setIsBuffering(false);
        break;
      case 2: // paused
        setIsPlaying(false);
        try {
          updatePosition(Math.floor(youtubePlayerRef.current.getCurrentTime()));
        } catch (error) {
          console.error("Error updating position on pause:", error);
        }
        break;
      case 3: // buffering
        setIsBuffering(true);
        break;
      case 0: // ended
        setIsPlaying(false);
        try {
          // Report final position to ensure complete playback is recorded
          const finalPosition = Math.floor(youtubePlayerRef.current.getDuration());
          updatePosition(finalPosition);
          
          // Check if the video is marked as completed on the blockchain
          if (progress?.completed && onComplete) {
            toast({
              title: "Video completed!",
              description: "Your progress has been recorded on the blockchain.",
              duration: 5000,
            });
            onComplete();
          }
        } catch (error) {
          console.error("Error updating position on end:", error);
        }
        break;
    }
  };

  // Progress percentage calculation
  const progressPercentage = progress?.watchedPercentage || 0;
  
  // Render wallet connection prompt if not connected
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-medium">Connect Your Wallet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          To track your learning progress on the blockchain, you need to connect your Polygon Amoy wallet.
        </p>
        <ConnectButton />
      </div>
    );
  }
  
  // Render completed state if video is already completed
  if (isCompleted) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-center justify-center p-8 space-y-4 border rounded-lg bg-green-50 dark:bg-green-900">
          <h3 className="text-lg font-medium">Video Completed!</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            You've already completed this video. Your achievement is stored on the blockchain.
          </p>
          
          {/* Allow rewatching */}
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              if (playerRef.current && !youtubePlayerRef.current) {
                try {
                  // Reinitialize player if needed
                  youtubePlayerRef.current = new window.YT.Player(playerRef.current, {
                    videoId: videoId,
                    playerVars: { autoplay: 1 },
                  });
                } catch (error) {
                  console.error("Error reinitializing player:", error);
                }
              }
            }}
          >
            Watch Again
          </button>
        </div>
        
        {/* Still show the video for reference */}
        <div className="aspect-video">
          <div ref={playerRef} className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-md overflow-hidden relative">
        <div ref={playerRef} className="w-full h-full" />
        
        {/* Blockchain verification badge */}
        {isConnected && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white">
              <div className="flex items-center gap-1.5">
                {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : null}
                <span>Blockchain Verified</span>
              </div>
            </Badge>
          </div>
        )}
        
        {/* Loading indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        )}
      </div>
      
      {/* Custom controls */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {playerState === 1 ? (
              <Button onClick={() => youtubePlayerRef.current.pauseVideo()} variant="outline" size="icon">
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => youtubePlayerRef.current.playVideo()} variant="outline" size="icon">
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={() => youtubePlayerRef.current.seekTo(0)} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={() => youtubePlayerRef.current.seekTo(Math.min(youtubePlayerRef.current.getCurrentTime() + 10, videoDuration))} variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, '0')}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Video information */}
      {(title || description) && (
        <Card>
          <CardContent className="p-4">
            {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </CardContent>
        </Card>
      )}
      
      {/* Wallet connection warning */}
      {!isConnected && (
        <div className="text-sm text-muted-foreground italic">
          Connect your wallet to track progress and verify completion on the blockchain
        </div>
      )}
    </div>
  );
} 