"use client";
import { RefObject, useEffect, useState } from "react";

export function useMouse(ref: RefObject<HTMLElement>) {
  const [m, setM] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setM({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [ref]);
  return m;
}
