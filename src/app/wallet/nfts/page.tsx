'use client';

import { useAccount } from 'wagmi';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';
import NftGallery from '@/features/wallet/components/NftGallery';

export default function WalletNftsPage() {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) {
    return (
      <p className="text-white text-center mt-10">
        Connect your wallet to view NFTs.
      </p>
    );
  }

  return (
    <PageLayout>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className="flex items-center border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            My NFTs
          </h1>
        </header>

        <section className="mt-10">
          <NftGallery address={address} />
        </section>
      </motion.div>
    </PageLayout>
  );
}
