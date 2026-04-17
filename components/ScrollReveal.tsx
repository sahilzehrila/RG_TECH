'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children, parallax = 0 }: { children: React.ReactNode, parallax?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, position: "relative" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
