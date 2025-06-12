'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import TokenBalance from './TokenBalance';
import { ERC20Token } from '@/lib/networks';

interface Props {
    networkName: string;
    chainId: number;
    address: `0x${string}`;
    tokens: ERC20Token[];
    prices: Record<string, number>;
    initiallyOpen?: boolean;
}

export default function TokenGroup({ networkName, chainId, address, tokens, prices, initiallyOpen = false }: Props) {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    return (
        <div className="border border-white/10 rounded-xl backdrop-blur overflow-hidden">

            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
                <span>{networkName}</span>
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {/* Content */}
            {isOpen && (
                <div className="space-y-2 px-4 py-3 border-t border-white/10">
                    {/* Native balance */}
                    <TokenBalance address={address} chainId={chainId} />
                    {/* Tokens */}
                    {tokens.map((token) => (
                        <TokenBalance
                            key={token.address}
                            address={address}
                            chainId={chainId}
                            token={token}
                            price={token.coingeckoId ? prices[token.coingeckoId] : undefined}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}