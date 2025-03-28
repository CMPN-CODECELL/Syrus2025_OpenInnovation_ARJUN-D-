"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Home,
  Users,
  Bot,
  User,
  Award,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function MentorDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    expertise: "Blockchain Development",
    totalProjects: 12,
    studentsAssigned: 8,
  });

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard-mentor",
    },
    {
      label: "Students",
      icon: Users,
      href: "/dashboard-mentor/students",
    },
    {
      label: "AI Mentor",
      icon: Bot,
      href: "/dashboard-mentor/ai-mentor",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard-mentor/profile",
    },
    {
      label: "Certificates",
      icon: Award,
      href: "/dashboard-mentor/certificates",
    },
  ];

  useEffect(() => {
    if (!isConnected) {
      toast.error("You must connect your wallet to access the dashboard.");
      router.push("/mentor-auth"); // Redirect if wallet is not connected
    }
  }, [isConnected]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white transition-transform lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="px-6 py-4">
          <Link href="/dashboard-mentor" className="flex items-center space-x-2">
            <User className="h-6 w-6 text-emerald-500" />
            <span className="font-bold text-emerald-500">Mentor.Net</span>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="px-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-md border border-input bg-white px-8 py-2 text-sm"
              />
            </div>
          </div>
          <nav className="space-y-1 px-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-emerald-500 hover:text-white",
                  pathname === route.href
                    ? "bg-emerald-500 text-white"
                    : "transparent"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6 text-emerald-500" />
          </Button>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4 text-emerald-500" />
            </Button>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <AvatarFallback>MN</AvatarFallback>
            </Avatar>
            <ConnectButton />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-500">
            Mentor Profile
          </h2>
          <Card className="p-6 bg-white border border-emerald-500 shadow">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://robohash.org/mentor-profile" />
                <AvatarFallback>{userDetails.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-emerald-500">
                  {userDetails.name}
                </h3>
                <p className="text-sm text-gray-600">Email: {userDetails.email}</p>
                <p className="text-sm text-gray-600">
                  Expertise: {userDetails.expertise}
                </p>
                <p className="text-sm text-gray-600">
                  Total Projects: {userDetails.totalProjects}
                </p>
                <p className="text-sm text-gray-600">
                  Students Assigned: {userDetails.studentsAssigned}
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default MentorDashboardPage;