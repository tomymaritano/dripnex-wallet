import { env } from './env'

const ETHERSCAN_API_KEY = env.NEXT_PUBLIC_ETHERSCAN_API_KEY
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

export interface EtherscanTransaction {
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

export interface ParsedTransaction {
  hash: string;
  from: string;
  to: string;
  value: string; // ya convertido a ETH con toFixed
  timeStamp: string;
  token?: string; // ✅ opcional, si no siempre está presente

}

export async function fetchTransactions(address: string): Promise<ParsedTransaction[]> {
  if (!ETHERSCAN_API_KEY) throw new Error('Falta la API Key de Etherscan');

  const url = `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

  const res = await fetch(url);
  const data: EtherscanResponse = await res.json();

  if (!data.result || data.result.length === 0) {
    return [];
  }

  return data.result.map((tx) => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: (parseFloat(tx.value) / 1e18).toFixed(4),
    timeStamp: tx.timeStamp,
  }));
}