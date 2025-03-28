import { ethers } from "ethers";
import { supabase } from "@/lib/supabaseClient";
import mentor from "../app/mentor.json"; // Adjust the path as necessary
const CONTRACT_ADDRESS = mentor.address;
const CONTRACT_ABI = mentor.abi;

// Register student on-chainexport async function registerStudentOnChain(
    export async function registerStudentOnChain(
        name: string,
        email: string,
        skills: string,
        collegeName: string,
        achievements: string
      ) {
        try {
          if (!window.ethereum) {
            throw new Error("MetaMask not detected");
          }
      
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
          const tx = await contract.registerStudent(name, email, skills, collegeName, achievements);
          await tx.wait(); // Wait for transaction confirmation
      
          return tx.hash; // Return transaction hash
        } catch (error) {
          console.error("Contract Error:", error);
          return null;
        }
      }