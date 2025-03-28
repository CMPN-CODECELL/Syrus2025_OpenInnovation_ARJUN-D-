"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function RegisterPage({ searchParams }: { searchParams: { role?: string } }) {
  const role = searchParams.role || "student";
  const isStudent = role === "student";
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    expertise: "",
    interests: ""
  });
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: isStudent ? "student" : "mentor"
      });
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Link href="/" className="font-bold text-2xl">
                <span className="mentor-gradient">Mentor</span>
                <span className="student-gradient">Net</span>
              </Link>
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up as a {isStudent ? "student" : "mentor"} to {isStudent ? "learn and grow" : "share your expertise"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium leading-none">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium leading-none">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
              
              {!isStudent && (
                <div className="grid gap-2">
                  <label htmlFor="expertise" className="text-sm font-medium leading-none">
                    Area of Expertise
                  </label>
                  <select
                    id="expertise"
                    className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.expertise}
                    onChange={handleChange}
                    required={!isStudent}
                  >
                    <option value="">Select your area of expertise</option>
                    <option value="software">Software Development</option>
                    <option value="data">Data Science</option>
                    <option value="design">UX/UI Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="product">Product Management</option>
                    <option value="blockchain">Blockchain & Web3</option>
                  </select>
                </div>
              )}
              
              {isStudent && (
                <div className="grid gap-2">
                  <label htmlFor="interests" className="text-sm font-medium leading-none">
                    Career Interests
                  </label>
                  <select
                    id="interests"
                    className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.interests}
                    onChange={handleChange}
                    required={isStudent}
                  >
                    <option value="">Select your career interest</option>
                    <option value="software">Software Development</option>
                    <option value="data">Data Science</option>
                    <option value="design">UX/UI Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="product">Product Management</option>
                    <option value="blockchain">Blockchain & Web3</option>
                  </select>
                </div>
              )}
              
              <Button className="w-full" variant={isStudent ? "student" : "mentor"} type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </span>
                <span className="relative bg-muted px-2 text-sm text-muted-foreground">Or continue with</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
            {isStudent ? (
              <p className="mt-2 text-sm text-center text-muted-foreground">
                Want to be a mentor?{" "}
                <Link href="/auth/register?role=mentor" className="text-primary underline-offset-4 hover:underline">
                  Sign up as mentor
                </Link>
              </p>
            ) : (
              <p className="mt-2 text-sm text-center text-muted-foreground">
                Want to be a student?{" "}
                <Link href="/auth/register?role=student" className="text-primary underline-offset-4 hover:underline">
                  Sign up as student
                </Link>
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 