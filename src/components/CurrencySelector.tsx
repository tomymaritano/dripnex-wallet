'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import clsx from 'clsx';

const currencies = [
  { code: 'usd', label: 'USD', flag: '🇺🇸' },
  { code: 'eur', label: 'EUR', flag: '🇪🇺' },
  { code: 'ars', label: 'ARS', flag: '🇦🇷' },
];

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrencyStore();
  const current = currencies.find((c) => c.code === currency);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-gray-700 rounded-lg bg-white/5 backdrop-blur-md transition-all hover:border-indigo-500 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.4)]">
        <span className="text-xl">{current?.flag}</span>
        <span>{current?.label}</span>
        <FaChevronDown className="text-xs text-gray-400 group-hover:text-indigo-400 transition" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-[#1a1a1a] border border-white/10 backdrop-blur-md shadow-lg focus:outline-none z-50">
          {currencies.map((item) => (
            <Menu.Item key={item.code}>
              {({ active }) => (
                <button
                  onClick={() => setCurrency(item.code)}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm text-white',
                    active ? 'bg-white/10' : ''
                  )}
                >
                  <span className="mr-2 text-lg">{item.flag}</span>
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}