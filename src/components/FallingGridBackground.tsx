'use client';

import Lottie from 'lottie-react';
import animationData from '../../public/animations/web3-network-4.json';
/**
 * Animated background visual using a Lottie animation.
 */
export default function Web3Visual() {
  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-full h-full max-w-4xl opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-black/40 pointer-events-none backdrop-blur-sm" />
    </div>
  );
}