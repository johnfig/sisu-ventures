# SISU Ventures — Design Specification

> **Project:** Marketing site for SISU Ventures (sisuventures.co) — a private investment company.
> **Reference prototype:** `Sisu Ventures Redesign.html` (with `aurora/*.jsx` modules)
> **Codename:** Aurora — dark, cinematic, with drifting aurora-borealis ambient blobs and gradient typography.

---

## 1. Brand & Voice

**One-liner:** "We acquire, we build."
**Sub:** Sisu Ventures acquires and builds assets where we can add significant value — focused on high cash flow opportunities with asymmetric upside.

**Tone:** Operator-led, not consultant-led. Confident, plainspoken, no fund-pitch fluff. Short sentences. Numbers when they matter. No emoji in body copy (the live site uses 4 in section icons — we replaced those with custom animated SVG glyphs).

---

## 2. Visual System

### 2.1 Color tokens

```ts
// Aurora palette
export const aurora = {
  ink:   "#0B0420",  // primary background
  ink2:  "#160830",  // gradient stop / card mid
  bone:  "#F5EFFF",  // primary text on ink
  // accents — used as section anchors and gradient stops
  a1:    "#00E5C7",  // teal      → About / cash flow / hero badge
  a2:    "#7B2FFF",  // violet    → Forced appreciation / portfolio
  a3:    "#FF3DA5",  // magenta   → CTAs / exits / contact accent
  a4:    "#FFD93D",  // gold      → Asymmetric / partners / hero stat
  a5:    "#5BD7E6",  // cyan      → Value Equities row
};

// Surfaces
export const surface = {
  glass:        "rgba(245,239,255,0.04)",
  glassStrong:  "rgba(245,239,255,0.06)",
  hairline:     "rgba(245,239,255,0.10)",
  hairlineSoft: "rgba(245,239,255,0.06)",
  hairlineHard: "rgba(245,239,255,0.14)",
  navBg:        "rgba(11,4,32,0.55)",   // when scrolled
};

// Text
export const text = {
  hi:   "rgba(245,239,255,1.00)",
  mid:  "rgba(245,239,255,0.78)",
  sub:  "rgba(245,239,255,0.70)",
  dim:  "rgba(245,239,255,0.55)",
  faint:"rgba(245,239,255,0.40)",
};
```

**Selection color:** `background: #FF3DA5; color: #0B0420`

### 2.2 Typography

- **Sans:** Inter (200/300/400/500/600/700/800) — Google Fonts
- **Serif (italic gradient text only):** Instrument Serif italic
- All body copy uses Inter; the gradient words inside H1/H2 are Instrument Serif italic for editorial flair.

| Role | Family | Size (clamp) | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| H1 (hero) | Inter | clamp(72px, 9.4vw, 184px) | 600 | -0.04em | 0.92 |
| H1 italic word | Instrument Serif italic | (same) | 500 | -0.04em | 0.92 |
| H2 (section) | Inter | clamp(44px, 5.6vw, 92px) | 500 | -0.03em | 0.98 |
| H2 (closer) | Inter | clamp(56px, 7.4vw, 132px) | 500 | -0.035em | 0.95 |
| Card title | Inter | 26–30px | 500 | -0.02em | 1.0 |
| Body lg | Inter | 19–19.5px | 400 | 0 | 1.55 |
| Body | Inter | 15–17px | 400 | 0 | 1.55–1.6 |
| Eyebrow | Inter | 11.5–12px | 600 | 0.16em–0.18em UPPERCASE | 1.0 |
| Stat number | Inter | 22px | 600 | -0.02em | 1.0 |
| Mono-feel labels | Inter | 11–13.5px | 600 | 0.06em–0.20em UPPERCASE | 1.0 |

### 2.3 Spacing

- 4-pt base unit; common steps: 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 96 / 140 / 180 px.
- Section vertical padding: **140px** standard, **180px** for first section after hero.
- Section max-width: **1320px**. Horizontal padding: **48px**.

### 2.4 Radii & shadows

- **Pill** (buttons, nav, badges): 999px
- **Card**: 22px
- **Hero stats panel**: 22px
- **Contact closer panel**: 32px
- **CTA shadow:** `0 16px 48px -12px {a3}cc`
- **Card hover lift:** `translateY(-4px)` over 0.35s `cubic-bezier(.2,1,.3,1.05)`

### 2.5 Atmosphere (the "Aurora" effect)

Three fixed full-viewport layers stacked behind the content (z-index 0/1/2):

1. **Base gradient** — vertical: `ink → ink2 (60%) → ink`.
2. **Drifting blobs** — 4 large radial-gradient circles in accent colors, animated with `Math.sin/cos(t * 0.15..0.28)` to slowly orbit. Each is `~700px` wide, `mix-blend-mode: screen`, `filter: blur(120px)`, opacity 0.55, plus a 5th smaller blob that follows the cursor (opacity 0.22, faster easing).
3. **Vignette** — `radial-gradient(ellipse at 50% 30%, transparent → rgba(11,4,32,0.55))`.
4. **Grain** — SVG fractal noise, opacity 0.25, `mix-blend-mode: overlay`.

**Implementation requirement:** the blobs' positions must update via React state from a `useTime()` hook (rAF loop emitting seconds), not CSS keyframes — this is what makes the motion feel organic and irregular instead of looped.

---

## 3. Page Structure

Single long-scroll marketing page. Section IDs are linked in the nav.

| # | ID | Section | Purpose |
|---|---|---|---|
| — | `#home` | Hero | Positioning, CTA pair, stat strip |
| 01 | `#about` | About — 4 pillars | Investment philosophy |
| 02 | `#portfolio` | Portfolio | Current bets + Exits |
| 03 | `#founder` | Partners | John Figueiredo bio |
| 04 | `#contact` | Contact | Email CTA + footer |

### 3.1 Nav (sticky, glass)

- Pill-shaped, centered, `top: 20px`, `max-width: 1320px`.
- Glass background (`backdrop-filter: blur(24px)`); border + bg darken on scroll past 40px.
- Left: Aurora mark (rotating conic-gradient SVG) + "SISU Ventures" wordmark.
- Center: links — About / Portfolio / Partners / Contact. Active link gets `bg: rgba(245,239,255,0.15)` + weight 600. Hover: `bg: rgba(245,239,255,0.08)`.
- Right: solid bone CTA → `mailto:john@sisuventures.co` with pulsing magenta dot.
- Active link tracked via scroll listener — section is "active" once its top crosses `45vh`.

### 3.2 Hero

- Full viewport (`min-height: 100vh`), centered text, padding `140px 48px 200px`.
- Phased entrance over ~2.3s: badge → H1 line 1 → H1 italic word → sub-paragraph → CTAs → stat strip → scroll hint. Each phase scheduled with `setTimeout` and gated with the `<Reveal>` (mask + translateY 105%→0%) and `<Fade>` primitives.
- Copy:
  - Badge: `A private investment company` (with pulsing teal dot)
  - H1: **We acquire,** *we build.* (italic word uses animated linear-gradient through a1→a2→a3→a4 with hue shift over time)
  - Sub: `Sisu Ventures acquires and builds assets where we can add significant value — focused on high cash flow opportunities with asymmetric upside.`
  - Buttons: `See the portfolio →` (magenta solid, anchor to #portfolio) + `How we invest` (ghost outline, anchor to #about)
- Stat strip (4 cells, single row, glass card, 920px max):
  | MHP Lots | Housing Units | Last Exit | Held |
  |---|---|---|---|
  | 1,100+ | 20+ | $1B | Long |
- Scroll hint at bottom: vertical 1px line that scales 0→1→0 (`auroraScrollHint` keyframe, 2s loop).

### 3.3 About — 4 pillars

- Grid: 2 columns × 2 rows, gap 20px.
- Each card (220–260px tall):
  - Top row: numeric `01–04` eyebrow on the left, **animated SVG glyph** on the right.
  - Title (30px, weight 500), one-paragraph description (16px, sub text).
- Glyph mapping:
  - 01 Undervalued Assets → `diamond` (rotates ±8° based on `sin(t * 0.6)`)
  - 02 Forced Appreciation → `spike` (line chart with up-arrow; vertices wobble on `sin(t * 1.4)`)
  - 03 High Cash Flow → `wave` (two stacked sine waves at different phases)
  - 04 Asymmetric Upside → `rocket` (silhouette with thrusters that flicker)
- Card hover: no lift (these are static); the accent only appears as a subtle inset border tint.

### 3.4 Portfolio

**Top: Current Bets** (4 expanding rows, single column, divided by hairlines)

| # | Name | Description | Stage |
|---|---|---|---|
| 01 | Workforce Housing | 20+ workforce housing properties across the Midwest, scaling to 1,000+ over the next decade. Multi-family and single-family value-add. | Active · 2024– / Midwest |
| 02 | Mobile Home Parks | 1,100+ MHP lots across the Midwest. Infill value-add: occupancy, infrastructure, and management. | Active · Ongoing / Midwest |
| 03 | Value Equities | Concentrated book of low P/E public equities — durable competitive advantages, stable earnings, long-term compounding. | Active · Public Markets / Public |
| 04 | Stealth Startup | Stay tuned. | In Build · 2026 / Stealth |

Row layout: `60px 1.1fr 1.4fr 200px 60px` grid. On hover, the row's horizontal padding expands by 16px, an accent gradient wash slides in from the left at 13% opacity, the leading dot's box-shadow doubles, and a subtle right-arrow appears.

**Bottom: Exits** (2 cards, side-by-side, divider rule with eyebrow above)

- **SISU Extracts** (Exit · 2021 / $1B IPO) — Scaled to $100M+ ARR, 3,000% growth over three years, 150+ employees. Exited via the largest cannabis SPAC in Canadian history — a $1B transaction.
- **Plaito** (Exit · Walked / AI Edtech) — AI-powered tutor unlocking human potential through personalized learning. 1.2M+ downloads, 200K+ weekly active users. Walked from a multi-billion-dollar acquisition that wasn't the right fit.

Cards lift 4px on hover; corner accent glow strengthens.

### 3.5 Partners (Founder)

Two-column glass panel (360px portrait + flexible bio).

**Portrait:**
- Aspect ratio 1 / 1.15, radius 22px.
- Asset: `assets/john.jpeg` — `object-fit: cover; object-position: center 28%`.
- Aurora halo behind: dual radial gradients (a1 top-left, a3 bottom-right), `filter: blur(40px)`, slowly breathing `scale(1 ± sin(t * 0.4) * 0.02)`.
- Bottom gradient veil: transparent at top → `rgba(11,4,32,0.85)` at bottom for label legibility.
- Bottom-left label: "John Figueiredo"; bottom-right teal-dot label: "Founder".

**Bio block:**
- Eyebrow: gold, "Founder & Managing Partner"
- Name: "John Figueiredo" — clamp(40, 4.4vw, 64) / weight 500
- Body (~5 lines): "John has an entrepreneurial background in finance and technology. He founded and scaled SISU to 100+ employees and a $100M+ revenue run rate before its acquisition in 2021 in the largest cannabis SPAC transaction in Canada. Previously, he led a global team at Teespring, driving a new revenue channel from $0 to $60M in 9 months. Today he focuses on real estate investing, building a portfolio of single- and multi-family properties in the Midwest."
- Three credential chips (`Built / Scaled / Today`):
  - Built — SISU → $1B exit
  - Scaled — Teespring · $0 → $60M
  - Today — RE + Equities + Build
- Solid bone CTA: `Email John →` → `mailto:john@sisuventures.co`

### 3.6 Contact (closer)

- Full-bleed glass panel, radius 32px, padding `100px 64px`, two animated glow blobs (a3 + a1) drifting inside.
- Eyebrow: "04 — Contact"
- H2: **Got a deal,** *or a question?* (italic gradient through a4→a3→a2→a1)
- Single primary CTA: `john@sisuventures.co →` (bone solid pill)
- Meta strip: "Real Estate · Equities · Operating Companies" / "Midwest, US"
- **Footer** below the panel:
  - Left: Aurora mark + `SISU Ventures · {YYYY}`
  - Right: Email · About · Portfolio (inline anchors)

---

## 4. Motion Principles

- **One global time.** A single rAF clock (`useTime()`) drives all ambient motion (atmosphere blobs, glyphs, gradient hue, founder halo). This keeps everything in one cohesive rhythm.
- **Entry, then ambient.** Each section, when it enters viewport (`useInView`, threshold 0.15–0.30), runs a brief reveal cascade (mask reveal for headings, fade-up for body and grids). After that, only the ambient micro-motion continues.
- **Hover is functional, not theatrical.** Card lifts are 4px, button transforms 1.02x; the accent gradient wash slides in to indicate an active row. No bouncy springs.
- **Easings:**
  - Reveal: `cubic-bezier(.16, .84, .27, 1)` — the "soft cinematic" curve
  - Fade-up: `cubic-bezier(.2, .7, .1, 1)`
  - Hover lifts: `cubic-bezier(.2, 1, .3, 1.05)`
- **Reduced motion** (`prefers-reduced-motion`): disable the rAF time loop (set `t = 0`), drop blob drift, drop reveal masks (just fade), drop hover transforms.

---

## 5. Components Inventory

Build these as reusable React/Next components:

| Component | Purpose |
|---|---|
| `<AuroraAtmosphere />` | The fixed background layer (gradient + blobs + vignette + grain). Driven by `useTime()`. |
| `<Nav />` | Sticky pill nav with scroll-spy. |
| `<AuroraMark />` | Animated logo mark (rotating conic-gradient circle, used in nav + footer). |
| `<GradientText>{}` | Wraps the italic word inside H1/H2; renders a hue-shifting linear-gradient through provided stops. |
| `<Reveal show>{}` | Mask-reveal entrance — translateY 105%→0% inside `overflow: hidden`. |
| `<Fade show y delay duration>{}` | Fade-up entrance. |
| `<SectionHeader eyebrow title sub color />` | Standard eyebrow + H2 (split on `\|` for italic word) + sub. |
| `<HeroStats />` | The 4-cell glass stat strip. |
| `<PillarCard {i,k,v,c,ic} />` + `<PillarIcon kind color t />` | About cards + glyphs. |
| `<PortfolioRow {n,s,r,c,geo,idx} />` | Expanding row with sliding accent wash. |
| `<ExitCard {n,s,r,c,geo} />` | Lifting glass card with corner glow. |
| `<FounderPortrait />` | Photo + halo + label. |
| `<ContactCloser />` | Big closer panel with animated glow blobs. |
| `<Footer />` | Mark + year + inline link list. |

Hooks: `useTime()`, `useMouse(ref)`, `useInView(ref, threshold)`, `useReducedMotion()`.

---

## 6. Tech Recommendations

- **Framework:** Next.js 14 App Router + TypeScript.
- **Styling:** Tailwind CSS for layout/utility, plus a `tokens.ts` exporting the palette/text/surface objects above. Use CSS variables (`--aurora-a1` etc.) on `:root` so we can target them from Tailwind via `bg-[var(--aurora-a1)]`.
- **Fonts:** `next/font` with Inter (preload, weights 200–800) and Instrument Serif italic.
- **Motion:** No motion library required; all animations are CSS transitions or rAF-driven inline styles, exactly as in the prototype.
- **Image:** `next/image` for the founder photo. Place at `public/john.jpeg`.
- **No analytics, no CMS** for v1 — content is hand-authored in TS data files (`data/portfolio.ts`, `data/pillars.ts`, etc.).

### Suggested file layout

```
app/
  layout.tsx          # html shell, font setup
  page.tsx            # composes sections
  globals.css         # tokens, base resets, scrollbar, selection
components/
  atmosphere.tsx
  nav.tsx
  aurora-mark.tsx
  hero.tsx
  about.tsx
  portfolio.tsx
  founder.tsx
  contact.tsx
  primitives/
    reveal.tsx
    fade.tsx
    section-header.tsx
    gradient-text.tsx
hooks/
  use-time.ts
  use-mouse.ts
  use-in-view.ts
  use-reduced-motion.ts
lib/
  tokens.ts           # palette, surface, text
data/
  pillars.ts
  portfolio-current.ts
  portfolio-exits.ts
  founder.ts
public/
  john.jpeg
```

---

## 7. Accessibility & Quality Bar

- All anchors must be real `<a>` tags, never divs. Smooth scroll via `scrollIntoView({ behavior: "smooth" })`.
- Color contrast: bone-on-ink ≥ 12:1; sub text on ink ≥ 7:1; never put light colors on light glass without a dark veil.
- Focus rings: visible 2px outline in `aurora.a1` with 2px offset on all interactive elements.
- Hit targets ≥ 44px on mobile.
- Respect `prefers-reduced-motion` (see §4).
- Lighthouse target: Performance 90+ on mobile, Accessibility 100, Best Practices 100, SEO 100.

---

## 8. Content Source

All copy in §3 is final and matches the live sisuventures.co content as of the handoff. Two stylistic edits were made for the redesign:

- The live site's hero copy is repurposed from "About SISU Ventures" — we lifted **"We acquire and build assets where we can add significant value, focusing on high cash flow opportunities with asymmetric upside potential"** into the hero sub, and used **"We acquire, we build"** as the H1.
- Section icons on the live site are emoji (💎📈💰🚀); we replaced them with custom animated SVG glyphs (diamond / spike / wave / rocket) for a more deliberate look.

Anything else (founder bio, portfolio descriptions, exit narratives) is verbatim from the live site.
