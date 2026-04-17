'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('rg-tech-loaded')) {
      setLoading(false);
      return;
    }

    const duration = 5000; // 5 Seconds
    const startTime = Date.now();

    const updateLoader = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateLoader);
      } else {
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('rg-tech-loaded', 'true');
        }, 400);
      }
    };

    requestAnimationFrame(updateLoader);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="aperture-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            scaleX: 0,
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#02040a] flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            
            {/* 1. The Pulse Aperture */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Pulsing Outer Glow */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white rounded-full blur-3xl"
              />
              
              {/* Rotating Markers */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/20" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/20" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-4 bg-white/20" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-4 bg-white/20" />
              </motion.div>

              {/* Main Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray={`${progress * 2.8} 1000`}
                  className="transition-all duration-200"
                />
              </svg>

              {/* 2. Cinematic Counter */}
              <div className="flex items-baseline z-10">
                <motion.span 
                  className="text-8xl md:text-[10rem] font-black text-white tracking-tighter tabular-nums"
                >
                  {Math.round(progress)}
                </motion.span>
                <span className="text-xl md:text-2xl text-white/20 font-bold ml-2">%</span>
              </div>
            </div>

            {/* 3. Identity Tag */}
            <div className="mt-12 flex flex-col items-center gap-2">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-[10px] uppercase tracking-[1.5em] text-white font-bold ml-[1.5em]"
              >
                System_Syncing
              </motion.p>
              <div className="text-[7px] text-white/10 tracking-[0.4em] uppercase font-mono">
                RG_TECH_PROTCOCOL_v4.1
              </div>
            </div>
          </div>

          {/* 4. Scanning Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
