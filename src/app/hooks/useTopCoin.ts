import { useEffect, useState } from "react";

// lib/hooks/useTopCoins.ts
interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}



export function useTopCoins(vs_currency = 'usd') {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=bitcoin,ethereum,solana,dogecoin,litecoin&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coin prices', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, [vs_currency]);

  return { coins, loading };
}