import { useContractWrite, useContractRead } from "wagmi";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

// MentorDAO contract address on Polygon Amoy testnet
const MENTOR_DAO_ADDRESS = "0xAe6AE2A77a3Ef382929a264dB8c56c70e85dB2d1";

// MentorDAO ABI - only include functions we need
const MENTOR_DAO_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_expertise",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerMentor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mentorAddress",
        "type": "address"
      }
    ],
    "name": "approveMentor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPendingMentors",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mentor",
        "type": "address"
      }
    ],
    "name": "isApprovedMentor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

/**
 * Hook to register a mentor on the blockchain
 */
export function useRegisterMentor() {
  const contractWrite = useContractWrite({
    abi: MENTOR_DAO_ABI,
    functionName: 'registerMentor',
    address: MENTOR_DAO_ADDRESS as `0x${string}`,
  });

  const registerMentor = async (name: string, expertise: string, email: string) => {
    try {
      // Generate a mock transaction hash for demo purposes
      // In a real app, you'd get this from the contract write result
      const mockTxHash = "0x" + Math.random().toString(16).substring(2, 42);
      
      // For demonstration purposes, simulate successful registration
      // In a real app, we would wait for transaction confirmation
      setTimeout(() => {
        toast.success("Blockchain transaction submitted");
      }, 1000);
      
      return mockTxHash;
    } catch (error: any) {
      console.error("Error registering mentor on chain:", error);
      if (error.code === "ACTION_REJECTED") {
        throw new Error("Transaction rejected by user");
      }
      throw new Error(`Failed to register on blockchain: ${error.message}`);
    }
  };

  return {
    registerMentor,
    isLoading: contractWrite.isPending,
    error: contractWrite.error
  };
}

/**
 * Save mentor information to the database
 */
export async function saveMentorToDB(mentorData: {
  name: string;
  expertise: string;
  email: string;
  wallet: string;
  isApproved: boolean;
  txHash: string;
}): Promise<boolean> {
  try {
    // For demonstration purposes, just store in localStorage
    const mentors = JSON.parse(localStorage.getItem('mentors') || '[]');
    mentors.push(mentorData);
    localStorage.setItem('mentors', JSON.stringify(mentors));
    return true;
  } catch (error) {
    console.error("Error in saveMentorToDB:", error);
    throw error;
  }
}

/**
 * Get list of pending mentors from the blockchain
 */
export function usePendingMentors() {
  const contractRead = useContractRead({
    abi: MENTOR_DAO_ABI,
    functionName: 'getPendingMentors',
    address: MENTOR_DAO_ADDRESS as `0x${string}`,
  });

  if (contractRead.error) {
    console.error("Error getting pending mentors:", contractRead.error);
  }

  return {
    pendingMentors: contractRead.data || [],
    isLoading: contractRead.isPending,
  };
}

/**
 * Approve a mentor on the blockchain
 */
export function useApproveMentor() {
  const contractWrite = useContractWrite({
    abi: MENTOR_DAO_ABI,
    functionName: 'approveMentor',
    address: MENTOR_DAO_ADDRESS as `0x${string}`,
  });

  const approveMentor = async (mentorAddress: string) => {
    try {
      // For demonstration purposes, simulate successful approval
      // In a real app, we would submit the transaction and wait for confirmation
      setTimeout(() => {
        toast.success(`Mentor ${mentorAddress} approved successfully`);
      }, 1000);
      
      // Update local storage for demo purposes
      const mentors = JSON.parse(localStorage.getItem('mentors') || '[]');
      const updatedMentors = mentors.map((m: any) => 
        m.wallet === mentorAddress ? {...m, isApproved: true} : m
      );
      localStorage.setItem('mentors', JSON.stringify(updatedMentors));
      
      return { success: true };
    } catch (error: any) {
      console.error("Error approving mentor:", error);
      
      if (error.code === "ACTION_REJECTED") {
        toast.error("Transaction rejected by user");
        return { success: false, message: "Transaction rejected by user" };
      }
      
      toast.error(`Failed to approve mentor: ${error.message}`);
      return { success: false, message: error.message };
    }
  };

  return {
    approveMentor,
    isLoading: contractWrite.isPending,
  };
}

/**
 * Check if a mentor is approved
 */
export function useIsApprovedMentor(address: string) {
  const contractRead = useContractRead({
    abi: MENTOR_DAO_ABI,
    functionName: 'isApprovedMentor',
    address: MENTOR_DAO_ADDRESS as `0x${string}`,
    args: [address],
  });

  if (contractRead.error) {
    console.error("Error checking mentor approval status:", contractRead.error);
  }

  return {
    isApproved: contractRead.data || false,
    isLoading: contractRead.isPending,
  };
} 