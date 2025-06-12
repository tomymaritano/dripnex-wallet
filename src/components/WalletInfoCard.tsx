'use client';

import { useWalletInfo } from '@/app/hooks/useWalletInfo';
import { Copy } from 'lucide-react'; // opcional

export default function WalletInfoCard() {
  const { address, isConnected } = useWalletInfo();

  if (!isConnected) return null;

  return (
    <div className="rounded-xl border border-white/10 p-6 backdrop-blur text-white space-y-4 shadow-lg">
      <h3 className="text-lg font-bold">Wallet Info</h3>

      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-400 mb-1">Address</span>
          <div className="flex items-center gap-2 break-all text-sm">
            {address}
            <button
              onClick={() => address && navigator.clipboard.writeText(address)}
              className="text-gray-400 hover:text-white transition"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}