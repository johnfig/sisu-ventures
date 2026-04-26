/* Aurora — Nav (sticky, glass) */

const Nav = ({ t }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("home");

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "about", "portfolio", "founder", "contact"];
      let cur = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "founder", label: "Partners" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header style={{
      position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, width: "calc(100% - 40px)", maxWidth: 1320,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: scrolled ? "10px 14px 10px 22px" : "12px 16px 12px 24px",
      borderRadius: 999,
      background: scrolled ? "rgba(11,4,32,0.55)" : "rgba(245,239,255,0.04)",
      border: `1px solid rgba(245,239,255,${scrolled ? 0.1 : 0.08})`,
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      transition: "all .4s cubic-bezier(.2,.7,.1,1)",
    }}>
      <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById("home").scrollIntoView({ behavior: "smooth" }); }}
        style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 600, fontSize: 15, letterSpacing: "0.02em", color: AURORA.bone, textDecoration: "none" }}>
        <AuroraMark t={t} size={26} />
        <span>SISU&nbsp;Ventures</span>
      </a>

      <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {items.map((x) => (
          <a key={x.id} href={`#${x.id}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(x.id)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              color: AURORA.bone, textDecoration: "none", padding: "8px 16px", borderRadius: 999,
              fontSize: 13.5, letterSpacing: "0.01em", cursor: "pointer", transition: "all .25s",
              background: active === x.id ? "rgba(245,239,255,0.15)" : "transparent",
              fontWeight: active === x.id ? 600 : 500,
              position: "relative",
            }}
            onMouseEnter={(e) => { if (active !== x.id) e.currentTarget.style.background = "rgba(245,239,255,0.08)"; }}
            onMouseLeave={(e) => { if (active !== x.id) e.currentTarget.style.background = "transparent"; }}>
            {x.label}
          </a>
        ))}
      </nav>

      <a href="mailto:john@sisuventures.co"
        style={{
          background: AURORA.bone, color: AURORA.ink, border: "none", padding: "11px 20px", borderRadius: 999,
          fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          textDecoration: "none", transition: "transform .2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
        Email John
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: AURORA.a3, animation: "auroraPulse 1.5s infinite" }} />
      </a>
    </header>
  );
};

window.AuroraNav = Nav;
