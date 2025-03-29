"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import mentor from "../mentor.json"; // Import contract ABI and address
import { toast } from "sonner";
import { Users, Home, Bot, User, Menu, Bell, Search, Loader } from "lucide-react";
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
  ];

  const dummyMentors: Mentor[] = [
    {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      name: "Rohit Shahi",
      expertise: "Blockchain Development",
      email: "rohit.shahi@example.com",
      totalProjects: "5",
      studentCount: "10",
    },
    {
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
      name: "Umesh Tolani",
      expertise: "AI and Machine Learning",
      email: "umesh.tolani@example.com",
      totalProjects: "8",
      studentCount: "15",
    },
    {
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
      name: "Gopal Vnajarani",
      expertise: "Web Development",
      email: "gopal.vnajarani@example.com",
      totalProjects: "3",
      studentCount: "7",
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

        // If no mentors are returned, use dummy data
        if (formattedMentors.length === 0) {
          setApprovedMentors(dummyMentors);
        } else {
          setApprovedMentors(formattedMentors);
        }
      } catch (error) {
        console.error("Error fetching approved mentors:", error);
        toast.error("Failed to fetch approved mentors. Loading dummy data.");
        setApprovedMentors(dummyMentors); // Load dummy data on error
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
            <span className="font-bold text-emerald-500">Student.Net</span>
          </Link>
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
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-500">
            Approved Mentors
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 text-emerald-500 animate-spin" />
            </div>
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