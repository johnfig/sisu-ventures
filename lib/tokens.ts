export const aurora = {
  ink: "#0B0420",
  ink2: "#160830",
  bone: "#F5EFFF",
  a1: "#00E5C7",
  a2: "#7B2FFF",
  a3: "#FF3DA5",
  a4: "#FFD93D",
  a5: "#5BD7E6",
} as const;

export const surface = {
  glass: "rgba(245,239,255,0.04)",
  glassStrong: "rgba(245,239,255,0.06)",
  hairline: "rgba(245,239,255,0.10)",
  hairlineSoft: "rgba(245,239,255,0.06)",
  hairlineHard: "rgba(245,239,255,0.14)",
  navBg: "rgba(11,4,32,0.55)",
} as const;

export const text = {
  hi: "rgba(245,239,255,1.00)",
  mid: "rgba(245,239,255,0.78)",
  sub: "rgba(245,239,255,0.70)",
  dim: "rgba(245,239,255,0.55)",
  faint: "rgba(245,239,255,0.40)",
} as const;

export type AuroraColor = (typeof aurora)[keyof typeof aurora];
