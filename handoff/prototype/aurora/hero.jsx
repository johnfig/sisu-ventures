/* Aurora — Hero section (full viewport) — Sisu Ventures real content */

const Hero = ({ t, mouse }) => {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const tl = [80, 320, 700, 1100, 1500, 1900, 2300];
    const ids = tl.map((ms, i) => setTimeout(() => setPhase(i + 1), ms));
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh", width: "100%",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      padding: "140px 48px 200px", textAlign: "center", overflow: "hidden",
    }}>
      <Fade show={phase >= 2} delay={0} style={{ marginBottom: 36 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12, padding: "8px 16px",
          borderRadius: 999, background: "rgba(245,239,255,0.06)", border: "1px solid rgba(245,239,255,0.14)",
          fontSize: 12.5, letterSpacing: "0.04em", fontWeight: 500, color: "rgba(245,239,255,0.9)",
          backdropFilter: "blur(12px)",
        }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: AURORA.a1, animation: "auroraPulse 2s infinite" }} />
          A private investment company
        </div>
      </Fade>

      <h1 style={{
        fontSize: "clamp(72px, 9.4vw, 184px)", fontWeight: 600, lineHeight: 0.92,
        letterSpacing: "-0.04em", margin: 0, maxWidth: 1300, color: AURORA.bone,
      }}>
        <Reveal show={phase >= 1} delay={0}>We acquire,</Reveal>
        <Reveal show={phase >= 2} delay={0.08}>
          <GradientText t={t} stops={[AURORA.a1, AURORA.a2, AURORA.a3, AURORA.a4]}>we build.</GradientText>
        </Reveal>
      </h1>

      <Fade show={phase >= 4} delay={0.1} style={{ marginTop: 38 }}>
        <p style={{
          fontSize: 19.5, lineHeight: 1.55, maxWidth: 640, margin: "0 auto",
          color: "rgba(245,239,255,0.78)", fontWeight: 400,
        }}>
          <span style={{ color: AURORA.bone, fontWeight: 500 }}>Sisu Ventures</span> acquires and builds
          assets where we can add significant value — focused on high cash flow opportunities
          with asymmetric upside.
        </p>
      </Fade>

      <Fade show={phase >= 5} delay={0.15} style={{ marginTop: 44 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center" }}>
          <a href="#portfolio"
            onClick={(e) => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: AURORA.a3, color: AURORA.ink, border: "none", padding: "16px 28px",
              borderRadius: 999, fontWeight: 600, fontSize: 15.5, cursor: "pointer",
              boxShadow: `0 16px 48px -12px ${AURORA.a3}cc`, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10, transition: "transform .25s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}>
            See the portfolio <span>→</span>
          </a>
          <a href="#about"
            onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "transparent", color: AURORA.bone, border: "1px solid rgba(245,239,255,0.22)",
              padding: "16px 28px", borderRadius: 999, fontWeight: 500, fontSize: 15.5, cursor: "pointer",
              textDecoration: "none", transition: "all .25s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(245,239,255,0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            How we invest
          </a>
        </div>
      </Fade>

      {/* Floating stats row */}
      <Fade show={phase >= 6} delay={0.2} style={{ marginTop: 88, width: "100%", maxWidth: 920 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          padding: "26px 28px", borderRadius: 22,
          background: "rgba(245,239,255,0.04)", border: "1px solid rgba(245,239,255,0.1)",
          backdropFilter: "blur(28px)",
        }}>
          {[
            { k: "MHP Lots",        v: "1,100+",  c: AURORA.a1 },
            { k: "Housing Units",   v: "20+",     c: AURORA.a2 },
            { k: "Last Exit",       v: "$1B",     c: AURORA.a3 },
            { k: "Held",            v: "Long",    c: AURORA.a4 },
          ].map((x, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", gap: 6, alignItems: "center",
              borderRight: i < 3 ? "1px solid rgba(245,239,255,0.1)" : "none",
            }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,255,0.55)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: x.c }} />
                {x.k}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: AURORA.bone, letterSpacing: "-0.02em" }}>{x.v}</div>
            </div>
          ))}
        </div>
      </Fade>

      {/* scroll indicator */}
      <Fade show={phase >= 6} delay={0.6} style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,239,255,0.55)", fontWeight: 600,
        }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(180deg, rgba(245,239,255,0.4), transparent)", animation: "auroraScrollHint 2s ease-in-out infinite" }} />
        </div>
      </Fade>
    </section>
  );
};

window.AuroraHero = Hero;
