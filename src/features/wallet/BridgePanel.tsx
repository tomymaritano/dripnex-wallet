'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { NETWORKS } from '@/lib/networks'
import { getLifiQuote } from '@/services/lifi'

export default function BridgePanel() {
  const [fromKey, setFromKey] = useState<keyof typeof NETWORKS>('ethereum')
  const [toKey, setToKey] = useState<keyof typeof NETWORKS>('polygon')
  const [token, setToken] = useState(NETWORKS['ethereum'].tokens[0])
  const [amount, setAmount] = useState('')
  const [quote, setQuote] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setQuote(null)
    try {
      const q = await getLifiQuote({
        fromChain: NETWORKS[fromKey].chainId,
        toChain: NETWORKS[toKey].chainId,
        fromToken: token.address,
        toToken: token.address,
        amount,
      })
      setQuote(q.estimate.toAmount)
    } catch (err) {
      console.error(err)
      setQuote('Error fetching quote')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/10 py-6 px-5 backdrop-blur bg-black/30 shadow-lg text-white space-y-6"
    >
      <form onSubmit={handleQuote} className="space-y-4 text-sm">
        <div>
          <label className="block text-gray-400 mb-1">From Chain</label>
          <select
            value={fromKey}
            onChange={(e) => setFromKey(e.target.value as keyof typeof NETWORKS)}
            className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white"
          >
            {Object.entries(NETWORKS).map(([k, n]) => (
              <option key={k} value={k}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">To Chain</label>
          <select
            value={toKey}
            onChange={(e) => setToKey(e.target.value as keyof typeof NETWORKS)}
            className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white"
          >
            {Object.entries(NETWORKS).map(([k, n]) => (
              <option key={k} value={k}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Token</label>
          <select
            value={token.address}
            onChange={(e) =>
              setToken(
                NETWORKS[fromKey].tokens.find((t) => t.address === e.target.value)!
              )
            }
            className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-white"
          >
            {NETWORKS[fromKey].tokens.map((t) => (
              <option key={t.address} value={t.address}>
                {t.symbol}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Amount</label>
          <input
            type="number"
            step="any"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-black rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Get Quote'}
        </button>
      </form>
      {quote && (
        <p className="text-xs text-center text-gray-300">Estimated received: {quote}</p>
      )}
    </motion.div>
  )
}
