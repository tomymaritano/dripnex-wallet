// src/components/WalletCard.tsx
export default function WalletCard() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 p-4 border border-cyan-500 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition">
      <h2 className="text-white">Balance</h2>
      <p className="text-cyan-300 text-lg">Ξ 2.123 ETH</p>
      <span className="text-gray-400 text-sm">0x3f4...a12b</span>
    </div>
  );
}