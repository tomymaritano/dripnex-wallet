'use client';
import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaRegCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { ParsedTransaction } from '@/lib/fetchTransactions';

type Props = {
  transactions: ParsedTransaction[];
  currentAddress: `0x${string}`;
};

export default function TransactionList({ transactions, currentAddress }: Props) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  if (transactions.length === 0) {
    return <p className="text-gray-500 text-sm text-center">No recent transactions.</p>;
  }

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="space-y-3 text-sm text-gray-300"
    >
      {transactions.slice(0, 5).map((tx) => {
        const isSent = tx.from.toLowerCase() === currentAddress.toLowerCase();
        const isCopied = copiedHash === tx.hash;
        const icon = isSent ? <FaArrowUp className="text-red-400 w-4 h-4" /> : <FaArrowDown className="text-green-400 w-4 h-4" />;

        return (
          <motion.li
            key={tx.hash}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex justify-between items-center border border-white/5 px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {icon}
              <div className="max-w-[180px]">
                <p className="font-semibold truncate">{tx.value} {tx.token ?? 'ETH'}</p>
                <p className="text-xs text-gray-400 truncate">
                  {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy(tx.hash)}
              title="Copy Tx Hash"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition"
            >
              {isCopied ? (
                <>
                  <FaCheck className="text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <FaRegCopy />
                  Hash
                </>
              )}
            </motion.button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}