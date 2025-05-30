'use client';

import WalletConnectButton from '@/components/WalletButton';
import WalletDashboard from './WalletDashboard';
import Link from 'next/link';

export default function WalletPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-850 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Wallet Center
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Manage your connected wallet and view on-chain activity.
            </p>
          </div>
          <div className="self-start sm:self-auto">
            <WalletConnectButton />
          </div>
        </header>

        {/* Dashboard Section */}
        <section className="mt-10">
          <WalletDashboard />
        </section>

        {/* Footer */}
        <footer className="mt-12 text-sm text-gray-500 text-center">
          <Link href="/" className="hover:text-teal-400 transition">
            ← Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}