"use client";

import { useContractWrite, useContractRead, useAccount } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { parseEther } from 'viem';

// Smart contract ABI (Application Binary Interface)
export const LearningTrackerABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      }
    ],
    "name": "CourseCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "moduleId",
        "type": "uint256"
      }
    ],
    "name": "ModuleCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "moduleId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "watchedDuration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isSkip",
        "type": "bool"
      }
    ],
    "name": "ProgressUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "moduleId",
        "type": "uint256"
      }
    ],
    "name": "completeModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "moduleId",
        "type": "uint256"
      }
    ],
    "name": "getProgress",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "watchedDuration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "seekCount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "watchPercentage",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "moduleId",
        "type": "uint256"
      }
    ],
    "name": "isModuleCompleted",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "courseId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "moduleId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "segmentStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "segmentEnd",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isSkip",
        "type": "bool"
      }
    ],
    "name": "trackProgress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address on Polygon Amoy testnet
export const LEARNING_TRACKER_ADDRESS = "0x123456789abcdef123456789abcdef123456789a"; // Replace with actual deployed contract address

/**
 * Hook to track learning progress
 */
export function useTrackLearningProgress() {
  const { address } = useAccount();
  
  const { writeAsync, status } = useContractWrite({
    address: LEARNING_TRACKER_ADDRESS,
    abi: LearningTrackerABI,
    functionName: 'trackProgress',
  });
  
  // Track progress on the blockchain
  const trackProgress = async (
    courseId: number,
    moduleId: number,
    timestamp: number,
    segmentStart: number,
    segmentEnd: number,
    isSkip: boolean
  ) => {
    if (!address) return null;
    
    try {
      const tx = await writeAsync({
        args: [
          address, 
          BigInt(courseId), 
          BigInt(moduleId), 
          BigInt(timestamp), 
          BigInt(segmentStart), 
          BigInt(segmentEnd), 
          isSkip
        ],
      });
      
      return tx;
    } catch (error) {
      console.error("Error tracking progress:", error);
      return null;
    }
  };
  
  return { trackProgress, status };
}

/**
 * Hook to complete module
 */
export function useCompleteModule() {
  const { address } = useAccount();
  
  const { writeAsync, status, isLoading } = useContractWrite({
    address: LEARNING_TRACKER_ADDRESS,
    abi: LearningTrackerABI,
    functionName: 'completeModule',
  });
  
  // Mark module as completed on the blockchain
  const completeModule = async (courseId: number, moduleId: number) => {
    if (!address) return null;
    
    try {
      const tx = await writeAsync({
        args: [address, BigInt(courseId), BigInt(moduleId)],
      });
      
      return tx;
    } catch (error) {
      console.error("Error completing module:", error);
      return null;
    }
  };
  
  return { completeModule, status, isLoading };
}

/**
 * Hook to check if module is completed
 */
export function useIsModuleCompleted(courseId: number, moduleId: number) {
  const { address } = useAccount();
  
  const { data, isLoading, refetch } = useContractRead({
    address: LEARNING_TRACKER_ADDRESS,
    abi: LearningTrackerABI,
    functionName: 'isModuleCompleted',
    args: address ? [address, BigInt(courseId), BigInt(moduleId)] : undefined,
    enabled: !!address,
  });
  
  return { isCompleted: data as boolean | undefined, isLoading, refetch };
}

/**
 * Hook to get module progress details
 */
export function useGetModuleProgress(courseId: number, moduleId: number) {
  const { address } = useAccount();
  
  const { data, isLoading, refetch } = useContractRead({
    address: LEARNING_TRACKER_ADDRESS,
    abi: LearningTrackerABI,
    functionName: 'getProgress',
    args: address ? [address, BigInt(courseId), BigInt(moduleId)] : undefined,
    enabled: !!address,
  });
  
  const progress = data as [bigint, bigint, boolean, bigint] | undefined;
  
  // Format the data if available
  const formattedData = progress ? {
    watchedDuration: Number(progress[0]),
    seekCount: Number(progress[1]),
    completed: progress[2],
    watchPercentage: Number(progress[3]),
  } : undefined;
  
  return { progress: formattedData, isLoading, refetch };
} 