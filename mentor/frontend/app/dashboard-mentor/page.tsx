'use client';

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Users,
  Calendar,
  Clock,
  Star,
  Bell,
  Menu,
  Home,
  Settings,
  CreditCard,
  User,
  Search,
  Workflow,
  LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isConnected , address} = useAccount();
  const pathname = usePathname();
  const router = useRouter()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
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
      toast.error("You must connect your wallet to register as a mentor.");
      router.push("/mentor-auth"); // Redirect if wallet is not connected
    }
  }, [isConnected]);

  return (
    <div className="flex min-h-screen">
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="px-6 py-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <LineChart className="h-6 w-6" />
            <span className="font-bold">Mentor.Net</span>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="px-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm"
              />
            </div>
          </div>
          <nav className="space-y-1 px-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href
                    ? "bg-accent text-accent-foreground"
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

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-auto flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuItem>New student request</DropdownMenuItem>
                <DropdownMenuItem>Upcoming session in 1 hour</DropdownMenuItem>
                <DropdownMenuItem>Student feedback received</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <ConnectButton/>
          </div>
        </header>

        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Mentor Dashboard</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-500/10 rounded-full">
                  <Users className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <h3 className="text-2xl font-bold">24</h3>
                  <p className="text-xs text-emerald-500">+3 this month</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-500/10 rounded-full">
                  <Clock className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Mentored</p>
                  <h3 className="text-2xl font-bold">156</h3>
                  <p className="text-xs text-emerald-500">+12 this week</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-500/10 rounded-full">
                  <Star className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <h3 className="text-2xl font-bold">4.9</h3>
                  <p className="text-xs text-emerald-500">From 48 reviews</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-500/10 rounded-full">
                  <Activity className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <h3 className="text-2xl font-bold">95%</h3>
                  <p className="text-xs text-emerald-500">+2% from last month</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold">Upcoming Sessions</h4>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    student: "Rohit Shahi",
                    topic: "React Advanced Patterns",
                    time: "2:00 PM - 3:00 PM",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  },
                  {
                    student: "Devansh Joshi",
                    topic: "System Design Basics",
                    time: "4:00 PM - 5:00 PM",
                    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  },
                  {
                    student: "Umesh Tolani",
                    topic: "JavaScript Fundamentals",
                    time: "6:00 PM - 7:00 PM",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={session.image} />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.student}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{session.time}</span>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="col-span-3 p-6">
              <h4 className="text-xl font-semibold mb-4">Student Progress</h4>
              <div className="space-y-4">
                {[
                  {
                    name: "Rohit Shahi",
                    course: "Advanced React",
                    progress: 85,
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  },
                  {
                    name: "Devansh Joshi",
                    course: "System Design",
                    progress: 60,
                    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  },
                  {
                    name: "Umesh Tolani",
                    course: "JavaScript Basics",
                    progress: 40,
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                ].map((student, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.image} />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.course}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-emerald-100">
                      <div 
                        className="h-full rounded-full bg-emerald-500" 
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}