"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { SkillBadge, SkillData, SkillVerificationStatus } from "@/components/ui/skill-badge";
import { MOCK_PROFILE_SKILLS } from "@/lib/mocks/skills";
import { 
  ArrowRightIcon, 
  CheckCircle2Icon, 
  Clock, 
  FileTextIcon, 
  LinkIcon, 
  UploadIcon, 
  WalletIcon,
  FileUpIcon,
  SearchIcon,
  ListChecksIcon,
  Check,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";
import Link from "next/link";

// Filter skills that are unverified or pending
const unverifiedSkills = MOCK_PROFILE_SKILLS.filter(
  skill => skill.verificationStatus === "unverified"
);
const pendingSkills = MOCK_PROFILE_SKILLS.filter(
  skill => skill.verificationStatus === "pending"
);
const verifiedSkills = MOCK_PROFILE_SKILLS.filter(
  skill => skill.verificationStatus === "verified"
);

// Mock verification history
const VERIFICATION_HISTORY = [
  {
    id: "ver-1",
    skillName: "React",
    submittedDate: new Date(2023, 7, 10),
    completedDate: new Date(2023, 7, 15),
    status: "verified",
    transactionHash: "0x8a3b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    reviewedBy: {
      name: "Marcus Lin",
      avatar: "https://ui-avatars.com/api/?name=ML&background=4f46e5&color=fff"
    }
  },
  {
    id: "ver-2",
    skillName: "TypeScript",
    submittedDate: new Date(2023, 8, 5),
    completedDate: new Date(2023, 8, 12),
    status: "verified",
    transactionHash: "0x6c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    reviewedBy: {
      name: "Sarah Chen",
      avatar: "https://ui-avatars.com/api/?name=SC&background=10b981&color=fff"
    }
  },
  {
    id: "ver-3",
    skillName: "Node.js",
    submittedDate: new Date(2023, 9, 18),
    completedDate: null,
    status: "pending",
    transactionHash: "",
    reviewedBy: null
  },
  {
    id: "ver-4",
    skillName: "GraphQL",
    submittedDate: new Date(2023, 6, 20),
    completedDate: new Date(2023, 6, 28),
    status: "verified",
    transactionHash: "0x2g8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5g6h",
    reviewedBy: {
      name: "Marcus Lin",
      avatar: "https://ui-avatars.com/api/?name=ML&background=4f46e5&color=fff"
    }
  },
  {
    id: "ver-5",
    skillName: "Solidity",
    submittedDate: new Date(2023, 10, 3),
    completedDate: null,
    status: "pending",
    transactionHash: "",
    reviewedBy: null
  }
];

// Mock mentors available for verification
const AVAILABLE_MENTORS = [
  {
    id: "mentor-1",
    name: "Manish Gupta",
    avatar: "https://ui-avatars.com/api/?name=MG&background=4f46e5&color=fff",
    skills: ["React", "JavaScript", "TypeScript", "Frontend Development"],
    rating: 4.9,
    verifications: 124,
    available: true,
    location: "Pune"
  },
  {
    id: "mentor-2",
    name: "Neha Reddy",
    avatar: "https://ui-avatars.com/api/?name=NR&background=10b981&color=fff",
    skills: ["Node.js", "Express", "MongoDB", "Backend Development"],
    rating: 4.8,
    verifications: 98,
    available: true,
    location: "Hyderabad"
  },
  {
    id: "mentor-3",
    name: "Arjun Patel",
    avatar: "https://ui-avatars.com/api/?name=AP&background=f59e0b&color=fff",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Blockchain Development"],
    rating: 4.7,
    verifications: 87,
    available: false,
    location: "Ahmedabad"
  }
];

// Format date for display
function formatDate(date: Date | null): string {
  if (!date) return "Pending";
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Truncate wallet address for display
function truncateAddress(address: string): string {
  if (!address) return "Pending";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Sample data for skill requests
const VERIFICATION_REQUESTS = [
  {
    id: "req-1",
    skill: {
      id: "skill-1",
      name: "React",
      category: "Frontend",
      level: 3,
      verificationStatus: "pending" as SkillVerificationStatus,
      progress: 75,
      description: "Built a complex e-commerce application with React, Redux, and React Query."
    },
    status: "pending",
    submittedDate: new Date("2024-03-25T15:00:00Z"),
    mentor: {
      id: "1",
      name: "Amit Kumar",
      avatar: "https://ui-avatars.com/api/?name=AK&background=4f46e5&color=fff",
      role: "Senior Full Stack Engineer"
    },
    projectUrl: "https://github.com/user/react-project",
    description: "Built a complex e-commerce application with React, Redux, and React Query. Implemented advanced state management patterns and optimized rendering performance."
  },
  {
    id: "req-2",
    skill: {
      id: "skill-2",
      name: "Node.js",
      category: "Backend",
      level: 2,
      verificationStatus: "verified" as SkillVerificationStatus,
      progress: 100,
      description: "Created a RESTful API using Express.js with MongoDB integration.",
      verifiedDate: new Date("2024-03-22T14:45:00Z")
    },
    status: "approved",
    submittedDate: new Date("2024-03-20T10:30:00Z"),
    verifiedDate: new Date("2024-03-22T14:45:00Z"),
    mentor: {
      id: "1",
      name: "Amit Kumar",
      avatar: "https://ui-avatars.com/api/?name=AK&background=4f46e5&color=fff",
      role: "Senior Full Stack Engineer"
    },
    projectUrl: "https://github.com/user/node-api-project",
    description: "Created a RESTful API using Express.js with MongoDB integration. Implemented authentication, rate limiting, and proper error handling."
  },
  {
    id: "req-3",
    skill: {
      id: "skill-3",
      name: "TensorFlow",
      category: "Machine Learning",
      level: 1,
      verificationStatus: "unverified" as SkillVerificationStatus,
      progress: 30,
      description: "Built a simple image classification model using TensorFlow."
    },
    status: "rejected",
    submittedDate: new Date("2024-03-18T09:15:00Z"),
    verifiedDate: new Date("2024-03-19T16:20:00Z"),
    mentor: {
      id: "2",
      name: "Priya Sharma",
      avatar: "https://ui-avatars.com/api/?name=PS&background=10b981&color=fff",
      role: "AI/ML Engineer & Mentor"
    },
    projectUrl: "https://github.com/user/tensorflow-basics",
    description: "Built a simple image classification model using TensorFlow. The model needs more training data and the implementation has some issues with overfitting.",
    rejectionReason: "The project shows basic understanding but needs more depth. Please improve model accuracy and address overfitting issues."
  }
];

// Sample of available skills for verification
const AVAILABLE_SKILLS = [
  { name: "React", category: "Frontend", mentors: 5 },
  { name: "Node.js", category: "Backend", mentors: 4 },
  { name: "Python", category: "Programming", mentors: 7 },
  { name: "TensorFlow", category: "Machine Learning", mentors: 3 },
  { name: "Solidity", category: "Blockchain", mentors: 2 },
  { name: "AWS", category: "Cloud", mentors: 6 },
  { name: "Docker", category: "DevOps", mentors: 4 },
  { name: "Kubernetes", category: "DevOps", mentors: 3 },
  { name: "GraphQL", category: "API", mentors: 2 },
  { name: "TypeScript", category: "Programming", mentors: 5 }
];

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [evidenceUploaded, setEvidenceUploaded] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSubmitRequest = () => {
    // In a real app, this would submit to the blockchain
    alert("Verification request submitted! A mentor will review your submission and verify your skill on the blockchain.");
  };
  
  const filteredSkills = AVAILABLE_SKILLS.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Skill Verification</h1>
          <p className="text-muted-foreground">
            Get your skills verified on-chain by expert mentors
          </p>
        </div>
        
        <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="available">Available Skills</TabsTrigger>
            <TabsTrigger value="verified">Verified Skills</TabsTrigger>
          </TabsList>
          
          {/* My Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {VERIFICATION_REQUESTS.length > 0 ? (
              <div className="space-y-4">
                {VERIFICATION_REQUESTS.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{request.skill.name}</CardTitle>
                          <CardDescription>Level: {request.skill.level}</CardDescription>
                        </div>
                        {request.status === "pending" && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                        {request.status === "approved" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {request.status === "rejected" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <X className="h-3 w-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.mentor.avatar} alt={request.mentor.name} />
                          <AvatarFallback>{request.mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{request.mentor.name}</div>
                          <div className="text-sm text-muted-foreground">{request.mentor.role}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="mb-2 font-medium">Project URL</div>
                        <a href={request.projectUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline truncate block mb-3">
                          {request.projectUrl}
                        </a>
                        
                        <div className="mb-2 font-medium">Description</div>
                        <p className="text-muted-foreground mb-3">{request.description}</p>
                        
                        {request.status === "pending" && (
                          <div className="flex items-center text-amber-700">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Submitted on {formatDate(request.submittedDate)}</span>
                          </div>
                        )}
                        {request.status === "approved" && request.verifiedDate && (
                          <div className="flex items-center text-green-700">
                            <Check className="h-4 w-4 mr-1" />
                            <span>Verified on {formatDate(request.verifiedDate)}</span>
                          </div>
                        )}
                        {request.status === "rejected" && request.verifiedDate && (
                          <div className="space-y-2">
                            <div className="flex items-center text-red-700">
                              <X className="h-4 w-4 mr-1" />
                              <span>Rejected on {formatDate(request.verifiedDate)}</span>
                            </div>
                            <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-md">
                              <div className="font-medium mb-1">Reason:</div>
                              <p>{request.rejectionReason}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {request.status === "pending" && (
                        <Button variant="outline" className="w-full">Cancel Request</Button>
                      )}
                      {request.status === "rejected" && (
                        <Button className="w-full">Resubmit Request</Button>
                      )}
                      {request.status === "approved" && (
                        <Link href={`/dashboard/verification/certificate/${request.id}`} className="w-full">
                          <Button variant="outline" className="w-full">View NFT Certificate</Button>
                        </Link>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No verification requests yet</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Submit a request to have your skills verified by expert mentors
                </p>
                <Button onClick={() => setActiveTab("available")}>
                  Browse Available Skills
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Available Skills Tab */}
          <TabsContent value="available" className="space-y-6">
            <div className="relative mb-6">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill) => (
                <Card key={skill.name} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <CardDescription>{skill.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm mb-2">
                      <Shield className="h-4 w-4 text-primary mr-1" />
                      <span>{skill.mentors} mentors available for verification</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get your {skill.name} skills verified by expert mentors and receive an on-chain credential.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Request Verification</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredSkills.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <SearchIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No skills found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Verified Skills Tab */}
          <TabsContent value="verified" className="space-y-6">
            {VERIFICATION_REQUESTS.filter(req => req.status === "approved").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VERIFICATION_REQUESTS.filter(req => req.status === "approved").map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <div className="p-6 flex justify-center items-center border-b">
                      <div className="flex items-center justify-center bg-gray-100 rounded-full p-4">
                        <div className="text-xl font-bold text-primary">{request.skill.name}</div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{request.skill.name}</CardTitle>
                      <CardDescription>Level: {request.skill.level}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={request.mentor.avatar} alt={request.mentor.name} />
                          <AvatarFallback>{request.mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div>Verified by:</div>
                          <div className="font-medium">{request.mentor.name}</div>
                        </div>
                      </div>
                      {request.verifiedDate && (
                        <div className="flex items-center text-sm text-green-700">
                          <Check className="h-4 w-4 mr-1" />
                          <span>Verified on {formatDate(request.verifiedDate)}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href={`/dashboard/verification/certificate/${request.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Certificate</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No verified skills yet</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Submit skill verification requests to start building your on-chain credentials
                </p>
                <Button onClick={() => setActiveTab("available")}>
                  Browse Available Skills
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 