"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample marketplace items
const marketplaceItems = [
  {
    id: 1,
    title: "DeFi Masterclass",
    author: "Alex Johnson",
    price: "50 MATIC",
    rating: 4.8,
    students: 1245,
    category: "defi",
    level: "advanced",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=DeFi+Masterclass",
    description: "Learn everything about DeFi protocols and how to build your own yield farming application.",
  },
  {
    id: 2,
    title: "NFT Creation Workshop",
    author: "Maria Garcia",
    price: "35 MATIC",
    rating: 4.6,
    students: 890,
    category: "nft",
    level: "intermediate",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=NFT+Workshop",
    description: "Master the art of creating and selling NFTs with this comprehensive workshop.",
  },
  {
    id: 3,
    title: "Blockchain Security",
    author: "David Chen",
    price: "45 MATIC",
    rating: 4.9,
    students: 1050,
    category: "security",
    level: "advanced",
    image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=Security",
    description: "Learn how to secure your smart contracts and protect against common vulnerabilities.",
  },
  {
    id: 4,
    title: "Web3 Frontend Development",
    author: "James Wilson",
    price: "40 MATIC",
    rating: 4.7,
    students: 1320,
    category: "development",
    level: "intermediate",
    image: "https://placehold.co/600x400/8b5cf6/FFFFFF/png?text=Web3+Frontend",
    description: "Build beautiful and functional dApps with React and ethers.js.",
  },
  {
    id: 5,
    title: "Solidity Fundamentals",
    author: "Sophia Lee",
    price: "30 MATIC",
    rating: 4.5,
    students: 2150,
    category: "development",
    level: "beginner",
    image: "https://placehold.co/600x400/f59e0b/FFFFFF/png?text=Solidity",
    description: "Start your journey as a smart contract developer with this beginner-friendly course.",
  },
  {
    id: 6,
    title: "Crypto Trading Strategies",
    author: "Michael Brown",
    price: "55 MATIC",
    rating: 4.4,
    students: 980,
    category: "trading",
    level: "intermediate",
    image: "https://placehold.co/600x400/ec4899/FFFFFF/png?text=Trading",
    description: "Learn technical analysis and risk management for successful crypto trading.",
  },
];

// Sample mentorship services
const mentorshipServices = [
  {
    id: 101,
    title: "1-on-1 Smart Contract Development",
    mentor: "Vitalik B.",
    price: "80 MATIC/hour",
    rating: 5.0,
    sessions: 345,
    category: "development",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Smart+Contract",
    description: "Get personalized guidance on your smart contract projects from an experienced developer.",
  },
  {
    id: 102,
    title: "DeFi Protocol Architecture Review",
    mentor: "Andre C.",
    price: "100 MATIC/hour",
    rating: 4.9,
    sessions: 210,
    category: "defi",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=DeFi+Review",
    description: "Get your DeFi protocol design reviewed by a seasoned architect.",
  },
  {
    id: 103,
    title: "Blockchain Career Coaching",
    mentor: "Elizabeth W.",
    price: "60 MATIC/hour",
    rating: 4.8,
    sessions: 178,
    category: "career",
    image: "https://placehold.co/600x400/f59e0b/FFFFFF/png?text=Career+Coach",
    description: "Navigate your path in the blockchain industry with personalized career advice.",
  },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Filter courses based on selected category and level
  const filteredCourses = marketplaceItems.filter(item => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || item.level === selectedLevel;
    return categoryMatch && levelMatch;
  });
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
        </div>
        
      <Tabs defaultValue="courses" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="skills">Skills NFTs</TabsTrigger>
            </TabsList>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
                <SelectItem value="nft">NFTs</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="trading">Trading</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedLevel}
              onValueChange={setSelectedLevel}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
            </div>
            
        <TabsContent value="courses" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((item) => (
              <Card key={item.id} className="overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
              </div>
                <CardContent className="flex flex-col flex-1 p-5">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {item.author}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto">
              <div>
                      <div className="font-medium">{item.price}</div>
                      <div className="flex items-center text-sm">
                        <span className="text-amber-500 mr-1">★</span>
                        <span>{item.rating}</span>
                        <span className="text-muted-foreground ml-2">({item.students} students)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
                </div>
                
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="mentorship" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mentorshipServices.map((service) => (
              <Card key={service.id} className="overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col flex-1 p-5">
                  <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">with {service.mentor}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                          <div>
                      <div className="font-medium">{service.price}</div>
                      <div className="flex items-center text-sm">
                        <span className="text-amber-500 mr-1">★</span>
                        <span>{service.rating}</span>
                        <span className="text-muted-foreground ml-2">({service.sessions} sessions)</span>
                      </div>
                      </div>
                    <Button variant="outline" size="sm">
                      Book Session
                        </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </TabsContent>
          
        <TabsContent value="skills" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground max-w-md">
              Our skills marketplace is being developed. Soon you'll be able to earn and trade skill NFTs representing your blockchain expertise.
            </p>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  );
} 