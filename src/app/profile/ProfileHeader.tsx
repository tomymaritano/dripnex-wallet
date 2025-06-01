import { motion } from 'framer-motion';

type Props = {
  username: string;
  createdAt: string;
};

export default function ProfileHeader({ username, createdAt }: Props) {
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <motion.div
      className="flex items-center gap-4 p-4 border border-white/10 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-black font-bold text-lg shadow-inner">
        {firstLetter}
      </div>

      <div className="flex flex-col">
        <span className="text-base font-semibold text-white leading-tight">{username}</span>
        <span className="text-xs text-gray-400">🗓️ Joined on {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
}