"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

type Web3ContextType = {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  address: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  address: null,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export function useWeb3() {
  return useContext(Web3Context);
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize provider if window.ethereum exists
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethersProvider);

      // Check if already connected
      checkConnection(ethersProvider);

      // Setup event listeners
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length > 0) {
            updateConnection(ethersProvider);
          } else {
            disconnectWallet();
          }
        });

        window.ethereum.on("chainChanged", () => {
          updateConnection(ethersProvider);
        });

        window.ethereum.on("disconnect", () => {
          disconnectWallet();
        });

        return () => {
          if (window.ethereum) {
            window.ethereum.removeListener("accountsChanged", () => {});
            window.ethereum.removeListener("chainChanged", () => {});
            window.ethereum.removeListener("disconnect", () => {});
          }
        };
      }
    }
  }, []);

  const checkConnection = async (provider: ethers.BrowserProvider) => {
    try {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        updateConnection(provider);
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error);
    }
  };

  const updateConnection = async (provider: ethers.BrowserProvider) => {
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setSigner(signer);
      setAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to update connection:", error);
      disconnectWallet();
    }
  };

  const connectWallet = async () => {
    if (!provider || !window.ethereum) return;

    try {
      // Request accounts from the provider
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await updateConnection(provider);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        address,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
} 