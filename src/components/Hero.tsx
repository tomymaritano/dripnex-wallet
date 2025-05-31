'use client';

import WalletButton from './WalletButton';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import FallingGridBackground from './FallingGridBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Grid Background */}
      <FallingGridBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-900 via-black to-gray-900 opacity-10" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-tight tracking-tight">
          The minimalist Web3 wallet.
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          No clutter. No noise. Just a clean, secure way to connect to crypto — built for real people in a real world.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4">
          <WalletButton />

          <Link
            href="https://github.com/tomymaritano/dripnex"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-white border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <FaGithub />
            Contribute on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}