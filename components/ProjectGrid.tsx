'use client';

import { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import initialProjectsData from '@/data/projects.json';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags?: string[];
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  onSelect
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: Math.min((index % 6) * 0.05, 0.25) }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => onSelect(project)}
      style={{ rotateX, rotateY }}
      className="group glass-morphism rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.2rem] p-2.5 sm:p-4 md:p-5 border border-white/10 hover:border-cyan-500/40 transition-colors duration-300 active:scale-[0.98] cursor-pointer flex flex-col justify-between transform-gpu will-change-transform"
    >
      <div className="relative w-full">
        {/* Prominent Website Visual (Aspect 16/10) */}
        <div className="aspect-[16/10] w-full rounded-xl sm:rounded-[1.2rem] md:rounded-[1.4rem] overflow-hidden relative bg-black/70 border border-white/10 shadow-inner group-hover:border-cyan-500/30 transition-colors duration-300 transform-gpu">
          <div className="w-full h-full relative transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform">
            {project.imageUrl && (
              <Image 
                src={project.imageUrl} 
                alt={project.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                priority={index < 2}
                loading={index < 2 ? undefined : 'lazy'}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            
            {/* Desktop Hover Overlay */}
            <div className="hidden md:flex absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center pointer-events-none group-hover:pointer-events-auto z-10 gap-2 px-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white text-black font-black text-[9px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-1.5 hover:bg-gray-200 transition-colors active:scale-95"
              >
                View Details
              </button>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3.5 py-1.5 rounded-full bg-cyan-400 text-black font-black text-[9px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center gap-1 hover:bg-cyan-300 transition-colors active:scale-95"
              >
                Live Site <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          {/* Loader Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
              <span className="text-white/20 text-xs sm:text-sm font-bold uppercase tracking-tight text-center px-2">
                {project.title}
              </span>
            </div>
          )}

          {/* Project Number Pill */}
          <span className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[7px] sm:text-[8px] font-mono text-cyan-400 font-bold border border-white/10 z-10">
            PROJ_{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content Info Below Image */}
        <div className="mt-2.5 sm:mt-3.5 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between gap-1.5">
            <h3 className="text-xs sm:text-base font-bold text-white uppercase tracking-tight truncate group-hover:text-cyan-400 transition-colors leading-tight">
              {project.title}
            </h3>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`Open ${project.title} live demo`}
              className="p-1 -mr-1 rounded text-white/30 hover:text-cyan-400 hover:bg-white/5 transition-colors flex-shrink-0"
              aria-label={`Open ${project.title} live demo`}
            >
              <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="text-white/40 text-[8px] sm:text-[10px] md:text-xs leading-snug line-clamp-1 uppercase tracking-wider font-medium">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech Tags & CTA */}
      <div className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1 overflow-hidden">
          {(project.tags || ['WEB']).slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-[7px] sm:text-[8px] text-white/50 group-hover:text-white/80 font-mono font-bold uppercase tracking-wider border border-white/10 px-1.5 py-0.5 rounded bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[7px] sm:text-[8px] font-mono text-cyan-400 hover:text-cyan-300 font-bold tracking-widest flex items-center gap-1 flex-shrink-0 group/cta py-1 px-1.5 rounded hover:bg-cyan-500/10 transition-colors"
          title={`Visit ${project.title} live demo`}
        >
          LIVE DEMO <span className="transition-transform group-hover/cta:translate-x-0.5">→</span>
        </a>
      </div>
    </motion.div>
  );
});

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>(initialProjectsData as Project[]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [mounted, setMounted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Lock scroll & handle Escape key when modal is open
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, closeModal]);

  const filters = ['ALL', 'WEB', 'PLATFORMS', 'HEALTHCARE & ACADEMY'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    if (activeFilter === 'WEB') {
      return projects.filter(p => (p.tags || []).some(t => ['REACT', 'NEXT.JS', 'UI/UX', 'FULL-STACK'].includes(t.toUpperCase())));
    }
    if (activeFilter === 'PLATFORMS') {
      return projects.filter(p => (p.tags || []).some(t => ['SYSTEM', 'ENTERPRISE', 'COMMERCE', 'FINTECH', 'CRM'].includes(t.toUpperCase())));
    }
    if (activeFilter === 'HEALTHCARE & ACADEMY') {
      return projects.filter(p => (p.tags || []).some(t => ['HEALTHCARE', 'EDUCATION', 'DENTAL', 'ACADEMY'].includes(t.toUpperCase())));
    }
    return projects;
  }, [projects, activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12 gap-4 md:gap-6">
        <div className="text-left">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase leading-none">
            Projects
          </h2>
          <p className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.6em] uppercase mt-2 md:mt-4">
            Software Portfolio // {projects.length} Deployed Web & App Solutions
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,210,255,0.25)]'
                  : 'bg-white/[0.03] text-white/40 border border-white/5 hover:text-white/70'
              }`}
            >
              {filter} {filter === 'ALL' && `(${projects.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Grid on Mobile (showing 2 projects per row), 3-Column on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onSelect={openModal}
          />
        ))}

        {/* 12th Slot: Interactive Call to Action Card */}
        {activeFilter === 'ALL' && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group glass-morphism rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.2rem] p-3 sm:p-5 border border-dashed border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/[0.02] hover:bg-cyan-500/[0.05] transition-all duration-300 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] w-full rounded-xl sm:rounded-[1.2rem] bg-cyan-500/[0.05] border border-cyan-500/20 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                  <ExternalLink size={16} />
                </div>
                <span className="text-[7px] sm:text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  NEXT PROJECT SLOT
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-xs sm:text-base font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                  Your Software Here
                </h3>
                <p className="text-white/40 text-[8px] sm:text-[10px] uppercase tracking-wider font-medium line-clamp-2 mt-1">
                  Have a vision for your business? We engineer custom web & mobile apps.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">
                CUSTOM BUILD
              </span>
              <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
                START PROJECT <span>→</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Expanded Project Details Modal rendered via Portal to document.body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden flex items-center justify-center p-3 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/85 backdrop-blur-xl"
              />

              {/* Modal Card Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.96 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="glass-morphism rounded-[1.8rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-8 md:p-12 lg:p-14 relative border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-5xl bg-[#02040a]/95 z-10 m-auto"
              >
                <button 
                  onClick={closeModal} 
                  aria-label="Close dialog"
                  className="absolute top-4 right-4 md:top-7 md:right-7 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-lg z-50 active:scale-90"
                >
                  <X size={18} />
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
                  <div className="aspect-[16/10] sm:aspect-video rounded-[1.2rem] md:rounded-[2rem] overflow-hidden bg-black/60 border border-white/5 relative shadow-inner">
                    {selectedProject.imageUrl && (
                      <Image 
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="space-y-4 md:space-y-6 flex flex-col justify-center">
                    <div>
                      <span className="text-[8px] sm:text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                        PROJECT PREVIEW
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white hero-text tracking-tighter leading-tight uppercase">
                        {selectedProject.title}
                      </h2>
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed tracking-wider font-medium">
                      {selectedProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {(selectedProject.tags || []).map(tag => (
                        <span key={tag} className="text-[8px] sm:text-[9px] text-white/70 font-bold uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-cyan-400 text-black font-black hover:bg-cyan-300 transition-all uppercase tracking-[0.25em] text-[9px] sm:text-[10px] shadow-[0_0_25px_rgba(0,210,255,0.3)] active:scale-95"
                      >
                        Visit Live Site
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={closeModal}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all uppercase tracking-[0.2em] text-[9px] sm:text-[10px]"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
