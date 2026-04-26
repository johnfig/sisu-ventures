"use client";
import { useRef } from "react";
import { aurora } from "@/lib/tokens";
import { useInView } from "@/hooks/use-in-view";
import { useIsMobile } from "@/hooks/use-media-query";
import { Fade } from "./primitives/fade";
import { SectionHeader } from "./primitives/section-header";
import { pillars, PillarKind } from "@/data/pillars";

function PillarIcon({ kind, color, t }: { kind: PillarKind; color: string; t: number }) {
  const sz = 40;
  if (kind === "diamond")
    return (
      <svg width={sz} height={sz} viewBox="0 0 40 40" style={{ transform: `rotate(${Math.sin(t * 0.6) * 8}deg)`, transformOrigin: "center" }} aria-hidden>
        <path d="M20,4 L34,18 L20,36 L6,18 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6,18 L34,18 M20,4 L13,18 L20,36 M20,4 L27,18 L20,36" stroke={color} strokeWidth="1" opacity="0.6" />
      </svg>
    );
  if (kind === "spike")
    return (
      <svg width={sz} height={sz} viewBox="0 0 40 40" aria-hidden>
        <polyline
          points={`2,32 12,${24 + Math.sin(t * 1.4) * 2} 22,${20 + Math.sin(t * 1.4 + 1) * 3} 32,8 38,12`}
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M30,8 L38,8 L38,16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (kind === "wave")
    return (
      <svg width={sz} height={sz} viewBox="0 0 40 40" aria-hidden>
        <path d={`M2,20 Q11,${10 + Math.sin(t * 1.2) * 4} 20,20 T38,20`} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <path
          d={`M2,28 Q11,${22 + Math.sin(t * 1.2 + 0.7) * 3} 20,28 T38,28`}
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  return (
    <svg width={sz} height={sz} viewBox="0 0 40 40" aria-hidden>
      <path
        d={`M20,4 L26,18 L26,${28 + Math.sin(t * 2) * 1} L14,${28 + Math.sin(t * 2) * 1} L14,18 Z`}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="16" r="2.5" fill={color} />
      <path
        d={`M14,28 L10,${34 + Math.sin(t * 3) * 1} M26,28 L30,${34 + Math.sin(t * 3 + 1) * 1}`}
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function About({ t }: { t: number }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.15);
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "120px 20px 80px" : "180px 48px 140px",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <SectionHeader
        t={t}
        eyebrow="01 — About"
        title="A small set of | non-negotiables."
        sub="We acquire and build assets where we can add significant value, focusing on high cash flow opportunities with asymmetric upside potential."
        color={aurora.a1}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? 14 : 20,
          marginTop: isMobile ? 24 : 40,
        }}
      >
        {pillars.map((p, idx) => (
          <Fade key={p.i} show={seen} delay={0.2 + idx * 0.08}>
            <div
              style={{
                position: "relative",
                padding: isMobile ? 24 : 32,
                borderRadius: 22,
                minHeight: isMobile ? 200 : 240,
                background: "rgba(245,239,255,0.04)",
                border: "1px solid rgba(245,239,255,0.1)",
                backdropFilter: "blur(20px)",
                overflow: "hidden",
                cursor: "default",
                transition: "transform .35s cubic-bezier(.2,1,.3,1.05), background .3s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isMobile ? 20 : 32 }}>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,255,0.5)",
                    fontWeight: 600,
                  }}
                >
                  {p.i}
                </div>
                <PillarIcon kind={p.ic} color={p.c} t={t} />
              </div>
              <div
                style={{
                  fontSize: isMobile ? 24 : 30,
                  fontWeight: 500,
                  color: aurora.bone,
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                {p.k}
              </div>
              <div style={{ fontSize: 15.5, lineHeight: 1.55, color: "rgba(245,239,255,0.7)" }}>{p.v}</div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}
