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
- [ ] Real multichain support (Polygon, BTC, SOL, etc.)
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
