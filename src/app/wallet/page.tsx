'use client';

import WalletDashboard from './WalletDashboard';
import PageLayout from '@/components/PageLayout';

export default function WalletPage() {
  return (
    <PageLayout>
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
          </header>

          {/* Dashboard Section */}
          <section className="mt-10">
            <WalletDashboard />
          </section>
        </div>
      </main>
    </PageLayout>

  );
}