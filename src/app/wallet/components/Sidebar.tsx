'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaPaperPlane,
  FaDownload,
  FaCoins,
  FaUser,
} from 'react-icons/fa';
import clsx from 'clsx';

const menuItems = [
  { href: '/wallet', label: 'Inicio', icon: FaHome },
  { href: '/wallet/send', label: 'Enviar', icon: FaPaperPlane },
  { href: '/wallet/receive', label: 'Recibir', icon: FaDownload },
  { href: '/wallet/assets', label: 'Tokens', icon: FaCoins },
  { href: '/wallet/profile', label: 'Perfil', icon: FaUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-black/60 border-r border-white/10 backdrop-blur-md p-6 text-white shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-teal-400 tracking-tight">Dripnex</h2>
        <p className="text-sm text-gray-400 mt-1">Web3 Wallet Hub</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-teal-500/20 text-teal-300'
                  : 'hover:bg-white/10 text-gray-300'
              )}
            >
              <Icon className="mr-3" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Dripnex
      </div>
    </aside>
  );
}