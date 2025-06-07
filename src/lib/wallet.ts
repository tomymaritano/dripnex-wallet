// src/lib/wallet.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, bsc } from 'wagmi/chains'
import { http } from 'wagmi'
import { env } from './env'

export const config = getDefaultConfig({
  appName: 'Dripnex',
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, bsc, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});