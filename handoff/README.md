# SISU Ventures — Handoff Package

This folder is everything you need to start building the production site with Claude Code.

## What's inside

- **`DESIGN.md`** — full design specification: palette, type, spacing, motion, components, accessibility, file layout. Source of truth for structure.
- **`CLAUDE_CODE_PROMPT.md`** — paste-ready prompt for a fresh Claude Code session. Includes build order, rules of engagement, and a first-action gate so it confirms understanding before writing code.
- **`prototype/`** — the working HTML prototype. Source of truth for *visual* decisions.
  - `Sisu Ventures Redesign.html` — entry file
  - `aurora/lib.jsx` — tokens, hooks, primitives
  - `aurora/atmosphere.jsx` — drifting blob background
  - `aurora/nav.jsx` — sticky glass nav
  - `aurora/hero.jsx` — hero section
  - `aurora/sections.jsx` — about / portfolio / partners / contact
  - `aurora/john.jpeg` — founder photo (move to `public/john.jpeg` in the new repo)

## How to use it

1. Create a new empty repo (or fresh folder).
2. Copy `DESIGN.md`, `CLAUDE_CODE_PROMPT.md`, and `prototype/` into the project root.
3. Open Claude Code in that folder.
4. Paste the contents of `CLAUDE_CODE_PROMPT.md` as your opening message.
5. Claude will read the spec + prototype and summarize back what it understands. Confirm, then let it scaffold.

## Conventions Claude will follow

- One commit per build step (scaffold → primitives → atmosphere → hero → about → portfolio → partners → contact → polish).
- Screenshots saved to `screenshots/` per section.
- A `NOTES.md` for any proposed deviations from the spec — you approve before they land.
