'use client'
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { NETWORKS } from '@/lib/networks';
import { useSendTransactionWithGas } from '../hooks/useSendTransaction';
import toast from 'react-hot-toast';

/**
 * Form component for sending a transaction with network selection.
 */
export default function SendTransactionForm() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [networkKey, setNetworkKey] = useState<keyof typeof NETWORKS>('ethereum');

  const { isConnected } = useAccount();
  const provider = NETWORKS[networkKey];
  const tx = useSendTransactionWithGas(provider.chainId);

  const handleEstimate = async () => {
    try {
      await tx.estimate(to as `0x${string}`, amount);
    } catch (err) {
      toast.error('Gas estimation failed');
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = await tx.send(to as `0x${string}`, amount);
      toast.success(
        <a href={`${provider.explorer}${hash}`} target="_blank" rel="noreferrer" className="underline">
          Transaction sent
        </a>
      );
    } catch (err) {
      toast.error('Transaction failed');
    }
  };

  return (
    <form onSubmit={handleSend} className="space-y-4 text-sm text-white bg-black/30 p-5 rounded-xl border border-white/10">
      <div>
        <label className="block mb-1 text-gray-300">Network</label>
        <select value={networkKey} onChange={(e) => setNetworkKey(e.target.value as keyof typeof NETWORKS)} className="w-full bg-gray-900 border border-white/10 p-2 rounded">
          {Object.entries(NETWORKS).map(([key, net]) => (
            <option key={key} value={key}>{net.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-gray-300">To</label>
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="0x..." className="w-full bg-gray-900 border border-white/10 p-2 rounded" />
      </div>
      <div>
        <label className="block mb-1 text-gray-300">Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="any" className="w-full bg-gray-900 border border-white/10 p-2 rounded" />
      </div>
      {tx.isPending || tx.isConfirming ? (
        <p className="text-center">Processing...</p>
      ) : (
        <button type="submit" disabled={!isConnected} className="w-full bg-indigo-500 py-2 rounded font-semibold hover:bg-indigo-400">
          Send
        </button>
      )}
      {tx.hash && (
        <p className="text-xs text-center text-green-400">
          Hash: <a href={`${provider.explorer}${tx.hash}`} className="underline" target="_blank" rel="noreferrer">{tx.hash.slice(0, 10)}...</a>
        </p>
      )}
    </form>
  );
}
