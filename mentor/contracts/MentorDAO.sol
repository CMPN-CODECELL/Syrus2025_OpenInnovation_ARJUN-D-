// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MentorDAO is Ownable {
    // Mentor Structure
    struct Mentor {
        address mentorAddress;
        string name;
        string expertise;
        string email;
        bool isApproved;
        uint256 totalProjects;
    }

    // Project Structure
    struct Project {
        uint256 id;
        address mentor;
        address student;
        string projectName;
        string projectDescription;
        string skillArea;
        bool isAssigned;
        bool isCompleted;
    }

    // Mappings
    mapping(address => Mentor) public mentors;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public mentorProjects;
    mapping(address => uint256[]) public studentProjects;

    // Counters (manually managed)
    uint256 public mentorCounter;
    uint256 public projectCounter;

    // Arrays to track mentor and project statuses
    address[] public pendingMentors;
    uint256[] public pendingProjects;

    // Events
    event MentorRegistered(address indexed mentorAddress, string name, string expertise);
    event MentorApproved(address indexed mentorAddress);
    event ProjectCreated(uint256 indexed projectId, address indexed mentor, string projectName);
    event ProjectAssigned(uint256 indexed projectId, address indexed student);
    event ProjectCompleted(uint256 indexed projectId);

    constructor() Ownable(msg.sender) {
        mentorCounter = 0;
        projectCounter = 0;
    }

    // Mentor Registration
    function registerMentor(
        string memory _name, 
        string memory _expertise, 
        string memory _email
    ) public {
        require(mentors[msg.sender].mentorAddress == address(0), "Mentor already registered");
        
        mentors[msg.sender] = Mentor({
            mentorAddress: msg.sender,
            name: _name,
            expertise: _expertise,
            email: _email,
            isApproved: false,
            totalProjects: 0
        });

        pendingMentors.push(msg.sender);
        mentorCounter++;
        
        emit MentorRegistered(msg.sender, _name, _expertise);
    }

    // Owner Approve Mentor
    function approveMentor(address _mentorAddress) public onlyOwner {
        require(!mentors[_mentorAddress].isApproved, "Mentor already approved");
        
        mentors[_mentorAddress].isApproved = true;
        
        // Remove from pending mentors
        for (uint i = 0; i < pendingMentors.length; i++) {
            if (pendingMentors[i] == _mentorAddress) {
                pendingMentors[i] = pendingMentors[pendingMentors.length - 1];
                pendingMentors.pop();
                break;
            }
        }
        
        emit MentorApproved(_mentorAddress);
    }

    // Create Project by Approved Mentor
    function createProject(
        string memory _projectName,
        string memory _projectDescription,
        string memory _skillArea
    ) public {
        require(mentors[msg.sender].isApproved, "Mentor not approved");
        
        projectCounter++;
        
        projects[projectCounter] = Project({
            id: projectCounter,
            mentor: msg.sender,
            student: address(0),
            projectName: _projectName,
            projectDescription: _projectDescription,
            skillArea: _skillArea,
            isAssigned: false,
            isCompleted: false
        });
        
        mentorProjects[msg.sender].push(projectCounter);
        pendingProjects.push(projectCounter);
        
        emit ProjectCreated(projectCounter, msg.sender, _projectName);
    }

    // Assign Project to Student
    function assignProject(uint256 _projectId, address _student) public {
        require(projects[_projectId].mentor == msg.sender, "Only mentor can assign project");
        require(!projects[_projectId].isAssigned, "Project already assigned");
        
        projects[_projectId].student = _student;
        projects[_projectId].isAssigned = true;
        
        studentProjects[_student].push(_projectId);
        
        // Remove from pending projects
        for (uint i = 0; i < pendingProjects.length; i++) {
            if (pendingProjects[i] == _projectId) {
                pendingProjects[i] = pendingProjects[pendingProjects.length - 1];
                pendingProjects.pop();
                break;
            }
        }
        
        emit ProjectAssigned(_projectId, _student);
    }

    // Complete Project
    function completeProject(uint256 _projectId) public {
        Project storage project = projects[_projectId];
        require(project.mentor == msg.sender, "Only mentor can complete project");
        require(project.isAssigned, "Project not assigned");
        require(!project.isCompleted, "Project already completed");
        
        project.isCompleted = true;
        
        emit ProjectCompleted(_projectId);
    }

    // Getter Functions
    function getPendingMentors() public view returns (address[] memory) {
        return pendingMentors;
    }

    function getPendingProjects() public view returns (uint256[] memory) {
        return pendingProjects;
    }

    function getProjectsByMentor(address _mentor) public view returns (
    uint256[] memory, 
    string[] memory, 
    string[] memory, 
    string[] memory, 
    bool[] memory, 
    bool[] memory
) {
    uint256[] memory projectIds = mentorProjects[_mentor];
    uint256 projectCount = projectIds.length;

    string[] memory names = new string[](projectCount);
    string[] memory descriptions = new string[](projectCount);
    string[] memory skillAreas = new string[](projectCount);
    bool[] memory isAssignedList = new bool[](projectCount);
    bool[] memory isCompletedList = new bool[](projectCount);

    for (uint256 i = 0; i < projectCount; i++) {
        Project memory project = projects[projectIds[i]];
        names[i] = project.projectName;
        descriptions[i] = project.projectDescription;
        skillAreas[i] = project.skillArea;
        isAssignedList[i] = project.isAssigned;
        isCompletedList[i] = project.isCompleted;
    }

    return (projectIds, names, descriptions, skillAreas, isAssignedList, isCompletedList);
}


    function getStudentProjects(address _student) public view returns (uint256[] memory) {
        return studentProjects[_student];
    }
}