// src/lib/wallet.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { env } from './env'
import { NETWORKS } from './networks'

export const config = getDefaultConfig({
  appName: 'Dripnex',
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [
    NETWORKS.ethereum.chain,
    NETWORKS.polygon.chain,
    NETWORKS.optimism.chain,
    NETWORKS.arbitrum.chain,
    NETWORKS.bsc.chain,
  ],
  transports: {
    [NETWORKS.ethereum.chain.id]: http(),
    [NETWORKS.polygon.chain.id]: http(),
    [NETWORKS.optimism.chain.id]: http(),
    [NETWORKS.arbitrum.chain.id]: http(),
    [NETWORKS.bsc.chain.id]: http(),
  },
});
