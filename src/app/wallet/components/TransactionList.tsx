'use client';
import { FaArrowUp, FaArrowDown, FaRegCopy } from 'react-icons/fa';
import type { ParsedTransaction } from '@/lib/fetchTransactions';

type Props = {
  transactions: ParsedTransaction[];
  currentAddress: `0x${string}`;
};

export default function TransactionList({ transactions, currentAddress }: Props) {

  const iconClass = 'w-4 h-4 text-gray-400 hover:text-white transition';

  if (transactions.length === 0) {
    return <p className="text-gray-500 text-sm">No recent transactions.</p>;
  }

  return (
    <ul className="space-y-3 text-sm text-gray-300">
      {transactions.slice(0, 5).map((tx) => (
        <li
          key={tx.hash}
          className="flex justify-between items-center border border-white/5 px-4 py-3 rounded-lg bg-white/5"
        >
          <div className="flex items-center gap-2">
            {tx.from.toLowerCase() === currentAddress.toLowerCase() ? (
              <FaArrowUp className="text-red-400 w-4 h-4" />
            ) : (
              <FaArrowDown className="text-green-400 w-4 h-4" />
            )}
            <div>
              <p className="font-medium truncate max-w-[180px]">{tx.value} ETH</p>
              <p className="text-xs text-gray-400">
                {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(tx.hash)}
            title="Copy Tx Hash"
          >
            <FaRegCopy className={iconClass} />
          </button>
        </li>
      ))}
    </ul>
  );
}