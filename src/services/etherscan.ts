// src/services/etherscan.ts

import { env } from '@/lib/env'

const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api'

export async function getTransactions(address: string) {
  const res = await fetch(
    `${ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${env.ETHERSCAN_API_KEY}`
  )

  const data = await res.json();

  if (data.status !== '1') {
    throw new Error(`Etherscan error: ${data.message}`);
  }

  return data.result;
}