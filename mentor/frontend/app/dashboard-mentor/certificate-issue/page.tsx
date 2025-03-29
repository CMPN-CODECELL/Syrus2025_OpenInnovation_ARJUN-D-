"use client";

import { useState } from "react";
import { uploadJSONToIPFS } from "@/app/pinata"; // Ensure this is correctly implemented
import GetIpfsUrlFromPinata from "@/app/utils"; // Ensure this is correctly implemented
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import mentor from "../../mentor.json"; // Ensure this contains the deployed contract address and ABI

const CONTRACT_ADDRESS = mentor.address; // Replace with your deployed contract address
const MentorDAOABI = mentor.abi; // Replace with the actual ABI from your contract

export default function CertificateIssuePage() {
  const [studentAddress, setStudentAddress] = useState("");
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!studentAddress || !certificateImage) {
      alert("Please provide both the student's address and the certificate image.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      // Step 1: Upload the certificate metadata to IPFS
      const metadata = {
        name: "Certificate Metadata",
        description: "Certificate issued by MentorDAO",
        image: certificateImage.name,
      };

      const ipfsResponse = await uploadJSONToIPFS(metadata);

      if (!ipfsResponse.success) {
        throw new Error("Failed to upload certificate metadata to IPFS.");
      }

      const ipfsUrl = GetIpfsUrlFromPinata(ipfsResponse.pinataURL || "");

      // Step 2: Interact with the smart contract to issue the certificate
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MentorDAOABI, await signer);

      const tx = await contract.issueCertificate(studentAddress, ipfsUrl);
      await tx.wait();

      setSuccessMessage("Certificate issued successfully!");
    } catch (error: any) {
      console.error("Error issuing certificate:", error.message);
      alert("An error occurred while issuing the certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg border border-emerald-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-emerald-500 text-center text-2xl font-bold">
            Issue Certificate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Student Address</label>
              <Input
                type="text"
                placeholder="0x123...abc"
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Certificate Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Issuing...</span>
              </div>
            ) : (
              "Issue Certificate"
            )}
          </Button>
        </CardFooter>
        {successMessage && (
          <div className="p-4 text-center text-sm text-emerald-500 font-medium">
            {successMessage}
          </div>
        )}
      </Card>
    </div>
  );
}