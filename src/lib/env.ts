import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string(),
  NEXT_PUBLIC_ETHERSCAN_API_KEY: z.string(),
  ETHERSCAN_API_KEY: z.string(),
  BREVO_API_KEY: z.string(),
  NEXT_PUBLIC_ETH_WALLET: z.string(),
  NEXT_PUBLIC_BITCOIN_WALLET: z.string(),
  NEXT_PUBLIC_SOLANA_WALLET: z.string(),
  NEXT_PUBLIC_LITECOIN_WALLET: z.string(),
  NEXT_PUBLIC_DOGECOIN_WALLET: z.string(),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
