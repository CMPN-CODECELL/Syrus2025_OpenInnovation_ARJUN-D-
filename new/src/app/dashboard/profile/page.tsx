"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillBadgeGroup, SkillData } from "@/components/ui/skill-badge";
import { useAuth } from "@/lib/auth";
import { CheckCircle2Icon, EditIcon, GraduationCapIcon, BriefcaseIcon, CalendarIcon, LinkIcon, WalletIcon } from "lucide-react";

// Mock user data for the profile page
const MOCK_USER = {
  id: "user-1",
  firstName: "Rahul",
  lastName: "Verma",
  email: "rahul.verma@gmail.com",
  role: "developer",
  bio: "Software developer with passion for creating impactful applications that solve real-world problems. Currently focused on blockchain technologies and Web3 development.",
  location: "Mumbai, India",
  profileImage: "https://ui-avatars.com/api/?name=RV&background=6366f1&color=fff",
  walletAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
  skills: [
    {
      id: "skill-1",
      name: "JavaScript",
      level: 4,
      category: "Programming",
      verificationStatus: "verified" as SkillVerificationStatus,
      progress: 100,
      description: "Proficient in modern JavaScript with experience in ES6+ features",
      verified: true,
      verifiedDate: new Date(2023, 8, 15),
      transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
    {
      id: "skill-2",
      name: "React",
      level: 3,
      category: "Frontend",
      verificationStatus: "verified" as SkillVerificationStatus,
      progress: 100,
      description: "Experience building complex SPAs with React hooks and context API",
      verified: true,
      verifiedDate: new Date(2023, 9, 3),
      transactionHash: "0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    },
    {
      id: "skill-3",
      name: "Node.js",
      level: 3,
      category: "Backend",
      verificationStatus: "pending" as SkillVerificationStatus,
      progress: 60,
      description: "Building RESTful APIs with Express.js and MongoDB",
      verified: false,
    },
    {
      id: "skill-4",
      name: "Blockchain",
      level: 2,
      category: "Web3",
      verificationStatus: "unverified" as SkillVerificationStatus,
      progress: 40,
      description: "Understanding of blockchain fundamentals and smart contracts",
      verified: false,
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "IIT Mumbai",
      degree: "B.Tech in Computer Science",
      graduationDate: new Date(2022, 5, 15),
      verified: false,
      verificationHash: null,
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "TCS Digital",
      position: "Frontend Developer Intern",
      startDate: new Date(2022, 5, 1),
      endDate: new Date(2022, 8, 31),
      description: "Developed responsive web applications using React and TypeScript.",
      verified: true,
      verificationHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    }
  ]
};

// Mock mentorship sessions data
const MOCK_MENTORSHIP_SESSIONS = [
  {
    id: "session-1",
    mentorName: "Amit Kumar",
    mentorAvatar: "https://ui-avatars.com/api/?name=AK&background=4f46e5&color=fff",
    specialty: "software_development",
    date: new Date(2023, 10, 10),
    duration: 60, // minutes
    topics: ["React", "TypeScript", "Career Advice"],
    verified: true,
    verificationHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
  },
  {
    id: "session-2",
    mentorName: "Priya Sharma",
    mentorAvatar: "https://ui-avatars.com/api/?name=PS&background=8b5cf6&color=fff",
    specialty: "data_science",
    date: new Date(2023, 10, 17),
    duration: 45, // minutes
    topics: ["Python", "Data Analysis", "Machine Learning"],
    verified: true,
    verificationHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
  },
  {
    id: "session-3",
    mentorName: "Vikram Singh",
    mentorAvatar: "https://ui-avatars.com/api/?name=VS&background=f59e0b&color=fff",
    specialty: "blockchain",
    date: new Date(2023, 10, 25),
    duration: 90, // minutes
    topics: ["Smart Contracts", "Solidity", "Web3 Development"],
    verified: true,
    verificationHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
  },
];

// Mock skills data
const MOCK_PROFILE_SKILLS: SkillData[] = [
  {
    id: "skill-1",
    name: "React",
    level: 5,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 11, 15),
    transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
  },
  {
    id: "skill-2",
    name: "TypeScript",
    level: 4,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 10, 5),
    transactionHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
  },
  {
    id: "skill-3",
    name: "Next.js",
    level: 4,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 9, 20),
    transactionHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
  },
  {
    id: "skill-4",
    name: "Node.js",
    level: 3,
    category: "Backend",
    verificationStatus: "pending",
  },
  {
    id: "skill-5",
    name: "GraphQL",
    level: 2,
    category: "Backend",
    verificationStatus: "unverified",
  },
  {
    id: "skill-7",
    name: "Solidity",
    level: 3,
    category: "Blockchain",
    verificationStatus: "pending",
  },
  {
    id: "skill-8",
    name: "Ethereum",
    level: 3,
    category: "Blockchain",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 7, 25),
    transactionHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
  },
];

// Group skills by category
const skillsByCategory = MOCK_PROFILE_SKILLS.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, SkillData[]>);

// Format date for display
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Fix the truncateAddress function to handle null values
function truncateAddress(address: string | null): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Always use mock data for now since we don't have the full user implementation
  const profileData = MOCK_USER;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      
      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profileData.profileImage} />
              <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                <Badge className="ml-2">{profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}</Badge>
              </div>
              
              <p className="text-muted-foreground text-sm max-w-lg">{profileData.bio}</p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <WalletIcon className="h-4 w-4" />
                <span className="font-mono">{truncateAddress(profileData.walletAddress)}</span>
                <button className="text-primary hover:underline text-xs" onClick={() => navigator.clipboard.writeText(profileData.walletAddress)}>
                  Copy
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Joined {formatDate(profileData.education[0].graduationDate)}</span>
              </div>
            </div>
            
            <Button variant="outline" className="self-start" size="sm">
              <EditIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Top Skills</CardTitle>
                <CardDescription>
                  Your highest-rated and verified skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillBadgeGroup 
                  skills={MOCK_PROFILE_SKILLS.filter(s => s.verificationStatus === 'verified')} 
                  limit={5}
                  className="mb-2"
                />
                
                <div className="flex justify-end">
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setActiveTab("skills")}
                  >
                    View all skills
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Mentorship */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Mentorship</CardTitle>
                <CardDescription>
                  Your latest mentoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_MENTORSHIP_SESSIONS.slice(0, 2).map(session => (
                    <div key={session.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.mentorAvatar} />
                        <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{session.mentorName}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(session.date)}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{session.duration} min session</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {session.topics.map(topic => (
                            <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setActiveTab("mentorship")}
                  >
                    View all sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Education</CardTitle>
                <CardDescription>
                  Your academic background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_USER.education.map(edu => (
                    <div key={edu.id} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <GraduationCapIcon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{edu.institution}</p>
                          {edu.verified && (
                            <div className="flex items-center text-xs text-green-600">
                              <CheckCircle2Icon className="h-3 w-3 mr-1" />
                              Verified
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(edu.graduationDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardContent>
            </Card>
            
            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Experience</CardTitle>
                <CardDescription>
                  Your work experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_USER.experience.map(exp => (
                    <div key={exp.id} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <BriefcaseIcon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{exp.company}</p>
                          {exp.verified && (
                            <div className="flex items-center text-xs text-green-600">
                              <CheckCircle2Icon className="h-3 w-3 mr-1" />
                              Verified
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{exp.position}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </p>
                        <p className="text-xs mt-1">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Skills & Expertise</CardTitle>
                  <CardDescription>
                    Your technical skills and proficiency levels
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
                      {skills.map(skill => (
                        <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold text-muted-foreground">L{skill.level}</div>
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <div className="flex items-center mt-1">
                                {skill.verificationStatus === 'verified' && (
                                  <div className="flex items-center text-xs text-green-600">
                                    <CheckCircle2Icon className="h-3 w-3 mr-1" />
                                    Verified on-chain
                                  </div>
                                )}
                                {skill.verificationStatus === 'pending' && (
                                  <div className="flex items-center text-xs text-yellow-600">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    Verification in progress
                                  </div>
                                )}
                                {skill.verificationStatus === 'unverified' && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <LinkIcon className="h-3 w-3 mr-1" />
                                    Not verified
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {skill.verificationStatus !== 'verified' && (
                              <Button size="sm" variant="outline">
                                Request Verification
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
        </TabsContent>
        
        {/* Mentorship Tab */}
        <TabsContent value="mentorship" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Mentorship Sessions</CardTitle>
              <CardDescription>
                Your history of AI and human mentor interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_MENTORSHIP_SESSIONS.map(session => (
                  <div key={session.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.mentorAvatar} />
                      <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="font-medium">{session.mentorName}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {formatDate(session.date)} • {session.duration} minutes
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {session.topics.map(topic => (
                          <Badge key={topic} variant="secondary">{topic}</Badge>
                        ))}
                      </div>
                      
                      {session.verified && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle2Icon className="h-4 w-4 mr-1" />
                          Verified on blockchain
                          <button 
                            className="ml-2 text-primary hover:underline text-xs"
                            onClick={() => navigator.clipboard.writeText(session.verificationHash)}
                          >
                            {truncateAddress(session.verificationHash)}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end md:justify-start gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm">Get Certificate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More Sessions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Credentials Tab */}
        <TabsContent value="credentials" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Blockchain Credentials</CardTitle>
                  <CardDescription>
                    Your on-chain verifiable credentials and certificates
                  </CardDescription>
                </div>
                <Button>Connect Wallet</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-muted/40">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCapIcon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">React Developer Certification</h3>
                          <p className="text-sm text-muted-foreground">Issued by MentorNet • April 2023</p>
                        </div>
                        <Badge variant="outline" className="md:self-start">SBT NFT</Badge>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <p>Mastery in React Component Architecture and State Management</p>
                        <div className="flex items-center mt-1 text-xs text-green-600">
                          <CheckCircle2Icon className="h-3 w-3 mr-1" />
                          Verified on Ethereum
                          <span className="ml-2 font-mono text-muted-foreground">TokenID: #1234</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 self-end md:self-center">
                      <Button variant="outline" size="sm">View on Chain</Button>
                      <Button variant="ghost" size="sm">Share</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-muted/40">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <WalletIcon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">Blockchain Developer Level 1</h3>
                          <p className="text-sm text-muted-foreground">Issued by MentorNet • June 2023</p>
                        </div>
                        <Badge variant="outline" className="md:self-start">SBT NFT</Badge>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <p>Smart Contract Development and Web3 Integration</p>
                        <div className="flex items-center mt-1 text-xs text-green-600">
                          <CheckCircle2Icon className="h-3 w-3 mr-1" />
                          Verified on Ethereum
                          <span className="ml-2 font-mono text-muted-foreground">TokenID: #2345</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 self-end md:self-center">
                      <Button variant="outline" size="sm">View on Chain</Button>
                      <Button variant="ghost" size="sm">Share</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="w-full p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
                <p className="mb-2 text-muted-foreground">Unlock more credentials by completing mentorship sessions and skill verifications</p>
                <Button variant="outline">Explore Learning Paths</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Additional components

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ClockIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
} 