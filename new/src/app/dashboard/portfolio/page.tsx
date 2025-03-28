"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SkillBadgeGroup, SkillData } from "@/components/ui/skill-badge";
import { usePortfolio } from "@/lib/contexts/portfolio-context";
import AddPortfolioItem from "./add-portfolio-item";
import { 
  CheckCircle2Icon, 
  EditIcon, 
  FileTextIcon, 
  GraduationCapIcon, 
  BriefcaseIcon, 
  CalendarIcon, 
  LinkIcon, 
  WalletIcon,
  UploadIcon,
  Database,
  CloudUpload,
  Shield,
  Star,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Share2,
  Database as BlockchainIcon
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Format date for display
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Truncate address for display
function truncateAddress(address: string): string {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Truncate hash for display
function truncateHash(hash: string): string {
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
}

// Sample NFT skills
const skillNfts = [
  {
    id: 1,
    name: "Smart Contract Developer - Level 2",
    image: "https://placehold.co/400x400/3b82f6/FFFFFF/png?text=SC+Dev+L2",
    issueDate: "May 15, 2023",
    issuer: "MentorNet",
    description: "Certified proficiency in Solidity development, data structures, and contract security.",
    tokenId: "0x1234...5678",
  },
  {
    id: 2,
    name: "DeFi Protocol Specialist",
    image: "https://placehold.co/400x400/10b981/FFFFFF/png?text=DeFi+Spec",
    issueDate: "July 3, 2023",
    issuer: "MentorNet",
    description: "Expertise in DeFi protocol design, yield strategies, and liquidity management.",
    tokenId: "0x2345...6789",
  },
  {
    id: 3,
    name: "Blockchain Architecture - Level 1",
    image: "https://placehold.co/400x400/f59e0b/FFFFFF/png?text=Blockchain+L1",
    issueDate: "August 22, 2023",
    issuer: "MentorNet",
    description: "Foundational knowledge of blockchain architecture, consensus mechanisms, and network design.",
    tokenId: "0x3456...7890",
  },
]

// Sample achievements
const achievements = [
  {
    id: 1,
    name: "Course Completion: Solidity Master Class",
    image: "https://placehold.co/400x400/8b5cf6/FFFFFF/png?text=Solidity",
    date: "April 10, 2023",
    description: "Successfully completed the 12-week Solidity Master Class with a 95% score.",
  },
  {
    id: 2,
    name: "Hackathon Winner: DeFi Innovation",
    image: "https://placehold.co/400x400/ec4899/FFFFFF/png?text=Hackathon",
    date: "June 18, 2023",
    description: "First place in the DeFi Innovation category at the Global Web3 Hackathon.",
  },
  {
    id: 3,
    name: "Mentor Recognition: 50 Hours",
    image: "https://placehold.co/400x400/06b6d4/FFFFFF/png?text=Mentor",
    date: "September 5, 2023",
    description: "Recognized for providing 50 hours of mentorship to junior blockchain developers.",
  },
]

// Sample token transactions
const tokenTransactions = [
  {
    id: 1,
    type: "Earned",
    amount: "+50 MENT",
    date: "September 30, 2023",
    description: "Course completion: Web3 Security",
  },
  {
    id: 2,
    type: "Spent",
    amount: "-35 MENT",
    date: "September 25, 2023",
    description: "Purchased: NFT Creation Workshop",
  },
  {
    id: 3,
    type: "Earned",
    amount: "+25 MENT",
    date: "September 20, 2023",
    description: "Mentorship session participation",
  },
  {
    id: 4,
    type: "Earned",
    amount: "+10 MENT",
    date: "September 15, 2023",
    description: "Community contribution: Forum answer",
  },
  {
    id: 5,
    type: "Spent",
    amount: "-20 MENT",
    date: "September 10, 2023",
    description: "Purchased: DeFi course materials",
  },
]

export default function PortfolioPage() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Earned</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillNfts.length}</div>
            <p className="text-xs text-muted-foreground">
              View and share your skill NFTs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">
              Your milestones and recognitions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MENT Balance</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250 MENT</div>
            <p className="text-xs text-muted-foreground">
              Use to purchase courses and mentorship
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="skills">Skill NFTs</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="tokens">Token Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="mt-6">
          {selectedSkill === null ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skillNfts.map((skill) => (
                <Card key={skill.id} className="cursor-pointer transition-all hover:shadow-md" onClick={() => setSelectedSkill(skill.id)}>
                  <div className="p-6">
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Issued on {skill.issueDate} by {skill.issuer}</p>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <Button variant="outline" className="mb-6" onClick={() => setSelectedSkill(null)}>
                ← Back to Skills
              </Button>
              
              {skillNfts.filter(skill => skill.id === selectedSkill).map((skill) => (
                <div key={skill.id} className="grid md:grid-cols-2 gap-8">
                  <div className="overflow-hidden rounded-lg border">
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{skill.name}</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="mt-1">{skill.description}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Issuer</h3>
                        <p className="mt-1">{skill.issuer}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Issue Date</h3>
                        <p className="mt-1">{skill.issueDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Token ID</h3>
                        <p className="mt-1 font-mono text-sm">{skill.tokenId}</p>
                      </div>
                      <div className="pt-4 flex flex-wrap gap-2">
                        <Button>Share Credential</Button>
                        <Button variant="outline">
                          View on Explorer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <div className="p-6">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src={achievement.image}
                      alt={achievement.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Achieved on {achievement.date}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tokens" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Transaction History</CardTitle>
              <CardDescription>
                Your MENT token earning and spending history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tokenTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className={`font-medium ${transaction.type === 'Earned' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}