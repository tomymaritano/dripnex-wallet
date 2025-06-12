'use client';

import { useEffect, useState } from 'react';
import { NETWORKS } from '@/lib/networks';

export function useTokenPricesBatch() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const uniqueIds = Array.from(
          new Set(
            Object.values(NETWORKS).flatMap((net) =>
              net.tokens.map((t) => t.coingeckoId)
            )
          )
        );

        const idsParam = uniqueIds.join(',');
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();

        // Map a Record<string, number>
        const parsedPrices: Record<string, number> = {};
        uniqueIds.forEach((id) => {
          parsedPrices[id] = data[id]?.usd ?? 0;
        });

        setPrices(parsedPrices);
      } catch (err) {
        console.error('Error fetching token prices:', err);
        setError('Could not fetch token prices');
      }
    }

    fetchPrices();

    // Optional: refresh prices every 60 sec
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return { prices, error };
}