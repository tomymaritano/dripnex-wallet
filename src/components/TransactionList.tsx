// src/components/TransactionList.tsx
const transactions = [
  { type: "in", amount: "+0.5 ETH", address: "0xabc..." },
  { type: "out", amount: "-0.2 ETH", address: "0xdef..." },
];

/**
 * Placeholder list of example transactions.
 */
export default function TransactionList() {
  return (
    <ul className="space-y-3">
      {transactions.map((tx, idx) => (
        <li
          key={idx}
          className={`bg-gray-800 p-3 rounded-md border-l-4 ${
            tx.type === "in" ? "border-green-400" : "border-pink-400"
          }`}
        >
          {tx.amount} {tx.type === "in" ? "from" : "to"} {tx.address}
        </li>
      ))}
      </ul>
    );
  }