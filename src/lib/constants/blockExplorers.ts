// lib/constants/blockExplorers.ts
import { NETWORKS } from '../networks';

export const BLOCK_EXPLORERS: Record<number, string> = {
  [NETWORKS.ethereum.chainId]: NETWORKS.ethereum.explorer,
  [NETWORKS.polygon.chainId]: NETWORKS.polygon.explorer,
  [NETWORKS.optimism.chainId]: NETWORKS.optimism.explorer,
  [NETWORKS.arbitrum.chainId]: NETWORKS.arbitrum.explorer,
  [NETWORKS.bsc.chainId]: NETWORKS.bsc.explorer,
};
