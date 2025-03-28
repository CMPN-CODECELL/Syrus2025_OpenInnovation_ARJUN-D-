import { ethers } from "ethers";
import { supabase } from "@/lib/supabaseClient";
import mentor from "../app/mentor.json";

const CONTRACT_ADDRESS = mentor.address;
const CONTRACT_ABI = mentor.abi;

// Register mentor on-chain
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

    return tx.hash; // Return transaction hash
  } catch (error) {
    console.error("Contract Error:", error);
    return null;
  }
}

// Save mentor details to Supabase
export async function saveMentorToDB(name: string, expertise: string, email: string, wallet: string, txHash: string) {
  try {
    // Check if mentor already exists
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

// Fetch pending mentors from the contract
export async function getPendingMentors() {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    const pendingMentors = await contract.getPendingMentors();
    console.log(pendingMentors);
    return pendingMentors;
  } catch (error) {
    console.error("Error fetching pending mentors:", error);
    return [];
  }
}

// Approve a mentor on-chain
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

    return tx.hash; // Return transaction hash
  } catch (error) {
    console.error("Error approving mentor:", error);
    return null;
  }
}

// Get mentor projects from the contract
export async function getMentorProjects(mentorAddress: string) {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    // Initialize provider and contract
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    console.log("Fetching projects for Mentor:", mentorAddress);

    // Call the contract function
    const projects = await contract.getProjectsByMentor(mentorAddress);
    console.log("Raw contract response:", projects);

    // Handle case where no projects found
    if (!projects || projects[0].length === 0) {
      console.log("No projects found for address:", mentorAddress);
      return [];
    }

    // Extract and map the project data correctly
    return projects[0].map((id: any, index: number) => ({
      id: id.toString(),
      projectName: projects[1][index] || "Unnamed Project",
      projectDescription: projects[2][index] || "No description available",
      skillArea: projects[3][index] || "General",
      isAssigned: projects[4][index], // Boolean
      isCompleted: projects[5][index], // Boolean
    }));
  } catch (error) {
    console.error("Error fetching mentor projects:", error);
    return [];
  }
}