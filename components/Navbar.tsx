'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Modules', href: '/#pricing' },
    { name: 'Protocol', href: '/terms' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[60] backdrop-blur-lg bg-black/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white tracking-tighter uppercase">
            RG <span className="text-white/30">TECH</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12">
            {links.map(link => (
              <MagneticButton key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </MagneticButton>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-all"
          >
            {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
          </button>
        </div>

        {/* Global Neural Progress Bar */}
        <motion.div 
          style={{ scaleX: scrollYProgress }}
          className="h-[1px] bg-white origin-left w-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </nav>

      {/* Mobile Drawer (Bottom Sheet) */}
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
                <span>RG TECH v4.1</span>
                <span>OS ACTIVE</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
