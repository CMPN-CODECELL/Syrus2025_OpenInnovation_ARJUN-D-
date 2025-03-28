"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Import functions from `projectUtils.ts`
import { createProjectOnChain, saveProjectToDB } from "@/lib/projectUtils";

// ✅ Zod Schema for Validation
const projectSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters"),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
  skillArea: z.string().min(2, "Skill area must be specified"),
});

// ✅ Main Component
export default function CreateProjectForm() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: { projectName: "", projectDescription: "", skillArea: "" },
  });

  // ✅ Form Submit Handler
  const onSubmit: SubmitHandler<z.infer<typeof projectSchema>> = async (values) => {
    if (!address) return toast.error("Connect your wallet first!");

    setLoading(true);
    const { success, txHash, message } = await createProjectOnChain(values.projectName, values.projectDescription, values.skillArea);

    if (!success) {
      setLoading(false);
      return toast.error(`Failed: ${message}`);
    }

    const saved = await saveProjectToDB(values.projectName, values.projectDescription, values.skillArea, address, txHash);
    setLoading(false);

    saved ? toast.success("Project Created!") : toast.error("Failed to save in DB.");
  };

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Project Name */}
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl><Input placeholder="AI Research" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Description */}
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Input placeholder="Explain project details..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skill Area */}
            <FormField
              control={form.control}
              name="skillArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Area</FormLabel>
                  <FormControl><Input placeholder="Blockchain, AI, etc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
