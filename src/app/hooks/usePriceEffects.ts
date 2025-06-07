import { useEffect, useRef, useState } from 'react';

interface Coin {
  id: string;
  current_price: number;
}

/**
 * Track price movements to apply visual effects on updates.
 *
 * @param coins Array of coin objects with `id` and `current_price`.
 * @returns Effects map and previous prices for each coin.
 */
export function usePriceEffects(coins: Coin[]) {
  const previousPricesRef = useRef<{ [id: string]: number }>({});
  const [effects, setEffects] = useState<{ [id: string]: 'pulse' | 'flash-up' | 'flash-down' | null }>({});
  const timeoutsRef = useRef<{ [id: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (!coins.length) return;

    const newEffects: typeof effects = {};

    coins.forEach((coin) => {
      const prev = previousPricesRef.current[coin.id];
      const current = coin.current_price;

      if (prev !== undefined && prev !== current) {
        const diff = Math.abs(prev - current);
        const pct = (diff / prev) * 100;

        newEffects[coin.id] = pct > 2.5
          ? (current > prev ? 'flash-up' : 'flash-down')
          : 'pulse';

        if (timeoutsRef.current[coin.id]) {
          clearTimeout(timeoutsRef.current[coin.id]);
        }

        timeoutsRef.current[coin.id] = setTimeout(() => {
          setEffects((prev) => ({ ...prev, [coin.id]: null }));
        }, 1000);
      }

      previousPricesRef.current[coin.id] = current;
    });

    if (Object.keys(newEffects).length > 0) {
      setEffects((prev) => ({ ...prev, ...newEffects }));
    }

    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
      timeoutsRef.current = {};
    };
  }, [coins]);

  return {
    effects,
    previousPrices: previousPricesRef.current,
  };
}