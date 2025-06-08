// src/lib/wallet.ts

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { http, type Config } from 'wagmi'
import { env } from './env'

declare global {
  // eslint-disable-next-line no-var
  var _walletConfig: Config | undefined
}

export function getWalletConfig(): Config {
  if (!globalThis._walletConfig) {
    globalThis._walletConfig = getDefaultConfig({
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
  return globalThis._walletConfig
}