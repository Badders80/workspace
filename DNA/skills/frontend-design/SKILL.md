# Frontend Design Skill — Cline Equivalent

> Port of Anthropic's Frontend Design skill for Cline.
> Enforces deliberate design thinking before coding. Prevents generic AI aesthetic.
> Status: Active. Complements DNA/brand/BRAND_SYSTEM.md and shadcn/ui.

## When to Use

Any UI task: dashboard, landing page, settings panel, component, marketing site.

## Design Framework — MUST Answer Before Coding

### 1. Purpose & Audience
- What is this UI for?
- Who uses it? (investor, admin, public, mobile-first?)
- What emotion should they feel? (trust, excitement, calm, urgency)

### 2. Aesthetic Direction (Pick One)
| Direction | Traits | Use When |
|-----------|--------|----------|
| Brutalist | Raw, bold, high contrast, system fonts, minimal polish | Internal tools, dev dashboards, "anti-design" statements |
| Maximalist | Dense, layered, rich color, animations, detail | Marketing, landing pages, brand experiences |
| Retro-futuristic | CRT effects, monospace, neon, grid lines | Gaming, tech, "vaporwave" products |
| Luxury | Minimal, generous whitespace, serif headings, muted palette | High-value products, finance, premium services |
| Playful | Rounded corners, bright colors, illustrations, micro-interactions | Consumer apps, onboarding, education |
| Minimalist | Clean, functional, no decoration, typography-driven | SaaS, admin, settings, documentation |

### 3. Typography Pairing
- Heading font: [choice with rationale]
- Body font: [choice with rationale]
- Monospace (if needed): [choice]
- Scale: Define 5 sizes (xs, sm, base, lg, xl, 2xl)

### 4. Motion & Interaction
| Effect | Use Sparingly | Use Liberally |
|--------|--------------|---------------|
| Scroll-triggered reveals | Yes | No |
| Hover micro-interactions | Yes | Yes |
| Page transitions | Yes | No |
| Loading states | Yes | Yes |
| Ambient background motion | Yes | No |

### 5. Layout Rules
- Grid system: [12-col / CSS Grid / flex-based]
- Max width: [px or rem]
- Breakpoints: [mobile / tablet / desktop]
- Asymmetry: [allowed / controlled / none]

### 6. Component Constraints
- Base: shadcn/ui components only
- Override: Tailwind custom classes
- No: raw Radix, MUI, Chakra, or inline `<style>` blocks
- Animation: Framer Motion or CSS transitions only

## Execution Order

1. **Design brief** — Answer the 6 sections above. Output as markdown.
2. **Component inventory** — List every shadcn/ui component needed + custom ones.
3. **Wireframe** — ASCII or simple text layout. No code yet.
4. **Token map** — Map colors, spacing, typography to Tailwind config.
5. **Build** — Code with the brief as the single source of truth.
6. **Review** — Run `just review-ui` (Playwright MCP) to capture + critique.

## Anti-Patterns (Forbidden)

- Purple gradients as default
- System fonts without intent
- `rounded-lg` on everything
- Centered text on wide screens
- Generic hero section with 3 feature cards
- Unbounded animations (CPU drain)
- Cookie-cutter Tailwind components without override

## Example Prompt

```
Build a dashboard for racehorse investors.
- Audience: High-net-worth individuals, 45-65, mobile-first
- Direction: Luxury minimalism
- Typography: Inter (headings), Source Serif 4 (body), JetBrains Mono (data)
- Motion: Subtle hover states, scroll-reveal on cards, no ambient
- Layout: 12-col grid, 1440px max, asymmetric sidebar
- Components: shadcn Card, Table, Tabs, Badge, Dialog, Chart
```

## Integration with Brand System

Read `DNA/brand/BRAND_SYSTEM.md` before any design brief. Align:
- Color palette (primary, secondary, accent, semantic)
- Logo placement rules
- Photography style (if applicable)
- Tone of voice (microcopy, labels, CTAs)

## Playwright Review Loop

After build, run the Playwright MCP review cycle:
1. `playwright_navigate` → open the page
2. `playwright_screenshot` → capture
3. `analyze_image` (Vision MCP) → critique layout, spacing, typography
4. `playwright_click` / `playwright_fill` → test interactions
5. Iterate on critique → back to step 1

## Files

- This skill: `cline/skills/FRONTEND_DESIGN.md`
- Brand system: `DNA/brand/BRAND_SYSTEM.md`
- UI skill: `DNA/skills/UI_UX_PRO_MAX.md`