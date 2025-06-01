'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';

type DropdownMenuProps = {
  label: string;
  items: { href: string; label: string }[];
  isMobile?: boolean;
  onClickItem?: () => void;
};

export default function DropdownMenu({
  label,
  items,
  isMobile = false,
  onClickItem,
}: DropdownMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-gray-400 text-sm  uppercase tracking-wide">{label}</span>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClickItem}
            className={`block px-4 py-2 rounded-md text-white font-medium text-center bg-white/5 border border-white/10  hover:bg-white/10 transition ${
              pathname === item.href ? 'text-indigo-400' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition flex items-center"
      >
        {label}
        <FaChevronDown
          className={`ml-1 w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-md border border-indigo-500/30 rounded-md shadow-lg z-50 min-w-[160px] ${
          open ? 'block' : 'hidden'
        }`}
        style={{ borderImage: 'linear-gradient(to right, #6366f1, #a855f7) 1' }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-indigo-400 transition ${
              pathname === item.href ? 'text-indigo-400' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}