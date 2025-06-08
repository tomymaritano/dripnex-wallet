/**
 * Get the current ETH price in USD and ARS from CoinGecko.
 *
 * @returns Object with `usd` and `ars` prices.
 */
declare global {
  // eslint-disable-next-line no-var
  var _ethPriceCache:
    | { value: { usd: number; ars: number }; timestamp: number }
    | undefined;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getEthPrice() {
  const cached = globalThis._ethPriceCache;
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.value;
  }

  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,ars'
  );
  if (!res.ok) throw new Error('Error fetching ETH price');
  const data = await res.json();

  const price = {
    usd: data.ethereum.usd,
    ars: data.ethereum.ars,
  };

  globalThis._ethPriceCache = { value: price, timestamp: now };

  return price;
}