'use client';

import '../globals.css';
import PageLayout from '@/components/PageLayout';
import { useState, useEffect } from 'react';
import { mainnet, polygon, bsc, arbitrum, optimism } from 'wagmi/chains';
import { useAccount, useWalletClient, usePublicClient, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { BLOCK_EXPLORERS } from '@/lib/constants/blockExplorers';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const networks = [
  { label: 'Ethereum', chain: mainnet, symbol: 'ETH' },
  { label: 'Polygon', chain: polygon, symbol: 'MATIC' },
  { label: 'BSC', chain: bsc, symbol: 'BNB' },
  { label: 'Arbitrum', chain: arbitrum, symbol: 'ETH' },
  { label: 'Optimism', chain: optimism, symbol: 'ETH' },
];

function SendTransactionForm() {
  const { address } = useAccount();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState(networks[0]);
  const { data: walletClient } = useWalletClient({ chainId: network.chain.id });
  const publicClient = usePublicClient({ chainId: network.chain.id });

  const [fee, setFee] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isSuccess, isError } = useWaitForTransactionReceipt({
    chainId: network.chain.id,
    hash: txHash!,
    query: { enabled: !!txHash },
  });

  // Estimate gas fee whenever inputs change
  useEffect(() => {
    if (!address || !to || !amount) {
      setFee(null);
      return;
    }
    let cancelled = false;
    async function estimate() {
      try {
        const gas = await publicClient.estimateGas({
          account: address,
          to: to as `0x${string}`,
          value: parseEther(amount),
        });
        const gasPrice = await publicClient.getGasPrice();
        const total = gas * gasPrice;
        if (!cancelled) setFee(formatEther(total));
      } catch {
        if (!cancelled) setFee(null);
      }
    }
    estimate();
    return () => {
      cancelled = true;
    };
  }, [address, to, amount, network, publicClient]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletClient || !address) {
      setError('Wallet not connected');
      return;
    }
    try {
      setError(null);
      setIsSending(true);
      const hash = await walletClient.sendTransaction({
        account: address,
        to: to as `0x${string}`,
        value: parseEther(amount),
      });
      setTxHash(hash);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Transaction failed';
      setError(msg);
    } finally {
      setIsSending(false);
    }
  };

  const explorerBase = BLOCK_EXPLORERS[network.chain.id];

  return (
    <form onSubmit={handleSend} className="space-y-6 text-white">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Network</label>
        <select
          value={network.chain.id}
          onChange={(e) => {
            const selected = networks.find((n) => n.chain.id === Number(e.target.value));
            if (selected) setNetwork(selected);
          }}
          className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md"
        >
          {networks.map((n) => (
            <option key={n.chain.id} value={n.chain.id}>
              {n.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">To Address</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
          className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Amount ({network.symbol})</label>
        <input
          type="number"
          step="any"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md"
        />
      </div>

      {fee && (
        <p className="text-xs text-gray-400">Estimated Fee: {parseFloat(fee).toFixed(6)} {network.symbol}</p>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isSending}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2"
      >
        {isSending ? (
          <>
            <FaSpinner className="animate-spin" /> Sending...
          </>
        ) : (
          'Send Transaction'
        )}
      </motion.button>

      {isSuccess && txHash && (
        <p className="text-green-400 text-sm text-center">
          ✅ Transaction sent!{' '}
          <a href={`${explorerBase}${txHash}`} target="_blank" rel="noopener noreferrer" className="underline">
            View on Explorer
          </a>
        </p>
      )}

      {isError && error && (
        <p className="text-red-400 text-sm text-center">❌ {error}</p>
      )}
    </form>
  );
}

export default function SendPage() {
  return (
    <PageLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="py-12 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Send Transaction</h1>
        <SendTransactionForm />
      </motion.div>
    </PageLayout>
  );
}
