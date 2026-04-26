"use client";
import { ReactNode } from "react";
import { aurora } from "@/lib/tokens";

type Props = {
  children: ReactNode;
  t: number;
  angle?: number;
  stops?: string[];
};

export function GradientText({ children, t, angle = 95, stops }: Props) {
  const palette = stops || [aurora.a1, aurora.a2, aurora.a3, aurora.a4];
  const a = angle + Math.sin(t * 0.4) * 30;
  return (
    <span
      className="font-serif italic"
      style={{
        backgroundImage: `linear-gradient(${a}deg, ${palette.join(", ")})`,
        backgroundSize: "200% 100%",
        backgroundPosition: `${(t * 30) % 200}% 50%`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}
