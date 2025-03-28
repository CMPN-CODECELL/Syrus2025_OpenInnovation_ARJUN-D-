// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title VideoVerification
 * @dev A smart contract that verifies complete video watching without skipping
 * @custom:contract-address 0xE59eC2A978F9D76C615e4ce59511Af50c6BC0f87
 */
contract VideoVerification {
    address public owner;
    
    struct VideoSegment {
        uint256 startTime;  // Start timestamp of segment in seconds
        uint256 endTime;    // End timestamp of segment in seconds
        bool watched;       // Whether this segment has been watched
    }
    
    struct VideoData {
        uint256 totalDuration;  // Total duration of video in seconds
        uint256 segmentSize;    // Size of each segment in seconds (e.g., 5 seconds)
        bool exists;            // Whether the video exists
        bool completed;         // Whether the video has been fully watched
        mapping(uint256 => bool) segments; // Mapping segment index to watched status
        uint256 segmentCount;   // Total number of segments
        uint256 watchedSegments; // Number of segments watched
        uint256 lastHeartbeat;  // Last time a heartbeat was received
        uint256 lastPosition;   // Last position reported in seconds
        uint256 skipCount;      // Number of skips detected
    }
    
    // Mapping of user address -> video ID -> video data
    mapping(address => mapping(string => VideoData)) private userVideos;
    
    // List of videos registered by each user
    mapping(address => string[]) private userVideoList;
    
    // Video completion events
    event VideoRegistered(address indexed user, string videoId, uint256 duration);
    event SegmentWatched(address indexed user, string videoId, uint256 segmentIndex);
    event HeartbeatReceived(address indexed user, string videoId, uint256 position, uint256 timestamp);
    event SkipDetected(address indexed user, string videoId, uint256 fromPosition, uint256 toPosition);
    event VideoCompleted(address indexed user, string videoId, uint256 watchTime, uint256 skipCount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Register a new video for a user
     * @param videoId The video identifier (e.g., YouTube ID)
     * @param duration Total duration of the video in seconds
     * @param segmentSize Size of each segment in seconds
     */
    function registerVideo(string memory videoId, uint256 duration, uint256 segmentSize) public {
        require(segmentSize > 0, "Segment size must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");
        require(!userVideos[msg.sender][videoId].exists, "Video already registered");
        
        VideoData storage videoData = userVideos[msg.sender][videoId];
        videoData.totalDuration = duration;
        videoData.segmentSize = segmentSize;
        videoData.exists = true;
        videoData.completed = false;
        videoData.segmentCount = (duration + segmentSize - 1) / segmentSize; // Ceiling division
        videoData.watchedSegments = 0;
        videoData.lastHeartbeat = 0;
        videoData.lastPosition = 0;
        videoData.skipCount = 0;
        
        userVideoList[msg.sender].push(videoId);
        
        emit VideoRegistered(msg.sender, videoId, duration);
    }
    
    /**
     * @dev Report a watched segment and update video progress
     * @param videoId The video identifier
     * @param position Current position in the video in seconds
     */
    function reportProgress(string memory videoId, uint256 position) public {
        VideoData storage videoData = userVideos[msg.sender][videoId];
        require(videoData.exists, "Video not registered");
        require(position <= videoData.totalDuration, "Position exceeds video duration");
        
        // Calculate segment index
        uint256 segmentIndex = position / videoData.segmentSize;
        
        // Check for skip detection
        if (videoData.lastHeartbeat > 0) {
            uint256 timeDelta = block.timestamp - videoData.lastHeartbeat;
            uint256 positionDelta = position > videoData.lastPosition ? 
                                    position - videoData.lastPosition : 0;
                                    
            // If position increased more than time elapsed + buffer (2 seconds), it's a skip
            if (positionDelta > timeDelta + 2 && position > videoData.lastPosition + 10) {
                videoData.skipCount++;
                emit SkipDetected(msg.sender, videoId, videoData.lastPosition, position);
            }
        }
        
        // Mark segment as watched if not already
        if (!videoData.segments[segmentIndex]) {
            videoData.segments[segmentIndex] = true;
            videoData.watchedSegments++;
            emit SegmentWatched(msg.sender, videoId, segmentIndex);
            
            // Check if all segments have been watched
            if (videoData.watchedSegments >= videoData.segmentCount && !videoData.completed) {
                videoData.completed = true;
                emit VideoCompleted(msg.sender, videoId, block.timestamp, videoData.skipCount);
            }
        }
        
        // Update heartbeat and position
        videoData.lastHeartbeat = block.timestamp;
        videoData.lastPosition = position;
        
        emit HeartbeatReceived(msg.sender, videoId, position, block.timestamp);
    }
    
    /**
     * @dev Check if a video has been completed by the user
     * @param user The user address
     * @param videoId The video identifier
     * @return Whether the video has been completed
     */
    function isVideoCompleted(address user, string memory videoId) public view returns (bool) {
        return userVideos[user][videoId].completed;
    }
    
    /**
     * @dev Get the progress of a video for the user
     * @param videoId The video identifier
     * @return watchedPercentage The percentage of segments watched (0-100)
     * @return skipCount Number of skips detected
     * @return completed Whether the video has been completed
     */
    function getVideoProgress(string memory videoId) public view returns (
        uint256 watchedPercentage, 
        uint256 skipCount,
        bool completed
    ) {
        VideoData storage videoData = userVideos[msg.sender][videoId];
        require(videoData.exists, "Video not registered");
        
        if (videoData.segmentCount == 0) return (0, videoData.skipCount, videoData.completed);
        
        watchedPercentage = (videoData.watchedSegments * 100) / videoData.segmentCount;
        skipCount = videoData.skipCount;
        completed = videoData.completed;
    }
    
    /**
     * @dev Get all videos registered by a user
     * @param user The user address
     * @return List of video IDs
     */
    function getUserVideos(address user) public view returns (string[] memory) {
        return userVideoList[user];
    }
    
    /**
     * @dev Allow owner to penalize users for excessive skipping
     * @param user The user address
     * @param videoId The video identifier
     * @param penalize Whether to mark the video as incomplete due to excessive skipping
     */
    function penalizeExcessiveSkipping(address user, string memory videoId, bool penalize) public onlyOwner {
        VideoData storage videoData = userVideos[user][videoId];
        require(videoData.exists, "Video not registered");
        
        if (penalize && videoData.completed) {
            videoData.completed = false;
        }
    }
} 