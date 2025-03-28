// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title LearningTracker
 * @dev Smart contract to track and verify student learning progress
 */
contract LearningTracker {
    address public owner;
    
    // Course and module data structures
    struct Module {
        uint256 id;
        uint256 totalDuration;
        bool exists;
    }
    
    struct Course {
        uint256 id;
        mapping(uint256 => Module) modules;
        uint256[] moduleIds;
        bool exists;
    }
    
    // Student progress tracking
    struct Progress {
        uint256 watchedDuration; // Total seconds actually watched (from verified segments)
        uint256 lastTimestamp;   // Last update timestamp
        uint256 seekCount;       // Number of seeks/skips detected
        bool completed;          // Whether the module is completed
    }
    
    // Watched segment to verify actual watching (not just skipping)
    struct WatchedSegment {
        uint256 start;
        uint256 end;
    }
    
    // Main data mappings
    mapping(uint256 => Course) public courses;
    uint256[] public courseIds;
    
    // Student progress mappings
    mapping(address => mapping(uint256 => mapping(uint256 => Progress))) public studentProgress;
    mapping(address => mapping(uint256 => mapping(uint256 => WatchedSegment[]))) public watchedSegments;
    
    // Events
    event CourseAdded(uint256 courseId);
    event ModuleAdded(uint256 courseId, uint256 moduleId, uint256 duration);
    event ProgressUpdated(address student, uint256 courseId, uint256 moduleId, uint256 watchedDuration, bool isSkip);
    event ModuleCompleted(address student, uint256 courseId, uint256 moduleId);
    event CourseCompleted(address student, uint256 courseId);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier courseExists(uint256 courseId) {
        require(courses[courseId].exists, "Course does not exist");
        _;
    }
    
    modifier moduleExists(uint256 courseId, uint256 moduleId) {
        require(courses[courseId].exists, "Course does not exist");
        require(courses[courseId].modules[moduleId].exists, "Module does not exist");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Add a new course to the platform
     * @param courseId Unique identifier for the course
     */
    function addCourse(uint256 courseId) external onlyOwner {
        require(!courses[courseId].exists, "Course already exists");
        
        courses[courseId].id = courseId;
        courses[courseId].exists = true;
        courseIds.push(courseId);
        
        emit CourseAdded(courseId);
    }
    
    /**
     * @dev Add a module to an existing course
     * @param courseId Course identifier
     * @param moduleId Module identifier within the course
     * @param duration Total duration of the module in seconds
     */
    function addModule(uint256 courseId, uint256 moduleId, uint256 duration) external onlyOwner courseExists(courseId) {
        require(!courses[courseId].modules[moduleId].exists, "Module already exists");
        
        courses[courseId].modules[moduleId] = Module({
            id: moduleId,
            totalDuration: duration,
            exists: true
        });
        
        courses[courseId].moduleIds.push(moduleId);
        
        emit ModuleAdded(courseId, moduleId, duration);
    }
    
    /**
     * @dev Track student progress through a module
     * @param student Address of the student
     * @param courseId Course identifier
     * @param moduleId Module identifier
     * @param timestamp Current timestamp in the video
     * @param segmentStart Start time of the current watched segment
     * @param segmentEnd End time of the current watched segment
     * @param isSkip Whether this update was triggered by a skip/seek action
     */
    function trackProgress(
        address student,
        uint256 courseId,
        uint256 moduleId,
        uint256 timestamp,
        uint256 segmentStart,
        uint256 segmentEnd,
        bool isSkip
    ) external moduleExists(courseId, moduleId) {
        require(student != address(0), "Invalid student address");
        require(segmentEnd >= segmentStart, "Invalid segment range");
        
        Progress storage progress = studentProgress[student][courseId][moduleId];
        
        // Update progress data
        progress.lastTimestamp = timestamp;
        
        // If it's a skip action, increment the seek count
        if (isSkip) {
            progress.seekCount++;
        } 
        // Otherwise, record the watched segment
        else if (segmentEnd > segmentStart) {
            // Add new watched segment
            watchedSegments[student][courseId][moduleId].push(
                WatchedSegment({
                    start: segmentStart,
                    end: segmentEnd
                })
            );
            
            // Update watched duration based on segments
            uint256 segmentDuration = segmentEnd - segmentStart;
            progress.watchedDuration += segmentDuration;
        }
        
        emit ProgressUpdated(student, courseId, moduleId, progress.watchedDuration, isSkip);
    }
    
    /**
     * @dev Mark a module as completed if requirements are met
     * @param student Address of the student
     * @param courseId Course identifier
     * @param moduleId Module identifier
     */
    function completeModule(
        address student,
        uint256 courseId,
        uint256 moduleId
    ) external moduleExists(courseId, moduleId) {
        require(student != address(0), "Invalid student address");
        require(!studentProgress[student][courseId][moduleId].completed, "Module already completed");
        
        Progress storage progress = studentProgress[student][courseId][moduleId];
        uint256 totalDuration = courses[courseId].modules[moduleId].totalDuration;
        
        // To complete, student must have watched at least 85% of the video
        // and not have excessive seeks (less than 5)
        require(progress.watchedDuration >= (totalDuration * 85 / 100), "Not enough watched duration");
        require(progress.seekCount < 5, "Excessive seeking detected");
        
        progress.completed = true;
        
        emit ModuleCompleted(student, courseId, moduleId);
        
        // Check if all modules in course are completed
        bool allCompleted = true;
        for (uint i = 0; i < courses[courseId].moduleIds.length; i++) {
            uint256 mid = courses[courseId].moduleIds[i];
            if (!studentProgress[student][courseId][mid].completed) {
                allCompleted = false;
                break;
            }
        }
        
        // If all modules are completed, mark course as completed
        if (allCompleted) {
            emit CourseCompleted(student, courseId);
        }
    }
    
    /**
     * @dev Check if a module is completed by a student
     * @param student Address of the student
     * @param courseId Course identifier
     * @param moduleId Module identifier
     * @return True if module is completed, false otherwise
     */
    function isModuleCompleted(
        address student,
        uint256 courseId,
        uint256 moduleId
    ) external view moduleExists(courseId, moduleId) returns (bool) {
        return studentProgress[student][courseId][moduleId].completed;
    }
    
    /**
     * @dev Get detailed progress information for a student on a specific module
     * @param student Address of the student
     * @param courseId Course identifier
     * @param moduleId Module identifier
     * @return watchedDuration Total seconds watched
     * @return seekCount Number of skips/seeks detected
     * @return completed Whether the module is completed
     * @return watchPercentage Percentage of module completed (0-100)
     */
    function getProgress(
        address student,
        uint256 courseId,
        uint256 moduleId
    ) external view moduleExists(courseId, moduleId) returns (
        uint256 watchedDuration,
        uint256 seekCount,
        bool completed,
        uint256 watchPercentage
    ) {
        Progress storage progress = studentProgress[student][courseId][moduleId];
        uint256 totalDuration = courses[courseId].modules[moduleId].totalDuration;
        
        watchedDuration = progress.watchedDuration;
        seekCount = progress.seekCount;
        completed = progress.completed;
        
        // Calculate watch percentage (0-100)
        if (totalDuration > 0) {
            watchPercentage = (watchedDuration * 100) / totalDuration;
            if (watchPercentage > 100) watchPercentage = 100;
        } else {
            watchPercentage = 0;
        }
    }
} 