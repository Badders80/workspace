# Claude Frontend Skills Stack — Design + Browser + MCP

## Source
- Instagram: @lindsay.ai + Anthropic ecosystem
- Type: Claude Code skills + MCP servers
- Components: Frontend Design, Playwright MCP, MCP-Builder

## Purpose
Three tools that turn Claude into a full frontend team:
- **Frontend Design** → Distinctive, non-generic UI output
- **Playwright MCP** → Real browser control + self-testing
- **MCP-Builder** → Build custom tool integrations

## Components

### 1. Frontend Design Skill (Anthropic Verified)

**What it does:**
- Teaches Claude to generate distinctive, production-grade frontends
- Avoids "generic AI aesthetic" (purple gradients, system fonts, cookie-cutter)
- Forces deliberate design thinking before coding

**Key superpowers:**
- Establishes full design framework before coding
- High-impact scroll-triggered interactions
- Context-aware details, layered effects

**Installation:**
```bash
# Via Claude Code marketplace or skills
npx skills add frontend-design
```

### 2. Playwright MCP (Microsoft + Anthropic)

**What it does:**
- Browser automation via MCP protocol
- Claude gets structured access to real browser (not just screenshots)
- Can click, fill, navigate, screenshot, inspect console/network

**Installation:**
```bash
# Add to Claude Code
claude mcp add playwright npx @playwright/mcp@latest
```

**Use case with Frontend Design:**
1. Claude generates UI
2. Launches in real browser via Playwright
3. Self-reviews/iterates on rendered page
4. Loops can run 5-15 iterations

### 3. MCP-Builder Skill

**What it does:**
- Official Anthropic guide for building MCP servers
- Full lifecycle: planning, implementation, testing, evaluation
- Covers TS/Python SDKs, Zod schemas, error handling

**How to access:**
```
GitHub: https://github.com/anthropics/skills/tree/main/skills/mcp-builder
npx skills add anthropics/mcp-builder
```

## Power Combo

```
MCP-Builder → build/extend tools
Playwright MCP → real browser control + self-testing
Frontend Design skill → beautiful, non-generic output
```

**Result:** Prompt → distinctive UI → live browser → automated critique → polished, tested product

## For Evolution Stables

| Project | Use case |
|---------|----------|
| `Evolution_Platform` | Frontend Design → polished website |
| `Evolution_Content` | Playwright → screenshot-based iteration on reels |
| `Evolution_Studio` | MCP-Builder → custom integrations (DNA, SSOT) |

## Setup Tips

1. Use Claude Code for best MCP support
2. Start simple: Playwright MCP first (lowest barrier, highest value)
3. Test Frontend Design on a small landing page
4. Read MCP-Builder when you need custom integrations

## Status
- **Fit:** Should (high-impact for 2026 workflows)
- **Status:** ASSESS — test on small project first

## See Also
- `/workspace/skills/ai/repomix-skill.md`
- `/workspace/skills/video/remotion-skill.md`
- `/workspace/DNA/skills/registry/video_production.md`