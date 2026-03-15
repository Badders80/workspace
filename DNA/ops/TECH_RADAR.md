# 🎯 Tech Radar - Tool & Technology Evaluation

**Purpose:** Keep prior tool evaluations and research notes so we do not repeat the same analysis.

**Rule:** Consult on demand when you want prior evaluation notes, want to avoid re-researching a tool, or want to see what is already on the radar.
**Assistant rule:** Check `STACK.md` first for live adopted or locked tools. Consult this file on demand only; it is not part of the default agent entry chain.

---

## 📊 Evaluation Scale

| Status | Meaning | Action |
|--------|---------|--------|
| 🔴 **Reject** | Not for us | Don't revisit unless fundamentals change |
| 🟡 **Assess** | Interesting, needs research | Watch, gather more info, prototype if needed |
| 🟢 **Trial** | Promising, testing in sandbox | Actively experimenting, limited scope |
| 🔵 **Adopt** | Production ready | Fully integrated into workflow |
| ⚪ **Archive** | Previously evaluated | Historical record, decision documented |

---

## 🔴 Reject (Not For Us)

### Example Template
```markdown
### [Reject Template Tool](URL)
**Discovered:** YYYY-MM-DD
**Category:** AI/Automation/DevOps/etc
**Why considered:** [Brief context - what problem it claimed to solve]
**Decision:** Reject
**Reason:** [Why it doesn't fit - complexity, overlap, philosophy mismatch]
**Revisit if:** [Conditions that would change the decision]
```

---

## 🟡 Assess (Watching / Researching)

### Google Workspace Studio (Taki.gpt)
**Discovered:** 2026-02-27  
**Category:** Business Automation  
**Source:** Instagram @taki.gpt reel  
**Why considered:** No-code AI agents inside Google Workspace (Gmail, Sheets, Drive)  
**Features:** Gemini-powered automation, native Google integration  
**Evaluation notes:**
- ✅ Native Google integration (we use Workspace)
- ✅ No-code entry point
- ⚠️ Overlaps with n8n (already in Trial)
- ⚠️ Overlaps with custom Evolution Command
- ❌ Less flexible than code-first solutions
**Next step:** Compare vs n8n + Evolution Command  
**Decision by:** 2026-03-15

### Greg Isenberg's Obsidian + Claude System
**Discovered:** 2026-02-27  
**Category:** Personal Knowledge Management  
**Source:** Twitter/X @gregisenberg  
**Why considered:** Validated our DNA approach, has interesting ideas to steal  
**Features:** Obsidian vault + Claude Code, custom slash commands (/trace, /graduate)  
**Evaluation notes:**
- ✅ Very similar to our DNA system (we're on right track)
- ✅ Ideas to steal: /trace, /graduate, /connect commands
- ✅ "Humans write, agents read" philosophy aligns
- ⚠️ Requires discipline (Greg says 99.99% won't do it)
**Next step:** Implement /trace and /graduate commands in our workflow  
**Decision by:** 2026-03-10

### Google Antigravity
**Discovered:** 2026-02-27  
**Category:** AI Agent IDE  
**Source:** @daviss.dev Instagram reel
**Why considered:** "Vibe coding" with parallel agents, UI generation, Mission Control interface  
**Features:** Multi-agent orchestration, UI generation, validation agents, Claude Code integration  
**Evaluation notes:**
- ✅ Free tier available
- ✅ Google's backing (likely sustained)
- ⚠️ Overlaps with existing tools (Claude Code, Evolution Studio)
- ⚠️ "Yet another IDE" problem
**Next step:** Compare features vs. current stack (Evolution Studio + Claude)  
**Decision by:** 2026-03-10

### NotebookLM MCP Server
**Discovered:** 2026-02-27  
**Category:** AI Memory / Context  
**Source:** @agentic.james Instagram reel  
**Why considered:** Long-term memory for Claude agents, plug-and-play  
**Features:** Document ingestion, synthesized context, persistent memory across sessions  
**Evaluation notes:**
- ✅ Addresses real pain point (context loss)
- ✅ Google's infrastructure
- ⚠️ Overlaps with our DNA memory system
- ⚠️ External dependency for critical function
**Next step:** Compare vs. current DNA-based memory approach  
**Decision by:** 2026-03-01

### OpenClaw Core Runtime (`openclaw/openclaw`)
**Discovered:** 2026-02-27  
**Category:** AI Agent Orchestration  
**Source:** @agentic.james Instagram reels + research  
**Why considered:** Need dashboard for grouping tasks, managing agents, tools/skills registry  
**Features:** Kanban boards, drag-drop tasks, agent coordination, skill registry, cron jobs, memory graph  
**Evaluation notes:**
- ✅ Solves real problem (agent management)
- ✅ Open source, active development
- ⚠️ Full runtime introduces more operational overhead than dashboard-only setup
**Next step:** Keep in Assess as advanced path only  
**Decision by:** 2026-03-20

---

## 🟢 Trial (Testing in Sandbox)

### NotebookLM for Prompt Creation
**Discovered:** 2026-02-27  
**Category:** Prompt Engineering  
**Source:** @agentic.james Instagram reel  
**Why considered:** Aggregate docs and create rich system prompts for agents  
**Features:** Document ingestion, synthesis, structured output  
**Status:** Trial  
**Trial notes:**
- ✅ Could improve our agent prompts
- ✅ Fits Evolution Content workflow
- 🔄 Test with one content generation task
- 🔄 Compare output quality vs. current prompts
**Decision due:** 2026-03-10  
**Go/No-go criteria:** Does it produce significantly better prompts than our current method?

### n8n AI Workflows
**Discovered:** 2026-02-25  
**Category:** Workflow Automation  
**Source:** @liamjohnston.ai Instagram reel  
**Why considered:** Generate workflows from Claude code, automation platform  
**Status:** Already installed in External/n8n  
**Trial notes:**
- ✅ Docker container running
- ✅ Basic workflows working
- 🔄 Need to test Claude-generated workflow integration
- 🔄 Evaluate vs. custom Evolution Command workflows
**Decision due:** 2026-03-15  
**Go/No-go criteria:** Can it replace or augment our custom monitoring/command system?

---

## 🔵 Adopt (Production)

### OpenClaw Mission Control Template (`abhi1693/openclaw-mission-control`)
**Adopted:** 2026-03-04  
**Category:** AI Agent Orchestration Dashboard  
**Why chosen:** Preferred dashboard of choice when we need a fast, simple mission-control setup  
**Status:** Default template for dashboard-first orchestration starts  
**Integration:** Use first for dashboard bootstrap; escalate to `openclaw/openclaw` only when full runtime features are required  
**Notes:** Keep implementation lean, reversible, and operator-owned

### Claude Code
**Adopted:** 2025 (pre-DNA)  
**Category:** AI Coding Assistant  
**Why chosen:** Best-in-class reasoning, agentic capabilities, API available  
**Status:** Primary AI tool for development  
**Integration:** Kimi CLI, Evolution Studio, various projects  
**Notes:** Still evaluating Claude 4 when released

### Obsidian + DNA
**Adopted:** 2026-01  
**Category:** Knowledge Management  
**Why chosen:** Local-first, markdown, graph view, portable across AI tools  
**Status:** Central source of truth for all project knowledge  
**Integration:** All AI assistants read DNA first  
**Notes:** Added templates, skills registry, tech radar

### FZF + Zoxide + Just + Starship
**Adopted:** 2026-02-27  
**Category:** Terminal Productivity  
**Why chosen:** Lightweight, proven, solve specific friction points  
**Status:** Daily workflow tools  
**Integration:** Bash aliases, Justfile tasks  
**Notes:** Zero maintenance, high ROI

---

## ⚪ Archive (Previous Evaluations)

### Godofprompt Agentic AI Architecture
**Discovered:** 2026-02-27  
**Evaluated:** 2026-02-27  
**Source:** Instagram @godofprompt  
**Category:** Educational Content  
**Decision:** Archive (educational only)  
**Reason:** Good conceptual framework (LLM → Agents → Multi-Agent → Infrastructure) but not a tool. Validates our architecture approach.  
**Revisit if:** Need to explain agentic AI concepts to someone

### Wizofai Mindset Reset
**Discovered:** 2026-02-27  
**Evaluated:** 2026-02-27  
**Source:** Instagram @wizofai  
**Category:** Educational Content  
**Decision:** Archive (mindset only)  
**Reason:** Philosophical post about productivity expectations in 2026. Good reminder but not actionable tool.  
**Revisit if:** Need motivation/reminder about productivity philosophy

### Claude Code Features Guide
**Discovered:** 2026-02-27  
**Evaluated:** 2026-02-27  
**Source:** @agentic.james Instagram  
**Category:** Educational Content  
**Decision:** Archive (already adopted)  
**Reason:** Tutorial content on features we already use daily. No new information.  
**Revisit if:** Onboarding someone new to Claude Code

### [Example Archived Tool]
**Discovered:** YYYY-MM-DD  
**Evaluated:** YYYY-MM-DD  
**Status:** Rejected  
**Decision:** [Why it was rejected]  
**Revisit if:** [Conditions changed]

---

## 📝 How to Add New Discoveries

When you find a new tool/repo/tech:

```markdown
### [Discovery Template Tool](URL)
**Discovered:** YYYY-MM-DD
**Category:** [AI/DevOps/Frontend/etc]
**Source:** [Where you found it - IG, Twitter, friend, etc]
**Why considered:** [What problem does it claim to solve?]
**Initial impression:** [Hot take - 1-2 sentences]
**Status:** Assess
**Next step:** [Specific action to evaluate]
**Decision by:** [Date - usually 1-2 weeks]
```

---

## 🎯 Evaluation Criteria

Before moving to Trial or Adopt, answer:

1. **Problem fit:** Does it solve a real problem we have?
2. **Overlap:** Does it duplicate existing tools?
3. **Complexity:** Is the learning curve worth the benefit?
4. **Lock-in:** Can we migrate away if needed?
5. **Maintenance:** Who maintains it? Will it exist in 2 years?
6. **Philosophy:** Does it align with our build rules?

---

## 🔄 Review Schedule

- **Weekly:** Scan "Assess" items - any ready for Trial?
- **Monthly:** Review "Trial" items - promote or reject?
- **Quarterly:** Review "Adopt" items - still the best choice?

---

**Last updated:** 2026-03-16  
**Next review:** 2026-03-23
