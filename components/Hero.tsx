'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the spotlight movement
  const springConfig = { damping: 50, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [mouseX, mouseY]);

  const titleWords = "RG TECH".split("");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Spotlight Optimized with direct motion transforms to prevent glitches */}
      <motion.div 
        className="absolute w-[600px] h-[600px] pointer-events-none z-0 opacity-40 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 210, 255, 0.12), transparent 70%)",
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          left: 0,
          top: 0,
        }}
      />

      <div className="z-10 text-center px-5">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[10px] sm:text-xs md:text-sm text-cyan-500 font-bold tracking-[0.4em] uppercase mb-4 block"
        >
          Premier Software Development Studio
        </motion.p>

        <div className="overflow-hidden flex justify-center mb-6 md:mb-8">
          <h1 className="flex">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-bold text-white tracking-tighter hero-text leading-none block"
              >
                {word === " " ? "\u00A0" : word}
              </motion.span>
            ))}
          </h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[11px] sm:text-sm md:text-base text-white/50 font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-10 md:mb-12 leading-relaxed">
            The leading <span className="text-white">Software Solution in Odisha</span> engineering high-performance <span className="text-white">Web Applications</span>, 
            scalable <span className="text-white">Android Systems</span>, 
            and bespoke <span className="text-white">Enterprise Software</span> in India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
