'use client';
import { useState } from 'react';
import { FaEdit, FaRegCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useFiatValue } from '@/app/hooks/useFiatValue';
import { FIAT_CURRENCIES } from '@/lib/constants/fiatCurrencies';

type Props = {
  address: string;
  chainId?: number;
  balance?: string;
  profile: { username: string; created_at: string } | null;
  loading: boolean;
  onEditClick: () => void;
};

export default function ProfileCard({
  address,
  chainId,
  balance,
  profile,
  loading,
  onEditClick,
}: Props) {
  const [currency, setCurrency] = useState('USD');
  const [copied, setCopied] = useState(false);
  const fiatValue = useFiatValue(Number(balance), currency);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading)
    return <p className="text-gray-400 text-sm animate-pulse">Cargando perfil...</p>;

  if (!profile)
    return <p className="text-sm text-red-500">No se encontró ningún perfil.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl p-6 border border-white/10 shadow-lg backdrop-blur bg-black/30 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.6 } }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-blue-300 shadow-inner text-black font-bold text-xl flex items-center justify-center border-2 border-white/20"
        >
          {profile.username?.charAt(0).toUpperCase() || 'A'}
        </motion.div>

        <div className="flex-1">
          <h2 className="text-white text-lg font-semibold leading-none">
            {profile.username || 'Anonymous'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Joined on {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>

        <motion.button
          onClick={onEditClick}
          whileTap={{ scale: 0.9 }}
          title="Editar perfil"
          className="p-2 rounded-md hover:bg-white/10 transition"
        >
          <FaEdit className="w-4 h-4 text-gray-400 hover:text-white transition" />
        </motion.button>
      </div>

      <hr className="border-white/10" />

      {/* Info */}
      <div className="space-y-5 text-sm text-gray-300">
        {/* Balance Destacado */}
        <div className="relative border border-indigo-500/30 bg-indigo-900/10 rounded-xl p-5 shadow-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Balance
              </span>
              <span className="text-lg font-extrabold text-white drop-shadow-sm">
                {balance ?? '0'} ETH
              </span>
              <span className="text-sm text-indigo-300 font-medium mt-1">
                ≈{' '}
                {fiatValue?.toLocaleString(undefined, {
                  style: 'currency',
                  currency,
                  maximumFractionDigits: 2,
                }) ?? '...'}
              </span>
            </div>

            <div className="relative text-white text-xs">
              <label htmlFor="currency" className="sr-only">
                Fiat currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-black/30 hover:bg-black/40 border border-indigo-400/30 px-3 py-2 rounded-md font-semibold transition-all focus:outline-none"
              >
                {Object.entries(FIAT_CURRENCIES).map(([code, flag]) => (
                  <option key={code} value={code}>
                    {flag} {code}
                  </option>
                ))}
              </select>
              <span className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
                ▼
              </span>
            </div>
          </motion.div>
        </div>

        {/* Address */}
        <div>
          <label className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
            Wallet Address
          </label>
          <div className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-md bg-white/5 text-white font-mono text-xs">
            <span className="break-all flex-1">{address}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              title="Copiar"
              className="hover:text-white"
            >
              {copied ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaRegCopy className="w-4 h-4 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Chain ID */}
        <div>
          <label className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
            Chain ID
          </label>
          <p className="px-3 py-2 border border-white/10 rounded-md bg-white/5 text-white text-xs">
            {chainId ?? 'N/A'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}