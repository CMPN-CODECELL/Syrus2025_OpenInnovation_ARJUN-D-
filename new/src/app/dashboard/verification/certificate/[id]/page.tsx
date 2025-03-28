"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Copy, ExternalLink, Shield } from "lucide-react";

interface Certificate {
  id: string;
  skillName: string;
  level: number;
  category: string;
  issuedDate: Date;
  expirationDate: Date;
  issuer: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    organization: string;
  };
  recipient: {
    name: string;
    walletAddress: string;
  };
  blockchain: {
    network: string;
    tokenId: string;
    contractAddress: string;
    transactionHash: string;
  };
  metadata: {
    skillDescription: string;
    projectUrl: string;
    verificationStandard: string;
    ipfsUri: string;
  };
}

interface CertificateData {
  [key: string]: Certificate;
}

// Sample certificate details - in a real app, these would be fetched from your blockchain
const CERTIFICATE_DATA: CertificateData = {
  "req-2": {
    id: "req-2",
    skillName: "Node.js",
    level: 2,
    category: "Backend",
    issuedDate: new Date("2024-03-22T14:45:00Z"),
    expirationDate: new Date("2025-03-22T14:45:00Z"),
    issuer: {
      id: "1",
      name: "Alex Rivera",
      avatar: "https://ui-avatars.com/api/?name=AR&background=4f46e5&color=fff",
      role: "Senior Full Stack Engineer",
      organization: "MentorNet DAO"
    },
    recipient: {
      name: "Jane Smith",
      walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
    },
    blockchain: {
      network: "Polygon",
      tokenId: "32893",
      contractAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      transactionHash: "0xd82b12932f3cca929ca540235c307739d39c6f0ed5785613a5326cf843a278c2"
    },
    metadata: {
      skillDescription: "Created a RESTful API using Express.js with MongoDB integration. Implemented authentication, rate limiting, and proper error handling.",
      projectUrl: "https://github.com/user/node-api-project",
      verificationStandard: "PoM-01",
      ipfsUri: "ipfs://QmZ5KmvQnvBBbgR7q2i7VwbKbaffNT5DVfk5kLJxECmqPY"
    }
  }
};

export default function CertificatePage() {
  const params = useParams();
  const certificateId = params.id as string;
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    // In a real app, this would fetch from your API or blockchain
    // For now, we'll use our sample data
    if (CERTIFICATE_DATA[certificateId]) {
      setCertificate(CERTIFICATE_DATA[certificateId]);
    }
  }, [certificateId]);

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(`${type} copied!`);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!certificate) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Certificate Not Found</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            The certificate you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link href="/dashboard/verification">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Verification
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/verification" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Verification
          </Link>
          <h1 className="text-3xl font-bold">Skill Certificate</h1>
          <p className="text-muted-foreground">
            On-chain proof of your verified skill
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{certificate.skillName}</h2>
                  <p className="text-muted-foreground">{certificate.category}</p>
                  
                  <div className="my-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Check className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="mt-2 w-full">
                    <div className="text-sm text-muted-foreground mb-1">Skill Level</div>
                    <div className="font-medium">Level {certificate.level} ({['Beginner', 'Intermediate', 'Advanced', 'Expert'][certificate.level - 1]})</div>
                  </div>
                  
                  <div className="mt-4 w-full">
                    <div className="text-sm text-muted-foreground mb-1">Issued On</div>
                    <div className="font-medium">{formatDate(certificate.issuedDate)}</div>
                  </div>
                  
                  <div className="mt-4 w-full">
                    <div className="text-sm text-muted-foreground mb-1">Valid Until</div>
                    <div className="font-medium">{formatDate(certificate.expirationDate)}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 px-6 py-4">
                <Button variant="outline" className="w-full" onClick={() => window.print()}>
                  Download Certificate
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-0">
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Certificate Details</h3>
                    <p className="text-muted-foreground mb-4">
                      This certificate verifies your proficiency in {certificate.skillName} at the {['Beginner', 'Intermediate', 'Advanced', 'Expert'][certificate.level - 1]} level.
                    </p>
                    
                    <div className="border rounded-md p-4 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Skill Description</div>
                        <p>{certificate.metadata.skillDescription}</p>
                      </div>
                      
                      {certificate.metadata.projectUrl && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Project URL</div>
                          <a 
                            href={certificate.metadata.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary flex items-center hover:underline"
                          >
                            {certificate.metadata.projectUrl}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Issuer</h3>
                    <div className="flex items-center gap-4 p-4 border rounded-md">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={certificate.issuer.avatar} alt={certificate.issuer.name} />
                        <AvatarFallback>{certificate.issuer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{certificate.issuer.name}</div>
                        <div className="text-sm text-muted-foreground">{certificate.issuer.role}</div>
                        <div className="text-sm text-muted-foreground">{certificate.issuer.organization}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Recipient</h3>
                    <div className="border rounded-md p-4">
                      <div className="font-medium">{certificate.recipient.name}</div>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-muted-foreground mr-2">Wallet:</span>
                        <code className="bg-muted px-1 py-0.5 rounded text-sm">{truncateAddress(certificate.recipient.walletAddress)}</code>
                        <button 
                          onClick={() => handleCopyToClipboard(certificate.recipient.walletAddress, "Wallet address")}
                          className="text-muted-foreground hover:text-foreground ml-1"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="blockchain" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Blockchain Information</h3>
                    <p className="text-muted-foreground mb-4">
                      This certificate is stored as a non-transferable NFT (Soulbound Token) on the blockchain, providing immutable proof of your skill verification.
                    </p>
                    
                    <div className="border rounded-md p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Network</div>
                          <div className="font-medium">{certificate.blockchain.network}</div>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 sm:self-start">
                          Verified On-Chain
                        </Badge>
                      </div>
                      
                      <div className="h-px bg-border"></div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Contract Address</div>
                        <div className="flex items-center">
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono break-all">{certificate.blockchain.contractAddress}</code>
                          <button 
                            onClick={() => handleCopyToClipboard(certificate.blockchain.contractAddress, "Contract address")}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Token ID</div>
                        <div className="flex items-center">
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{certificate.blockchain.tokenId}</code>
                          <button 
                            onClick={() => handleCopyToClipboard(certificate.blockchain.tokenId, "Token ID")}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Transaction Hash</div>
                        <div className="flex items-center">
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono break-all">{certificate.blockchain.transactionHash}</code>
                          <button 
                            onClick={() => handleCopyToClipboard(certificate.blockchain.transactionHash, "Transaction hash")}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Copy success message */}
                      {copySuccess && (
                        <div className="bg-green-50 text-green-700 px-3 py-2 rounded-md text-sm mt-3">
                          {copySuccess}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(`https://polygonscan.com/tx/${certificate.blockchain.transactionHash}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(`https://opensea.io/assets/matic/${certificate.blockchain.contractAddress}/${certificate.blockchain.tokenId}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View NFT
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Certificate Metadata</h3>
                    <p className="text-muted-foreground mb-4">
                      Technical details about this certificate and its associated metadata stored on IPFS.
                    </p>
                    
                    <div className="border rounded-md p-4 space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Verification Standard</div>
                        <div className="font-medium">{certificate.metadata.verificationStandard}</div>
                      </div>
                      
                      <div className="h-px bg-border"></div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">IPFS URI</div>
                        <div className="flex items-center">
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono break-all">{certificate.metadata.ipfsUri}</code>
                          <button 
                            onClick={() => handleCopyToClipboard(certificate.metadata.ipfsUri, "IPFS URI")}
                            className="text-muted-foreground hover:text-foreground ml-2"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="h-px bg-border"></div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Raw Metadata</div>
                        <pre className="bg-muted p-3 rounded-md text-xs overflow-auto max-h-48">
                          {JSON.stringify({
                            name: `${certificate.skillName} - ${['Beginner', 'Intermediate', 'Advanced', 'Expert'][certificate.level - 1]} Level`,
                            description: certificate.metadata.skillDescription,
                            image: "ipfs://QmYx7Mscr4MrjPvXaHEzDLHoNvqrLv7zJskdrT6qTvjM6X",
                            external_url: certificate.metadata.projectUrl,
                            attributes: [
                              { trait_type: "Skill", value: certificate.skillName },
                              { trait_type: "Category", value: certificate.category },
                              { trait_type: "Level", value: certificate.level },
                              { display_type: "date", trait_type: "Issued Date", value: certificate.issuedDate.getTime() / 1000 },
                              { display_type: "date", trait_type: "Expiration Date", value: certificate.expirationDate.getTime() / 1000 },
                              { trait_type: "Issuer", value: certificate.issuer.name },
                              { trait_type: "Organization", value: certificate.issuer.organization },
                              { trait_type: "Verification Standard", value: certificate.metadata.verificationStandard }
                            ],
                            properties: {
                              verificationMethod: "Proof-of-Mentorship",
                              issuer: {
                                id: certificate.issuer.id,
                                name: certificate.issuer.name,
                                role: certificate.issuer.role,
                                organization: certificate.issuer.organization
                              },
                              recipient: {
                                name: certificate.recipient.name,
                                wallet: certificate.recipient.walletAddress
                              }
                            }
                          }, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 