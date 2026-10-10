'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const titleWords = "RG TECH".split("");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic GSAP Intro Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
        .fromTo(
          lettersRef.current.filter(Boolean),
          { yPercent: 120, opacity: 0, rotateX: 30 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.035, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: -10 },
          { opacity: 0.35, y: 0, duration: 0.8 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="z-10 text-center px-5">
        <div className="flex justify-center mb-6">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] md:text-xs text-cyan-400 font-bold tracking-[0.3em] uppercase">
              Software Development Company
            </span>
          </div>
        </div>

        <div className="flex justify-center mb-6 md:mb-8">
          <h1 className="flex items-center justify-center flex-nowrap relative z-10 select-none">
            {titleWords.map((word, i) => (
              <span
                key={i}
                ref={(el) => { lettersRef.current[i] = el; }}
                className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-bold text-white tracking-tighter leading-none inline-block will-change-transform"
              >
                {word === " " ? "\u00A0" : word}
              </span>
            ))}
          </h1>
        </div>

        <div
          ref={descRef}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[11px] sm:text-sm md:text-base text-white/50 font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-10 md:mb-12 leading-relaxed">
            Software development company in Odisha building high-performance <span className="text-white">Web Applications</span>,
            scalable <span className="text-white">Android Apps</span>,
            and custom <span className="text-white">Enterprise Software</span>.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="flex justify-center"
        >
          <MagneticButton>
            <button
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-14 py-6 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,210,255,0.35)]"
            >
              <div className="scanline" />
              <span className="relative font-black uppercase tracking-[0.4em] text-[10px] md:text-xs flex items-center gap-3">
                Explore Solutions
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
      >
        <span className="text-[10px] text-cyan-500 uppercase tracking-[0.5em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
      </div>
    </section>
  );
}
