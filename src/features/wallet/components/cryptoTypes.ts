export const cryptoOptions = ['ETH', 'BTC', 'SOL', 'LTC', 'DOGE'] as const;
export type CryptoType = typeof cryptoOptions[number];
