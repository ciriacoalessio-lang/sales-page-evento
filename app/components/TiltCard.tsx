'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '../lib/utils';

export interface TiltCardProps {
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
  effect?: 'gravitate' | 'evade';
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function TiltCard({
  tiltLimit = 12,
  scale = 1.03,
  perspective = 1200,
  effect = 'gravitate',
  spotlight = true,
  className,
  style,
  children,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    `perspective(${1200}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
  );
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [spotOpacity, setSpotOpacity] = useState(0);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xp = (e.clientX - rect.left) / rect.width;
    const yp = (e.clientY - rect.top) / rect.height;
    const sign = effect === 'gravitate' ? 1 : -1;
    const rotY = sign * (xp - 0.5) * tiltLimit * 2;
    const rotX = -sign * (yp - 0.5) * tiltLimit * 2;
    setTransform(
      `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`
    );
    setSpotPos({ x: xp * 100, y: yp * 100 });
    setSpotOpacity(1);
  }, [effect, tiltLimit, perspective, scale]);

  const onLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`);
    setSpotOpacity(0);
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('will-change-transform relative overflow-hidden', className)}
      style={{ transform, transition: 'transform 0.2s ease-out', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          style={{ opacity: spotOpacity, transition: 'opacity 0.3s' }}
        >
          <div
            className="absolute w-[200%] h-[200%] rounded-full"
            style={{
              left: `${spotPos.x}%`,
              top: `${spotPos.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(31,34,242,0.12) 0%, transparent 50%)',
            }}
          />
        </div>
      )}
    </div>
  );
}
