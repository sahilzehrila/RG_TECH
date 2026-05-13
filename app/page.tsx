'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ScrollReveal from '@/components/ScrollReveal';

import { GlobeDemo } from '@/components/GlobeDemo';

// Dynamic imports for performance optimization
const ProjectGrid = dynamic(() => import('@/components/ProjectGrid'), { 
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center text-white/10 uppercase tracking-widest text-[10px]">Accessing_Repository...</div>
});

const Pricing = dynamic(() => import('@/components/Pricing'), { 
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center text-white/10 uppercase tracking-widest text-[10px]">Analyzing_Service_Stack...</div>
});

const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: false 
});

export default function Home() {
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 2000], [0, 400]);

  return (
    <main className="relative min-h-screen">
      {/* Floating RG Logo for Parallax */}
      <motion.div 
        style={{ y: logoY }}
        className="fixed top-1/4 right-5 md:right-20 opacity-[0.02] pointer-events-none z-0"
      >
        <div className="text-[15rem] md:text-[30rem] font-black text-white leading-none select-none uppercase tracking-tighter">
          RG
        </div>
      </motion.div>

      <div className="relative z-10">
        <Hero />
        
        <ScrollReveal parallax={50}>
          <Services />
        </ScrollReveal>

        <ScrollReveal parallax={40}>
          <ProjectGrid />
        </ScrollReveal>
        
        <ScrollReveal parallax={40}>
          <GlobeDemo />
        </ScrollReveal>

        <ScrollReveal parallax={30}>
          <Pricing />
        </ScrollReveal>
        
        <ScrollReveal parallax={20}>
          <Contact />
        </ScrollReveal>
      </div>
    </main>
  );
}
