"use client";
import { useEffect, useState } from "react";
import { aurora } from "@/lib/tokens";
import { AuroraMark } from "./aurora-mark";
import { useIsMobile } from "@/hooks/use-media-query";

const items = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "founder", label: "Partners" },
  { id: "contact", label: "Contact" },
];

const sectionIds = ["home", "about", "portfolio", "founder", "contact"];

export function Nav({ t }: { t: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  const onJump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: isMobile ? 12 : 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: isMobile ? "calc(100% - 24px)" : "calc(100% - 40px)",
          maxWidth: 1320,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile
            ? "8px 8px 8px 16px"
            : scrolled
            ? "10px 14px 10px 22px"
            : "12px 16px 12px 24px",
          borderRadius: 999,
          background: scrolled ? "rgba(11,4,32,0.7)" : "rgba(245,239,255,0.04)",
          border: `1px solid rgba(245,239,255,${scrolled ? 0.1 : 0.08})`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "all .4s cubic-bezier(.2,.7,.1,1)",
        }}
      >
        <a
          href="#home"
          onClick={onJump("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
            fontSize: isMobile ? 13.5 : 15,
            letterSpacing: "0.02em",
            color: aurora.bone,
            textDecoration: "none",
          }}
        >
          <AuroraMark t={t} size={isMobile ? 22 : 26} />
          <span>SISU&nbsp;Ventures</span>
        </a>

        {!isMobile && (
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }} aria-label="Primary">
            {items.map((x) => (
              <a
                key={x.id}
                href={`#${x.id}`}
                onClick={onJump(x.id)}
                aria-current={active === x.id ? "page" : undefined}
                style={{
                  color: aurora.bone,
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 13.5,
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                  transition: "all .25s",
                  background: active === x.id ? "rgba(245,239,255,0.15)" : "transparent",
                  fontWeight: active === x.id ? 600 : 500,
                  position: "relative",
                }}
                onMouseEnter={(e) => { if (active !== x.id) e.currentTarget.style.background = "rgba(245,239,255,0.08)"; }}
                onMouseLeave={(e) => { if (active !== x.id) e.currentTarget.style.background = "transparent"; }}
              >
                {x.label}
              </a>
            ))}
          </nav>
        )}

        {!isMobile ? (
          <a
            href="mailto:john@sisuventures.co"
            style={{
              background: aurora.bone,
              color: aurora.ink,
              border: "none",
              padding: "11px 20px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13.5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              transition: "transform .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Email John
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: aurora.a3,
                animation: "auroraPulse 1.5s infinite",
              }}
            />
          </a>
        ) : (
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              border: "1px solid rgba(245,239,255,0.14)",
              background: "rgba(245,239,255,0.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <span
              style={{
                width: 16,
                height: 1.5,
                background: aurora.bone,
                borderRadius: 2,
                transform: open ? "translateY(3px) rotate(45deg)" : "none",
                transition: "transform .25s",
              }}
            />
            <span
              style={{
                width: 16,
                height: 1.5,
                background: aurora.bone,
                borderRadius: 2,
                transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
                transition: "transform .25s",
              }}
            />
          </button>
        )}
      </header>

      {isMobile && (
        <div
          aria-hidden={!open}
          style={{
            position: "fixed",
            top: 64,
            left: 12,
            right: 12,
            zIndex: 99,
            borderRadius: 22,
            background: "rgba(11,4,32,0.85)",
            border: "1px solid rgba(245,239,255,0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: open ? "auto" : "none",
            transition: "opacity .2s, transform .2s",
          }}
        >
          {items.map((x) => (
            <a
              key={x.id}
              href={`#${x.id}`}
              onClick={onJump(x.id)}
              style={{
                color: aurora.bone,
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: active === x.id ? 600 : 500,
                background: active === x.id ? "rgba(245,239,255,0.1)" : "transparent",
              }}
            >
              {x.label}
            </a>
          ))}
          <a
            href="mailto:john@sisuventures.co"
            onClick={() => setOpen(false)}
            style={{
              marginTop: 8,
              background: aurora.bone,
              color: aurora.ink,
              padding: "12px 16px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Email John
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: aurora.a3,
                animation: "auroraPulse 1.5s infinite",
              }}
            />
          </a>
        </div>
      )}
    </>
  );
}
