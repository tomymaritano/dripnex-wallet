'use client';

import '../globals.css';
import { useState } from 'react';
import { FaCheck, FaRegCopy, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { parseEther } from 'viem';
import { useAccount, useSendTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import QRCode from 'react-qr-code';
import PageLayout from '@/components/PageLayout'
import { CryptoLogos } from '../wallet/components/CryptoLogos'
import { env } from '@/lib/env'

const WALLETS: Record<string, string> = {
  ETH: env.NEXT_PUBLIC_ETH_WALLET,
  BTC: env.NEXT_PUBLIC_BITCOIN_WALLET,
  SOL: env.NEXT_PUBLIC_SOLANA_WALLET,
  LTC: env.NEXT_PUBLIC_LITECOIN_WALLET,
  DOGE: env.NEXT_PUBLIC_DOGECOIN_WALLET,
}

const explorers: Record<string, string> = {
  ETH: 'https://etherscan.io/tx/',
  BTC: 'https://www.blockchain.com/btc/tx/',
  SOL: 'https://solscan.io/tx/',
  LTC: 'https://blockchair.com/litecoin/transaction/',
  DOGE: 'https://blockchair.com/dogecoin/transaction/',
};

const suggestedAmounts = ['0.01', '0.05', '0.1', '0.5', '1'];
const cryptoOptions = ['ETH', 'BTC', 'SOL', 'LTC', 'DOGE'] as const;
type CryptoType = typeof cryptoOptions[number];

export default function DonatePage() {
  const [amount, setAmount] = useState('0.01');
  const [copied, setCopied] = useState(false);
  const [amountCopied, setAmountCopied] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>('ETH');

  const { isConnected } = useAccount();
  const {
    sendTransaction,
    data: txHash,
    isPending,
    isSuccess,
    isError,
  } = useSendTransaction();

  const address = WALLETS[selectedCrypto];
  const explorerBase = explorers[selectedCrypto];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCopyAmount = (val: string) => {
    navigator.clipboard.writeText(val);
    setAmountCopied(val);
    setTimeout(() => setAmountCopied(null), 1500);
  };

  const handleSend = () => {
    if (selectedCrypto === 'ETH') {
      sendTransaction({
        to: address as `0x${string}`,
        value: parseEther(amount),
      });
    }
  };

  return (
    <PageLayout>
      <section className="min-h-screen flex items-center justify-center px-4 py-16 text-white">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="w-full max-w-full rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur bg-black/30 space-y-8"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Support Dripnex</h1>
            <p className="text-sm text-gray-400">
              If you enjoy the product, consider donating to keep it independent and evolving.
            </p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">Select Crypto</label>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value as CryptoType)}
              className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/10 text-white text-sm"
            >
              {cryptoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 mt-2 text-sm text-white">
              <CryptoLogos symbol={selectedCrypto} />
              <span>{selectedCrypto}</span>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <label className="text-xs uppercase tracking-wide text-gray-500">Wallet Address</label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg font-mono text-xs">
              <span className="break-all flex-1">{address}</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleCopyAddress}>
                {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy className="text-gray-400 w-4 h-4" />}
              </motion.button>
            </div>
            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-green-400 mt-1"
                >
                  Copied to clipboard
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {selectedCrypto !== 'ETH' && (
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="pt-4">
              <p className="text-xs text-gray-500 mb-2">Scan QR to donate with {selectedCrypto}:</p>
              <div className="w-full flex justify-center">
                <QRCode value={address} size={128} bgColor="#000000" fgColor="#ffffff" />
              </div>
            </motion.div>
          )}

          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
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

          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
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

          {selectedCrypto === 'ETH' ? (
            isConnected ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={isPending}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-md transition font-semibold flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="animate-spin" /> Sending...
                  </>
                ) : (
                  `Send ${amount} ETH`
                )}
              </motion.button>
            ) : (
              <ConnectButton />
            )
          ) : (
            <p className="text-xs text-center text-gray-400">
              Send manually to the above {selectedCrypto} address using your wallet.
            </p>
          )}

          {isSuccess && txHash && selectedCrypto === 'ETH' && (
            <p className="text-green-400 text-center text-sm">
              ✅ Donation sent!{' '}
              <a
                href={`${explorerBase}${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                View on Explorer
              </a>
            </p>
          )}

          {isError && selectedCrypto === 'ETH' && (
            <p className="text-red-400 text-center text-sm">❌ Something went wrong. Try again.</p>
          )}

          <p className="text-center text-xs text-gray-500">
            Donations help us stay ad-free, independent, and focused on community-driven features.
          </p>
        </motion.div>
      </section>
    </PageLayout>
  );
}