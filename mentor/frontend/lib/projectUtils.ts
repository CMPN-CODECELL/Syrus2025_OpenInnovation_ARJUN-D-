import { ethers } from "ethers";
import { supabase } from "@/lib/supabaseClient";
import mentor from "@/app/mentor.json"; // Import Smart Contract ABI

// ✅ Function: Create Project On-Chain
export async function createProjectOnChain(
  projectName: string,
  projectDescription: string,
  skillArea: string
) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not detected");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(mentor.address, mentor.abi, signer);

    const tx = await contract.createProject(projectName, projectDescription, skillArea);
    await tx.wait();
    
    return { success: true, txHash: tx.hash };
  } catch (error) {
    console.error("Contract Error:", error);
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}

// ✅ Function: Save Project to Supabase
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
