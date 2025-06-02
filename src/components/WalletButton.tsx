'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaWallet } from 'react-icons/fa';
import Image from 'next/image';

export default function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
            })}
            className="w-full sm:w-auto"
          >
            <button
              onClick={connected ? openAccountModal : openConnectModal}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white border border-gray-700 rounded-lg bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.4)]"
            >
              {/* animación sutil de borde */}
              <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-indigo-500 transition-all duration-300 pointer-events-none" />

              <FaWallet
                className="text-gray-300 group-hover:text-indigo-400 transition-colors duration-300"
              />

              {connected && account.ensAvatar && (
                <Image
                  src={account.ensAvatar}
                  alt="Avatar"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full border border-gray-600"
                />
              )}

              <span className="truncate max-w-[100px]">
                {connected ? account.displayName : 'Connect Wallet'}
              </span>

              {connected && (
                <span className="text-gray-400 text-xs hidden sm:inline">{chain.name}</span>
              )}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}