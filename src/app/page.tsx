'use client';

import { Web3Wrapper } from '@/components/Web3Wrapper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import './globals.css';
import AboutSection from '@/components/AboutSection';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import FAQSection from '@/components/FAQSection';
import PartnersStack from '@/components/PartnerStack';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function Home() {
  return (
    <Web3Wrapper>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0d0d] text-white font-sans">
        <Navbar />
        <Hero />
        <AboutSection />
        <PartnersStack />
        <RoadmapTimeline />
        <FAQSection />
        <NewsletterCTA />
        <Footer />
      </div>
    </Web3Wrapper>
  );
}