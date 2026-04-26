/* Aurora — About (4 pillars), Portfolio (current + exits), Founder, Contact */

const SectionHeader = ({ eyebrow, title, sub, color = AURORA.a1, t }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref, 0.3);
  return (
    <div ref={ref} style={{ marginBottom: 64, maxWidth: 880 }}>
      <Fade show={seen}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px",
          borderRadius: 999, background: "rgba(245,239,255,0.06)", border: "1px solid rgba(245,239,255,0.14)",
          fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600,
          color: "rgba(245,239,255,0.85)", marginBottom: 24,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
          {eyebrow}
        </div>
      </Fade>
      <h2 style={{
        fontSize: "clamp(44px, 5.6vw, 92px)", fontWeight: 500, lineHeight: 0.98,
        letterSpacing: "-0.03em", margin: 0, color: AURORA.bone,
      }}>
        <Reveal show={seen} delay={0.05}>{title.split("|")[0]}</Reveal>
        {title.split("|")[1] && (
          <Reveal show={seen} delay={0.13}>
            <GradientText t={t} stops={[color, AURORA.a3, AURORA.a2]}>{title.split("|")[1]}</GradientText>
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
};

/* ---------- ABOUT — 4 investment pillars ---------- */

const About = ({ t }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref, 0.15);

  const pillars = [
    { i: "01", c: AURORA.a1, k: "Undervalued Assets",
      v: "Identifying and acquiring assets below their intrinsic value, creating immediate equity potential.",
      ic: "diamond" },
    { i: "02", c: AURORA.a2, k: "Forced Appreciation",
      v: "Implementing strategic improvements and operational efficiencies to drive value creation.",
      ic: "spike" },
    { i: "03", c: AURORA.a3, k: "High Cash Flow",
      v: "Focusing on assets that generate strong, consistent cash flows to ensure sustainable returns.",
      ic: "wave" },
    { i: "04", c: AURORA.a4, k: "Asymmetric Upside",
      v: "Targeting opportunities with limited downside risk and significant upside potential.",
      ic: "rocket" },
  ];

  return (
    <section id="about" ref={ref} style={{ position: "relative", padding: "180px 48px 140px", maxWidth: 1320, margin: "0 auto" }}>
      <SectionHeader t={t}
        eyebrow="01 — About"
        title="A small set of | non-negotiables."
        sub="We acquire and build assets where we can add significant value, focusing on high cash flow opportunities with asymmetric upside potential."
        color={AURORA.a1}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 40 }}>
        {pillars.map((p, idx) => (
          <Fade key={p.i} show={seen} delay={0.2 + idx * 0.08}>
            <div style={pillarCard(p.c)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,255,0.5)", fontWeight: 600 }}>
                  {p.i}
                </div>
                <PillarIcon kind={p.ic} color={p.c} t={t} />
              </div>
              <div style={{ fontSize: 30, fontWeight: 500, color: AURORA.bone, letterSpacing: "-0.02em", marginBottom: 12 }}>{p.k}</div>
              <div style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(245,239,255,0.7)" }}>{p.v}</div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

const pillarCard = (color) => ({
  position: "relative",
  padding: 32, borderRadius: 22, minHeight: 240,
  background: "rgba(245,239,255,0.04)", border: "1px solid rgba(245,239,255,0.1)",
  backdropFilter: "blur(20px)",
  overflow: "hidden", cursor: "default",
  transition: "transform .35s cubic-bezier(.2,1,.3,1.05), background .3s",
});

const PillarIcon = ({ kind, color, t }) => {
  const sz = 40;
  if (kind === "diamond") return (
    <svg width={sz} height={sz} viewBox="0 0 40 40" style={{ transform: `rotate(${Math.sin(t * 0.6) * 8}deg)`, transformOrigin: "center" }}>
      <path d="M20,4 L34,18 L20,36 L6,18 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6,18 L34,18 M20,4 L13,18 L20,36 M20,4 L27,18 L20,36" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
  if (kind === "spike") return (
    <svg width={sz} height={sz} viewBox="0 0 40 40">
      <polyline points={`2,32 12,${24 + Math.sin(t * 1.4) * 2} 22,${20 + Math.sin(t * 1.4 + 1) * 3} 32,8 38,12`}
        fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30,8 L38,8 L38,16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
  if (kind === "wave") return (
    <svg width={sz} height={sz} viewBox="0 0 40 40">
      <path d={`M2,20 Q11,${10 + Math.sin(t * 1.2) * 4} 20,20 T38,20`}
        fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d={`M2,28 Q11,${22 + Math.sin(t * 1.2 + 0.7) * 3} 20,28 T38,28`}
        fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
  if (kind === "rocket") return (
    <svg width={sz} height={sz} viewBox="0 0 40 40">
      <path d={`M20,4 L26,18 L26,${28 + Math.sin(t * 2) * 1} L14,${28 + Math.sin(t * 2) * 1} L14,18 Z`}
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="20" cy="16" r="2.5" fill={color} />
      <path d={`M14,28 L10,${34 + Math.sin(t * 3) * 1} M26,28 L30,${34 + Math.sin(t * 3 + 1) * 1}`}
        stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
  return null;
};

/* ---------- PORTFOLIO — current bets + exits ---------- */

const Portfolio = ({ t }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref, 0.1);

  const current = [
    { n: "Workforce Housing",
      s: "20+ workforce housing properties across the Midwest, scaling to 1,000+ over the next decade. Multi-family and single-family value-add.",
      r: "Active · 2024–", c: AURORA.a1, geo: "Midwest" },
    { n: "Mobile Home Parks",
      s: "1,100+ MHP lots across the Midwest. Infill value-add: occupancy, infrastructure, and management.",
      r: "Active · Ongoing", c: AURORA.a2, geo: "Midwest" },
    { n: "Value Equities",
      s: "Concentrated book of low P/E public equities — durable competitive advantages, stable earnings, long-term compounding.",
      r: "Active · Public Markets", c: AURORA.a5, geo: "Public" },
    { n: "Stealth Startup",
      s: "Stay tuned.",
      r: "In Build · 2026", c: AURORA.a4, geo: "Stealth" },
  ];

  const exits = [
    { n: "SISU Extracts",
      s: "Scaled to $100M+ annual revenue, 3,000% growth over three years, 150+ employees. Exited via the largest cannabis SPAC in Canadian history — a $1B transaction.",
      r: "Exit · 2021", c: AURORA.a3, geo: "$1B IPO" },
    { n: "Plaito",
      s: "AI-powered tutor unlocking human potential through personalized learning. 1.2M+ downloads, 200K+ weekly active users. Walked from a multi-billion-dollar acquisition that wasn't the right fit.",
      r: "Exit · Walked", c: AURORA.a2, geo: "AI Edtech" },
  ];

  return (
    <section id="portfolio" ref={ref} style={{ position: "relative", padding: "140px 48px", maxWidth: 1320, margin: "0 auto" }}>
      <SectionHeader t={t}
        eyebrow="02 — Portfolio"
        title="Current bets, | held with care."
        sub="A deliberately small book. Real estate, public equities, and operating companies — each one earns its place."
        color={AURORA.a2}
      />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 40, borderTop: "1px solid rgba(245,239,255,0.12)" }}>
        {current.map((c, idx) => <PortfolioRow key={c.n} {...c} idx={idx} seen={seen} />)}
      </div>

      <div style={{
        marginTop: 96, display: "flex", alignItems: "center", gap: 16,
        fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600,
        color: "rgba(245,239,255,0.55)",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: AURORA.a3 }} />
        Exits
        <span style={{ flex: 1, height: 1, background: "rgba(245,239,255,0.12)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 32 }}>
        {exits.map((e, idx) => (
          <Fade key={e.n} show={seen} delay={0.15 + idx * 0.08}>
            <ExitCard {...e} t={t} />
          </Fade>
        ))}
      </div>
    </section>
  );
};

const PortfolioRow = ({ n, s, r, c, geo, idx, seen }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Fade show={seen} delay={0.15 + idx * 0.08}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          position: "relative", display: "grid",
          gridTemplateColumns: "60px 1.1fr 1.4fr 200px 60px",
          alignItems: "center", padding: "32px 8px", gap: 24,
          borderBottom: "1px solid rgba(245,239,255,0.12)",
          transition: "padding .35s cubic-bezier(.2,1,.3,1.05)",
          paddingLeft: hover ? 24 : 8, paddingRight: hover ? 24 : 8,
        }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 14, pointerEvents: "none",
          backgroundImage: `linear-gradient(90deg, ${c}22, transparent 60%)`,
          opacity: hover ? 1 : 0, transition: "opacity .35s",
        }} />
        <div style={{ position: "relative", fontSize: 12, letterSpacing: "0.18em", color: "rgba(245,239,255,0.5)", fontWeight: 600 }}>
          {String(idx + 1).padStart(2, "0")}
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%", background: c,
            boxShadow: `0 0 ${hover ? 24 : 10}px ${c}cc`, transition: "box-shadow .35s",
          }} />
          <div style={{ fontSize: 26, fontWeight: 500, color: AURORA.bone, letterSpacing: "-0.02em" }}>{n}</div>
        </div>
        <div style={{ position: "relative", fontSize: 15, color: "rgba(245,239,255,0.75)", lineHeight: 1.5 }}>{s}</div>
        <div style={{ position: "relative", fontSize: 13, letterSpacing: "0.06em", color: "rgba(245,239,255,0.55)", display: "flex", flexDirection: "column", gap: 4 }}>
          <span>{r}</span>
          <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7 }}>{geo}</span>
        </div>
        <div style={{
          position: "relative", textAlign: "right", fontSize: 22, color: c, opacity: hover ? 1 : 0.5,
          transform: hover ? "translateX(6px)" : "translateX(0)", transition: "transform .35s, opacity .25s",
        }}>·</div>
      </div>
    </Fade>
  );
};

const ExitCard = ({ n, s, r, c, geo, t }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", padding: 32, borderRadius: 22, overflow: "hidden",
        background: "rgba(245,239,255,0.04)", border: "1px solid rgba(245,239,255,0.1)",
        backdropFilter: "blur(20px)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .35s cubic-bezier(.2,1,.3,1.05)",
      }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle at 100% 0%, ${c}40, transparent 60%)`,
        opacity: hover ? 1 : 0.5, transition: "opacity .35s",
      }} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: c, fontWeight: 700 }}>{r}</div>
        <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,255,0.55)", fontWeight: 600 }}>{geo}</div>
      </div>
      <div style={{ position: "relative", fontSize: 30, fontWeight: 500, color: AURORA.bone, letterSpacing: "-0.02em", marginBottom: 16 }}>{n}</div>
      <div style={{ position: "relative", fontSize: 15, lineHeight: 1.6, color: "rgba(245,239,255,0.75)" }}>{s}</div>
    </div>
  );
};

/* ---------- FOUNDER — John Figueiredo ---------- */

const Founder = ({ t }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref, 0.15);

  return (
    <section id="founder" ref={ref} style={{ position: "relative", padding: "140px 48px", maxWidth: 1320, margin: "0 auto" }}>
      <SectionHeader t={t}
        eyebrow="03 — Partners"
        title="Operator-led, | not consultant-led."
        color={AURORA.a4}
      />

      <Fade show={seen} delay={0.15}>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(280px, 360px) 1fr", gap: 56, alignItems: "start",
          padding: 48, borderRadius: 28,
          background: "rgba(245,239,255,0.04)", border: "1px solid rgba(245,239,255,0.1)",
          backdropFilter: "blur(20px)", overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `radial-gradient(circle at 0% 0%, ${AURORA.a4}33, transparent 50%), radial-gradient(circle at 100% 100%, ${AURORA.a3}22, transparent 50%)`,
          }} />

          <FounderPortrait t={t} />

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: AURORA.a4, fontWeight: 700, marginBottom: 12 }}>
              Founder & Managing Partner
            </div>
            <div style={{ fontSize: "clamp(40px, 4.4vw, 64px)", fontWeight: 500, color: AURORA.bone, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 28 }}>
              John Figueiredo
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(245,239,255,0.78)", margin: 0, maxWidth: 640 }}>
              John has an entrepreneurial background in finance and technology. He founded
              and scaled <span style={{ color: AURORA.bone, fontWeight: 500 }}>SISU</span> to 100+ employees
              and a $100M+ revenue run rate before its acquisition in 2021 in the largest
              cannabis SPAC transaction in Canada. Previously, he led a global team at <span style={{ color: AURORA.bone, fontWeight: 500 }}>Teespring</span>,
              driving a new revenue channel from $0 to $60M in 9 months. Today he focuses
              on real estate investing, building a portfolio of single- and multi-family
              properties in the Midwest.
            </p>

            <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 32 }}>
              {[
                { k: "Built", v: "SISU → $1B exit" },
                { k: "Scaled", v: "Teespring · $0 → $60M" },
                { k: "Today", v: "RE + Equities + Build" },
              ].map((x, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,255,0.5)", fontWeight: 600 }}>{x.k}</span>
                  <span style={{ fontSize: 16, color: AURORA.bone, fontWeight: 500 }}>{x.v}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <a href="mailto:john@sisuventures.co" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 24px", borderRadius: 999,
                background: AURORA.bone, color: AURORA.ink,
                fontWeight: 600, fontSize: 14.5, textDecoration: "none",
                boxShadow: `0 12px 36px -12px ${AURORA.a4}aa`,
              }}>
                Email John <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

const FounderPortrait = ({ t }) => (
  <div style={{
    position: "relative", aspectRatio: "1 / 1.15", borderRadius: 22, overflow: "hidden",
    background: `linear-gradient(135deg, ${AURORA.ink2}, ${AURORA.ink})`,
    border: "1px solid rgba(245,239,255,0.12)",
    boxShadow: `0 30px 80px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(245,239,255,0.04)`,
  }}>
    {/* aurora halo behind */}
    <div style={{
      position: "absolute", inset: -40, pointerEvents: "none",
      backgroundImage: `radial-gradient(circle at 30% 20%, ${AURORA.a1}55, transparent 55%), radial-gradient(circle at 80% 90%, ${AURORA.a3}44, transparent 55%)`,
      filter: "blur(40px)",
      transform: `scale(${1 + Math.sin(t * 0.4) * 0.02})`,
      transition: "transform .6s",
    }} />
    {/* the photo */}
    <img src="aurora/john.jpeg" alt="John Figueiredo"
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center 28%",
        filter: "saturate(1.05) contrast(1.02)",
      }} />
    {/* gradient veil — top transparent, bottom darkens to ink for legible label */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(180deg, transparent 0%, transparent 55%, rgba(11,4,32,0.85) 100%)`,
    }} />
    {/* hairline aurora rim */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 22,
      boxShadow: `inset 0 0 0 1px rgba(245,239,255,0.08), inset 0 0 60px rgba(0,229,199,0.06)`,
    }} />
    {/* label */}
    <div style={{
      position: "absolute", left: 18, right: 18, bottom: 16,
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600,
      color: "rgba(245,239,255,0.85)",
    }}>
      <span>John Figueiredo</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: AURORA.a1 }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: AURORA.a1, boxShadow: `0 0 8px ${AURORA.a1}` }} />
        Founder
      </span>
    </div>
  </div>
);

/* ---------- CONTACT ---------- */

const Contact = ({ t }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref, 0.15);

  return (
    <section id="contact" ref={ref} style={{ position: "relative", padding: "140px 48px 100px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{
        position: "relative", borderRadius: 32, overflow: "hidden",
        padding: "100px 64px", textAlign: "center",
        background: "rgba(245,239,255,0.04)", border: "1px solid rgba(245,239,255,0.12)",
        backdropFilter: "blur(28px)",
      }}>
        <ContactGlow t={t} />

        <Fade show={seen}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px",
            borderRadius: 999, background: "rgba(245,239,255,0.06)", border: "1px solid rgba(245,239,255,0.16)",
            fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600,
            color: "rgba(245,239,255,0.85)", marginBottom: 32, position: "relative",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: AURORA.a4 }} />
            04 — Contact
          </div>
        </Fade>

        <h2 style={{
          fontSize: "clamp(56px, 7.4vw, 132px)", fontWeight: 500, lineHeight: 0.95,
          letterSpacing: "-0.035em", margin: 0, color: AURORA.bone, position: "relative",
        }}>
          <Reveal show={seen} delay={0.05}>Got a deal,</Reveal>
          <Reveal show={seen} delay={0.13}>
            <GradientText t={t} stops={[AURORA.a4, AURORA.a3, AURORA.a2, AURORA.a1]}>or a question?</GradientText>
          </Reveal>
        </h2>

        <Fade show={seen} delay={0.25} style={{ marginTop: 40, position: "relative" }}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:john@sisuventures.co" style={{
              background: AURORA.bone, color: AURORA.ink, padding: "16px 28px",
              borderRadius: 999, fontWeight: 600, fontSize: 15.5, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              john@sisuventures.co <span>→</span>
            </a>
          </div>
        </Fade>

        <Fade show={seen} delay={0.35} style={{ marginTop: 56, position: "relative" }}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
            fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,255,0.55)", fontWeight: 600,
          }}>
            <span>Real Estate · Equities · Operating Companies</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Midwest, US</span>
          </div>
        </Fade>
      </div>

      <footer style={{
        marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(245,239,255,0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        fontSize: 12, color: "rgba(245,239,255,0.5)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AuroraMark t={t} size={18} />
          <span>SISU Ventures · {new Date().getFullYear()}</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 12 }}>
          <a href="mailto:john@sisuventures.co" style={{ color: "rgba(245,239,255,0.55)", textDecoration: "none" }}>Email</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(245,239,255,0.55)", textDecoration: "none" }}>About</a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(245,239,255,0.55)", textDecoration: "none" }}>Portfolio</a>
        </div>
      </footer>
    </section>
  );
};

const ContactGlow = ({ t }) => (
  <>
    <div style={{
      position: "absolute", left: `${20 + Math.sin(t * 0.4) * 8}%`, top: `${30 + Math.cos(t * 0.3) * 8}%`,
      width: 380, height: 380, borderRadius: "50%",
      backgroundImage: `radial-gradient(circle, ${AURORA.a3} 0%, transparent 65%)`,
      opacity: 0.45, filter: "blur(80px)", mixBlendMode: "screen", pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", right: `${15 + Math.cos(t * 0.35) * 8}%`, bottom: `${20 + Math.sin(t * 0.4) * 8}%`,
      width: 340, height: 340, borderRadius: "50%",
      backgroundImage: `radial-gradient(circle, ${AURORA.a1} 0%, transparent 65%)`,
      opacity: 0.45, filter: "blur(80px)", mixBlendMode: "screen", pointerEvents: "none",
    }} />
  </>
);

Object.assign(window, {
  AuroraAbout: About,
  AuroraPortfolio: Portfolio,
  AuroraFounder: Founder,
  AuroraContact: Contact,
});
