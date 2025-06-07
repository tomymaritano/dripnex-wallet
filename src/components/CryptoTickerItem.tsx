'use client';

import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
  };
  currency: string;
  previous: number | undefined;
  effect: 'pulse' | 'flash-up' | 'flash-down' | null;
}

/**
 * Display a single cryptocurrency price item within the ticker marquee.
 *
 * @param props.coin Coin data.
 * @param props.currency Currency code used for formatting.
 * @param props.previous Previous price for change tooltip.
 * @param props.effect Visual effect to apply on price change.
 */
export function CryptoTickerItem({ coin, currency, previous, effect }: Props) {
  const change = coin.price_change_percentage_24h;
  const isUp = change >= 0;
  const coinUrl = `https://www.coingecko.com/en/coins/${coin.id}`;

  const flashClass =
    effect === 'flash-up'
      ? 'bg-green-600/10'
      : effect === 'flash-down'
      ? 'bg-red-600/10'
      : '';

  return (
    <a
      href={coinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group flex items-center gap-3 border border-white/10 rounded-full px-3 py-1 bg-white/5 backdrop-blur-md hover:border-indigo-400 transition-all duration-300',
        flashClass
      )}
    >
      <Image
        src={coin.image}
        alt={coin.name}
        width={16}
        height={16}
        className="rounded-full"
      />

      <span className="text-xs font-medium uppercase tracking-wide text-gray-300">
        {coin.symbol}
      </span>

      <span
        title={previous !== undefined ? previous.toFixed(2) : ''}
        className={clsx(
          'text-sm font-medium text-white',
          effect === 'pulse' && 'animate-pulse'
        )}
      >
        {currency.toUpperCase()} {coin.current_price.toFixed(2)}
      </span>

      <span className={clsx('text-xs font-medium', isUp ? 'text-green-400' : 'text-red-400')}>
        {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
      </span>
    </a>
  );
}