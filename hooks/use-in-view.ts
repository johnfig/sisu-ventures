"use client";
import { RefObject, useEffect, useState } from "react";

export function useInView(ref: RefObject<HTMLElement>, threshold = 0.2) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setSeen(true); }),
      { threshold, root: null }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
}
