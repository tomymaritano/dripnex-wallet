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
  const iconClass = 'w-4 h-4 text-gray-400 hover:text-white transition';
  const [currency, setCurrency] = useState('USD');
  const [copied, setCopied] = useState(false);
  const fiatValue = useFiatValue(Number(balance), currency);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) return <p className="text-gray-400 text-sm animate-pulse">Cargando perfil...</p>;
  if (!profile) return <p className="text-sm text-red-500">No se encontró ningún perfil.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-md space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-300 flex items-center justify-center text-black font-bold text-xl shadow-inner">
          {profile.username?.charAt(0).toUpperCase() || 'A'}
        </div>

        <div className="flex-1">
          <h2 className="text-white text-lg font-semibold">
            {profile.username || 'Anonymous'}
          </h2>
          <p className="text-xs text-gray-400">
            Joined: {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>

        <motion.button
          onClick={onEditClick}
          whileTap={{ scale: 0.95 }}
          title="Editar perfil"
          className="p-2 rounded-md hover:bg-white/10 transition"
        >
          <FaEdit className={iconClass} />
        </motion.button>
      </div>

      <hr className="border-white/10" />

      {/* Info */}
      <div className="space-y-4 text-sm text-gray-300">
        {/* Dirección */}
        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1 tracking-wider">
            Address
          </span>
          <div className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
            <span className="break-all font-mono text-xs text-white/90">{address}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="hover:text-white"
              title="Copiar dirección"
            >
              {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy className={iconClass} />}
            </motion.button>
          </div>
        </div>

        {/* Chain ID */}
        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1 tracking-wider">
            Chain ID
          </span>
          <p className="border border-white/10 rounded-md px-3 py-2 text-white/80 text-xs">
            {chainId ?? 'N/A'}
          </p>
        </div>

        {/* Balance + Valor estimado */}
        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1 tracking-wide">
            Balance
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-md px-4 py-3 border border-white/10">
            <div className="flex items-center gap-2 text-white">
              <span className="text-md font-bold">{balance ?? '0'} ETH</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-400/30 rounded-full text-xs font-medium shadow-inner backdrop-blur-sm"
              >
                ≈ {fiatValue?.toLocaleString(undefined, {
                  style: 'currency',
                  currency,
                  maximumFractionDigits: 2,
                }) ?? '...'}
              </motion.span>
            </div>

            {/* Select currency */}
            <div className="relative flex items-center text-sm text-white">
              <label htmlFor="currency" className="sr-only">Select fiat currency</label>
              <select
                id="currency"
                aria-label="Select fiat currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="appearance-none bg-black/30 border border-white/10 rounded-md px-3 py-1.5 pr-8 text-xs font-semibold tracking-wide text-white/90 hover:bg-black/40 focus:outline-none transition-all"
              >
                {Object.entries(FIAT_CURRENCIES).map(([code, flag]) => (
                  <option key={code} value={code}>
                    {flag} {code.toUpperCase()}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 pointer-events-none text-white/40 text-xs">▼</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}