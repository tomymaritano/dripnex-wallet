'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="flex flex-col items-start gap-2 w-full">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-white text-lg font-medium bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left hover:bg-white/10 transition flex items-center justify-between"
        >
          {label}
          <FaChevronDown
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-2 mt-1"
            >
              {items.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClickItem}
                    className={`block px-4 py-2 rounded-md text-white font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition text-left w-full ${
                      pathname === item.href ? 'text-indigo-400' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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