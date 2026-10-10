'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 45, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Internal routing logic
    const random = Math.random();
    let targetNumber = '';
    
    if (random < 0.75) {
      targetNumber = '916370810878';
    } else {
      targetNumber = '919348752685';
    }

    const message = `*NEW PROJECT INQUIRY: RG TECH*\n\n` +
                    `*NAME:* ${formData.name.toUpperCase()}\n` +
                    `*EMAIL:* ${formData.email}\n` +
                    `*SERVICE:* ${formData.service}\n` +
                    `*DETAILS:* ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div ref={leftColRef}>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase mb-4 md:mb-8">
            Start Your <br />Project
          </h2>
          <p className="text-white/40 text-[11px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase max-w-md leading-relaxed mb-6 md:mb-12">
            Connect directly with our software development team in Odisha. We engineer robust web apps, Android systems, and bespoke software tailored to your business needs.
          </p>
          
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 sm:gap-6 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                <MessageSquare size={16} className="text-white/40 group-hover:text-white" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] text-white/20 uppercase tracking-widest mb-0.5 sm:mb-1">Direct Communication</p>
                <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-tighter">Instant WhatsApp Consultation</p>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={formCardRef}
          className="glass-morphism rounded-[1.8rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-8 md:p-12 border-white/10 relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="JOHN DOE"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white text-xs outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="CLIENT@COMPANY.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white text-xs outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Select Software Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white text-xs outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
              >
                <option className="bg-[#050914]" value="Web Development">Web Application Development</option>
                <option className="bg-[#050914]" value="Android Development">Android App Development</option>
                <option className="bg-[#050914]" value="CRM / ERP">Custom CRM / ERP Systems</option>
                <option className="bg-[#050914]" value="Custom Software">Bespoke Enterprise Software</option>
                <option className="bg-[#050914]" value="Academic Projects">Academic & Final Year Projects</option>
                <option className="bg-[#050914]" value="Graphic Design">UI/UX & Graphic Design</option>
                <option className="bg-[#050914]" value="Digital Marketing">SEO & Digital Marketing</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Project Requirements</label>
              <textarea
                required
                rows={3}
                placeholder="DESCRIBE YOUR SOFTWARE VISION, FEATURES, OR TIMELINE..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white text-xs outline-none focus:border-white/30 transition-all placeholder:text-white/10 resize-none"
              />
            </div>

            <button className="group w-full py-3.5 sm:py-5 bg-white text-black rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Send Inquiry via WhatsApp
              <Send size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
