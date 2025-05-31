// src/app/not-found.tsx (Next.js 13+ App Router)
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-8 py-12 text-center max-w-md w-full"
      >
        <h1 className="text-5xl font-bold text-indigo-400 mb-4">404</h1>
        <p className="text-lg text-gray-300 mb-2">Page not found</p>
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-indigo-500 hover:bg-indigo-600 transition px-6 py-2 rounded-md text-sm font-medium"
        >
          Go Home
        </button>
      </motion.div>
    </main>
  );
}