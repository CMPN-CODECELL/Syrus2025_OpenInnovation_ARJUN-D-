 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Skill = {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  verificationStatus: "pending" | "verified" | "unverified";
  dateVerified?: Date;
  nftId?: string;
  transactionHash?: string;
  issuer: string;
  category: "technical" | "soft" | "domain";
};

const skills: Skill[] = [
  {
    id: "1",
    name: "React Advanced Patterns",
    level: "advanced",
    verificationStatus: "verified",
    dateVerified: new Date(2023, 3, 15),
    nftId: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    transactionHash: "0x3d53622a0f807844c3822d69405feb06a5b7a9f95c3836a8448ccf1f7e4dda10",
    issuer: "MentorNet DAO",
    category: "technical"
  },
  {
    id: "2",
    name: "JavaScript ES6+",
    level: "advanced",
    verificationStatus: "verified",
    dateVerified: new Date(2023, 2, 20),
    nftId: "0x8c1ed7e19abaa9f23c476da86dc1577f1ef401f5",
    transactionHash: "0x9b7bb8e7486f4ce523f1c9c72d23fab5b4f8084c3178b1bfc63f98e7f8f31f54",
    issuer: "MentorNet DAO",
    category: "technical"
  },
  {
    id: "3",
    name: "TypeScript",
    level: "intermediate",
    verificationStatus: "verified",
    dateVerified: new Date(2023, 4, 5),
    nftId: "0x5d4e7a1c15ef3221582a3cf5dcb6ddfb3858aeaa",
    transactionHash: "0xdb26a76e40e1ec6e8c9874a2944b6e8e0a5e9dec1b83cd8aed1376c226f7ce38",
    issuer: "MentorNet DAO",
    category: "technical"
  },
  {
    id: "4",
    name: "System Architecture",
    level: "beginner",
    verificationStatus: "pending",
    issuer: "MentorNet DAO",
    category: "technical"
  },
  {
    id: "5",
    name: "Team Leadership",
    level: "intermediate",
    verificationStatus: "verified",
    dateVerified: new Date(2023, 1, 10),
    nftId: "0xf1e4b2f3c8d9e0b6a7c5d2e1f3a4c6b8d9e7f1a2",
    transactionHash: "0x7c8d9a7b6f5e4d3c2b1a9f8e7d6c5f4a3b2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7",
    issuer: "MentorNet DAO",
    category: "soft"
  }
];

export function SkillVerification() {
  const [verifiedSkills, setVerifiedSkills] = useState<Skill[]>(skills);
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills = verifiedSkills.filter(skill => {
    if (activeTab === "all") return true;
    if (activeTab === "verified") return skill.verificationStatus === "verified";
    if (activeTab === "pending") return skill.verificationStatus === "pending";
    if (activeTab === "technical") return skill.category === "technical";
    if (activeTab === "soft") return skill.category === "soft";
    return true;
  });

  const getLevelColor = (level: Skill["level"]) => {
    switch (level) {
      case "beginner":
        return "text-orange-500";
      case "intermediate":
        return "text-yellow-500";
      case "advanced":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getVerificationBadge = (status: Skill["verificationStatus"]) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Verified on Chain
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Verification Pending
          </Badge>
        );
      case "unverified":
        return (
          <Badge variant="outline" className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            Not Verified
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };

  const truncateHash = (hash?: string) => {
    if (!hash) return "N/A";
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <Card className="h-[550px] flex flex-col">
      <CardHeader className="px-4 pt-4 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Skill Verification</CardTitle>
          <Button variant="outline" size="sm" className="text-mentor hover:text-mentor/90 hover:bg-mentor/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            Verify New Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="px-4 pt-2 pb-2">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
          <div className="space-y-4">
            {filteredSkills.map((skill) => (
              <Card key={skill.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {skill.name}
                        <span className={`text-xs ${getLevelColor(skill.level)}`}>
                          ({skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})
                        </span>
                      </h3>
                      <p className="text-xs text-muted-foreground">Issued by {skill.issuer}</p>
                    </div>
                    <div>{getVerificationBadge(skill.verificationStatus)}</div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-3 space-y-2 text-sm">
                    {skill.verificationStatus === "verified" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Verified On:</span>
                          <span>{formatDate(skill.dateVerified)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">NFT ID:</span>
                          <span className="font-mono text-xs">{truncateHash(skill.nftId)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transaction:</span>
                          <a 
                            href={`https://explorer.sui.io/txblock/${skill.transactionHash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-blue-500 hover:underline"
                          >
                            {truncateHash(skill.transactionHash)}
                          </a>
                        </div>
                      </>
                    )}
                    
                    {skill.verificationStatus === "pending" && (
                      <div className="flex items-center justify-center py-2">
                        <div className="flex items-center text-yellow-500">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Waiting for verification by network validators
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline" className="text-xs">
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)} Skill
                    </Badge>
                    
                    <div className="flex gap-2">
                      {skill.verificationStatus === "verified" && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          View Certificate
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="10" r="3" />
                          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                        </svg>
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredSkills.length === 0 && (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">No skills found</h3>
                <p className="text-sm text-muted-foreground">
                  No skills matching the selected filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}