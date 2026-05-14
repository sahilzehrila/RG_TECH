'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Monitor, Smartphone, Cpu, Shield, Zap, Globe, Download, Palette, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: <Monitor className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Web Development",
    description: "High-performance, responsive web applications built with Next.js, React, and modern full-stack architectures.",
    tags: ["React", "Next.js", "Full-stack"]
  },
  {
    icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Android Development",
    description: "Scalable and intuitive mobile experiences. Native and cross-platform solutions tailored for your business.",
    tags: ["Kotlin", "Flutter", "Mobile"]
  },
  {
    icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Software Solutions",
    description: "Bespoke enterprise software, CRM systems, and automation tools designed to optimize your operations.",
    tags: ["CRM", "ERP", "Automation"]
  },
  {
    icon: <Download className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Modded Software",
    description: "Premium modded applications and specialized software solutions. Cracked and enhanced versions for advanced utility.",
    tags: ["Mod APK", "Cracked", "Software"]
  },
  {
    icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Graphic Design",
    description: "Professional visual identity creation. Custom posters, logos, and high-impact graphic assets for your brand.",
    tags: ["Logos", "Posters", "Branding"]
  },
  {
    icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Academic Projects",
    description: "Comprehensive support for minor and major college projects. End-to-end builds including full documentation and technical guidance.",
    tags: ["B.Tech", "M.Tech", "Documentation"]
  },
  {
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Cloud & Security",
    description: "Secure cloud infrastructure and data protection. We ensure your digital assets are safe and always available.",
    tags: ["AWS", "Firebase", "DevOps"]
  },
  {
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10" />,
    title: "UI/UX Design",
    description: "Immersive digital interfaces focused on user engagement and seamless navigation across all devices.",
    tags: ["Figma", "Branding", "UI/UX"]
  },
  {
    icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Digital Strategy",
    description: "Strategic consulting to help you navigate the digital landscape and achieve sustainable growth.",
    tags: ["SEO", "Marketing", "Consulting"]
  }
];

export default function Services() {
  const row1 = services.slice(0, 5);
  const row2 = services.slice(5);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  
  const [isAutoPlaying1, setIsAutoPlaying1] = useState(true);
  const [isAutoPlaying2, setIsAutoPlaying2] = useState(true);
  
  const timer1 = useRef<NodeJS.Timeout | null>(null);
  const timer2 = useRef<NodeJS.Timeout | null>(null);
  
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  const startAnimation1 = () => {
    setIsAutoPlaying1(true);
    controls1.start({
      x: [0, -1500],
      transition: { duration: 35, repeat: Infinity, ease: "linear" }
    });
  };

  const startAnimation2 = () => {
    setIsAutoPlaying2(true);
    controls2.start({
      x: [-1500, 0],
      transition: { duration: 40, repeat: Infinity, ease: "linear" }
    });
  };

  useEffect(() => {
    startAnimation1();
    startAnimation2();
    return () => {
      if (timer1.current) clearTimeout(timer1.current);
      if (timer2.current) clearTimeout(timer2.current);
    };
  }, []);

  const handleInteraction1 = () => {
    setIsAutoPlaying1(false);
    controls1.stop();
    if (timer1.current) clearTimeout(timer1.current);
    timer1.current = setTimeout(() => startAnimation1(), 5000);
  };

  const handleInteraction2 = () => {
    setIsAutoPlaying2(false);
    controls2.stop();
    if (timer2.current) clearTimeout(timer2.current);
    timer2.current = setTimeout(() => startAnimation2(), 5000);
  };

  // Helper for infinite scroll visual items
  const infiniteItems1 = [...row1, ...row1, ...row1, ...row1];
  const infiniteItems2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="services" className="py-24 px-5 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <div className="mb-20">
        <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase">Expertise</h2>
        <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase mt-4">Core_Capabilities // Software Solutions Odisha & India</p>
      </div>

      {/* Mobile View: Independent Row Carousels */}
      <div className="md:hidden space-y-6 -mx-5">
        {/* Row 1: Left moving */}
        <div 
          ref={containerRef1}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          onTouchStart={handleInteraction1}
          onMouseDown={handleInteraction1}
          onScroll={handleInteraction1}
        >
          <motion.div 
            animate={isAutoPlaying1 ? controls1 : {}}
            className="flex gap-4 px-5"
          >
            {infiniteItems1.map((service, index) => (
              <div
                key={index}
                className="glass-morphism p-6 rounded-[2rem] border-white/5 flex-shrink-0 w-[75vw] snap-center"
              >
                <div className="text-cyan-500 mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{service.title}</h3>
                <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-wider mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[7px] text-white/30 font-bold border border-white/5 px-2 py-1 rounded-md uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right moving */}
        <div 
          ref={containerRef2}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          onTouchStart={handleInteraction2}
          onMouseDown={handleInteraction2}
          onScroll={handleInteraction2}
        >
          <motion.div 
            animate={isAutoPlaying2 ? controls2 : {}}
            className="flex gap-4 px-5"
          >
            {infiniteItems2.map((service, index) => (
              <div
                key={index}
                className="glass-morphism p-6 rounded-[2rem] border-white/5 flex-shrink-0 w-[75vw] snap-center"
              >
                <div className="text-cyan-500 mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{service.title}</h3>
                <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-wider mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[7px] text-white/30 font-bold border border-white/5 px-2 py-1 rounded-md uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Desktop View: Original Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="glass-morphism p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="text-cyan-500 mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
              {service.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">{service.title}</h3>
            <p className="text-white/40 text-[10px] md:text-xs leading-relaxed uppercase tracking-wider mb-8">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map(tag => (
                <span key={tag} className="text-[8px] text-white/30 font-bold border border-white/5 px-2 py-1 rounded-md uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
