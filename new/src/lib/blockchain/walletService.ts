/**
 * WalletService.ts
 * 
 * This file defines the service for interacting with blockchain wallets
 * and managing NFT certificates in MentorNet.
 */

import { createPublicClient, createWalletClient, http } from 'viem';
import { mainnet, polygon, optimism, arbitrum } from 'viem/chains';

export type SupportedChain = 'ethereum' | 'polygon' | 'optimism' | 'arbitrum';

export type WalletInfo = {
  address: string;
  chainId: number;
  balance: string;
  isConnected: boolean;
};

export type NFTCertificate = {
  id: string;
  name: string;
  description: string;
  image: string;
  issueDate: string;
  issuer: string;
  skills: string[];
};

export interface IWalletService {
  connect(provider?: 'metamask' | 'walletconnect' | 'coinbase'): Promise<WalletInfo>;
  disconnect(): Promise<void>;
  getWalletInfo(): Promise<WalletInfo | null>;
  switchChain(chain: SupportedChain): Promise<boolean>;
  getCertificates(): Promise<NFTCertificate[]>;
}

/**
 * Service for interacting with blockchain wallets and NFT certificates
 */
export class WalletService implements IWalletService {
  private isConnected: boolean = false;
  private walletAddress: string | null = null;
  private currentChain: SupportedChain = 'ethereum';
  private publicClient: any = null;
  private walletClient: any = null;

  constructor() {
    // Initialize clients
    this.initClients();
  }

  /**
   * Initialize blockchain clients
   * @private
   */
  private initClients(): void {
    const chain = this.getChainByName(this.currentChain);
    
    // Create a public client for reading blockchain data
    this.publicClient = createPublicClient({
      chain,
      transport: http()
    });
  }

  /**
   * Get chain configuration by name
   * @private
   */
  private getChainByName(chainName: SupportedChain) {
    const chains = {
      'ethereum': mainnet,
      'polygon': polygon,
      'optimism': optimism,
      'arbitrum': arbitrum
    };
    return chains[chainName];
  }

  /**
   * Connect to a blockchain wallet
   */
  async connect(provider: 'metamask' | 'walletconnect' | 'coinbase' = 'metamask'): Promise<WalletInfo> {
    console.log(`Connecting to ${provider} wallet...`);
    
    try {
      // This is a mock for now - will be replaced with actual wallet connections
      // using wagmi or viem directly depending on the provider
      
      // Simulate a successful connection
      this.isConnected = true;
      this.walletAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      return {
        address: this.walletAddress,
        chainId: this.getChainByName(this.currentChain).id,
        balance: '0.00',
        isConnected: true
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  /**
   * Disconnect the current wallet
   */
  async disconnect(): Promise<void> {
    console.log('Disconnecting wallet...');
    
    this.isConnected = false;
    this.walletAddress = null;
    this.walletClient = null;
  }

  /**
   * Get current wallet information
   */
  async getWalletInfo(): Promise<WalletInfo | null> {
    if (!this.isConnected || !this.walletAddress) {
      return null;
    }
    
    return {
      address: this.walletAddress,
      chainId: this.getChainByName(this.currentChain).id,
      balance: '0.00', // Would fetch actual balance in production
      isConnected: this.isConnected
    };
  }

  /**
   * Switch to a different blockchain network
   */
  async switchChain(chain: SupportedChain): Promise<boolean> {
    console.log(`Switching to ${chain} network...`);
    
    try {
      this.currentChain = chain;
      this.initClients();
      return true;
    } catch (error) {
      console.error('Failed to switch chains:', error);
      return false;
    }
  }

  /**
   * Get NFT certificates owned by the connected wallet
   */
  async getCertificates(): Promise<NFTCertificate[]> {
    console.log('Fetching NFT certificates...');
    
    if (!this.isConnected || !this.walletAddress) {
      return [];
    }
    
    // Mock data for now - would be replaced with actual NFT fetching
    return [
      {
        id: '1',
        name: 'Full-Stack Web Development',
        description: 'Certified skills in building full-stack web applications using modern technologies',
        image: 'https://example.com/nft-images/full-stack.png',
        issueDate: '2023-11-15',
        issuer: 'MentorNet DAO',
        skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB']
      },
      {
        id: '2',
        name: 'Blockchain Development',
        description: 'Proficiency in developing decentralized applications and smart contracts',
        image: 'https://example.com/nft-images/blockchain.png',
        issueDate: '2023-12-05',
        issuer: 'MentorNet DAO',
        skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'DApps']
      },
      {
        id: '3',
        name: 'UI/UX Design Fundamentals',
        description: 'Fundamental skills in creating user-centered designs and interfaces',
        image: 'https://example.com/nft-images/ui-ux.png',
        issueDate: '2024-01-20',
        issuer: 'MentorNet DAO',
        skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Accessibility']
      }
    ];
  }
} 