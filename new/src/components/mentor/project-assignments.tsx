 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Project = {
  id: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "under-review" | "completed";
  progress: number;
  dueDate: Date;
  skills: string[];
  isAIGenerated: boolean;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Build a REST API with Node.js and Express",
    description: "Create a RESTful API that includes authentication, database integration, and proper error handling.",
    status: "in-progress",
    progress: 65,
    dueDate: new Date(2023, 5, 15),
    skills: ["Node.js", "Express", "MongoDB", "JWT"],
    isAIGenerated: true
  },
  {
    id: "2",
    title: "React Component Library with Storybook",
    description: "Develop a reusable component library using React, TypeScript, and Storybook for documentation.",
    status: "not-started",
    progress: 0,
    dueDate: new Date(2023, 6, 1),
    skills: ["React", "TypeScript", "Storybook", "CSS"],
    isAIGenerated: false
  },
  {
    id: "3",
    title: "E-commerce Product Page Optimization",
    description: "Optimize a product page for performance, accessibility, and conversion.",
    status: "completed",
    progress: 100,
    dueDate: new Date(2023, 4, 10),
    skills: ["React", "Performance", "A11y", "UX"],
    isAIGenerated: true
  }
];

export function ProjectAssignments() {
  const [activeProjects, setActiveProjects] = useState<Project[]>(projects);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "not-started":
        return "bg-gray-500";
      case "in-progress":
        return "bg-blue-500";
      case "under-review":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "not-started":
        return "Not Started";
      case "in-progress":
        return "In Progress";
      case "under-review":
        return "Under Review";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };

  return (
    <Card className="h-[550px] flex flex-col">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Project Assignments</CardTitle>
          <Button variant="outline" size="sm" className="text-mentor hover:text-mentor/90 hover:bg-mentor/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
            </svg>
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto px-4 pt-2 pb-0">
        <div className="space-y-4">
          {activeProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className={`h-1 ${getStatusColor(project.status)}`}></div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="flex items-center gap-2">
                    {project.isAIGenerated && (
                      <Badge variant="outline" className="text-xs border-mentor text-mentor">
                        AI Generated
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                  
                  <div className="flex justify-between text-xs">
                    <div className="text-muted-foreground">Due date: <span className="text-foreground">{formatDate(project.dueDate)}</span></div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                      <span>{project.skills.length} skills</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-4 py-2 bg-muted/50 flex justify-between">
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  View Details
                </Button>
                {project.status !== "completed" && (
                  <Button variant="mentor" size="sm" className="text-xs h-7">
                    {project.status === "not-started" ? "Start Project" : "Continue"}
                  </Button>
                )}
                {project.status === "completed" && (
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    View Certificate
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}