'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

/**
 * Form used in early prototypes to send ETH manually.
 */
export default function SendETHForm() {
  const { isConnected } = useAccount();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTxHash(null);

    if (!to || !amount) return;

    try {
      setIsSending(true);
      const hash = await sendTransactionAsync({
        to: to as `0x${string}`, // 👈 cast válido
        value: parseEther(amount),
      });
      setTxHash(hash);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setIsSending(false);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="mt-8 p-6 bg-black/30 border border-white/10 rounded-xl text-white">
      <h3 className="text-lg font-semibold mb-4">Send ETH</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-300">Recipient address</label>
          <input
            type="text"
            placeholder="0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-300">Amount in ETH</label>
          <input
            type="number"
            step="0.0001"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:border-teal-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="w-full bg-teal-500/10 border border-teal-400 text-teal-300 rounded-md py-2 hover:bg-teal-400/20 transition"
        >
          {isSending ? 'Sending...' : 'Send ETH'}
        </button>
        {txHash && (
          <p className="text-green-400 text-sm">
            Transaction sent: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline">{txHash}</a>
          </p>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
}