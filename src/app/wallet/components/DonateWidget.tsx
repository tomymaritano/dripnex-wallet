'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CryptoType } from './cryptoTypes'
import CryptoSelector from './CryptoSelector'
import AmountInput from './AmountInput'
import SendDonation from './SendDonation'
import { WALLETS, EXPLORERS } from '@/lib/donation'


interface DonateWidgetProps {
  defaultCrypto?: CryptoType;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

/**
 * Complete donation widget combining selectors and send button.
 *
 * @param props.defaultCrypto Default crypto to show.
 * @param props.title Title shown at top.
 * @param props.description Optional description text.
 * @param props.showHeader Whether to display header section.
 */
export default function DonateWidget({
  defaultCrypto = 'ETH',
  title = 'Support Dripnex',
  description = 'If you enjoy the product, consider donating to keep it independent and evolving.',
  showHeader = true,
}: DonateWidgetProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>(defaultCrypto);
  const [amount, setAmount] = useState('0.01');

  const address = WALLETS[selectedCrypto];
  const explorerBase = EXPLORERS[selectedCrypto];

  return (
    <section className="w-full max-w-full rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur bg-black/30 space-y-8 text-white">
      {showHeader && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-gray-400">{description}</p>
        </motion.div>
      )}

      <CryptoSelector
        selectedCrypto={selectedCrypto}
        setSelectedCrypto={setSelectedCrypto}
        address={address}
      />

      <AmountInput selectedCrypto={selectedCrypto} amount={amount} setAmount={setAmount} />

      <SendDonation
        selectedCrypto={selectedCrypto}
        amount={amount}
        address={address}
        explorerBase={explorerBase}
      />

      <p className="text-center text-xs text-gray-500">
        Donations help us stay ad-free, independent, and focused on community-driven features.
      </p>
    </section>
  );
}