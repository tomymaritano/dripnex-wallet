import { createPublicClient, http, type PublicClient } from 'viem';
import { mainnet, polygon, bsc, arbitrum, optimism } from 'viem/chains';

/** Parameters for sending a transaction */
export interface SendTxParams {
  to: `0x${string}`;
  value: bigint;
}

/** Network provider abstraction for multi-chain support. */
export interface NetworkProvider {
  chainId: number;
  name: string;
  explorer: string;
  client: PublicClient;
}

/**
 * Build a Viem public client for the provided chain.
 *
 * @param chain Chain configuration from viem.
 */
function client(chain: any): PublicClient {
  return createPublicClient({ chain, transport: http() });
}

export const NETWORKS: Record<string, NetworkProvider> = {
  ethereum: {
    chainId: mainnet.id,
    name: 'Ethereum',
    explorer: 'https://etherscan.io/tx/',
    client: client(mainnet),
  },
  polygon: {
    chainId: polygon.id,
    name: 'Polygon',
    explorer: 'https://polygonscan.com/tx/',
    client: client(polygon),
  },
  bsc: {
    chainId: bsc.id,
    name: 'BNB Chain',
    explorer: 'https://bscscan.com/tx/',
    client: client(bsc),
  },
  arbitrum: {
    chainId: arbitrum.id,
    name: 'Arbitrum',
    explorer: 'https://arbiscan.io/tx/',
    client: client(arbitrum),
  },
  optimism: {
    chainId: optimism.id,
    name: 'Optimism',
    explorer: 'https://optimistic.etherscan.io/tx/',
    client: client(optimism),
  },
};
