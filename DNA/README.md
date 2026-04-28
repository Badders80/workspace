# @evo/dna — Evolution Internal Design System

DNA is the **shared style source for all Evolution internal tools** — dashboards, admin UIs, management surfaces. It is a fast-prototyping starter pack built from the [openclaw-mission-control](https://github.com/abhi1693/openclaw-mission-control) design language.

> **Brand rule:** DNA = internal tools only. `Evolution_Platform` manages its own gold/black external brand and is not a consumer of this package.

---

## Brand Rule

| Surface | Style Source |
|---|---|
| SSOT_Build, Evolution_CRM, Evolution_Studio | `@evo/dna` (DNA) |
| Evolution_Platform | Own gold/black external brand — **not a DNA consumer** |

---

## Token Reference

All tokens are CSS custom properties declared in `:root` via `tokens/index.css`.

| Variable | Value | Purpose |
|---|---|---|
| `--bg` | `#f8fafc` | Page background |
| `--surface` | `#ffffff` | Card/panel surfaces |
| `--surface-muted` | `#f1f5f9` | Subdued/muted backgrounds |
| `--surface-strong` | `#e2e8f0` | Stronger surface for inputs/hover |
| `--border` | `#e2e8f0` | Default borders |
| `--border-strong` | `#cbd5e1` | Stronger borders, active states |
| `--text` | `#0f172a` | Primary text |
| `--text-muted` | `#64748b` | Secondary/muted text |
| `--text-quiet` | `#94a3b8` | Tertiary/quiet text |
| `--accent` | `#2563eb` | Primary accent (blue) |
| `--accent-strong` | `#1d4ed8` | Darker accent for hover |
| `--accent-soft` | `rgba(37,99,235,0.12)` | Soft accent for backgrounds |
| `--success` | `#16a34a` | Success states (green) |
| `--warning` | `#d97706` | Warning states (amber) |
| `--danger` | `#dc2626` | Danger/error states (red) |
| `--shadow-panel` | multi-value | Panel shadow |
| `--shadow-card` | multi-value | Card shadow |

### Font Variables

Fonts are declared as CSS var references. Each consuming app loads the actual font files.

| Variable | Font | Usage |
|---|---|---|
| `--font-body` | IBM Plex Sans | Body text |
| `--font-heading` | Sora | Headings |
| `--font-display` | DM Serif Display | Display/hero text |

### Utility Classes

DNA adds `@layer utilities` with these shorthand classes:

- `.bg-app` — page background
- `.text-strong`, `.text-muted`, `.text-quiet` — text color helpers
- `.surface-card` — card surface (bg + border + shadow)
- `.surface-panel` — panel surface
- `.surface-muted` — muted surface
- `.border-strong` — strong border color
- `.animate-fade-in-up`, `.animate-fade-in` — entrance animations
- `.animate-float-slow` — ambient float animation
- `.animate-progress-shimmer` — loading bar shimmer

### Keyframes

- `fade-in-up` — slide up + fade in
- `fade-in` — simple fade
- `float-slow` — gentle vertical float
- `progress-shimmer` — loading bar sweep

---

## Component Inventory

### UI Primitives

| Component | Description |
|---|---|
| `Badge` | Status pill/badge with variants: `default`, `outline`, `accent`, `success`, `warning`, `danger` |
| `Button` | Button with variants: `primary`, `secondary`, `outline`, `ghost`, `link`, `danger`; sizes: `sm`, `md`, `lg` |
| `Card`, `CardHeader`, `CardContent` | Surface card container |
| `Input` | Text input styled with DNA tokens |
| `Textarea` | Multi-line text input |
| `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogOverlay`, `DialogClose`, `DialogTrigger` | Modal dialog (Radix UI) |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Tabbed interface (Radix UI) |
| `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` | Tooltip overlay (Radix UI) |
| `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectTrigger`, `SelectValue` | Dropdown select (Radix UI) |
| `GlobalLoader` | Top-page loading bar using `@tanstack/react-query` |

### Atoms

| Component | Description |
|---|---|
| `StatusPill` | Maps status strings → `Badge` variants. Includes openclaw defaults (see below). Override in consumers. |
| `BrandMark` | Logo slot — renders `EV` icon + `EVOLUTION Mission Control` label. Consumers can pass their own via `brandMark` prop on `AppShell`. |

### StatusPill Default Status Map

```
inbox        → outline
assigned     → accent
in_progress  → warning
testing      → accent
review       → accent
done         → success
online       → success
busy         → warning
provisioning → warning
offline      → outline
deleting     → danger
updating     → accent
```

Override in consumers when you need different statuses.

### Templates

| Component | Description |
|---|---|
| `AppShell` | Top nav + sidebar slot. Props: `children`, `brandMark?`, `headerActions?`, `sidebarItems`, `activePath?` |
| `PageLayout` | Sticky header + title/description/actions + content area. Props: `title`, `description?`, `headerActions?`, `children`, `stickyHeader?`, `mainClassName?`, `contentClassName?` |

### Organisms

| Component | Description |
|---|---|
| `AppSidebar` | Fixed left nav. Props: `items: NavItem[]`, `activePath?` |

---

## Consuming in a New Project

### Step 1 — Add dependency

```json
{
  "dependencies": {
    "@evo/dna": "workspace:*"
  }
}
```

### Step 2 — Import tokens in CSS

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Sfamily=Sora:wght@500;600;700&family=DM+Serif+Display&display=swap');
@import '@evo/dna/tokens';

:root {
  --font-body: 'IBM Plex Sans';
  --font-heading: 'Sora';
  --font-display: 'DM Serif Display';
}
```

### Step 3 — Configure Tailwind

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import dnaPreset from '@evo/dna/tailwind.config.base';

export default {
  presets: [dnaPreset],
  content: ['./src/**/*.{ts,tsx}', '../DNA/src/**/*.{ts,tsx}'],
} satisfies Config;
```

### Step 4 — Use components

```tsx
import { Card } from '@evo/dna';
import { Button } from '@evo/dna';
import { PageLayout } from '@evo/dna';

export default function MyPage() {
  return (
    <PageLayout title="My Page" description="Description here">
      <Card>
        <p>Hello, DNA!</p>
        <Button variant="primary">Click me</Button>
      </Card>
    </PageLayout>
  );
}
```

---

## `cn()` — Class Utility

DNA exports a `cn()` helper from `@evo/dna` (or directly from `@evo/dna/src/lib/utils.ts`) for merging Tailwind classes:

```tsx
import { cn } from '@evo/dna/src/lib/utils';

<div className={cn('base classes', condition && 'conditional-class', 'more')}>
```

---

## Extending DNA

DNA is a starting spot, not a final system. When you need to add or change things:

1. **Add a new component** — Follow the CVA + Radix pattern used in existing UI components:
   - Use `class-variance-authority` for variant management
   - Use Radix UI primitives for accessible interactive components
   - Use `cn()` for class merging
   - Use DNA token CSS vars for colors/borders/shadows

2. **Override `StatusPill` for your domain** — Copy `StatusPill` into your consumer and extend the `STATUS_STYLES` map with your domain-specific statuses.

3. **Custom `BrandMark`** — Pass any React node as `brandMark` prop to `AppShell`, or replace `BrandMark` entirely in your app.

4. **Override token values** — Re-declare CSS vars in your consumer's CSS after the `@import '@evo/dna/tokens'` to override specific tokens without forking DNA.

---

## What DNA Is Not

- **Not a replacement for the Evolution external brand** — `Evolution_Platform` is excluded
- **Not a charting library** — recharts and data visualization are out of scope for Phase 1
- **Not an auth system** — auth is entirely the consumer's concern
- **Not a data-fetching layer** — components are server-framework agnostic; consumers bring their own data

---

## File Structure

```
DNA/
├── tokens/
│   └── index.css          # CSS custom property tokens + utilities
├── tailwind.config.base.ts # Shared Tailwind preset
├── src/
│   ├── lib/
│   │   └── utils.ts       # cn() helper
│   ├── components/
│   │   ├── ui/            # Badge, Button, Card, Dialog, Input, etc.
│   │   ├── atoms/         # StatusPill, BrandMark
│   │   ├── templates/     # AppShell, PageLayout
│   │   └── organisms/     # AppSidebar
│   └── index.ts           # Barrel export
└── package.json
```
