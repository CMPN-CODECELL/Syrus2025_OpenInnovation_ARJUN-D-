"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from "@/components/wallet/connect-button";
import { YoutubePlayer } from "@/components/ui/youtube-player";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Play, Award, Clock, BookOpen, Star, Users, CheckCircle } from "lucide-react";
import { useIsVideoCompleted } from "@/lib/videoVerification";

// Sample course data structure
const courses = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles.",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000",
    level: "Beginner",
    duration: "4 hours",
    rating: 4.8,
    students: 1245,
    instructor: "Dr. Sarah Chen",
    featured: true,
    category: "Blockchain",
    modules: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        description: "Understanding the fundamental concepts of blockchain technology",
        videoId: "SSo_EIwHSd4",
        duration: "45 min",
        order: 1
      },
      {
        id: 2,
        title: "Distributed Ledger Technology",
        description: "Exploring how distributed ledgers work and their benefits",
        videoId: "ZE2HxTmxfrI",
        duration: "38 min",
        order: 2
      },
      {
        id: 3,
        title: "Consensus Mechanisms",
        description: "Deep dive into Proof of Work, Proof of Stake, and other consensus mechanisms",
        videoId: "t59Gq0LxBhg",
        duration: "52 min",
        order: 3
      },
      {
        id: 4,
        title: "Public vs Private Blockchains",
        description: "Understanding the differences between public and private blockchain networks",
        videoId: "WgU5NxUgwQQ",
        duration: "35 min",
        order: 4
      }
    ]
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Master the art of writing secure and efficient smart contracts with Solidity for the Ethereum blockchain.",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1000",
    level: "Intermediate",
    duration: "6 hours",
    rating: 4.9,
    students: 876,
    instructor: "Alex Rodriguez",
    featured: false,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Solidity Basics",
        description: "Introduction to Solidity programming language",
        videoId: "0aJfCug1zTM",
        duration: "48 min",
        order: 1
      },
      {
        id: 2,
        title: "Smart Contract Structure",
        description: "Understanding the components of a smart contract",
        videoId: "k9HYC0EJU6E",
        duration: "42 min",
        order: 2
      }
    ]
  },
  {
    id: 3,
    title: "DeFi Fundamentals",
    description: "Understand the world of Decentralized Finance, including lending, borrowing, and yield farming on the blockchain.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1000",
    level: "Intermediate",
    duration: "5 hours",
    rating: 4.7,
    students: 925,
    instructor: "Michael Johnson",
    featured: true,
    category: "Finance",
    modules: [
      {
        id: 1,
        title: "Introduction to DeFi",
        description: "Understanding the DeFi ecosystem and its components",
        videoId: "BoKKI8arKX8",
        duration: "40 min",
        order: 1
      }
    ]
  },
  {
    id: 4,
    title: "NFT Creation and Marketing",
    description: "Learn how to create, mint, and market Non-Fungible Tokens (NFTs) for digital art and collectibles.",
    image: "https://images.unsplash.com/photo-1645586926869-cb8a0e627631?q=80&w=1000",
    level: "Beginner",
    duration: "4.5 hours",
    rating: 4.6,
    students: 1123,
    instructor: "Emma Williams",
    featured: false,
    category: "Art & Design",
    modules: [
      {
        id: 1,
        title: "NFT Fundamentals",
        description: "Introduction to Non-Fungible Tokens",
        videoId: "wT3764YQDh4",
        duration: "35 min",
        order: 1
      }
    ]
  },
  {
    id: 5,
    title: "Polygon Development Masterclass",
    description: "Become an expert in developing applications on the Polygon network with this comprehensive masterclass.",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000",
    level: "Advanced",
    duration: "8 hours",
    rating: 4.9,
    students: 673,
    instructor: "David Patel",
    featured: true,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Introduction to Polygon",
        description: "Understanding Polygon's architecture and benefits",
        videoId: "0zM2r4Jb8PA",
        duration: "37 min",
        order: 1
      }
    ]
  }
];

// Course Completion Badge Component
function CourseCompletionBadge({ courseId }: { courseId: number }) {
  // Check if all modules in the course are completed
  const course = courses.find(c => c.id === courseId);
  
  if (!course) return null;
  
  const allModulesCompleted = course.modules.every(module => {
    const { isCompleted } = useIsVideoCompleted(module.videoId);
    return isCompleted;
  });
  
  if (allModulesCompleted) {
    return (
      <Badge variant="success" className="absolute top-2 right-2 z-10 px-2 py-1">
        <CheckCircle className="w-3 h-3 mr-1" /> Completed
      </Badge>
    );
  }
  
  return null;
}

// Module Status Badge Component
function ModuleStatusBadge({ videoId }: { videoId: string }) {
  const { isCompleted, isLoading } = useIsVideoCompleted(videoId);
  
  if (isLoading) {
    return <Badge variant="outline">Loading...</Badge>;
  }
  
  return isCompleted ? 
    <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge> : 
    <Badge variant="outline">Not Started</Badge>;
}

export default function LearningCenter() {
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { isConnected } = useAccount();
  const { toast } = useToast();

  // Function to handle module completion
  const handleModuleComplete = () => {
    toast({
      title: "Module Completed!",
      description: "Your progress has been verified and stored on the blockchain.",
      duration: 5000,
    });
    
    // Move to next module if available
    if (activeCourse && activeModule) {
      const course = courses.find(c => c.id === activeCourse);
      if (course) {
        const currentModuleIndex = course.modules.findIndex(m => m.id === activeModule);
        if (currentModuleIndex < course.modules.length - 1) {
          const nextModule = course.modules[currentModuleIndex + 1];
          setActiveModule(nextModule.id);
          toast({
            title: "Next Module Unlocked",
            description: `Now starting: ${nextModule.title}`,
            duration: 5000,
          });
        } else {
          toast({
            title: "Course Completed!",
            description: "Congratulations on completing the course!",
            duration: 5000,
          });
        }
      }
    }
  };

  const startCourse = (courseId: number, moduleId: number) => {
    setActiveCourse(courseId);
    setActiveModule(moduleId);
  };

  const exitCourseView = () => {
    setActiveCourse(null);
    setActiveModule(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Learning Center</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Enhance your blockchain skills with verified courses and gain blockchain-certified credentials
        </p>
      </header>

      {/* Wallet Connection Prompt */}
      {!isConnected && (
        <Card className="bg-muted/50 mb-8">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 rounded-full bg-primary/10 p-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">Connect Your Wallet</h3>
            <p className="mb-6 text-muted-foreground max-w-md">
              Connect your Polygon Amoy wallet to track your learning progress on the blockchain and earn verifiable certificates.
            </p>
            <ConnectButton className="px-6 py-3" />
          </CardContent>
        </Card>
      )}

      {/* Course View or Course List */}
      {activeCourse === null ? (
        <>
          {/* Featured Courses Section */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => course.featured)
                .map(course => (
                  <Card key={course.id} className="overflow-hidden flex flex-col h-full group hover:shadow-md transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <CourseCompletionBadge courseId={course.id} />
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <Badge className="mb-2 bg-primary/90">{course.category}</Badge>
                          <h3 className="font-bold text-lg">{course.title}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="flex-grow p-5">
                      <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2 text-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t bg-muted/20">
                      <Button 
                        className="w-full" 
                        onClick={() => startCourse(course.id, course.modules[0].id)}
                      >
                        <Play className="w-4 h-4 mr-2" /> Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </section>

          {/* All Courses Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">All Courses</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="design">Art & Design</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                      <div className="relative h-40 overflow-hidden">
                        <CourseCompletionBadge courseId={course.id} />
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-grow p-5">
                        <Badge className="mb-2">{course.category}</Badge>
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{course.level}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 border-t bg-muted/20">
                        <Button 
                          className="w-full" 
                          onClick={() => startCourse(course.id, course.modules[0].id)}
                        >
                          Start Learning
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Category tabs */}
              {["blockchain", "development", "finance", "design"].map(category => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                      .filter(course => 
                        course.category.toLowerCase() === category || 
                        (category === "design" && course.category === "Art & Design")
                      )
                      .map(course => (
                        <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                          <div className="relative h-40 overflow-hidden">
                            <CourseCompletionBadge courseId={course.id} />
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-grow p-5">
                            <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{course.level}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 border-t bg-muted/20">
                            <Button 
                              className="w-full" 
                              onClick={() => startCourse(course.id, course.modules[0].id)}
                            >
                              Start Learning
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </>
      ) : (
        // Course Content View
        <div className="space-y-8">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={exitCourseView}>
              ← Back to Courses
            </Button>
            {isConnected ? (
              <Badge variant="outline" className="px-3 py-1">
                <Award className="w-4 h-4 mr-2" /> Blockchain Verified Learning
              </Badge>
            ) : (
              <ConnectButton />
            )}
          </div>
          
          {/* Course Content */}
          {courses.filter(c => c.id === activeCourse).map(course => (
            <div key={course.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                
                {/* Active Module */}
                {course.modules.filter(m => m.id === activeModule).map(module => (
                  <div key={module.id} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{module.title}</h2>
                      <p className="text-muted-foreground mb-2">{module.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" /> {module.duration}
                      </div>
                    </div>
                    
                    {/* YouTube Player */}
                    <div className="border rounded-lg overflow-hidden">
                      <YoutubePlayer 
                        videoId={module.videoId}
                        title={module.title}
                        description={module.description}
                        onComplete={handleModuleComplete}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Instructor</span>
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Modules</span>
                        <span className="font-medium">{course.modules.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Students</span>
                        <span className="font-medium">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-medium flex items-center">
                          {course.rating} <Star className="w-4 h-4 ml-1 text-amber-500 fill-amber-500" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Module List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Modules</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                    <div className="space-y-1">
                      {course.modules.map((module, index) => (
                        <div 
                          key={module.id}
                          className={`
                            p-3 rounded-md flex items-center justify-between cursor-pointer
                            ${module.id === activeModule ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'}
                          `}
                          onClick={() => setActiveModule(module.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium line-clamp-1">{module.title}</div>
                              <div className="text-xs text-muted-foreground">{module.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ModuleStatusBadge videoId={module.videoId} />
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Certificate Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete all modules to earn a blockchain-verified certificate that showcases your knowledge and skills.
                    </p>
                    <div className="flex items-center justify-center p-4 border rounded-md bg-muted/30">
                      <Award className="w-16 h-16 text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 