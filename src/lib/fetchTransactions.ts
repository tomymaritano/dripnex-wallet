
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
interface ApiResponse {
  transactions: ParsedTransaction[];
  error?: string;
}

export async function fetchTransactions(address: string): Promise<ApiResponse> {
  const res = await fetch(`/api/etherscan?address=${address}`);
  const data = await res.json();

  return data;
}

