'use client';

import { type ReactNode, useEffect, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { getWalletConfig } from '@/lib/wallet';

const config = getWalletConfig();

export default function Web3Wrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={config.chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

