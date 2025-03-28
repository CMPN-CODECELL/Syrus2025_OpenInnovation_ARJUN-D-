"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWatchContractEvent, Address } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { parseEther } from 'viem';
import { polygonAmoy } from 'wagmi/chains';

// Contract ABI for VideoVerification
const VIDEO_VERIFICATION_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "position",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "HeartbeatReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "segmentIndex",
        "type": "uint256"
      }
    ],
    "name": "SegmentWatched",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fromPosition",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "toPosition",
        "type": "uint256"
      }
    ],
    "name": "SkipDetected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "watchTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "skipCount",
        "type": "uint256"
      }
    ],
    "name": "VideoCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "VideoRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      }
    ],
    "name": "getVideoProgress",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "watchedPercentage",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "skipCount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserVideos",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      }
    ],
    "name": "isVideoCompleted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "penalize",
        "type": "bool"
      }
    ],
    "name": "penalizeExcessiveSkipping",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "segmentSize",
        "type": "uint256"
      }
    ],
    "name": "registerVideo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "videoId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "position",
        "type": "uint256"
      }
    ],
    "name": "reportProgress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address for VideoVerification - Replace with a placeholder for mock functionality
// We'll use a mock approach since the real contract isn't deployed yet
const VIDEO_VERIFICATION_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`;

// Mock data store for testing without a real blockchain connection
const mockVideoData = new Map();

// Simplified interface for video progress data
export interface VideoProgress {
  address: Address;
  currentTime: number;
  duration: number;
  watchedPercentage: number;
  seekCount: number;
  playbackRateChanges: number;
  completed?: boolean;
  lastUpdated?: number;
}

// Learning tracker contract address and ABI
const LEARNING_TRACKER_CONTRACT = '0x1234567890123456789012345678901234567890' as Address; // Replace with actual contract address

const LEARNING_TRACKER_ABI = [
  {
    inputs: [
      { name: 'videoId', type: 'string' },
      { name: 'student', type: 'address' }
    ],
    name: 'isVideoCompleted',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'videoId', type: 'string' },
      { name: 'watchedPercentage', type: 'uint256' },
      { name: 'seekCount', type: 'uint256' },
      { name: 'playbackRateChanges', type: 'uint256' }
    ],
    name: 'trackVideoProgress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'videoId', type: 'string' },
      { name: 'student', type: 'address' }
    ],
    name: 'markVideoCompleted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'videoId', type: 'string' },
      { name: 'student', type: 'address' }
    ],
    name: 'getVideoProgress',
    outputs: [
      { name: 'watchedPercentage', type: 'uint256' },
      { name: 'seekCount', type: 'uint256' },
      { name: 'playbackRateChanges', type: 'uint256' },
      { name: 'completed', type: 'bool' },
      { name: 'lastUpdated', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'student', type: 'address' }],
    name: 'getStudentVideos',
    outputs: [{ name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function'
  }
];

// In-memory progress cache to reduce blockchain calls
const progressCache = new Map<string, VideoProgress>();

/**
 * Track video progress on the blockchain
 */
export async function trackVideoProgress(videoId: string, progress: VideoProgress): Promise<void> {
  try {
    // Cache progress data
    const cacheKey = `${progress.address}-${videoId}`;
    progressCache.set(cacheKey, progress);
    
    // Mock blockchain interaction (replace with actual contract call in production)
    console.log(`Tracking progress for video ${videoId}:`, progress);
    
    // In a real implementation, this would call the smart contract
    // The mock simulates the tracking by just logging and updating the cache
    
    // Return a resolved promise to simulate successful tracking
    return Promise.resolve();
  } catch (error) {
    console.error("Error tracking video progress:", error);
    return Promise.reject(error);
  }
}

/**
 * Mark a video as completed on the blockchain
 */
export async function markVideoAsCompleted(videoId: string, address: Address): Promise<void> {
  try {
    // Update the cache to mark as completed
    const cacheKey = `${address}-${videoId}`;
    const currentProgress = progressCache.get(cacheKey);
    
    if (currentProgress) {
      progressCache.set(cacheKey, {
        ...currentProgress,
        completed: true,
        lastUpdated: Date.now()
      });
    }
    
    console.log(`Marking video ${videoId} as completed for ${address}`);
    
    // In a real implementation, this would call the smart contract
    // The mock simulates the completion by just logging and updating the cache
    
    // Return a resolved promise to simulate successful completion
    return Promise.resolve();
  } catch (error) {
    console.error("Error marking video as completed:", error);
    return Promise.reject(error);
  }
}

// Hook to register a video with the smart contract
export function useRegisterVideo() {
  const { writeContractAsync, isPending, error, data } = useWriteContract();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const registerVideo = async (videoId: string, duration: number, segmentSize: number = 5) => {
    if (!videoId || duration <= 0) return;
    
    try {
      setIsLoading(true);
      
      // Use mock functionality instead of actual blockchain call
      if (!mockVideoData.has(videoId)) {
        mockVideoData.set(videoId, {
          duration,
          segmentSize,
          watchedSegments: 0,
          segmentCount: Math.ceil(duration / segmentSize),
          skipCount: 0,
          completed: false,
          currentPosition: 0,
          lastUpdate: Date.now(),
        });
      }
      
      setIsSuccess(true);
      setTxHash("0x1234567890123456789012345678901234567890123456789012345678901234" as `0x${string}`);
    } catch (e) {
      console.error('Error registering video:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerVideo,
    isLoading: isLoading || isPending,
    isSuccess,
    isError: !!error,
    error,
    txHash,
  };
}

// Hook to report progress for a video
export function useReportProgress() {
  const { writeContractAsync, isPending, error, data } = useWriteContract();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const reportProgress = async (videoId: string, position: number) => {
    if (!videoId) return;
    
    try {
      setIsLoading(true);
      
      // Use mock functionality instead of actual blockchain call
      if (mockVideoData.has(videoId)) {
        const videoData = mockVideoData.get(videoId);
        const now = Date.now();
        const timeDelta = (now - videoData.lastUpdate) / 1000; // in seconds
        const positionDelta = position - videoData.currentPosition;
        
        // Skip detection logic
        if (positionDelta > timeDelta + 2 && position > videoData.currentPosition + 10) {
          videoData.skipCount++;
        }
        
        // Mark segments as watched
        const currentSegment = Math.floor(position / videoData.segmentSize);
        const previousSegments = Math.floor(videoData.currentPosition / videoData.segmentSize);
        
        if (currentSegment > previousSegments) {
          videoData.watchedSegments = Math.max(videoData.watchedSegments, currentSegment);
        }
        
        // Update current position and timestamp
        videoData.currentPosition = position;
        videoData.lastUpdate = now;
        
        // Check if video is completed
        if (videoData.watchedSegments >= videoData.segmentCount - 1 && 
            position >= videoData.duration * 0.95) { // 95% of the duration
          videoData.completed = true;
        }
        
        mockVideoData.set(videoId, videoData);
      }
      
      setIsSuccess(true);
      setTxHash("0x1234567890123456789012345678901234567890123456789012345678901234" as `0x${string}`);
    } catch (e) {
      console.error('Error reporting progress:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    reportProgress,
    isLoading: isLoading || isPending,
    isSuccess,
    isError: !!error,
    error,
    txHash,
  };
}

// Hook to get video completion status
export function useIsVideoCompleted(videoId: string) {
  const { address, isConnected } = useAccount();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { data, isLoading: contractLoading } = useReadContract({
    abi: VIDEO_VERIFICATION_ABI,
    address: VIDEO_VERIFICATION_ADDRESS,
    functionName: 'isVideoCompleted',
    args: [address as `0x${string}`, videoId],
  });
  
  useEffect(() => {
    setIsLoading(contractLoading);
    if (data !== undefined) {
      setIsCompleted(!!data);
    } else {
      // Check cache if contract call failed
      if (address) {
        const cacheKey = `${address}-${videoId}`;
        const cachedProgress = progressCache.get(cacheKey);
        if (cachedProgress) {
          setIsCompleted(!!cachedProgress.completed);
        }
      }
    }
  }, [data, address, videoId, contractLoading]);
  
  return { isCompleted, isLoading };
}

// Hook to get video progress
export function useVideoProgress(videoId: string) {
  const { address, isConnected } = useAccount();
  const [progress, setProgress] = useState<VideoProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { data, isLoading: contractLoading } = useReadContract({
    abi: VIDEO_VERIFICATION_ABI,
    address: VIDEO_VERIFICATION_ADDRESS,
    functionName: 'getVideoProgress',
    args: [videoId],
  });
  
  useEffect(() => {
    setIsLoading(contractLoading);
    
    if (data) {
      // Parse data from contract response
      const [watchedPercentage, seekCount, playbackRateChanges, completed, lastUpdated] = data as [
        number,
        number,
        number,
        boolean,
        number
      ];
      
      setProgress({
        address: address as Address,
        currentTime: 0, // Not returned from contract
        duration: 0, // Not returned from contract
        watchedPercentage: Number(watchedPercentage),
        seekCount: Number(seekCount),
        playbackRateChanges: Number(playbackRateChanges),
        completed,
        lastUpdated: Number(lastUpdated) * 1000 // Convert from seconds to milliseconds
      });
    } else if (address) {
      // Check cache if contract call failed
      const cacheKey = `${address}-${videoId}`;
      const cachedProgress = progressCache.get(cacheKey);
      if (cachedProgress) {
        setProgress(cachedProgress);
      }
    }
  }, [data, address, videoId, contractLoading]);
  
  return { progress, isLoading };
}

// Hook to handle video tracking with real-time heartbeats
export function useVideoTracking(videoId: string, duration: number) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [lastReportTime, setLastReportTime] = useState(0);
  const [heartbeatInterval, setHeartbeatInterval] = useState<NodeJS.Timeout | null>(null);

  const { registerVideo, isSuccess: isRegistered } = useRegisterVideo();
  const { reportProgress } = useReportProgress();
  const { progress, refetch: refetchProgress } = useVideoProgress(videoId);
  
  // Register the video if not already done
  useEffect(() => {
    if (videoId && duration > 0 && !isInitialized) {
      registerVideo(videoId, duration);
      setIsInitialized(true);
    }
  }, [videoId, duration, isInitialized, registerVideo]);

  // Set up heartbeat interval for reporting progress
  useEffect(() => {
    if (isRegistered && !heartbeatInterval) {
      const interval = setInterval(() => {
        // Only report if position has changed or it's been more than 10 seconds
        const now = Date.now();
        if (currentPosition > 0 && (now - lastReportTime > 10000)) {
          reportProgress(videoId, currentPosition);
          setLastReportTime(now);
          refetchProgress();
        }
      }, 5000); // Send heartbeat every 5 seconds
      
      setHeartbeatInterval(interval);
      
      return () => {
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
        }
      };
    }
    
    return () => {};
  }, [isRegistered, heartbeatInterval, currentPosition, lastReportTime, videoId, reportProgress, refetchProgress]);

  // Update position
  const updatePosition = (position: number) => {
    setCurrentPosition(position);
    
    // If we haven't reported in the last 5 seconds, report immediately on seek
    const now = Date.now();
    if (now - lastReportTime > 5000) {
      reportProgress(videoId, position);
      setLastReportTime(now);
      refetchProgress();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, [heartbeatInterval]);

  return {
    updatePosition,
    progress,
    isRegistered,
  };
}

// Hook to get all user videos
export function useUserVideos() {
  const { address, isConnected } = useAccount();
  const [videos, setVideos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { data, isLoading: contractLoading } = useReadContract({
    abi: VIDEO_VERIFICATION_ABI,
    address: VIDEO_VERIFICATION_ADDRESS,
    functionName: 'getUserVideos',
    args: [address as `0x${string}`],
  });
  
  useEffect(() => {
    setIsLoading(contractLoading);
    if (data) {
      setVideos(data as string[]);
    }
  }, [data, contractLoading]);
  
  return { videos, isLoading };
} 