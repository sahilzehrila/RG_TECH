'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch);
    
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  const titleWords = "RG TECH".split("");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 210, 255, 0.08), transparent 80%)`
        }}
      />

      <div className="z-10 text-center px-5">
        <div className="overflow-hidden flex justify-center mb-6 md:mb-8">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-bold text-white tracking-tighter hero-text leading-none block"
            >
              {word === " " ? "\u00A0" : word}
            </motion.span>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-[8px] sm:text-[10px] md:text-xs text-white/30 font-medium tracking-[0.4em] sm:tracking-[0.8em] uppercase mb-10 md:mb-12 block"
        >
          System Initializing // Advanced Architecture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center"
        >
          <MagneticButton>
            <button 
              onClick={() => { 
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-14 py-6 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <div className="scanline" />
              <span className="relative font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                Explore Solutions
              </span>
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[10px] text-cyan-500 uppercase tracking-[0.5em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
      </div>
    </section>
  );
}
