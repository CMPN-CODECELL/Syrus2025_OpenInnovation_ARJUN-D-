"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileCode, User, Calendar } from "lucide-react";
import { mentorDAO } from "@/lib/blockchain";
import { Project } from "@/lib/blockchain/mentorDAO";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWalletAndProjects() {
      try {
        setIsLoading(true);
        
        // Check if wallet is connected
        if (window.ethereum?.selectedAddress) {
          setConnectedAddress(window.ethereum.selectedAddress);
          
          // Fetch mentor's projects
          const projectIds = await mentorDAO.getMentorProjects(window.ethereum.selectedAddress);
          
          if (projectIds && projectIds.length > 0) {
            const projectDetails: Project[] = [];
            
            for (const id of projectIds) {
              const project = await mentorDAO.getProjectDetails(id);
              if (project) {
                projectDetails.push(project);
              }
            }
            
            setProjects(projectDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchWalletAndProjects();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <p className="text-muted-foreground">Manage your mentoring projects</p>
        </div>
        
        <Link href="/dashboard/projects/create">
          <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
        </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : !connectedAddress ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="mb-4">Please connect your wallet to view and manage projects</p>
          </CardContent>
        </Card>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <FileCode className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Start creating projects for students to work on</p>
            <Link href="/dashboard/projects/create">
              <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
            <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.projectName}</CardTitle>
                  <Badge className={
                    project.isCompleted
                      ? "bg-green-100 text-green-800"
                      : project.isAssigned
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }>
                    {project.isCompleted ? "Completed" : project.isAssigned ? "Assigned" : "Open"}
                  </Badge>
                </div>
                <CardDescription>{project.skillArea}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="mb-4 text-sm line-clamp-3">{project.projectDescription}</p>
                
                {project.isAssigned && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <User className="h-4 w-4 mr-2" />
                    <span>Student: </span>
                    <span className="font-mono ml-1">
                      {project.student.substring(0, 6)}...{project.student.substring(project.student.length - 4)}
                    </span>
                </div>
                )}
                
                <div className="mt-auto pt-4 flex justify-end">
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
            </div>
          </CardContent>
        </Card>
          ))}
            </div>
      )}
    </div>
  );
} 