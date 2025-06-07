// src/lib/networks/index.ts
import {
  http,
  type Transport,
  createPublicClient,
  type SendTransactionParameters as SendTxParams,
  type Hash,
  type Chain,
} from 'viem';
import { mainnet, polygon, bsc, arbitrum, optimism } from 'viem/chains';

export interface NetworkProvider {
  chainId: number;
  name: string;
  explorer: string;
  chain: Chain;
  getProvider(): Transport;
  estimateGas(tx: SendTxParams): Promise<bigint>;
  sendTransaction(tx: SendTxParams): Promise<Hash>;
}

function createProvider(
  chain: Chain,
  name: string,
  explorer: string,
  rpcUrl: string,
): NetworkProvider {
  const client = createPublicClient({ chain, transport: http(rpcUrl) });
  return {
    chainId: chain.id,
    name,
    chain,
    explorer,
    getProvider: () => client.transport,
    estimateGas: (tx) => client.estimateGas(tx),
    sendTransaction: (tx) => client.sendTransaction(tx),
  };
}

export const ethereum = createProvider(
  mainnet,
  'Ethereum',
  'https://etherscan.io/tx/',
  'https://eth.llamarpc.com',
);

export const polygonProvider = createProvider(
  polygon,
  'Polygon',
  'https://polygonscan.com/tx/',
  'https://polygon.llamarpc.com',
);

export const bscProvider = createProvider(
  bsc,
  'BNB Smart Chain',
  'https://bscscan.com/tx/',
  'https://bsc-dataseed.binance.org',
);

export const arbitrumProvider = createProvider(
  arbitrum,
  'Arbitrum',
  'https://arbiscan.io/tx/',
  'https://arbitrum.llamarpc.com',
);

export const optimismProvider = createProvider(
  optimism,
  'Optimism',
  'https://optimistic.etherscan.io/tx/',
  'https://optimism.llamarpc.com',
);

export const NETWORKS = {
  ethereum,
  polygon: polygonProvider,
  bsc: bscProvider,
  arbitrum: arbitrumProvider,
  optimism: optimismProvider,
};


