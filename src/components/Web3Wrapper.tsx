// src/components/Web3Wrapper.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getWalletConfig } from '@/lib/wallet';

const config = getWalletConfig();

const queryClient = new QueryClient();

/**
 * Setup Wagmi, React Query and RainbowKit providers.
 *
 * @param props.children Components requiring Web3 context.
 */
export function Web3Wrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
