'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import WalletConnectButton from './WalletButton';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logodripnex.svg"
            alt="Dripnex Logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-white text-lg font-semibold tracking-tight">Dripnex</span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Link to Wallet Page */}
          <Link
            href="/wallet"
            className="text-sm text-gray-300 hover:text-indigo-400 transition hidden sm:inline"
          >
            Wallet
          </Link>

          {/* Socials */}
          <Link
            href="https://x.com"
            target="_blank"
            aria-label="Twitter"
            className="text-gray-400 hover:text-white transition"
          >
            <FaXTwitter size={16} />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            aria-label="GitHub"
            className="text-gray-400 hover:text-white transition"
          >
            <FaGithub size={16} />
          </Link>

          {/* Wallet Connect button */}
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  );
}