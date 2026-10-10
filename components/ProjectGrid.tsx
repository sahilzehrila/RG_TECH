'use client';

import { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group liquid-card glass-morphism rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.2rem] p-2.5 sm:p-4 md:p-5 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
    >
      <div style={{ transform: "translateZ(25px)" }} className="relative w-full">
        {/* Prominent Website Visual (Aspect 16/10) */}
        <div className="aspect-[16/10] w-full rounded-xl sm:rounded-[1.2rem] md:rounded-[1.4rem] overflow-hidden relative bg-black/70 border border-white/10 shadow-inner group-hover:border-cyan-500/30 transition-all duration-300">
          <div className="w-full h-full relative transition-transform duration-700 group-hover:scale-105">
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
                unoptimized 
              />
            )}
            
            {/* Desktop Hover Overlay */}
            <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center backdrop-blur-sm z-10">
              <span className="px-5 py-2 rounded-full bg-white text-black font-black text-[9px] uppercase tracking-[0.25em] shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-1.5">
                View Project <ArrowUpRight size={12} />
              </span>
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
            <ArrowUpRight size={13} className="text-white/30 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
          </div>

          <p className="text-white/40 text-[8px] sm:text-[10px] md:text-xs leading-snug line-clamp-1 uppercase tracking-wider font-medium">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech Tags & CTA */}
      <div style={{ transform: "translateZ(25px)" }} className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between gap-1.5">
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
        <span className="text-[7px] sm:text-[8px] font-mono text-cyan-400 font-bold tracking-widest flex items-center gap-0.5 flex-shrink-0">
          LIVE DEMO <span>→</span>
        </span>
      </div>
    </motion.div>
  );
});

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>(initialProjectsData as Project[]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  const dialogRef = useRef<HTMLDialogElement>(null);
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
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    setSelectedProject(null);
  }, []);

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
            className="group liquid-card glass-morphism rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.2rem] p-3 sm:p-5 border border-dashed border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/[0.02] hover:bg-cyan-500/[0.05] transition-all duration-300 active:scale-[0.98] cursor-pointer flex flex-col justify-between"
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

      {/* Expanded Project Details Dialog */}
      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && closeModal()}
        className="bg-transparent backdrop:backdrop-blur-3xl p-0 max-w-6xl w-full h-full md:h-auto outline-none border-none overflow-hidden m-auto"
      >
        <AnimatePresence>
          {selectedProject && (
            <div className="flex items-center justify-center min-h-screen p-4 md:p-10">
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                className="glass-morphism rounded-[1.8rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-8 md:p-14 lg:p-18 relative border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] w-full bg-[#02040a]/95"
              >
                <button 
                  onClick={closeModal} 
                  aria-label="Close dialog"
                  className="absolute top-4 right-4 md:top-8 md:right-8 w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all text-lg z-50 active:scale-90"
                >
                  <X size={18} />
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-14 items-center">
                  <div className="aspect-video rounded-[1.2rem] md:rounded-[2rem] overflow-hidden bg-black/60 border border-white/5 relative">
                    {selectedProject.imageUrl && (
                      <Image 
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="space-y-4 md:space-y-8">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white hero-text tracking-tighter leading-none uppercase">
                      {selectedProject.title}
                    </h2>
                    <p className="text-white/50 text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed uppercase tracking-[0.2em] font-medium">
                      {selectedProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.tags || []).map(tag => (
                        <span key={tag} className="text-[8px] sm:text-[9px] text-white/60 font-bold uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-black font-black hover:bg-gray-200 transition-all uppercase tracking-[0.3em] text-[9px] sm:text-[10px]"
                      >
                        Visit Live Site
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </dialog>
    </section>
  );
}
