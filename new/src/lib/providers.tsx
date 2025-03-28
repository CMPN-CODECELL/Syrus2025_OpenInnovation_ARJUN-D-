"use client";

import { ReactNode } from "react";
import { WagmiConfig, createConfig, http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";

// Create a custom context for PortfolioProvider
const PortfolioContext = {
  portfolio: {
    skills: [],
    projects: [],
    certificates: [],
    mentorshipSessions: []
  },
  isLoading: false,
  isVerifying: false,
  walletConnected: false,
  verifySkill: async () => {},
  verifyProject: async () => {},
  verifyCertificate: async () => {},
  verifyMentorshipSession: async () => {},
  connectToWallet: async () => {}
};

// Create a mock PortfolioProvider that doesn't throw errors
export function PortfolioProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Client for React Query
const queryClient = new QueryClient();

// Set up wallet connectors for Rainbow Kit
const projectId = "42e9d1562b652f565b4ab6f430e31bfb"; // Replace with your WalletConnect Project ID
const appName = "MentorNet";

const { connectors } = getDefaultWallets({
  appName: appName,
  projectId: projectId,
  chains: [polygonAmoy],
});

// Create Wagmi config
const config = createConfig({
  autoConnect: true,
  connectors,
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          modalSize="compact"
          theme={lightTheme()}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PortfolioProvider>
              {children}
            </PortfolioProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 