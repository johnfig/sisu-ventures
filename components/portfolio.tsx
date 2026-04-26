"use client";
import { useRef, useState } from "react";
import { aurora } from "@/lib/tokens";
import { useInView } from "@/hooks/use-in-view";
import { Fade } from "./primitives/fade";
import { SectionHeader } from "./primitives/section-header";
import { current, exits, PortfolioItem } from "@/data/portfolio";

function PortfolioRow({ n, s, r, c, geo, idx, seen }: PortfolioItem & { idx: number; seen: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <Fade show={seen} delay={0.15 + idx * 0.08}>
      <div
        className="aurora-portfolio-row"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "60px 1.1fr 1.4fr 200px 60px",
          alignItems: "center",
          padding: "32px 8px",
          gap: 24,
          borderBottom: "1px solid rgba(245,239,255,0.12)",
          transition: "padding .35s cubic-bezier(.2,1,.3,1.05)",
          paddingLeft: hover ? 24 : 8,
          paddingRight: hover ? 24 : 8,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(90deg, ${c}22, transparent 60%)`,
            opacity: hover ? 1 : 0,
            transition: "opacity .35s",
          }}
        />
        <div
          style={{
            position: "relative",
            fontSize: 12,
            letterSpacing: "0.18em",
            color: "rgba(245,239,255,0.5)",
            fontWeight: 600,
          }}
        >
          {String(idx + 1).padStart(2, "0")}
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: c,
              boxShadow: `0 0 ${hover ? 24 : 10}px ${c}cc`,
              transition: "box-shadow .35s",
              flex: "0 0 auto",
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 500, color: aurora.bone, letterSpacing: "-0.02em" }}>{n}</div>
        </div>
        <div style={{ position: "relative", fontSize: 15, color: "rgba(245,239,255,0.75)", lineHeight: 1.5 }}>{s}</div>
        <div
          style={{
            position: "relative",
            fontSize: 13,
            letterSpacing: "0.06em",
            color: "rgba(245,239,255,0.55)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span>{r}</span>
          <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7 }}>{geo}</span>
        </div>
        <div
          style={{
            position: "relative",
            textAlign: "right",
            fontSize: 22,
            color: c,
            opacity: hover ? 1 : 0.5,
            transform: hover ? "translateX(6px)" : "translateX(0)",
            transition: "transform .35s, opacity .25s",
          }}
          aria-hidden
        >
          ·
        </div>
      </div>
    </Fade>
  );
}

function ExitCard({ n, s, r, c, geo }: PortfolioItem) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        padding: 32,
        borderRadius: 22,
        overflow: "hidden",
        background: "rgba(245,239,255,0.04)",
        border: "1px solid rgba(245,239,255,0.1)",
        backdropFilter: "blur(20px)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .35s cubic-bezier(.2,1,.3,1.05)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(circle at 100% 0%, ${c}40, transparent 60%)`,
          opacity: hover ? 1 : 0.5,
          transition: "opacity .35s",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: c, fontWeight: 700 }}>{r}</div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(245,239,255,0.55)",
            fontWeight: 600,
          }}
        >
          {geo}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          fontSize: 30,
          fontWeight: 500,
          color: aurora.bone,
          letterSpacing: "-0.02em",
          marginBottom: 16,
        }}
      >
        {n}
      </div>
      <div style={{ position: "relative", fontSize: 15, lineHeight: 1.6, color: "rgba(245,239,255,0.75)" }}>{s}</div>
    </div>
  );
}

export function Portfolio({ t }: { t: number }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.1);

  return (
    <section
      id="portfolio"
      ref={ref}
      style={{ position: "relative", padding: "140px 48px", maxWidth: 1320, margin: "0 auto" }}
    >
      <SectionHeader
        t={t}
        eyebrow="02 — Portfolio"
        title="Current bets, | held with care."
        sub="A deliberately small book. Real estate, public equities, and operating companies — each one earns its place."
        color={aurora.a2}
      />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 40, borderTop: "1px solid rgba(245,239,255,0.12)" }}>
        {current.map((c, idx) => (
          <PortfolioRow key={c.n} {...c} idx={idx} seen={seen} />
        ))}
      </div>

      <div
        style={{
          marginTop: 96,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 11.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(245,239,255,0.55)",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: aurora.a3 }} />
        Exits
        <span style={{ flex: 1, height: 1, background: "rgba(245,239,255,0.12)" }} />
      </div>

      <div className="aurora-exit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 32 }}>
        {exits.map((e, idx) => (
          <Fade key={e.n} show={seen} delay={0.15 + idx * 0.08}>
            <ExitCard {...e} />
          </Fade>
        ))}
      </div>
    </section>
  );
}
