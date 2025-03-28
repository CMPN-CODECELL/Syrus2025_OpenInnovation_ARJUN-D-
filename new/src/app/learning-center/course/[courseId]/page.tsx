"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ConnectButton } from "@/components/wallet/connect-button";
import { YoutubePlayer } from "@/components/ui/youtube-player";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Play, 
  Award, 
  Clock, 
  BookOpen, 
  Star, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  Download,
  Share2,
  MessageSquare,
  UserRound,
  CalendarDays,
  Book
} from "lucide-react";
import { useIsVideoCompleted, useVideoProgress } from "@/lib/videoVerification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import course data
import { courses } from "@/data/courses";

// Module Status Badge Component
function ModuleStatusBadge({ videoId }: { videoId: string }) {
  const { isCompleted, isLoading } = useIsVideoCompleted(videoId);
  const { progress } = useVideoProgress(videoId);
  
  if (isLoading) {
    return <Badge variant="outline" className="px-2 py-1">Loading...</Badge>;
  }
  
  if (isCompleted) {
    return (
      <Badge variant="success" className="px-2 py-1">
        <CheckCircle className="w-3 h-3 mr-1" /> Completed
      </Badge>
    );
  }
  
  if (progress && progress.watchedPercentage > 0) {
    return (
      <div className="flex items-center gap-2">
        <Progress value={progress.watchedPercentage} className="h-2 w-20" />
        <span className="text-xs text-muted-foreground">{progress.watchedPercentage}%</span>
      </div>
    );
  }
  
  return <Badge variant="outline" className="px-2 py-1">Not Started</Badge>;
}

// Course Progress Component
function CourseProgress({ courseId }: { courseId: number }) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;
  
  // Calculate overall progress
  let totalCompleted = 0;
  const modulesWithStatus = course.modules.map(module => {
    const { isCompleted } = useIsVideoCompleted(module.videoId);
    if (isCompleted) totalCompleted++;
    return { ...module, completed: isCompleted };
  });
  
  const progressPercentage = Math.round((totalCompleted / course.modules.length) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{progressPercentage}% Complete</span>
              <span className="text-sm text-muted-foreground">{totalCompleted}/{course.modules.length} modules</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {totalCompleted === course.modules.length && (
            <div className="rounded-md bg-muted p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Course Completed!</h3>
              <p className="text-sm text-muted-foreground mb-3">Congratulations on finishing this course</p>
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" /> Get Certificate
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// User Notes Component
function UserNotes() {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  
  const saveNotes = () => {
    // In a real app, save to database
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Your Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          className="w-full min-h-[150px] p-3 bg-muted/50 border rounded-md resize-y focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Take notes as you watch..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={saveNotes} className="w-full">Save Notes</Button>
      </CardFooter>
    </Card>
  );
}

// Discussion Component
function CourseDiscussion() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Discussion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          {
            user: "Alex Johnson",
            avatar: "AJ",
            time: "2 days ago",
            message: "The consensus mechanisms explanation was really helpful. Does anyone have additional resources on PoS vs DPoS?",
            replies: 3
          },
          {
            user: "Maria Garcia",
            avatar: "MG",
            time: "1 week ago",
            message: "I'm having trouble understanding the cryptographic principles in module 3. Any tips?",
            replies: 5
          }
        ].map((comment, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>{comment.avatar}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-sm">{comment.message}</p>
              </div>
            </div>
            <div className="pl-10">
              <Button variant="ghost" size="sm" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" /> {comment.replies} replies
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <textarea
            className="w-full p-3 bg-muted/50 border rounded-md resize-none h-24 focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Join the discussion..."
          />
          <div className="flex justify-end mt-2">
            <Button size="sm">Post Comment</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Resources Component
function CourseResources({ courseId }: { courseId: number }) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;
  
  // Mock resources
  const resources = [
    { name: "Course Slides", type: "PDF", size: "2.4 MB", icon: Book },
    { name: "Blockchain Architecture Diagram", type: "PNG", size: "1.1 MB", icon: Book },
    { name: "Consensus Algorithms Cheat Sheet", type: "PDF", size: "0.9 MB", icon: Book },
    { name: "Smart Contract Examples", type: "ZIP", size: "3.7 MB", icon: Book },
  ];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Course Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resources.map((resource, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted group">
              <div className="flex items-center gap-3">
                <resource.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{resource.name}</p>
                  <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CourseDetail() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.courseId);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { isConnected } = useAccount();
  const { toast } = useToast();
  
  const course = courses.find(c => c.id === courseId);
  
  useEffect(() => {
    if (course && course.modules.length > 0 && !activeModule) {
      setActiveModule(course.modules[0].id);
    }
  }, [course, activeModule]);
  
  if (!course) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button onClick={() => router.push('/learning-center')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Learning Center
        </Button>
      </div>
    );
  }
  
  // Function to handle module completion
  const handleModuleComplete = () => {
    toast({
      title: "Module Completed!",
      description: "Your progress has been verified and stored on the blockchain.",
      duration: 5000,
    });
    
    // Move to next module if available
    if (activeModule) {
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
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" onClick={() => router.push('/learning-center')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
        </Button>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          
          {!isConnected && <ConnectButton />}
        </div>
      </div>
      
      {/* Wallet Connection Prompt */}
      {!isConnected && (
        <Card className="bg-muted/50 mb-8">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 rounded-full bg-primary/10 p-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">Connect Your Wallet</h3>
            <p className="mb-6 text-muted-foreground max-w-md">
              Connect your Polygon Amoy wallet to track your learning progress on the blockchain and earn a verifiable certificate.
            </p>
            <ConnectButton className="px-6 py-3" />
          </CardContent>
        </Card>
      )}
      
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-2 text-amber-500" />
            <span>{course.rating} ratings</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>Last updated 2 weeks ago</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{course.instructor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{course.instructor}</p>
            <p className="text-xs text-muted-foreground">Blockchain Specialist</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Module */}
          {activeModule && course.modules.filter(m => m.id === activeModule).map(module => (
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
          
          {/* Tabs for additional content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 sm:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{course.description}</p>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      {[
                        "Understand blockchain fundamentals and cryptography",
                        "Explore different consensus mechanisms",
                        "Learn about distributed ledger technology",
                        "Compare public and private blockchains",
                        "Analyze real-world blockchain applications",
                        "Understand blockchain security principles",
                        "Identify blockchain use cases for different industries",
                        "Prepare for advanced blockchain development"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {[
                        "Basic understanding of computer science concepts",
                        "Familiarity with cryptography is helpful but not required",
                        "No prior blockchain knowledge necessary",
                        "Curiosity and willingness to learn new concepts"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>About the Instructor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">{course.instructor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{course.instructor}</h3>
                      <p className="text-sm text-muted-foreground">Blockchain Specialist & Educator</p>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-amber-500" />
                          <span>4.9 Instructor Rating</span>
                        </div>
                        <div className="flex items-center">
                          <UserRound className="w-3 h-3 mr-1" />
                          <span>15,000+ Students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-3 h-3 mr-1" />
                          <span>8 Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm">
                    Dr. Sarah Chen is a renowned blockchain educator with over 10 years of experience in distributed systems and cryptography. 
                    She has worked with major blockchain projects including Ethereum and Polygon, and has published numerous papers on consensus mechanisms and blockchain scalability.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="modules">
              <Card>
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module, index) => (
                      <AccordionItem key={module.id} value={`module-${module.id}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">{module.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{module.duration}</span>
                                <span>•</span>
                                <ModuleStatusBadge videoId={module.videoId} />
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-11 pr-4 pb-2">
                            <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                            <Button 
                              onClick={() => setActiveModule(module.id)}
                              variant={activeModule === module.id ? "secondary" : "outline"}
                              size="sm"
                            >
                              {activeModule === module.id ? "Currently Watching" : "Watch Now"}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion">
              <CourseDiscussion />
            </TabsContent>
            
            <TabsContent value="resources">
              <CourseResources courseId={courseId} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Course Progress Card */}
          {isConnected && <CourseProgress courseId={courseId} />}
          
          {/* Module Navigation Card */}
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Course Content</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
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
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium line-clamp-1 text-sm">{module.title}</div>
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
          
          {/* Notes Card */}
          {isConnected && <UserNotes />}
          
          {/* Certificate Preview Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Certificate</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg mb-4 w-full">
                <Award className="h-16 w-16 mx-auto mb-2 text-primary/70" />
                <div className="space-y-1">
                  <h3 className="font-medium">Blockchain Fundamentals</h3>
                  <p className="text-xs text-muted-foreground">Blockchain-verified certificate of completion</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Complete all modules to earn your blockchain-verified certificate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 