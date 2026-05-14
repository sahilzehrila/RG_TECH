'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Columns, GalleryHorizontal, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';

const plans = [
  {
    name: 'MVP Launch',
    price: '₹10,000',
    description: 'Perfect for startups and local businesses.',
    features: ['Responsive Web Design', 'SEO Optimization', 'Business Email Setup', '1 Month Support', 'Speed Optimization'],
    highlight: false
  },
  {
    name: 'Business Suite',
    price: '₹45,000+',
    description: 'Custom CRM and specialized software solutions.',
    features: ['Custom CRM Development', 'Inventory Management', 'Payment Gateway Integration', 'API Development', 'Priority Support'],
    highlight: true
  },
  {
    name: 'Enterprise Growth',
    price: 'Custom',
    description: 'Digital marketing and full-stack architecture.',
    features: ['Digital Marketing Strategy', 'Full-Scale Custom Software', 'Mobile App Development', '24/7 Dedicated Support', 'Cloud Infrastructure'],
    highlight: false
  }
];

function PricingCard({ plan, index, view }: { plan: typeof plans[0], index: number, view: 'vertical' | 'horizontal' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group glass-morphism rounded-[2.5rem] flex-shrink-0 transition-all duration-500 ${
        view === 'vertical' ? "w-full p-8" : "w-[85vw] md:w-[450px] p-10 snap-center"
      } ${plan.highlight ? 'border-white/20 bg-white/5' : 'border-white/5'}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {plan.highlight && (
          <span className="inline-block bg-white text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            Recommended
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter mb-2">{plan.name}</h3>
        <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] mb-8">{plan.description}</p>
        <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-10">
          <span className="text-lg font-medium text-white/20 mr-2">From</span>
          {plan.price}
        </div>
        <ul className="space-y-4 mb-12">
          {plan.features.map(feature => (
            <li key={feature} className="flex items-center gap-3 text-white/50 text-[11px] font-medium uppercase tracking-wider">
              <Check size={12} className="text-white/20" />
              {feature}
            </li>
          ))}
        </ul>
        <MagneticButton>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all ${
              plan.highlight ? 'bg-white text-black hover:bg-gray-200' : 'border border-white/10 text-white hover:bg-white/5'
            }`}
          >
            Get Estimate
          </button>
        </MagneticButton>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [view, setView] = useState<'vertical' | 'horizontal'>('vertical');
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setView('vertical');
      } else {
        setView('horizontal');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsInteracting(true);
    resumeTimer.current = setTimeout(() => setIsInteracting(false), 5000);
  }, []);

  const startAutoScroll = useCallback(() => {
    if (view !== 'horizontal' || isInteracting) return;
    autoScrollTimer.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft >= (scrollWidth - clientWidth) - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const moveAmount = window.innerWidth < 768 ? clientWidth * 0.85 : 350;
          scrollContainerRef.current.scrollBy({ left: moveAmount, behavior: 'smooth' });
        }
      }
    }, 4500);
  }, [view, isInteracting]);

  useEffect(() => {
    startAutoScroll();
    return () => { if (autoScrollTimer.current) clearInterval(autoScrollTimer.current); };
  }, [startAutoScroll]);

  return (
    <section id="pricing" className="py-24 px-5 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase leading-tight">Service<br className="md:hidden" /> Architecture</h2>
          <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase mt-4">Transparent Software Development Pricing in Odisha // {view === 'horizontal' ? 'Active_Slide' : 'Static_Grid'}</p>
        </div>
      </div>
      <div className="relative">
        <div ref={scrollContainerRef} onMouseEnter={stopAutoScroll} onTouchStart={stopAutoScroll} className={`transition-all duration-700 ease-in-out ${view === 'vertical' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex overflow-x-auto gap-6 md:gap-10 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"}`}>
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} view={view} />
          ))}
        </div>
        {view === 'horizontal' && (
          <div className="mt-8 flex items-center gap-4 opacity-10">
            <div className="h-[1px] bg-white flex-1" />
            <span className="text-[8px] text-white uppercase tracking-[1em] font-bold">Continuous Service Navigation</span>
            <div className="h-[1px] bg-white flex-1" />
          </div>
        )}
      </div>
    </section>
  );
}
