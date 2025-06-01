'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaGithub, FaXTwitter, FaBars, FaMoon, FaSun } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';
import WalletConnectButton from './WalletButton';
import LegalDropdown from './LegalDropdown';

const NAV_LINKS = [
  { href: '/wallet', label: 'Wallet' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
      setIsDark(true);
    } else {
      html.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-indigo-500/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logodripnex.svg"
            alt="Dripnex Logo"
            width={38}
            height={38}
            priority
            className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-5  relative">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                pathname === item.href ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <LegalDropdown />

          <div className="w-px h-5 bg-indigo-400/20" />

          <Link href="https://x.com/hacklabdog" target="_blank" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
            <FaXTwitter size={18} />
          </Link>
          <Link href="https://github.com/tomymaritano/dripnex-app" target="_blank" className="text-gray-400 hover:text-white transition" aria-label="GitHub">
            <FaGithub size={18} />
          </Link>

          <div className="w-px h-5 bg-indigo-400/20" />

          <button onClick={toggleTheme} className="text-gray-300 hover:text-white transition" aria-label="Toggle dark mode">
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          <WalletConnectButton />
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <RxCross1 size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-black/90 backdrop-blur-md border-t border-indigo-500/10"
          >
            <div className="flex flex-col px-6 py-8 gap-8">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-white text-lg font-medium bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center hover:bg-white/10 transition ${
                    pathname === item.href ? 'text-indigo-400' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <LegalDropdown isMobile />

              <div className="flex justify-center gap-6">
                <Link
                  href="https://x.com/hacklabdog"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={22} />
                </Link>
                <Link
                  href="https://github.com/tomymaritano/dripnex-app"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={22} />
                </Link>
              </div>
              <button
                onClick={toggleTheme}
                className="flex justify-center text-gray-300 hover:text-white transition"
                aria-label="Toggle dark mode"
              >
                {isDark ? <FaSun size={22} /> : <FaMoon size={22} />}
              </button>
              <div className="flex justify-center">
                <WalletConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}