# Design Basics - Quick Start Guide

## 🎯 Getting Started

First, navigate to the workspace:
```bash
cd /home/evo/workspace
```

## 🔍 Verify Implementation

Run the consistency check:
```bash
just ui-ux-check
```

## 🎨 Add Basic Components

### 1. Add a Button Component
```bash
npx shadcn@latest add button
```

### 2. Add Input Components
```bash
npx shadcn@latest add input
npx shadcn@latest add label
```

### 3. Add Card Components
```bash
npx shadcn@latest add card
npx shadcn@latest add badge
```

### 4. Add Navigation
```bash
npx shadcn@latest add navigation-menu
```

## 🎯 Core Design Principles (from DESIGN.md)

### Color Palette
```css
/* Background */
background: #09090b; /* Velvet Night */

/* Surface */  
background: #0a0a0a; /* Elevated surfaces */

/* Text */
color: #f5f5f5;     /* Primary text */
color: #a1a1aa;     /* Muted/secondary */

/* Accent (ONLY use this for CTAs) */
background: #d4a964; /* Brand Gold */
```

### Typography
- **Headings**: Instrument Serif (H1, H2, hero statements)
- **Body**: Inter Tight (UI elements, navigation, labels)  
- **Data**: Geist Mono (code, tables, metrics, timestamps)

### Layout Rules
- Maximum 2 font families per surface
- Gold accent ONLY for CTAs and key metrics
- Never use gold for body text
- No secondary accent colors
- No green, no burgundy

## 🚀 Quick Start Example

```tsx
// Example component using DESIGN.md principles
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ExampleComponent() {
  return (
    <Card className="bg-surface border-border">
      <CardContent className="p-6">
        <h2 className="font-instrument text-2xl text-foreground">
          Heading
        </h2>
        <p className="text-muted font-inter-tight">
          Body text using muted color
        </p>
        <Button className="bg-brand-gold text-foreground hover:bg-brand-gold/90">
          CTA Button
        </Button>
      </CardContent>
    </Card>
  )
}
```

## 🎯 Next Steps

1. **Test Stitch MCP**: Use VS Code Copilot with "Generate UI with Stitch"
2. **Add more components**: `npx shadcn@latest add [component]`
3. **Reference DESIGN.md**: Always check `/DNA/brand/DESIGN.md` for rules
4. **Run consistency checks**: `just ui-ux-check` monthly

## 📋 Component Checklist

- [ ] Button
- [ ] Input + Label  
- [ ] Card
- [ ] Badge
- [ ] Navigation Menu
- [ ] Dialog
- [ ] Table
- [ ] Form elements
- [ ] Progress indicators