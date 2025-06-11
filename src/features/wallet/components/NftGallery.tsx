'use client';

import { useEffect, useState } from 'react';
import { fetchNfts, ParsedNft } from '@/lib/fetchNfts';

type Props = {
  address: `0x${string}`;
};

/**
 * Display NFTs owned by the provided wallet address.
 */
export default function NftGallery({ address }: Props) {
  const [nfts, setNfts] = useState<ParsedNft[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchNfts(address)
      .then((data) => {
        if (data.error) setError(data.error);
        else setNfts(data.nfts);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Unknown error')
      )
      .finally(() => setLoading(false));
  }, [address]);

  if (loading)
    return <p className="text-gray-400 text-sm">Loading NFTs...</p>;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (nfts.length === 0)
    return <p className="text-gray-500 text-sm">No NFTs found.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {nfts.map((nft) => (
        <div
          key={`${nft.contract}-${nft.id}`}
          className="border border-white/10 rounded-lg p-2 text-white text-center bg-white/5 backdrop-blur-sm"
        >
          {nft.image && (
            <img
              src={nft.image}
              alt={nft.title ?? 'NFT'}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
          )}
          <p className="text-xs truncate font-semibold">
            {nft.title ?? `Token ${nft.id}`}
          </p>
        </div>
      ))}
    </div>
  );
}
