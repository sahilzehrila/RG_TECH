'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Color, Fog, Vector3 } from 'three';
import ThreeGlobe from 'three-globe';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type WorldProps = {
  globeConfig: GlobeConfig;
  data: any[];
};

function GlobeScene({ globeConfig, data }: WorldProps) {
  const { scene } = useThree();
  const [countries, setCountries] = useState<any>({ features: [] });

  useEffect(() => {
    fetch('/countries.geojson')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error loading map:", err));
  }, []);

  const globe = useMemo(() => {
    return new ThreeGlobe();
  }, []);

  useEffect(() => {
    if (globe && countries.features.length > 0) {
      // Color Sync with Website Theme
      const themeBg = new Color("#02040a");
      scene.fog = new Fog("#02040a", 200, 600);

      const globeMaterial = globe.globeMaterial() as any;
      globeMaterial.color = themeBg;
      globeMaterial.emissive = new Color("#00d2ff");
      globeMaterial.emissiveIntensity = 0.15;
      globeMaterial.shininess = 0.7;

      globe
        .showAtmosphere(true)
        .atmosphereColor("#00d2ff")
        .atmosphereAltitude(0.15)
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonColor(() => "rgba(0,210,255,0.7)")
        .arcsData(data)
        .arcColor((e: any) => e.color)
        .arcAltitude((e: any) => e.arcAlt)
        .arcStroke((e: any) => 0.5)
        .arcDashLength(globeConfig.arcLength || 0.9)
        .arcDashInitialGap((e: any) => e.order)
        .arcDashGap(15)
        .arcDashAnimateTime(globeConfig.arcTime || 1000)
        .pointsData(data.flatMap(arc => [
          { lat: arc.startLat, lng: arc.startLng, color: arc.color },
          { lat: arc.endLat, lng: arc.endLng, color: arc.color }
        ]))
        .pointColor((e: any) => e.color)
        .pointAltitude(0.01)
        .pointRadius(0.5);
    }
  }, [globe, countries, data, globeConfig, scene]);

  return <primitive object={globe} />;
}

export function World(props: WorldProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, isMobile ? 440 : 320], fov: 45 }} style={{ touchAction: 'none' }}>
        <ambientLight color="#00d2ff" intensity={1.5} />
        <pointLight position={[200, 200, 100]} intensity={2} color="#ffffff" />
        <GlobeScene {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={props.globeConfig.autoRotate}
          autoRotateSpeed={props.globeConfig.autoRotateSpeed}
        />
      </Canvas>
    </div>
  );
}
