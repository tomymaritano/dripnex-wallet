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
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-300 border border-teal-400 rounded-lg hover:bg-teal-400/20 transition text-sm"
                  >
                    <FaWallet className="text-teal-300" />
                    Connect Wallet
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="flex items-center gap-3 bg-gray-900/70 text-white border border-gray-700 px-4 py-2 rounded-lg backdrop-blur hover:bg-gray-800 transition text-sm"
                >
                  <FaWallet className="text-teal-400" />
                  {account.ensAvatar && (
                    <img
                      src={account.ensAvatar}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full border border-gray-600"
                    />
                  )}
                  <span>{account.displayName}</span>
                  <span className="text-gray-400 text-xs">{chain.name}</span>
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}