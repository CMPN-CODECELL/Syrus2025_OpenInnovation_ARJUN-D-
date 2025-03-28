"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mentorDAO } from "@/lib/blockchain";
import { Loader2 } from "lucide-react";

const projectFormSchema = z.object({
  projectName: z
    .string()
    .min(5, { message: "Project name must be at least 5 characters." })
    .max(50, { message: "Project name must not exceed 50 characters." }),
  projectDescription: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." })
    .max(500, { message: "Description must not exceed 500 characters." }),
  skillArea: z
    .string()
    .min(3, { message: "Skill area must be at least 3 characters." })
    .max(50, { message: "Skill area must not exceed 50 characters." }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function CreateProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      skillArea: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet to create a project");
      router.push("/mentor-auth");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call blockchain contract to create project
      const result = await mentorDAO.createProject(
        data.projectName,
        data.projectDescription,
        data.skillArea
      );

      if (!result.success) {
        toast.error(result.message || "Failed to create project on the blockchain");
        return;
      }

      // Save project data to the database
      const saved = await mentorDAO.saveProjectToDB(
        data.projectName,
        data.projectDescription,
        data.skillArea,
        address,
        result.txHash
      );

      if (saved) {
        toast.success("Project created successfully!");
        router.push("/dashboard-mentor/project");
      } else {
        toast.error("Project was created on-chain but failed to save to the database");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-xl">Please connect your wallet to create a project</p>
        <Button 
          onClick={() => router.push("/mentor-auth")} 
          className="mt-4 bg-emerald-500"
        >
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Define a new project for students to work on under your mentorship
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a descriptive project name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A concise title that describes your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Area</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Blockchain, Web Development, Machine Learning" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      The primary skill area this project will focus on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project, objectives, and expected outcomes"
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the project, what students will learn, and the expected deliverables
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard-mentor/project")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-emerald-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Projects created will be verified on the blockchain and made available to students
        </CardFooter>
      </Card>
    </div>
  );
} 