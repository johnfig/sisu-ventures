import { aurora } from "@/lib/tokens";

export type PortfolioItem = {
  n: string;
  s: string;
  r: string;
  c: string;
  geo: string;
};

export const current: PortfolioItem[] = [
  {
    n: "Workforce Housing",
    s: "20+ workforce housing properties across the Midwest, scaling to 1,000+ over the next decade. Multi-family and single-family value-add.",
    r: "Active · 2024–",
    c: aurora.a1,
    geo: "Midwest",
  },
  {
    n: "Mobile Home Parks",
    s: "1,100+ MHP lots across the Midwest. Infill value-add: occupancy, infrastructure, and management.",
    r: "Active · Ongoing",
    c: aurora.a2,
    geo: "Midwest",
  },
  {
    n: "Value Equities",
    s: "Concentrated book of low P/E public equities — durable competitive advantages, stable earnings, long-term compounding.",
    r: "Active · Public Markets",
    c: aurora.a5,
    geo: "Public",
  },
  {
    n: "Stealth Startup",
    s: "Stay tuned.",
    r: "In Build · 2026",
    c: aurora.a4,
    geo: "Stealth",
  },
];

export const exits: PortfolioItem[] = [
  {
    n: "SISU Extracts",
    s: "Scaled to $100M+ annual revenue, 3,000% growth over three years, 150+ employees. Exited via the largest cannabis SPAC in Canadian history — a $1B transaction.",
    r: "Exit · 2021",
    c: aurora.a3,
    geo: "$1B IPO",
  },
  {
    n: "Plaito",
    s: "AI-powered tutor unlocking human potential through personalized learning. 1.2M+ downloads, 200K+ weekly active users. Walked from a multi-billion-dollar acquisition that wasn't the right fit.",
    r: "Exit · Walked",
    c: aurora.a2,
    geo: "AI Edtech",
  },
];
