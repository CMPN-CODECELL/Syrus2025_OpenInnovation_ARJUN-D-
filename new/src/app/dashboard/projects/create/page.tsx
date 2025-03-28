"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mentorDAO } from "@/lib/blockchain";

export default function CreateProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skillArea, setSkillArea] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!projectName || !projectDescription || !skillArea) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create project on blockchain
      const result = await mentorDAO.createProject(projectName, projectDescription, skillArea);
      
      if (!result.success) {
        throw new Error(result.message || "Failed to create project on blockchain");
      }
      
      // Get connected wallet address
      const connectedAddress = window.ethereum?.selectedAddress;
      if (!connectedAddress) {
        throw new Error("No wallet address found. Please connect your wallet.");
      }
      
      // Save project to database
      const dbResult = await mentorDAO.saveProjectToDB(
        projectName,
        projectDescription,
        skillArea,
        connectedAddress,
        result.txHash
      );
      
      if (dbResult) {
        toast.success("Project created successfully!");
        // Redirect to projects list
        router.push("/dashboard/projects");
      } else {
        toast.error("Project created on blockchain but failed to save to database");
      }
    } catch (error) {
      console.error("Project creation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Project</CardTitle>
          <CardDescription>
            Create a new project for students to work on. Students will be able to browse and apply to your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="AI-Powered Personal Assistant"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe the project goals, requirements, and expected outcomes..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skillArea">Skill Area</Label>
              <Input
                id="skillArea"
                placeholder="e.g., Machine Learning, Web Development, Mobile App Development"
                value={skillArea}
                onChange={(e) => setSkillArea(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/dashboard/projects")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-emerald-500 text-white hover:bg-emerald-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 