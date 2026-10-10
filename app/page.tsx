import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectGrid from '@/components/ProjectGrid';

const GlobeDemo = dynamic(() => import('@/components/GlobeDemo').then((m) => m.GlobeDemo), {
  ssr: false,
  loading: () => <div className="h-[350px] md:h-[500px] w-full flex items-center justify-center text-white/5 uppercase tracking-widest text-[9px]">Initializing Global Engine...</div>
});

const Pricing = dynamic(() => import('@/components/Pricing'), {
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center text-white/10 uppercase tracking-widest text-[10px]">Loading Packages...</div>
});

const Contact = dynamic(() => import('@/components/Contact'), { 
  ssr: false 
});

const LiquidGlassController = dynamic(() => import('@/components/LiquidGlassController'), { 
  ssr: false 
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        <LiquidGlassController />
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
