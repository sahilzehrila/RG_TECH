'use client';

import { useEffect, useRef } from 'react';

export default function LiquidGlassController() {
  const lensRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Honor reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isMounted = true;
    let idleId: any = null;
    let timeoutId: any = null;

    const initializeLiquidGlass = () => {
      // Dynamically load liquid-gl on client only
      import('liquid-gl')
        .then((mod) => {
          if (!isMounted) return;
          const initLiquidGL = mod.default || (window as any).liquidGL;
          if (typeof initLiquidGL !== 'function') return;

          try {
            const targets = document.querySelectorAll('.liquid-card');
            if (targets.length === 0) return;

            lensRef.current = initLiquidGL({
              target: '.liquid-card',
              snapshot: 'body',
              resolution: 1.0, // 1.0x resolution eliminates GPU texture overhead and runs at native 60-120fps
              engine: 'auto',
              zIndex: undefined,
              content: undefined,
              refraction: 0.01,
              aberration: 0.002,
              bevelDepth: 0.07,
              bevelWidth: 0.12,
              frost: 0,
              shadow: false, // Disabling GPU-heavy synthetic shadow avoids 2-pass blur per lens and prevents jank
              specular: true,
              reveal: 'fade',
              tilt: false,
              draggable: false,
              interaction: 'none',
              magnify: 1,
              tint: 'rgba(2, 6, 20, 0.35)',
              helper: false,
            });
          } catch (err) {
            console.warn('[liquidGL] Fallback active:', err);
          }
        })
        .catch(() => {});
    };

    // Defer initialization until the main thread is idle after first paint
    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(initializeLiquidGlass, { timeout: 250 });
    } else {
      timeoutId = setTimeout(initializeLiquidGlass, 120);
    }

    return () => {
      isMounted = false;
      if (idleId && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      try {
        if (Array.isArray(lensRef.current)) {
          lensRef.current.forEach((l) => l?.destroy?.());
        } else {
          lensRef.current?.destroy?.();
        }
      } catch {}
    };
  }, []);

  return null;
}
