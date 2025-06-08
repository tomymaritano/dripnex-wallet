/**
 * Get the current ETH price in USD and ARS from CoinGecko.
 *
 * @returns Object with `usd` and `ars` prices.
 */
let cachedPrice: { usd: number; ars: number } | null = null;
let cachedAt = 0;

export function invalidateEthPriceCache() {
  cachedPrice = null;
  cachedAt = 0;
}

export async function getEthPrice() {
  if (cachedPrice && Date.now() - cachedAt < 5 * 60_000) {
    return cachedPrice;
  }

  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,ars'
  );
  if (!res.ok) throw new Error('Error fetching ETH price');
  const data = await res.json();
  cachedPrice = {
    usd: data.ethereum.usd,
    ars: data.ethereum.ars,
  };
  cachedAt = Date.now();
  return cachedPrice;
}