"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wallet, 
  Copy, 
  Check, 
  ExternalLink, 
  LogOut, 
  ChevronRight, 
  AlertCircle 
} from "lucide-react";
import { useWallet } from "./wallet-provider";

// Mock wallet providers - in a real implementation, this would use wagmi/viem or ethers.js
const WALLET_PROVIDERS = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/images/wallets/metamask.svg", // In real app, add these icons to public folder
    description: "Connect using MetaMask browser extension",
    popular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/images/wallets/walletconnect.svg",
    description: "Connect using WalletConnect",
    popular: true,
  },
  {
    id: "coinswitch",
    name: "CoinSwitch",
    icon: "/images/wallets/coinswitch.svg",
    description: "Connect using CoinSwitch (Indian Exchange)",
    popular: true,
  },
  {
    id: "wazirx",
    name: "WazirX",
    icon: "/images/wallets/wazirx.svg",
    description: "Connect using WazirX (Indian Exchange)",
    popular: false,
  },
  {
    id: "coincdx",
    name: "CoinDCX",
    icon: "/images/wallets/coindcx.svg",
    description: "Connect using CoinDCX (Indian Exchange)",
    popular: false,
  },
];

// Mock blockchain networks supported
const SUPPORTED_NETWORKS = [
  {
    id: "ethereum",
    name: "Ethereum",
    chainId: "1",
    symbol: "ETH",
    icon: "/images/networks/ethereum.svg",
    blockExplorer: "https://etherscan.io",
  },
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
    id: "optimism",
    name: "Optimism",
    chainId: "10",
    symbol: "ETH",
    icon: "/images/networks/optimism.svg",
    blockExplorer: "https://optimistic.etherscan.io",
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

// In a real app, these types would be more robust
interface WalletState {
  connected: boolean;
  address: string | null;
  ensName: string | null;
  chainId: string | null;
  balance: string | null;
  network: Network | null;
}

export default function WalletConnect() {
  const { walletState, connectWallet, disconnectWallet, switchNetwork, isConnecting } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");

  const handleConnectWallet = async (providerId: string) => {
    setSelectedWallet(providerId);
    await connectWallet(providerId);
    setIsDialogOpen(false);
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(`${type} copied!`);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const truncateAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div>
      {walletState.connected ? (
        <div className="flex items-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {walletState.network && (
                  <div className="flex items-center mr-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    <span className="hidden sm:inline text-xs">{walletState.network.name}</span>
                  </div>
                )}
                <span className="font-medium">
                  {walletState.ensName || truncateAddress(walletState.address)}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Wallet Connected</DialogTitle>
                <DialogDescription>
                  Your wallet is connected to MentorNet on {walletState.network?.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col items-center py-4">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src={`https://effigy.im/a/${walletState.address}.svg`} alt="Wallet avatar" />
                  <AvatarFallback>
                    <Wallet className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                
                {walletState.ensName && (
                  <h3 className="text-lg font-medium mb-1">{walletState.ensName}</h3>
                )}
                
                <div className="flex items-center mb-4">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    {walletState.address}
                  </code>
                  <button 
                    onClick={() => handleCopyToClipboard(walletState.address!, "Address")}
                    className="text-muted-foreground hover:text-foreground ml-1.5"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                
                {copySuccess && (
                  <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm mb-4 flex items-center">
                    <Check className="h-4 w-4 mr-1.5" />
                    {copySuccess}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="py-1.5">
                    <div className="flex items-center gap-1.5">
                      {walletState.network && (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{walletState.network.name}</span>
                        </>
                      )}
                    </div>
                  </Badge>
                  
                  <Badge variant="outline" className="py-1.5">
                    <span>{walletState.balance} {walletState.network?.symbol}</span>
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="py-4">
                <h4 className="text-sm font-medium mb-3">Switch Network</h4>
                <div className="grid grid-cols-2 gap-2">
                  {walletState.network?.id && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        className="justify-start"
                      >
                        <span className="mr-auto">{walletState.network.name}</span>
                        {walletState.network.recommended && <Badge variant="secondary" className="text-[10px] h-4">Recommended</Badge>}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => switchNetwork(walletState.network?.id === "polygon" ? "ethereum" : "polygon")}
                      >
                        <span className="mr-auto">{walletState.network?.id === "polygon" ? "Ethereum" : "Polygon"}</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {walletState.address && walletState.network && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => window.open(`${walletState.network?.blockExplorer}/address/${walletState.address}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </Button>
                )}
                <Button variant="destructive" className="w-full sm:w-auto" onClick={disconnectWallet}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Connect your wallet to access the blockchain features and mint your skill certificates.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Popular Wallets</h4>
                <div className="grid gap-2">
                  {WALLET_PROVIDERS.filter(p => p.popular).map((provider) => (
                    <div
                      key={provider.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 ${
                        isConnecting && selectedWallet === provider.id ? "opacity-70 pointer-events-none" : ""
                      }`}
                      onClick={() => handleConnectWallet(provider.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                          <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{provider.name}</div>
                          <div className="text-xs text-muted-foreground">{provider.description}</div>
                        </div>
                      </div>
                      {isConnecting && selectedWallet === provider.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Other Wallets</h4>
                <div className="grid gap-2">
                  {WALLET_PROVIDERS.filter(p => !p.popular).map((provider) => (
                    <div
                      key={provider.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent/50 ${
                        isConnecting && selectedWallet === provider.id ? "opacity-70 pointer-events-none" : ""
                      }`}
                      onClick={() => handleConnectWallet(provider.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                          <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{provider.name}</div>
                          <div className="text-xs text-muted-foreground">{provider.description}</div>
                        </div>
                      </div>
                      {isConnecting && selectedWallet === provider.id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <div>
                <p className="font-medium">Connect safely</p>
                <p className="text-amber-700">MentorNet will never ask for your seed phrase or private keys. Only connect to sites you trust.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 