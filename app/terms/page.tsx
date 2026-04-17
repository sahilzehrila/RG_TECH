'use client';

import { useEffect, useState } from 'react';

export default function TermsPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-32 px-5 md:px-10">
      <div id="reading-progress" style={{ width: `${progress}%` }} />

      <h1 className="text-5xl md:text-8xl font-bold mb-16 text-white tracking-tighter hero-text uppercase">
        Service Protocols
      </h1>

      <div className="space-y-16 text-white/60 leading-relaxed text-xs md:text-sm uppercase tracking-widest">
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            01. Core Services
          </h2>
          <p className="pl-16 border-l border-white/5">
            RG TECH provides professional development in Web Architectures (starting ₹10,000), Custom CRM Systems, Enterprise Software, and Digital Marketing strategies. All projects are built on bespoke modern frameworks.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            02. Payment Architecture
          </h2>
          <div className="pl-16 border-l border-white/5 space-y-4">
            <p>Our standard milestone protocol for Indian Startups:</p>
            <ul className="list-none space-y-2 text-[10px]">
              <li>• 50% Advance for project initiation.</li>
              <li>• 30% Upon completion of core development/Beta.</li>
              <li>• 20% Before final deployment and source transfer.</li>
            </ul>
            <p>All prices are subject to custom requirements and scope changes.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            03. Delivery Timeline
          </h2>
          <p className="pl-16 border-l border-white/5">
            Basic web projects typically deploy within 7-14 business days. Custom software and CRMs are subject to a detailed timeline agreed upon during the technical audit phase.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            04. Maintenance & Support
          </h2>
          <p className="pl-16 border-l border-white/5">
            Post-deployment support is complimentary for the first 30 days. Extended maintenance and digital marketing retainers are billed on a monthly cycle starting after project completion.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            05. Intellectual Property
          </h2>
          <p className="pl-16 border-l border-white/5">
            Upon full payment of all dues, the client acquires ownership of the final deployed code. RG TECH retains the right to use non-proprietary code snippets and architectural patterns for future developments.
          </p>
        </section>

        <footer className="pt-20 border-t border-white/10 text-[9px] text-white/20 flex justify-between items-center">
          <span>RG TECH STARTUP PROTOCOL v4.1</span>
          <span>JURISDICTION: INDIA</span>
        </footer>
      </div>
    </article>
  );
}
