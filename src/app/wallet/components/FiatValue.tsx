'use client';
import { useEffect, useState } from 'react';

type Props = {
  eth: number;
  currency: string;
};

export default function FiatValue({ eth, currency }: Props) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency}`
        );
        const data = await res.json();
        setPrice(data.ethereum[currency.toLowerCase()]);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    }

    fetchETHPrice();
  }, [currency]);

  if (!price) return <span className="text-xs text-gray-500">≈ Cargando...</span>;

  const fiatValue = eth * price;

  return (
    <span className="text-xs text-gray-400">
      ≈{' '}
      {fiatValue.toLocaleString('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
      })}
    </span>
  );
}