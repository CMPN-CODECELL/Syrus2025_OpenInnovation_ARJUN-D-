"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi"
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerMentorOnChain, saveMentorToDB } from "@/lib/mentorUtils";
import { supabase } from "@/lib/supabaseClient";
import { log } from "console";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  expertise: z.string().min(3, "Expertise must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

// Define TypeScript interface for form data
type FormData = z.infer<typeof formSchema>;

function MentorRegistrationPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      toast.error("You must connect your wallet to register as a mentor.");
      router.push("/mentor-auth"); // Redirect if wallet is not connected
    }

    const checkMentorRegistration = async () => {
        const { data, error } = await supabase
          .from("Mentor")
          .select("wallet")
          .eq("wallet", address)
          .single();
  
        if (error) {
          console.error("Supabase Query Error:", error.message);
          return;
        }
  
        if (data) {
          router.push("/dashboard-mentor"); // Redirect to dashboard if registered
        }
      };
  
      checkMentorRegistration();
  }, [isConnected, router , address]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expertise: "",
      email: "",
    },
  });

  const handleSubmit: SubmitHandler<any> = async (data) => {
    if (!isConnected || !address) {
      toast.error("Wallet not connected!");
      router.push("/mentor-auth");
      return;
    }

    try {
      // Register mentor on-chain
      const txHash = await registerMentorOnChain(data.name, data.expertise, data.email);

      if (!txHash) {
        toast.error("On-chain registration failed!");
        return;
      }

      // Save mentor in Supabase
      const success = await saveMentorToDB(data.name, data.expertise, data.email, address, txHash);

      if (success) {
        toast.success("Mentor registered successfully!");
        router.push("/mentor-dashboard");
      } else {
        toast.error("Failed to save mentor in database.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Mentor Registration</CardTitle>
          <CardDescription>Register as a mentor to help students</CardDescription>
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
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expertise</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Expertise" {...field} />
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

              <Button type="submit" className="w-full bg-emerald-500">
                Register as Mentor
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>
    </main>
  );
}

export default MentorRegistrationPage;
