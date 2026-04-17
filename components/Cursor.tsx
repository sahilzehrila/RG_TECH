'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [isMobile, setIsMobile] = useState(true);

  // Springs for smoother movement without re-renders
  const springX = useSpring(mouseX, { damping: 45, stiffness: 500, mass: 0.1 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 500, mass: 0.1 });
  
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference pointer-events-none z-[10000]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[10000]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
