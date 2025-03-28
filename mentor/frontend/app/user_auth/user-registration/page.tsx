"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerStudentOnChain} from "@/lib/studentUtils";
import { supabase } from "@/lib/supabaseClient";

// Schema validation using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  skills: z.string().min(3, "Skills must be at least 3 characters"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  achievements: z.string().optional(),
});

// TypeScript type for form data
type FormData = z.infer<typeof formSchema>;

function StudentRegistrationPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      toast.error("You must connect your wallet to register as a student.");
      router.push("/student-auth"); // Redirect if wallet not connected
    }

    const checkStudentRegistration = async () => {
      const { data, error } = await supabase
        .from("Student")
        .select("wallet")
        .eq("wallet", address)
        .single();

      if (error) {
        console.error("Supabase Query Error:", error.message);
        return;
      }

      if (data) {
        router.push("/dashboard-student"); // Redirect if already registered
      }
    };

    checkStudentRegistration();
  }, [isConnected, router, address]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      skills: "",
      collegeName: "",
      achievements: "",
    },
  });

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isConnected || !address) {
      toast.error("Wallet not connected!");
      router.push("/student-auth");
      return;
    }

    try {
      // Register student on-chain
      const txHash = await registerStudentOnChain(
        data.name,
        data.email,
        data.skills,
        data.collegeName,
        data.achievements || ""
      );

      if (!txHash) {
        toast.error("On-chain registration failed!");
        return;
      }

      toast.success("Student registered successfully!");
      router.push("/dashboard-student");
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Student Registration</CardTitle>
          <CardDescription>Join as a student to get mentorship</CardDescription>
          <CardDescription>Your Address: {address}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-md w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Skills" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input placeholder="College Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="achievements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievements (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Achievements" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-emerald-500">
                Register as Student
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

export default StudentRegistrationPage;
