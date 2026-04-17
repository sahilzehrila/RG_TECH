'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Columns, GalleryHorizontal } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags?: string[];
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'vertical' | 'horizontal'>('vertical');
  const [isInteracting, setIsInteracting] = useState(false);
  
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setView('vertical');
      } else {
        setView('horizontal');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsInteracting(true);
    
    resumeTimer.current = setTimeout(() => {
      setIsInteracting(false);
    }, 5000); // 5s resume
  }, []);

  const startAutoScroll = useCallback(() => {
    if (view !== 'horizontal' || isInteracting) return;
    autoScrollTimer.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft >= (scrollWidth - clientWidth) - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const moveAmount = window.innerWidth < 768 ? clientWidth * 0.85 : 400;
          scrollContainerRef.current.scrollBy({ left: moveAmount, behavior: 'smooth' });
        }
      }
    }, 2500);
  }, [view, isInteracting]);

  useEffect(() => {
    startAutoScroll();
    return () => { if (autoScrollTimer.current) clearInterval(autoScrollTimer.current); };
  }, [startAutoScroll]);

  const openModal = (project: Project) => {
    stopAutoScroll();
    setSelectedProject(project);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedProject(null);
  };

  function ProjectCard({ project, index }: { project: Project, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
    const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: index * 0.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        onClick={() => openModal(project)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group glass-morphism rounded-[2.5rem] cursor-pointer flex-shrink-0 transition-shadow duration-500 hover:shadow-[0_20px_80px_rgba(255,255,255,0.03)] active:scale-[0.98] ${
          view === 'vertical' ? "w-full p-6" : "w-[85vw] md:w-[600px] p-6 md:p-8 snap-center"
        }`}
      >
        <div style={{ transform: "translateZ(60px)" }} className="relative">
          <div className="aspect-video mb-8 overflow-hidden rounded-[2rem] relative bg-black/40 border border-white/5">
            <div className="w-full h-full transition-transform duration-1000 group-hover:scale-110 relative">
              {project.imageUrl ? (
                <Image 
                  src={project.imageUrl} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority={index < 3}
                  unoptimized // Since these are dynamic screenshots, optimization might be tricky on some providers
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/5 text-6xl md:text-8xl font-black uppercase">RG</div>
              )}
              <div className="absolute inset-0 bg-black/60 md:bg-black/40 opacity-0 md:group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm z-10">
                <span className="px-8 py-3 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-[0.3em]">
                  View Project
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter leading-none">{project.title}</h3>
              <span className="text-[9px] text-white/20 font-mono tracking-widest pt-1">PROJ_0{index + 1}</span>
            </div>
            <p className="text-white/40 text-[10px] md:text-xs leading-relaxed line-clamp-2 max-w-md font-medium uppercase tracking-wider">{project.description}</p>
            <div className="pt-2 flex flex-wrap gap-3">
              {(project.tags || ['WEB', 'CORE']).map(tag => (
                <span key={tag} className="text-[8px] text-white/50 font-bold uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <section id="projects" className="py-24 px-5 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="text-left">
          <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter hero-text uppercase">Projects</h2>
          <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase mt-4">Case Studies // {view === 'horizontal' ? 'Active_Slide' : 'Static_Grid'}</p>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={scrollContainerRef}
          onMouseEnter={stopAutoScroll}
          onMouseDown={stopAutoScroll}
          onTouchStart={stopAutoScroll}
          className={`transition-all duration-700 ease-in-out ${
            view === 'vertical' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "flex overflow-x-auto gap-6 md:gap-10 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
          }`}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {view === 'horizontal' && (
          <div className="mt-8 flex items-center gap-4 opacity-10">
            <div className="h-[1px] bg-white flex-1" />
            <span className="text-[8px] text-white uppercase tracking-[1em] font-bold">Continuous Project Scroll</span>
            <div className="h-[1px] bg-white flex-1" />
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && closeModal()}
        className="bg-transparent backdrop:backdrop-blur-3xl p-0 max-w-6xl w-full h-full md:h-auto outline-none border-none overflow-hidden"
      >
        <AnimatePresence>
          {selectedProject && (
            <div className="flex items-center justify-center min-h-screen p-4 md:p-10">
              <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="glass-morphism rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 lg:p-20 relative border-white/5 shadow-2xl overflow-y-auto max-h-[90vh] w-full">
                <button onClick={closeModal} className="absolute top-4 right-4 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:text-white transition-all text-xl z-50">×</button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black/40 border border-white/5 relative">
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
                  <div className="space-y-6 md:space-y-8">
                    <h2 className="text-3xl md:text-6xl lg:text-8xl font-bold text-white hero-text tracking-tighter leading-none uppercase">{selectedProject.title}</h2>
                    <p className="text-white/40 text-[10px] md:text-sm lg:text-base leading-relaxed uppercase tracking-[0.2em] font-medium">{selectedProject.description}</p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto text-center px-10 py-5 rounded-2xl bg-white text-black font-black hover:bg-gray-200 transition-all uppercase tracking-[0.3em] text-[10px]">Visit Live Site</a>
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
