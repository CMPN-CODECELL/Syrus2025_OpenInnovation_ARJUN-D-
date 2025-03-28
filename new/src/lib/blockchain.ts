import { ethers } from 'ethers';
import * as mentorDAOModule from './blockchain/mentorDAO';

// Types for blockchain verification
export interface BlockchainVerification {
  transactionHash: string;
  verifiedDate: Date;
  blockNumber: number;
  verifier: string;
}

// Mock contract ABI for the Proof of Mentorship (PoM) contract
const POM_CONTRACT_ABI = [
  "function verifySkill(address user, string ipfsHash, uint8 level, string category) external returns (uint256)",
  "function verifyProject(address user, string ipfsHash, string[] skills) external returns (uint256)",
  "function verifyCertificate(address user, string ipfsHash, string issuer) external returns (uint256)",
  "function verifyMentorship(address user, string ipfsHash, address mentor) external returns (uint256)",
  "function getVerification(uint256 verificationId) external view returns (address user, string ipfsHash, uint256 timestamp, address verifier)",
  "function getUserVerifications(address user) external view returns (uint256[])",
];

// Mock contract addresses for different networks
const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet
  '1': '0x1234567890123456789012345678901234567890',
  // Polygon Mainnet
  '137': '0x2345678901234567890123456789012345678901',
  // zkSync Era Mainnet
  '324': '0x3456789012345678901234567890123456789012',
  // Testnet (Goerli)
  '5': '0x4567890123456789012345678901234567890123',
};

/**
 * Get an instance of the PoM contract for the current network
 * @param provider Ethereum provider
 * @returns Contract instance
 */
export async function getPomContract(provider: ethers.BrowserProvider) {
  try {
    const network = await provider.getNetwork();
    const chainId = network.chainId.toString();
    
    const contractAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
    
    if (!contractAddress) {
      throw new Error(`No contract address available for chain ID ${chainId}`);
    }
    
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, POM_CONTRACT_ABI, signer);
  } catch (error) {
    console.error("Error getting PoM contract:", error);
    throw error;
  }
}

/**
 * Get the Ethereum provider from the browser
 * @returns Ethereum provider
 */
export async function getProvider(): Promise<ethers.BrowserProvider | null> {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      console.warn("MetaMask not installed");
      return null;
    }
    
    // Create provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  } catch (error) {
    console.error("Error getting provider:", error);
    return null;
  }
}

/**
 * Verify a skill on the blockchain
 * @param ipfsHash IPFS hash of the skill data
 * @param level Skill level (1-5)
 * @param category Skill category
 * @returns Transaction receipt
 */
export async function verifySkillOnBlockchain(
  ipfsHash: string,
  level: number,
  category: string
): Promise<BlockchainVerification | null> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    const contract = await getPomContract(provider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Verify skill on the blockchain
    const tx = await contract.verifySkill(address, ipfsHash, level, category);
    const receipt = await tx.wait();
    
    if (receipt && receipt.blockNumber) {
      const block = await provider.getBlock(receipt.blockNumber);
      
      return {
        transactionHash: receipt.hash,
        verifiedDate: new Date(Number(block?.timestamp) * 1000),
        blockNumber: receipt.blockNumber,
        verifier: address,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error verifying skill on blockchain:", error);
    return null;
  }
}

/**
 * Verify a project on the blockchain
 * @param ipfsHash IPFS hash of the project data
 * @param skills Skills used in the project
 * @returns Transaction receipt
 */
export async function verifyProjectOnBlockchain(
  ipfsHash: string,
  skills: string[]
): Promise<BlockchainVerification | null> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    const contract = await getPomContract(provider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Verify project on the blockchain
    const tx = await contract.verifyProject(address, ipfsHash, skills);
    const receipt = await tx.wait();
    
    if (receipt && receipt.blockNumber) {
      const block = await provider.getBlock(receipt.blockNumber);
      
      return {
        transactionHash: receipt.hash,
        verifiedDate: new Date(Number(block?.timestamp) * 1000),
        blockNumber: receipt.blockNumber,
        verifier: address,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error verifying project on blockchain:", error);
    return null;
  }
}

/**
 * Verify a certificate on the blockchain
 * @param ipfsHash IPFS hash of the certificate data
 * @param issuer Certificate issuer
 * @returns Transaction receipt
 */
export async function verifyCertificateOnBlockchain(
  ipfsHash: string,
  issuer: string
): Promise<BlockchainVerification | null> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    const contract = await getPomContract(provider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Verify certificate on the blockchain
    const tx = await contract.verifyCertificate(address, ipfsHash, issuer);
    const receipt = await tx.wait();
    
    if (receipt && receipt.blockNumber) {
      const block = await provider.getBlock(receipt.blockNumber);
      
      return {
        transactionHash: receipt.hash,
        verifiedDate: new Date(Number(block?.timestamp) * 1000),
        blockNumber: receipt.blockNumber,
        verifier: address,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error verifying certificate on blockchain:", error);
    return null;
  }
}

/**
 * Verify a mentorship session on the blockchain
 * @param ipfsHash IPFS hash of the mentorship data
 * @param mentorAddress Mentor's Ethereum address
 * @returns Transaction receipt
 */
export async function verifyMentorshipOnBlockchain(
  ipfsHash: string,
  mentorAddress: string
): Promise<BlockchainVerification | null> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    const contract = await getPomContract(provider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Verify mentorship on the blockchain
    const tx = await contract.verifyMentorship(address, ipfsHash, mentorAddress);
    const receipt = await tx.wait();
    
    if (receipt && receipt.blockNumber) {
      const block = await provider.getBlock(receipt.blockNumber);
      
      return {
        transactionHash: receipt.hash,
        verifiedDate: new Date(Number(block?.timestamp) * 1000),
        blockNumber: receipt.blockNumber,
        verifier: address,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error verifying mentorship on blockchain:", error);
    return null;
  }
}

/**
 * Get a user's verifications from the blockchain
 * @param userAddress User's Ethereum address
 * @returns Array of verification IDs
 */
export async function getUserVerifications(userAddress: string): Promise<number[]> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    const contract = await getPomContract(provider);
    
    // Get user verifications
    const verificationIds = await contract.getUserVerifications(userAddress);
    return verificationIds.map((id: bigint) => Number(id));
  } catch (error) {
    console.error("Error getting user verifications:", error);
    return [];
  }
}

/**
 * Get verification details from the blockchain
 * @param verificationId Verification ID
 * @returns Verification details
 */
export async function getVerificationDetails(verificationId: number): Promise<any> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    const contract = await getPomContract(provider);
    
    // Get verification details
    const details = await contract.getVerification(verificationId);
    
    return {
      user: details[0],
      ipfsHash: details[1],
      timestamp: new Date(Number(details[2]) * 1000),
      verifier: details[3]
    };
  } catch (error) {
    console.error("Error getting verification details:", error);
    return null;
  }
}

/**
 * Check if wallet is connected
 * @returns True if connected
 */
export async function isWalletConnected(): Promise<boolean> {
  try {
    const provider = await getProvider();
    if (!provider) {
      return false;
    }
    
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return false;
  }
}

/**
 * Connect wallet to the application
 * @returns Connected address or null
 */
export async function connectWallet(): Promise<string | null> {
  try {
    const provider = await getProvider();
    if (!provider) {
      throw new Error("No Ethereum provider available");
    }
    
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
}

/**
 * Check if an IPFS hash is verified for a specific user
 * @param ipfsHash IPFS hash to check
 * @param userAddress User's address
 * @returns True if verified
 */
export async function isHashVerifiedForUser(
  ipfsHash: string, 
  userAddress: string
): Promise<boolean> {
  try {
    const verificationIds = await getUserVerifications(userAddress);
    
    // If no verifications, return false
    if (verificationIds.length === 0) {
      return false;
    }
    
    // Check each verification
    for (const id of verificationIds) {
      const details = await getVerificationDetails(id);
      if (details && details.ipfsHash === ipfsHash) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error("Error checking hash verification:", error);
    return false;
  }
}

// Expose MentorDAO contract functions
export const mentorDAO = {
  // Mentor management
  registerMentor: mentorDAOModule.registerMentorOnChain,
  saveMentorToDB: mentorDAOModule.saveMentorToDB,
  getPendingMentors: mentorDAOModule.getPendingMentors,
  approveMentor: mentorDAOModule.approveMentor,
  getMentorDetails: mentorDAOModule.getMentorDetails,
  
  // Project management
  createProject: mentorDAOModule.createProjectOnChain,
  saveProjectToDB: mentorDAOModule.saveProjectToDB,
  assignProject: mentorDAOModule.assignProjectToStudent,
  completeProject: mentorDAOModule.completeProject,
  getProjectDetails: mentorDAOModule.getProjectDetails,
  getMentorProjects: mentorDAOModule.getMentorProjects,
  getStudentProjects: mentorDAOModule.getStudentProjects
}; 