"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRegisterMentor, saveMentorToDB } from "@/lib/mentorUtils";
import { useAuth } from "@/lib/auth";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  expertise: z.string().min(3, "Expertise must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function MentorRegistrationPage() {
  const { isConnected, address } = useAccount();
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerMentor, isLoading: isRegistering } = useRegisterMentor();

  // Redirect if wallet not connected
  useEffect(() => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      router.push("/mentor-auth");
    }
  }, [isConnected, address, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "",
      expertise: "",
      email: user?.email || "",
    },
  });

  async function onSubmit(data: FormValues) {
    if (!isConnected || !address) {
      toast.error("Please connect your Polygon Amoy wallet first");
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Register on blockchain
      toast.info("Registering on blockchain - please approve the transaction in your wallet");
      const txHash = await registerMentor(data.name, data.expertise, data.email);
      if (!txHash) {
        toast.error("Failed to register on blockchain");
        return;
      }

      // Step 2: Save to database
      toast.info("Saving your information to our database...");
      const mentorData = {
        name: data.name,
        expertise: data.expertise,
        email: data.email,
        wallet: address,
        isApproved: false,
        txHash,
      };

      await saveMentorToDB(mentorData);
      
      toast.success("Registration successful! Waiting for admin approval.");
      router.push("/mentor-auth/registration-success");
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed";
      toast.error(errorMessage);
      
      // Handle specific errors
      if (errorMessage.includes("User rejected") || errorMessage.includes("rejected by user")) {
        toast.error("You rejected the transaction. Please try again when you're ready.");
      } else if (errorMessage.includes("insufficient funds")) {
        toast.error("You need MATIC tokens on Polygon Amoy for gas. Visit a faucet to get some.");
      }
      
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isConnected) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold mb-4">Wallet Not Connected</h1>
          <p className="mb-4">Please connect your Polygon Amoy wallet to register as a mentor.</p>
          <Button onClick={() => router.push("/mentor-auth")}>
            Back to Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="max-w-md mx-auto">
        {/* Important note about testnet */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800">⚠️ Development Mode</h3>
          <p className="text-xs text-blue-700 mt-1">
            This app is running on the Polygon Amoy testnet. No real money is involved.
            The registration process simulates blockchain transactions for testing purposes.
          </p>
        </div>
      
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Register as a Mentor</h1>
          
          <div className="rounded-lg bg-emerald-50 p-4 mb-6">
            <p className="text-sm text-emerald-800">
              Wallet address: <span className="font-mono">{address}</span>
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Make sure you have some MATIC tokens for gas fees. You can get them from a Polygon Amoy faucet.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expertise">Area of Expertise</Label>
              <Input
                id="expertise"
                {...register("expertise")}
                placeholder="e.g. Blockchain Development, AI, Web3"
              />
              {errors.expertise && (
                <p className="text-sm text-red-500">{errors.expertise.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-emerald-500"
              disabled={isSubmitting || isRegistering}
            >
              {isSubmitting || isRegistering ? "Registering..." : "Register as Mentor"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need Polygon Amoy testnet MATIC? Visit{" "}
              <a 
                href="https://faucet.polygon.technology/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                the official Polygon faucet
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 