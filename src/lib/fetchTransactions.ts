const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

interface EtherscanTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
}

interface EtherscanResponse {
  status: string;
  message: string;
  result: EtherscanTransaction[];
}

export async function fetchTransactions(address: string) {
  if (!ETHERSCAN_API_KEY) throw new Error('Falta la API Key de Etherscan');

  const url = `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

  const res = await fetch(url);
  const data: EtherscanResponse = await res.json();

  if (!data.result || data.result.length === 0) {
    return [];
  }

  return data.result.map((tx: EtherscanTransaction) => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: (parseFloat(tx.value) / 1e18).toFixed(4),
    timeStamp: tx.timeStamp,
  }));
}