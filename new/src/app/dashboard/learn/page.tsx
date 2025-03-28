"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAccount } from 'wagmi';
import { ConnectButton } from "@/components/wallet/connect-button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { YoutubePlayer } from "@/components/ui/youtube-player";
import { useIsVideoCompleted } from "@/lib/videoVerification";
import { Badge } from "@/components/ui/badge";

// Sample course data
const myCourses = [
  {
    id: 1,
    title: "Introduction to Blockchain Development",
    description: "Learn the fundamentals of blockchain development and smart contracts",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000",
    level: "Beginner",
    duration: "3 hours",
    modules: [
      {
        id: 1,
        title: "Blockchain Fundamentals",
        description: "Understanding the basics of blockchain technology",
        videoId: "SSo_EIwHSd4",
        duration: "45 min",
      },
      {
        id: 2,
        title: "Smart Contracts 101",
        description: "Introduction to smart contracts and their applications",
        videoId: "ZE2HxTmxfrI",
        duration: "35 min",
      },
      {
        id: 3,
        title: "Building on Polygon",
        description: "Learn how to build dApps on Polygon network",
        videoId: "t59Gq0LxBhg",
        duration: "50 min",
      }
    ]
  },
  {
    id: 2,
    title: "Advanced Smart Contract Development",
    description: "Deep dive into complex smart contract patterns and security",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1000",
    level: "Intermediate",
    duration: "5 hours",
    modules: [
      {
        id: 1,
        title: "Smart Contract Design Patterns",
        description: "Learn advanced patterns for contract architecture",
        videoId: "WgU5NxUgwQQ",
        duration: "60 min",
      },
      {
        id: 2,
        title: "Security Best Practices",
        description: "Protecting your contracts from common vulnerabilities",
        videoId: "0aJfCug1zTM",
        duration: "55 min",
      }
    ]
  },
  {
    id: 3,
    title: "DeFi Application Development",
    description: "Build decentralized finance applications with real-world use cases",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1000",
    level: "Advanced",
    duration: "8 hours",
    modules: [
      {
        id: 1,
        title: "DeFi Fundamentals",
        description: "Understanding DeFi protocols and economics",
        videoId: "k9HYC0EJU6E",
        duration: "50 min",
      }
    ]
  }
];

export default function LearnPage() {
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { isConnected } = useAccount();
  const { toast } = useToast();

  // Function to handle module completion
  const handleModuleComplete = () => {
    toast({
      title: "Module Completed!",
      description: "Your progress has been verified and recorded on the blockchain.",
    });
    
    // Move to next module if available
    if (activeCourse && activeModule) {
      const course = myCourses.find(c => c.id === activeCourse);
      if (course) {
        const nextModule = course.modules.find(m => m.id > activeModule);
        if (nextModule) {
          setActiveModule(nextModule.id);
          toast({
            title: "Next Module Unlocked",
            description: `Now starting: ${nextModule.title}`,
          });
        } else {
          toast({
            title: "Course Completed!",
            description: "Congratulations on completing the course!",
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
  
  // Component to display module completion status
  const ModuleCompletionBadge = ({ videoId }: { videoId: string }) => {
    const { isCompleted, isLoading } = useIsVideoCompleted(videoId);
    
    if (isLoading) return <Badge variant="outline">Loading...</Badge>;
    
    return isCompleted ? 
      <Badge variant="success">Completed</Badge> : 
      <Badge variant="outline">Not Completed</Badge>;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Learning Center</h2>
      </div>

      {!isConnected && (
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <path d="M14 2v6h6" />
                <path d="M12 12v6" />
                <path d="M15 15l-3-3-3 3" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Connect Your Wallet</h3>
            <p className="mb-4 text-sm text-muted-foreground max-w-md">
              Connect your Polygon Amoy wallet to track your learning progress on the blockchain and earn certificates.
            </p>
            <ConnectButton />
          </CardContent>
        </Card>
      )}

      {activeCourse === null ? (
        <>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col flex-1 p-5">
                      <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Level: </span>
                          <span className="font-medium">{course.level}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration: </span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">Modules: </span>
                        <span className="font-medium">{course.modules.length}</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <Button onClick={() => startCourse(course.id, course.modules[0].id)}>
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inprogress" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* This would filter courses based on blockchain completion data */}
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium">No courses in progress</h3>
                  <p className="text-muted-foreground mt-1">Start a course to see it here</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* This would filter courses based on blockchain completion data */}
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium">No completed courses yet</h3>
                  <p className="text-muted-foreground mt-1">Complete all modules in a course to see it here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={exitCourseView}>
                ← Back to Courses
              </Button>
            </div>
            
            {myCourses.filter(c => c.id === activeCourse).map(course => (
              <div key={course.id}>
                <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
                
                {course.modules.filter(m => m.id === activeModule).map(module => (
                  <div key={module.id} className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-medium">{module.title}</h3>
                      <div className="text-sm text-muted-foreground">{module.duration}</div>
                    </div>
                    
                    <YoutubePlayer 
                      videoId={module.videoId}
                      title={module.title}
                      description={module.description}
                      onComplete={handleModuleComplete}
                    />
                    
                    {/* Module navigation will now be managed by the blockchain verification */}
                  </div>
                ))}
                
                {/* Module listing sidebar */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium mb-4">Course Modules</h3>
                  
                  <div className="space-y-3">
                    {course.modules.map((m, index) => (
                      <div 
                        key={m.id}
                        className={`
                          p-3 rounded-md flex items-center justify-between cursor-pointer
                          ${m.id === activeModule ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'}
                        `}
                        onClick={() => startCourse(course.id, m.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{m.title}</div>
                            <div className="text-xs text-muted-foreground">{m.duration}</div>
                          </div>
                        </div>
                        
                        <ModuleCompletionBadge videoId={m.videoId} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 