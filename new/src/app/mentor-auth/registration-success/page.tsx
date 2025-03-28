"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function RegistrationSuccessPage() {
  const router = useRouter();

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
        
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          Thank you for registering as a mentor on MentorNet. Your application has been submitted 
          and is pending approval from our administrators.
        </p>
        
        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg mb-8">
          <p className="text-emerald-700 dark:text-emerald-300">
            You'll receive a notification once your application is approved. This typically takes 1-2 business days.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => router.push("/")}
            variant="outline"
          >
            Return to Home
          </Button>
          
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => router.push("/dashboard-mentor")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
} 