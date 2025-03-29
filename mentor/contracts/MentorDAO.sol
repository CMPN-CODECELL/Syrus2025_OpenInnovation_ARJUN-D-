// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MentorDAO is Ownable, ERC721URIStorage {
    // Mentor Structure
    struct Mentor {
        address mentorAddress;
        string name;
        string expertise;
        string email;
        bool isApproved;
        uint256 totalProjects;
        address[] assignedStudents;
    }

    // Student Structure
    struct Student {
        address studentAddress;
        string name;
        string email;
        string skills;
        string collegeName;
        string achievements;
        address[] assignedMentors;
        uint256[] assignedProjects;
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
    mapping(address => Student) public students;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public mentorProjects;
    mapping(address => uint256[]) public studentProjects;
    mapping(address => address[]) public mentorshipRequests;

    // Arrays for pending items
    address[] public pendingMentors;
    address[] public approvedMentors;

    uint256[] public pendingProjects;

    // Counters
    uint256 public mentorCounter;
    uint256 public studentCounter;
    uint256 public projectCounter;
    uint256 public certificateCounter;

    // Events
    event MentorRegistered(address indexed mentorAddress, string name, string expertise);
    event MentorApproved(address indexed mentorAddress);
    event StudentRegistered(address indexed studentAddress, string name);
    event MentorshipRequested(address indexed student, address indexed mentor);
    event MentorshipAccepted(address indexed mentor, address indexed student);
    event ProjectCreated(uint256 indexed projectId, address indexed mentor, string projectName);
    event ProjectAssigned(uint256 indexed projectId, address indexed student);
    event ProjectCompleted(uint256 indexed projectId);
    event CertificateIssued(uint256 indexed certificateId, address indexed mentor, address indexed student, string uri);

    // Constructor
    constructor() ERC721("MentorCertificate", "MCERT") Ownable(msg.sender) {
        mentorCounter = 0;
        studentCounter = 0;
        projectCounter = 0;
        certificateCounter = 0;
    }

    // Mentor Registration
    function registerMentor(string memory _name, string memory _expertise, string memory _email) public {
        require(mentors[msg.sender].mentorAddress == address(0), "Mentor already registered");

        mentors[msg.sender] = Mentor({
            mentorAddress: msg.sender,
            name: _name,
            expertise: _expertise,
            email: _email,
            isApproved: false,
            totalProjects: 0,
            assignedStudents: new address[](0)
        });

        pendingMentors.push(msg.sender);
        mentorCounter++;
        emit MentorRegistered(msg.sender, _name, _expertise);
    }

    // Owner Approves Mentor
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

    // Student Registration
    function registerStudent(string memory _name, string memory _email, string memory _skills, string memory _collegeName, string memory _achievements) public {
        require(students[msg.sender].studentAddress == address(0), "Student already registered");

        students[msg.sender] = Student({
            studentAddress: msg.sender,
            name: _name,
            email: _email,
            skills: _skills,
            collegeName: _collegeName,
            achievements: _achievements,
            assignedMentors: new address[](0),
            assignedProjects: new uint256[](0)
        });

        studentCounter++;
        emit StudentRegistered(msg.sender, _name);
    }

    // Student Requests Mentorship
    function requestMentorship(address _mentor) public {
        require(mentors[_mentor].isApproved, "Mentor not approved");
        mentorshipRequests[_mentor].push(msg.sender);
        emit MentorshipRequested(msg.sender, _mentor);
    } 

    // Mentor Accepts Student Request
    function acceptMentorship(address _student) public {
        require(mentors[msg.sender].isApproved, "Mentor not approved");
        mentors[msg.sender].assignedStudents.push(_student);
        students[_student].assignedMentors.push(msg.sender);
        emit MentorshipAccepted(msg.sender, _student);
    }

    // Get Assigned Mentors of a Student
    function getMyMentors(address _student) public view returns (address[] memory) {
        return students[_student].assignedMentors;
    }

    // Get Assigned Students of a Mentor
    function getMyStudents(address _mentor) public view returns (address[] memory) {
        return mentors[_mentor].assignedStudents;
    }

    // Create Project
    function createProject(string memory _projectName, string memory _projectDescription, string memory _skillArea) public {
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
        students[_student].assignedProjects.push(_projectId);
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
        require(projects[_projectId].mentor == msg.sender, "Only mentor can complete project");
        require(projects[_projectId].isAssigned, "Project not assigned");
        require(!projects[_projectId].isCompleted, "Project already completed");

        projects[_projectId].isCompleted = true;
        emit ProjectCompleted(_projectId);
    }

    // Get pending mentors awaiting approval
    function getPendingMentors() public view returns (address[] memory) {
        return pendingMentors;
    }

    // Get pending projects not yet assigned
    function getPendingProjects() public view returns (uint256[] memory) {
        return pendingProjects;
    }

    // Get all projects by a mentor with detailed information
    function getProjectsByMentor(
        address _mentor
    )
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            bool[] memory,
            bool[] memory
        )
    {
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

        return (
            projectIds,
            names,
            descriptions,
            skillAreas,
            isAssignedList,
            isCompletedList
        );
    }

    // Get all project IDs assigned to a student
    function getStudentProjects(
        address _student
    ) public view returns (uint256[] memory) {
        return studentProjects[_student];
    }

    // Check if a mentor is approved
    function isMentorApproved(address _mentor) public view returns (bool) {
        return mentors[_mentor].isApproved;
    }

    function getApprovedMentors() public view returns (
        address[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory
    ) {
        uint256 count = approvedMentors.length;
        
        address[] memory addresses = new address[](count);
        string[] memory names = new string[](count);
        string[] memory expertises = new string[](count);
        string[] memory emails = new string[](count);
        uint256[] memory totalProjects = new uint256[](count);
        uint256[] memory studentCounts = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            address mentorAddr = approvedMentors[i];
            Mentor storage mentor = mentors[mentorAddr];
            
            addresses[i] = mentor.mentorAddress;
            names[i] = mentor.name;
            expertises[i] = mentor.expertise;
            emails[i] = mentor.email;
            totalProjects[i] = mentor.totalProjects;
            studentCounts[i] = mentor.assignedStudents.length;
        }
        
        return (
            addresses,
            names,
            expertises,
            emails,
            totalProjects,
            studentCounts
        );
    }

    // Issue Certificate to Student
    function issueCertificate(address _student, string memory _tokenURI) public {
        // Verify that the caller is an approved mentor
        require(mentors[msg.sender].isApproved, "Only approved mentors can issue certificates");

        // Increment the certificate counter
        certificateCounter++;

        // Mint the certificate as an NFT
        _mint(_student, certificateCounter);

        // Set the token URI (metadata for the certificate)
        _setTokenURI(certificateCounter, _tokenURI);

        // Emit the event
        emit CertificateIssued(certificateCounter, msg.sender, _student, _tokenURI);
    }
}