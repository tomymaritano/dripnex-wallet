'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaRegCopy } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { CryptoType, cryptoOptions } from './cryptoTypes';

interface Props {
  selectedCrypto: CryptoType;
  setSelectedCrypto: (val: CryptoType) => void;
  address: string;
}

/**
 * Selector for choosing which cryptocurrency to donate with.
 *
 * @param props.selectedCrypto Current crypto option.
 * @param props.setSelectedCrypto Setter for selection.
 * @param props.address Wallet address to display.
 */
export default function CryptoSelector({
  selectedCrypto,
  setSelectedCrypto,
  address,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
          Select Crypto
        </label>
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
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
          <p className="text-xs text-gray-500 mb-2">Scan QR to donate with {selectedCrypto}:</p>
          <div className="w-full flex justify-center">
            <QRCode value={address} size={128} bgColor="#000000" fgColor="#ffffff" />
          </div>
        </motion.div>
      )}
    </>
  );
}
