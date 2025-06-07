// src/api/etherscan/route.ts
import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

const ETHERSCAN_API_KEY = env.ETHERSCAN_API_KEY
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 });
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
  }

  try {
    const url = `${ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== '1') {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch transactions' },
        { status: 500 }
      );
    }

    const transactions = (data.result || []).map((tx: any) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: (parseFloat(tx.value) / 1e18).toFixed(4),
      timeStamp: tx.timeStamp,
    }));

    return NextResponse.json({ transactions });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
