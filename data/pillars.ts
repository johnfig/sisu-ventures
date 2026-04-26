import { aurora } from "@/lib/tokens";

export type PillarKind = "diamond" | "spike" | "wave" | "rocket";

export type Pillar = {
  i: string;
  c: string;
  k: string;
  v: string;
  ic: PillarKind;
};

export const pillars: Pillar[] = [
  {
    i: "01",
    c: aurora.a1,
    k: "Undervalued Assets",
    v: "Identifying and acquiring assets below their intrinsic value, creating immediate equity potential.",
    ic: "diamond",
  },
  {
    i: "02",
    c: aurora.a2,
    k: "Forced Appreciation",
    v: "Implementing strategic improvements and operational efficiencies to drive value creation.",
    ic: "spike",
  },
  {
    i: "03",
    c: aurora.a3,
    k: "High Cash Flow",
    v: "Focusing on assets that generate strong, consistent cash flows to ensure sustainable returns.",
    ic: "wave",
  },
  {
    i: "04",
    c: aurora.a4,
    k: "Asymmetric Upside",
    v: "Targeting opportunities with limited downside risk and significant upside potential.",
    ic: "rocket",
  },
];
