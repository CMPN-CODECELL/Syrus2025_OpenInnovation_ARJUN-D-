"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortfolio } from "@/lib/contexts/portfolio-context";
import { PlusCircle } from "lucide-react";

export default function AddPortfolioItem() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("skill");
  const { addSkill, addProject, addCertificate, addMentorshipSession, isUploading } = usePortfolio();
  
  // Skill form state
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("3");
  const [skillCategory, setSkillCategory] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  
  // Project form state
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectSkills, setProjectSkills] = useState("");
  const [projectGithub, setProjectGithub] = useState("");
  const [projectDemo, setProjectDemo] = useState("");
  const [projectImage, setProjectImage] = useState("");
  
  // Certificate form state
  const [certTitle, setCertTitle] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certIssueDate, setCertIssueDate] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [certImage, setCertImage] = useState("");
  
  // Mentorship form state
  const [mentorName, setMentorName] = useState("");
  const [mentorAddress, setMentorAddress] = useState("");
  const [mentorshipTopic, setMentorshipTopic] = useState("");
  const [mentorshipDate, setMentorshipDate] = useState("");
  const [mentorshipDuration, setMentorshipDuration] = useState("60");
  const [mentorshipEndorsements, setMentorshipEndorsements] = useState("");
  
  const resetForms = () => {
    // Reset skill form
    setSkillName("");
    setSkillLevel("3");
    setSkillCategory("");
    setSkillDescription("");
    
    // Reset project form
    setProjectTitle("");
    setProjectDescription("");
    setProjectSkills("");
    setProjectGithub("");
    setProjectDemo("");
    setProjectImage("");
    
    // Reset certificate form
    setCertTitle("");
    setCertIssuer("");
    setCertIssueDate("");
    setCertUrl("");
    setCertImage("");
    
    // Reset mentorship form
    setMentorName("");
    setMentorAddress("");
    setMentorshipTopic("");
    setMentorshipDate("");
    setMentorshipDuration("60");
    setMentorshipEndorsements("");
  };
  
  const handleClose = () => {
    setOpen(false);
    resetForms();
  };
  
  const handleAddSkill = async () => {
    if (!skillName || !skillCategory) return;
    
    try {
      await addSkill({
        name: skillName,
        level: parseInt(skillLevel),
        category: skillCategory,
        description: skillDescription,
      });
      
      handleClose();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };
  
  const handleAddProject = async () => {
    if (!projectTitle || !projectDescription) return;
    
    try {
      await addProject({
        title: projectTitle,
        description: projectDescription,
        skills: projectSkills.split(',').map(skill => skill.trim()),
        githubUrl: projectGithub,
        demoUrl: projectDemo,
        imageUrl: projectImage,
      });
      
      handleClose();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  
  const handleAddCertificate = async () => {
    if (!certTitle || !certIssuer || !certIssueDate) return;
    
    try {
      await addCertificate({
        title: certTitle,
        issuer: certIssuer,
        issueDate: new Date(certIssueDate),
        credentialUrl: certUrl,
        imageUrl: certImage,
      });
      
      handleClose();
    } catch (error) {
      console.error("Error adding certificate:", error);
    }
  };
  
  const handleAddMentorship = async () => {
    if (!mentorName || !mentorshipTopic || !mentorshipDate) return;
    
    try {
      await addMentorshipSession({
        mentorName,
        mentorAddress,
        topic: mentorshipTopic,
        date: new Date(mentorshipDate),
        duration: parseInt(mentorshipDuration),
        endorsements: mentorshipEndorsements.split(',').map(endorsement => endorsement.trim()),
      });
      
      handleClose();
    } catch (error) {
      console.error("Error adding mentorship session:", error);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white">
          <PlusCircle className="h-4 w-4" />
          Add Portfolio Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add to Portfolio</DialogTitle>
          <DialogDescription>
            Add a new item to your decentralized portfolio. It will be stored on IPFS and verified on the blockchain.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="skill">Skill</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="certificate">Certificate</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          </TabsList>
          
          {/* Skill Form */}
          <TabsContent value="skill" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="skill-name">Skill Name</Label>
                <Input
                  id="skill-name"
                  placeholder="e.g. React, TypeScript, Solidity"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="skill-level">Skill Level (1-5)</Label>
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Beginner</SelectItem>
                    <SelectItem value="2">2 - Elementary</SelectItem>
                    <SelectItem value="3">3 - Intermediate</SelectItem>
                    <SelectItem value="4">4 - Advanced</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="skill-category">Category</Label>
                <Input
                  id="skill-category"
                  placeholder="e.g. Frontend, Backend, Blockchain"
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="skill-description">Description (optional)</Label>
                <Textarea
                  id="skill-description"
                  placeholder="Describe your experience with this skill"
                  className="min-h-[100px]"
                  value={skillDescription}
                  onChange={(e) => setSkillDescription(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Project Form */}
          <TabsContent value="project" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  placeholder="e.g. Decentralized Exchange"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe your project"
                  className="min-h-[100px]"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="project-skills">Skills Used (comma-separated)</Label>
                <Input
                  id="project-skills"
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={projectSkills}
                  onChange={(e) => setProjectSkills(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="project-github">GitHub URL (optional)</Label>
                <Input
                  id="project-github"
                  placeholder="https://github.com/username/project"
                  value={projectGithub}
                  onChange={(e) => setProjectGithub(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="project-demo">Demo URL (optional)</Label>
                <Input
                  id="project-demo"
                  placeholder="https://project-demo.com"
                  value={projectDemo}
                  onChange={(e) => setProjectDemo(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="project-image">Image URL (optional)</Label>
                <Input
                  id="project-image"
                  placeholder="https://example.com/project-image.jpg"
                  value={projectImage}
                  onChange={(e) => setProjectImage(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Certificate Form */}
          <TabsContent value="certificate" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="cert-title">Certificate Title</Label>
                <Input
                  id="cert-title"
                  placeholder="e.g. Advanced React Development"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="cert-issuer">Issuer</Label>
                <Input
                  id="cert-issuer"
                  placeholder="e.g. Udacity, Coursera, Meta"
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="cert-date">Issue Date</Label>
                <Input
                  id="cert-date"
                  type="date"
                  value={certIssueDate}
                  onChange={(e) => setCertIssueDate(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="cert-url">Credential URL (optional)</Label>
                <Input
                  id="cert-url"
                  placeholder="https://credential.net/example"
                  value={certUrl}
                  onChange={(e) => setCertUrl(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="cert-image">Certificate Image URL (optional)</Label>
                <Input
                  id="cert-image"
                  placeholder="https://example.com/certificate.jpg"
                  value={certImage}
                  onChange={(e) => setCertImage(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Mentorship Form */}
          <TabsContent value="mentorship" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="mentor-name">Mentor Name</Label>
                <Input
                  id="mentor-name"
                  placeholder="e.g. John Doe"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="mentor-address">Mentor Wallet Address (optional)</Label>
                <Input
                  id="mentor-address"
                  placeholder="0x..."
                  value={mentorAddress}
                  onChange={(e) => setMentorAddress(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="mentorship-topic">Topic</Label>
                <Input
                  id="mentorship-topic"
                  placeholder="e.g. React Advanced Patterns"
                  value={mentorshipTopic}
                  onChange={(e) => setMentorshipTopic(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="mentorship-date">Date</Label>
                <Input
                  id="mentorship-date"
                  type="date"
                  value={mentorshipDate}
                  onChange={(e) => setMentorshipDate(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="mentorship-duration">Duration (minutes)</Label>
                <Input
                  id="mentorship-duration"
                  type="number"
                  value={mentorshipDuration}
                  onChange={(e) => setMentorshipDuration(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-2">
                <Label htmlFor="mentorship-endorsements">Skills Endorsed (comma-separated)</Label>
                <Input
                  id="mentorship-endorsements"
                  placeholder="e.g. React, Problem Solving, Communication"
                  value={mentorshipEndorsements}
                  onChange={(e) => setMentorshipEndorsements(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          {activeTab === "skill" && (
            <Button onClick={handleAddSkill} disabled={isUploading || !skillName || !skillCategory}>
              {isUploading ? "Adding..." : "Add Skill"}
            </Button>
          )}
          {activeTab === "project" && (
            <Button onClick={handleAddProject} disabled={isUploading || !projectTitle || !projectDescription}>
              {isUploading ? "Adding..." : "Add Project"}
            </Button>
          )}
          {activeTab === "certificate" && (
            <Button onClick={handleAddCertificate} disabled={isUploading || !certTitle || !certIssuer || !certIssueDate}>
              {isUploading ? "Adding..." : "Add Certificate"}
            </Button>
          )}
          {activeTab === "mentorship" && (
            <Button onClick={handleAddMentorship} disabled={isUploading || !mentorName || !mentorshipTopic || !mentorshipDate}>
              {isUploading ? "Adding..." : "Add Mentorship"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}