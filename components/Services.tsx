'use client';

import { motion } from 'framer-motion';
import { Monitor, Smartphone, Cpu, Shield, Zap, Globe } from 'lucide-react';

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
  return (
    <section id="services" className="py-24 px-5 md:px-10 max-w-7xl mx-auto relative">
      <div className="mb-20">
        <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase">Expertise</h2>
        <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase mt-4">Core_Capabilities // Systems_Analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
