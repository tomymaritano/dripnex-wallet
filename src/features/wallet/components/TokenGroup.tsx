'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

export default function TokenGroup({
    networkName,
    chainId,
    address,
    tokens,
    prices,
    initiallyOpen = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    return (
        <div className="border border-white/10 rounded-xl backdrop-blur overflow-hidden">

            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
                <span>{networkName}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {/* Content */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100 py-3 px-4 border-t border-white/10' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <div className="space-y-2">
                    {/* Native balance */}
                    <TokenBalance address={address} chainId={chainId} />

                    {/* Tokens */}
                    {tokens.map((token) => {
                        const price = token.coingeckoId ? prices[token.coingeckoId] : undefined;
                        return (
                            <TokenBalance
                                key={token.address}
                                address={address}
                                chainId={chainId}
                                token={token}
                                price={typeof price === 'number' ? price : undefined} // Safe fallback
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}