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
      <div className="flex flex-col min-h-screen bg-[#070707] text-white font-sans">
        <Navbar />
        <Hero />
        <AboutSection />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent my-12" />
        <RoadmapTimeline />
        <PartnersStack />
        <FAQSection />
        <NewsletterCTA />
        <Footer />
      </div>
    </Web3Wrapper>
  );
}