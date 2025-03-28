"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mentorDAO } from "@/lib/blockchain";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  expertise: z.string().min(3, "Expertise must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function MentorRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expertise: "",
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // First register the mentor on the blockchain
      const result = await mentorDAO.registerMentor(values.name, values.expertise, values.email);
      
      if (!result.success) {
        throw new Error(result.message || "Failed to register mentor on blockchain");
      }

      // If blockchain registration is successful, save to database
      const connectedAddress = window.ethereum?.selectedAddress;
      if (!connectedAddress) {
        throw new Error("No wallet address found. Please connect your wallet.");
      }

      const dbResult = await mentorDAO.saveMentorToDB(
        values.name,
        values.expertise, 
        values.email,
        connectedAddress,
        result.txHash
      );

      if (dbResult) {
        toast.success("Mentor registration successful! Your application is now pending approval.");
        form.reset();
      } else {
        toast.error("Registered on blockchain but failed to save to database.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to register as mentor");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register as a Mentor</CardTitle>
          <CardDescription>
            Join our community of mentors and share your expertise with students worldwide.
            Once registered, an admin will review and approve your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Area of Expertise</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Web Development, Machine Learning, Blockchain" 
                        {...field} 
                      />
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
                      <Input placeholder="your.email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-emerald-500 text-white hover:bg-emerald-600" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register as Mentor"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 