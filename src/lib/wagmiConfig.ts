// src/lib/wagmiConfig.ts
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

export const chains = [mainnet, polygon, optimism, arbitrum] as const;

const { connectors } = getDefaultWallets({
  appName: 'Dripnex App',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
});

export const wagmiConfig = createConfig({
  connectors,
  chains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});
