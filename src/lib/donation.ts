import { env } from './env'

export const WALLETS: Record<string, string> = {
  ETH: env.NEXT_PUBLIC_ETH_WALLET,
  BTC: env.NEXT_PUBLIC_BITCOIN_WALLET,
  SOL: env.NEXT_PUBLIC_SOLANA_WALLET,
  LTC: env.NEXT_PUBLIC_LITECOIN_WALLET,
  DOGE: env.NEXT_PUBLIC_DOGECOIN_WALLET,
}

export const EXPLORERS: Record<string, string> = {
  ETH: 'https://etherscan.io/tx/',
  BTC: 'https://www.blockchain.com/btc/tx/',
  SOL: 'https://solscan.io/tx/',
  LTC: 'https://blockchair.com/litecoin/transaction/',
  DOGE: 'https://blockchair.com/dogecoin/transaction/',
}
