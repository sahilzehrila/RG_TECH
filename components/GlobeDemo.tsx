"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#02040a",
    showAtmosphere: true,
    atmosphereColor: "#00d2ff",
    atmosphereAltitude: 0.15,
    emissive: "#00d2ff",
    emissiveIntensity: 0.05,
    shininess: 0.5,
    polygonColor: "rgba(0,210,255,0.7)",
    ambientLight: "#00d2ff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#00d2ff", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: colors[0] },
    { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: colors[1] },
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: colors[2] },
    { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: colors[0] },
    { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: colors[1] },
    { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: colors[2] },
    { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: colors[0] },
    { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[1] },
    { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: colors[2] },
  ];

  return (
    <div className="relative w-full py-10 md:py-32 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center lg:text-left order-1"
          >
            <h2 className="text-4xl md:text-7xl xl:text-8xl font-bold text-white tracking-tighter hero-text uppercase leading-none">
              Global <br className="hidden lg:block" /> Deployment Hub
            </h2>
            <p className="text-white/40 text-[9px] md:text-xs tracking-[0.8em] uppercase max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold">
              Connecting Global Creativity with Advanced Engineering
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[8px] text-white/40 uppercase tracking-[0.2em]">Network Status: Active</span>
              </div>
            </div>
          </motion.div>

          {/* Seamless Globe Wrapper */}
          <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-2 overflow-hidden lg:overflow-visible">
            <div className="w-full h-full origin-center">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
