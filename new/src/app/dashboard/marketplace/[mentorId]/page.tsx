"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  Shield, 
  Award,
  CheckCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock mentor data - would be fetched from API based on mentorId
const MENTORS = [
  {
    id: "1",
    name: "Amit Kumar",
    role: "Senior Full Stack Engineer",
    avatar: "https://ui-avatars.com/api/?name=AK&background=4f46e5&color=fff",
    skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL"],
    rating: 4.9,
    reviews: 48,
    hourlyRate: 850,
    currency: "₹",
    verified: true,
    availability: ["Mon", "Wed", "Fri"],
    about: "Senior developer with 8+ years of experience building web applications. Specialized in React and Node.js ecosystems with expertise in building scalable applications and mentoring junior developers.",
    experience: [
      {
        company: "Infosys",
        position: "Senior Full Stack Engineer",
        period: "2019 - Present"
      },
      {
        company: "TCS",
        position: "Frontend Developer",
        period: "2016 - 2019"
      }
    ],
    education: [
      {
        institution: "IIT Delhi",
        degree: "M.Tech Computer Science",
        year: "2016"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2020"
      },
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google",
        year: "2021"
      }
    ],
    sessions: [
      {
        id: "s1",
        type: "Code Review",
        duration: 60,
        price: 850
      },
      {
        id: "s2",
        type: "1:1 Mentoring",
        duration: 45,
        price: 650
      },
      {
        id: "s3",
        type: "Technical Interview Prep",
        duration: 90,
        price: 1200
      }
    ],
    location: "Bangalore"
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "AI/ML Engineer & Mentor",
    avatar: "https://ui-avatars.com/api/?name=PS&background=10b981&color=fff",
    skills: ["Python", "TensorFlow", "PyTorch", "Natural Language Processing", "Computer Vision"],
    rating: 4.8,
    reviews: 36,
    hourlyRate: 950,
    currency: "₹",
    verified: true,
    availability: ["Tue", "Thu", "Sat"],
    about: "AI/ML Engineer with expertise in NLP and computer vision. 6+ years of industry experience building production ML systems and a passion for teaching ML concepts to developers.",
    experience: [
      {
        company: "Microsoft India",
        position: "Senior ML Engineer",
        period: "2020 - Present"
      },
      {
        company: "Flipkart",
        position: "Data Scientist",
        period: "2017 - 2020"
      }
    ],
    education: [
      {
        institution: "IISc Bangalore",
        degree: "Ph.D. Computer Science (Machine Learning)",
        year: "2017"
      }
    ],
    certifications: [
      {
        name: "TensorFlow Developer Certificate",
        issuer: "Google",
        year: "2019"
      },
      {
        name: "Deep Learning Specialization",
        issuer: "Coursera",
        year: "2018"
      }
    ],
    sessions: [
      {
        id: "s1",
        type: "ML Project Review",
        duration: 60,
        price: 950
      },
      {
        id: "s2",
        type: "AI Career Coaching",
        duration: 45,
        price: 750
      },
      {
        id: "s3",
        type: "Model Optimization Workshop",
        duration: 120,
        price: 1800
      }
    ],
    location: "Delhi"
  }
];

// Available time slots
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

// Available dates (next 7 days)
const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

export default function MentorProfilePage({ params }: { params: { mentorId: string } }) {
  const { mentorId } = params;
  
  // Find mentor by ID
  const mentor = MENTORS.find(m => m.id === mentorId) || MENTORS[0];
  
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState("");
  
  const availableDates = getAvailableDates();
  
  const handleBookSession = () => {
    // In a real app, this would create a booking and redirect to confirmation page
    alert(`Booking confirmed with ${mentor.name} for ${selectedSession} on ${selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''} at ${selectedTime}`);
  };
  
  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/dashboard/marketplace" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mentor Profile Column */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{mentor.name}</CardTitle>
                    {mentor.verified && (
                      <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                        <Shield className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base mt-1">{mentor.role}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="fill-amber-500 h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                    <span className="text-sm font-medium">${mentor.hourlyRate}/{mentor.currency}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mx-6 mb-0 grid grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="p-0">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground">{mentor.about}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {mentor.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Experience</h3>
                      <div className="space-y-3">
                        {mentor.experience.map((exp, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <div className="font-medium">{exp.position}</div>
                              <div className="text-sm text-muted-foreground">{exp.company}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">{exp.period}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Education</h3>
                      <div className="space-y-3">
                        {mentor.education.map((edu, index) => (
                          <div key={index}>
                            <div className="font-medium">{edu.degree}</div>
                            <div className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                      <div className="space-y-3">
                        {mentor.certifications.map((cert, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Award className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{cert.name}</div>
                              <div className="text-sm text-muted-foreground">{cert.issuer}, {cert.year}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-0">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Example reviews - would be fetched from API */}
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">John Doe</span>
                          </div>
                          <div className="flex items-center text-amber-500">
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Incredible mentor! Helped me understand complex React concepts and improved my code quality significantly.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Session: 1:1 Mentoring · May 12, 2023
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Emily Rodriguez</span>
                          </div>
                          <div className="flex items-center text-amber-500">
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="fill-amber-500 h-4 w-4" />
                            <Star className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great code review session. Gave me actionable feedback on my project and helped me optimize my database queries.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Session: Code Review · June 3, 2023
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="availability" className="p-0">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Availability</h3>
                    <p className="text-muted-foreground">
                      Available on: {mentor.availability.join(", ")}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {TIME_SLOTS.map(time => (
                        <div 
                          key={time}
                          className="p-2 text-center border rounded-md cursor-pointer hover:bg-primary/10 transition-colors"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All times shown in your local timezone. Select a session type and date on the booking panel to see available time slots.
                    </p>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Booking Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
              <CardDescription>Select a session type and preferred time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Session Type</h3>
                <div className="space-y-2">
                  {mentor.sessions.map(session => (
                    <div 
                      key={session.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedSession === session.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedSession(session.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{session.type}</div>
                        <Badge variant="outline">${session.price}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="mr-1 h-3 w-3" />
                        {session.duration} min
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Date</h3>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.map((date, index) => (
                    <div 
                      key={index}
                      className={`p-2 text-center border rounded-md cursor-pointer transition-colors ${
                        selectedDate && date.toDateString() === selectedDate.toDateString()
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="text-xs font-medium">{format(date, 'EEE')}</div>
                      <div className="text-sm">{format(date, 'd')}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedDate && selectedSession && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.slice(0, 6).map((time) => (
                      <div 
                        key={time}
                        className={`p-2 text-center text-sm border rounded-md cursor-pointer transition-colors ${
                          selectedTime === time
                            ? 'border-primary bg-primary/5' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTime && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Add a message (optional)</h3>
                  <Textarea 
                    placeholder="Let the mentor know what you'd like to discuss..." 
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={!selectedSession || !selectedDate || !selectedTime}
                onClick={handleBookSession}
              >
                Book Session
              </Button>
            </CardFooter>
          </Card>
          
          {activeTab === "profile" && (
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Skill Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This mentor can verify your skills in the following areas:
                </p>
                <div className="space-y-2">
                  {mentor.skills.slice(0, 3).map(skill => (
                    <div key={skill} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>{skill}</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full text-sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Skill Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 