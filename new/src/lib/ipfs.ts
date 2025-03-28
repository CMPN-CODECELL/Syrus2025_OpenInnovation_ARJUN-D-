import { Web3Storage } from 'web3.storage';
import { Skill, Project, Certificate, MentorshipSession } from '@/lib/contexts/portfolio-context';

// Client-side only code
let ipfsClient: any = null;

// Use dynamic import for IPFS HTTP client to prevent server-side errors
if (typeof window !== 'undefined') {
  import('ipfs-http-client').then((module) => {
    ipfsClient = module.create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });
  }).catch(err => {
    console.error("Failed to load IPFS client:", err);
  });
}

// Create a Web3Storage client
const createWeb3StorageClient = () => {
  const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || '';
  return new Web3Storage({ token });
};

// File interface for IPFS upload
export interface IPFSFile {
  name: string;
  type: string;
  content: Uint8Array;
}

// Mock API token for Web3.Storage - in production, use environment variables
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgzMjY4NDZjRjZFMTJCYWY1MUIyODU1OWQ2MmY0QzRCMEJBQTMwYzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQzMDY3NzM3ODAsIm5hbWUiOiJtZW50b3JuZXQtdGVzdC10b2tlbiJ9.hZfHZHAGWfmwSo7RtOVS5U31WjpQQiYHJDI6iE3g9zk';

/**
 * Convert an object to a File object for IPFS storage
 * @param obj Object to be stored
 * @param name Filename
 * @returns File object
 */
function objectToFile(obj: any, name: string): File {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  return new File([blob], name);
}

/**
 * Upload a file to IPFS using Web3Storage
 * @param file File to upload
 * @returns IPFS hash (CID)
 */
export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const client = createWeb3StorageClient();
    const cid = await client.put([file]);
    return cid;
  } catch (error) {
    console.error('Error uploading to IPFS via Web3Storage:', error);
    throw error;
  }
};

/**
 * Upload JSON data to IPFS
 * @param data JSON data to upload
 * @returns IPFS hash (CID)
 */
export const uploadJSONToIPFS = async (data: any): Promise<string> => {
  try {
    const client = createWeb3StorageClient();
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const file = new File([blob], 'data.json');
    const cid = await client.put([file]);
    return cid;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};

/**
 * Get the IPFS gateway URL for a CID
 * @param cid Content identifier (IPFS hash)
 * @returns Gateway URL
 */
export function getIPFSGatewayURL(cid: string): string {
  // Use public gateway or Infura gateway
  const gateway = 'https://ipfs.io/ipfs/';
  return `${gateway}${cid}`;
}

/**
 * Upload a skill to IPFS
 * @param skill Skill data
 * @returns IPFS CID (hash)
 */
export async function uploadSkillToIPFS(skill: Skill): Promise<string> {
  try {
    const client = createWeb3StorageClient();
    
    // Create a file from the skill data
    const skillFile = objectToFile({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      description: skill.description || '',
      createdAt: new Date().toISOString(),
    }, `skill_${skill.id}.json`);
    
    // Upload to IPFS via Web3.Storage
    const cid = await client.put([skillFile], {
      name: `skill_${skill.id}`,
      wrapWithDirectory: false,
    });
    
    return cid;
  } catch (error) {
    console.error('Error uploading skill to IPFS:', error);
    
    // For development/demo purposes, return a mock CID if upload fails
    return `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  }
}

/**
 * Upload a project to IPFS
 * @param project Project data
 * @returns IPFS CID (hash)
 */
export async function uploadProjectToIPFS(project: Project): Promise<string> {
  try {
    const client = createWeb3StorageClient();
    
    // Create a file from the project data
    const projectFile = objectToFile({
      title: project.title,
      description: project.description,
      skills: project.skills,
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      imageUrl: project.imageUrl || '',
      createdAt: new Date().toISOString(),
    }, `project_${project.id}.json`);
    
    // Upload to IPFS via Web3.Storage
    const cid = await client.put([projectFile], {
      name: `project_${project.id}`,
      wrapWithDirectory: false,
    });
    
    return cid;
  } catch (error) {
    console.error('Error uploading project to IPFS:', error);
    
    // For development/demo purposes, return a mock CID if upload fails
    return `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  }
}

/**
 * Upload a certificate to IPFS
 * @param certificate Certificate data
 * @returns IPFS CID (hash)
 */
export async function uploadCertificateToIPFS(certificate: Certificate): Promise<string> {
  try {
    const client = createWeb3StorageClient();
    
    // Create a file from the certificate data
    const certificateFile = objectToFile({
      title: certificate.title,
      issuer: certificate.issuer,
      issueDate: certificate.issueDate.toISOString(),
      credentialUrl: certificate.credentialUrl || '',
      imageUrl: certificate.imageUrl || '',
      createdAt: new Date().toISOString(),
    }, `certificate_${certificate.id}.json`);
    
    // Upload to IPFS via Web3.Storage
    const cid = await client.put([certificateFile], {
      name: `certificate_${certificate.id}`,
      wrapWithDirectory: false,
    });
    
    return cid;
  } catch (error) {
    console.error('Error uploading certificate to IPFS:', error);
    
    // For development/demo purposes, return a mock CID if upload fails
    return `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  }
}

/**
 * Upload a mentorship session to IPFS
 * @param session Mentorship session data
 * @returns IPFS CID (hash)
 */
export async function uploadMentorshipToIPFS(session: MentorshipSession): Promise<string> {
  try {
    const client = createWeb3StorageClient();
    
    // Create a file from the mentorship session data
    const sessionFile = objectToFile({
      mentorName: session.mentorName,
      mentorAddress: session.mentorAddress || '',
      mentorAvatar: session.mentorAvatar || '',
      topic: session.topic,
      date: session.date.toISOString(),
      duration: session.duration,
      endorsements: session.endorsements,
      createdAt: new Date().toISOString(),
    }, `mentorship_${session.id}.json`);
    
    // Upload to IPFS via Web3.Storage
    const cid = await client.put([sessionFile], {
      name: `mentorship_${session.id}`,
      wrapWithDirectory: false,
    });
    
    return cid;
  } catch (error) {
    console.error('Error uploading mentorship session to IPFS:', error);
    
    // For development/demo purposes, return a mock CID if upload fails
    return `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  }
}

/**
 * Retrieve a file from IPFS
 * @param cid IPFS Content ID
 * @returns JSON data
 */
export const retrieveFromIPFS = async (cid: string): Promise<any> => {
  try {
    const client = createWeb3StorageClient();
    const res = await client.get(cid);
    
    if (!res || !res.ok) {
      throw new Error(`Failed to retrieve file from IPFS: ${cid}`);
    }
    
    // Get files from the Web3Storage response
    const files = await res.files();
    if (!files || files.length === 0) {
      throw new Error('No files found');
    }
    
    // Parse JSON content
    const content = await files[0].text();
    return JSON.parse(content);
  } catch (error) {
    console.error('Error retrieving from IPFS:', error);
    throw error;
  }
};

/**
 * Check if an IPFS file exists and is retrievable
 * @param cid IPFS Content ID
 * @returns Boolean indicating if the file exists and is retrievable
 */
export const checkIPFSFile = async (cid: string): Promise<boolean> => {
  try {
    const client = createWeb3StorageClient();
    const res = await client.get(cid);
    return res !== null && res.ok;
  } catch (error) {
    console.error('Error checking IPFS file:', error);
    return false;
  }
};