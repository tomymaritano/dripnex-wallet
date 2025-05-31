// src/components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section className="pt-16 pb-12 px-6 text-white max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 tracking-tight">Introducing Dripnex</h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-4">
        Dripnex is a fast, minimal Web3 dashboard designed to give you full control over your on-chain presence.
        It brings together essential tools for managing your wallet, tracking your activity, and understanding your crypto behavior — all in one intuitive interface.
      </p>
      <p className="text-gray-400 text-base leading-relaxed mb-4">
        Whether you're a builder, creator, or collector, Dripnex helps you see the bigger picture — from balances and transactions to NFTs and future AI-powered insights.
        We’re building a space where crypto identity meets clarity and performance.
      </p>
      <p className="text-gray-500 text-sm">
        Currently focused on Ethereum and testnets. Multi-chain and Beth transactions coming soon.
      </p>
    </section>
  );
}