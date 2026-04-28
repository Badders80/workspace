# 📜 Decision Log - Evolution Stables

**Purpose:** Document significant architectural and strategic decisions.  
**Principle:** Decisions without context are just rules. Understand why.

---

## Read This First (2026-03-12)

- This file is a historical ledger, not the live source of truth for current operating rules.
- `/home/evo/workspace` is the canonical build surface.
- `/home/evo` is control plane only.
- `/home/evo/.env` remains the single shared env source.
- `DNA/agents/AI_CONTEXT.md` is the current agent-entry context.
- `DNA/INBOX.md` replaces the old workspace-level `OPERATING_BACKLOG.md` pattern.
- Older entries may mention legacy paths such as `/home/evo/projects`, `/home/evo/00_DNA`, or `/evo/...`; treat those as historical unless a newer decision reaffirms them.
- Do not rewrite older decisions just to modernize paths; append a new decision when the operating model changes.

---

## 2026-04-24: Adopt Karpathy LLM Wiki Pattern for research_vault (v0.1)

### Decision
Restructure `research_vault/` to match the Karpathy LLM Wiki pattern with immutable pages and strict provenance. Replace the old `00_Inbox/` → `06_Promoted/` folder structure with `raw/` → `wiki/` → `index.md` → `log.md` → `AGENT.md`.

| Decision | Choice | Rationale |
|---|---|---|
| Folder structure | Karpathy pattern | `raw/` (immutable sources) + `wiki/` (append-only AI pages) + `index.md` + `log.md` + `AGENT.md` (schema). Clear separation of concerns. |
| Wiki mutation model | Immutable pages + strict provenance | AI never overwrites existing wiki pages. Every claim cites `raw/filename.md#Lstart-Lend`. Prevents silent drift and hallucination compounding. |
| AI partner | GLM-5.1:cloud single hand | Operational simplicity. Conductor/worker orchestration stays untouched for project work. |
| Write permissions | New `wiki-keeper` OpenFang hand | Write scope limited to `research_vault/` only. `never_delete = true`. All other hands remain `strict_read_only`. |
| Search | `vault-search.py` (grep-based) | `qmd` deferred to v0.2 — cargo build pulled llama.cpp CUDA, too heavy for v0.1. Lightweight Python search sufficient for now. |
| First ingest | Karpathy gist → DNA docs | Prove pipeline with pattern's own source, then bootstrap with existing workspace knowledge. |
| Session rituals | Updated | `session-start.sh` shows vault status. `session-end.sh` prompts for `just vault-push`. |

### Context
The research vault existed as a well-structured but underutilized sidecar. The Karpathy gist (2026-04-24) provided the operational pattern: raw sources → AI-maintained wiki → index → log. The key insight: the tedious part of knowledge management is bookkeeping, and LLMs can absorb that cost. The critical guardrail: immutable pages prevent the "LLM reads its own prose, human wonders where truth went" problem.

### Impact
- `research_vault/` — restructured with `raw/`, `wiki/`, `index.md`, `log.md`, `AGENT.md`
- `DNA/ops/STACK.md` — added wiki-keeper hand, vault-ingest, vault-lint, vault-search
- `workspace/Justfile` — added `vault-ingest`, `vault-lint`, `vault-search`, `vault-status`, `vault-push`
- `workspace/_scripts/` — added `vault-ingest.sh`, `vault-lint.py`, `vault-search.py`
- `_docs/openfang-wizard/hands/wiki-keeper/` — new write-enabled hand
- `session-start.sh` / `session-end.sh` — vault status and push reminders

### Related Files
- `/home/evo/workspace/research_vault/AGENT.md`
- `/home/evo/workspace/research_vault/index.md`
- `/home/evo/workspace/research_vault/log.md`
- `/home/evo/workspace/_docs/openfang-wizard/hands/wiki-keeper/HAND.toml`
- `/home/evo/workspace/_docs/openfang-wizard/hands/wiki-keeper/SKILL.md`

---

## 2026-04-23: Adopt caveman-commit and caveman-review Skills

### Decision
Adopt `caveman-commit` and `caveman-review` as workspace tools. These are the skill-based commands from the caveman ecosystem (juliusbrussee/caveman). Skip output compression (caveman full/ultra/lite auto-activation) — already handled by BRAND_SYSTEM §10A policy.

| Decision | Choice | Rationale |
|---|---|---|
| caveman-commit | Adopt — `/caveman-commit` | Terse conventional commit messages, ≤50 char subject, why over what. Fits the orchestration + Fang hand surface. No dependency on plugin install — works as a prompt/skill pattern. |
| caveman-review | Adopt — `/caveman-review` | One-line PR comments: `L42: 🔴 bug: user null. Add guard.`. Removes throat-clearing from code review output. |
| Output compression (auto-activation) | Skip — already in BRAND_SYSTEM §10A | The actual caveman plugin (auto-activation, /caveman, mode switching) is not adopted as a core tool. The style is already encoded in policy. Marginal gain doesn't justify single-maintainer dependency risk and audit trail opacity. |
| Input compression (caveman-compress) | Skip | Rewrites memory files so AI reads compressed versions. Makes human review of AI input impossible. Not appropriate for governance-critical workspace memory files. |

### Context
The workspace already has `caveman lite` style adopted (2026-04-11 decision) for internal operating surfaces. The actual caveman CLI/plugin from juliusbrussee/caveman was never installed as a tool. Evaluating whether to adopt it, two concerns were raised: output compression audit trail risk and single-maintainer dependency. The skill-based tools (commit, review) don't carry those concerns — they are pattern-based, not compression-based.

### Impact
- `DNA/ops/STACK.md` — caveman-commit and caveman-review added to Utility/Optional
- `DNA/ops/DECISION_LOG.md` — this decision record
- BRAND_SYSTEM §10A — no change; output compression already handled by policy

### Related Files
- `/home/evo/workspace/DNA/brand/BRAND_SYSTEM.md` §10A
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md` (caveman lite style already registered)

---

## 2026-04-14: Local Vision MCP — "Eyes for Any Model"

### Decision
Add a local vision MCP server that acts as shared "eyes" for all text-only Ollama models. Any agent that can call MCP tools gets vision capability through a single `analyze_image` tool call. Two-tier setup: quick eyes (e2b) for fast OCR, deep eyes (e4b) for full detail.

| Decision | Choice | Rationale |
|---|---|---|
| Vision model (deep) | gemma4:e4b (9.6GB, Apache 2.0) | Smoke tested — exceptional OCR, layout, color, and pattern recognition. Fits RTX 3060. |
| Vision model (quick) | gemma4:e2b (7.2GB, Apache 2.0) | Same architecture as e4b, ~2x faster for OCR-only tasks. |
| Keep-alive | Permanent (-1) | GPU is dedicated; both models stay loaded for zero cold-start. |
| Integration | MCP server in `.vscode/mcp.json` | Plug-and-play for VS Code Copilot. Any MCP client gets eyes. |
| Server pattern | Raw JSON-RPC over stdio (matches codex-peers-mcp) | Zero dependencies beyond Python stdlib. No FastMCP/mcp SDK required. |
| Architecture | "Eyes for any model" — model-agnostic bridge | glm-5.1, qwen3.5, deepseek, nemotron, kimi, minimax, gpt-oss all gain vision through one tool. |
| Not selected | llava:7b, gemma3:4b | Outdated or too weak for "really good" quality. |
| Not selected | gemma3:12b, qwen3-vl:8b | Not pulled for testing; gemma4:e4b already exceptional. |

### Context
Copilot (glm-5.1:cloud) cannot see images natively. User needs vision for UI review, OCR, and design analysis. All 9 active Ollama models are text-only. A shared vision bridge eliminates the need for each model to have native vision capability.

### Performance (RTX 3060, models pre-loaded)

| Tier | Model | Brief prompt | Full detail |
|------|-------|-------------|-------------|
| Quick | gemma4:e2b | ~14s | ~21s |
| Deep | gemma4:e4b | ~25s | ~42s |

### Impact
- `_sandbox/vision-mcp/server.py` — new MCP server
- `.vscode/mcp.json` — vision server registered
- `DNA/ops/STACK.md` — vision MCP added to adopted tools
- All 9 text-only Ollama models gain vision via `analyze_image`

### Related Files
- `/home/evo/workspace/_sandbox/vision-mcp/server.py`
- `/home/evo/workspace/_sandbox/vision-mcp/README.md`
- `/home/evo/workspace/.vscode/mcp.json`

---

## 2026-04-14: Anti-Loop Modelfile Wrappers for Ollama Cloud Models

### Decision
Create Modelfile wrappers with baked-in repetition suppression for Ollama cloud
models (especially Nemotron-3-Super:cloud) to prevent degenerate output loops.

| Decision | Choice | Rationale |
|---|---|---|
| repeat_penalty | 1.5 (aggressive) | Nemotron family prone to repetition collapse |
| num_ctx | 131072 | 128K — half the 256K max; generous for reasoning, cuts loop runway by 50% |
| num_predict | 8192 | Hard cap prevents runaway output |
| Stop tokens | "Let me check if there are any existing examples of" etc. | Breaks the observed loop pattern |
| System prompt | Anti-loop protocol with search budget + forced termination | Structural guardrail that works regardless of sampling params |

### Context
Nemotron-3-Super:cloud entered a degenerate repetition loop during a codebase
exploration task, cycling through "Let me check if there are any existing
examples of [X] components" for increasingly absurd categories (weather
instruments, NFC readers, etc.) for hundreds of iterations. The model's
training makes it prone to this; cloud inference defaults don't include
sufficient repeat_penalty.

### Impact
- `models/ollama/Modelfile.nemotron-super-128k` — custom wrapped model
- `models/ollama/Modelfile.anti-loop` — generic wrapper for any model
- `DNA/agents/ANTI_LOOP_PROMPT.md` — reusable system prompt fragment
- STACK.md updated to reference wrapped model

### Related Files
- `/home/evo/workspace/models/ollama/Modelfile.nemotron-super-128k`
- `/home/evo/workspace/models/ollama/Modelfile.anti-loop`
- `/home/evo/workspace/DNA/agents/ANTI_LOOP_PROMPT.md`

---

## 2026-04-13: Reconcile Brand Design System (DESIGN.md v1 → v2)

### Decision
Rewrite `DNA/brand/DESIGN.md` to match the actual codebase and incorporate
Brand Kernel v0.3 concepts. Key decisions:

| Decision | Choice | Rationale |
|---|---|---|
| Background color | `#09090b` (Velvet Night) | Softer than pure `#000000`, matches v0.3 concept |
| Gold accent | `#d4a964` | Already canonical in codebase as `--evolution-gold` |
| Typography | Instrument Serif + Inter Tight + Geist Mono | Stronger heritage+precision system per AB decision |
| "Paddocks to Protocols" | Banned everywhere | Per INTELLIGENCE_SYSTEM.md, confirmed by AB |
| Design philosophy | "Cinematic Fintech" / "Progressive Premium" | From v0.3 Brand Kernel |
| Card components | Dark mode only (`#0a0a0a`) | Current light-mode cards contradict dark site |
| Favicon | Replace generic geometric with horse mark | Current favicon unrelated to brand |

### Context
DESIGN.md v1 described a generic white-background SaaS product that contradicted
the actual dark-mode + gold site in production. Brand Kernel v0.3 introduced
"Cinematic Fintech", "Progressive Premium", "Velvet Night", motion direction,
and voice modules not yet in DNA. Full audit of codebase (`brand.css`,
`tailwind.config.ts`, component files, logo SVGs, image assets) revealed
significant gaps between documentation and reality.

### Impact
- New `DESIGN_v2_REVIEW.md` created for AB review before canonical swap
- Orchestration ticket raised: `2026-04-13_brand_design_reconcile`
- Codebase changes (Card component, favicon, font imports, color variables)
  deferred to follow-up ticket
- Phases 2–5 (logo system, imagery, channels, motion) queued after Phase 1

### Related Files
- `/home/evo/workspace/DNA/brand/DESIGN_v2_REVIEW.md`
- `/home/evo/workspace/DNA/brand/DESIGN.md` (current, to be replaced after review)
- `/home/evo/workspace/orchestration/tickets/active/2026-04-13_brand_design_reconcile.md`

---

## 2026-04-13: Adopt Progressive Disclosure for Session Start + Defer claude-mem

### Decision
Adopt the progressive disclosure pattern (index → timeline → full) from
claude-mem for `session-start.sh`. Defer claude-mem itself — overlaps with
existing file-based memory, requires heavy runtime (Bun, SQLite, ChromaDB,
worker service), and is AGPL-3.0 licensed.

### Context
Reviewed thedotmack/claude-mem (50k stars, v12.1.0). It solves persistent
memory across sessions via lifecycle hooks, SQLite + ChromaDB storage, and
AI-compressed summaries. Our workspace already has file-based memory
(MEMORY_LOG.md, STATE.md, tickets) and VS Code Copilot's built-in memory.

### Decision Details
- **Adopt pattern**: Progressive disclosure (index → timeline → details) is
  token-efficient and smart. Implemented as `--detail` flag on session-start.sh.
  - `index` (default): compact one-liners per domain, ticket count, last memory
  - `timeline`: adds recent memory entries, in-review/done tickets
  - `full`: complete state files and memory logs (old behavior)
- **Defer claude-mem**: Overlaps with existing memory system, adds heavy
  runtime (Bun + SQLite + ChromaDB + port 37777 worker), AGPL-3.0 conflicts
  with closed-source marketplace intent, and Claude Code primary doesn't align
  with our Copilot + GLM-5.1 stack.
- **Justfile updated**: `just session-start detail='index'` (default),
  `just session-start detail='timeline'`, `just session-start detail='full'`

### Impact
- `session-start.sh` rewritten with 3-layer progressive disclosure
- Justfile recipe updated with `detail` parameter
- No new dependencies added
- Token savings: index layer is ~15 lines vs old ~80 lines for session start

### Related Files
- `/home/evo/workspace/_scripts/session-start.sh`
- `/home/evo/workspace/Justfile`

---

## 2026-04-13: Adopt External Tools for Agentic Flow

### Decision
Adopt GSD-2 execution pattern, UI/UX Pro Max design intelligence, Google Stitch
design.md + MCP, 21st.dev component registry, and obsidian-llm-wiki for
research_vault. Defer oh-my-claudecode, eigent, 21st.dev Magic MCP, and
21st.dev Extension.

### Context
The think/do agentic model needs operational tooling to move from documentation
pattern to operational system. External tools were evaluated against governance
(local-first, bounded execution, STACK.md alignment).

### Decision Details
- GSD-2: Adopt execution pattern only (plan → execute → verify → ship), not
  project management paradigm. Verify phase maps to Fang verification.
- UI/UX Pro Max: Adopt for UI work, exclude CIP mockup generation (cloud-only).
- Google Stitch: Adopt design.md contract (local-first, version-controllable)
  + MCP integration (cloud for screen generation, optional). Auth through ADC.
- 21st.dev: Adopt component registry only (install via `npx shadcn`). Magic MCP
  and extension toolbar deferred.
- obsidian-llm-wiki: Adopt for research_vault knowledge processing. Ollama-native,
  zero cloud, Obsidian-compatible.
- oh-my-claudecode: Deferred — conflicts with think/do architecture.
- eigent: Deferred — conflicts with OpenFang execution surface.
- Conductor hand: Does NOT write to DNA/ — human-only.
- Worker writes: Go through Fang verification, not directly to projects/.

### Impact
- Adds 5 new OpenFang hands (conductor, heavy-worker, focused-worker,
  utility-worker, reasoning-partner).
- Adds 3 new scripts (ticket-route, session-start, session-end).
- Adds GSD execution pattern to orchestration roles.
- Adds DESIGN.md to DNA/brand/ for design system specification.
- Adds wiki.toml to research_vault/ for knowledge processing.
- Updates ALLOWLIST_POLICY.md with role-specific write paths.
- Updates STACK.md with new tools and deferred tools.

### Related Files
- `/home/evo/workspace/orchestration/roles/GSD_EXECUTION_PATTERN.md`
- `/home/evo/workspace/DNA/skills/UI_UX_PRO_MAX.md`
- `/home/evo/workspace/DNA/brand/DESIGN.md`
- `/home/evo/workspace/research_vault/wiki.toml`
- `/home/evo/workspace/_docs/openfang-wizard/hands/conductor/`
- `/home/evo/workspace/_docs/openfang-wizard/hands/heavy-worker/`
- `/home/evo/workspace/_docs/openfang-wizard/hands/focused-worker/`
- `/home/evo/workspace/_docs/openfang-wizard/hands/utility-worker/`
- `/home/evo/workspace/_docs/openfang-wizard/hands/reasoning-partner/`
- `/home/evo/workspace/_scripts/ticket-route.sh`
- `/home/evo/workspace/_scripts/session-start.sh`
- `/home/evo/workspace/_scripts/session-end.sh`

---

## 2026-04-13: Adopt Conductor-Worker / Think-Do Agentic Flow

### Decision
Adopt GLM-5.1:cloud as the primary conductor model for agentic orchestration,
with Nemotron-3-Super:cloud as the reasoning partner and DeepSeek/Qwen as
workers. Replace the previous single-agent execution model with a think/do
architecture that uses the orchestration layer as the agent communication hub.
Absorb the General Manager role into the conductor — no GM layer between
conductor and PMs.

### Context
- The workspace has strong governance (DNA), coordination (orchestration), and
  execution (projects) layers, but the agentic execution layer was
  underperforming.
- Codex CLI was listed as the primary workspace agent but empirical evidence
  showed GLM-5.1:cloud produced noticeably better agentic results for planning,
  tool use, and multi-step reasoning.
- The orchestration layer already had role contracts, streams, and tickets but
  lacked an explicit conductor-specialist model for model assignment.
- Available cloud models have different strengths: DeepSeek-V3.1 for heavy
  coding, Qwen3-Coder-Next for focused implementation, Nemotron-3-Super for
  reasoning, Qwen3.5 for utility.
- The General Manager role was redundant with the conductor — both route
  priorities across domains and coordinate PMs.

### Decision Details
- GLM-5.1:cloud is the primary conductor for planning, decomposition,
  delegation, verification, and synthesis.
- Nemotron-3-Super:cloud is the reasoning partner for plan review and
  stress-testing before high-stakes execution.
- Workers (DeepSeek, Qwen3-Coder, Qwen3.5) execute scoped work — they do not
  plan their own approach.
- Think layer plans. Do layer executes. Workers don't plan.
- Conductor absorbs the former General Manager role.
- GENERAL_MANAGER.md removed from orchestration/roles/.
- SPECIALIST_AGENTS.md replaced with WORKERS.md.
- Ticket-based communication replaces ad-hoc agent invocation.
- Human-in-the-loop graduation path is explicit: Phase 1 (manual approval)
  through Phase 4 (full automation, future).
- The orchestration layer is the agent communication hub.
- Local models (Ollama) remain the default for routine work.
- Hosted routes require explicit human opt-in per BUDGET_RULES.md.

### Impact
- Changes the primary agent interface from Codex CLI to GLM-5.1:cloud.
- Removes the GM layer — conductor talks directly to PMs.
- Adds CONDUCTOR.md and WORKERS.md role contracts to orchestration/roles/.
- Updates STACK.md to reflect the think/do model.
- Preserves all existing governance, write scope, and budget rules.

### Related Files
- `/home/evo/workspace/orchestration/_planning/AGENTIC_FLOW_LOCKIN_2026-04-13.md`
- `/home/evo/workspace/orchestration/roles/CONDUCTOR.md`
- `/home/evo/workspace/orchestration/roles/WORKERS.md`
- `/home/evo/workspace/DNA/ops/STACK.md`

---

## 2026-04-11: Adopt `orchestration/` As The Governed Coordination Layer

### Decision
Adopt `/home/evo/workspace/orchestration/` as the managed coordination layer
between immutable `DNA/` and executable `projects/`. Use it for management
state, tickets, role contracts, and domain memory while keeping OpenFang as the
bounded hands layer.

### Context
- The workspace already had strong governance in `DNA/` and active execution
  surfaces in `projects/`, but it lacked one explicit middle layer for
  top-down management, domain memory, and structured delegation.
- The desired operating model is hierarchical and file-based:
  CEO -> General Manager -> Product Managers -> Fang hands.
- Existing governance explicitly forbids hidden autonomous routing and treats
  lenses as prompt or role surfaces rather than separate always-on runtimes.
- `SSOT` and `Evolution_Platform` are the only truly active management lanes at
  this stage; `Studio` and `Content` should exist as light lanes, not as equal
  active-build lines yet.

### Decision Details
- Add `orchestration/` with three core sub-surfaces:
  - `roles/` for General Manager, PM, and Fang operating contracts
  - `streams/` for per-domain `STATE`, `MEMORY_LOG`, and `ROADMAP`
  - `tickets/` for bounded work packets and handoff tracking
- Treat PM and Fang files as lenses, prompts, and operating contracts only.
- Keep `DNA/` read-only from below:
  - PMs and Fang may raise issues or propose changes
  - only governance-approved paths may change `DNA/`
- Keep the current `_docs/agent-stack/TICKET_FLOW.md` handoff rules in force.
  *(Retired 2026-04-26: replaced by MEMORY.md + SESSION_LOG.md)*
- Allow concise internal operating language, including a `caveman lite` style,
  for orchestration surfaces, while keeping governance and external-facing text
  in normal professional prose.

### Impact
- Creates a durable middle layer for memory, ticketing, and delegation without
  introducing a competing runtime model.
- Gives `SSOT` and `Platform` persistent PM surfaces that can retain context
  across sessions through tracked files.
- Keeps governance stable by preserving `DNA/` authority and the existing Fang
  boundary.

### Related Files
- `/home/evo/workspace/orchestration/README.md`
- `/home/evo/workspace/orchestration/roles/CONDUCTOR.md` (absorbs former GM role)
- `/home/evo/workspace/orchestration/roles/PM_SSOT.md`
- `/home/evo/workspace/orchestration/roles/PM_PLATFORM.md`
- `/home/evo/workspace/orchestration/roles/FANG_EXECUTION.md`
- `/home/evo/workspace/_docs/agent-stack/TICKET_FLOW.md` *(Retired 2026-04-26: replaced by MEMORY.md + SESSION_LOG.md)*
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

---

## 2026-04-11: Adopt `caveman lite` As The Internal Operating Style

### Decision
Use `caveman lite` as the default style for workspace internal operating surfaces. Keep it direct, grammar-safe, and low-filler. Keep `DNA/`, legal/compliance content, and external-facing content in normal prose.

### Context
- The workspace asked for a concise, direct communication style that keeps the management layers clear without turning governance into slop or slang.
- The new orchestration layer and Fang hand contracts benefit from short, readable operating notes and ticket text.
- The rule should apply to internal management and execution surfaces, not to canonical governance or public output.

### Decision Details
- Apply `caveman lite` to:
  - orchestration role contracts
  - stream state and memory logs
  - tickets and handoff notes
  - internal workspace coordination docs
- Do not apply it to:
  - `DNA/`
  - legal/compliance text
  - external-facing content

### Impact
- Keeps internal communication compact and direct.
- Reduces filler in the management layer without degrading governance quality.
- Gives the orchestration layer a consistent voice across roles and tickets.

### Related Files
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/AGENTS.md`
- `/home/evo/workspace/DNA/agents/AI_CONTEXT.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`

---

## 2026-04-11: Lock Marketplace Public, MyStable Private, And Keep v0.0 Manual-Truthful

### Decision
Treat the Evolution marketplace as open information by default and treat
`MyStable` as private by default. For v0.0, build the next Platform slice as a
truthful manual-review-first shell rather than a speculative authenticated
investment dashboard.

### Context
- The current Platform already has a real public marketplace and a real manual
  interest or application capture flow.
- `MyStable` is still only a holding page, while the legacy dashboard mockup
  contains fake holdings, fake portfolio values, and performance language that
  would mislead users if revived.
- The user clarified the intended operating model:
  - marketplace is open info
  - MyStable is the private user surface
  - purchase is gated and user-specific
  - `Sumsub` will own KYC
  - `Stripe`, `Wise`, and bank transfer will own payment rails
  - auth and strict per-user filtering come later
- The workspace already locks `n8n` as an active tool, but the next slice does
  not need automation first. It needs honest boundaries and a truthful shell.

### Decision Details
- Run the next Platform work in this order:
  1. route and copy truth pass
  2. MyStable MVP shell
  3. KYC journey map
  4. payment journey map
  5. transaction lifecycle map
  6. hardening and cleanup
- Keep the immediate implementation slice limited to:
  - public/private copy truth
  - truthful `MyStable` shell cards and placeholders
  - static or local demo states only
- Do not build yet:
  - real auth wiring
  - real per-user filtering
  - provider integrations
  - fake holdings, fake charts, or speculative backend logic
- Defer `n8n` until the user-facing shell and state model are locked by real
  manual use.

### Impact
- Gives the build a clean and honest next step instead of mixing public
  marketing, private onboarding, and not-yet-real ownership states.
- Prevents the v0.0 dashboard from implying live holdings or completed checkout
  before the required auth, KYC, payment, and allocation seams exist.
- Keeps future provider work reversible by locking the user-facing state model
  before implementation details.

### Related Files
- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_PLATFORM_MARKETPLACE_BUILD_PLAN_2026-04-10.md`
- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_PLATFORM_MYSTABLE_V0_EXECUTION_PLAN_2026-04-11.md`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/mystable/page.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/src/components/mystable/LegacyMyStablePage.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/src/components/marketplace/StakeApplicationForm.tsx`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

---

## 2026-04-10: Standardize Local Claude Code Launch On Ollama Gemma 4

### Decision
Use a dedicated local launcher for Claude Code on this machine. Interactive
sessions should launch through `ollama launch claude --model gemma4:e4b`, while
non-interactive or piped workflows should fall back to the direct
Anthropic-compatible local bridge at `http://localhost:11434` with `--bare`.

### Context
- The user clarified that the earlier carousel script was only a temporary test
  to prove local Ollama connectivity and was not the real workflow goal.
- On 2026-04-10, the interactive supported integration was verified locally:
  `ollama launch claude --model gemma4:e4b` opened Claude Code `v2.1.97` and
  showed `gemma4:e4b` in the header.
- The direct bridge was also verified for non-interactive use:
  `ANTHROPIC_BASE_URL=http://localhost:11434 ... claude --bare --print --model gemma4:e4b`
  returned a correct `OK` response.
- The `/v1` base URL failed on this machine for Claude Code with local Gemma,
  and the prior `.bashrc` setup relied on a brittle self-shadowing alias plus
  globally exported Anthropic env vars.

### Decision Details
- Add `/home/evo/workspace/_scripts/claude-local.sh` as the single launcher
  surface for local Gemma-backed Claude Code.
- Route behavior by mode:
  - interactive TTY use -> `ollama launch claude`
  - `--print` or piped input -> direct local bridge with `--bare`
- Default the model to `gemma4:e4b`, while still allowing explicit `--model`
  overrides.
- Remove global `ANTHROPIC_*` exports from `/home/evo/.bashrc`.
- Replace the old alias with:
  - `claude` -> local launcher
  - `claude-native` -> raw installed Claude Code binary
- Update the workspace `claudec.sh` helper to delegate through the same local
  launcher so the tracked wrapper surface stays aligned.

### Impact
- Makes the local Claude Code path reproducible without depending on fragile
  shell alias expansion behavior.
- Preserves a supported interactive launch path and a reliable non-interactive
  fallback in one place.
- Keeps the raw Claude binary reachable for future cloud or alternate-provider
  use without requiring uninstall or path surgery.

### Related Files
- `/home/evo/workspace/_scripts/claude-local.sh`
- `/home/evo/workspace/_scripts/claudec.sh`
- `/home/evo/.bashrc`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

---

## 2026-04-10: Formalize Local Claude Lane Roles For Fast, Debug, And Audit

### Decision
Keep local Claude as a multi-lane surface rather than one undifferentiated
model choice. Standardize distinct local roles for fast triage, debugger, and
audit work so the cheapest local path is used first and the heavier lanes are
deliberate escalations.

### Context
- The workspace already had governed OpenFang local routes for daily, debug,
  and audit behavior.
- Local Claude on Ollama is now working cleanly, so the same role split can be
  mirrored at the Claude launcher layer for direct operator use.
- The user explicitly wants local models to become a reusable asset across the
  current agent stack instead of a one-off novelty path.

### Decision Details
- Keep `claude` on `gemma4:e4b` as the default local generalist lane.
- Add shell shortcuts and matching `just` targets:
  - `claude-fast` -> `qwen3.5:latest`
  - `claude-debug` -> `deepseek-coder-v2:16b`
  - `claude-audit` -> `granite4:7b-a1b-h`
  - `claude-yolo` -> `claude-yolo`
- Mirror the same role split for OpenFang startup helpers:
  - `fang-local`
  - `fang-debug`
  - `fang-audit`
- Treat these as operator presets, not automatic routing. The human still
  chooses the lane.

### Impact
- Makes local compute useful as a repeatable operating surface rather than a
  one-model experiment.
- Reduces needless use of heavier local or paid models when a small fast lane
  is enough.
- Gives the current stack a cleaner path to parallel work: executor, debugger,
  and auditor can now be launched intentionally with existing tools.

### Related Files
- `/home/evo/.bashrc`
- `/home/evo/workspace/Justfile`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Use A Stage-Gated Single-Writer Orchestration Model For The Marketplace Build

### Decision
Run the Evolution Stables marketplace build through a stage-gated managed
delivery model: one human board seat, one default writer, and several explicit
local or bounded review lanes. Keep `SSOT_Build` as canonical truth, keep
`Evolution_Platform` as the consuming experience layer, and defer provider
lock-in until the seams are proven by real manual use.

### Context
- The user clarified the desired mental model:
  - `SSOT_Build` owns canonical horse, lease, and offering data
  - new horse records are created there
  - generated docs are downloaded and stored locally during v0.0
  - `Evolution_Platform` owns presentation, investor flow, and later
    transaction handling
- The current workspace stack already has a governed split between Codex,
  Hermes, local Claude lanes, and bounded OpenFang hands.
- The current handoff rules do not allow silent autonomous routing or multiple
  competing executors to mutate the same live build surface.
- The marketplace brief still needs fast prototyping and partner flexibility,
  so it is safer to lock boundaries, presets, and handoffs now instead of
  prematurely locking Supabase, Firestore, Stripe, Wise, or other providers as
  hard architecture.

### Decision Details
- Create a project-specific orchestration blueprint under the live agent-stack
  doc surface.
- Standardize the stage order for this build:
  - contract lock
  - SSOT live knowledge hub
  - publish surface
  - marketplace experience MVP
  - manual transaction ops
  - provider seams
  - hardening and release
- Keep Codex as the default implementation writer and integrator.
- Use Hermes for brief shaping and decision framing.
- Use local Claude lanes and OpenFang hands as read-only or bounded planning
  and review lanes, not as parallel competing code writers.
- Keep experiments and route tests inside `_sandbox` until they are explicitly
  promoted.

### Impact
- Gives the marketplace build a repeatable operating model that matches the
  current stack instead of fighting it.
- Preserves speed by allowing parallel scouting and review without creating
  conflicting ownership over the same files.
- Keeps vendor choice reversible while the real knowledge, publish, and manual
  transaction seams are still being proven.

### Related Files
- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md`
- `/home/evo/workspace/_docs/agent-stack/README.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Run Marketplace v0.0 On A Local-First Publish Flow With 3 Release Stages

### Decision
For marketplace v0.0, keep `SSOT_Build` on a local-first authoring and publish
flow, keep `Evolution_Platform` as the consumer of published marketplace
payloads, and standardize release control to `working_on`, `pending`, and
`production`. Founder and operator surfaces must be fail-closed and protected by
Google auth plus an explicit allowlist.

### Context
- The previous active surfaces mixed a local-first seed workflow with older
  Firestore and proxy-middleware assumptions that were no longer true in the
  live code path.
- The user confirmed the goal is not a marketplace rebuild, but a staged
  evolution of the existing marketplace routes and publish flow.
- The old two-state `live|staging` gate was too coarse and made it too easy for
  unfinished work to behave like production or fall back to misleading legacy
  content.
- The founder manual-ops inbox exposed applicant PII behind only a stage flag,
  which was not an acceptable protection model.

### Decision Details
- `SSOT_Build` remains the canonical listing authoring surface.
- Marketplace listing truth is published from `SSOT_Build` into
  `Evolution_Platform`; Platform does not author canonical listing data.
- Local or lightweight Google Sheets operator workflows are allowed around the
  process, but they do not replace the canonical SSOT publish boundary.
- Release stages are now:
  - `working_on` -> no real public marketplace exposure
  - `pending` -> real marketplace review flow behind gated operator access
  - `production` -> approved public-safe marketplace behavior
- Founder and operator routes require:
  - dedicated enable flag
  - Google auth enabled
  - explicit email allowlist
- `MyStable` remains a truthful holding surface until authenticated member
  workflows are ready.

### Impact
- Marketplace work now fails closed by default.
- The live code path matches the intended operator model more closely.
- Review and production release discipline no longer depends on a single coarse
  staging flag.
- Founder PII is no longer exposed by release-stage visibility alone.

### Related Files
- `/home/evo/workspace/projects/SSOT_Build/README.md`
- `/home/evo/workspace/projects/Evolution_Platform/src/lib/marketplace-release-stage.ts`
- `/home/evo/workspace/projects/Evolution_Platform/src/lib/auth.ts`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/marketplace/manual-ops/page.tsx`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Keep Listing Attachment Inside The Horse SSOT Record

### Decision
Keep marketplace listing state and lightweight listing enrichment attached to
the horse record inside `SSOT_Build`, rather than creating a separate listing
truth system. Add lightweight `performance_summary` and bounded `listing`
subtrees as horse-attached schema extensions.

### Context
- The horse page in `SSOT_Build` already acts as the operational center for
  identity, commercial terms, documents, and publish status.
- The user clarified that the marketplace-facing listing should remain attached
  to the horse SSOT in the same way the current commercial and publish state
  already is.
- A separate listing truth system would create unnecessary drift between horse
  identity/commercial truth and marketplace-facing readiness.
- At the same time, marketplace-facing convenience fields must not be allowed
  to overwrite canonical horse or lease data silently.

### Decision Details
- Keep canonical horse identity and commercial terms as the primary truth.
- Add an optional `performance_summary` subtree for TLDR racing context plus
  source reference, not a full race-history archive.
- Add an optional `listing` subtree for horse-attached marketplace state and
  summary fields.
- Keep the change additive and backward-compatible first:
  - existing flat horse fields remain the active runtime path
  - nested subtrees are introduced without forcing immediate UI or consumer
    rewrites
- Defer any `Evolution_Platform` payload changes until the producer-side
  contract is ready.

### Impact
- Keeps the listing model anchored to the horse SSOT instead of creating a
  shadow enrichment system.
- Gives the document wizard and future publish contract a structured home for
  lightweight performance summary and listing-facing fields.
- Reduces the risk that marketplace copy or readiness fields accidentally
  redefine canonical commercial truth.

### Related Files
- `/home/evo/workspace/projects/SSOT_Build/App.tsx`
- `/home/evo/workspace/projects/SSOT_Build/src/lib/ssot/ssot-read-repository.ts`
- `/home/evo/workspace/projects/SSOT_Build/intake/v0.1/seed.json`
- `/home/evo/workspace/projects/SSOT_Build/docs/contracts/MARKETPLACE_LISTING_SCHEMA_DRAFT_2026-04-10.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Publish Marketplace Artifacts From SSOT First And Mirror Platform Explicitly

### Decision
Harden the marketplace publish flow from the producer side first. `SSOT_Build`
should always emit its own local published artifacts, including the draft
producer-side contract, and should mirror the legacy payload into
`Evolution_Platform` only when explicitly requested.

### Context
- The user asked to keep focusing on `SSOT_Build` and avoid touching Platform
  while the producer-side schema and listing attachment model are still being
  locked.
- The existing publish script wrote directly into `Evolution_Platform` as part
  of the default path, which blurred the producer/consumer boundary during a
  contract-design phase.
- The new horse-attached `listing` and `performance_summary` fields need a
  versioned producer-side output before any consumer lane depends on them.

### Decision Details
- `npm run publish:marketplace` now publishes SSOT-owned artifacts only:
  - legacy payload: `data/published/marketplace-v0.json`
  - producer-side contract draft:
    `data/published/marketplace-contract-draft.v0.json`
- `npm run publish:marketplace:platform` is the explicit mirror path for the
  current legacy Platform payload and image copy.
- The draft contract output may expose unresolved metadata drift; that is a
  feature of the hardening phase, not a failure of the contract work.

### Impact
- Clarifies the producer/consumer seam.
- Lets SSOT evolve its contract without silently mutating Platform artifacts by
  default.
- Creates a stable output to test and review before consumer integration.

### Related Files
- `/home/evo/workspace/projects/SSOT_Build/scripts/publish-marketplace-v0.mjs`
- `/home/evo/workspace/projects/SSOT_Build/package.json`
- `/home/evo/workspace/projects/SSOT_Build/data/published/marketplace-contract-draft.v0.json`
- `/home/evo/workspace/projects/SSOT_Build/README.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Treat NZTR Rules Of Racing Effective 6 April 2026 As The Legal Ground For NZ SSOT Work

### Decision
For New Zealand horses and marketplace-listing work inside `SSOT_Build`, treat
the NZTR Rules of Racing PDF effective from 6 April 2026 as the governing legal
ground reference. Add an observer-only legal-officer role inside the SSOT
vertical to watch that legal ground and related disclosure references.

### Context
- The user explicitly identified the April 2026 NZTR Rules of Racing PDF as the
  governing document for the current build.
- The in-app New Zealand compliance surface was still pointing at an older PDF.
- The SSOT lane now holds more of the listing and document-grounding work, so
  it benefits from a named legal-reference observer without creating a second
  decision owner.

### Decision Details
- Update the in-app New Zealand compliance surface to point to the April 2026
  PDF.
- Treat that document as the primary legal-ground reference for New Zealand
  horse and listing work.
- Add a legal-officer role under the SSOT vertical with these boundaries:
  - observer-only by default
  - may be asked to review legal-ground drift, disclosure-reference drift, or
    conflict
  - escalated only by the CEO, the overall manager, or the SSOT line manager
  - does not independently redefine canonical truth, product scope, or consumer
    behavior

### Impact
- Aligns the live compliance page with the intended governing document.
- Makes the legal grounding of the SSOT build explicit.
- Adds a named review lane for future legal-reference questions without
  confusing ownership of the canonical data model.

### Related Files
- `/home/evo/workspace/projects/SSOT_Build/src/routes/ReferenceRoute.tsx`
- `/home/evo/workspace/projects/SSOT_Build/README.md`
- `/home/evo/workspace/projects/SSOT_Build/docs/contracts/CURRENT_DATA_CONTRACT_2026-03-13.md`
- `/home/evo/workspace/projects/SSOT_Build/docs/contracts/MARKETPLACE_LISTING_SCHEMA_DRAFT_2026-04-10.md`
- `/home/evo/workspace/projects/README.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-09: Deliver Investor Update Assets From Evolution_Platform Public Paths

### Decision
For investor updates, keep `Evolution_Content` as the canonical asset store,
but require any asset referenced by update HTML to have a delivery copy in
`Evolution_Platform/public/...`. Use `Evolution_Studio` as the explicit publish
step that promotes approved canonical assets into those public delivery paths.

### Context
- The new content model already separated canonical storage from public
  publishing, but the first Prudentia example still mixed direct public assets
  and temporary external-host links.
- Update HTML files under `public/updates/` are static public outputs, so they
  can only load assets that are actually reachable from the live site or another
  approved public host.
- The operator wants to stop repeating the Canva-upload-to-get-a-link loop for
  images and instead use the existing website repo as the predictable delivery
  surface.
- Google Drive is already acceptable as an assets-only convenience surface, but
  not a strong final URL layer for stable investor update delivery.

### Decision Details
- `Evolution_Content/drop/` remains the only raw intake surface for new update
  assets.
- Manual metadata tagging is the v0.0 classification method.
- `Evolution_Studio` must record a publish packet whenever a canonical asset is
  promoted for HTML use.
- Standardize public delivery paths:
  - images: `public/images/updates/<horse>/<update-slug>/...`
  - videos: `public/videos/updates/<horse>/<update-slug>/...`
- Investor update HTML may point at:
  - existing general public assets already in Platform
  - promoted update-specific delivery copies under those public update paths
- Investor update HTML must not point at:
  - `Evolution_Content` filesystem paths
  - local machine paths
  - Google Drive share links as the final delivery URL

### Impact
- Makes the website repo the consistent delivery layer for investor update
  assets.
- Preserves `Evolution_Content` as the source of truth without forcing the HTML
  to know about canonical storage paths.
- Turns Studio publish into a real operational step instead of an informal copy
  action.

### Related Files
- `/home/evo/workspace/projects/Evolution_Content/workflows/ASSET_INTAKE_AND_PROMOTION_V0.md`
- `/home/evo/workspace/projects/Evolution_Studio/publish-queue/prudentia-te-rapa-investor-update-2026-04-12.json`
- `/home/evo/workspace/projects/Evolution_Content/updates/prudentia/2026-04-12-te-rapa-investor-update.json`
- `/home/evo/workspace/projects/Evolution_Platform/public/updates/Prudentia-TeRapa-12Apr2026.html`
- `/home/evo/workspace/projects/Evolution_Platform/public/updates/Prudentia-TeRapa-Gmail-12Apr2026.html`

---

## 2026-04-09: Establish Evolution_Studio As The Manual Production Workbench For Content v0.0

### Decision
Establish `Evolution_Studio` as a real project surface now, but keep it as a
manual production workbench for v0.0 rather than a full app. It becomes the
place where content is built, shaped, reviewed, and prepared for publishing,
while `Evolution_Content` remains the canonical approved content and media
repository.

### Context
- The four-surface content model had already defined `Evolution_Studio` as the
  workflow boundary, but it still existed only as a deferred concept.
- The operator wants a real production area for making content now, without
  overbuilding a dashboard before the workflow has proven itself.
- `Evolution_Content` already now holds intake, canonical asset paths, and
  metadata truth for approved items, which makes it the wrong place for active
  drafting and packaging work.
- OpenFang `production-studio` is already framed as a packaging role, which
  fits naturally inside the Studio workflow boundary.

### Decision Details
- Create `projects/Evolution_Studio` as the active internal production workbench
  surface.
- Keep the first structure manual and file-first:
  `intake/`, `briefs/`, `drafts/`, `packages/`, `review/`, `approved/`, and
  `publish-queue/`.
- Use `Evolution_Studio` for:
  - brief intake
  - SSOT fact pulls
  - draft generation
  - packaging
  - review and approval handling
  - publish handoff toward `Evolution_Platform`
- Keep `Evolution_Content` focused on approved asset and metadata truth rather
  than active production-state work.
- Defer any full application UI, database-backed workflow engine, or dashboard
  rebuild until repeated use proves what the real operating surface needs.

### Impact
- Gives the content system a true making surface immediately without collapsing
  workflow and repository responsibilities into one folder.
- Reduces pressure to rename `Evolution_Content`, because the distinction now
  becomes clearer in practice:
  Studio makes, Content stores canonically, Platform publishes.
- Keeps the v0.0 build small and reversible while still creating a usable
  operational boundary for real content work.

### Related Files
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/MANIFEST.md`
- `/home/evo/workspace/DNA/INBOX.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/projects/Evolution_Studio/README.md`
- `/home/evo/workspace/projects/Evolution_Studio/ARCHITECTURE.md`

---

## 2026-04-09: Adopt A Four-Surface Content Operating Model With Evolution_Content As The Canonical Library

### Decision
Adopt a four-surface content operating model where `SSOT_Build` remains the
factual source of truth, `Evolution_Studio` is the internal workflow boundary,
`Evolution_Content` is the canonical approved content and media repository, and
`Evolution_Platform` remains the public publishing surface. Fold OpenFang's
`production-studio` into that model as a packaging role, not as a
source-of-truth store.

### Context
- The workspace governance already named `Evolution_Content` as an active
  project surface, but the actual folder had drifted out of the working tree.
- The live Prudentia Te Rapa update already existed in
  `Evolution_Platform/public/updates/`, which made it a practical first
  end-to-end proof item for the new content pattern.
- `Evolution_Studio` is still explicitly deferred in the workspace docs, so v0.0
  needed a manual and documented workflow boundary rather than a full app
  build.
- OpenFang `production-studio` was already positioned as a bounded packaging
  role, which fit the new model without making it a canonical storage surface.

### Decision Details
- Re-establish `projects/Evolution_Content` with a minimal governed structure:
  `drop/`, `media/`, `updates/`, `catalog/`, `templates/`, and `workflows/`.
- Keep the metadata model file-first for v0.0 using
  `catalog/content-index.ndjson`.
- Treat `drop/` as the raw intake surface and `media/` as the canonical asset
  library after classification.
- Keep website and email copy in `Evolution_Platform/public/updates/` for now,
  but store the approved asset path and metadata linkages in `Evolution_Content`.
- Define `Evolution_Studio` as the later owner of brief intake, SSOT fact pull,
  drafting, packaging, review, approval, publish actions, and search across
  `Evolution_Content`, without building the dashboard yet.
- Use Prudentia as the first v0.0 item to prove the pattern end to end.

### Impact
- Realigns the repo with the documented active-project model by restoring the
  missing `Evolution_Content` surface.
- Creates a canonical home for approved content assets and searchable metadata
  without forcing a premature app or database build.
- Clarifies that public delivery is not the long-term content truth, while still
  allowing the current website update surfaces to keep shipping during v0.0.

### Related Files
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/MANIFEST.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/projects/Evolution_Content/README.md`
- `/home/evo/workspace/projects/Evolution_Content/ARCHITECTURE.md`
- `/home/evo/workspace/projects/Evolution_Content/catalog/content-index.ndjson`
- `/home/evo/workspace/projects/Evolution_Content/updates/prudentia/2026-04-12-te-rapa-investor-update.json`

---

## 2026-04-09: Integrate Hermes As The Personal Assistant Layer Above DNA And OpenFang

### Decision
Adopt Hermes Agent into the live workspace as the personal assistant layer,
keep its runtime and durable identity in `/home/evo/.hermes`, launch it from
the workspace root so it reads the existing `AGENTS.md` chain, and keep
OpenFang as the bounded execution layer beneath it.

### Context
- The Paperclip retirement pass cleared the live surface so Hermes could be
  introduced without a mixed operating model.
- The workspace already had a clean boundary model: Hermes for evolving work,
  DNA for canonical truth, and OpenFang for bounded execution.
- Local Ollama is already installed and exposes `qwen3.5:latest`, which is
  sufficient for a local-first first-pass Hermes integration.
- The control-plane rules already allow global tool config and launch behavior
  under `/home/evo/`, which makes `/home/evo/.hermes` a clean runtime home.
- The workspace needed a real launcher and docs path so Hermes would join the
  existing ecosystem instead of becoming another ad-hoc wrapper.

### Decision Details
- Install Hermes under `/home/evo/.hermes/hermes-agent` with its runtime home
  at `/home/evo/.hermes/`.
- Use `/home/evo/.hermes/config.yaml` with local Ollama
  `qwen3.5:latest` at `http://localhost:11434/v1` as the default model route.
- Add a durable global `SOUL.md` under `/home/evo/.hermes/` for personality
  only; keep repo-specific rules in the existing `AGENTS.md` chain.
- Add `/home/evo/workspace/_scripts/hermesc.sh` and `just hermes` so the
  preferred launch path starts in `/home/evo/workspace` and loads the current
  workspace context naturally.
- Keep secrets in `/home/evo/.env`; do not duplicate them into
  `/home/evo/.hermes/.env`.
- Keep the handoff boundary explicit:
  - Hermes may suggest a Fang handoff
  - the human decides whether Fang is brought in
  - DNA remains canonical
  - OpenFang remains bounded

### Impact
- Hermes is now usable as the live personal layer without changing OpenFang's
  execution responsibilities.
- The workspace now has a clean launcher, runbook, and runtime home for Hermes
  that align with existing workspace law.
- The integration stays light: no automatic webhooks, no duplicate secret file,
  no project-local `.hermes.md`, and no auto-routing into Fang.

### Related Files
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/TECH_RADAR.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/_docs/hermes/README.md`
- `/home/evo/workspace/_scripts/hermesc.sh`
- `/home/evo/workspace/Justfile`
- `/home/evo/.hermes/config.yaml`
- `/home/evo/.hermes/SOUL.md`

---

## 2026-04-09: Retire Paperclip From The Live Workspace Surface And Reserve Hermes As The Next Personal Layer

### Decision
Retire Paperclip from the live workspace surface, archive its docs and runtime
outside the canonical workspace, keep OpenFang + Ollama as the active bounded
sidecar, and reserve Hermes Agent as the designated next personal-assistant
layer after a dedicated onboarding pass.

### Context
- The Paperclip trial created useful learnings, but it also left a heavier
  operator surface than the current workspace needs.
- Live build, script, project, and OpenFang wizard paths do not depend on
  Paperclip anymore, which makes retirement low-risk.
- The workspace already has a cleaner model available: tracked DNA and wizard
  docs for stabilization, OpenFang for bounded execution, and a future Hermes
  layer for personal assistance and skill growth.
- Introducing Hermes on top of an unresolved Paperclip surface would create a
  mixed operating model and more drift.
- Workspace law prefers archive-first cleanup with append-only history instead
  of destructive erasure.

### Decision Details
- Archive the live Paperclip runtime, launchers, temp helpers, and Paperclip-only
  operator docs into `/home/evo/_archive/agent-stack/2026-04-09/`.
- Remove Paperclip from `AI_SESSION_BOOTSTRAP.md`, `STACK.md`, and the active
  `agent-stack` docs so the live surface tells one truthful story.
- Keep historical Paperclip decisions and transition entries intact; supersede
  them with this retirement entry rather than rewriting them.
- Keep OpenFang + Ollama as the live workspace-side retrieval, planning, audit,
  and packaging surface.
- Reserve Hermes Agent as the next personal-assistant layer for exploration,
  memory, role or profile refinement, and skill development, but do not adopt
  it into the live stack until a dedicated onboarding pass is approved.
- Reserve `DNA/roles/` as the governed home for future Hermes-facing staff or
  role definitions.

### Impact
- Removes an inactive orchestration layer from the live workspace surface and
  reduces cognitive overhead.
- Reclaims about `660M` of active-sidecar Paperclip footprint while preserving
  historical material in a searchable archive batch.
- Clarifies the intended long-term workflow:
  - Hermes for exploration and personal assistance
  - DNA for stabilization and governed memory
  - OpenFang for bounded durable execution

### Related Files
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/TECH_RADAR.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/_docs/agent-stack/README.md`
- `/home/evo/workspace/_sandbox/agent-stack/README.md`
- `/home/evo/workspace/DNA/roles/README.md`
- `/home/evo/_archive/agent-stack/2026-04-09/`

---

## 2026-04-03: Run Paperclip + OpenFang As A Workspace-Side Operating Layer

### Decision
Implement the first Paperclip + OpenFang stack as a workspace-side operating-layer sidecar under `/home/evo/workspace/_sandbox/agent-stack`, with Paperclip as the orchestration and ticket layer and OpenFang as the single executor.

### Context
- The operator wants to move ahead now with Paperclip + OpenFang and explicitly skip the tech-radar step for this decision.
- Anthropic was a reference in the brief, not a hard dependency for this build.
- v1.0 should keep the human in the board seat instead of spawning separate CEO, CTO, or other autonomous runtimes.
- The workspace rules require new tooling to have a clear structural home plus written governance before it starts expanding.
- The machine currently exposes `node` and `pnpm` in interactive shells only, because `nvm` is not loaded for non-interactive shell startup.

### Decision Details
- Keep the sidecar under:
  - `/home/evo/workspace/_sandbox/agent-stack/openfang/`
  - `/home/evo/workspace/_sandbox/agent-stack/paperclip/`
  - `/home/evo/workspace/_docs/agent-stack/`
- Use `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh` for any non-interactive Paperclip or Node-based launch so `nvm` and Node 20 are loaded deterministically.
- Install in this order:
  - OpenFang first
  - Paperclip second
  - executor connection and end-to-end ticket proof third
- Treat CEO, CTO, and similar roles as Paperclip lenses, queues, or reporting surfaces only.
- Keep write access bounded to explicit workspace allowlists and one or two narrow workstreams until the sidecar proves itself.
- Do not promote launchers into `/home/evo/workspace/_scripts/` until the trial is stable and worth operationalizing.

### Impact
- Keeps the operating layer out of product repos and out of `/home/evo`, which preserves the workspace/control-plane split.
- Fixes the immediate non-interactive Node risk without depending on a broader shell-init rewrite first.
- Makes the early autonomy model intentionally narrow: one executor, one orchestration surface, strong path bounds, and explicit human approval.

### Related Files
- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/_sandbox/agent-stack/README.md`
- `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh`
- `/home/evo/workspace/_docs/agent-stack/README.md`
- `/home/evo/workspace/_docs/agent-stack/INSTALL_NOTES.md`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/_docs/agent-stack/ALLOWLIST_POLICY.md`
- `/home/evo/workspace/_docs/agent-stack/ROLE_LENSES.md`
- `/home/evo/workspace/_docs/agent-stack/TICKET_FLOW.md` *(Retired 2026-04-26: replaced by MEMORY.md + SESSION_LOG.md)*
- `/home/evo/workspace/_docs/agent-stack/BUDGET_RULES.md`

---

## 2026-04-08: Capture Marketplace v0.0 Manual Ops In A Local Inbox With Optional Google Sheets Mirror

### Decision
For the Evolution Stables marketplace v0.0 flow, capture marketplace application and reservation requests into a local founder-visible inbox inside `Evolution_Platform`, and treat `GOOGLE_SHEETS_WEB_APP_URL` as an optional mirror rather than a hard dependency for marketplace submissions.

### Context
- The marketplace listing index, detail pages, and application flow were already in place, but the capture path still failed closed whenever the Google Sheets endpoint was missing.
- Sprint v0.0 needs founder-visible manual ops capture, but it explicitly defers real payment, KYC, and the full investor dashboard.
- The workspace rules already allow local JSON and file fallbacks to remain in place until repository seams are tested.
- A pure Google Sheets dependency left the marketplace flow too brittle for local proof, preview validation, and controlled operator testing.

### Decision Details
- Keep marketplace submission capture inside `projects/Evolution_Platform/src/app/api/interest/route.ts`.
- Validate marketplace requests server-side against the live generated listing payload before accepting them:
  - listing slug and campaign match
  - horse and lease metadata match
  - stake size respects the live min/max and unit step
  - units and reservation amount match the live listing economics
- Generate a submission reference for each accepted marketplace request.
- Save accepted marketplace requests to a local JSON inbox readable by a founder-facing noindex route:
  - route: `/marketplace/manual-ops`
  - path override: `MARKETPLACE_MANUAL_OPS_PATH`
- Use Google Sheets as an optional mirror when `GOOGLE_SHEETS_WEB_APP_URL` is configured.
- Keep generic non-marketplace lead capture fail-closed when the Google Sheets endpoint is absent.

### Impact
- The marketplace v0.0 workflow now remains operational for bounded local and preview testing even without the external sheet mirror.
- Founder-visible manual ops capture now exists inside the product repo rather than only in an external dependency.
- The request contract is stricter and harder to tamper with, which reduces manual triage noise for the founder.

### Related Files
- `/home/evo/workspace/projects/Evolution_Platform/src/app/api/interest/route.ts`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/marketplace/manual-ops/page.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/src/lib/marketplace-manual-ops.ts`
- `/home/evo/workspace/projects/Evolution_Platform/src/components/marketplace/StakeApplicationForm.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/.env.example`

---

## 2026-04-08: Gate The New Marketplace Workflow Behind A Release Stage

### Decision
Keep the pre-sprint public `Marketplace` and `MyStable` views as the default live experience, and expose the new marketplace listing, detail, application, and founder manual-ops workflow only when `MARKETPLACE_RELEASE_STAGE=staging`.

### Context
- The operator wants a clean separation between what the public can see now and what is still being reviewed.
- The new marketplace work is solid, but it should not automatically replace the public-facing experience before explicit approval.
- The repo already contains both the older public placeholder views and the newer working marketplace flow, so the cleanest immediate separation is an environment-gated release stage rather than a destructive rollback.

### Decision Details
- Add `MARKETPLACE_RELEASE_STAGE` with two supported values:
  - `live`
  - `staging`
- Default to `live` when the env var is absent.
- In `live`:
  - show the restored pre-sprint public `Marketplace` page
  - show the restored pre-sprint public `MyStable` page
  - return `404` for `/marketplace/[slug]`
  - return `404` for `/marketplace/manual-ops`
  - reject marketplace application POSTs
- In `staging`:
  - show the new marketplace listing index
  - allow listing detail pages
  - allow the manual application flow
  - allow the founder manual-ops inbox

### Impact
- Production can stay calm and familiar while the new flow is reviewed privately.
- The same codebase can support both the old public experience and the new staging workflow without risky branch-only drift.
- Promotion later becomes an explicit environment or deployment decision instead of an accidental side effect of ongoing work.

### Related Files
- `/home/evo/workspace/projects/Evolution_Platform/src/lib/marketplace-release-stage.ts`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/marketplace/page.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/marketplace/[slug]/page.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/marketplace/manual-ops/page.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/src/app/mystable/page.tsx`
- `/home/evo/workspace/projects/Evolution_Platform/.env.example`

---

## 2026-04-08: Treat Tracked Workspace Files As Canonical Memory And Keep OpenFang Bounded

### Decision
Adopt a layered local memory model where `DNA/` and `research_vault/` remain the tracked canonical memory surfaces, Obsidian remains the human-facing sidecar, OpenFang remains the bounded retrieval and workflow layer, and `qmd` is documented as the preferred local semantic helper rather than a new source of truth.

### Context
- The active OpenFang workflow already runs locally on `qwen3.5:latest` and the operator wants to stabilize that route before adding more moving parts.
- `research_vault/OBSIDIAN_SETUP.md` still described Obsidian as SSOT for the research layer, which conflicts with the workspace-first governance model.
- The current OpenFang hands are useful when kept narrow, but direct agent responses can still be weak or ungrounded, so tracked-file and runtime-config checks must stay the first validation path.
- The operator wants optional local second-opinion capability without turning the daily workflow into a permanent multi-model pipeline.

### Decision Details
- Keep canonical truth in tracked workspace files:
  - `DNA/`
  - `research_vault/`
- Keep Obsidian as the human-facing sidecar over `research_vault/`, with explicit sync into the tracked workspace copy.
- Keep OpenFang bounded to:
  - `evolution-workspace` for read-only retrieval
  - `build-workspace` for planning and exact command recommendation
  - `audit-workspace` for governance and runtime-separation checks
- Keep `qwen3.5:latest` as the default local OpenFang execution model.
- Treat `gemma4:latest` as a spot-check auditor only, not an always-on second-pass gate.
- Treat `qmd` as an auxiliary semantic markdown lookup helper and not as canonical storage or citation authority.
- Keep LightRAG and RAG-Anything deferred until a real retrieval-quality or multimodal need is proven and governed.

### Impact
- Clarifies the memory hierarchy so the workspace, not the mirror or runtime state, remains authoritative.
- Keeps the current OpenFang setup useful without overstating its reliability as the first source of truth.
- Gives the operator a lightweight local audit path with `gemma4:latest` without adding unnecessary complexity to daily execution.

### Related Files
- `/home/evo/workspace/DNA/ops/memory-system-adoption.md`
- `/home/evo/workspace/research_vault/OBSIDIAN_SETUP.md`
- `/home/evo/workspace/_docs/openfang-wizard/README.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`

---

## 2026-03-23: Run Peer Messaging For Codex As A Sandbox Utility, Not A Claude-Channel Clone

### Decision
Adapt the `claude-peers-mcp` idea for Codex as a local sandbox utility with the
same broker plus MCP tool model, while explicitly dropping the Claude-specific
channel-push behavior that Codex does not expose.

### Context
- The operator wanted the core "peer sessions can find each other and message
  each other" workflow available in Codex.
- The referenced upstream repo targets Claude Code and depends on the
  `claude/channel` development-channel path for instant inbound delivery.
- This workstation does not currently have `bun`, `node`, or `npm` available in
  WSL or Windows, so the TypeScript repo could not be run as-is even before the
  Claude-channel gap was considered.
- The workspace rules require every added tool to have a home in the structure
  and a written governance trail.

### Decision Details
- Keep the trial implementation under
  `/home/evo/workspace/_sandbox/codex-peers-mcp/`.
- Implement the Codex path in Python with no global package installs:
  - `broker.py` runs a localhost SQLite-backed peer registry and message queue
  - `server.py` exposes MCP tools for `list_peers`, `send_message`,
    `set_summary`, and `check_messages`
- Register the MCP server in the Windows-side Codex config at
  `C:\Users\Evo\.codex\config.toml` using `wsl.exe`, because that is the actual
  Codex desktop config surface on this machine.
- Treat `check_messages` as the receive path. Do not pretend Codex has the same
  push-notification semantics as Claude development channels.

### Impact
- Codex sessions can now coordinate across terminals on this machine without
  adding Bun or Node to the live toolchain.
- The peer-messaging feature stays reversible and isolated in `_sandbox/`
  instead of becoming hidden control-plane drift.
- Expectations stay honest: the useful part of the design works, but the
  Claude-only instant push layer is intentionally not claimed for Codex.

### Related Files
- `/home/evo/workspace/_sandbox/codex-peers-mcp/broker.py`
- `/home/evo/workspace/_sandbox/codex-peers-mcp/server.py`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `C:\Users\Evo\.codex\config.toml`

---

## 2026-03-22: Separate Tech Radar Library Notes From Fit Decisions

### Decision
Treat `DNA/ops/tech-radar-intake/` as the repository-first discovery library
and keep `DNA/ops/TECH_RADAR.md` as the separate fit-decision board.

### Context
- The operator wants every interesting discovery saved as a readable note, not
  only the items that already look like a fit.
- The previous intake docs leaned too hard toward "raw dump first" and the
  processor file was still only a stub.
- Historical intake files already showed two different behaviors: rough
  captures and richer mini-reviews. The workflow needed one explicit contract.

### Decision Details
- Every interesting item should be able to become a durable repository note
  with source links, plain-English explanation, human review, takeaways, and
  revisit steps.
- The processor must always separate:
  - repository note
  - radar wizard recommendation
- A weak fit or duplicate outcome does not cancel the repository note.
- `TECH_RADAR.md` remains the concise human-reviewed decision surface using
  `ADOPT`, `TRIAL`, `ASSESS`, and `ARCHIVE`.
- `STACK.md` remains the authority for the current live stack and overrides any
  older radar note when fit is being assessed.

### Impact
- Better long-term memory: the repo becomes a useful library of things that
  caught attention, not just a shortlist of likely winners.
- Cleaner human review: "what is this?" and "is this for us?" are no longer
  mixed together in the same step.
- A Grok or Gem front-line project can now produce durable notes without
  overreaching into final adoption decisions.

### Related Files
- `DNA/ops/GEM_TECH_RADAR_PROCESSOR.md`
- `DNA/ops/TECH_RADAR.md`
- `DNA/ops/tech-radar-intake/README.md`
- `DNA/ops/tech-radar-intake/TEMPLATE.md`

---

## 2026-03-19: Slim Live Agent Surface And Reaffirm Central Vault

### Decision
Treat `/home/evo/workspace` as the only live agent surface, keep
`/home/evo/.env` as the single shared vault, and reduce the active agent stack
to the tools that match current real usage.

### Context
- The workspace had active prompt and skill surfaces still pointing at
  `/home/evo/00_DNA` and `/home/evo/projects`, which created false context for
  external agents.
- `just check` was failing because the central-vault contract already existed,
  but two active projects were not linked to `/home/evo/.env`.
- The live wrapper and stack surface had grown wider than actual operator
  practice, especially around Kimi and Kilo.

### Decision Details
- The only canonical build root is `/home/evo/workspace`.
- `/home/evo/.env` remains the one shared vault. Active projects should link to
  it instead of keeping parallel per-project truth copies.
- The preferred live workflow is:
  - Codex CLI as the primary workspace agent
  - Claude browser/chat as the advisory review and planning partner
  - Claude Code and Gemini as capability-specific paths
  - Aider, OpenRouter or Groq APIs, and Jules as optional utility paths
- Kimi CLI and Kilo are retired from the live workspace wrapper surface.
- The prompt library and skills index must only describe files and paths that
  actually exist.

### Impact
- Fewer false outputs from stale prompts and ghost skills
- A truthful central-vault contract that can be rotated once and consumed
  everywhere
- Lower governance drag in the live stack while keeping the DNA chain
  model-agnostic

### Related Files
- `DNA/system-prompts/PROMPT_LIBRARY.md`
- `DNA/skills/INDEX.md`
- `DNA/ops/STACK.md`
- `_scripts/evo-doctor.sh`
- `_scripts/vault.sh`
- `DNA/ops/TRANSITION.md`

---

## 2026-03-19: Archive Evolution_Marketplace Out Of The Active Workspace Surface

### Decision
Archive `Evolution_Marketplace` out of `/home/evo/workspace/projects` and remove it from all live active-project truth surfaces.

### Context
- The operator marked `Evolution_Marketplace` as low-value for the current build phase and requested removal from the active workspace surface.
- Workspace governance prefers archive-first cleanup when stale or duplicate surfaces add drag.
- Keeping Marketplace listed as active in bootstrap and agent context files would create false planning signals for future sessions.

### Decision Details
- Move `projects/Evolution_Marketplace` to `/home/evo/_archive/projects/2026-03-19/Evolution_Marketplace`.
- Add an archive manifest for the dated batch.
- Remove Marketplace from active-project lists in:
  - `AI_SESSION_BOOTSTRAP.md`
  - `AGENTS.md`
  - `DNA/agents/AI_CONTEXT.md`
  - `MANIFEST.md`
- Track reactivation as explicit only via `DNA/INBOX.md`.

### Impact
- The active project surface is smaller and better aligned with current execution priorities.
- Future agents no longer treat Marketplace as an active maintenance target.
- The project remains recoverable from a dated archive path instead of hard deletion.

### Related Files
- `AI_SESSION_BOOTSTRAP.md`
- `AGENTS.md`
- `DNA/agents/AI_CONTEXT.md`
- `DNA/INBOX.md`
- `DNA/ops/TRANSITION.md`
- `MANIFEST.md`

---

## 2026-03-19: Reduce First-Level Partner Audits To Core Stack Paths

### Decision
Reduce `_scripts/evo-audit-partners.sh` to the core first-level partner set that matches the live stack model: `Codex`, `Gemini`, `Groq`, and `Anthropic`.

### Context
- The prior runner still treated `Kimi` and `GLM` as active first-level partners, even though those paths were already retired from the live wrapper surface.
- The previous script also mixed legacy `/home/evo` report paths and context-chain references that no longer matched workspace-first governance.
- Operator backlog explicitly queued a reducer pass to align partner auditing with the current preferred stack.

### Decision Details
- Remove `Kimi` and `GLM` first-level audit execution and their route checks from `_scripts/evo-audit-partners.sh`.
- Keep first-level audits focused on:
  - `Codex`
  - `Gemini`
  - `Groq`
  - `Anthropic`
- Write audit artifacts under `/home/evo/workspace/_logs/audit_runs`.
- Use workspace-native context-chain references in generated reports.

### Impact
- Lower audit runner complexity and fewer stale route failures.
- First-level partner outputs now mirror the actual live operating model.
- Remaining wrappers can now be updated against one clear core partner contract.

### Related Files
- `_scripts/evo-audit-partners.sh`
- `DNA/INBOX.md`
- `DNA/ops/TRANSITION.md`
- `DNA/ops/STACK.md`

---

## 2026-03-16: STACK.md Authority Model + Drive Sync Removal

### Decision
Add `DNA/ops/STACK.md` as the live tool registry and formally confirm
Google Drive context sync is removed from the workspace.

### Authority Model
Three surfaces, three distinct purposes:
- `STACK.md` - live locked and active tool registry (what we use now)
- `DECISION_LOG.md` - historical rationale ledger (why we decided, this file)
- `TECH_RADAR.md` - personal research journal (consult on demand, not auto-loaded by agents)

`TECH_RADAR.md` is not part of the agent entry chain. It is a personal
memory tool: consult it when you want to ask "have we looked at X before?"
or "find something on the radar that could solve Y."

### Drive Sync Confirmed Removed
Google Drive context sync (`sync-md-context-gdocs.sh` plus the old 6-hour cron)
has been decommissioned. Google Drive is assets only going forward.
The `CONVENTIONS.md` operational sync section is now historical and should
not be treated as active automation.

### Impact
- Agents have one unambiguous place to check locked tools (`STACK.md`)
- `TECH_RADAR.md` retains value as a personal research log without blocking the entry chain
- No split-brain between tool-governance surfaces
- Drive sync removal is formally recorded

### Related Files
- `DNA/ops/STACK.md`
- `DNA/ops/TECH_RADAR.md`
- `DNA/ops/CONVENTIONS.md`
- `DNA/ops/DECISION_LOG.md`

---

## 2026-03-13: Stage-One Horse Firestore Writes Use Source-Derived Stud Book IDs

### Decision
For stage-one horse registration in `projects/SSOT_Build`, Firestore documents live at `horses/{microchip_number}`, and `stud_book_id` must be derived from Loveracing / Stud Book source evidence rather than copied from the existing local `horse_id` field.

### Context
- The current local `SSOT_Build` seed still carries legacy internal horse IDs such as `HRS-001` and `HRS-002`.
- Those local IDs are useful inside the prototype, but they are not the Stud Book record IDs and should not become long-term cloud identifiers.
- The upstream factual horse identity source is the Loveracing / Stud Book page, which already exposes the durable Stud Book record in the URL path.
- The first live Firestore workflow for this repo is intentionally limited to horse identity truth only, before trainer/owner/governing associations or lease terms are added.

### Decision Details
- Use the horse microchip as the Firestore document key:
  - `horses/{microchip_number}`
- Derive `stud_book_id` from the Stud Book source URL or equivalent explicit source evidence.
- Treat the current local `horse_id` as a prototype-local identifier only.
- Keep stage-one horse docs limited to identity truth, pedigree/performance links, and verification metadata.

### Impact
- Prevents legacy local UI identifiers from leaking into the long-term Firestore contract.
- Keeps the cloud-side horse identity aligned to external source evidence.
- Makes the first Firestore workflow safe to follow manually for the current two seeded horses before a browser write adapter exists.

### Related Files
- `projects/SSOT_Build/src/lib/ssot/firestore-horse-stage-one.ts`
- `projects/SSOT_Build/data/firestore/stage-one/horses.prudentia-first-gear.json`
- `projects/SSOT_Build/docs/contracts/FIRESTORE_WRITE_MAP_2026-03-13.md`
- `projects/SSOT_Build/README.md`
- `DNA/ops/TRANSITION.md`

---

## 2026-03-13: Horse Sync State Stays Local-First Until Firestore Exists

### Decision
Keep the horse repository surface intact and add a small manual sync-status layer in `SSOT_Build` while Firestore is being brought online, instead of removing local content before the database and repository seam are proven.

### Context
- The current app is still local-first and persists horse edits in browser local state.
- The `evolution-engine` Google project does not yet have a default Firestore database provisioned, so live stage-one horse writes are blocked today.
- The immediate need is operational clarity: know whether a given horse is local only, Firestore only, or manually confirmed as synced, without breaking the current repository surface.

### Decision Details
- Add a horse sync-state model with three statuses:
  - `local`
  - `firestore`
  - `synced`
- Persist that status locally for now as transition support.
- Do not treat the manual status layer as the final truth; replace it with a real Firestore-backed check once the database exists and the repository adapter is validated.
- Keep profile-image blobs out of Firestore and standardize their future Cloud Storage object paths under stable entity-key folders.

### Impact
- Preserves the working local authoring flow while Firestore is still unavailable.
- Gives the horse surface an explicit migration state instead of hidden assumptions.
- Creates a clean bridge from current local/static image handling toward Cloud Storage-backed media.

### Related Files
- `projects/SSOT_Build/App.tsx`
- `projects/SSOT_Build/src/lib/ssot/horse-profile-sync.ts`
- `projects/SSOT_Build/src/lib/ssot/profile-image-storage.ts`
- `projects/SSOT_Build/scripts/write_stage_one_horses_to_firestore.py`
- `projects/SSOT_Build/README.md`
- `DNA/ops/TRANSITION.md`

---

## 2026-03-13: Firestore Build Wiring Is The Next SSOT Priority

### Decision
Now that the first two stage-one horse identity records are live in Firestore, the next SSOT implementation priority is wiring Firestore into the live `SSOT_Build` horse surface rather than continuing with more contract-only work.

### Context
- The project now has a real Firestore database in `evolution-engine` running in Native mode in `australia-southeast1`.
- The `horses` collection already contains the live stage-one Prudentia and First Gear identity records.
- The app still reads from the local seed path and uses a manual sync-state overlay because there is no browser-side Firestore read seam yet.
- We now have enough real cloud state to stop treating Firestore as hypothetical for the horse module.

### Decision Details
- Next implementation target:
  - read live horse identity docs from Firestore
  - compare them against the current local horse surface
  - surface automatic `local|firestore|synced` status in the UI
  - keep local fallback content in place until parity is proven
- Do not expand into trainer/owner/governing/lease Firestore writes before the horse read seam is proven inside the actual build.

### Impact
- Focuses the next session on the highest-value seam with the least ambiguity.
- Converts the current Firestore work from setup into real product integration.
- Keeps the migration incremental and reversible.

### Related Files
- `projects/SSOT_Build/App.tsx`
- `projects/SSOT_Build/src/lib/ssot/firestore-ssot-read-repository.ts`
- `projects/SSOT_Build/src/lib/ssot/horse-profile-sync.ts`
- `projects/SSOT_Build/README.md`
- `DNA/ops/TRANSITION.md`

---

## 2026-03-13: Modular SSOT Assembly Contract For HLT

### Decision
Treat `projects/SSOT_Build` as the only canonical authoring surface for horse and lease data, and define HLT as a derived outcome assembled from five modular inputs: `Horses`, `Trainers / Stables`, `Owners`, `Governing Bodies`, and `Lease Commercial Terms`.

### Context
- The current app already exposes those repository sections as the real intake surfaces in `SSOT_Build`.
- The desired long-term model is modular, so HLT should depend on section qualification and selected records, not on every individual leaf field or on UI-specific shortcuts.
- The current prototype still contains local-only overlays, hardcoded defaults, and coupling that should not become the long-term Firestore contract.
- `Evolution_Platform` previously carried SSOT-shaped consumer logic, but the canonical origin for any Firestore-bound datapoint should be `SSOT_Build`.

### Decision Details
- The stable contract is:
  - `Qualified Horse`
  - `Qualified Trainer / Stable`
  - `Qualified Owner`
  - `Qualified Governing Body`
  - `Complete Lease Commercial Terms`
  - together produce `HLT`
- HLT is a derived assembly layer, not a source record.
- If a required record does not exist, it must be created in its repository section before HLT generation.
- Field-level evolution inside a module is allowed without redesigning HLT, as long as the module still satisfies its qualification rule.
- Firestore should store the canonical modules as independent write surfaces first, with HLT records and generated documents modeled as derived outputs.

### Impact
- Gives `SSOT_Build` a clean domain contract before Firestore implementation.
- Prevents hidden UI defaults and one-off coupling from becoming permanent storage rules.
- Keeps future schema evolution modular at the section level.
- Clarifies that `Evolution_Platform` should consume published SSOT data rather than author it.

### Related Files
- `projects/SSOT_Build/docs/contracts/CURRENT_DATA_CONTRACT_2026-03-13.md`
- `projects/SSOT_Build/README.md`
- `DNA/ops/TRANSITION.md`

---

## 2026-03-13: Google Execution Path Standardization For Reel Generator

### Decision
Standardize `projects/reel-generator` on Vertex AI with ADC against `evolution-engine` as the default Google execution path, while retaining the Gemini Developer API key path only for compatibility checks and quota diagnostics.

### Context
- Workspace governance already prefers Google tooling through `evolution-engine` and ADC over raw API keys.
- `reel-generator` had drifted into a direct `GEMINI_API_KEY` implementation.
- Live verification on March 13, 2026 showed the current Developer API key is valid for text generation but has zero Gemini image-generation quota.
- Live verification also showed the local ADC file exists but fails to refresh with `invalid_rapt`, which means Vertex AI auth is blocked by stale user reauthentication rather than missing code.

### Decision Details
- `scripts/generate_nanobanana.py` now exposes explicit Google auth modes and a `--diagnose-google` flow.
- `/home/evo/.env` now declares the non-secret Vertex defaults:
  - `GOOGLE_GENAI_USE_VERTEXAI=true`
  - `GOOGLE_CLOUD_PROJECT=evolution-engine`
  - `GOOGLE_CLOUD_LOCATION=global`
- A local Google Cloud CLI install under `/home/evo/google-cloud-sdk` is the supported control-plane tool for refreshing ADC and testing future Google workflows in WSL.

### Impact
- Aligns project behavior with workspace policy instead of silently favoring raw API-key flows.
- Separates quota problems from auth problems during debugging.
- Makes future Google-first automation reusable across projects once ADC is refreshed.

### Related Files
- `projects/reel-generator/scripts/generate_nanobanana.py`
- `projects/reel-generator/README.md`
- `/home/evo/.env`
- `DNA/ops/TRANSITION.md`

---

## 2026-02-28: Build Philosophy Canonicalization

### Decision
Canonicalize project names, storage paths, and layer terminology across all build-philosophy documents and core DNA files to eliminate naming drift and path inconsistencies.

### Context
- Multiple DNA build-philosophy docs had minor naming and path drift.
- Old references existed to `evolution-studios-engine`, `evolution-content-engine`, `01_Platform`, and `/mnt/native`.
- The safe-path standard and four-layer architecture were already defined elsewhere in DNA but not applied consistently.

### Decision Details
**Project Naming Alignment:**
- Replaced `evolution-studios-engine` with `EvolutionStudio`.
- Replaced `evolution-content-engine` with `EvolutionContent`.
- Replaced `01_Platform`, `02_Content_Factory`, `04_Intelligence` with `EvolutionPlatform`, `EvolutionContent`, `EvolutionIntelligence` where they refer to current repos.
- Kept `Evolution-3.1` only when referring to the historical codebase or Git history.

**Safe-Path Storage Alignment:**
- Confirmed the canonical safe-path standard:
  - `/home/evo/projects` – all active repos.
  - `/home/evo/models` – all model files and weights.
  - `/home/evo/00_DNA` – source-of-truth docs.
- Removed legacy references to `/mnt/native` and 500GB Ext4 volumes from `Tech_Stack_2026.md`.
- Updated all examples to assume the direct bind-mount of the Samsung 990 PRO into `/home/evo/`.

**Layer Naming Standardization:**
- Standardized the architecture language to four explicit layers: **Content / Intelligence / Infrastructure / External**.
- Updated `DECISION_LOG.md`, `OPERATING_BACKLOG.md`, `SEPARATION_OF_CONCERNS.md`, and related build-philosophy docs to use this four-layer stack consistently.

### Impact
- ✅ Build philosophy is now 100% aligned with actual filesystem layout and repo structure.
- ✅ Removes ambiguity for agents and humans about where code, models, and DNA live.
- ✅ Ensures future architecture and tooling decisions use the same four-layer and safe-path vocabulary.

### Related Files
- `00_DNA/build-philosophy/ARCHITECTURE_STRATEGY.md`
- `00_DNA/build-philosophy/Evolution_OS.md`
- `00_DNA/build-philosophy/Tech_Stack_2026.md`
- `00_DNA/DECISION_LOG.md`
- `00_DNA/OPERATING_BACKLOG.md`
- `00_DNA/build-philosophy/SEPARATION_OF_CONCERNS.md`

---

## 2026-02-27: Model-Agnostic Memory System

### Decision
Create a model-agnostic memory system using DNA files instead of relying on AI session persistence.

### Context
Kimi CLI (and other AI tools) have session persistence, but:
- Sessions don't auto-resume
- Each new terminal starts fresh
- Switching AI tools (Kimi → Claude → Kilo) loses all context
- Re-explaining project structure every session is wasteful

### Decision Details
**Approach:** DNA as persistent memory
- `🧠 AI_CONTEXT.md` - Entry point for ANY AI
- `OPERATING_BACKLOG.md` - Current work & blockers
- `DECISION_LOG.md` - Why we made key choices
- All files are plain markdown (works with any AI)

**Rejected Alternatives:**
- ❌ Rely on Kimi's `--continue` flag (tool-specific, doesn't survive tool switches)
- ❌ Build custom memory server (over-engineered for current needs)
- ❌ Use MCP memory (experimental, adds complexity)

### Impact
- ✅ Can switch between Kimi, Claude, Kilo seamlessly
- ✅ AI picks up context immediately by reading DNA
- ✅ No re-explaining project structure
- ✅ Version-controlled memory (git history of decisions)

### Related Files
- `00_DNA/🧠 AI_CONTEXT.md`
- `00_DNA/🧠 MEMORY_PROTOCOL.md`
- `00_DNA/OPERATING_BACKLOG.md`

---

## 2026-02-27: Consolidation Strategy (Phase 6)

### Decision
Consolidate scattered projects into 4-layer architecture with central vault.

### Context
/evolved into chaos:
- 20+ folders in root
- Projects scattered (Evolution_* folders everywhere)
- Multiple .env files with duplicated keys
- No clear separation of concerns
- Travel mode not configured

### Decision Details
**New Structure:**
```
/evo/
├── 00_DNA/              # Knowledge base
├── projects/            # Active work
│   ├── Content Layer    # What users see
│   ├── Intelligence     # What system knows
│   ├── Infrastructure   # What runs it
│   └── External         # Third-party tools
├── .env                 # One vault for all keys
└── _*/                  # Supporting folders
```

**Key Principles:**
1. Content ≠ Intelligence ≠ Infrastructure ≠ External (strict separation)
2. One vault (`/evo/.env`) symlinked by all projects
3. DNA is source of truth (standards live there, not in projects)

**Rejected Alternatives:**
- ❌ Monorepo (too complex, forces coupling)
- ❌ Keep scattered structure (continues drift)
- ❌ Merge all into single project (loses separation)

### Impact
- ✅ Clean root directory
- ✅ Clear project boundaries
- ✅ Single point for API keys
- ✅ Travel mode ready (lightweight CLI stack)

### Related Files
- `FINAL_STRUCTURE.md`
- `PROJECTS_INDEX.md`
- `🏗️ Build Rules.md`

---

## 2026-02-27: Central API Vault

### Decision
Use single `/evo/.env` file symlinked by all projects.

### Context
Multiple .env files across projects:
- Duplicated keys
- Inconsistent updates
- Security risk (some committed accidentally)
- Hard to rotate keys

### Decision Details
**Implementation:**
- Master: `/evo/.env` (chmod 600)
- Projects: `ln -sf /evo/.env .env`
- Template: `/evo/_config/.env.template`
- Validation: `evo vault check`

**Rejected Alternatives:**
- ❌ Keep per-project .env files (duplication, drift)
- ❌ Use environment manager (overkill for current scale)
- ❌ HashiCorp Vault (enterprise overkill)

### Impact
- ✅ Change key once, applies everywhere
- ✅ Consistent configuration
- ✅ Easier rotation
- ✅ Simpler backup (one file)

### Related Files
- `🔐 Secrets Guide.md`
- `_config/.env.template`
- `_scripts/vault.sh`

---

## 2026-02-27: DNA as Obsidian Vault

### Decision
Structure 00_DNA as an Obsidian vault for knowledge management.

### Context
DNA was a collection of markdown files but:
- Hard to navigate
- No linking between concepts
- Not visual/graph-based
- Hard to find related information

### Decision Details
**Features:**
- Obsidian app integration (`.obsidian/` folder)
- Wiki-style links: `[[Related Document]]`
- Emoji prefixes for quick visual scanning: `🏠` `🔐` `🧠`
- Graph view for exploring connections

**Rejected Alternatives:**
- ❌ Wiki software (overhead, hosting)
- ❌ Notion (proprietary, API limits)
- ❌ Plain files (hard to navigate at scale)

### Impact
- ✅ Visual knowledge graph
- ✅ Quick navigation
- ✅ Links between related concepts
- ✅ Works offline

### Related Files
- `00_DNA/.obsidian/`
- `🏠 Home.md`

---

## 2026-02-27: Docker Management Philosophy

### Decision
Keep Docker configurations decentralized (per-project) but provide centralized simple management via `evo docker` commands.

### Context
Docker is used extensively but:
- User getting Windows alerts about containers
- Doesn't want to learn Docker deeply
- Each project legitimately needs different container configs
- Needs simple start/stop control without memorizing commands

### Decision Details
**Architecture:**
- Each project keeps its own `docker-compose.yml` (project-specific tweaks)
- No root-level docker-compose (avoids "everything or nothing")
- Simple `evo docker` commands for management
- Human-readable documentation in `🐳 Docker Guide.md`

**Commands Provided:**
- `evo docker status` - See what's running
- `evo docker list` - See available projects
- `evo docker start [project]` - Start specific project
- `evo docker stop [project]` - Stop specific project
- `evo docker stop-all` - Emergency brake
- `evo docker clean` - Free disk space

**Rejected Alternatives:**
- ❌ Single root docker-compose.yml (forces all-or-nothing, loses per-project flexibility)
- ❌ Remove Docker entirely (too many services depend on it)
- ❌ Force user to learn Docker CLI (unnecessary complexity)
- ❌ Kubernetes (massive overkill for local dev)

### Impact
- ✅ Simple commands hide Docker complexity
- ✅ Each project can customize its containers
- ✅ Easy to see what's consuming resources
- ✅ Emergency stop available
- ✅ No Docker knowledge required

### Related Files
- `🐳 Docker Guide.md`
- `_scripts/evo-docker.sh`

---

## 2026-02-27: Development Enhancements Stack

### Decision
Add lightweight productivity tools (FZF, Zoxide, Just, Starship, git hooks) to enhance development workflow without heavy overhead.

### Context
Terminal workflow was basic:
- No fuzzy finding (lots of typing paths)
- No command history search (arrow keys only)
- Basic prompt (no git status visibility)
- Risk of committing secrets (no protection)
- No task runner (typing long commands)

### Decision Details
**Tools Chosen:**

| Tool | Purpose | Overhead |
|------|---------|----------|
| Git hooks | Prevent .env commits | Zero |
| FZF | Fuzzy find files/history | ~10ms startup |
| Zoxide | Smarter cd command | ~5ms startup |
| Just | Task runner | None (on demand) |
| Starship | Pretty prompt | ~20ms startup |
| Bash aliases | Shortcuts | Zero |
| Obsidian templates | Note consistency | Zero |
| EditorConfig | Format consistency | Zero |

**Total overhead:** ~35ms startup, ~10MB RAM

**Why not heavier tools?**
- ❌ Docker-based dev environments (overkill for local work)
- ❌ Complex dotfiles management (maintenance burden)
- ❌ IDE-specific plugins (not portable)
- ❌ Heavy zsh frameworks (slow startup)

**Installation:**
- Optional scripts in `_scripts/`
- Source control for configs
- Easy to uninstall (just remove source lines)

### Impact
- ✅ Faster navigation (Zoxide learns paths)
- ✅ Better command history (FZF)
- ✅ Consistent tasks (Justfile)
- ✅ Visual git status (Starship)
- ✅ Protection from accidents (git hooks)
- ✅ Consistent notes (Obsidian templates)

### Related Files
- `🛠️ Enhancements Guide.md`
- `_scripts/install-git-hooks.sh`
- `_scripts/install-enhancements.sh`
- `_config/bash-evo.sh`
- `Justfile`

---

## 2026-02-27: Approved Sources Registry

### Decision
Create a curated registry of approved tools and repositories in DNA to enable the "Adapt > Integrate > Build" philosophy.

### Context
User has 100+ starred repos on GitHub but:
- No central reference for "what's been vetted" → **SOLVED: skills/approved_sources.md is now single source of truth**
- AI assistants don't know what's pre-approved → **SOLVED: All DNA files point to approved_sources.md**
- Hard to remember why certain tools were chosen
- Re-invention happens when knowledge isn't shared

### Decision Details
**Created:** `skills/approved_sources.md`

**Structure:**
- Organized by category (AI, Productivity, Architecture, Agent Orchestration, etc.)
- Each entry: What it does, When to use, Why approved
- Single source of truth: All DNA files reference this for repo listings
- Anti-patterns section (what to avoid)

**Integration:**
- Referenced in `🧠 AI_CONTEXT.md` - AI assistants check it first
- Referenced in `AGENTS.core.md` - Research Before Build rule
- Living document - add new finds as they're vetted

**Philosophy:**
- Curated > Comprehensive (quality over quantity)
- Opinionated > Neutral (these are YOUR approved tools)
- Living > Static (update as you learn)

### Impact
- ✅ AI assistants can recommend pre-approved solutions
- ✅ New team members (or future you) see what's vetted
- ✅ Prevents re-researching the same tools
- ✅ Documents WHY choices were made

### Related Files
- `skills/approved_sources.md`
- `skills/INDEX.md`

---

## 2026-02-27: Tech Radar - Bullshit Filter System

### Decision
Create a Tech Radar system to track, evaluate, and make decisions about new tools without repeating conversations or randomly adopting tech.

### Context
User is getting firehosed with new AI tools, repos, and "vibe coding" content:
- Instagram reels about new tools daily
- GitHub starred repos piling up
- Same conversations happening multiple times
- No systematic way to evaluate before trying
- Risk of "shiny object syndrome"

### Decision Details
**Created 3-part system:**

1. **_archive/2026-02/INBOX.md** - Rapid capture (archived path)
   - Quick dump of new discoveries
   - Source, link, one-liner, hot take
   - Process every 48 hours (inbox zero)

2. **TECH_RADAR.md** - Evaluation tracker
   - 4 statuses: Reject / Assess / Trial / Adopt
   - Full evaluation criteria
   - Decision deadlines
   - Historical record (Archive)

3. **Integration**
   - AI assistants check radar before recommending
   - User logs new finds in Inbox
   - Regular review schedule (weekly/monthly/quarterly)

**Processed first batch:**
- 9 items from Instagram content firehose
- 4 moved to Assess (Google Workspace, Antigravity, NotebookLM, etc.)
- 1 moved to Trial (NotebookLM prompts)
- 4 archived (educational content, already adopted tools)

**Key insight:** Most "new" tools are:
- Educational content (archive)
- Variations of existing tools (assess vs current stack)
- Solutions to problems we already solved (reject/assess)
- Actual new capabilities (rare - these are gold)

### Impact
- ✅ No more repeated conversations about same tools
- ✅ Clear decision framework (Reject/Assess/Trial/Adopt)
- ✅ Historical memory of why decisions were made
- ✅ Bullshit filter for hype-driven content
- ✅ Still allows experimentation (Trial status)

### Philosophy Alignment
- **Done > Perfect:** Simple markdown system, not a complex app
- **Don't reinvent:** Uses existing Tech Radar concept (ThoughtWorks)
- **Get shit done:** Rapid capture, clear decisions, move on
- **Memory:** DNA tracks everything, no repeated evaluations

### Related Files
- `TECH_RADAR.md`
- `_archive/2026-02/INBOX.md`
- `skills/INDEX.md`

---

## 2026-02-27: Quick Wins Implementation (Done > Perfect)

### Decision
Ship Phase 1 quick wins immediately (VS Code workspace, just update, backup, .env.schema) rather than over-engineering.

### Context
Had a list of potential enhancements:
- High impact: git diff secrets check, just update, container health, backup
- Medium impact: VS Code workspace, .env.schema, custom Starship, uptime monitor

### Decision Details
**Shipped Immediately (80% solutions):**

1. **VS Code Workspace** (`evolution.code-workspace`)
   - Multi-root workspace with 5 folders
   - Excludes build artifacts and large files
   - Recommended extensions pre-configured

2. **Just Update Task** (`just update`)
   - Pulls DNA + all project repos
   - One command sync everything
   - Shows failures but continues

3. **Backup Script** (`just backup`)
   - Creates timestamped tar.gz in `_backups/auto/`
   - Excludes node_modules, .next, models, etc.
   - Simple, works, done.

4. **.env.schema + Validation** (`evo vault validate`)
   - Schema documents required keys
   - Validation checks if critical keys exist
   - Not over-engineered - just checks presence

**Deferred (Don't Need Yet):**
- ❌ Git diff secret scanning (hook already blocks commits)
- ❌ Container health checks (docker status shows state)
- ❌ Custom Starship module (default shows git status)
- ❌ Uptime monitor (no SLA requirements yet)

### Impact
- ✅ VS Code workspace: Open one file, see whole project
- ✅ Just update: Single command to sync everything
- ✅ Backup: One command to protect work
- ✅ Validation: Catch missing env vars before runtime errors

**Time to implement:** 30 minutes total  
**Value:** High - daily workflow improvements

### Philosophy Alignment
- **Done > Perfect:** 80% solutions that work now
- **Don't reinvent:** Used existing tools (just, tar, grep)
- **Leverage best practices:** VS Code workspaces are standard
- **Get shit done:** Shipped in one session vs. planning forever

### Related Files
- `evolution.code-workspace`
- `Justfile` (update, backup tasks)
- `_config/.env.schema`
- `_scripts/vault.sh` (validate function)

---

## 2026-02-27: Shell Persistence Bug - FIXED with Script Installation

### Problem
After implementing `kimic` as a shell function in `bash-evo.sh`, user opened new terminal and got:
```
$ kimic
kimic: command not found
```

**Root Cause:** WSL2 doesn't reliably source `~/.bashrc` in new terminal windows (VS Code terminal, Windows Terminal, non-login shells).

### Attempted Solutions

#### Solution 1: Manual Sourcing (Failed)
- Added `source ~/.bashrc` to workflow
- Failed: Users forget, WSL2 inconsistent

#### Solution 2: .bash_profile Fallback (Partial)
- Added `[[ -f ~/.bashrc ]] && source ~/.bashrc` to `~/.bash_profile`
- Helped but still WSL2 edge cases

#### Solution 3: Script Installation (✅ PERMANENT FIX)
Converted `kimic` from shell function to standalone script:

```bash
# Install to user-local bin (no sudo needed)
cp _scripts/kimic.sh ~/.local/bin/kimic
chmod +x ~/.local/bin/kimic
```

**Why this works:**
- `~/.local/bin` is in PATH by default on WSL2
- Scripts work in EVERY shell type (login, non-login, interactive, non-interactive)
- No sourcing required, no WSL2 edge cases
- Available immediately in new terminals

### Current State
- ✅ `kimic` script installed to `~/.local/bin/kimic`
- ✅ Available in all new terminals without sourcing
- ✅ `evo doctor` verifies installation
- ✅ DNA memory system now reliable

### Verification
```bash
# In a BRAND NEW terminal (no sourcing):
which kimic           # Should show ~/.local/bin/kimic
evo doctor            # Should show ✅ kimic script installed
kimic                 # Should load DNA context
```

### Files
- `_scripts/kimic.sh` - The script
- `_scripts/evo-doctor.sh` - Updated check
- `~/.local/bin/kimic` - Installation location

---

## 2026-02-27: Dotfiles Strategy - Portable DNA System

### Decision
Create two-repo system for portability: `evo-dotfiles` (tools/config) + `evo-brain` (private DNA data).

### Context
DNA system works perfectly on current machine, but:
- No way to replicate on laptop, new PC, server
- Manual setup each time is error-prone
- WSL2 environment not portable
- Want "clone and go" experience

### Decision Details

**Two-Repo Architecture:**

| Repo | Type | Contents | Privacy |
|------|------|----------|---------|
| `evo-dotfiles` | Config | Scripts (kimic, claudec, etc.), bash config, VS Code settings | Can be public |
| `evo-brain` | Data | Actual DNA files (AI_CONTEXT, OPERATING_BACKLOG, DECISION_LOG) | **Private** |

**New Machine Workflow:**
```bash
# 1. Clone dotfiles
git clone git@github.com:yourusername/evo-dotfiles.git
cd evo-dotfiles && ./install.sh

# 2. Clone brain
git clone git@github.com:yourusername/evo-brain.git ~/00_DNA

# 3. Done
evo doctor
kimic
```

**Files Created:**
- `~/evo-dotfiles/` - Dotfiles repo structure
- `install.sh` - One-command setup
- `README.md` - Documentation
- `evo-brain-README.md` - Template for private repo

**Key Insight:** Separation of tools (shareable) from data (private) enables both portability and security.

### Impact
- ✅ One-command setup on any machine
- ✅ DNA syncs across devices via git
- ✅ Tools stay version-controlled
- ✅ Private data stays private

### Next Steps
1. Initialize `evo-dotfiles` repo
2. Initialize `evo-brain` repo (private)
3. Test on fresh WSL instance

### Related Files
- `~/evo-dotfiles/` - Dotfiles directory
- `evo-brain-README.md` - Brain repo template

---

## 2026-02-27: Complete AI Tool Wrapper Family

### Decision
Build wrappers for ALL AI tools in the stack: Kimi, Claude, Aider, Gemini, Kilo.

### Context
User has multiple AI tools but only Kimi had a DNA wrapper. Each tool needs its own "read before we start" trigger.

### Decision Details

**New Wrappers Added:**

| Command | Tool | Method | Status |
|---------|------|--------|--------|
| `kimic` | Kimi CLI | Pipes DNA as first message | ✅ Already done |
| `claudec` | Claude CLI | System prompt injection | ✅ Already done |
| `aidere` | Aider | `--read` flag | ✅ Already done |
| `geminic` | Gemini CLI | `GEMINI_SYSTEM_MD` env var | ✅ **NEW** |
| `kiloc` | Kilo Code CLI | Context file injection | ✅ **NEW** |
| `dna-context` | Any tool | Clipboard/pipe output | ✅ Already done |

**Implementation:**
- Created `_scripts/geminic.sh` and `_scripts/kiloc.sh`
- Installed to `~/.local/bin/`
- Updated `evo-doctor.sh` to check all tools
- Pushed to `evo-dotfiles` repo
- Created `AI_TOOL_WRAPPERS.md` reference doc

**Pattern:**
1. Create wrapper script
2. Install to `~/.local/bin/`
3. Add check to `evo-doctor.sh`
4. Update documentation

### Usage

```bash
# Any AI tool - just add 'c' suffix
kimic                    # Kimi with DNA
claudec                  # Claude with DNA
aidere                   # Aider with DNA
geminic                  # Gemini with DNA
kiloc                    # Kilo with DNA

dna-context | xclip      # Any other tool
```

### Impact
- ✅ Every AI tool in stack has DNA wrapper
- ✅ Consistent pattern: `TOOLc` = tool with context
- ✅ Easy to add new tools
- ✅ All documented

### Related Files
- `_scripts/kimic.sh`, `claudec.sh`, `aidere.sh`, `geminic.sh`, `kiloc.sh`
- `~/.local/bin/*` (installed wrappers)
- `AI_TOOL_WRAPPERS.md` (complete reference)

---

## 2026-02-27: Universal AI Tool DNA Integration

### Decision
Create DNA loaders for ALL AI tools: Kimi, Claude, Aider, VS Code, and web UIs.

### Context
DNA memory system worked for `kimic`, but user has multiple AI tools:
- Kimi CLI (primary)
- Claude CLI (installed)
- Aider (coding assistant)
- VS Code Copilot/Continue/Cline
- Web UIs (ChatGPT, Gemini, etc.)

**Problem:** Each tool needs its own DNA injection method. No universal solution existed.

### Decision Details

**Created Tool-Specific Loaders:**

| Tool | Loader | Method |
|------|--------|--------|
| Kimi | `kimic` | Script: `kimi -p "Read DNA..."` |
| Claude | `claudec` | Script: `claude --system-prompt` |
| Aider | `aidere` | Script: `aider --read DNA...` |
| VS Code Copilot | Auto | `.github/copilot-instructions.md` |
| VS Code Continue | Auto | `.vscode/settings.json` |
| VS Code Cline | Auto | `.vscode/settings.json` |
| Any Web UI | `dna-context` | Clipboard output: `dna-context \| xclip` |
| Any CLI | `dna-context` | Pipe: `dna-context \| tool` |

**Files Created:**
- `_scripts/kimic.sh` → `~/.local/bin/kimic`
- `_scripts/claudec.sh` → `~/.local/bin/claudec`
- `_scripts/aidere.sh` → `~/.local/bin/aidere`
- `_scripts/dna-context.sh` → `~/.local/bin/dna-context`
- `.github/copilot-instructions.md`
- `.vscode/settings.json`

**Key Insight:** Same DNA files, different delivery mechanism per tool. The context is constant; only the injection method varies.

### Usage

```bash
# CLI tools
kimic                    # Kimi with DNA
claudec                  # Claude with DNA
aidere                   # Aider with DNA

# VS Code - automatic
# Just open VS Code, DNA loads via copilot-instructions.md

# Any web UI
dna-context | xclip -selection clipboard
# Paste into ChatGPT, Gemini, etc.
```

### Impact
- ✅ Every AI tool gets DNA context
- ✅ No manual file reading required
- ✅ Consistent context across all tools
- ✅ Easy to add new tools (just create wrapper)

### Related Files
- `_scripts/kimic.sh`, `claudec.sh`, `aidere.sh`, `dna-context.sh`
- `~/.local/bin/*` (installed scripts)
- `.github/copilot-instructions.md`
- `.vscode/settings.json`
- `evo-doctor.sh` (checks all tools)

---

## 2026-02-27: Memory Protocol Enforcement Mechanism

### Decision
Create enforcement tools to ensure AI assistants actually READ DNA files instead of claiming "no previous context."

### Context
The model-agnostic memory system was documented in DNA, but real-world test failed:
- User started new Kimi session: `kimi`
- User asked: "do you recall what we were talking about last?"
- Kimi responded: "I don't have access to our previous conversation history"

**This happened despite:**
- ✅ `🧠 AI_CONTEXT.md` existing
- ✅ `OPERATING_BACKLOG.md` being current
- ✅ `🧠 MEMORY_PROTOCOL.md` documenting the system
- ✅ Previous "fix" being applied

**Root Cause:** Documentation ≠ Enforcement. AI assistants don't automatically read files.

### Decision Details
**Created Enforcement Layer:**

1. **`_config/kimi-startup.sh`** - Function wrapper for `kimi` command
   - Detects new sessions vs. continued sessions
   - Auto-injects DNA context on startup
   - Provides `kimic` (with context), `kimil` (continue), `kimif` (fresh)

2. **Updated `_config/bash-evo.sh`** - Enhanced aliases
   - `kimic` now explicitly instructs AI to READ DNA first
   - Warning message in prompt: "DO NOT say 'I don't have access...'"
   - `kimif` for truly fresh sessions (escape hatch)

**Usage:**
```bash
kimic                 # Start with DNA context (RECOMMENDED)
kimil                 # Continue last session  
kimif                 # Fresh session (no context)
kimi -C               # Continue specific session
```

**Rejected Alternatives:**
- ❌ Alias `kimi='kimi -p "read DNA..."'` (breaks `kimi -C` and other flags)
- ❌ Modify Kimi binary (impossible, external tool)
- ❌ User training only (failed - humans forget)
- ❌ Accept status quo (defeats purpose of memory system)

**Why wrappers work:**
- Shell functions intercept commands before execution
- Can detect context (new vs continued session)
- User-friendly (same command name)
- Non-destructive (can bypass with `command kimi`)

### Impact
- ✅ AI forced to acknowledge DNA before responding
- ✅ No more "I don't have previous context" excuses
- ✅ Clear escape hatch (`kimif`) for truly new work
- ✅ Works with existing Kimi workflows (`-C`, `-S`, etc.)

### Related Files
- `_config/kimi-startup.sh`
- `_config/bash-evo.sh`
- `🧠 MEMORY_PROTOCOL.md`

---

## 2026-02-27: Empty Folder Protection

### Decision
Add README/.gitkeep files to empty critical directories to prevent confusion and document their purpose.

### Context
During a routine sweep, discovered several empty folders:
- `00_DNA/vault/` - No documentation about its purpose
- `models/` - Empty but expected to contain AI models
- `_logs/2026-02-27/` - Empty log directory

Empty folders create ambiguity:
- Are they supposed to be empty?
- Was content accidentally deleted?
- What should go here?

### Decision Details
**Fix:** Add placeholder documentation to empty critical directories:

1. **`00_DNA/vault/README.md`** - Explains vault system, points to master vault at `/evo/.env`
2. **`models/README.md`** - Documents expected model storage structure
3. **`_logs/2026-02-27/.gitkeep`** - Keeps directory in git (standard practice for logs)

**Philosophy:** 
- Empty folders should document WHY they're empty
- Critical infrastructure folders need READMEs
- Logs directories use `.gitkeep` to persist structure

**Rejected Alternatives:**
- ❌ Delete empty folders (they exist for a reason)
- ❌ Ignore them (creates technical debt)
- ❌ Fill with dummy content (misleading)

### Impact
- ✅ No more confusion about empty directories
- ✅ Clear documentation of expected content
- ✅ Self-documenting structure

### Related Files
- `00_DNA/vault/README.md`
- `models/README.md`
- `_logs/*/.gitkeep`

---

## 2026-02-27: Infrastructure & Content Consolidation (Final Polish)

### Decision
Unify all LLM-related infrastructure into `projects/Infrastructure/Evolution_LLM` and remove redundant "drift" folders from the `projects/` root.

### Context
Post-Phase 6, several inconsistencies remained:
- Two LLM folders: `local-llm` (legacy GLM-4) and `Local_LLM_2` (active hybrid orchestrator).
- Three redundant shell folders: `Evolution-Content-Factory`, `evolution-content-engine`, and `n8n`.
- Confusion regarding the purpose of local LLMs vs. Cloud APIs.

### Decision Details
**Implementation:**
- **Evolution_LLM:** Merged `Local_LLM_2` (orchestrator code) with `local-llm` (local model weights). The system now prioritizes a Hybrid Cloud path (Groq/Gemini) but maintains GLM-4 as a local fallback for privacy and cost control.
- **Surgical Cleanup:** Identified that `Evolution_Content` had successfully absorbed the logic of the "Factory" and "Engine" shells. These shells were moved to `_archive/sudo_cleanup_required/`.
- **Active Path:** `projects/External/N8N` confirmed as the active N8N instance.

**Rejected Alternatives:**
- ❌ Delete local models entirely (rejected: local LLMs are vital for privacy/offline fallbacks).
- ❌ Keep separate folders (rejected: creates "Intelligence Drift").

### Impact
- ✅ Single source of truth for LLM infrastructure.
- ✅ Root `projects/` directory is now clean of redundant shells.
- ✅ Clearer distinction between "Cloud Primary" and "Local Fallback" workflows.

### Related Files
- `projects/Infrastructure/Evolution_LLM`
- `PROJECTS_INDEX.md`
- `FINAL_STRUCTURE.md`

---

**When to add to this log:**
- Architectural changes
- Technology choices (why X over Y)
- Process changes
- Strategic pivots
- Anything you might ask "why did we do it this way?" in 3 months

**Remember: Context is king. Document the WHY, not just the WHAT.**

---

## 2026-03-13: Review Bundle Standard For Reel Generator

### Decision
Treat generated image batches as incomplete until they also produce a review bundle: a contact sheet image plus a CSV curation manifest.

### Context
The Google-first Vertex path is now working for `projects/reel-generator`, and image quality is strong enough to move into repeatable asset-library building. At that point the main bottleneck stops being provider auth and becomes curation: quickly reviewing many outputs, picking keepers, and preserving prompt/model metadata for downstream reel assembly.

### Decision Details
**Implementation:**
- Keep generation on Google Vertex AI via ADC as the canonical path.
- Add a desktop-friendly review helper at `projects/reel-generator/scripts/build_review_bundle.ps1`.
- For each completed label, export:
  - `<label>_contact_sheet.png`
  - `<label>_review_manifest.csv`
- Use the review manifest to capture keep/reject choices, ratings, and notes before motion work begins.

**Rejected Alternatives:**
- Reject: Treat the raw image folder as the only review surface. This slows selection and drops metadata context.
- Reject: Block on the existing Python contact-sheet helper only. The current desktop thread cannot reliably execute `wsl.exe`, so a validated fallback is needed right now.

### Impact
- Faster human review of successful Gemini batches
- Better continuity from prompt generation into motion assembly
- Cleaner handoff from experimentation to approved asset-library curation

### Related Files
- `projects/reel-generator/scripts/build_review_bundle.ps1`
- `projects/reel-generator/README.md`

---

## 2026-03-13: Targeted Backfill Over Broad Batch Expansion

### Decision
Once a first image library pass is successful, the next prompt batch should be gap-driven rather than exploratory.

### Context
`adhoc` and `library-v1` now prove the Google Vertex path works and the output quality is high enough to use. At this stage, generating more random variants would spend quota without improving the structure of the reel asset library. What is needed next is intentional coverage of missing roles: tighter details, cleaner middle layers, more pan-ready backgrounds, and vertical-safe reel crops.

### Decision Details
**Implementation:**
- Add `projects/reel-generator/prompts/library_v2_backfill_batch.json`.
- Use it as the next run only after reviewing the current keepers.
- Keep the prompt set focused on visible library gaps rather than generic aesthetic variation.

**Rejected Alternatives:**
- Reject: Run another large exploratory batch immediately.
- Reject: Change providers now that Google is working. Provider work is no longer the bottleneck.

### Impact
- Better quota efficiency
- Stronger reel-ready library coverage
- Cleaner progression from testing to production asset packs

### Related Files
- `projects/reel-generator/prompts/library_v2_backfill_batch.json`
- `projects/reel-generator/assets/adhoc/adhoc_review_manifest.csv`
- `projects/reel-generator/assets/library-v1/library-v1_review_manifest.csv`

---

## 2026-03-13: Remove The Obsolete Gemini Proxy From SSOT Build

### Decision
Remove the legacy Gemini Developer API proxy from `SSOT_Build` because it is no longer used by the app and conflicts with the workspace Google-first cleanup direction.

### Context
The current `SSOT_Build` UI still uses local Vite middleware for profile enrichment, but the active client flow only falls back across GLM, Groq, and Anthropic. The old `/__gemini_profile` middleware remained in `vite.config.ts` as dead compatibility code and still depended on `GEMINI_API_KEY` plus the direct Developer API endpoint. That made `SSOT_Build` the clearest remaining workspace holdout for the pre-Vertex Google route.

### Decision Details
**Implementation:**
- Delete `/__gemini_profile` from `projects/SSOT_Build/vite.config.ts`.
- Remove the stale middleware reference from `projects/SSOT_Build/docs/architecture/CURRENT_BUILD_MAP_2026-03-11.md`.
- Keep only the local middleware routes that are still active in the current UI flow.

**Rejected Alternatives:**
- Reject: Leave the dead route in place “just in case.” This keeps auth drift alive without serving a real user path.
- Reject: Replace it with a new Vertex proxy right now. The next migration step is repository extraction and Firestore writes, not another ad hoc profile-generation route.

### Impact
- One fewer raw-key Google path in the active workspace
- Cleaner alignment with archive-first cleanup
- Less confusion about which AI routes still matter in `SSOT_Build`

### Related Files
- `projects/SSOT_Build/vite.config.ts`
- `projects/SSOT_Build/docs/architecture/CURRENT_BUILD_MAP_2026-03-11.md`

---

## 2026-03-13: Horse Identity Truth Must Be Distinct From HLT Associations

### Decision
Model horse identity truth separately from the horse's current trainer, owner, and governing-body links.

### Context
The modular SSOT and Firestore write-map docs were already locking in the correct high-level rule: horse + trainer/stable + owner + governing body + lease terms = HLT. The remaining nuance was where to place the linked trainer/owner/governing references. Those associations matter for HLT readiness, but they are not the horse's intrinsic identity in the same way the microchip and Stud Book evidence are.

### Decision Details
**Implementation:**
- Treat Stud Book / Loveracing evidence plus `microchip_number` as horse identity truth.
- Allow the horse module to expose current/default trainer, owner, and governing-body links for HLT readiness.
- Do not treat those links as intrinsic horse identity fields.
- Make repository extraction expose explicit qualification paths:
  - horse identity qualification
  - current association readiness
  - lease qualification
  - HLT precondition satisfaction

**Rejected Alternatives:**
- Reject: Treat trainer, owner, and governing-body links as permanent horse identity fields.
- Reject: Force HLT to depend on every minor field inside a module instead of module-level qualification.

### Impact
- Cleaner long-term model for reassignment and future schema evolution
- Better separation between factual horse identity and current commercial/regulatory context
- Safer repository extraction because HLT preconditions can be enforced explicitly instead of through mixed UI state

### Related Files
- `projects/SSOT_Build/docs/contracts/CURRENT_DATA_CONTRACT_2026-03-13.md`
- `projects/SSOT_Build/docs/contracts/FIRESTORE_WRITE_MAP_2026-03-13.md`
- `projects/SSOT_Build/README.md`

---

## 2026-03-16: Workspace GitHub Mirror Is A Curated Analysis Export, Not A Raw Filesystem Mirror

### Decision
Use a dedicated Git analysis mirror for the workspace, built from a clean export of the active text-first build surface rather than from direct commits in the live workspace root.

### Context
- The canonical workspace root is not a single clean git tree; several active projects and runtime-owned workspaces already carry their own embedded git repositories.
- A naive root-level `git add .` would create embedded-repository gitlinks, which would not give cloud-based tools the actual source content inside those projects.
- The full workspace is about `60G`, with `_archive/` alone accounting for roughly `57G`, so a raw mirror would be slow, noisy, and unsafe to publish.
- The immediate need is a GitHub surface that lets cloud-based AI tools inspect the active system without dragging along historical archives, dependency installs, generated assets, or secret-bearing local files.

### Decision Details
- Keep the GitHub mirror focused on the active workspace surface:
  - governance docs under `DNA/`
  - active docs under `_docs/`
  - active scripts under `_scripts/`
  - active project source trees under `projects/`
  - active gateway source under `gateways/`
- Drive the mirror through a separate cached clone plus clean export, not through normal commits from `/home/evo/workspace`.
- Exclude from the root snapshot:
  - `_archive/`, `_logs/`, `_locks/`, `_sandbox/`, and `models/`
  - dependency installs and build output such as `node_modules/`, `.next/`, and `dist/`
  - local env files, machine-local state, and credential-shaped files
  - heavyweight generated media and review outputs that are not needed for code/system analysis
- Build mirror pushes from a clean export that strips embedded `.git` directories so nested repos contribute real files to the snapshot instead of gitlinks.

### Impact
- Cloud-based AI tools can inspect the actual active workspace code and docs from one GitHub repo.
- Mirror pushes stay GitHub-safe and readable instead of ballooning around archives and generated artifacts.
- The embedded repos can keep their own histories without blocking a workspace-level analysis mirror.

### Related Files
- `/home/evo/workspace/_scripts/sync-analysis-mirror-git.sh`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

---

## 2026-03-13: Stage-One Firestore Horse Surface Is `horses/{microchip_number}`

### Decision
Use `horses/{microchip_number}` as the first Firestore write surface and keep that stage limited to horse identity truth only.

### Context
After separating horse identity truth from current HLT associations, the next practical question was what the very first Firestore document actually needs to contain. The best minimal stage is a verified horse identity record derived from Loveracing / Stud Book evidence, keyed by the microchip, without prematurely mixing in trainer, owner, governing-body, lease, or media concerns.

### Decision Details
**Implementation:**
- First collection/document shape: `horses/{microchip_number}`
- Stage-one source links:
  - `pedigree_url`
  - `horse_performance_url`
- Stage-one core fields include:
  - microchip
  - Stud Book record ID
  - horse name
  - core factual horse metadata
  - verification/source timestamps
- Current associations are deferred from the first horse registration pass unless explicitly managed.
- Media and asset blobs remain out of the horse document.

**Rejected Alternatives:**
- Reject: Start with `horses/{horse_id}` as the primary identifier. The microchip is the more durable real-world anchor.
- Reject: Duplicate the same source URLs in multiple fields just for provenance.
- Reject: Include media/assets in the initial Firestore horse document.

### Impact
- Cleaner first Firestore milestone
- Less migration risk from the local prototype into structured cloud data
- A durable identity anchor that matches the horse SSOT model

### Related Files
- `projects/SSOT_Build/docs/contracts/CURRENT_DATA_CONTRACT_2026-03-13.md`
- `projects/SSOT_Build/docs/contracts/FIRESTORE_WRITE_MAP_2026-03-13.md`
- `projects/SSOT_Build/README.md`

---

## 2026-03-17: Keep Analysis Mirror And Broad Workspace Snapshot As Separate GitHub Surfaces

### Decision
Keep `Badders80/workspace` as the curated analysis mirror and use `Badders80/workspace_full` as the broadest practical GitHub-safe workspace snapshot.

### Context
The curated mirror already has a documented purpose: a text-first operating surface for cloud analysis. A different need emerged for agent tooling such as Jules, where withholding too much of the live workspace could hide the actual cause of a problem. At the same time, a literal raw filesystem push is still unsafe because the workspace contains nested repositories, secret-shaped files, media assets, and binaries that can exceed GitHub's hard file-size limit.

### Decision Details
**Implementation:**
- Preserve the existing curated mirror workflow in `_scripts/sync-analysis-mirror-git.sh`.
- Add a separate broad snapshot workflow in `_scripts/sync-workspace-full-git.sh`.
- Exclude from the broad snapshot:
  - nested `.git/` directories
  - local env, keys, certs, and credential-shaped files
  - media assets such as `mp3`, `mp4`, `jpg`, `jpeg`, `png`, `gif`, `webp`, `svg`, `mov`, and `wav`
  - files above the configured GitHub-safe size threshold
- Allow the broad snapshot to include dependency installs and generated code when they fit, because the immediate goal is investigation rather than long-term repo hygiene.

**Rejected Alternatives:**
- Reject: Reuse `Badders80/workspace` for the broad snapshot. That would erase the current repo contract and make the existing mirror workflow misleading.
- Reject: Push the raw live workspace root directly with no exclusions. That is too likely to fail on nested repo metadata, secrets, or GitHub file limits.

### Impact
- Two explicit repo surfaces now exist for different AI/agent use cases.
- The broad snapshot reduces the chance that missing local context becomes a hidden blocker during remote investigation.
- The curated mirror remains smaller and more stable for code-and-doc analysis workflows.

### Related Files
- `/home/evo/workspace/_scripts/sync-analysis-mirror-git.sh`
- `/home/evo/workspace/_scripts/sync-workspace-full-git.sh`
- `/home/evo/workspace/Justfile`

---

## 2026-04-06: WSL-Only Ollama Is The Local Inference Runtime For Agent Stack

### Decision

Adopt WSL-local Ollama as the only sanctioned local inference runtime for the
agent-stack sidecar and keep Windows Ollama out of the operating surface.

### Context

The earlier local-model failures were not primarily model-quality or Ollama
problems. They came from a split architecture: OpenFang in WSL, Ollama on
Windows, and drift across WSL-to-Windows networking, firewall, installer, and
filesystem boundaries. The explicit target for this sidecar is one runtime
truth inside WSL:

- Paperclip in WSL
- OpenFang in WSL
- Ollama in WSL
- models in WSL at `/home/evo/workspace/models/ollama`

During the clean reinstall, the manual sidecar install initially copied only the
Ollama binary. That allowed the daemon to start, but it silently fell back to
CPU-only inference because the bundled GPU runtime libraries were missing from
the sidecar install path.

### Decision Details

**Implementation:**
- Keep the Ollama binary at:
  `/home/evo/workspace/_sandbox/agent-stack/ollama/bin/ollama`
- Keep the bundled runtime libraries at:
  `/home/evo/workspace/_sandbox/agent-stack/ollama/lib/ollama`
- Keep the model store at:
  `/home/evo/workspace/models/ollama`
- Keep the local daemon bind at:
  `127.0.0.1:11434`
- Use `/home/evo/workspace/_logs/agent-stack/ollama-serve.log` as the governed
  runtime log surface
- Keep `qwen3:14b` as the proven initial local model
- Treat GPU validation as part of install completeness, not as an optional
  afterthought
- Remove or avoid Windows Ollama installer or runtime surfaces so the machine
  cannot drift back into a mixed-boundary setup

**Rejected Alternatives:**
- Reject: Reintroduce Windows Ollama and rely on WSL-to-Windows localhost or
  NAT plumbing.
- Reject: Treat a binary-only manual Ollama install as complete. Without the
  bundled `lib/ollama` runtime tree, the daemon can run while CUDA support is
  silently missing.
- Reject: Reconnect OpenFang before the local Ollama route is proven with both
  a deterministic API response and verified GPU offload.

### Impact

- The local inference path is now co-located inside WSL and much less likely to
  drift across Windows or mounted-drive boundaries.
- Model storage now stays inside the governed WSL workspace path rather than on
  `/mnt/c` or `/mnt/s`.
- Later OpenFang work can focus on one clean local provider contract instead of
  debugging Windows installer or network side effects.

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/ollama-trial.sh`
- `/home/evo/workspace/_docs/agent-stack/INSTALL_NOTES.md`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/_sandbox/agent-stack/README.md`
- `/home/evo/workspace/DNA/ops/STACK.md`

---

## 2026-04-06: OpenFang Provider Routing Stays Manual Until The Sidecar Earns Automation

### Decision

Run OpenFang with explicit human-selected provider routes instead of hidden
provider auto-detect or automatic fallback chains.

### Context

- The sidecar now has three realistic execution lanes under consideration:
  WSL-local Ollama, OpenRouter, and Groq.
- The operator wants local to be a real option, but not the only option.
- Free-tier hosted routes are useful as manual backups when another hosted
  provider hits rate limits.
- The main risk is not hosted providers existing; it is silent provider drift.
  Earlier OpenFang state auto-detected Groq embeddings from persisted secrets
  even when the launcher was intended to stay local-only.
- The operator explicitly prefers a manual, human-in-the-loop build until the
  sidecar proves itself trustworthy enough for automation.

### Decision Details

- OpenFang route selection is now manual through:
  - `local`
  - `openrouter`
  - `groq`
- The launcher prints the active route and config on `route show` and `status`.
- Route selection rewrites the active `secrets.env` so only the chosen provider
  key remains available to OpenFang.
- `local` must never silently fall through to a hosted route.
- OpenRouter and Groq are allowed as explicit hosted options, not accidental
  bleed-through from the shared environment.
- Automatic hosted fallback is deferred until the system is proven under manual
  control first.

### Impact

- Provider behavior becomes easier to reason about and debug.
- Hosted free-tier backups remain available without compromising the integrity
  of the local route.
- Paperclip can later inherit the route the human selected, rather than making
  provider decisions implicitly.

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/local.toml`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter.toml`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/groq.toml`
- `/home/evo/workspace/_docs/agent-stack/INSTALL_NOTES.md`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`

---

## 2026-04-06: Use The Localhost Paperclip API For Sidecar Writeback In Local-Trusted Mode

### Decision

Use direct localhost HTTP calls to the Paperclip server as the default terminal
writeback path for this sidecar while the instance stays in `local_trusted`
mode.

### Context

- The Founding Engineer project bundle had already shipped on disk, but the
  sidecar still lacked a low-noise way to sync closure notes back into issue
  comments from this desktop shell.
- The packaged Paperclip CLI already supports `issue get`, `issue comment`, and
  `issue update`, but `wsl.exe` remains intermittently unstable from this shell,
  which makes WSL-native CLI execution noisy and restart-heavy.
- The local server is private on `127.0.0.1:3100`, and the current instance
  proved that issue reads succeed directly against the HTTP API in
  `deploymentMode: local_trusted`.

### Decision Details

- Add `/home/evo/workspace/_sandbox/agent-stack/paperclip-issue-writeback.ps1`
  as the governed wrapper for:
  - `issue-get`
  - `issue-comment`
  - `issue-update`
- Keep the wrapper intentionally narrow and local-only.
- Treat this as valid only for private localhost instances in
  `local_trusted` mode.
- If Paperclip later moves to a different exposure or auth model, do not reuse
  this path without revalidating authentication requirements first.

### Impact

- Resolves the previous Founding Engineer blocker around Paperclip issue
  comment writeback.
- Provides a reusable terminal path for future delivery notes and close-out
  updates without relying on the UI or unstable WSL CLI invocation.
- Keeps the writeback seam honest and explicit instead of pretending the
  current shell environment is healthier than it is.

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/paperclip-issue-writeback.ps1`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/_sandbox/agent-stack/paperclip/data/instances/default/projects/ae8c8728-8be8-4883-8bc2-00b107862fa7/75640575-3cc3-4717-b405-fe84ebfca20c/_default/DELIVERY_STATUS.md`

## 2026-04-08 - OpenFang OpenRouter Qwen 3.6 Plus Paid Review Lane

### Context

- The prior governed OpenRouter route in OpenFang targeted `qwen/qwen3.6-plus:free`, but the provider now returns a deprecation error for that model path.
- The workspace already had more than `$10` of OpenRouter credits available, and the team wanted to validate whether hosted Qwen was worth keeping as a bounded second-pass reviewer for planning and audit work.
- Today's Evolution marketplace work provided a realistic audit target: the `live` vs `staging` release split, the manual application route, the founder manual-ops capture path, and the missing-test surface.

### Decision Details

- Retarget `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter.toml` to paid `qwen/qwen3.6-plus`.
- Keep `local` as the daily default route, but allow the active OpenFang route to be switched to `openrouter` when we want stronger hosted review or audit passes.
- When calling the paid model for bounded review work, disable reasoning in the request shape with:
  - `reasoning: { effort: "none", exclude: true }`
- Treat narrow, evidence-led prompts as the preferred operating pattern. Avoid large raw code dumps with reasoning enabled as a normal workflow.

### Impact

- Restores the OpenRouter path to a working state after the `:free` deprecation.
- Keeps hosted Qwen available as a governed reviewer without turning it into the background default.
- Produces a practical usage rule that controls latency and spend while still getting useful answers from the paid model.

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter.toml`
- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-08 - OpenFang Hosted Route Naming and Nemotron Backup Lane

### Context

- The launcher previously exposed hosted routing mainly as `openrouter`, which described the provider but not the actual review lane in use.
- We wanted the operating model to stay simple: `local` for daily work, paid Qwen for stronger hosted review, and a free hosted backup that can be switched on deliberately.
- Live checks showed `nvidia/nemotron-3-super-120b-a12b:free` was currently callable and stable enough to use as a backup reviewer through OpenRouter.

### Decision Details

- Add explicit hosted route names to `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh`:
  - `openrouter-qwen`
  - `openrouter-nemotron`
- Keep `openrouter` as a backward-compatible alias for the paid Qwen lane.
- Add dedicated route files:
  - `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter-qwen.toml`
  - `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter-nemotron.toml`
- Return the active route to `local` after hosted smoke tests complete.

### Impact

- Makes hosted route choice easier to understand and less error-prone during manual switching.
- Preserves the paid Qwen review lane without forcing it to remain the everyday default.
- Adds a governed free backup reviewer without pretending it is as reliable or precise as the paid lane or Codex.

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter-qwen.toml`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter-nemotron.toml`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-08 - OpenFang GLM Hosted Experimental Lane

### Context

- `z-ai/glm-5.1` looked like the strongest next paid comparison candidate to test against the existing paid Qwen review lane.
- The route surface had already been made model-specific for hosted OpenRouter lanes, so adding GLM cleanly fit the same operating pattern.
- We wanted GLM available for deliberate A/B use without changing the daily default away from local Ollama.

### Decision Details

- Add `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter-glm.toml` targeting `z-ai/glm-5.1`.
- Extend `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh` to accept `openrouter-glm` as a first-class route name.
- Update the sidecar runbook so the GLM lane is visible alongside Qwen and Nemotron.
- Keep GLM classified as experimental until it has passed a few realistic bounded review prompts cleanly.

### Impact

- Makes GLM available as a governed hosted option without requiring ad hoc route edits.
- Preserves the clean operating split:
  - `local` for daily work
  - `openrouter-qwen` for the proven paid review lane
  - `openrouter-nemotron` for the free backup lane
  - `openrouter-glm` for experimental paid comparison work

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/openrouter-glm.toml`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-08 - Local Specialist Model Lanes for Debug and Audit

### Context

- The local stack already had a solid daily default in `qwen3.5:latest` plus `gemma4:latest`, but there was still room for one stronger local debugger lane and one stricter local audit lane.
- The actual Ollama-fit models for this machine were `deepseek-coder-v2:16b` and `granite4:7b-a1b-h`; the earlier suggestion set included some model names or sizes that were not the right current Ollama targets.
- The machine has ample disk headroom, and the RTX 3060 12GB can support both additions as specialist tools even though the 16B debugger lane is slower to load.

### Decision Details

- Pull and retain:
  - `deepseek-coder-v2:16b`
  - `granite4:7b-a1b-h`
- Add governed OpenFang local route aliases:
  - `local-debug` -> `deepseek-coder-v2:16b`
  - `local-audit` -> `granite4:7b-a1b-h`
- Keep `local` on `qwen3.5:latest` as the daily default route.
- Do not add a local Mistral long-context lane at this stage.

### Impact

- Gives the local stack a clearer specialist split without replacing the proven day-to-day model.
- Makes debugger and auditor usage deliberate instead of depending on ad hoc `ollama run` memory.
- Keeps the route system readable and consistent with the hosted-lane naming pattern.

### Related Files

- `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/local-debug.toml`
- `/home/evo/workspace/_sandbox/agent-stack/openfang/state/routes/local-audit.toml`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Make Local Claude Launcher Capability-Aware For Ollama Models

### Decision
Stop assuming every local Ollama model can use Claude Code tools. The launcher
must inspect model capabilities, auto-disable Claude Code tools for models that
do not advertise `tools`, and stop forcing `--bare` for tool-capable local
lanes because that breaks the local audit path.

### Context

- `deepseek-coder-v2:16b` was failing immediately in Claude Code with:
  `does not support tools`.
- `ollama show deepseek-coder-v2:16b` reports only `completion` and `insert`.
- `ollama show granite4:7b-a1b-h` reports `tools`, and the raw
  Anthropic-compatible `/v1/messages` bridge returns valid `tool_use` blocks
  for it.
- The existing launcher forced a split path:
  - interactive -> `ollama launch claude`
  - non-interactive -> direct bridge with forced `--bare`
- In local testing, forcing `--bare` on tool-capable local lanes degraded
  Claude Code behavior for tool-driven prompts, while the direct bridge worked
  for normal prompt/response.

### Decision Details

- Use the direct Anthropic-compatible local bridge as the default Claude local
  launcher path.
- Add Ollama capability probing inside
  `/home/evo/workspace/_scripts/claude-local.sh`.
- Add wrapper-only local-model discovery so Claude can launch from the real
  `ollama list` inventory even though Claude Code's built-in `/model` picker
  does not enumerate all custom local models.
- If the selected model does not advertise `tools` and the caller has not
  explicitly overridden tool flags, auto-launch Claude Code with `--tools ""`.
- Only auto-add `--bare` for chat-only local lanes or when explicitly forced by
  env.
- Allow wrapper scripts to pass an explicit `--add-dir` surface via
  `CLAUDE_LOCAL_ADD_DIR` so chat-only local lanes can still load nearby
  `CLAUDE.md` context when needed.

### Impact

- `deepseek-coder-v2:16b` now launches reliably in a chat-only Claude Code
  mode instead of failing on startup.
- `granite4:7b-a1b-h` remains the preferred local Claude audit lane because it
  advertises tool support.
- The local launcher can now show the real Ollama inventory on demand via
  `--pick-model` or `--list-local-models`, instead of relying on Claude Code's
  limited built-in custom-model picker.
- The launcher behavior now matches the actual capabilities reported by the
  local runtime instead of assuming Claude-grade tool use on every local model.

### Related Files

- `/home/evo/workspace/_scripts/claude-local.sh`
- `/home/evo/workspace/_scripts/claude-marketplace-sandbox.sh`
- `/home/evo/workspace/_sandbox/claude-marketplace/START_HERE.txt`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-10: Make `claude` Open The Local Model Picker By Default

### Decision
Change the plain `claude` shell alias from a fixed `gemma4:e4b` launcher to a
picker-first launcher that opens the real local Ollama model menu by default.
Keep the specialist aliases (`claude-fast`, `claude-debug`, `claude-audit`,
`claude-yolo`) as fixed shortcuts.

### Context

- The local wrapper can now enumerate the real `ollama list` inventory with
  `--pick-model`.
- Claude Code's built-in `/model` picker still does not expose the full local
  custom-model inventory.
- The operator explicitly asked for the default `claude` entrypoint to display
  all local models instead of silently choosing one default lane.

### Decision Details

- Update `/home/evo/.bashrc`:
  - `claude` -> `bash /home/evo/workspace/_scripts/claude-local.sh --pick-model`
- Keep these fixed one-shot shortcuts unchanged:
  - `claude-fast`
  - `claude-debug`
  - `claude-audit`
  - `claude-yolo`
- Update the runbook so the documented meaning of `claude` matches the shell.

### Impact

- The default `claude` command now shows the full installed local model list
  before launch.
- Fast access to pinned local lanes is preserved through the specialist alias
  set.
- The shell behavior now matches the operator's intent better than the earlier
  fixed-Gemma default.

### Related Files

- `/home/evo/.bashrc`
- `/home/evo/workspace/_scripts/claude-local.sh`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-11: Prefer A Codex-First WSL VS Code Baseline

### Decision

Stabilize the machine around a Codex-first VS Code workflow by simplifying WSL
networking, moving heavier swap behavior to `S:`, and removing competing
chat-assistant extensions from the WSL remote host.

### Context

- The 2026-04-11 timeout loop investigation found repeated WSL instability and
  reconnect behavior that outlived the Gemini cleanup.
- Earlier WSL exthost logs showed both `openai.chatgpt` and
  `github.copilot-chat` throwing `PendingMigrationError`, with Copilot Chat
  being removable while Codex still needed to remain available.
- `networkingMode=mirrored` added unnecessary networking complexity for a local
  Codex-on-WSL workflow.
- The prior `6GB` swap ceiling was too tight for a machine that also runs local
  Node-based agents and model-adjacent tooling.
- Storage policy already says heavier mutable runtime surfaces should prefer
  `S:`.

### Decision Details

- Update `C:\Users\Evo\.wslconfig` to:
  - remove mirrored networking
  - keep `memory=12GB`
  - increase `swap` to `12GB`
  - set `swapFile=S:\WSL\swap.vhdx`
- Keep `autoMemoryReclaim=gradual`
- Keep `processors=8`
- Keep the Codex-providing `openai.chatgpt` extension
- Remove competing AI/chat assistants from the live VS Code surface:
  - `github.copilot-chat`
  - `codeium.codeium`
  - stale WSL `google.gemini-cli-vscode-ide-companion`
- Prune stale Windows WSL Remote server builds and old VS Code / WSL server
  logs as routine resettable state

### Impact

- WSL now starts with `12GB` swap and places that heavier backing file on `S:`
  instead of leaving it implicit on the OS drive.
- The WSL remote extension host is materially narrower and no longer carries
  Copilot Chat or the stale Gemini companion.
- The current Codex workflow remains available while the main competing chat
  surfaces have been removed.
- The machine has a clearer operating baseline for future audits: if the
  reconnect loop returns, the remaining suspects are WSL itself, Codex, or
  local workload pressure rather than extension sprawl.

### Related Files

- `C:\Users\Evo\.wslconfig`
- `/home/evo/workspace/_docs/system-health/WSL_VSCODE_LINE_IN_THE_SAND_2026-04-11.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-11: Keep Hermes Workspace As A Sandbox Tool Surface, Not A Project

### Decision

Keep the Hermes Workspace UI clone as a workspace-side tooling repo under
`/home/evo/workspace/_sandbox/hermes-workspace` rather than treating it as an
Evolution product surface under `projects/` or leaving it loose at the
workspace root.

### Context

- The live workspace map already treats Hermes as an adopted personal-layer
  tool, not as canonical product truth.
- `projects/` is explicitly reserved for the four active Evolution build
  surfaces.
- The Hermes Workspace UI is an external repo with its own Git history,
  dependency tree, and build output.
- The user explicitly wanted Hermes treated the same way the workspace treats
  OpenFang: as a sidecar/tooling surface rather than a product project.

### Decision Details

- Move the local Hermes Workspace clone from the workspace root into
  `_sandbox/hermes-workspace`.
- Keep Hermes runtime identity and launch control where they already belong:
  - `/home/evo/.hermes` for runtime and personality
  - `/home/evo/workspace/_scripts/` for launchers
  - `/home/evo/workspace/_docs/hermes/` for governed docs
- Keep the UI optional and local-first.
- If the local clone is later removed, re-acquisition stays a normal external
  `git clone` workflow from the upstream repo rather than a reason to promote
  Hermes into `projects/`.

### Impact

- Removes root-level drift from the workspace.
- Keeps `projects/` aligned to the Evolution product surfaces only.
- Makes Hermes Workspace behave like the kind of sidecar/tooling surface the
  repo already uses `_sandbox/` for.

### Related Files

- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/_docs/hermes/README.md`
- `/home/evo/workspace/_scripts/hermes-ui.sh`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`

## 2026-04-11: Keep Ollama Live In WSL And Archive The Broader S Catalog

### Decision

Keep `/home/evo/workspace/models/ollama` as the live sanctioned local Ollama
model store and convert the broader Windows-side `S:` catalog into an explicit
cold archive rather than leaving two apparently-live stores in circulation.

### Context

- The active agent-stack and workspace docs already point the local runtime at
  `/home/evo/workspace/models/ollama`.
- The live WSL store held the active `qwen3:14b` runtime subset.
- `S:\Models\Ollama\models` held a broader catalog with overlapping blobs,
  including the same `qwen3:14b` artifacts, which created storage duplication
  and operational ambiguity.
- No live Windows Ollama process or service was using `S:\Models\Ollama`
  during this reconciliation pass.

### Decision Details

- Keep the live runtime at `/home/evo/workspace/models/ollama`
- Rename `S:\Models\Ollama\models` to
  `S:\Models\Ollama\archive_catalog_2026-04-11`
- Add `S:\Models\Ollama\README.txt` to mark the `S:` surface as non-live and
  point operators back to the WSL canonical store
- Leave the archived `S:` catalog in place for now as a reversible cold archive
  rather than deleting model blobs immediately

### Impact

- The machine now has one clearly live Ollama store
- The broader `S:` catalog no longer masquerades as an active runtime path
- The split is reversible if a future Windows-native Ollama workflow is
  intentionally adopted, but it is no longer ambiguous by default

### Related Files

- `/home/evo/workspace/models/ollama`
- `S:\Models\Ollama\archive_catalog_2026-04-11`
- `S:\Models\Ollama\README.txt`
- `/home/evo/workspace/_docs/system-health/WSL_VSCODE_LINE_IN_THE_SAND_2026-04-11.md`

## 2026-04-11: Use Aider On OpenRouter As The Terminal Backup Lane

### Decision

Install and keep a terminal-first Aider backup lane on OpenRouter for the
periods when Codex credit is exhausted, instead of adding another heavyweight
VS Code assistant extension.

### Context

- The machine was just stabilized by reducing competing VS Code assistant
  surfaces.
- The workspace already had an `aidere` wrapper concept and Aider is already
  listed in the active tool registry as an optional utility lane.
- `/home/evo/.env` already carries `OPENROUTER_API_KEY`, so the backup lane can
  reuse the shared credential surface without introducing a new secret path.
- The local sanctioned Ollama store exists, but the currently live local model
  set is better treated as a lighter fallback than the primary backup for
  serious coding sessions.

### Decision Details

- Install `aider` locally via the official isolated installer into
  `/home/evo/.local/bin`
- Keep `/home/evo/workspace/_scripts/aidere.sh` as the generic workspace-context
  Aider launcher
- Add `/home/evo/workspace/_scripts/aidere-openrouter.sh` with default model
  `openrouter/deepseek/deepseek-v3.2`
- Expose that lane through:
  - `evo aider-or`
  - `aider-or`
  - `aidere`
- Keep local Ollama as a secondary option rather than the main backup lane

### Impact

- The workspace now has a low-friction Codex fallback that does not depend on a
  new VS Code extension
- OpenRouter becomes the practical cheap/fast backup path for coding tasks
- The machine keeps one heavy editor assistant surface instead of reintroducing
  extension sprawl

### Related Files

- `/home/evo/workspace/_scripts/aidere.sh`
- `/home/evo/workspace/_scripts/aidere-openrouter.sh`
- `/home/evo/workspace/_scripts/evo.sh`
- `/home/evo/.bashrc`
- `/home/evo/.local/bin/aidere`
- `/home/evo/.local/bin/aider-or`
