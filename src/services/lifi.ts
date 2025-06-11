import { env } from '@/lib/env';

export interface QuoteParams {
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
  amount: string; // amount in fromToken units
}

export interface LifiQuote {
  estimate: {
    toAmount: string;
  };
}

const LIFI_ENDPOINT = 'https://li.quest/v1/quote';

/**
 * Retrieve a bridge quote from the Li.Fi API.
 *
 * @param params Quote parameters.
 */
export async function getLifiQuote(params: QuoteParams): Promise<LifiQuote> {
  const search = new URLSearchParams({
    fromChain: params.fromChain.toString(),
    toChain: params.toChain.toString(),
    fromToken: params.fromToken,
    toToken: params.toToken,
    fromAmount: params.amount,
  });

  const res = await fetch(`${LIFI_ENDPOINT}?${search}`, {
    headers: {
      'x-lifi-api-key': env.NEXT_PUBLIC_LIFI_API_KEY ?? '',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Li.Fi quote');
  }

  return (await res.json()) as LifiQuote;
}
