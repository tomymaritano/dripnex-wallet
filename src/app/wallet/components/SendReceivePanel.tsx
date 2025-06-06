'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { NETWORKS } from '@/lib/networks';
import { useSendTransactionWithGas } from '@/app/hooks/useSendTransaction';

type Props = {
  address: string;
};

/**
 * Panel for sending ETH or displaying wallet QR for receiving.
 *
 * @param props.address Wallet address used for receive tab.
 */
export default function SendReceivePanel({ address }: Props) {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [networkKey, setNetworkKey] = useState<keyof typeof NETWORKS>('ethereum');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [amountCopied, setAmountCopied] = useState<string | null>(null);

  const provider = NETWORKS[networkKey];
  const { send, estimate, isPending, isConfirming, hash: txHash } =
    useSendTransactionWithGas(provider.chainId);
  const [gas, setGas] = useState<bigint | null>(null);

  const isValidAddress = recipient.startsWith('0x') && recipient.length === 42;
  const suggestedAmounts = ['0.01', '0.05', '0.1', '0.5', '1'];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 1500);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await send(recipient as `0x${string}`, amount);
    } catch (err) {
      console.error('Transaction failed', err);
    }
  };

  useEffect(() => {
    if (isValidAddress && amount) {
      estimate(recipient as `0x${string}`, amount)
        .then(setGas)
        .catch(() => setGas(null));
    } else {
      setGas(null);
    }
  }, [recipient, amount, isValidAddress, estimate]);

  useEffect(() => {
    if (txHash) {
      setRecipient('');
      setAmount('');
    }
  }, [txHash]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-white/10 py-6 px-5 backdrop-blur bg-black/30 shadow-lg text-white space-y-6"
    >
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {['send', 'receive'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab as 'send' | 'receive')}
            aria-pressed={activeTab === tab}
            className={`px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? 'text-white border-b-2 border-indigo-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'send' ? 'Send' : 'Receive'}
          </button>
        ))}
      </div>

      {/* Send */}
      {activeTab === 'send' && (
        <form onSubmit={handleSend} className="space-y-5 text-sm">
          <div>
            <label className="block text-gray-400 mb-1">Network</label>
            <select
              value={networkKey}
              onChange={(e) => setNetworkKey(e.target.value as keyof typeof NETWORKS)}
              className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white"
            >
              {Object.entries(NETWORKS).map(([k, n]) => (
                <option key={k} value={k}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>
          {/* Recipient */}
          <div>
            <label className="block text-gray-400 mb-1">Recipient Address</label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white placeholder:text-gray-500"
            />
          </div>

          {/* Suggested Amounts */}
          <div className="space-y-2">
            <label className="text-gray-400 mb-1 block">Amount</label>
            <div className="flex flex-wrap gap-2">
              {suggestedAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setAmount(val);
                    setAmountCopied(val);
                    navigator.clipboard.writeText(val);
                    setTimeout(() => setAmountCopied(null), 1000);
                  }}
                  className={`px-3 py-1.5 rounded-full border ${
                    val === amount
                      ? 'bg-indigo-500 text-white'
                      : 'bg-indigo-500/20 text-indigo-300'
                  } border-indigo-400/30 text-xs font-medium backdrop-blur transition`}
                >
                  {amountCopied === val ? 'Copied!' : `${val}`}
                </button>
              ))}
            </div>

          <input
            type="number"
            step="any"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded text-white placeholder:text-gray-500"
          />
          {gas && (
            <p className="text-xs text-gray-400">Estimated gas: {gas.toString()}</p>
          )}
        </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValidAddress || isPending || isConfirming}
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-black rounded font-semibold transition disabled:opacity-50"
          >
            {isPending ? 'Sending...' : isConfirming ? 'Confirming...' : 'Send'}
          </button>

          {/* Result */}
          {txHash && (
            <p className="text-center text-xs text-green-400 mt-2">
              ✅ Sent {amount} to {recipient.slice(0, 6)}...{' '}
              <a
                href={`${provider.explorer}${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View on Explorer
              </a>
            </p>
          )}
        </form>
      )}

      {/* Receive */}
      {activeTab === 'receive' && (
        <div className="text-sm text-gray-300 text-center space-y-3">
          <p className="text-gray-400">Scan the QR or copy your wallet address:</p>

          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
            alt="QR Code"
            width={150}
            height={150}
            className="mx-auto"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyAddress}
            className="flex items-center justify-center gap-2 text-indigo-400 hover:underline mx-auto"
          >
            {copiedAddress ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
            {copiedAddress ? 'Copied!' : 'Copy Address'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}