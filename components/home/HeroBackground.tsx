'use client';

import dynamic from 'next/dynamic';

const MagicRings = dynamic(() => import('@/components/MagicRings'), { ssr: false });

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <MagicRings
        color="#3b82f6"
        colorTwo="#818cf8"
        ringCount={7}
        opacity={0.7}
        speed={0.65}
        attenuation={6}
        lineThickness={1.6}
        baseRadius={0.3}
        radiusStep={0.12}
        scaleRate={0.12}
        blur={0}
        followMouse={true}
        mouseInfluence={0.1}
        parallax={0.04}
        clickBurst={true}
      />
    </div>
  );
}
