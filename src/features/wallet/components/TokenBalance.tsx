'use client';

import { useBalance } from 'wagmi';
import { Loader2 } from 'lucide-react';

interface Props {
  address: `0x${string}`;
  chainId: number;
  token?: { address: `0x${string}`; symbol: string };
}

export default function TokenBalance({ address, chainId, token }: Props) {
  const { data, isLoading } = useBalance({
    address,
    chainId,
    token: token?.address,
  });

  const displaySymbol = token?.symbol ?? 'Native';
  const displayBalance = isLoading
    ? <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
    : `${Number(data?.formatted ?? 0).toFixed(4)}`;

  return (
    <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg text-sm text-white/90 backdrop-blur border border-white/10 hover:bg-white/10 transition">
      
      {/* Token symbol + icon */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
          {displaySymbol.charAt(0)}
        </div>
        <span className="font-medium">{displaySymbol}</span>
      </div>

      {/* Balance */}
      <div className="font-mono text-right text-white text-sm min-w-[80px] flex items-center justify-end">
        {displayBalance}
      </div>
    </div>
  );
}