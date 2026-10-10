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
        Terms of Service
      </h1>

      <div className="space-y-16 text-white/60 leading-relaxed text-xs md:text-sm uppercase tracking-widest">
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            01. Core Software Services
          </h2>
          <p className="pl-16 border-l border-white/5">
            RG TECH provides professional software development in Web Applications (starting ₹10,000), Android Apps, Custom CRM & ERP Systems, and Enterprise Software solutions. All applications are engineered with modern, robust tech stacks.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            02. Payment Terms
          </h2>
          <div className="pl-16 border-l border-white/5 space-y-4">
            <p>Our standard milestone schedule for client projects:</p>
            <ul className="list-none space-y-2 text-[10px]">
              <li>• 50% Advance upon project initiation and requirement sign-off.</li>
              <li>• 30% Upon delivery of working core features / beta preview.</li>
              <li>• 20% Upon final deployment, domain linking, and handover.</li>
            </ul>
            <p>Custom software and enterprise scopes follow customized milestone schedules.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            03. Delivery Timeline
          </h2>
          <p className="pl-16 border-l border-white/5">
            Standard web applications typically deploy within 7–14 business days. Custom CRM/ERP systems and Android applications follow an agreed-upon delivery roadmap outlined during technical planning.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            04. Maintenance & Technical Support
          </h2>
          <p className="pl-16 border-l border-white/5">
            Post-launch technical support is complimentary for the initial 30 days. Extended software maintenance, server management, and feature enhancements are available on monthly support agreements.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tighter flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white/20" />
            05. Code Ownership & IP
          </h2>
          <p className="pl-16 border-l border-white/5">
            Upon receipt of full payment, full ownership of the application codebase and assets transfers to the client. RG TECH maintains ethical confidentiality for all client data and intellectual property.
          </p>
        </section>

        <footer className="pt-20 border-t border-white/10 text-[9px] text-white/30 flex justify-between items-center">
          <span>RG TECH • SOFTWARE DEVELOPMENT STUDIO</span>
          <span>ODISHA & INDIA</span>
        </footer>
      </div>
    </article>
  );
}
