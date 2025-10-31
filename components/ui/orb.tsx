'use client';

import React, { useEffect, useRef } from 'react';

interface OrbProps {
  className?: string;
  size?: number;
  color?: string;
  blur?: number;
  opacity?: number;
}

export const Orb: React.FC<OrbProps> = ({
  className = '',
  size = 400,
  color = '#3b82f6',
  blur = 100,
  opacity = 0.3,
}) => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      orb.style.left = `${clientX}px`;
      orb.style.top = `${clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className={`pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        filter: `blur(${blur}px)`,
        opacity: opacity,
        zIndex: 1,
      }}
    />
  );
};
