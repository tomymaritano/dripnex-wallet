// MultiSectionDropdown.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export type DropdownSection = {
  title: string;
  items: { href: string; label: string }[];
};

export type MultiSectionDropdownProps = {
  label: string;
  sections: DropdownSection[];
  isMobile?: boolean;
  onClickItem?: () => void;
};

export default function MultiSectionDropdown({
  label,
  sections,
  isMobile = false,
  onClickItem,
}: MultiSectionDropdownProps) {
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
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-4 mt-2"
            >
              {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-1">
                  <span className="text-sm text-gray-400 px-4">{section.title}</span>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClickItem}
                      className={`block px-4 py-2 rounded-md text-white font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition text-left w-full ${
                        pathname === item.href ? 'text-indigo-400' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 z-50 w-[480px] max-w-[90vw] grid grid-cols-2 gap-6 p-6 rounded-2xl bg-black/90 backdrop-blur-lg shadow-2xl ring-1 ring-indigo-500/20 border border-white/5"
          >
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">
                  {section.title}
                </span>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block text-sm px-3 py-1.5 rounded-md transition font-medium ${
                        pathname === item.href
                          ? 'text-indigo-400 bg-white/5'
                          : 'text-gray-300 hover:text-white hover:bg-indigo-500/10'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}