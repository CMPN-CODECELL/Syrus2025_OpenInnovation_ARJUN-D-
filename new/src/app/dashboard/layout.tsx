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
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl flex items-center">
              <span className="text-emerald-500">Mentor</span>
              <span>Net</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <div className="flex items-center justify-center h-full w-full bg-emerald-500 text-white">
                      {user && user.firstName 
                        ? user.firstName.charAt(0).toUpperCase()
                        : "U"}
              </div>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user ? `${user.firstName} ${user.lastName}` : "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user ? user.email : "user@example.com"}
                    </p>
            </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => logout()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            </div>
      </header>
      <div className="flex-1">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
          <aside className="md:col-span-3 lg:col-span-2">
            <div className="sticky top-24">
              <WalletWidget />
              <div className="p-4 bg-slate-50 rounded-lg mb-6">
                <h3 className="font-medium text-sm mb-2">Quick Links</h3>
                <nav className="flex flex-col space-y-1">
                  <Link href="/dashboard/learn" className="text-sm text-gray-700 py-1 hover:text-emerald-600">
                    Learning Paths
            </Link>
                  <Link href="/dashboard/ai-mentor" className="text-sm text-gray-700 py-1 hover:text-emerald-600">
                    Ask AI Mentor
            </Link>
                  <Link href="/dashboard/projects" className="text-sm text-gray-700 py-1 hover:text-emerald-600">
                    My Projects
                  </Link>
                  <Link href="/dashboard/mentors" className="text-sm text-gray-700 py-1 hover:text-emerald-600">
                    Find Mentors
                  </Link>
                </nav>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-blue-700 text-xs">
                <p className="font-medium mb-1">⚠️ Testnet Mode</p>
                <p>This app is using Polygon Amoy testnet. No real assets are involved.</p>
              </div>
            </div>
          </aside>
          <main className="md:col-span-9 lg:col-span-10">{children}</main>
                  </div>
                </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2023 MentorNet. All rights reserved.
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