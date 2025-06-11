# Dripnex 🧬

**Dripnex** is a minimalist Web3 wallet interface — built for real people in a real world.  
It's designed to connect your wallet simply, privately, and fast — without clutter.

## 🔍 What is it?

A clean, crypto-native frontend starter that lets you:
- Connect your wallet (RainbowKit + Wagmi)
- Use a minimal, responsive and glassmorphic UI
- Extend with your own on-chain logic

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/) configured via `postcss.config.js` (Tailwind CSS + Autoprefixer)
- [RainbowKit](https://rainbowkit.com/)
- [Wagmi](https://wagmi.sh/)
- [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/dripnex.git
cd dripnex
npm install
cp .env.example .env.local
npm run dev
```

> 📝 Make sure to replace your `WalletConnect` project ID in `wallet.ts`.
> The `.env.example` file lists all variables needed for local development.

## 🌐 Environment Variables

`dripnex` relies on a few environment variables for API keys and wallet
addresses. Copy `.env.example` to `.env.local` and fill in your values.

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

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

Create a `.env.local` file with these values for local development and Docker.
Tests load variables from `.env.test` using the same keys.

## 🐳 Docker Usage

You can run the app in a container without installing Node locally. Build the
image and start the server with:

```bash
docker build -t dripnex .
docker run --env-file .env.local -p 3000:3000 dripnex
```

The server will be available at `http://localhost:3000`.

### Docker Compose

If you want Supabase and Redis alongside the app, start everything with:

```bash
docker-compose up
```

`docker-compose` reads the same `.env.local` file used for local development.

## 🧪 Running Tests

1. Install dependencies if you haven't already:

   ```bash
   npm install
   ```

2. Create a `.env.test` file with the same keys listed above. The tests will load this file automatically.

3. Execute the test suite with:

   ```bash
  npm test
  ```

   Vitest will run all the unit and integration tests located under `src/**/__tests__`.

4. Run the linter to make sure your code follows the project's style rules:

   ```bash
 npm run lint
  ```

## 📱 Progressive Web App

The app ships with a basic service worker and web app manifest. To build and
serve the PWA locally run:

```bash
npm run pwa
```

This registers the service worker from `public/sw.js` and uses the manifest
located at `public/manifest.json`.

## 📁 Structure

```
.
├── app/
│   ├── page.tsx         # Main layout
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── WalletButton.tsx
├── public/
│   └── logodripnex.svg
├── styles/
│   └── globals.css
```

## 🔒 Security

The application sends several security headers defined in `next.config.ts`:

  - **Content-Security-Policy** restricts asset loading to the same origin while
  allowing inline scripts required by Next.js.
- **X-Frame-Options: DENY** prevents embedding the site in iframes.
- **X-Content-Type-Options: nosniff** stops MIME type sniffing.
- **Referrer-Policy: same-origin** only sends referrer info for same-site requests.
- **X-XSS-Protection: 1; mode=block** enables basic XSS filtering in old browsers.
- **Strict-Transport-Security** forces HTTPS connections for two years.
- **Permissions-Policy** disables unused browser features like camera and microphone.
- **Cross-Origin-Embedder-Policy: require-corp** enables cross-origin isolation.
- **Cross-Origin-Resource-Policy: same-origin** restricts where resources can be loaded from.
- **Cross-Origin-Opener-Policy: same-origin** isolates the browsing context.
- **CSRF Protection** requires sending the `csrf-token` header with POST requests. The value comes from the `csrfToken` cookie set by the server.

## API

- **GET `/healthz`** — returns `200 OK` when the server is running.
- All POST requests require a CSRF token. The token is stored in the
  `_dripnex_csrf` cookie and must be sent using the `X-CSRF-Token` header.

The API provides a `/healthz` endpoint for health checks. All POST routes require a `csrfToken` header to mitigate CSRF attacks.

The API provides a `/healthz` endpoint for health checks. All POST routes require a `csrfToken` header to mitigate CSRF attacks.

# 🧠 Dripnex Project Backlog

_Last updated: 2025-06-04_

---

## ✅ Implemented Features
- Wallet connection using Wagmi
- ETH transfers via `useSendEth`
- Send/Receive panel with QR code generation
- Transaction history via Etherscan API
- Profile registration with Supabase
- DonateWidget with multichain placeholders
- Newsletter integration with Brevo
- Glassmorphism + responsive design
- Tailwind + Skeleton UI integration
- Wallet Dashboard: Profile + Transactions
- Markdown blog using Sanity + PortableText

---

## 🔧 High Priority
- [x] Real multichain support (Ethereum, Polygon, BSC, Arbitrum, Optimism)
- [ ] Display balance by token and network
- [ ] Transaction view by token/network
- [ ] Unified theming system (design tokens)
- [ ] Enhanced feedback (errors, confirmations, loading)
- [ ] Systematic visual improvements (accessibility, animations)

---

## 🛠️ Medium Priority
- [ ] Fiat value display (USD, ARS)
- [ ] Message signing support
- [ ] Frequent contact list
- [ ] Mobile UX improvements for Send/Receive panel

---

## 🔮 Low Priority
- [ ] NFT support
- [ ] Light/Dark theme toggle
- [ ] Accessibility enhancements (focus states, aria-labels)

---

## 📚 Documentation Needed
- [ ] `README.md` with vision and setup
- [ ] Local development guide
- [ ] Folder structure & architecture overview
- [ ] Wallet and donations flow explained
- [ ] Guide: how to add new chains/tokens
- [ ] Supabase schema and usage
- [ ] Transaction format and display logic

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

For detailed guidelines see [CONTRIBUTING.md](CONTRIBUTING.md).

## 🧠 License

MIT © [tomymaritano](https://github.com/tomymaritano)
