"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { mentorDAO } from "@/lib/blockchain";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, User } from "lucide-react";

interface Project {
  id: number;
  mentor: string;
  student: string;
  projectName: string;
  projectDescription: string;
  skillArea: string;
  isAssigned: boolean;
  isCompleted: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet to view your projects");
      router.push("/mentor-auth");
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        if (!address) return;

        // Get project IDs from blockchain
        const projectIds = await mentorDAO.getMentorProjects(address);
        
        if (!projectIds || projectIds.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        // Fetch details for each project
        const projectDetails = await Promise.all(
          projectIds.map(async (id) => {
            return await mentorDAO.getProjectDetails(Number(id));
          })
        );

        // Filter out any null results
        setProjects(projectDetails.filter(Boolean) as Project[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isConnected, address, router]);

  const handleCreateProject = () => {
    router.push("/dashboard-mentor/project/create");
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-xl">Please connect your wallet to view your projects</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Button onClick={handleCreateProject} className="bg-emerald-500">
          <Plus className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {projects.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">You haven't created any projects yet.</p>
                  <Button onClick={handleCreateProject} className="mt-4 bg-emerald-500">
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="available">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => !p.isAssigned && !p.isCompleted)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="assigned">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => p.isAssigned && !p.isCompleted)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => p.isCompleted)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // Generate a random progress number for demonstration
  const progress = Math.floor(Math.random() * 101);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.projectName}</CardTitle>
          <ProjectStatusBadge 
            isAssigned={project.isAssigned} 
            isCompleted={project.isCompleted} 
          />
        </div>
        <CardDescription>{project.skillArea}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{project.projectDescription}</p>
        
        {project.isAssigned && !project.isCompleted && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {project.isAssigned && (
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span className="font-mono text-xs truncate max-w-28" title={project.student}>
              {project.student}
            </span>
          </div>
        )}
        <Button variant="outline" className="ml-auto">
          {project.isCompleted ? "View Details" : project.isAssigned ? "Manage" : "Edit"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectStatusBadge({ 
  isAssigned, 
  isCompleted 
}: { 
  isAssigned: boolean;
  isCompleted: boolean;
}) {
  if (isCompleted) {
    return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
  }
  
  if (isAssigned) {
    return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
  }
  
  return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Available</Badge>;
} 