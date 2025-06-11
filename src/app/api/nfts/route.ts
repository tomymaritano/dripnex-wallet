import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { z } from 'zod';

/**
 * API endpoint to fetch NFTs owned by a wallet using the Alchemy NFT API.
 *
 * Query params:
 * - address: wallet address to fetch NFTs for.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  const querySchema = z.object({
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  });

  const parsed = querySchema.safeParse({ address });
  if (!parsed.success) {
    return NextResponse.json(
      { error: address ? 'Invalid address' : 'Missing wallet address' },
      { status: 400 }
    );
  }

  const apiKey = env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'NFT provider not configured' },
      { status: 500 }
    );
  }

  try {
    const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/?owner=${address}`;
    const res = await fetch(url);
    const data = await res.json();

    const nfts = (data.ownedNfts || []).map((nft: any) => ({
      contract: nft.contract.address as string,
      id: nft.id.tokenId as string,
      title: nft.title || nft.metadata?.name,
      description: nft.metadata?.description,
      image: nft.media?.[0]?.gateway || nft.media?.[0]?.raw,
    }));

    return NextResponse.json({ nfts });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
