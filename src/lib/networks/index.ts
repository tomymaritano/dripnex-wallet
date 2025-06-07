import { createPublicClient, http, type PublicClient } from 'viem';
import {
  mainnet,
  polygon,
  bsc,
  arbitrum,
  optimism,
  type Chain,
} from 'viem/chains';

/** Parameters for sending a transaction */
export interface SendTxParams {
  to: `0x${string}`;
  value: bigint;
}

/** Network provider abstraction for multi-chain support. */
export interface ERC20Token {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
}

export interface NetworkProvider {
  chainId: number;
  name: string;
  explorer: string;
  client: PublicClient;
  tokens: ERC20Token[];
}

/**
 * Build a Viem public client for the provided chain.
 *
 * @param chain Chain configuration from viem.
 */
function client(chain: Chain): PublicClient {
  return createPublicClient({ chain, transport: http() });
}

export const NETWORKS: Record<string, NetworkProvider> = {
  ethereum: {
    chainId: mainnet.id,
    name: 'Ethereum',
    explorer: 'https://etherscan.io/tx/',
    client: client(mainnet),
    tokens: [
      {
        symbol: 'USDC',
        address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      {
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        decimals: 18,
      },
    ],
  },
  polygon: {
    chainId: polygon.id,
    name: 'Polygon',
    explorer: 'https://polygonscan.com/tx/',
    client: client(polygon),
    tokens: [
      {
        symbol: 'USDC',
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        decimals: 6,
      },
      {
        symbol: 'DAI',
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        decimals: 18,
      },
    ],
  },
  bsc: {
    chainId: bsc.id,
    name: 'BNB Chain',
    explorer: 'https://bscscan.com/tx/',
    client: client(bsc),
    tokens: [
      {
        symbol: 'USDT',
        address: '0x55d398326f99059FF775485246999027B3197955',
        decimals: 18,
      },
      {
        symbol: 'BUSD',
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        decimals: 18,
      },
    ],
  },
  arbitrum: {
    chainId: arbitrum.id,
    name: 'Arbitrum',
    explorer: 'https://arbiscan.io/tx/',
    client: client(arbitrum),
    tokens: [
      {
        symbol: 'USDC',
        address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        decimals: 6,
      },
    ],
  },
  optimism: {
    chainId: optimism.id,
    name: 'Optimism',
    explorer: 'https://optimistic.etherscan.io/tx/',
    client: client(optimism),
    tokens: [
      {
        symbol: 'USDC',
        address: '0x4200000000000000000000000000000000000042',
        decimals: 6,
      },
    ],
  },
};
