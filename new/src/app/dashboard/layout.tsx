"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { MainNav } from "@/components/dashboard/main-nav";
import { WalletWidget } from "@/components/dashboard/wallet-widget";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl flex items-center">
              <span className="text-emerald-500">Mentor</span>
              <span>Net</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
                Explore
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Connect Wallet</span>
          </div>
        </div>
      </header>
      
      <div className="container flex-1 items-start grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6 py-8">
        {/* Simple Sidebar */}
        <aside className="hidden md:block">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                Dashboard
              </h2>
              <div className="space-y-1">
                <Link 
                  href="/dashboard" 
                  className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/mentors" 
                  className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Mentors
                </Link>
                <Link 
                  href="/dashboard/projects" 
                  className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Projects
                </Link>
                <Link 
                  href="/dashboard/certificates" 
                  className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Certificates
                </Link>
                <Link 
                  href="/dashboard/profile" 
                  className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Profile
                </Link>
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      
      {/* Simple Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} MentorNet. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 