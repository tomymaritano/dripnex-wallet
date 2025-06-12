import { useEffect, useState } from 'react';

export function useTokenPrice(coingeckoId?: string) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!coingeckoId) return;

    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
        );
        const data = await res.json();

        if (coingeckoId && data[coingeckoId]?.usd !== undefined) {
          setPrice(data[coingeckoId].usd);
        } else {
          setPrice(null);
        }

      } catch (err) {
        console.error('Error fetching token price:', err);
        setPrice(null);
      }
    }

    fetchPrice();

    const interval = setInterval(fetchPrice, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  }, [coingeckoId]);

  return price;
}