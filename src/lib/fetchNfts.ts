export interface ParsedNft {
  contract: string;
  id: string;
  title?: string;
  description?: string;
  image?: string;
}

interface ApiResponse {
  nfts: ParsedNft[];
  error?: string;
}

/**
 * Fetch NFTs for the given wallet address from the API route.
 */
export async function fetchNfts(address: string): Promise<ApiResponse> {
  const res = await fetch(`/api/nfts?address=${address}`);
  const data = await res.json();
  return data;
}
