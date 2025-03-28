"use client";

import { useState } from "react";
import { SkillBadge, SkillBadgeGroup, SkillData, SkillVerificationStatus } from "@/components/ui/skill-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data for skills
const MOCK_SKILLS: SkillData[] = [
  {
    id: "skill-1",
    name: "React",
    level: 5,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 11, 15),
    transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
    progress: 100,
    description: "Building user interfaces with React"
  },
  {
    id: "skill-2",
    name: "TypeScript",
    level: 4,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 10, 5),
    transactionHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
    progress: 100,
    description: "Type-safe JavaScript programming"
  },
  {
    id: "skill-3",
    name: "Next.js",
    level: 4,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 9, 20),
    transactionHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    progress: 100,
    description: "Server-side rendering with Next.js"
  },
  {
    id: "skill-4",
    name: "Node.js",
    level: 3,
    category: "Backend",
    verificationStatus: "pending",
    progress: 65,
    description: "Server-side JavaScript runtime"
  },
  {
    id: "skill-5",
    name: "GraphQL",
    level: 2,
    category: "Backend",
    verificationStatus: "unverified",
    progress: 0,
    description: "API query language"
  },
  {
    id: "skill-6",
    name: "TailwindCSS",
    level: 5,
    category: "Frontend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 8, 10),
    transactionHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    progress: 100,
    description: "Utility-first CSS framework"
  },
  {
    id: "skill-7",
    name: "Solidity",
    level: 3,
    category: "Blockchain",
    verificationStatus: "pending",
    progress: 45,
    description: "Smart contract development for Ethereum"
  },
  {
    id: "skill-8",
    name: "Ethereum",
    level: 4,
    category: "Blockchain",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 7, 25),
    transactionHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    progress: 100,
    description: "Blockchain platform"
  },
  {
    id: "skill-9",
    name: "Smart Contracts",
    level: 3,
    category: "Blockchain",
    verificationStatus: "unverified",
    progress: 0,
    description: "Programmatic contracts on blockchain"
  },
  {
    id: "skill-10",
    name: "Python",
    level: 4,
    category: "Backend",
    verificationStatus: "verified",
    verifiedDate: new Date(2023, 6, 14),
    transactionHash: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
    progress: 100,
    description: "General-purpose programming language"
  },
];

// Group skills by category
const skillsByCategory = MOCK_SKILLS.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, SkillData[]>);

export default function TestSkillsPage() {
  const [showVerification, setShowVerification] = useState(true);
  const [showLevel, setShowLevel] = useState(true);
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Skills Component Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Display Options</CardTitle>
            <CardDescription>
              Configure how skill badges are displayed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-verification">Show Verification Status</Label>
              <Switch 
                id="show-verification" 
                checked={showVerification} 
                onCheckedChange={setShowVerification} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-level">Show Skill Level</Label>
              <Switch 
                id="show-level" 
                checked={showLevel} 
                onCheckedChange={setShowLevel} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Skills Overview</CardTitle>
            <CardDescription>
              Summary of your verified skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Skills</span>
                <span className="font-medium">{MOCK_SKILLS.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Verified</span>
                <span className="font-medium">{MOCK_SKILLS.filter(s => s.verificationStatus === 'verified').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium">{MOCK_SKILLS.filter(s => s.verificationStatus === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Unverified</span>
                <span className="font-medium">{MOCK_SKILLS.filter(s => s.verificationStatus === 'unverified').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>All Skills</CardTitle>
            <CardDescription>
              Complete list of your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillBadgeGroup 
              skills={MOCK_SKILLS} 
              showVerification={showVerification}
              showLevel={showLevel}
              className="mb-4"
            />
            
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Skill Badge with Limit</h3>
              <SkillBadgeGroup 
                skills={MOCK_SKILLS} 
                limit={5}
                showVerification={showVerification}
                showLevel={showLevel}
              />
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="Frontend" className="w-full">
          <TabsList>
            {Object.keys(skillsByCategory).map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle>{category} Skills</CardTitle>
                  <CardDescription>
                    Skills related to {category.toLowerCase()} development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map(skill => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <SkillBadge 
                          skill={skill} 
                          showVerification={showVerification}
                          showLevel={showLevel}
                        />
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Request Verification</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Skill Badge Variants</CardTitle>
            <CardDescription>
              Different ways to display skill badges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Verification Status</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge 
                    skill={{
                      id: "demo-1",
                      name: "Verified Skill",
                      level: 4,
                      category: "Demo",
                      verificationStatus: "verified",
                      verifiedDate: new Date(),
                      transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                      progress: 100,
                      description: "Demo verified skill"
                    }}
                  />
                  <SkillBadge 
                    skill={{
                      id: "demo-2",
                      name: "Pending Skill",
                      level: 3,
                      category: "Demo",
                      verificationStatus: "pending",
                      progress: 50,
                      description: "Demo pending skill"
                    }}
                  />
                  <SkillBadge 
                    skill={{
                      id: "demo-3",
                      name: "Unverified Skill",
                      level: 2,
                      category: "Demo",
                      verificationStatus: "unverified",
                      progress: 0,
                      description: "Demo unverified skill"
                    }}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Skill Levels</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <SkillBadge 
                      key={level}
                      skill={{
                        id: `level-${level}`,
                        name: `Level ${level}`,
                        level: level,
                        category: "Demo",
                        verificationStatus: "verified",
                        verifiedDate: new Date(),
                        progress: 100,
                        description: `Skill at level ${level}`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Different Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge 
                    variant="default"
                    skill={{
                      id: "variant-1",
                      name: "Default",
                      level: 4,
                      category: "Demo",
                      verificationStatus: "verified",
                      progress: 100,
                      description: "Default variant"
                    }}
                  />
                  <SkillBadge 
                    variant="secondary"
                    skill={{
                      id: "variant-2",
                      name: "Secondary",
                      level: 4,
                      category: "Demo",
                      verificationStatus: "verified",
                      progress: 100,
                      description: "Secondary variant"
                    }}
                  />
                  <SkillBadge 
                    variant="success"
                    skill={{
                      id: "variant-3",
                      name: "Success",
                      level: 4,
                      category: "Demo",
                      verificationStatus: "verified",
                      progress: 100,
                      description: "Success variant"
                    }}
                  />
                  <SkillBadge 
                    variant="warning"
                    skill={{
                      id: "variant-4",
                      name: "Warning",
                      level: 4,
                      category: "Demo",
                      verificationStatus: "verified",
                      progress: 100,
                      description: "Warning variant"
                    }}
                  />
                  <SkillBadge 
                    variant="destructive"
                    skill={{
                      id: "variant-5",
                      name: "Destructive",
                      level: 4,
                      category: "Demo",
                      verificationStatus: "verified",
                      progress: 100,
                      description: "Destructive variant"
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 