"use client";
import { useRef } from "react";
import { useTime } from "@/hooks/use-time";
import { useMouse } from "@/hooks/use-mouse";
import { Atmosphere } from "./atmosphere";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { About } from "./about";
import { Portfolio } from "./portfolio";
import { Founder } from "./founder";
import { Contact } from "./contact";

export function Site() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTime();
  const mouse = useMouse(ref);

  return (
    <div ref={ref} style={{ position: "relative", minHeight: "100vh" }}>
      <Atmosphere t={t} mouse={mouse} />
      <Nav t={t} />
      <main style={{ position: "relative", zIndex: 5 }}>
        <Hero t={t} />
        <About t={t} />
        <Portfolio t={t} />
        <Founder t={t} />
        <Contact t={t} />
      </main>
    </div>
  );
}
