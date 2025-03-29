"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import mentor from "../mentor.json"; // Import contract ABI and address
import { toast } from "sonner";
import {
  Users,
  Clock,
  Star,
  Award,
  Home,
  Bot,
  User,
  Menu,
  Bell,
  Search,
  Loader,
} from "lucide-react";
import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  interface Mentor {
    address: string;
    name: string;
    expertise: string;
    email: string;
    totalProjects: string;
    studentCount: string;
  }

  const [approvedMentors, setApprovedMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard-student",
    },
    {
      label: "Mentors",
      icon: Users,
      href: "/dashboard-student/mentors",
    },
    {
      label: "AI Mentor",
      icon: Bot,
      href: "/dashboard-student/ai-mentor",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard-student/profile",
    },
    {
      label: "Certificates",
      icon: Award,
      href: "/dashboard-student/certificates",
    },
  ];

  useEffect(() => {
    if (!isConnected) {
      toast.error("You must connect your wallet to access the dashboard.");
      router.push("/student-auth"); // Redirect if wallet is not connected
      return;
    }

    const fetchApprovedMentors = async () => {
      try {
        setIsLoading(true);
        if (!window.ethereum) {
          toast.error("MetaMask not detected!");
          return;
        }

        // Initialize provider and contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          mentor.address,
          mentor.abi,
          provider
        );

        // Call the getApprovedMentors function
        const mentors = await contract.getApprovedMentors();
        console.log("Raw mentors data:", mentors);

        const formattedMentors = mentors[0].map((_: any, index: number) => ({
          address: mentors[0][index],
          name: mentors[1][index],
          expertise: mentors[2][index],
          email: mentors[3][index],
          totalProjects: mentors[4][index].toString(),
          studentCount: mentors[5][index].toString(),
        }));

        console.log("Formatted mentors:", formattedMentors);
        setApprovedMentors(formattedMentors);
      } catch (error) {
        console.error("Error fetching approved mentors:", error);
        toast.error("Failed to fetch approved mentors.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedMentors();
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
          <Link href="/dashboard-student" className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-emerald-500" />
            <span className="font-bold text-emerald-500">Student.Net</span>
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
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <ConnectButton />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-500">
            Approved Mentors
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 text-emerald-500 animate-spin" />
            </div>
          ) : approvedMentors.length === 0 ? (
            <p className="text-center text-gray-500">No mentors found.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {approvedMentors.map((mentor, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border border-emerald-500 shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://robohash.org/${mentor.address}`} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-500">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Expertise: {mentor.expertise}
                      </p>
                      <p className="text-sm text-gray-600">Email: {mentor.email}</p>
                      <p className="text-sm text-gray-600">
                        Projects: {mentor.totalProjects}
                      </p>
                      <p className="text-sm text-gray-600">
                        Students: {mentor.studentCount}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full text-emerald-500 border-emerald-500"
                    onClick={() =>
                      toast.success(`Contact ${mentor.name} at ${mentor.email}`)
                    }
                  >
                    Contact Mentor
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}