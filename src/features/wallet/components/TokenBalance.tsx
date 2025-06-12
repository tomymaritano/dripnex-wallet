'use client';

import { useBalance } from 'wagmi';
import Image from 'next/image';
import { useTokenPrice } from '@/lib/hooks/useTokenPrice';
import tokenLogos from '@/lib/tokenLogos';

interface Props {
  address: `0x${string}`;
  chainId: number;
  token?: { address: `0x${string}`; symbol: string; coingeckoId?: string };
}

export default function TokenBalance({ address, chainId, token }: Props) {
  const { data, isLoading } = useBalance({
    address,
    chainId,
    token: token?.address,
  });

  const price = useTokenPrice(token?.coingeckoId);
  const tokenBalance = Number(data?.formatted ?? 0);
  const usdValue = price ? (tokenBalance * price).toFixed(2) : null;

  const displaySymbol = token?.symbol ?? 'Native';
  const logoUrl = token?.symbol ? tokenLogos[token.symbol] : undefined;

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg text-sm text-white/90 backdrop-blur border border-white/10 hover:bg-gradient-to-r hover:from-white/5 hover:to-white/10 transition duration-200 shadow-sm">
      
      {/* Token symbol + logo */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={displaySymbol}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-white/20 to-white/10 flex items-center justify-center text-sm font-bold text-white uppercase">
            {displaySymbol.charAt(0)}
          </div>
        )}
        <span className="font-medium text-white">{displaySymbol}</span>
      </div>

      {/* Balance + USD */}
      <div className="flex flex-col text-right font-mono min-w-[100px]">
        {isLoading ? (
          <div className="h-4 w-16 bg-white/20 rounded animate-pulse self-end" />
        ) : (
          <>
            <span className="text-base font-semibold tracking-tight text-white">
              {tokenBalance.toFixed(4)}
            </span>
            {usdValue && (
              <span className="text-xs text-gray-400 leading-tight">
                ≈ ${usdValue}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}