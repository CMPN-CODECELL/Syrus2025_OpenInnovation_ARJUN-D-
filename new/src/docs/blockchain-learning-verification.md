# Blockchain-Based Learning Verification System

## Introduction

The Blockchain-Based Learning Verification System is a groundbreaking solution for verifying educational content consumption on the MentorNet platform. This system leverages blockchain technology to ensure that users genuinely watch educational videos in their entirety, without skipping important content, before receiving credentials or certificates.

This documentation provides a comprehensive overview of the system architecture, implementation details, and usage guidelines for developers and educators.

## System Overview

The system is built on three core components:

1. **Smart Contract**: A Solidity contract deployed on the Polygon Amoy blockchain that tracks video watching progress, detects skipping, and verifies completion.

2. **JavaScript Integration Library**: A set of React hooks that interact with the blockchain to register videos, report progress, and verify completion.

3. **YouTube Player Component**: A specialized video player that integrates with the blockchain and monitors user interaction.

## Key Features

- **Segment-Based Tracking**: Videos are divided into segments for granular progress tracking
- **Skip Detection**: Sophisticated algorithms detect when users attempt to skip portions of the video
- **Real-time Verification**: Progress is verified and recorded on the blockchain in real-time
- **Tamper-proof Records**: All completion data is stored on the blockchain, making it immutable and verifiable
- **User-friendly Interface**: Progress indicators and blockchain verification status are displayed to users

## Smart Contract Architecture

The `VideoVerification` smart contract is the backbone of the system, responsible for:

1. Registering videos with metadata (duration, segment size)
2. Tracking watched segments per user
3. Detecting and recording skip attempts
4. Verifying complete video watching
5. Providing progress and completion data

### Key Data Structures

```solidity
struct VideoData {
    uint256 totalDuration;  // Total duration of video in seconds
    uint256 segmentSize;    // Size of each segment in seconds
    bool exists;            // Whether the video exists
    bool completed;         // Whether the video has been fully watched
    mapping(uint256 => bool) segments; // Mapping segment index to watched status
    uint256 segmentCount;   // Total number of segments
    uint256 watchedSegments; // Number of segments watched
    uint256 lastHeartbeat;  // Last time a heartbeat was received
    uint256 lastPosition;   // Last position reported in seconds
    uint256 skipCount;      // Number of skips detected
}
```

### Key Functions

- `registerVideo(string videoId, uint256 duration, uint256 segmentSize)`: Registers a new video for tracking
- `reportProgress(string videoId, uint256 position)`: Reports the current position in the video and updates progress
- `isVideoCompleted(address user, string videoId)`: Checks if a video has been completed by a user
- `getVideoProgress(string videoId)`: Gets the progress of a video for the current user

## Integration Library

The integration library provides React hooks for interacting with the smart contract:

### Core Hooks

1. `useRegisterVideo()`: Registers a video with the blockchain
2. `useReportProgress()`: Reports progress to the blockchain
3. `useIsVideoCompleted()`: Checks if a video is completed
4. `useVideoProgress()`: Gets progress information for a video
5. `useVideoTracking()`: Combines all the above hooks for easy tracking

### Usage Example

```typescript
const { updatePosition, progress, isRegistered } = useVideoTracking(videoId, videoDuration);

// When video position changes
updatePosition(currentTimeInSeconds);

// Check progress
if (progress?.completed) {
  // Video is completed
  showCompletionCertificate();
}
```

## YouTube Player Component

The YouTube Player component integrates with the verification system:

1. Loads the YouTube iframe API
2. Initializes blockchain tracking
3. Sends progress updates to the blockchain
4. Displays progress and verification status
5. Prevents video completion credit when skipping is detected

### Key Features

- Wallet connection requirement for tracking
- Progress bar showing percentage completed
- Skip detection warnings
- Blockchain verification status display
- Completion status from the blockchain

## Implementation Guide

### Deploying the Smart Contract

1. Deploy the `VideoVerification.sol` contract to the Polygon Amoy network
2. Update the contract address in the integration library

### Setting Up Video Tracking

1. Import the YouTube Player component
2. Provide video ID and optional metadata
3. Handle completion events

```jsx
<YoutubePlayer 
  videoId="VIDEO_ID"
  title="Video Title"
  description="Video Description"
  onComplete={handleModuleComplete}
/>
```

### Accessing Verification Data

You can access verification data through the hooks:

```typescript
const { isCompleted } = useIsVideoCompleted(videoId);
const { progress } = useVideoProgress(videoId);

// progress contains:
// - watchedPercentage: 0-100
// - skipCount: number of skips
// - completed: boolean
```

## Security Considerations

The system employs several security measures:

1. **Time-based Skip Detection**: Compares elapsed time with position changes
2. **Segment Verification**: Ensures all segments are watched
3. **Heartbeat Mechanism**: Regular updates prevent tampering
4. **Blockchain Immutability**: All records are tamper-proof once written

## Limitations

Current limitations include:

1. Gas costs for frequent blockchain updates
2. Dependency on wallet connection
3. Network connectivity requirements
4. Initialization delay for blockchain interactions

## Future Enhancements

Planned enhancements include:

1. Layer-2 scaling solutions for reduced gas costs
2. Offline mode with delayed verification
3. Enhanced anti-tampering measures
4. Integration with credential issuance systems
5. Analytics dashboard for educators

## Conclusion

The Blockchain-Based Learning Verification System provides a robust solution for ensuring the integrity of educational content consumption. By leveraging blockchain technology, the system creates tamper-proof records of video completion that can be used for credential issuance, continuing education credits, or certification requirements.

This innovative approach to verification creates a more accountable and trustworthy educational ecosystem where credentials truly reflect the knowledge acquired. 