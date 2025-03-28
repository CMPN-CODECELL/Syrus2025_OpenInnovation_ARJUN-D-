"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIMentorChat } from "@/components/mentor/ai-chat";
import { CareerAnalysis } from "@/components/mentor/career-analysis";
import { ProjectAssignments } from "@/components/mentor/project-assignments";
import { SkillVerification } from "@/components/mentor/skill-verification";

export function AIMentorDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold">AI Mentor System</h3>
        <p className="text-sm text-muted-foreground">
          Get personalized mentorship, career guidance, and project assignments
        </p>
      </div>
      
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="career">Career Analysis</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="m-0">
          <AIMentorChat />
        </TabsContent>
        
        <TabsContent value="career" className="m-0">
          <CareerAnalysis />
        </TabsContent>
        
        <TabsContent value="projects" className="m-0">
          <ProjectAssignments />
        </TabsContent>
        
        <TabsContent value="skills" className="m-0">
          <SkillVerification />
        </TabsContent>
      </Tabs>
    </div>
  );
} 