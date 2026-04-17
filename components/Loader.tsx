'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Cpu, Zap, Code, ShieldCheck, Globe, Database } from 'lucide-react';

const STATUS_MESSAGES = [
  "Initializing Hardware...",
  "Powering Neural Core...",
  "Syncing Global Nodes...",
  "Optimizing Visual Cortex...",
  "Verifying Security Protocols...",
  "Establishing Secure Link...",
  "System fully operational."
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
  
  // Balanced high-performance progress tracking for 3s duration
  const springProgress = useSpring(0, {
    stiffness: 28, // Adjusted to reach 100 in ~2.8s
    damping: 15,
    restDelta: 0.01
  });

  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('rg-tech-loaded')) {
      setLoading(false);
      return;
    }

    // Set a strict 3-second lifecycle
    const DURATION = 3000;
    const startTime = Date.now();
    
    // Start spring towards 100
    springProgress.set(100);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressValue = springProgress.get();
      
      setDisplayProgress(progressValue);

      // Status message index based on actual time elapsed for accuracy
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
    }, 16); // High frequency (60fps) for buttery smooth numbers since we have a fixed time now

    return () => clearInterval(interval);
  }, [springProgress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="blinkit-futuristic-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden will-change-transform"
        >
          {/* 1. Blinkit Style Top Progress Bar (Neon) - Using motion for smoothness */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 overflow-hidden">
            <motion.div 
              style={{ scaleX: springProgress.get() / 100 }}
              className="w-full h-full bg-[#00d2ff] shadow-[0_0_15px_#00d2ff] origin-left"
            />
          </div>

          <div className="relative">
            {/* Optimized Pulsing Back Glow */}
            <div className="absolute inset-0 bg-[#00d2ff] rounded-full blur-[100px] opacity-10 animate-pulse pointer-events-none" />

            <div className="relative flex flex-col items-center gap-8">
              {/* Spinning Ring of Icons - Using CSS for core rotation to keep JS thread free */}
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

                {/* Central "RG" Logo - Hardware accelerated */}
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

          {/* 3. Blinkit Style Bottom Tagline (Futuristic Version) */}
          <div className="absolute bottom-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 px-5 py-2.5 bg-white/[0.03] rounded-full border border-white/10 backdrop-blur-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#00d2ff] font-bold">Latency</span>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">10ms Delivery</span>
            </div>
            <p className="text-[8px] uppercase tracking-[0.5em] text-white/10 font-mono">RG_TECH_v4.1.0_LATEST</p>
          </div>

          {/* Grain Overlay - Low opacity for performance */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] noise" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
