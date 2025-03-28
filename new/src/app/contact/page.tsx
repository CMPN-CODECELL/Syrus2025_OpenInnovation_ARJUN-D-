"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  AtSign, 
  MapPin, 
  Phone, 
  Clock, 
  Send,
  Github,
  Twitter,
  Linkedin,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          status: "success",
          message: data.message || "Your message has been sent successfully!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus({
          status: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        status: "error",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about MentorNet? Want to join our community? 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Contact Form */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll respond within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please provide as much detail as possible..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {formStatus.status !== "idle" && (
                  <div
                    className={`p-3 rounded-md ${
                      formStatus.status === "error"
                        ? "bg-destructive/10 text-destructive"
                        : formStatus.status === "success"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {formStatus.status === "error" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : formStatus.status === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : null}
                      <p className="text-sm">{formStatus.message}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-mentor hover:bg-mentor/90"
                  disabled={formStatus.status === "loading"}
                >
                  {formStatus.status === "loading" ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Connect with us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-mentor/10 p-3 rounded-full">
                      <AtSign className="h-5 w-5 text-mentor" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">contact@mentornet.io</p>
                      <p className="text-muted-foreground">support@mentornet.io</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-mentor/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-mentor" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">
                        123 Innovation Street<br />
                        San Francisco, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-mentor/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-mentor" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-mentor/10 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-mentor" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM PST</p>
                      <p className="text-muted-foreground">Sat - Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Media */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Link href="#" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                    <Twitter className="h-6 w-6 text-[#1DA1F2]" />
                  </Link>
                  <Link href="#" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors">
                    <Linkedin className="h-6 w-6 text-[#0077B5]" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Map */}
            <div className="relative h-[200px] w-full rounded-lg overflow-hidden border">
              <Image 
                src="https://img.freepik.com/premium-vector/city-map-with-global-positioning-system-markers-gps-navigation-concept_53562-7040.jpg" 
                alt="Map Location"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I get started with MentorNet?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply sign up for an account, complete your profile with your skills and interests, 
                  and you'll be matched with AI mentors tailored to your career goals. You can also 
                  explore our community of human mentors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are Soulbound NFTs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Soulbound NFTs are non-transferable tokens that represent your skills, achievements, 
                  and certifications on the blockchain. They provide verifiable proof of your capabilities 
                  that can be shared with potential employers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need cryptocurrency to use MentorNet?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No, cryptocurrency is not required to use the core features of MentorNet. However, 
                  certain blockchain-related features like minting skill NFTs will require a connected 
                  wallet with minimal gas fees on zkSync Era.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I become a mentor?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experienced professionals can apply to join our mentor network. We review applications 
                  based on experience, skills, and a brief interview. Approved mentors can create profiles, 
                  offer sessions, and earn token rewards for their contributions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 