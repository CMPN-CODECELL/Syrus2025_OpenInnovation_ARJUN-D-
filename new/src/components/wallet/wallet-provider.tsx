"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Web3Provider } from './web3-provider';

// Network type definition
interface Network {
  id: string;
  name: string;
  chainId: string;
  symbol: string;
  icon: string;
  blockExplorer: string;
  recommended?: boolean;
}

// Wallet state interface
interface WalletState {
  connected: boolean;
  address: string | null;
  ensName: string | null;
  chainId: string | null;
  balance: string | null;
  network: Network | null;
}

// Context interface with state and methods
interface WalletContextType {
  walletState: WalletState;
  connectWallet: (providerId: string) => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (networkId: string) => void;
  isConnecting: boolean;
}

// Create context with default values
const WalletContext = createContext<WalletContextType>({
  walletState: {
    connected: false,
    address: null,
    ensName: null,
    chainId: null,
    balance: null,
    network: null,
  },
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: () => {},
  isConnecting: false,
});

// Mock supported networks
const SUPPORTED_NETWORKS: Network[] = [
  {
    id: "polygon",
    name: "Polygon",
    chainId: "137",
    symbol: "MATIC",
    icon: "/images/networks/polygon.svg",
    blockExplorer: "https://polygonscan.com",
    recommended: true,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    chainId: "1",
    symbol: "ETH",
    icon: "/images/networks/ethereum.svg",
    blockExplorer: "https://etherscan.io",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    chainId: "42161",
    symbol: "ETH",
    icon: "/images/networks/arbitrum.svg",
    blockExplorer: "https://arbiscan.io",
  },
  {
    id: "base",
    name: "Base",
    chainId: "8453",
    symbol: "ETH",
    icon: "/images/networks/base.svg",
    blockExplorer: "https://basescan.org",
  },
];

// Provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: null,
    ensName: null,
    chainId: null,
    balance: null,
    network: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [mockConnected, setMockConnected] = useState(false);

  // Mock function to connect wallet for demo purposes
  // In a real app, this would use wagmi or ethers.js to connect to the wallet
  const connectWallet = async (providerId: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful connection
      const mockNetwork = SUPPORTED_NETWORKS.find(n => n.id === "polygon") || SUPPORTED_NETWORKS[0];
      
      setWalletState({
        connected: true,
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        ensName: "mentornet.eth",
        chainId: mockNetwork.chainId,
        balance: "245.75",
        network: mockNetwork,
      });
      
      setMockConnected(true);
      
      // Save connection state to localStorage for persistence
      localStorage.setItem("wallet-connected", "true");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Mock function to disconnect wallet
  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      address: null,
      ensName: null,
      chainId: null,
      balance: null,
      network: null,
    });
    setMockConnected(false);
    localStorage.removeItem("wallet-connected");
  };

  // Mock function to switch network
  const switchNetwork = (networkId: string) => {
    const network = SUPPORTED_NETWORKS.find(n => n.id === networkId);
    if (network) {
      setWalletState({
        ...walletState,
        chainId: network.chainId,
        network: network,
      });
    }
  };

  // Effect to simulate wallet auto-connection if previously connected
  useEffect(() => {
    const checkPreviousConnection = async () => {
      const wasConnected = localStorage.getItem("wallet-connected") === "true";
      
      if (wasConnected) {
        setIsConnecting(true);
        
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockNetwork = SUPPORTED_NETWORKS.find(n => n.id === "polygon") || SUPPORTED_NETWORKS[0];
        
        setWalletState({
          connected: true,
          address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
          ensName: "mentoruser.eth",
          chainId: mockNetwork.chainId,
          balance: "2.45",
          network: mockNetwork,
        });
        
        setMockConnected(true);
        setIsConnecting(false);
      }
    };
    
    checkPreviousConnection();
  }, []);

  return (
    <Web3Provider>
      <WalletContext.Provider 
        value={{
          walletState,
          connectWallet,
          disconnectWallet,
          switchNetwork,
          isConnecting
        }}
      >
        {children}
      </WalletContext.Provider>
    </Web3Provider>
  );
}

// Hook for using the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
} 