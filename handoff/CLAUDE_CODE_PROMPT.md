# Claude Code Prompt — Build sisuventures.co

Copy everything below into a fresh Claude Code session. The `prototype/` folder and `DESIGN.md` should be available in the same workspace so Claude can read them as ground truth.

---

## Prompt

You are building the production marketing site for **SISU Ventures** (sisuventures.co), a private investment company owned and operated by John Figueiredo.

**Ground truth — read these first, in order:**

1. `DESIGN.md` — the full design specification (palette, typography, motion, sections, components, file layout). Treat it as the source of truth.
2. `prototype/Sisu Ventures Redesign.html` + `prototype/aurora/*.jsx` — a working HTML prototype of the design. Every visual decision, animation, and interaction in here is intentional. When in doubt, match the prototype.
3. `prototype/aurora/john.jpeg` — the founder photo. Move this to `public/john.jpeg` in the new project.

**Tech stack (non-negotiable):**

- Next.js 14, App Router, TypeScript (strict)
- Tailwind CSS for layout/utility classes
- `next/font` for Inter (200–800) and Instrument Serif italic
- `next/image` for the founder photo
- No animation library — use CSS transitions + a single `useTime()` rAF hook for all ambient motion (matches the prototype exactly)
- No CMS, no DB. Content lives in typed data files under `data/`.

**Goals:**

1. Recreate the prototype in production-quality Next.js code. Pixel-faithful to the prototype's spacing, typography, color, and motion — not "inspired by," **faithful**.
2. Refactor the prototype's monolithic JSX into the component structure laid out in `DESIGN.md` §6 ("Suggested file layout"). Each component should be ≤200 lines and have a single responsibility.
3. Type the design tokens (`lib/tokens.ts`) and re-export them as CSS variables on `:root` so Tailwind can reference them via `bg-[var(--aurora-a1)]`.
4. Add accessibility polish that the prototype skips: visible focus rings (2px solid `var(--aurora-a1)`, 2px offset on every interactive element), `prefers-reduced-motion` handling (no rAF loop, no reveal masks, no hover lifts), and proper semantic HTML (`<main>`, `<section>`, `<header>`, `<footer>`, real `<h1>`/`<h2>`).
5. Lighthouse: 90+ Performance on mobile, 100 Accessibility, 100 Best Practices, 100 SEO. Real `<title>`, `<meta name="description">`, OpenGraph image (generate a static OG card PNG that uses the dark Aurora gradient + headline).

**Build order (do these as separate commits so I can review each step):**

1. **Scaffold.** `create-next-app` with TS, Tailwind, App Router. Set up `next/font`, `globals.css` with the base resets/scrollbar/selection rules from the prototype, and `lib/tokens.ts`. Wire CSS variables on `:root`.
2. **Primitives + hooks.** `useTime`, `useMouse`, `useInView`, `useReducedMotion`. Then the `<Reveal>`, `<Fade>`, `<GradientText>`, `<AuroraMark>`, `<SectionHeader>` primitives. Build a sandbox page at `/sandbox` that exercises each one.
3. **Atmosphere + Nav.** The fixed atmosphere layer and the sticky pill nav with scroll-spy. Verify the nav active state tracks correctly across the long page.
4. **Hero.** Full-viewport, phased entrance, stats strip, scroll hint.
5. **About.** Four pillars grid + the four animated glyph SVGs (diamond, spike, wave, rocket).
6. **Portfolio.** Current rows with sliding-wash hover + exit cards with corner glow.
7. **Partners (Founder).** Photo treatment with halo, bio block, credential chips, email CTA.
8. **Contact + Footer.** Closer panel with drifting glow blobs, footer with dynamic year.
9. **Polish pass.** Reduced-motion, focus rings, semantic audit, Lighthouse pass, OG image.

**Rules of engagement:**

- **Don't redesign.** If you have a better idea, write it down in a `NOTES.md` and ask before changing colors, typography, motion, copy, or section ordering.
- **Don't add sections.** No "Process," no "Testimonials," no "Logos." If anything feels missing, write it in `NOTES.md`.
- **Copy is final.** All text on the page is in `DESIGN.md` §3. Don't paraphrase.
- **Commits are atomic and described.** One commit per build step above. Commit messages: imperative, present tense, ≤72 chars on the subject line.
- **Run the dev server and verify each step in the browser before committing.** Take a screenshot of each section as it lands, save under `screenshots/`, reference in your commit message.
- **Ask, don't assume.** If `DESIGN.md` and the prototype disagree, the prototype wins for *visual* questions and `DESIGN.md` wins for *structural* questions (file layout, tech, accessibility). Anywhere else: ask.

**First action:** read `DESIGN.md` and `prototype/Sisu Ventures Redesign.html` end-to-end, then summarize back to me (1) the palette, (2) the section list with their accent colors, (3) the motion model in one paragraph. Don't write any code until I confirm.
