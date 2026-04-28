# Design System

**Version:** 2.0
**Status:** Canonical
**Last Updated:** 2026-04-14

## Hierarchy of Truth
In any visual conflict, apply rules in this strict order:
1. This file (`DESIGN.md`)
2. `BRAND_SYSTEM.md` (Ownership layer voice and vocabulary)
3. `INTELLIGENCE_SYSTEM.md` (Awareness layer voice and video specs)

---

## 1. Design Philosophy: Institutional Minimalism
**Concept:** German engineering precision meets Swiss private banking.
**Philosophy:** The Standard.
**Feeling:** Quiet confidence, high-contrast clarity, structural trust.

### The Yoda Principle
Across all channels, we are the Guide, not the Hero. We light the path and show the data.

---

## 2. Color Palette
Strictly limited palette. No secondary accent colors. No green, no burgundy.

| Role | Token | Hex | Usage |
|---|---|---|---|
| Background | `--color-background` | `#09090b` | Velvet Night. Primary surface. |
| Surface | `--color-surface` | `#0a0a0a` | Elevated surface (cards, modals). |
| Foreground | `--color-foreground` | `#f5f5f5` | Primary text on dark backgrounds. |
| Muted | `--color-muted` | `#a1a1aa` | Secondary text, captions. |
| Gold Accent | `--brand-gold` | `#d4a964` | The ONLY accent. CTAs, key metrics. Never for body text. |
| Border | `--color-border` | `rgba(255,255,255,0.06)` | Subtle dividers. |

---

## 3. Typography
**The Editorial vs. Platform Split**

**1. The Brand Mark (Logos only)**
* **Font:** `Bw Gradual`
* **Usage:** Strictly for the Evolution Stables logo wordmark and watermarks. Not for general typing.

**2. Marketing & Editorial (The "Punch")**
* **Font:** `Instrument Serif`
* **Usage:** Print materials, pitch decks, hero campaign graphics, and top-of-funnel social media. 
* **Rule:** Not currently implemented in the functional website UI.

**3. The Web Platform (MyStable / Website UI)**
* **Font:** `Inter Tight`
* **Usage:** All website headings (H1-H6), body copy, buttons, and navigation. Used at different weights to establish hierarchy without relying on a serif.
* **Feeling:** Clinical, precise, uncluttered.

**4. Data & Tickers**
* **Font:** `Geist Mono`
* **Usage:** Code, data tables, odds, metrics, timestamps.

---

## 4. Layout Principles & UX
* **The Bento Grid:** Organize content into rigorous, rectangular grids. Each cell holds one specific idea or data point.
* **Scrollytelling:** Guided tours where backgrounds stay pinned and elements enter/exit to manage cognitive load.
* **Spacing:** 8px scale. Generous negative space. Trust through restraint.
* **Depth:** Flat by default. Soft shadows only on interactive surfaces (modals, active cards).

---

## 5. Motion & Interaction
* **The "Unblur" Reveal:** Text and data should focus, not just fade. (`blur(10px)` → `blur(0px)`). Represents bringing clarity.
* **Speed:** Deliberate and smooth. Decelerating easing.
* **Invisible Infrastructure:** Backend complexity (settlement, token flows) happens instantly and invisibly. The UI remains calm and clear.

---

## 6. Imagery & Textures
* **Imagery:** Real horses, archival/documentary style, high contrast. Dark overlays (30-50%) when used as backgrounds.
* **Textures:** Tactile but muted—brushed metals, premium leather, subtle carbon-fiber hints.
* **Prohibited:** No stock AI, no cartoon horses, no gambling iconography, no retail-fintech gamification.

## 8. Responsive Behavior

- Mobile: single column, stacked
- Tablet: 2-column grid
- Desktop: max-width container, sidebar navigation

## 9. Agent Prompt Guide

Quick reference for AI agents generating UI:
- Use shadcn/ui components as building blocks
- Apply Tailwind utility classes from the design tokens above
- Default to bg-background text-foreground
- Use border-border for all dividers