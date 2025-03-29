"use server";

import axios from "axios";

const jwt = process.env.JWT;

if (!jwt) {
  throw new Error("JWT token is not defined in environment variables.");
}

// Define the response type for IPFS uploads
interface IPFSResponse {
  success: boolean;
  pinataURL?: string;
  message?: string;
}

// Upload JSON to IPFS
export const uploadJSONToIPFS = async (JSONBody: Record<string, any>): Promise<IPFSResponse> => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try {
    const res = await axios.post(url, JSONBody, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return {
      success: true,
      pinataURL: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
    };
  } catch (error: any) {
    console.error("Error uploading JSON to IPFS:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Upload File to IPFS
export const uploadFileToIPFS = async (data: FormData): Promise<IPFSResponse> => {
  const file = data.get("file") as File;

  if (!file) {
    return {
      success: false,
      message: "No file provided in the FormData.",
    };
  }

  const pinataMetadata = JSON.stringify({
    name: file.name,
  });
  data.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  data.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${(data as any)._boundary}`,
        Authorization: `Bearer ${jwt}`,
      },
    });

    return {
      success: true,
      pinataURL: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
    };
  } catch (error: any) {
    console.error("Error uploading file to IPFS:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};