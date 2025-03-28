# Hands-On Lab: Implementing Blockchain-Based Learning Verification

## Overview

In this hands-on lab, you will implement a blockchain-based system for verifying that students have watched educational videos in their entirety without skipping. By the end of this lab, you will have deployed a Solidity smart contract on the Polygon Amoy testnet and integrated it with a React application using YouTube's player API.

## Prerequisites

- Basic knowledge of React and JavaScript/TypeScript
- Familiarity with blockchain concepts
- Metamask wallet installed in your browser
- Node.js (v16+) and npm/yarn installed

## Duration

Approximately 3-4 hours

## Lab Tasks

1. Set up the development environment
2. Deploy the VideoVerification smart contract
3. Create the React hooks for blockchain integration
4. Implement the YouTube player component
5. Test the verification system

## Task 1: Set Up the Development Environment

### Step 1: Clone the MentorNet repository

```bash
git clone https://github.com/your-org/mentornet.git
cd mentornet
npm install
```

### Step 2: Set up a Polygon Amoy testnet connection

1. Open Metamask and add the Polygon Amoy testnet:
   - Network Name: Polygon Amoy
   - RPC URL: https://rpc-amoy.polygon.technology/
   - Chain ID: 80002
   - Currency Symbol: MATIC
   - Block Explorer URL: https://amoy.polygonscan.com/

2. Request test MATIC from the Polygon Amoy faucet:
   - Visit https://faucet.polygon.technology/
   - Select Amoy network
   - Enter your wallet address
   - Receive test MATIC

## Task 2: Deploy the VideoVerification Smart Contract

### Step 1: Examine the smart contract

Navigate to `mentornet/src/contracts/VideoVerification.sol` and review the contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VideoVerification {
    // Contract code as documented in the documentation
    // ...
}
```

### Step 2: Compile and deploy the contract

1. Install Hardhat (if not already installed):

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
```

2. Create a minimal Hardhat configuration at the project root:

```javascript
// hardhat.config.js
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

3. Create a deployment script:

```javascript
// scripts/deploy.js
async function main() {
  const VideoVerification = await ethers.getContractFactory("VideoVerification");
  const videoVerification = await VideoVerification.deploy();
  await videoVerification.deployed();
  console.log("VideoVerification deployed to:", videoVerification.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

4. Deploy the contract:

```bash
export PRIVATE_KEY=your_metamask_private_key
npx hardhat run scripts/deploy.js --network amoy
```

5. Note the contract address for later use.

## Task 3: Create the React Hooks for Blockchain Integration

### Step 1: Set up the contract ABI and address

Create or update the file `mentornet/src/lib/videoVerification.ts`:

```typescript
"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';

// Include the full ABI from the compiled contract
const VIDEO_VERIFICATION_ABI = [...]; // Your contract ABI goes here

// Replace with your deployed contract address
const VIDEO_VERIFICATION_ADDRESS = "0xYourContractAddressHere" as `0x${string}`;

// Implement the hooks as shown in the documentation
// useRegisterVideo, useReportProgress, etc.
```

### Step 2: Implement the core hooks

1. Implement the `useRegisterVideo` hook:

```typescript
export function useRegisterVideo() {
  const { writeContractAsync, isPending, error, data } = useWriteContract();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const registerVideo = async (videoId: string, duration: number, segmentSize: number = 5) => {
    if (!videoId || duration <= 0) return;
    
    try {
      setIsLoading(true);
      const hash = await writeContractAsync({
        abi: VIDEO_VERIFICATION_ABI,
        address: VIDEO_VERIFICATION_ADDRESS,
        functionName: 'registerVideo',
        args: [videoId, BigInt(duration), BigInt(segmentSize)],
      });
      
      setTxHash(hash);
      
      // Wait for transaction receipt
      const receipt = await waitForTransactionReceipt({ hash });
      
      setIsSuccess(receipt.status === 'success');
    } catch (e) {
      console.error('Error registering video:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerVideo,
    isLoading: isLoading || isPending,
    isSuccess,
    isError: !!error,
    error,
    txHash,
  };
}
```

2. Implement the rest of the hooks as shown in the documentation

## Task 4: Implement the YouTube Player Component

### Step 1: Create the YouTube player component

Create or update the file `mentornet/src/components/ui/youtube-player.tsx`:

```tsx
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useVideoTracking, useIsVideoCompleted } from '@/lib/videoVerification';
import { ConnectButton } from '@/components/wallet/connect-button';
import { useAccount } from 'wagmi';
import { Progress } from '@/components/ui/progress';

// Implement the component as shown in the documentation
```

### Step 2: Implement the player functionality

Add the YouTube player initialization and progress tracking logic, connecting it to the blockchain hooks.

## Task 5: Test the Verification System

### Step 1: Create a test page

Create a simple test page to verify that your implementation works:

```tsx
// mentornet/src/app/test-verification/page.tsx
"use client";

import { YoutubePlayer } from '@/components/ui/youtube-player';

export default function TestVerificationPage() {
  const handleComplete = () => {
    alert('Video completed successfully!');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Blockchain Video Verification Test</h1>
      
      <YoutubePlayer 
        videoId="dQw4w9WgXcQ" // Test video ID
        title="Test Video"
        description="This is a test video for verifying blockchain-based learning verification"
        onComplete={handleComplete}
      />
    </div>
  );
}
```

### Step 2: Run the application and test the verification

1. Start the development server:

```bash
npm run dev
```

2. Navigate to http://localhost:3000/test-verification
3. Connect your wallet
4. Watch the video without skipping and verify that completion is recorded
5. Test the skip detection by jumping ahead in the video

## Bonus Tasks

1. **Implement an admin panel**: Create a page where instructors can view completion statistics for their courses
2. **Add a certificate generator**: Generate a PDF certificate upon successful video completion
3. **Enhance skip detection**: Improve the skip detection algorithm to be more resistant to tampering

## Conclusion

Congratulations! You have successfully implemented a blockchain-based system for verifying educational video completion. This system ensures that students watch the entire video content before receiving credit, enhancing the integrity of online education.

You've learned:
- How to deploy and interact with a Solidity smart contract
- How to integrate blockchain functionality with a React application
- How to implement YouTube API with blockchain verification
- How to ensure educational integrity through technology

## Next Steps

Now that you've implemented the verification system, consider:
1. Integrating it with a full course management system
2. Exploring zero-knowledge proofs for more privacy-preserving verification
3. Implementing gamification elements to reward thorough learning
4. Expanding to other types of educational content beyond videos 