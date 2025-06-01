// DropdownMobile.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownSection } from './types';

type Props = {
  label: string;
  sections: DropdownSection[];
  onClickItem?: () => void;
};

export default function DropdownMobile({ label, sections, onClickItem }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-white text-lg font-medium bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left hover:bg-white/10 transition flex items-center justify-between"
      >
        {label}
        <FaChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
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
                    className={`block px-4 py-2 rounded-md text-white font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition text-left w-full ${pathname === item.href ? 'text-indigo-400' : ''}`}
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
