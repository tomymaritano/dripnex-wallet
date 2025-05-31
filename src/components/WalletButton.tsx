'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaWallet } from 'react-icons/fa';

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
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-500/10 text-gray-300 border border-gray-400 rounded-xl hover:bg-gray-400/20 transition text-sm"
                  >
                    <FaWallet className="text-gray-300" />
                    <span className="truncate">Connect Wallet</span>
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-white border bg-indigo-950/40 border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <FaWallet className="text-indigo-400" />
                  {account.ensAvatar && (
                    <img
                      src={account.ensAvatar}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full border border-gray-600"
                    />
                  )}
                  <span className="truncate max-w-[100px]">{account.displayName}</span>
                  <span className="text-gray-400 text-xs hidden sm:inline">{chain.name}</span>
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}