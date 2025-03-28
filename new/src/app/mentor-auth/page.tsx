"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/wallet/connect-button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function MentorAuthPage() {
  const { isConnected, address } = useAccount();
  const { isAuthenticated, connectWallet, user } = useAuth();
  const router = useRouter();
  const hasConnected = useRef(false);
  
  // Effect to handle wallet connection
  useEffect(() => {
    if (isConnected && address && !hasConnected.current) {
      // Set the flag to prevent multiple connections
      hasConnected.current = true;
      
      // Connect wallet to auth system
      connectWallet(address);
      
      // Wait a moment before redirecting to ensure auth state is updated
      const redirectTimer = setTimeout(() => {
        router.push("/mentor-auth/mentor-registration");
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isConnected, address, connectWallet, router]);

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Connect Your Polygon Amoy Wallet</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          To register as a mentor on MentorNet, you need to connect your Polygon Amoy wallet. This wallet will be used to receive payment and verify your identity on the blockchain.
        </p>
        
        <div className="flex flex-col items-center space-y-4">
          <ConnectButton />
          <p className="text-sm text-gray-500 max-w-xs text-center mt-4">
            Make sure you're connected to the Polygon Amoy network to proceed with registration.
          </p>
        </div>
      </div>
    </div>
  );
} 