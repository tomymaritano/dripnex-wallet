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
- [RainbowKit](https://rainbowkit.com/)
- [Wagmi](https://wagmi.sh/)
- [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/dripnex.git
cd dripnex
npm install
npm run dev
```

> 📝 Make sure to replace your `WalletConnect` project ID in `wallet.ts`.

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

## 🛣️ Roadmap

- [x] Minimal wallet connection
- [x] Crypto-style UI with glassmorphism
- [ ] Display wallet address & ENS
- [ ] View balances, NFTs, and on-chain data
- [ ] Multi-chain support & transaction history
- [ ] Light/dark theme toggle

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🧠 License

MIT © [tomymaritano](https://github.com/tomymaritano)
