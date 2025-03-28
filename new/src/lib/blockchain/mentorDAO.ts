import { ethers } from "ethers";
import { supabase } from "../supabaseClient";
import mentor from "../../app/mentor.json";

// Import the contract ABI from the JSON file
const CONTRACT_ADDRESS = mentor.address;
const CONTRACT_ABI = mentor.abi;

export interface Mentor {
  mentorAddress: string;
  name: string;
  expertise: string;
  email: string;
  isApproved: boolean;
  totalProjects: number;
}

export interface Project {
  id: number;
  mentor: string;
  student: string;
  projectName: string;
  projectDescription: string;
  skillArea: string;
  isAssigned: boolean;
  isCompleted: boolean;
}

// Function to register a mentor on the blockchain
export async function registerMentorOnChain(name: string, expertise: string, email: string) {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.registerMentor(name, expertise, email);
    await tx.wait(); // Wait for transaction confirmation

    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Contract Error:", error);
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}

// Function to save mentor data to the database
export async function saveMentorToDB(name: string, expertise: string, email: string, wallet: string, txHash: string) {
  try {
    // Check if mentor is already registered
    const { data: existingMentor, error: checkError } = await supabase
      .from("mentors")
      .select("*")
      .eq("wallet", wallet)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Supabase Query Error:", checkError);
      return false;
    }

    if (existingMentor) {
      console.warn("Mentor already registered:", existingMentor);
      return false; // Mentor is already in DB
    }

    // Insert new mentor
    const { data, error } = await supabase
      .from("mentors")
      .insert([{ name, expertise, email, wallet, tx_hash: txHash }]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Unexpected Error:", error);
    return false;
  }
}

// Function to create a new project on the blockchain
export async function createProjectOnChain(
  projectName: string,
  projectDescription: string,
  skillArea: string
) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not detected");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.createProject(projectName, projectDescription, skillArea);
    await tx.wait();
    
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Contract Error:", error);
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}

// Function to save project data to the database
export async function saveProjectToDB(
  projectName: string,
  projectDescription: string,
  skillArea: string,
  mentorWallet: string,
  txHash: string
) {
  const { data, error } = await supabase.from("projects").insert([
    { project_name: projectName, project_description: projectDescription, skill_area: skillArea, mentor_wallet: mentorWallet, tx_hash: txHash },
  ]);

  if (error) {
    console.error("Supabase Error:", error.message);
    return false;
  }
  return true;
}

// Function to fetch pending mentors from the contract
export async function getPendingMentors() {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const pendingMentors = await contract.getPendingMentors();
    return pendingMentors;
  } catch (error) {
    console.error("Error fetching pending mentors:", error);
    return [];
  }
}

// Function to approve a mentor on-chain
export async function approveMentor(mentorAddress: string) {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.approveMentor(mentorAddress);
    await tx.wait(); // Wait for transaction confirmation

    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Error approving mentor:", error);
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}

// Function to assign a project to a student
export async function assignProjectToStudent(projectId: number, studentAddress: string) {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.assignProject(projectId, studentAddress);
    await tx.wait(); // Wait for transaction confirmation

    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Error assigning project:", error);
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}

// Function to mark a project as completed
export async function completeProject(projectId: number) {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.completeProject(projectId);
    await tx.wait(); // Wait for transaction confirmation

    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Error completing project:", error);
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}

// Function to get mentor details
export async function getMentorDetails(mentorAddress: string): Promise<Mentor | null> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const mentorData = await contract.mentors(mentorAddress);
    
    return {
      mentorAddress: mentorData[0],
      name: mentorData[1],
      expertise: mentorData[2],
      email: mentorData[3],
      isApproved: mentorData[4],
      totalProjects: Number(mentorData[5])
    };
  } catch (error) {
    console.error("Error fetching mentor details:", error);
    return null;
  }
}

// Function to get project details
export async function getProjectDetails(projectId: number): Promise<Project | null> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const projectData = await contract.projects(projectId);
    
    return {
      id: Number(projectData[0]),
      mentor: projectData[1],
      student: projectData[2],
      projectName: projectData[3],
      projectDescription: projectData[4],
      skillArea: projectData[5],
      isAssigned: projectData[6],
      isCompleted: projectData[7]
    };
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
}

// Function to get all projects for a mentor
export async function getMentorProjects(mentorAddress: string): Promise<number[]> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const projectIds = await contract.getMentorProjects(mentorAddress);
    return projectIds.map((id: bigint) => Number(id));
  } catch (error) {
    console.error("Error fetching mentor projects:", error);
    return [];
  }
}

// Function to get all projects for a student
export async function getStudentProjects(studentAddress: string): Promise<number[]> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const projectIds = await contract.getStudentProjects(studentAddress);
    return projectIds.map((id: bigint) => Number(id));
  } catch (error) {
    console.error("Error fetching student projects:", error);
    return [];
  }
} 