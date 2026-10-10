'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Terms', href: '/terms' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[60] backdrop-blur-xl bg-[#02040a]/65 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white tracking-tighter uppercase group flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span>RG TECH</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(link => (
              <MagneticButton key={link.name}>
                <Link
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </MagneticButton>
            ))}
            <Link
              href="/#contact"
              className="text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.06] text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all active:scale-95"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-all"
          >
            {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
          </button>
        </div>

        {/* Reading Progress Indicator */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-[1px] bg-white origin-left w-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed bottom-0 left-0 w-full bg-[#02040a] border-t border-white/10 rounded-t-[3rem] z-[80] p-10 md:hidden`}
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-10" />
              <div className="flex flex-col gap-8">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-bold text-white uppercase tracking-tighter flex items-center justify-between group"
                    >
                      {link.name}
                      <span className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 pt-10 border-t border-white/5 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-[0.4em]">
                <span>RG TECH</span>
                <span>SOFTWARE COMPANY</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
