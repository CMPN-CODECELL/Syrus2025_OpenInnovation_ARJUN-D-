"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, Settings, User, Workflow } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function MentorDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [mentorInfo, setMentorInfo] = useState<any>(null);
  const [projectStats, setProjectStats] = useState({
    total: 0,
    assigned: 0,
    completed: 0,
  });
  
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const navigationItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard-mentor",
    },
    {
      label: "Projects",
      icon: Workflow,
      href: "/dashboard-mentor/project",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
    },
  ];

  useEffect(() => {
    if (!isConnected) {
      toast.error("You must connect your wallet to access the mentor dashboard.");
      router.push("/mentor-auth"); // Redirect if wallet is not connected
      return;
    }

    const fetchMentorData = async () => {
      try {
        setLoading(true);
        
        // Get mentor info from Supabase
        const { data: mentorData, error: mentorError } = await supabase
          .from("mentors")
          .select("*")
          .eq("wallet", address)
          .single();
        
        if (mentorError) {
          console.error("Error fetching mentor data:", mentorError);
          toast.error("Error fetching your mentor profile.");
          if (mentorError.code === "PGRST116") { // Not found
            router.push("/mentor-auth");
          }
          return;
        }
        
        setMentorInfo(mentorData);
        
        // Get project stats 
        // This would ideally come from the blockchain or database
        setProjectStats({
          total: 5, // Mock data - replace with actual fetch
          assigned: 3,
          completed: 2,
        });
        
      } catch (error) {
        console.error("Error in fetchMentorData:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMentorData();
  }, [isConnected, router, address]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mentor Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="h-40 animate-pulse bg-gray-100"></Card>
          <Card className="h-40 animate-pulse bg-gray-100"></Card>
          <Card className="h-40 animate-pulse bg-gray-100"></Card>
        </div>
      </div>
    );
  }
  
  if (!mentorInfo) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">Mentor Dashboard</h1>
        <p className="text-lg">No mentor profile found. Please register as a mentor first.</p>
        <Button 
          className="mt-4 bg-emerald-500" 
          onClick={() => router.push("/mentor-auth/mentor-registration")}
        >
          Register as Mentor
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mentor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>Manage your mentorship projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projectStats.total}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {projectStats.assigned} assigned, {projectStats.completed} completed
            </div>
            <Button 
              className="w-full mt-4 bg-emerald-500"
              onClick={() => router.push("/dashboard-mentor/project")}
            >
              View Projects <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mentor Profile</CardTitle>
            <CardDescription>Your mentor information</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="font-semibold">{mentorInfo.name}</p>
              <p className="text-sm text-muted-foreground">{mentorInfo.expertise}</p>
              <p className="text-sm text-muted-foreground mt-2">{mentorInfo.email}</p>
              <p className="text-xs font-mono text-muted-foreground mt-2 truncate">
                {address}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Mentor tools</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button 
              className="w-full bg-emerald-500"
              onClick={() => router.push("/dashboard-mentor/project/create")}
            >
              Create New Project
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => router.push("/dashboard/profile")}
            >
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Navigation</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {navigationItems.map((item) => (
            <Card key={item.href} className={pathname === item.href ? "border-emerald-500" : ""}>
              <Link href={item.href}>
                <CardContent className="flex items-center gap-4 p-4 cursor-pointer">
                  <item.icon className="w-6 h-6 text-emerald-500" />
                  <span>{item.label}</span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 