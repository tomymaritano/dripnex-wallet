'use client';

import { Web3Wrapper } from '@/components/Web3Wrapper';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import FAQSection from '@/components/FAQSection';
import PartnersStack from '@/components/PartnerStack';
import JoinCommunity from '@/components/JoinCommunity';
import { motion } from 'framer-motion';
import './globals.css';
import ContributeSection from '@/components/ContributeSection';
import CryptoTickerMarquee from '@/components/CryptoTickerMarquee';

function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-12" />
  );
}

/**
 * Home page composed of several landing sections.
 */
export default function Home() {
  return (
    <Web3Wrapper>
      <motion.div
        className="flex flex-col min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <Navbar />
        <Hero />
        <AboutSection />
      <CryptoTickerMarquee />
        <SectionDivider />
        <RoadmapTimeline />
        <ContributeSection />
        <PartnersStack />
        <FAQSection />
        <JoinCommunity />
        <Footer />
      </motion.div>
    </Web3Wrapper>
  );
}