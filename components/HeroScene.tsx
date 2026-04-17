'use client';

import { OrbitControls, TorusKnot } from '@react-three/drei';

export default function HeroScene() {
  return (
    <>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d2ff" />
      <TorusKnot args={[1, 0.35, 200, 32]}>
        <meshStandardMaterial
          color="#00d2ff"
          wireframe
          transparent
          opacity={0.15}
          emissive="#00d2ff"
          emissiveIntensity={0.5}
        />
      </TorusKnot>
    </>
  );
}
