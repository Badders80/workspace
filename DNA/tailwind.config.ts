import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        gold: "var(--brand-gold)",
      },
      fontSize: {
        h1: ['3.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        h2: ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
} satisfies Config;