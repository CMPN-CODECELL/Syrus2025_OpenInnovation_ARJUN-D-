export default function GetIpfsUrlFromPinata(pinataUrl: string): string {
  try {
    // Parse the URL and extract the CID
    const url = new URL(pinataUrl);
    const pathParts = url.pathname.split('/');

    // Ensure there's an IPFS CID at the end of the path
    const cid = pathParts[pathParts.length - 1];
    if (!cid) {
      console.error("Invalid Pinata URL: CID not found");
      throw new Error("Invalid Pinata URL: CID not found");
    }

    // Return the IPFS gateway URL
    return `https://ipfs.io/ipfs/${cid}`;
  } catch (error: any) {
    console.error(error.message);
    return ''; // Return an empty string or a default URL if an error occurs
  }
}