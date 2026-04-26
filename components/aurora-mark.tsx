"use client";
import { aurora } from "@/lib/tokens";

export function AuroraMark({ t, size = 28 }: { t: number; size?: number }) {
  const id = `auroraGradMark-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientTransform={`rotate(${(t * 30) % 360}, 0.5, 0.5)`}
        >
          <stop offset="0" stopColor={aurora.a1} />
          <stop offset="0.5" stopColor={aurora.a2} />
          <stop offset="1" stopColor={aurora.a3} />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="12" fill={`url(#${id})`} />
      <circle cx="14" cy="14" r="4" fill={aurora.ink} />
    </svg>
  );
}
