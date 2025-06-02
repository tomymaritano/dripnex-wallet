// lib/hooks/useCurrency.ts
import { useEffect, useState } from 'react';

export function useCurrency() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
        );
        const data = await res.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error loading currencies', error);
        setCurrencies(['usd']); // fallback
      } finally {
        setLoading(false);
      }
    }

    fetchCurrencies();
  }, []);

  return { currencies, loading };
}