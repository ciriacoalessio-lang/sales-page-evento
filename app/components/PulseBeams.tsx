'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface ConnectionPoint { cx: number; cy: number; r: number }

interface BeamPath {
  path: string;
  gradientConfig: {
    initial: { x1: string; x2: string; y1: string; y2: string };
    animate: {
      x1: string | string[];
      x2: string | string[];
      y1: string | string[];
      y2: string | string[];
    };
    transition?: {
      duration?: number;
      repeat?: number;
      repeatType?: string;
      ease?: string;
      repeatDelay?: number;
      delay?: number;
    };
  };
  connectionPoints: ConnectionPoint[];
}

interface PulseBeamsProps {
  beams: BeamPath[];
  gradientColors: { start: string; middle: string; end: string };
  children?: React.ReactNode;
  svgWidth?: number;
  svgHeight?: number;
}

export const PulseBeams = ({
  beams,
  gradientColors,
  children,
  svgWidth = 900,
  svgHeight = 320,
}: PulseBeamsProps) => {
  const id = useId();

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* SVG beams — absolutely positioned behind content */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {beams.map((_, i) => (
            <motion.linearGradient
              key={`${id}-grad-${i}`}
              id={`${id}-grad-${i}`}
              gradientUnits="userSpaceOnUse"
              initial={_.gradientConfig.initial}
              animate={_.gradientConfig.animate as any}
              transition={_.gradientConfig.transition as any}
            >
              <stop offset="0%" stopColor={gradientColors.start} stopOpacity="0" />
              <stop offset="30%" stopColor={gradientColors.start} stopOpacity="1" />
              <stop offset="70%" stopColor={gradientColors.middle} stopOpacity="1" />
              <stop offset="100%" stopColor={gradientColors.end} stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>

        {/* Static dim paths */}
        {beams.map((beam, i) => (
          <path
            key={`${id}-dim-${i}`}
            d={beam.path}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
            fill="none"
          />
        ))}

        {/* Animated glowing paths */}
        {beams.map((beam, i) => (
          <path
            key={`${id}-beam-${i}`}
            d={beam.path}
            stroke={`url(#${id}-grad-${i})`}
            strokeWidth="2"
            fill="none"
          />
        ))}

        {/* Connection dots */}
        {beams.map((beam, i) =>
          beam.connectionPoints.map((pt, j) => (
            <circle
              key={`${id}-dot-${i}-${j}`}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          ))
        )}
      </svg>

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};
