'use client';

import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../../public/animations/web3-network-4.json';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-black/20">
      {/* Lottie background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <Lottie animationData={animationData} loop autoplay className="w-full h-full object-cover" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-40" />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white">The minimalist Web3 wallet.</h1>
        <p className="text-gray-400 text-lg">
          No clutter. No noise. Just a clean, secure way to connect to crypto — built for real people in a real world.
        </p>
        <p className="text-gray-500 text-sm">
          Currently focused on Ethereum and testnets. Multi-chain and ETH transactions coming soon.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch justify-center">
          <Link
            href="https://github.com"
            className="inline-flex sm:inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition text-sm"

          >
            <FaGithub /> Contribute on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}