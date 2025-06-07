// lib/constants/blockExplorers.ts
export const BLOCK_EXPLORERS: Record<number, string> = {
  1: 'https://etherscan.io/tx/',        // Ethereum Mainnet
  137: 'https://polygonscan.com/tx/',   // Polygon Mainnet
  10: 'https://optimistic.etherscan.io/tx/',
  42161: 'https://arbiscan.io/tx/',
  56: 'https://bscscan.com/tx/',        // BNB Smart Chain
};