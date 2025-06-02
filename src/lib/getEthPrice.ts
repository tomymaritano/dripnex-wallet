export async function getEthPrice() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,ars'
  );
  if (!res.ok) throw new Error('Error fetching ETH price');
  const data = await res.json();
  return {
    usd: data.ethereum.usd,
    ars: data.ethereum.ars,
  };
}