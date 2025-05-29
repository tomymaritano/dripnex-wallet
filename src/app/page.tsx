// src/app/page.tsx
'use client';

import Web3Wrapper from '@/components/Web3Wrapper';
import WalletButton from '@/components/WalletButton';

export default function Home() {
  return (
    <Web3Wrapper>
      <main className="flex min-h-screen items-center justify-center bg-white">
        <WalletButton />
      </main>
    </Web3Wrapper>
  );
}