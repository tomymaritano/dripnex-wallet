// src/lib/wallet.ts

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { ledgerWallet } from '@rainbow-me/rainbowkit/wallets'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { http, type Config } from 'wagmi'
import { env } from './env'

declare global {
  // eslint-disable-next-line no-var
  var _walletConfig: Config | undefined
}

export function getWalletConfig(): Config {
  if (!globalThis._walletConfig) {
    const chains = [mainnet, polygon, optimism, arbitrum]
    globalThis._walletConfig = getDefaultConfig({
      appName: 'Dripnex',
      projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      chains,
      wallets: [
        {
          groupName: 'Hardware',
          wallets: [
            ledgerWallet({ projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, chains }),
          ],
        },
      ],
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

export type { Config }
