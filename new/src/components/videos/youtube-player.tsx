"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTrackLearningProgress, useCompleteModule } from '@/lib/learningTracker';
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  courseId: number;
  moduleId: number;
  title?: string;
}

export function YouTubePlayer({ 
  videoId, 
  courseId, 
  moduleId, 
  title = "Video Content" 
}: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const playerElementRef = useRef<HTMLDivElement>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [watchProgress, setWatchProgress] = useState(0);
  const [lastTrackedTime, setLastTrackedTime] = useState(0);
  const trackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { trackProgress } = useTrackLearningProgress();
  const { completeModule, isLoading: isCompletingModule } = useCompleteModule();
  const { toast } = useToast();

  // Load YouTube API
  useEffect(() => {
    // Only load the script once
    if (!document.getElementById('youtube-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = initializePlayer;

    // Check if YT is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      if (trackIntervalRef.current) {
        clearInterval(trackIntervalRef.current);
      }
    };
  }, [videoId]);

  // Initialize YouTube player
  const initializePlayer = () => {
    if (!playerElementRef.current) return;
    
    playerRef.current = new window.YT.Player(playerElementRef.current, {
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  };

  // Handle player ready event
  const onPlayerReady = (event: any) => {
    setPlayerReady(true);
    setDuration(event.target.getDuration());
  };

  // Handle player state changes
  const onPlayerStateChange = (event: any) => {
    const playerState = event.data;
    
    // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (playerState === 1) { // Playing
      setIsPlaying(true);
      startTrackingInterval();
    } else if (playerState === 2) { // Paused
      setIsPlaying(false);
      stopTrackingInterval();
      // Track the segment that was watched
      trackWatchedSegment(false);
    } else if (playerState === 0) { // Ended
      setIsPlaying(false);
      stopTrackingInterval();
      trackWatchedSegment(false);
      
      // Update progress to 100%
      setWatchProgress(100);
      
      // Check if watch percentage is high enough to mark as completed
      if (watchProgress > 85) {
        handleCompleteModule();
      }
    }
  };

  // Start tracking interval
  const startTrackingInterval = () => {
    if (trackIntervalRef.current) {
      clearInterval(trackIntervalRef.current);
    }
    
    // Set last tracked time to current time
    setLastTrackedTime(playerRef.current.getCurrentTime());
    
    // Track progress every 5 seconds
    trackIntervalRef.current = setInterval(() => {
      if (playerRef.current && isPlaying) {
        const currentTime = playerRef.current.getCurrentTime();
        const watchedSegmentLength = currentTime - lastTrackedTime;
        
        // Update progress percentage
        const newProgress = Math.min(
          Math.floor((currentTime / duration) * 100),
          100
        );
        setWatchProgress(newProgress);
        
        // If we've watched at least 3 seconds, track it
        if (watchedSegmentLength >= 3) {
          trackWatchedSegment(false);
          setLastTrackedTime(currentTime);
        }
      }
    }, 5000);
  };

  // Stop tracking interval
  const stopTrackingInterval = () => {
    if (trackIntervalRef.current) {
      clearInterval(trackIntervalRef.current);
      trackIntervalRef.current = null;
    }
  };

  // Track watched segment on blockchain
  const trackWatchedSegment = async (isSkip: boolean) => {
    if (!playerRef.current || !playerReady) return;
    
    const currentTime = playerRef.current.getCurrentTime();
    const segmentStart = Math.floor(lastTrackedTime);
    const segmentEnd = Math.floor(currentTime);
    
    // Only track if there's a meaningful segment
    if (segmentEnd - segmentStart < 1) return;
    
    const timestamp = Math.floor(Date.now() / 1000);
    
    try {
      await trackProgress(
        courseId,
        moduleId,
        timestamp,
        segmentStart,
        segmentEnd,
        isSkip
      );
    } catch (error) {
      console.error("Error tracking progress:", error);
    }
  };

  // Handle seek events
  useEffect(() => {
    const handleSeek = () => {
      if (!playerRef.current || !isPlaying) return;
      
      const currentTime = playerRef.current.getCurrentTime();
      const timeDiff = Math.abs(currentTime - lastTrackedTime);
      
      // If the time difference is greater than 3 seconds, consider it a seek
      if (timeDiff > 3) {
        trackWatchedSegment(true); // Mark as a skip
        setLastTrackedTime(currentTime);
      }
    };

    // Add event listener for seek
    const playerElement = playerElementRef.current;
    if (playerElement) {
      playerElement.addEventListener('seeked', handleSeek);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener('seeked', handleSeek);
      }
    };
  }, [isPlaying, lastTrackedTime]);

  // Handle complete module
  const handleCompleteModule = async () => {
    try {
      await completeModule(courseId, moduleId);
      toast({
        title: "Module Completed!",
        description: "Your progress has been recorded on the blockchain.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error completing module:", error);
      toast({
        title: "Error",
        description: "Failed to mark module as completed.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-0 overflow-hidden">
        <div className="aspect-video">
          <div ref={playerElementRef} className="w-full h-full" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <div className="flex justify-between items-center">
            <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mr-4">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${watchProgress}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{watchProgress}%</span>
          </div>
          {watchProgress > 85 && (
            <Button
              className="mt-4"
              onClick={handleCompleteModule}
              disabled={isCompletingModule}
            >
              {isCompletingModule ? "Completing..." : "Mark as Completed"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 