'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Cpu, Zap, Code, ShieldCheck, Globe, Database } from 'lucide-react';

const STATUS_MESSAGES = [
  "Building Scalable Architecture...",
  "Loading Project Portfolio...",
  "Configuring Full-Stack Solutions...",
  "Preparing Modern Interfaces...",
  "Optimizing Performance...",
  "Software Development Ready."
];

const TECH_ICONS = [
  { icon: Cpu },
  { icon: Zap },
  { icon: Code },
  { icon: ShieldCheck },
  { icon: Globe },
  { icon: Database },
];

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  
  const springProgress = useSpring(0, {
    stiffness: 75,
    damping: 18,
    restDelta: 0.01
  });

  useEffect(() => {
    if (sessionStorage.getItem('rg-tech-loaded')) {
      setLoading(false);
      return;
    }

    const DURATION = 350;
    const startTime = Date.now();
    
    springProgress.set(100);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const targetMsgIndex = Math.min(
        Math.floor((elapsed / DURATION) * STATUS_MESSAGES.length),
        STATUS_MESSAGES.length - 1
      );
      setMsgIndex(targetMsgIndex);

      if (elapsed >= DURATION) {
        clearInterval(interval);
        setLoading(false);
        sessionStorage.setItem('rg-tech-loaded', 'true');
      }
    }, 16);

    return () => clearInterval(interval);
  }, [springProgress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="software-studio-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
        >
          {/* Top Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 overflow-hidden">
            <motion.div 
              style={{ scaleX: springProgress.get() / 100 }}
              className="w-full h-full bg-[#00d2ff] shadow-[0_0_15px_#00d2ff] origin-left"
            />
          </div>

          <div className="relative">
            {/* Pulsing Back Glow */}
            <div className="absolute inset-0 bg-[#00d2ff] rounded-full blur-[100px] opacity-10 animate-pulse pointer-events-none" />

            <div className="relative flex flex-col items-center gap-8">
              {/* Spinning Ring of Tech Icons */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] will-change-transform">
                  {TECH_ICONS.map((item, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${i * 60}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
                        <item.icon className="w-4 h-4 text-[#00d2ff]/60" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Central "RG" Logo */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ scale: [0.98, 1, 0.98] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center select-none pointer-events-none transform-gpu"
                >
                  <span className="text-7xl md:text-9xl font-black text-white tracking-tighter filter drop-shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                    RG
                  </span>
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent mt-2 opacity-50" />
                </motion.div>
              </div>

              {/* Status Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 h-6">
                  <span className="text-[10px] font-mono text-[#00d2ff] animate-pulse">●</span>
                  <div className="relative overflow-hidden w-64 text-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={msgIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium text-white/50"
                      >
                        {STATUS_MESSAGES[msgIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Software Badge */}
          <div className="absolute bottom-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 px-5 py-2.5 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#00d2ff] font-bold">Software Development</span>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">Web & App Engineering</span>
            </div>
            <p className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-mono">RG TECH • SOFTWARE COMPANY</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
