import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// Configure chains & providers
export const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygon, optimism, arbitrum],
  [publicProvider()]
);

// Set up wallet connectors
const { connectors } = getDefaultWallets({
  appName: "MentorNet",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

// Create Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
}); 