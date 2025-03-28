"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  uploadSkillToIPFS,
  uploadProjectToIPFS,
  uploadCertificateToIPFS,
  uploadMentorshipToIPFS,
  fetchFromIPFS
} from "@/lib/ipfs";
import {
  verifySkillOnBlockchain,
  verifyProjectOnBlockchain,
  verifyCertificateOnBlockchain,
  verifyMentorshipOnBlockchain,
  isWalletConnected,
  connectWallet,
  BlockchainVerification
} from "@/lib/blockchain";

// Types for our portfolio data
type VerificationStatus = "unverified" | "pending" | "verified";

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
  description?: string;
  ipfsHash?: string;
  verificationStatus: VerificationStatus;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  skills: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  ipfsHash?: string;
  verificationStatus: VerificationStatus;
}

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  credentialUrl?: string;
  imageUrl?: string;
  ipfsHash?: string;
  verificationStatus: VerificationStatus;
}

interface MentorshipSession {
  id: string;
  mentorName: string;
  mentorAddress?: string;
  mentorAvatar?: string;
  topic: string;
  date: Date;
  duration: number;
  endorsements?: string[];
  ipfsHash?: string;
  verificationStatus: VerificationStatus;
}

interface Portfolio {
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  mentorshipSessions: MentorshipSession[];
}

interface PortfolioContextType {
  portfolio: Portfolio;
  isLoading: boolean;
  isVerifying: boolean;
  walletConnected: boolean;
  verifySkill: (id: string) => Promise<void>;
  verifyProject: (id: string) => Promise<void>;
  verifyCertificate: (id: string) => Promise<void>;
  verifyMentorshipSession: (id: string) => Promise<void>;
  connectToWallet: () => Promise<void>;
}

// Create empty context
const PortfolioContext = createContext<PortfolioContextType | null>(null);

// Sample initial portfolio data
const initialPortfolio: Portfolio = {
  skills: [
    {
      id: "skill1",
      name: "Solidity",
      category: "Blockchain Development",
      level: 4,
      description: "Smart contract development using Solidity",
      verificationStatus: "verified",
    },
    {
      id: "skill2",
      name: "React",
      category: "Frontend Development",
      level: 5,
      description: "Building user interfaces with React",
      verificationStatus: "unverified",
    },
  ],
  projects: [
    {
      id: "project1",
      title: "DeFi Yield Aggregator",
      description: "A decentralized finance application that optimizes yield farming strategies",
      skills: ["Solidity", "React", "Ethers.js"],
      githubUrl: "https://github.com/user/defi-project",
      demoUrl: "https://demo.example.com",
      verificationStatus: "verified",
    },
  ],
  certificates: [
    {
      id: "cert1",
      title: "Advanced Blockchain Development",
      issuer: "Blockchain Academy",
      issueDate: new Date("2023-05-15"),
      credentialUrl: "https://cert.example.com/abc123",
      verificationStatus: "verified",
    },
  ],
  mentorshipSessions: [
    {
      id: "session1",
      mentorName: "John Smith",
      mentorAddress: "0x1234567890abcdef1234567890abcdef12345678",
      topic: "Smart Contract Security",
      date: new Date("2023-06-10"),
      duration: 60,
      endorsements: ["Solidity", "Security Auditing"],
      verificationStatus: "pending",
    },
  ],
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Simulate loading portfolio data
  useEffect(() => {
    // This simulates an API call to load the portfolio data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Wallet connection function
  const connectToWallet = async () => {
    // This would normally interact with a wallet like MetaMask
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 500));
      setWalletConnected(true);
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    }
  };

  // Verification functions
  const verifySkill = async (id: string) => {
    setIsVerifying(true);
    try {
      // Simulate blockchain verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPortfolio(prev => ({
        ...prev,
        skills: prev.skills.map(skill => 
          skill.id === id ? { ...skill, verificationStatus: "verified" } : skill
        )
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyProject = async (id: string) => {
    setIsVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPortfolio(prev => ({
        ...prev,
        projects: prev.projects.map(project => 
          project.id === id ? { ...project, verificationStatus: "verified" } : project
        )
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyCertificate = async (id: string) => {
    setIsVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPortfolio(prev => ({
        ...prev,
        certificates: prev.certificates.map(cert => 
          cert.id === id ? { ...cert, verificationStatus: "verified" } : cert
        )
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyMentorshipSession = async (id: string) => {
    setIsVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPortfolio(prev => ({
        ...prev,
        mentorshipSessions: prev.mentorshipSessions.map(session => 
          session.id === id ? { ...session, verificationStatus: "verified" } : session
        )
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      isLoading,
      isVerifying,
      walletConnected,
      verifySkill,
      verifyProject,
      verifyCertificate,
      verifyMentorshipSession,
      connectToWallet
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};