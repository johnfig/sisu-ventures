"use client";
import { useRef } from "react";
import Image from "next/image";
import { aurora } from "@/lib/tokens";
import { useInView } from "@/hooks/use-in-view";
import { useIsMobile } from "@/hooks/use-media-query";
import { Fade } from "./primitives/fade";
import { SectionHeader } from "./primitives/section-header";

const credentials = [
  { k: "Built", v: "SISU → $1B exit" },
  { k: "Scaled", v: "Teespring · $0 → $60M" },
  { k: "Today", v: "RE + Equities + Build" },
];

function FounderPortrait({ t }: { t: number }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "1 / 1.15",
        borderRadius: 22,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${aurora.ink2}, ${aurora.ink})`,
        border: "1px solid rgba(245,239,255,0.12)",
        boxShadow: `0 30px 80px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(245,239,255,0.04)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -40,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(circle at 30% 20%, ${aurora.a1}55, transparent 55%), radial-gradient(circle at 80% 90%, ${aurora.a3}44, transparent 55%)`,
          filter: "blur(40px)",
          transform: `scale(${1 + Math.sin(t * 0.4) * 0.02})`,
          transition: "transform .6s",
        }}
      />
      <Image
        src="/john.jpeg"
        alt="John Figueiredo"
        fill
        sizes="(max-width: 768px) 100vw, 360px"
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center 28%",
          filter: "saturate(1.05) contrast(1.02)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(180deg, transparent 0%, transparent 55%, rgba(11,4,32,0.85) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: 22,
          boxShadow: `inset 0 0 0 1px rgba(245,239,255,0.08), inset 0 0 60px rgba(0,229,199,0.06)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(245,239,255,0.85)",
        }}
      >
        <span>John Figueiredo</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: aurora.a1 }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: aurora.a1,
              boxShadow: `0 0 8px ${aurora.a1}`,
            }}
          />
          Founder
        </span>
      </div>
    </div>
  );
}

export function Founder({ t }: { t: number }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.15);
  const isMobile = useIsMobile();

  return (
    <section
      id="founder"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "80px 20px" : "140px 48px",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <SectionHeader t={t} eyebrow="03 — Partners" title="Operator-led, | not consultant-led." color={aurora.a4} />

      <Fade show={seen} delay={0.15}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(280px, 360px) 1fr",
            gap: isMobile ? 32 : 56,
            alignItems: "start",
            padding: isMobile ? 24 : 48,
            borderRadius: 28,
            background: "rgba(245,239,255,0.04)",
            border: "1px solid rgba(245,239,255,0.1)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `radial-gradient(circle at 0% 0%, ${aurora.a4}33, transparent 50%), radial-gradient(circle at 100% 100%, ${aurora.a3}22, transparent 50%)`,
            }}
          />

          <FounderPortrait t={t} />

          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: aurora.a4,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Founder & Managing Partner
            </div>
            <div
              style={{
                fontSize: isMobile ? 36 : "clamp(40px, 4.4vw, 64px)",
                fontWeight: 500,
                color: aurora.bone,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: isMobile ? 20 : 28,
              }}
            >
              John Figueiredo
            </div>
            <p
              style={{
                fontSize: isMobile ? 15.5 : 17,
                lineHeight: 1.6,
                color: "rgba(245,239,255,0.78)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              John has an entrepreneurial background in finance and technology. He founded
              and scaled <span style={{ color: aurora.bone, fontWeight: 500 }}>SISU</span> to 100+ employees
              and a $100M+ revenue run rate before its acquisition in 2021 in the largest
              cannabis SPAC transaction in Canada. Previously, he led a global team at{" "}
              <span style={{ color: aurora.bone, fontWeight: 500 }}>Teespring</span>,
              driving a new revenue channel from $0 to $60M in 9 months. Today he focuses
              on real estate investing, building a portfolio of single- and multi-family
              properties in the Midwest.
            </p>

            <div style={{ marginTop: isMobile ? 26 : 36, display: "flex", flexWrap: "wrap", gap: isMobile ? 20 : 32 }}>
              {credentials.map((x) => (
                <div key={x.k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(245,239,255,0.5)",
                      fontWeight: 600,
                    }}
                  >
                    {x.k}
                  </span>
                  <span style={{ fontSize: 15, color: aurora.bone, fontWeight: 500 }}>{x.v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: isMobile ? 28 : 40 }}>
              <a
                href="mailto:john@sisuventures.co"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 24px",
                  borderRadius: 999,
                  background: aurora.bone,
                  color: aurora.ink,
                  fontWeight: 600,
                  fontSize: 14.5,
                  textDecoration: "none",
                  boxShadow: `0 12px 36px -12px ${aurora.a4}aa`,
                }}
              >
                Email John <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
}
