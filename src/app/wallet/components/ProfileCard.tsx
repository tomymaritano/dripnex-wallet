'use client';
import { FaEdit, FaRegCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

  if (loading)
    return (
      <p className="text-gray-400 text-sm animate-pulse">
        Cargando perfil...
      </p>
    );

  if (!profile)
    return (
      <p className="text-sm text-red-500">
        No se encontró ningún perfil.
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-md space-y-6"
    >
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

      <div className="space-y-4 text-sm text-gray-300">
        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1">
            Dirección
          </span>
          <div className="flex items-center gap-2">
            <span className="break-all">{address}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigator.clipboard.writeText(address)}
              className="hover:text-white"
              title="Copiar dirección"
            >
              <FaRegCopy className={iconClass} />
            </motion.button>
          </div>
        </div>

        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1">
            Chain ID
          </span>
          <p>{chainId ?? 'N/A'}</p>
        </div>

        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1">
            Balance
          </span>
          <p>{balance ?? 'Loading...'}</p>
        </div>
      </div>
    </motion.div>
  );
}