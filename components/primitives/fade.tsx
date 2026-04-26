"use client";
import { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  children: ReactNode;
  show: boolean;
  delay?: number;
  y?: number;
  duration?: number;
  style?: CSSProperties;
};

export function Fade({ children, show, delay = 0, y = 10, duration = 0.9, style }: Props) {
  const reduced = useReducedMotion();
  const dy = reduced ? 0 : y;
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: `translateY(${show ? 0 : dy}px)`,
        transition: `opacity ${duration}s cubic-bezier(.2,.7,.1,1) ${delay}s, transform ${duration}s cubic-bezier(.2,.7,.1,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
