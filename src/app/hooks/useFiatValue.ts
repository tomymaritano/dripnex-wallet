// lib/hooks/useFiatValue.ts
import { useEffect, useState } from 'react';

/**
 * Convert an ETH amount to the selected fiat currency using CoinGecko.
 *
 * @param eth ETH amount.
 * @param currency Fiat currency code.
 * @returns Converted value or `null` while loading.
 */
export function useFiatValue(eth: number, currency: string) {
  const [fiatValue, setFiatValue] = useState<number | null>(null);

  useEffect(() => {
    if (!eth || !currency) return;

    async function fetchValue() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency.toLowerCase()}`
        );
        const data = await res.json();
        setFiatValue(data.ethereum?.[currency.toLowerCase()] * eth);
      } catch (error) {
        console.error('Error fetching fiat value', error);
        setFiatValue(null);
      }
    }

    fetchValue();
  }, [eth, currency]);

  return fiatValue;
}