// src/lib/env.ts
import { z } from 'zod'

// Variables que podés usar en el browser
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string(),
  NEXT_PUBLIC_ETHERSCAN_API_KEY: z.string(),
  NEXT_PUBLIC_ETH_WALLET: z.string(),
  NEXT_PUBLIC_BITCOIN_WALLET: z.string(),
  NEXT_PUBLIC_SOLANA_WALLET: z.string(),
  NEXT_PUBLIC_LITECOIN_WALLET: z.string(),
  NEXT_PUBLIC_DOGECOIN_WALLET: z.string(),
})

// Variables que solo vas a usar en el server
const serverEnvSchema = z.object({
  ETHERSCAN_API_KEY: z.string(),
  BREVO_API_KEY: z.string(),
})

// Hacés el parse por separado:

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  NEXT_PUBLIC_ETHERSCAN_API_KEY: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
  NEXT_PUBLIC_ETH_WALLET: process.env.NEXT_PUBLIC_ETH_WALLET,
  NEXT_PUBLIC_BITCOIN_WALLET: process.env.NEXT_PUBLIC_BITCOIN_WALLET,
  NEXT_PUBLIC_SOLANA_WALLET: process.env.NEXT_PUBLIC_SOLANA_WALLET,
  NEXT_PUBLIC_LITECOIN_WALLET: process.env.NEXT_PUBLIC_LITECOIN_WALLET,
  NEXT_PUBLIC_DOGECOIN_WALLET: process.env.NEXT_PUBLIC_DOGECOIN_WALLET,
})

export const serverEnv = serverEnvSchema.parse({
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
})