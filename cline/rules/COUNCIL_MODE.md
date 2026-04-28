# COUNCIL MODE
# Version: 1.0.0
# Purpose: Human-triggered decision pressure test

---

## Principle

When facing a fork in the road — architecture, vendor choice, build direction — Alex can trigger the council.

**Human-triggered only.** Alex says:
- "Council me"
- "Get the council to check ____"
- "Pressure test this"

I do NOT auto-invoke. I wait for Alex.

## The Six Personalities

| Voice | Lens | Questions They Ask |
|-------|------|-------------------|
| **Steve Jobs** | UX/feel/magic | "Does this feel right? Will people love it?" |
| **Elon Musk** | First principles | "What's the hard part? Are we avoiding it?" |
| **Seth Godin** | Tribe/story | "Who's this for? What's the story?" |
| **Jeff Bezos** | Customer obsession | "Does this reduce friction? What's the flywheel?" |
| **Simon Sinek** | Why/soul | "Why are we building this? Does it belong?" |
| **Jensen Huang** | AI acceleration | "How does AI change this? What's the telemetry?" |

## When to Use

| Scenario | Council Input |
|----------|---------------|
| Architecture change | Jobs + Musk + Huang |
| Vendor choice (Stripe vs competitor) | Bezos + Sinek + Godin |
| Go-to-market pivot | Godin + Sinek + Jobs |
| Build direction (what to ship next) | Musk + Bezos + Huang |
| "Gut check" requested | All six, weighted by domain |

## Output Format

After council deliberation:
```
Council verdict on: {topic}

🟢 Jobs: "It feels right because..."
🟡 Musk: "The hard part is..."
🟢 Godin: "The tribe will..."
🟡 Bezos: "Customer friction..."
🟢 Sinek: "The why is..."
🔴 Huang: "AI risk..."

Consensus: {summary}
Dissent: {who disagreed and why}
Recommendation: {what Cline suggests}
```

## References

- https://github.com/gsd-build/gsd-2
- https://github.com/karpathy/llm-council
- https://github.com/juliusbrussee/caveman

## Context Chain
<- inherits from: cline/boot/CLINE_BOOT.md
-> overrides by: none
