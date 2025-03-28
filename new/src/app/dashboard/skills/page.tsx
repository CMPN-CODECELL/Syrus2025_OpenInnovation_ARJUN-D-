"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkillBadgeGroup, SkillData } from "@/components/ui/skill-badge";
import { CheckCircle2Icon, Clock, LockIcon, TrophyIcon, ArrowRightIcon, WalletIcon, GraduationCapIcon, FileTextIcon } from "lucide-react";

// Import mock skills data
import { MOCK_PROFILE_SKILLS } from "@/lib/mocks/skills";

// Group skills by category
const skillsByCategory = MOCK_PROFILE_SKILLS.reduce<Record<string, SkillData[]>>((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {});

// Mock verification requests
const MOCK_VERIFICATION_REQUESTS = [
  {
    id: "req-1",
    skillName: "Node.js",
    category: "Backend",
    status: "pending",
    submittedDate: new Date(2023, 10, 28),
    estimatedCompletionDate: new Date(2023, 11, 5),
    transactionHash: "",
    completionPercentage: 65,
  },
  {
    id: "req-2",
    skillName: "Solidity",
    category: "Blockchain",
    status: "pending",
    submittedDate: new Date(2023, 10, 15),
    estimatedCompletionDate: new Date(2023, 11, 2),
    transactionHash: "",
    completionPercentage: 87,
  }
];

// Mock certificate data
const MOCK_CERTIFICATES = [
  {
    id: "cert-1",
    title: "React Developer Certification",
    issuer: "MentorNet",
    issueDate: new Date(2023, 3, 15),
    skills: ["React", "JavaScript", "TypeScript", "State Management"],
    level: "Intermediate",
    tokenId: "1234",
    blockchain: "Ethereum",
    imageUrl: "https://placehold.co/400x300/4f46e5/ffffff?text=React+Cert",
    transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
  },
  {
    id: "cert-2",
    title: "Blockchain Developer Level 1",
    issuer: "MentorNet",
    issueDate: new Date(2023, 5, 20),
    skills: ["Solidity", "Ethereum", "Smart Contracts"],
    level: "Beginner",
    tokenId: "2345",
    blockchain: "Ethereum",
    imageUrl: "https://placehold.co/400x300/f59e0b/ffffff?text=Blockchain+Cert",
    transactionHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
  }
];

// Learning paths data
const LEARNING_PATHS = [
  {
    id: "path-1",
    title: "Frontend Developer",
    description: "Master modern frontend technologies and frameworks",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    duration: "3 months",
    difficulty: "Intermediate",
    progress: 65,
    image: "https://placehold.co/400x200/4f46e5/ffffff?text=Frontend+Path",
  },
  {
    id: "path-2",
    title: "Blockchain Developer",
    description: "Learn to build decentralized applications and smart contracts",
    skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DApps"],
    duration: "4 months",
    difficulty: "Advanced",
    progress: 30,
    image: "https://placehold.co/400x200/f59e0b/ffffff?text=Blockchain+Path",
  },
  {
    id: "path-3",
    title: "Full Stack Developer",
    description: "Develop end-to-end applications with modern technologies",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB"],
    duration: "6 months",
    difficulty: "Intermediate",
    progress: 10,
    image: "https://placehold.co/400x200/10b981/ffffff?text=Full+Stack+Path",
  }
];

// Format date for display
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Truncate wallet address for display
function truncateAddress(address: string): string {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("skills");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Skills & NFTs</h1>
          <p className="text-muted-foreground">Manage your on-chain verified skills and credentials</p>
        </div>
        
        <Button>
          <WalletIcon className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
      
      {/* Skills Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrophyIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Skills</p>
                <p className="text-2xl font-bold">{MOCK_PROFILE_SKILLS.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2Icon className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">
                  {MOCK_PROFILE_SKILLS.filter((s: SkillData) => s.verificationStatus === 'verified').length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {MOCK_PROFILE_SKILLS.filter((s: SkillData) => s.verificationStatus === 'pending').length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <GraduationCapIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">{MOCK_CERTIFICATES.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="certificates">Certificates & NFTs</TabsTrigger>
          <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
        </TabsList>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>My Skills</CardTitle>
                      <CardDescription>
                        Your technical skills with blockchain verification
                      </CardDescription>
                    </div>
                    <Button>Add New Skill</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={Object.keys(skillsByCategory)[0]} className="w-full">
                    <TabsList className="mb-4">
                      {Object.keys(skillsByCategory).map(category => (
                        <TabsTrigger key={category} value={category}>
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(skillsByCategory).map(([category, skills]) => (
                      <TabsContent key={category} value={category}>
                        <div className="grid gap-4">
                          {(skills as SkillData[]).map(skill => (
                            <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-4">
                                {/* Skill level indicator */}
                                <div className="flex flex-col items-center justify-center w-14">
                                  <div className="relative h-12 w-12">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-lg font-bold">{skill.level}</span>
                                    </div>
                                    <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                                      <path
                                        d="M18 2.0845
                                          a 15.9155 15.9155 0 0 1 0 31.831
                                          a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="3"
                                        strokeDasharray="100, 100"
                                      />
                                      <path
                                        d="M18 2.0845
                                          a 15.9155 15.9155 0 0 1 0 31.831
                                          a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke={skill.verificationStatus === 'verified' ? '#10b981' : 
                                               skill.verificationStatus === 'pending' ? '#f59e0b' : '#6b7280'}
                                        strokeWidth="3"
                                        strokeDasharray={`${skill.level * 20}, 100`}
                                      />
                                    </svg>
                                  </div>
                                  <span className="text-xs text-muted-foreground mt-1">Level</span>
                                </div>
                                
                                {/* Skill details */}
                                <div>
                                  <p className="font-medium">{skill.name}</p>
                                  <div className="flex items-center mt-1">
                                    {skill.verificationStatus === 'verified' && (
                                      <div className="flex items-center text-xs text-green-600">
                                        <CheckCircle2Icon className="h-3 w-3 mr-1" />
                                        Verified on-chain
                                        {skill.transactionHash && (
                                          <button className="ml-2 text-primary hover:underline text-xs font-mono" 
                                                  onClick={() => navigator.clipboard.writeText(skill.transactionHash!)}>
                                            {truncateAddress(skill.transactionHash)}
                                          </button>
                                        )}
                                      </div>
                                    )}
                                    {skill.verificationStatus === 'pending' && (
                                      <div className="flex items-center text-xs text-yellow-600">
                                        <Clock className="h-3 w-3 mr-1" />
                                        Verification in progress
                                      </div>
                                    )}
                                    {skill.verificationStatus === 'unverified' && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <LockIcon className="h-3 w-3 mr-1" />
                                        Not verified
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Action buttons */}
                              <div className="flex gap-2">
                                {skill.verificationStatus !== 'verified' && (
                                  <Button size="sm" variant="outline">
                                    Request Verification
                                  </Button>
                                )}
                                {skill.verificationStatus === 'verified' && (
                                  <Button size="sm" variant="outline">
                                    View Certificate
                                  </Button>
                                )}
                                <Button size="sm" variant="ghost">Edit</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Verification Status */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Requests</CardTitle>
                  <CardDescription>Track your pending skill verifications</CardDescription>
                </CardHeader>
                <CardContent>
                  {MOCK_VERIFICATION_REQUESTS.length > 0 ? (
                    <div className="space-y-4">
                      {MOCK_VERIFICATION_REQUESTS.map(request => (
                        <div key={request.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{request.skillName}</h4>
                              <p className="text-xs text-muted-foreground">{request.category}</p>
                            </div>
                            <Badge variant="outline">{request.status}</Badge>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Verification progress</span>
                              <span>{request.completionPercentage}%</span>
                            </div>
                            <Progress value={request.completionPercentage} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Submitted: {formatDate(request.submittedDate)}</span>
                            <span>Est. completion: {formatDate(request.estimatedCompletionDate)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <CheckCircle2Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">No pending requests</h3>
                      <p className="text-sm text-muted-foreground mt-1">Request verification for your skills to earn on-chain credentials</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Verification History</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Verification Process</CardTitle>
                  <CardDescription>How blockchain verification works</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Request Verification</p>
                        <p className="text-sm text-muted-foreground">Submit your skill for review with evidence of your proficiency</p>
                      </div>
                    </div>
                    
                    <div className="ml-3 h-6 border-l border-dashed"></div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Mentor Assessment</p>
                        <p className="text-sm text-muted-foreground">AI and human mentors review your submission and evidence</p>
                      </div>
                    </div>
                    
                    <div className="ml-3 h-6 border-l border-dashed"></div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">On-Chain Verification</p>
                        <p className="text-sm text-muted-foreground">Successful verifications are recorded on blockchain as proof</p>
                      </div>
                    </div>
                    
                    <div className="ml-3 h-6 border-l border-dashed"></div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        4
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Earn SBT NFT</p>
                        <p className="text-sm text-muted-foreground">Receive a Soulbound NFT certificate for your verified skill</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>My Certificates</CardTitle>
                  <CardDescription>Your blockchain-verified certificates and NFTs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {MOCK_CERTIFICATES.map(cert => (
                      <div key={cert.id} className="border rounded-lg overflow-hidden flex flex-col">
                        <div className="aspect-video bg-muted relative">
                          <img 
                            src={cert.imageUrl} 
                            alt={cert.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="backdrop-blur-sm bg-black/50 text-white border-0">
                              {cert.level}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{cert.title}</h3>
                            <Badge variant="outline">SBT NFT</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            Issued by {cert.issuer} • {formatDate(cert.issueDate)}
                          </p>
                          
                          <div className="mb-3 flex-1">
                            <div className="flex flex-wrap gap-1">
                              {cert.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <WalletIcon className="h-3 w-3 mr-1" />
                              <span>{cert.blockchain}</span>
                            </div>
                            <span className="font-mono">TokenID: #{cert.tokenId}</span>
                          </div>
                          
                          <div className="flex gap-2 mt-auto">
                            <Button size="sm" variant="outline" className="flex-1">
                              View on Chain
                            </Button>
                            <Button size="sm" variant="ghost">
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About SBTs</CardTitle>
                  <CardDescription>What are Soulbound Tokens?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Soulbound Tokens (SBTs) are non-transferable tokens that represent a person's identity, credentials, and achievements on the blockchain.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <span className="font-medium">Verifiable</span>: Anyone can verify the authenticity of your skills and credentials.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle2Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <span className="font-medium">Non-transferable</span>: SBTs cannot be sold or transferred, ensuring they belong only to you.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CheckCircle2Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <span className="font-medium">Permanent</span>: Your achievements are permanently recorded on the blockchain.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More About SBTs
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Get More Certificates</CardTitle>
                  <CardDescription>Earn blockchain-verified certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border border-dashed rounded-lg text-center">
                    <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FileTextIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Ready to earn certificates?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete learning paths and verify your skills to earn blockchain credentials
                    </p>
                    <Button>
                      Browse Learning Paths
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Learning Paths Tab */}
        <TabsContent value="learning-paths" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Learning Paths</CardTitle>
                  <CardDescription>Structured paths to acquire and verify skills</CardDescription>
                </div>
                <Button variant="outline">
                  <WalletIcon className="mr-2 h-4 w-4" />
                  Explore More Paths
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {LEARNING_PATHS.map(path => (
                  <div key={path.id} className="border rounded-lg overflow-hidden flex flex-col">
                    <div className="aspect-video bg-muted relative">
                      <img 
                        src={path.image} 
                        alt={path.title} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-black/50 text-white border-0">
                          {path.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-medium mb-1">{path.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {path.description}
                      </p>
                      
                      <div className="space-y-1 mb-3 flex-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Duration: {path.duration}</span>
                          <span>{path.progress}% complete</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {path.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {path.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{path.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button className="w-full mt-auto">
                        {path.progress > 0 ? 'Continue Path' : 'Start Path'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Paths</CardTitle>
              <CardDescription>Based on your skills and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">Advanced React Development</h3>
                        <p className="text-sm text-muted-foreground">Perfect next step for your frontend skills</p>
                      </div>
                      <Badge>98% match</Badge>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">Redux</Badge>
                      <Badge variant="secondary" className="text-xs">Performance</Badge>
                      <Badge variant="secondary" className="text-xs">Testing</Badge>
                    </div>
                  </div>
                  
                  <Button>View Path</Button>
                </div>
                
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <WalletIcon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">Web3 Frontend Integration</h3>
                        <p className="text-sm text-muted-foreground">Connect your React skills with blockchain</p>
                      </div>
                      <Badge>85% match</Badge>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Ethereum</Badge>
                      <Badge variant="secondary" className="text-xs">Web3.js</Badge>
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">dApps</Badge>
                    </div>
                  </div>
                  
                  <Button>View Path</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Recommendations</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 