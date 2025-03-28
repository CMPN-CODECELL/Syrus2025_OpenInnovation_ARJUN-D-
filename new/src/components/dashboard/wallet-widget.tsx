"use client";

import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton } from "@/components/wallet/connect-button";

export function WalletWidget() {
  const { address, isConnected } = useAccount();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Address</span>
              <span className="text-xs font-medium truncate max-w-[150px]">
                {address}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Network</span>
              <span className="text-xs font-medium">Polygon Amoy</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Balance</span>
              <span className="text-xs font-medium">- MATIC</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Connect your wallet to access the full features of MentorNet
            </p>
            <ConnectButton />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 