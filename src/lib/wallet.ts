import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'

import { http, type Config } from 'wagmi'
import { env } from './env'

let walletConfig: Config | null = null

export function getWalletConfig(): Config {
  if (!walletConfig) {
    walletConfig = getDefaultConfig({
      appName: 'Dripnex',
      projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      chains: [mainnet, polygon, optimism, arbitrum],
      transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
      },
    })
  }
  return walletConfig
}