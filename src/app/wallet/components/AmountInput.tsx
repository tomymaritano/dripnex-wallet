'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CryptoType } from './cryptoTypes';

const suggestedAmounts = ['0.01', '0.05', '0.1', '0.5', '1'];

interface Props {
  selectedCrypto: CryptoType;
  amount: string;
  setAmount: (val: string) => void;
}

export default function AmountInput({ selectedCrypto, amount, setAmount }: Props) {
  const [amountCopied, setAmountCopied] = useState<string | null>(null);

  const handleCopyAmount = (val: string) => {
    navigator.clipboard.writeText(val);
    setAmountCopied(val);
    setTimeout(() => setAmountCopied(null), 1500);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <label className="text-xs uppercase tracking-wide text-gray-500">Suggested Amounts</label>
        <div className="flex flex-wrap gap-2">
          {suggestedAmounts.map((val) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              key={val}
              onClick={() => {
                setAmount(val);
                handleCopyAmount(val);
              }}
              className={`px-4 py-1.5 rounded-full border ${
                val === amount ? 'bg-indigo-500 text-white' : 'bg-indigo-500/20 text-indigo-300'
              } border-indigo-400/30 text-xs font-medium backdrop-blur transition-all`}
            >
              {val} {selectedCrypto}
            </motion.button>
          ))}
        </div>
        {amountCopied && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-green-400 text-center mt-1"
          >
            Copied {amountCopied} to clipboard
          </motion.p>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <label className="text-xs uppercase tracking-wide text-gray-500">Custom Amount</label>
        <input
          type="number"
          min="0.001"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-black/20 border border-white/10 rounded-md text-white text-sm focus:outline-none"
          placeholder={`Enter amount in ${selectedCrypto}`}
        />
      </motion.div>
    </>
  );
}
