'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/#services' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Pricing', href: '/#pricing' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=916370810878' },
        { name: 'GitHub', href: '#' },
        { name: 'LinkedIn', href: '#' },
        { name: 'Instagram', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/terms' },
        { name: 'Project Support', href: '/#contact' },
      ],
    },
  ];

  return (
    <footer className="relative w-full bg-[#02040a] border-t border-white/5 pt-12 md:pt-20 pb-8 md:pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-12 mb-12 md:mb-20">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase mb-4 md:mb-6 block hover:opacity-90 transition-opacity">
              <span>RG TECH</span>
            </Link>
            <p className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase leading-relaxed max-w-xs">
              Full-stack software development company in Odisha, India engineering high-performance web applications, mobile systems, and enterprise software.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white/20 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-8">
                {section.title}
              </h3>
              <ul className="space-y-2 md:space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-white/60 hover:text-white text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
            <span className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.4em]">
              SOFTWARE DEVELOPMENT COMPANY • ODISHA & INDIA
            </span>
          </div>
          
          <div className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.4em] text-center">
            © {currentYear} RG TECH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute -bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20vw] font-bold text-white uppercase tracking-tighter leading-none whitespace-nowrap translate-y-1/4">
          RG TECHNOLOGY
        </h2>
      </div>
    </footer>
  );
}
