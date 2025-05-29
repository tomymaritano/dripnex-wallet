'use client';

import Web3Wrapper from '@/components/Web3Wrapper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import './globals.css';

export default function Home() {
  return (
    <Web3Wrapper>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0d0d] text-white font-sans">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </Web3Wrapper>
  );
}