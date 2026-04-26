"use client";
import { useRef } from "react";
import { aurora } from "@/lib/tokens";
import { useInView } from "@/hooks/use-in-view";
import { useIsMobile } from "@/hooks/use-media-query";
import { Fade } from "./primitives/fade";
import { Reveal } from "./primitives/reveal";
import { GradientText } from "./primitives/gradient-text";
import { AuroraMark } from "./aurora-mark";

function ContactGlow({ t }: { t: number }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${20 + Math.sin(t * 0.4) * 8}%`,
          top: `${30 + Math.cos(t * 0.3) * 8}%`,
          width: 380,
          height: 380,
          borderRadius: "50%",
          backgroundImage: `radial-gradient(circle, ${aurora.a3} 0%, transparent 65%)`,
          opacity: 0.45,
          filter: "blur(80px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: `${15 + Math.cos(t * 0.35) * 8}%`,
          bottom: `${20 + Math.sin(t * 0.4) * 8}%`,
          width: 340,
          height: 340,
          borderRadius: "50%",
          backgroundImage: `radial-gradient(circle, ${aurora.a1} 0%, transparent 65%)`,
          opacity: 0.45,
          filter: "blur(80px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

export function Contact({ t }: { t: number }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.15);
  const isMobile = useIsMobile();

  const onJump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "80px 20px 60px" : "140px 48px 100px",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: isMobile ? 24 : 32,
          overflow: "hidden",
          padding: isMobile ? "60px 24px" : "100px 64px",
          textAlign: "center",
          background: "rgba(245,239,255,0.04)",
          border: "1px solid rgba(245,239,255,0.12)",
          backdropFilter: "blur(28px)",
        }}
      >
        <ContactGlow t={t} />

        <Fade show={seen}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(245,239,255,0.06)",
              border: "1px solid rgba(245,239,255,0.16)",
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(245,239,255,0.85)",
              marginBottom: isMobile ? 22 : 32,
              position: "relative",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: aurora.a4 }} />
            04 — Contact
          </div>
        </Fade>

        <h2
          style={{
            fontSize: isMobile ? "clamp(40px, 11vw, 56px)" : "clamp(56px, 7.4vw, 132px)",
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            margin: 0,
            color: aurora.bone,
            position: "relative",
          }}
        >
          <Reveal show={seen} delay={0.05}>Got a deal,</Reveal>
          <Reveal show={seen} delay={0.13}>
            <GradientText t={t} stops={[aurora.a4, aurora.a3, aurora.a2, aurora.a1]}>or a question?</GradientText>
          </Reveal>
        </h2>

        <Fade show={seen} delay={0.25} style={{ marginTop: isMobile ? 28 : 40, position: "relative" }}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:john@sisuventures.co"
              style={{
                background: aurora.bone,
                color: aurora.ink,
                padding: isMobile ? "14px 22px" : "16px 28px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: isMobile ? 14 : 15.5,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                maxWidth: "100%",
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>john@sisuventures.co</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </Fade>

        <Fade show={seen} delay={0.35} style={{ marginTop: isMobile ? 36 : 56, position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: isMobile ? 10 : 48,
              flexWrap: "wrap",
              fontSize: isMobile ? 10.5 : 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(245,239,255,0.55)",
              fontWeight: 600,
            }}
          >
            <span>Real Estate · Equities · Operating Companies</span>
            {!isMobile && <span style={{ opacity: 0.4 }} aria-hidden>·</span>}
            <span>Midwest, US</span>
          </div>
        </Fade>
      </div>

      <footer
        style={{
          marginTop: isMobile ? 36 : 56,
          paddingTop: isMobile ? 24 : 32,
          borderTop: "1px solid rgba(245,239,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 12,
          color: "rgba(245,239,255,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AuroraMark t={t} size={18} />
          <span>SISU Ventures · {new Date().getFullYear()}</span>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 16 : 24, fontSize: 12 }}>
          <a href="mailto:john@sisuventures.co" style={{ color: "rgba(245,239,255,0.55)", textDecoration: "none" }}>
            Email
          </a>
          <a href="#about" onClick={onJump("about")} style={{ color: "rgba(245,239,255,0.55)", textDecoration: "none" }}>
            About
          </a>
          <a href="#portfolio" onClick={onJump("portfolio")} style={{ color: "rgba(245,239,255,0.55)", textDecoration: "none" }}>
            Portfolio
          </a>
        </div>
      </footer>
    </section>
  );
}
