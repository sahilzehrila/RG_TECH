'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { gsap } from '@/lib/gsap';

interface Plan {
  id: string;
  name: string;
  priceInr: string;
  priceUsd: string;
  badge?: string;
  description: string;
  features: string[];
  highlight: boolean;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Launch',
    priceInr: '₹9,999',
    priceUsd: '$120',
    badge: 'STARTUP',
    description: 'Perfect for startups, businesses, and high-performance websites.',
    features: [
      'Custom Responsive Web App',
      'SEO & Speed Optimization',
      'Business Email Integration',
      'Mobile-First Fluid UI/UX',
      '1 Month Technical Support'
    ],
    highlight: false
  },
  {
    id: 'pro',
    name: 'Pro Growth',
    priceInr: '₹24,999',
    priceUsd: '$299',
    badge: 'MOST POPULAR',
    description: 'Dynamic web apps, portals, and scalable business systems.',
    features: [
      'Full-Stack Web App / Portal',
      'CMS or E-Commerce Architecture',
      'Secure Auth & Database Setup',
      'Payment Gateway Integration',
      '3 Months Priority Support'
    ],
    highlight: true
  },
  {
    id: 'business',
    name: 'Business Suite',
    priceInr: '₹45,000+',
    priceUsd: '$549+',
    badge: 'ENTERPRISE READY',
    description: 'Tailored CRM, ERP, and bespoke software systems.',
    features: [
      'Custom CRM / ERP Development',
      'Database & REST API Architecture',
      'Admin Dashboard & Analytics',
      'Automated Workflow Pipelines',
      '6 Months Dedicated Support'
    ],
    highlight: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise & Apps',
    priceInr: 'Custom',
    priceUsd: 'Custom',
    badge: 'FULL SUITE',
    description: 'Full-scale enterprise platforms and mobile systems.',
    features: [
      'End-to-End Enterprise Software',
      'Android & Mobile App Development',
      'Cloud Infrastructure & DevOps',
      'Scalable Backend Architecture',
      '24/7 Dedicated Engineering Support'
    ],
    highlight: false
  }
];

function DesktopPricingCard({ plan, index, currency }: { plan: Plan; index: number; currency: 'INR' | 'USD' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const primaryPrice = currency === 'INR' ? plan.priceInr : plan.priceUsd;
  const secondaryPrice = currency === 'INR' ? plan.priceUsd : plan.priceInr;
  const secondaryLabel = currency === 'INR' ? 'USD' : 'INR';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY }}
      className={`group glass-morphism rounded-[2.2rem] p-6 lg:p-7 flex flex-col justify-between transition-colors duration-300 transform-gpu will-change-transform relative ${plan.highlight
          ? 'border-cyan-500/40 bg-white/[0.04] shadow-[0_0_50px_-15px_rgba(0,210,255,0.2)] ring-1 ring-cyan-500/30'
          : 'border-white/10 hover:border-white/20'
        }`}
    >
      <div>
        {plan.highlight ? (
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-5 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            <Sparkles size={11} className="text-black" />
            Most Popular
          </span>
        ) : (
          <span className="inline-flex items-center text-white/40 text-[8px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/5 bg-white/[0.02] mb-5">
            {plan.badge}
          </span>
        )}

        <h3 className="text-xl lg:text-2xl font-bold text-white uppercase tracking-tight mb-1.5">
          {plan.name}
        </h3>
        <p className="text-white/40 text-[9px] uppercase tracking-wider line-clamp-2 mb-6 min-h-[28px]">
          {plan.description}
        </p>

        <div className="mb-6 pb-6 border-b border-white/5">
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono block mb-1">Starting At</span>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl lg:text-4xl font-bold text-white tracking-tighter">
              {primaryPrice}
            </div>
            {plan.id !== 'enterprise' && (
              <span className="text-[10px] font-mono text-cyan-400/80 font-bold">
                ({secondaryPrice} {secondaryLabel})
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map(feature => (
            <li key={feature} className="flex items-start gap-2.5 text-white/60 text-[10px] uppercase tracking-wider font-medium">
              <Check size={12} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <MagneticButton>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.25em] text-[9px] transition-all ${plan.highlight
                ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                : 'border border-white/10 text-white hover:bg-white/5 hover:border-white/30'
              }`}
          >
            Get Quote
          </button>
        </MagneticButton>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [activePlanIndex, setActivePlanIndex] = useState(1); // Default to ₹24,999 (Pro)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for Header
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeMobilePlan = plans[activePlanIndex];
  const primaryMobilePrice = currency === 'INR' ? activeMobilePlan.priceInr : activeMobilePlan.priceUsd;
  const secondaryMobilePrice = currency === 'INR' ? activeMobilePlan.priceUsd : activeMobilePlan.priceInr;
  const secondaryMobileLabel = currency === 'INR' ? 'USD' : 'INR';

  return (
    <section ref={sectionRef} id="pricing" className="py-16 md:py-24 px-5 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8">
        <div>
          <h2 className="text-3xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase leading-tight">
            Pricing &<br className="md:hidden" /> Plans
          </h2>
          <p className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.6em] uppercase mt-2 md:mt-4">
            Transparent Software Development Packages // India & Global Clients
          </p>
        </div>

        {/* Currency Switcher: INR (₹) / USD ($) */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setCurrency('INR')}
            aria-label="Show prices in Indian Rupee"
            className={`px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all duration-300 flex items-center gap-1.5 ${currency === 'INR'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,210,255,0.25)]'
                : 'text-white/40 hover:text-white/70'
              }`}
          >
            <span>🇮🇳</span>
            <span>INR (₹)</span>
          </button>
          <button
            onClick={() => setCurrency('USD')}
            aria-label="Show prices in US Dollar"
            className={`px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all duration-300 flex items-center gap-1.5 ${currency === 'USD'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,210,255,0.25)]'
                : 'text-white/40 hover:text-white/70'
              }`}
          >
            <span>🇺🇸</span>
            <span>USD ($)</span>
          </button>
        </div>
      </div>

      {/* MOBILE VIEW: Clean Segmented Plan Switcher + Compact Card (Zero Weirdness) */}
      <div className="lg:hidden">
        {/* Segmented Plan Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-5">
          {plans.map((p, idx) => {
            const tabPrice = currency === 'INR' ? p.priceInr : p.priceUsd;
            return (
              <button
                key={p.id}
                onClick={() => setActivePlanIndex(idx)}
                className={`py-2.5 px-1 rounded-xl text-center transition-all duration-300 flex flex-col items-center justify-center ${activePlanIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.25)]'
                    : 'text-white/40 hover:text-white/70 border border-transparent'
                  }`}
              >
                <span className="text-[10px] sm:text-xs font-bold font-mono leading-tight">{tabPrice}</span>
                <span className="text-[7px] font-mono tracking-widest uppercase opacity-70 mt-0.5 truncate max-w-full">
                  {p.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Plan Compact Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeMobilePlan.id}-${currency}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`glass-morphism rounded-[1.8rem] p-5 sm:p-6 border transition-all ${activeMobilePlan.highlight
                ? 'border-cyan-500/40 bg-white/[0.04] shadow-[0_0_40px_-10px_rgba(0,210,255,0.18)] ring-1 ring-cyan-500/30'
                : 'border-white/10'
              }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[8px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  PACKAGE {String(activePlanIndex + 1).padStart(2, '0')} // {activeMobilePlan.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mt-0.5">
                  {activeMobilePlan.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-white/30 font-mono uppercase tracking-widest block">Starting At</span>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">
                  {primaryMobilePrice}
                </span>
                {activeMobilePlan.id !== 'enterprise' && (
                  <span className="text-[8px] font-mono text-cyan-400/80 font-bold block mt-0.5">
                    ({secondaryMobilePrice} {secondaryMobileLabel})
                  </span>
                )}
              </div>
            </div>

            <p className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-wider mb-4 leading-relaxed">
              {activeMobilePlan.description}
            </p>

            <div className="pt-3 border-t border-white/5 mb-5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block mb-2.5">
                Included Deliverables:
              </span>
              <ul className="space-y-2">
                {activeMobilePlan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-wider font-medium">
                    <Check size={12} className="text-cyan-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full py-3.5 rounded-xl font-black uppercase tracking-[0.25em] text-[9px] transition-all ${activeMobilePlan.highlight
                  ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                  : 'border border-white/10 text-white hover:bg-white/5'
                }`}
            >
              Get Project Quote →
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Swipe & Selector Hint */}
        <div className="mt-3 text-center">
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
            Showing prices in {currency === 'INR' ? 'INR (₹)' : 'USD ($)'} • Tap currency toggle above to switch
          </span>
        </div>
      </div>

      {/* DESKTOP VIEW: 4-Column Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-5">
        {plans.map((plan, index) => (
          <DesktopPricingCard key={plan.id} plan={plan} index={index} currency={currency} />
        ))}
      </div>
    </section>
  );
}
