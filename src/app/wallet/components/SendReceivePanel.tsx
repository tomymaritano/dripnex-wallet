'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { useSendEth } from '@/app/hooks/useSendETH';

type Props = {
  address: string;
};

export default function SendReceivePanel({ address }: Props) {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [amountCopied, setAmountCopied] = useState<string | null>(null);

  const { send, isPending, isConfirming, txHash } = useSendEth();

  const isValidAddress = recipient.startsWith('0x') && recipient.length === 42;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    if (txHash) {
      setRecipient('');
      setAmount('');
    }
  }, [txHash]);

  const suggestedAmounts = ['0.01', '0.05', '0.1', '0.5', '1'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-white/10 py-4 px-4 backdrop-blur bg-black/20 shadow-md"
    >
      <div className="flex border-b border-white/10 mb-4">
        {['send', 'receive'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab as 'send' | 'receive')}
            aria-pressed={activeTab === tab}
            aria-label={`Switch to ${tab} tab`}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? 'text-white border-b-2 border-indigo-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'send' ? 'Send' : 'Receive'}
          </button>
        ))}
      </div>

      {activeTab === 'send' && (
        <form onSubmit={handleSend} className="space-y-4 text-sm text-white">
          <div>
            <label className="block text-gray-400 mb-1">Recipient Address</label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 mb-1 block">Amount (ETH)</label>
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
                  {amountCopied === val ? 'Copied!' : `${val} ETH`}
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
          </div>

          <button
            type="submit"
            disabled={!isValidAddress || isPending || isConfirming}
            className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-black rounded font-semibold transition disabled:opacity-50"
          >
            {isPending ? 'Sending...' : isConfirming ? 'Confirming...' : 'Confirm Send'}
          </button>

          {txHash && (
            <p className="text-center text-xs text-green-400 mt-2">
              Sent {amount} ETH to {recipient.slice(0, 6)}... →{' '}
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View on Etherscan
              </a>
            </p>
          )}
        </form>
      )}

      {activeTab === 'receive' && (
        <div className="text-sm text-gray-300 text-center">
          <p className="text-gray-400 mb-3">Scan the QR or copy your address:</p>

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
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 text-indigo-400 hover:underline mt-2 mx-auto"
          >
            {copied ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Address'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}