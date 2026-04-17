'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

export default function Sparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const MAX_PARTICLES = 50; // Limit total particles for performance

    const createParticle = (x: number, y: number) => {
      if (particles.current.length >= MAX_PARTICLES) return;
      
      const count = 3; // Reduced count per interaction
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1.0,
          size: Math.random() * 2 + 0.5,
          color: '0, 210, 255' // Store as RGB for easier alpha manipulation
        });
      }
    };

    let lastInteractionTime = 0;
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastInteractionTime < 16) return; // Throttle to ~60fps creation
      lastInteractionTime = now;

      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      createParticle(x, y);
    };

    let lastScrollTime = 0;
    const handleScroll = () => {
      // No random particles on scroll to prevent "noisy" UI
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current = particles.current.filter(p => p.life > 0);
      
      // Batch drawing for performance
      ctx.shadowBlur = 0; // Disable expensive shadow blur
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03; // Faster fade out
        p.size *= 0.97;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.8})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
