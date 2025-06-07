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

## 🧪 Running Tests

1. Install dependencies if you haven't already:

   ```bash
   npm install
   ```

2. Create a `.env.test` file with the environment variables required for tests. You can copy from `.env.example` and adjust the values as needed.

3. Execute the test suite with:

   ```bash
  npm test
  ```

   Vitest will run all the unit and integration tests located under `src/**/__tests__`.

## 🐳 Docker Setup

Build the production image and start the supporting services with Docker Compose:

```bash
docker compose up --build
```

The stack includes the Next.js app, a Supabase container, and a Redis instance
for rate limiting.

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

- **Content-Security-Policy** restricts asset loading to the same origin.
- **X-Frame-Options: DENY** prevents embedding the site in iframes.
- **X-Content-Type-Options: nosniff** stops MIME type sniffing.
- **Referrer-Policy: same-origin** only sends referrer info for same-site requests.
- **X-XSS-Protection: 1; mode=block** enables basic XSS filtering in old browsers.

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

## 🧠 License

MIT © [tomymaritano](https://github.com/tomymaritano)
