"use client";

import Link from "next/link";
import { MainNav } from "@/components/navigation/main-nav";
import { ModeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-6">
            MentorNet
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
} 