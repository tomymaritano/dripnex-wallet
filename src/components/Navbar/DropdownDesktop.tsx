// DropdownDesktop.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { DropdownSection } from './types';

type Props = {
  label: string;
  sections: DropdownSection[];
};

/**
 * Desktop navigation dropdown with multiple sections.
 *
 * @param props.label Menu label.
 * @param props.sections Sections of links.
 */
export default function DropdownDesktop({ label, sections }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition flex items-center"
      >
        {label}
        <FaChevronDown className={`ml-1 w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full left-0 mt-3 z-50 ${open ? 'flex' : 'hidden'} gap-8 bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl`}
        style={{
          minWidth: '420px',
          maxWidth: 'calc(100vw - 2rem)',
        }}
      >
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col min-w-[140px]">
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-3">
              {section.title}
            </span>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm text-gray-300 hover:text-white hover:bg-indigo-500/10 px-3 py-1.5 rounded-md transition ${pathname === item.href ? 'text-indigo-400' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
