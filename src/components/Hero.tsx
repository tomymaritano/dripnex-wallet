'use client';

import WalletButton from './WalletButton';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative flex-1 flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-teal-900 via-black to-gray-900 opacity-30 blur-2xl" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-xl text-center space-y-6">
        <h1 className="text-5xl md:text-4xl font-semibold text-white leading-tight">
          The minimalist Web3 wallet.
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          No clutter. No noise. Just a clean, secure way to connect to crypto — built for real people in a real world.
        </p>
        <div className="flex justify-center gap-4">
          <WalletButton />
          <Link
            href="https://github.com/yourusername/dripnex"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-200 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
          >
            <FaGithub />
            Contribute on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}