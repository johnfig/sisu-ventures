"use client";
import { useRef } from "react";
import { aurora } from "@/lib/tokens";
import { useInView } from "@/hooks/use-in-view";
import { Reveal } from "./reveal";
import { Fade } from "./fade";
import { GradientText } from "./gradient-text";

type Props = {
  eyebrow: string;
  title: string;
  sub?: string;
  color?: string;
  t: number;
};

export function SectionHeader({ eyebrow, title, sub, color = aurora.a1, t }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, 0.3);
  const [head, tail] = title.split("|");
  return (
    <div ref={ref} style={{ marginBottom: 64, maxWidth: 880 }}>
      <Fade show={seen}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(245,239,255,0.06)",
            border: "1px solid rgba(245,239,255,0.14)",
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(245,239,255,0.85)",
            marginBottom: 24,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
          {eyebrow}
        </div>
      </Fade>
      <h2
        style={{
          fontSize: "clamp(44px, 5.6vw, 92px)",
          fontWeight: 500,
          lineHeight: 0.98,
          letterSpacing: "-0.03em",
          margin: 0,
          color: aurora.bone,
        }}
      >
        <Reveal show={seen} delay={0.05}>{head}</Reveal>
        {tail && (
          <Reveal show={seen} delay={0.13}>
            <GradientText t={t} stops={[color, aurora.a3, aurora.a2]}>{tail}</GradientText>
          </Reveal>
        )}
      </h2>
      {sub && (
        <Fade show={seen} delay={0.2} style={{ marginTop: 24 }}>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "rgba(245,239,255,0.7)", maxWidth: 640, margin: 0 }}>
            {sub}
          </p>
        </Fade>
      )}
    </div>
  );
}
