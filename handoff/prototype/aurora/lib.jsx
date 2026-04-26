/* Aurora — shared utilities and primitives */

const AURORA = {
  ink: "#0B0420",
  ink2: "#160830",
  bone: "#F5EFFF",
  a1: "#00E5C7", // teal
  a2: "#7B2FFF", // violet
  a3: "#FF3DA5", // magenta
  a4: "#FFD93D", // gold
  a5: "#5BD7E6", // cyan
};

const useTime = () => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, s = performance.now();
    const tick = (n) => { setT((n - s) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
};

const useMouse = (ref) => {
  const [m, setM] = React.useState({ x: 0.5, y: 0.5 });
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setM({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [ref]);
  return m;
};

const useInView = (ref, threshold = 0.2) => {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setSeen(true); }),
      { threshold, root: null }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
};

const Reveal = ({ children, show, delay = 0, duration = 1.1 }) => (
  <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em" }}>
    <span style={{
      display: "inline-block",
      transform: `translateY(${show ? "0%" : "105%"})`,
      transition: `transform ${duration}s cubic-bezier(.16,.84,.27,1) ${delay}s`,
      willChange: "transform",
    }}>{children}</span>
  </span>
);

const Fade = ({ children, show, delay = 0, y = 10, duration = 0.9, style = {} }) => (
  <div style={{
    opacity: show ? 1 : 0,
    transform: `translateY(${show ? 0 : y}px)`,
    transition: `opacity ${duration}s cubic-bezier(.2,.7,.1,1) ${delay}s, transform ${duration}s cubic-bezier(.2,.7,.1,1) ${delay}s`,
    ...style,
  }}>{children}</div>
);

const Blob = ({ cx, cy, r, color, opacity = 0.55, fast = false }) => (
  <div style={{
    position: "absolute",
    left: `${cx}%`, top: `${cy}%`,
    width: `${r * 14}px`, height: `${r * 14}px`,
    transform: "translate(-50%, -50%)",
    backgroundImage: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
    opacity,
    filter: `blur(${fast ? 80 : 120}px)`,
    pointerEvents: "none",
    mixBlendMode: "screen",
    transition: fast ? "left .4s ease, top .4s ease" : "none",
  }} />
);

const GrainOverlay = ({ opacity = 0.35 }) => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", opacity, mixBlendMode: "overlay",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>")`,
    zIndex: 1,
  }} />
);

const AuroraMark = ({ t, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <defs>
      <linearGradient id="auroraGradMark" x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${(t * 30) % 360}, 0.5, 0.5)`}>
        <stop offset="0" stopColor={AURORA.a1} />
        <stop offset="0.5" stopColor={AURORA.a2} />
        <stop offset="1" stopColor={AURORA.a3} />
      </linearGradient>
    </defs>
    <circle cx="14" cy="14" r="12" fill="url(#auroraGradMark)" />
    <circle cx="14" cy="14" r="4" fill={AURORA.ink} />
  </svg>
);

const GradientText = ({ children, t, angle = 95, stops }) => {
  const palette = stops || [AURORA.a1, AURORA.a2, AURORA.a3, AURORA.a4];
  const a = angle + Math.sin(t * 0.4) * 30;
  return (
    <span style={{
      backgroundImage: `linear-gradient(${a}deg, ${palette.join(", ")})`,
      backgroundSize: "200% 100%",
      backgroundPosition: `${(t * 30) % 200}% 50%`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      fontStyle: "italic",
      fontWeight: 500,
    }}>{children}</span>
  );
};

Object.assign(window, {
  AURORA, useTime, useMouse, useInView,
  Reveal, Fade, Blob, GrainOverlay, AuroraMark, GradientText,
});
