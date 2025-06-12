'use client';
import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaRegCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { ParsedTransaction } from '@/lib/fetchTransactions';

type Props = {
  transactions: ParsedTransaction[];
  currentAddress: `0x${string}`;
};

/**
 * Displays a list of transactions with copy-to-clipboard helpers.
 *
 * @param props.transactions Parsed transaction array.
 * @param props.currentAddress Address used to detect incoming/outgoing.
 */
export default function TransactionList({ transactions, currentAddress }: Props) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  const sortedTxs = [...transactions].sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp));
  const visibleTxs = showAll ? sortedTxs : sortedTxs.slice(0, 5);

  if (transactions.length === 0) {
    return <p className="text-gray-500 text-sm text-center">No recent transactions.</p>;
  }

  return (
    <>
      <motion.ul
        role="list"
        aria-label="Recent transactions"
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
        {visibleTxs.map((tx) => {
          const isSent = tx.from.toLowerCase() === currentAddress.toLowerCase();
          const isCopied = copiedHash === tx.hash;
          const icon = isSent
            ? <FaArrowUp className="text-red-400 w-4 h-4" />
            : <FaArrowDown className="text-green-400 w-4 h-4" />;

          return (
            <motion.li
              key={tx.hash}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="flex justify-between items-center border border-white/5 px-4 py-3 rounded-lg bg-black/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {icon}
                <div className="max-w-full sm:max-w-[180px]">
                  <p className="font-semibold truncate">{tx.value} {tx.token ?? 'ETH'}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleCopy(tx.hash)}
                aria-label="Copy transaction hash"
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
                    <span className="hidden md:inline">{tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}</span>
                    <span className="md:hidden">Hash</span>
                  </>
                )}
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>

      {transactions.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-indigo-400 text-xs hover:underline transition"
          >
            {showAll ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
    </>
  );
}