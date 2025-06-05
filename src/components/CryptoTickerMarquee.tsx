'use client';

import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { useTopCoins } from '@/app/hooks/useTopCoin';
import { usePriceEffects } from '@/app/hooks/usePriceEffects';
import { CryptoTickerItem } from './CryptoTickerItem';

export default function CryptoTickerMarquee() {
  const { currency } = useCurrencyStore();
  const { coins, loading } = useTopCoins(currency);
  const { previousPrices, effects } = usePriceEffects(coins);

  if (loading || !coins.length) return null;

  return (
    <section className="w-full text-white">
      <div className="backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center py-3 text-sm sm:text-base text-gray-300">
            <span className="font-semibold">Top 10 Cryptocurrencies</span>
            <span className="text-xs sm:text-sm text-gray-500">
              Prices in {currency.toUpperCase()}
            </span>
          </div>

          {/* Marquee Scroll */}
          <div className="overflow-x-hidden">
            <div className="animate-marquee flex w-max gap-4 py-4 whitespace-nowrap">
              {[...coins, ...coins].map((coin) => (
                <CryptoTickerItem
                  key={`${coin.id}-${Math.random()}`}
                  coin={coin}
                  currency={currency}
                  previous={previousPrices[coin.id]}
                  effect={effects[coin.id]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}