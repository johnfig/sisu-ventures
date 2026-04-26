"use client";
import { CSSProperties } from "react";
import { aurora } from "@/lib/tokens";

type BlobProps = {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
  fast?: boolean;
};

function Blob({ cx, cy, r, color, opacity = 0.55, fast = false }: BlobProps) {
  const style: CSSProperties = {
    position: "absolute",
    left: `${cx}%`,
    top: `${cy}%`,
    width: `${r * 14}px`,
    height: `${r * 14}px`,
    transform: "translate(-50%, -50%)",
    backgroundImage: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
    opacity,
    filter: `blur(${fast ? 80 : 120}px)`,
    pointerEvents: "none",
    mixBlendMode: "screen",
    transition: fast ? "left .4s ease, top .4s ease" : "none",
  };
  return <div style={style} />;
}

function GrainOverlay({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>")`,
        zIndex: 1,
      }}
    />
  );
}

export function Atmosphere({ t, mouse }: { t: number; mouse: { x: number; y: number } }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${aurora.ink} 0%, ${aurora.ink2} 60%, ${aurora.ink} 100%)`,
        }}
      />
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
        <Blob cx={20 + Math.sin(t * 0.18) * 10} cy={25 + Math.cos(t * 0.22) * 8} r={48} color={aurora.a1} />
        <Blob cx={70 + Math.cos(t * 0.15) * 12} cy={50 + Math.sin(t * 0.2) * 10} r={52} color={aurora.a2} />
        <Blob cx={85 + Math.sin(t * 0.28) * 8} cy={20 + Math.cos(t * 0.18) * 6} r={36} color={aurora.a3} />
        <Blob cx={30 + Math.cos(t * 0.24) * 10} cy={75 + Math.sin(t * 0.16) * 8} r={42} color={aurora.a4} opacity={0.3} />
        <Blob cx={mouse.x * 100} cy={mouse.y * 100} r={28} color={aurora.a1} opacity={0.22} fast />
      </div>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(11,4,32,0.0) 0%, rgba(11,4,32,0.55) 90%)`,
        }}
      />
      <GrainOverlay opacity={0.25} />
    </>
  );
}
