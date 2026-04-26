/* Aurora — Background atmosphere (drifting blobs + grain + scan rule) */

const Atmosphere = ({ t, mouse }) => {
  return (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `linear-gradient(180deg, ${AURORA.ink} 0%, ${AURORA.ink2} 60%, ${AURORA.ink} 100%)`,
      }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
        <Blob cx={20 + Math.sin(t * 0.18) * 10} cy={25 + Math.cos(t * 0.22) * 8} r={48} color={AURORA.a1} />
        <Blob cx={70 + Math.cos(t * 0.15) * 12} cy={50 + Math.sin(t * 0.2) * 10} r={52} color={AURORA.a2} />
        <Blob cx={85 + Math.sin(t * 0.28) * 8} cy={20 + Math.cos(t * 0.18) * 6} r={36} color={AURORA.a3} />
        <Blob cx={30 + Math.cos(t * 0.24) * 10} cy={75 + Math.sin(t * 0.16) * 8} r={42} color={AURORA.a4} opacity={0.3} />
        <Blob cx={mouse.x * 100} cy={mouse.y * 100} r={28} color={AURORA.a1} opacity={0.22} fast />
      </div>
      <div style={{
        position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(11,4,32,0.0) 0%, rgba(11,4,32,0.55) 90%)`,
      }} />
      <GrainOverlay opacity={0.25} />
    </>
  );
};

window.AuroraAtmosphere = Atmosphere;
