"use client";
import { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  children: ReactNode;
  show: boolean;
  delay?: number;
  duration?: number;
  style?: CSSProperties;
};

export function Reveal({ children, show, delay = 0, duration = 1.1, style }: Props) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <span
        style={{
          display: "block",
          opacity: show ? 1 : 0,
          transition: `opacity ${duration}s ease ${delay}s`,
          ...style,
        }}
      >
        {children}
      </span>
    );
  }
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em", ...style }}>
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${show ? "0%" : "105%"})`,
          transition: `transform ${duration}s cubic-bezier(.16,.84,.27,1) ${delay}s`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
}
