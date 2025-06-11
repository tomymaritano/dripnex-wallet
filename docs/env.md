# Environment Variables

Dripnex uses environment variables for API keys and service configuration. Copy `.env.example` to `.env.local` and fill in your own values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL of your Supabase instance |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key used in the browser |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID |
| `NEXT_PUBLIC_ETHERSCAN_API_KEY` | Public API key for client Etherscan calls |
| `ETHERSCAN_API_KEY` | Private API key for server-side Etherscan requests |
| `BREVO_API_KEY` | API key for the Brevo email service |
| `CSRF_SECRET` | Secret used to sign CSRF tokens |
| `NEXT_PUBLIC_ETH_WALLET` | Donation address for Ethereum |
| `NEXT_PUBLIC_BITCOIN_WALLET` | Donation address for Bitcoin |
| `NEXT_PUBLIC_SOLANA_WALLET` | Donation address for Solana |
| `NEXT_PUBLIC_LITECOIN_WALLET` | Donation address for Litecoin |
| `NEXT_PUBLIC_DOGECOIN_WALLET` | Donation address for Dogecoin |
| `UPSTASH_REDIS_REST_URL` | Optional Redis REST endpoint used in Docker |
| `UPSTASH_REDIS_REST_TOKEN` | Token for the Upstash REST API |

Variables prefixed with `NEXT_PUBLIC_` are also exposed to the browser.

Create a `.env.local` file with these values for local development. Tests load variables from `.env.test` using the same keys.
