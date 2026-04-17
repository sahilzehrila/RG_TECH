'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Internal routing logic (Secret)
    const random = Math.random();
    let targetNumber = '';
    
    if (random < 0.5) {
      targetNumber = '916370810878';
    } else if (random < 0.75) {
      targetNumber = '919348752685';
    } else {
      targetNumber = '919938303324';
    }

    const message = `*NEW INQUIRY: RG TECH*\n\n` +
                    `*IDENTIFIER:* ${formData.name.toUpperCase()}\n` +
                    `*CONTACT:* ${formData.email}\n` +
                    `*MODULE:* ${formData.service}\n` +
                    `*BRIEF:* ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase mb-8">
            Start the <br />Project
          </h2>
          <p className="text-white/40 text-xs md:text-sm tracking-[0.3em] uppercase max-w-md leading-relaxed mb-12">
            Initiate a direct link with our architectural team. We translate complex requirements into high-performance digital reality.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                <MessageSquare size={18} className="text-white/40 group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Direct Link</p>
                <p className="text-sm font-bold text-white uppercase tracking-tighter">Instant WhatsApp Support</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass-morphism rounded-[3rem] p-8 md:p-12 border-white/10 relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Identify Name</label>
                <input
                  required
                  type="text"
                  placeholder="JOHN DOE"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xs outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="CLIENT@COMPANY.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xs outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Required Module</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xs outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
              >
                <option className="bg-[#050914]" value="Web Development">Web Development</option>
                <option className="bg-[#050914]" value="CRM / ERP">CRM / ERP Systems</option>
                <option className="bg-[#050914]" value="Custom Software">Custom Software</option>
                <option className="bg-[#050914]" value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] ml-2">Detailed Brief</label>
              <textarea
                required
                rows={4}
                placeholder="DESCRIBE YOUR VISION..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xs outline-none focus:border-white/30 transition-all placeholder:text-white/10 resize-none"
              />
            </div>

            <button className="group w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Launch Project
              <Send size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
