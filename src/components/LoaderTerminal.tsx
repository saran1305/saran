'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LoaderTerminalProps {
  onComplete?: () => void;
}

export default function LoaderTerminal({ onComplete }: LoaderTerminalProps) {
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Show spinner for ~1.4s, then fade out and reveal the portfolio
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 450);
    }, 1400);

    // Safety net in case anything hangs
    const safetyTimer = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 4000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050608] transition-opacity duration-500 pointer-events-none ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/*
        SVG arc spinner:
        - r=13 gives circumference ≈ 81.7px
        - strokeDasharray="68"  → visible arc portion
        - strokeDashoffset="0"  → gap naturally at the trailing edge
        - rotation handled by Tailwind animate-spin (overridden to 0.9s linear)
        - motion-safe: skips rotation for prefers-reduced-motion; spinner still shows briefly
      */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="motion-safe:animate-spin"
        style={{ animationDuration: '0.9s', animationTimingFunction: 'linear' }}
        aria-hidden="true"
      >
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="68"
          strokeDashoffset="0"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
