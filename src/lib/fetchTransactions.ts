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

