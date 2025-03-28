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
  LineChart,
  Plus,
  FileText,
  ChevronDown,
  FolderOpen
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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProjectOnChain, saveProjectToDB } from "@/lib/projectUtils";
import { getMentorProjects } from "@/lib/mentorUtils";

const projectSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters"),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
  skillArea: z.string().min(2, "Skill area must be specified"),
});

type Project = {
  id: string;
  projectName: string;
  projectDescription: string;
  skillArea: string;
  studentCount: number;
  status: string;
};

export default function ProjectPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { address, isConnected } = useAccount();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      skillArea: ""
    },
  });

  const fetchProjects = async () => {
    if (!address) {
      console.log("Address is not available");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const fetchedProjects = await getMentorProjects(address);
      console.log("Fetched Projects:", fetchedProjects);

      if (!fetchedProjects || fetchedProjects.length === 0) {
        console.log("No projects found");
        setProjects([]);
        setIsLoading(false);
        return;
      }

      const validatedProjects = fetchedProjects.map((project: any) => ({
        id: project.id?.toString() || Date.now().toString(),
        projectName: project.projectName || "Unnamed Project",
        projectDescription: project.projectDescription || "No description available",
        skillArea: project.skillArea || "General",
        studentCount: Number(project.studentCount) || 0,
        status: project.status === "active" ? "active" : "draft",
      }));

      console.log("Validated Projects:", validatedProjects);
      setProjects(validatedProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet to continue");
      router.push("/mentor-auth");
      return;
    }

    fetchProjects();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        router.push("/mentor-auth");
      } else {
        fetchProjects();
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [address, isConnected]);

  const onSubmit: SubmitHandler<z.infer<typeof projectSchema>> = async (values) => {
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }

    setFormLoading(true);
    try {
      const { success, txHash, message } = await createProjectOnChain(
        values.projectName,
        values.projectDescription,
        values.skillArea
      );

      if (!success) {
        throw new Error(message || "Failed to create project on chain");
      }

      const saved = await saveProjectToDB(
        values.projectName,
        values.projectDescription,
        values.skillArea,
        address,
        txHash
      );

      if (!saved) {
        throw new Error("Failed to save project to database");
      }

      toast.success("Project created successfully!");
      await fetchProjects();
      form.reset();
    } catch (error) {
      console.error("Project creation error:", error);
      toast.error(error instanceof Error ? error.message : "Project creation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const routes = [
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
            <ConnectButton />
          </div>
        </header>

        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Manage Projects</h2>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => form.setFocus("projectName")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-xl font-semibold mb-6">Create New Project</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="AI Research" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
        
                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain project details..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
        
                  <FormField
                    control={form.control}
                    name="skillArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Area</FormLabel>
                        <FormControl>
                          <Input placeholder="Blockchain, AI, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
        
                  <Button 
                    type="submit" 
                    disabled={formLoading} 
                    className="w-full"
                  >
                    {formLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : "Create Project"}
                  </Button>
                </form>
              </Form>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Your Projects</h3>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-200 rounded"></div>
                              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Get started by creating your first project
                    </p>
                    <Button 
                      className="mt-4"
                      onClick={() => form.setFocus("projectName")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 hover:bg-accent transition-colors mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{project.projectName}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {project.projectDescription}
                            </p>
                            <div className="flex items-center mt-2 space-x-2 text-sm text-muted-foreground">
                              <span className="capitalize">{project.skillArea}</span>
                              <span>•</span>
                              <span>{project.studentCount} student{project.studentCount !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Submissions</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            project.status === "active" 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-gray-100 text-gray-800"
                          )}>
                            {project.status === "active" ? "Active" : "Draft"}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-emerald-500"
                            onClick={() => {
                              router.push(`/dashboard-mentor/project/${project.id}`);
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}