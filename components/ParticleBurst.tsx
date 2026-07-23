'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  shape: 'circle' | 'star' | 'diamond';
}

interface ParticleBurstProps {
  trigger: boolean;
  type?: 'correct' | 'streak' | 'level_up';
  onComplete?: () => void;
}

const COLORS = ['#f5c2e7', '#cba6f7', '#89b4fa', '#a6e3a1', '#f9e2af', '#fab387'];

export default function ParticleBurst({
  trigger,
  type = 'correct',
  onComplete
}: ParticleBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Launch Canvas Confetti
    if (type === 'streak' || type === 'level_up') {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: COLORS
      });
    } else {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: COLORS
      });
    }

    // Generate motion particle burst state
    const particleCount = type === 'streak' ? 24 : 16;
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 80 + 60;
      return {
        id: Math.random(),
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        size: Math.random() * 10 + 6,
        color: COLORS[i % COLORS.length],
        angle,
        speed,
        shape: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'diamond' : 'circle'
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [trigger, type]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.2, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              x: p.x * 2.2,
              y: p.y * 2.2,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '9999px' : p.shape === 'diamond' ? '2px' : '4px',
              transform: p.shape === 'diamond' ? 'rotate(45deg)' : undefined,
              boxShadow: `0 0 12px ${p.color}`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
