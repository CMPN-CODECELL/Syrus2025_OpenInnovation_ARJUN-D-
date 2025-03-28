'use client';
import React, { Children } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  polygonAmoy,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '42e9d1562b652f565b4ab6f430e31bfb',
    chains: [mainnet ,polygonAmoy],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

    const queryClient = new QueryClient();
function App({children}:{children: React.ReactNode}) {

    

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider modalSize='compact'>
        {children}
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  )
}

export default App
