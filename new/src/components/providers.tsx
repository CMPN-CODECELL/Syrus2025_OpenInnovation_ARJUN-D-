"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { PortfolioProvider } from "@/lib/contexts/portfolio-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </ThemeProvider>
    </AuthProvider>
  );
} 