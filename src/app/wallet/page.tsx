'use client';

import WalletConnectButton from '@/components/WalletButton';
import WalletDashboard from './WalletDashboard';
import { ConnectButton, WalletButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="mb-8 flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wallet Center</h1>
            <p className="text-gray-400 text-sm">Manage your connected wallet and view on-chain info</p>
          </div>
          <WalletConnectButton />
        </header>

        <section>
          <WalletDashboard />
        </section>

        <footer className="mt-10 text-sm text-gray-500 text-center">
          <Link href="/" className="hover:text-teal-400 transition">
            ← Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}