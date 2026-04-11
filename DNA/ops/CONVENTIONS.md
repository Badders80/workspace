# CONVENTIONS

## Canonical Root

- `/home/evo/workspace`

## Legacy Roots

- `/home/evo/` is system home only, dotfiles only, and not canonical.

## Naming

- `AGENTS.md`: primary agent rules
- `CLAUDE.md`: Claude-only overrides
- `README.md`: human docs with AI section
- `AI_SESSION_BOOTSTRAP.md`: live map

## Env Governance

- SSOT: `/home/evo/.env` only.
- All env validation and schema enforcement must resolve from `/home/evo`.

## Tool Governance

- `/home/evo/workspace/DNA/ops/STACK.md` is the live registry for adopted, active, and locked tools.
- Do not suggest alternatives to tools locked in `STACK.md` unless `STACK.md` and `DECISION_LOG.md` are updated together.
- `/home/evo/workspace/DNA/ops/DECISION_LOG.md` records historical rationale and decision context.
- `/home/evo/workspace/DNA/ops/TECH_RADAR.md` is a consult-on-demand research journal and is not part of the default agent entry chain.
- `/home/evo/workspace/DNA/ops/tech-radar-intake/` is the repository-first discovery library for items that caught attention before any final fit decision.

## Communication Style

- Workspace internal operating surfaces use `caveman lite`: drop filler, keep grammar, stay direct.
- Keep `DNA/`, legal/compliance content, and external-facing content in normal prose.

## Registered Markdown Files

- `/home/evo/workspace/AI_SESSION_BOOTSTRAP.md`
- `/home/evo/workspace/AGENTS.md`
- `/home/evo/workspace/MANIFEST.md`
- `/home/evo/workspace/orchestration/README.md`
- `/home/evo/workspace/orchestration/roles/GENERAL_MANAGER.md`
- `/home/evo/workspace/orchestration/roles/PM_TEMPLATE.md`
- `/home/evo/workspace/orchestration/roles/PM_SSOT.md`
- `/home/evo/workspace/orchestration/roles/PM_PLATFORM.md`
- `/home/evo/workspace/orchestration/roles/PM_STUDIO.md`
- `/home/evo/workspace/orchestration/roles/PM_CONTENT.md`
- `/home/evo/workspace/orchestration/roles/FANG_EXECUTION.md`
- `/home/evo/workspace/orchestration/roles/FANG_VERIFICATION.md`
- `/home/evo/workspace/orchestration/tickets/_TICKET_TEMPLATE.md`
- `/home/evo/workspace/orchestration/tickets/done/2026-04-11_ssot_orchestration_dry_run.md`
- `/home/evo/workspace/orchestration/tickets/done/2026-04-11_platform_orchestration_dry_run.md`
- `/home/evo/workspace/orchestration/streams/ssot/STATE.md`
- `/home/evo/workspace/orchestration/streams/ssot/MEMORY_LOG.md`
- `/home/evo/workspace/orchestration/streams/ssot/ROADMAP.md`
- `/home/evo/workspace/orchestration/streams/platform/STATE.md`
- `/home/evo/workspace/orchestration/streams/platform/MEMORY_LOG.md`
- `/home/evo/workspace/orchestration/streams/platform/ROADMAP.md`
- `/home/evo/workspace/orchestration/streams/studio/STATE.md`
- `/home/evo/workspace/orchestration/streams/studio/MEMORY_LOG.md`
- `/home/evo/workspace/orchestration/streams/studio/ROADMAP.md`
- `/home/evo/workspace/orchestration/streams/content/STATE.md`
- `/home/evo/workspace/orchestration/streams/content/MEMORY_LOG.md`
- `/home/evo/workspace/orchestration/streams/content/ROADMAP.md`
- `/home/evo/workspace/DNA/AGENTS.md`
- `/home/evo/workspace/DNA/agents/AI_CONTEXT.md`
- `/home/evo/workspace/DNA/agents/MEMORY_PROTOCOL.md`
- `/home/evo/workspace/DNA/roles/README.md`
- `/home/evo/workspace/DNA/INBOX.md`
- `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
- `/home/evo/workspace/DNA/ops/STACK.md`
- `/home/evo/workspace/DNA/ops/memory-system-adoption.md`
- `/home/evo/workspace/DNA/ops/DECISION_LOG.md`
- `/home/evo/workspace/DNA/ops/TECH_RADAR.md`
- `/home/evo/workspace/DNA/ops/GEM_TECH_RADAR_PROCESSOR.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/README.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/TEMPLATE.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-16_batch.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-16_handoff-documents.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-16_correction-rulebook.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_batch.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_picoclaw.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_baudbot.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_promptfoo.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_gistssh.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_pi-dev.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_opencode.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_batch.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_nemotron-super.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_march-14-15-review.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_priority-shortlist.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_local-claude-code-runner.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_ai-creators-2026-list.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_notebooklm-cinematic-video.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_stop-slop.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_instagram-reel-antigravity.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_ogilvy-writing-rules.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_instagram-start-post-limited.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_mirofish-forecasting.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_claude-content-brain.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_ghostling-libghostty.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_impeccable.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_awesome-codex-subagents.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_claude-code-remotion.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_google-ai-studio-2.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_xiaomi-mimo-v2.md`
- `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-22_batch.md`
- `/home/evo/workspace/DNA/ops/TRANSITION.md`
- `/home/evo/workspace/research_vault/README.md`
- `/home/evo/workspace/research_vault/HOME.md`
- `/home/evo/workspace/research_vault/OBSIDIAN_SETUP.md`
- `/home/evo/workspace/research_vault/SCHEMA.md`
- `/home/evo/workspace/research_vault/00_Inbox/Capture Inbox.md`
- `/home/evo/workspace/research_vault/01_Sources/tokinvest_capital/last-6-months.md`
- `/home/evo/workspace/research_vault/01_Sources/evolutionstables_website/last-6-months.md`
- `/home/evo/workspace/research_vault/01_Sources/tokinvest_cap_x/source-profile.md`
- `/home/evo/workspace/research_vault/01_Sources/evolutionstable_x/source-profile.md`
- `/home/evo/workspace/research_vault/01_Sources/alex-baddeley_linkedin/source-profile.md`
- `/home/evo/workspace/research_vault/01_Sources/evolution_linkedin_admin/source-profile.md`
- `/home/evo/workspace/research_vault/04_Reviews/Review Queue.md`
- `/home/evo/workspace/research_vault/05_Reports/CEO Report - Latest.md`
- `/home/evo/workspace/research_vault/05_Reports/CTO Report - Latest.md`
- `/home/evo/workspace/research_vault/_templates/Manual Capture.md`
- `/home/evo/workspace/research_vault/_templates/Normalized Note.md`
- `/home/evo/workspace/research_vault/_templates/Review Report.md`
- `/home/evo/workspace/_sandbox/README.md`
- `/home/evo/workspace/_sandbox/design-sources/Stitch_design_prototyping_source.md`
- `/home/evo/workspace/_sandbox/design-sources/Designer_MCP_design_toolbox_source.md`
- `/home/evo/workspace/_sandbox/research-sources/GDELT_research_source.md`
- `/home/evo/workspace/_sandbox/claude-marketplace/CLAUDE.md`
- `/home/evo/workspace/_sandbox/agent-stack/README.md`
- `/home/evo/workspace/projects/Evolution_Content/assets/library/README.md`
- `/home/evo/workspace/_docs/MERGE_PLAN_2026-03-10.md`
- `/home/evo/workspace/_docs/SITE_WIDE_ALIGNMENT_AUDIT_2026-03-12.md`
- `/home/evo/workspace/_docs/STATE_TRAP_MAP_2026-03-12.md`
- `/home/evo/workspace/_docs/google/README.md`
- `/home/evo/workspace/_docs/google/GOOGLE_FIRST_STRATEGY.md`
- `/home/evo/workspace/_docs/google/VERTEX_SETUP_GUIDE.md`
- `/home/evo/workspace/_docs/agent-stack/README.md`
- `/home/evo/workspace/_docs/agent-stack/INSTALL_NOTES.md`
- `/home/evo/workspace/_docs/agent-stack/RUNBOOK.md`
- `/home/evo/workspace/_docs/agent-stack/ALLOWLIST_POLICY.md`
- `/home/evo/workspace/_docs/agent-stack/ROLE_LENSES.md`
- `/home/evo/workspace/_docs/agent-stack/TICKET_FLOW.md`
- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md`
- `/home/evo/workspace/_docs/agent-stack/MARKETPLACE_PM_PORTAL.md`
- `/home/evo/workspace/_docs/agent-stack/PROJECTS_BLOCKER_AUDIT_2026-04-10.md`
- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_PLATFORM_MARKETPLACE_BUILD_PLAN_2026-04-10.md`
- `/home/evo/workspace/_docs/agent-stack/EVOLUTION_PLATFORM_SSOT_LINKUP_MEETING_2026-04-10.md`
- `/home/evo/workspace/_docs/agent-stack/BUDGET_RULES.md`
- `/home/evo/workspace/_docs/hermes/README.md`
- `/home/evo/workspace/_docs/hermes/boundary-review-brief.md`
- `/home/evo/workspace/_docs/hermes/boundary-review-feedback-2026-04-09.md`
- `/home/evo/workspace/_docs/brand_assets/tokinvest_dds/README.md`
- `/home/evo/workspace/_docs/system-health/monitoring-guide.md`
- `/home/evo/workspace/_docs/system-health/HOLISTIC_EVO_AUDIT_20260301_215711.md`
- `/home/evo/workspace/_docs/system-health/WSL_VSCODE_LINE_IN_THE_SAND_2026-04-11.md`
- `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-topics.md`
- `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-prompt.md`
- `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-track-conditions-2026-04-08.md`
- `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-track-conditions-production-pack-2026-04-08.md`
- `/home/evo/workspace/_docs/openfang-wizard/hands/production-studio/SKILL.md`
- `/home/evo/workspace/_docs/presentations/racing_weekly_101/README.md`
- `/home/evo/workspace/_docs/presentations/racing_weekly_101/track_conditions_report_2026-04-08/README.md`
- `/home/evo/workspace/_docs/presentations/tokinvest/README.md`
- `/home/evo/workspace/_docs/presentations/tokinvest/owner_dds_minimalist_2026-03-20/README.md`
- `/home/evo/workspace/projects/Evolution_Content/README.md`
- `/home/evo/workspace/projects/Evolution_Content/ARCHITECTURE.md`
- `/home/evo/workspace/projects/Evolution_Content/workflows/ASSET_INTAKE_AND_PROMOTION_V0.md`
- `/home/evo/workspace/projects/Evolution_Studio/README.md`
- `/home/evo/workspace/projects/Evolution_Studio/ARCHITECTURE.md`
- `/home/evo/workspace/projects/Evolution_Studio/briefs/prudentia-te-rapa-investor-update-2026-04-12.md`
- `/home/evo/workspace/projects/Evolution_Studio/review/prudentia-te-rapa-investor-update-2026-04-12.md`
- `/home/evo/workspace/projects/Evolution_Studio/packages/prudentia-te-rapa-investor-update-2026-04-12/README.md`
- `/home/evo/workspace/projects/SSOT_Build/docs/contracts/CURRENT_DATA_CONTRACT_2026-03-13.md`
- `/home/evo/workspace/projects/SSOT_Build/docs/contracts/MARKETPLACE_LISTING_SCHEMA_DRAFT_2026-04-10.md`
- `/home/evo/workspace/projects/SSOT_Build/docs/contracts/FIRESTORE_WRITE_MAP_2026-03-13.md`
- `/home/evo/workspace/projects/SSOT_Build/intake/ad_hoc/documents/content_dump/README.md`

## Archive Convention

- All archive batches live under `/home/evo/_archive/<stream>/<YYYY-MM-DD>/` (OUTSIDE workspace root — never inside /home/evo/workspace/)
- Every dated snapshot must contain a `MANIFEST.md` before the batch is considered closed.
- `MANIFEST.md` must list: contents by folder, notable files with one-line descriptions, and reason for archiving.
- Search pattern: `rg -n "<term>" /home/evo/_archive/*/MANIFEST.md`
- Internal archive (still relevant to active repo): keep inside the workspace archive stream until reactivation.
- External archive (retired from active repo): move to `/home/evo/_archive/` (outside workspace root).
- Second-pass rule: after a build stabilises, promote internal archives to external.

## Operational Sync: Google Docs Context (Retired)

- Status: retired 2026-03-16.
- Google Drive is assets only going forward; no markdown mirror is active.
- Historical script retained at `/home/evo/workspace/_scripts/sync-md-context-gdocs.sh`.
- Do not treat Google Docs sync as an active context path, automation dependency, or agent entry surface.
- The active cloud-facing context path is the GitHub analysis mirror plus `CONTEXT.md`.

## Operational Sync: Git Analysis Mirror

- Script: `/home/evo/workspace/_scripts/sync-analysis-mirror-git.sh`
- Mode: one-way curated push from the local workspace into a dedicated Git mirror clone, then to the configured remote branch
- Local mirror clone default: `/home/evo/.cache/workspace-analysis-mirror`
- Remote default: `origin` URL from `/home/evo/workspace` when present, or `--remote-url` override
- Source scope:
  - root-level markdown plus key build/control files
  - all selected text/code/config files under `DNA/`, `_docs/`, `_scripts/`, `gateways/`, `projects/`, and `research_vault/`
- Excludes:
  - `_archive`, `_logs`, `_locks`, `_sandbox`, `models`, and `gateways/openclaw/sandbox`
  - embedded `.git` directories, dependency installs, caches, and build output
  - `.env` and other credential-shaped files
  - runtime-only state such as `.openclaw` and `workspace-gateway-*` snapshots
  - heavyweight generated media such as `projects/reel-generator/assets` and `projects/Evolution_Platform/public/videos`

Operational commands:
- Dry-run mirror preview:
  - `/home/evo/workspace/_scripts/sync-analysis-mirror-git.sh`
- Apply mirror sync and push:
  - `/home/evo/workspace/_scripts/sync-analysis-mirror-git.sh --apply`
- Just shortcuts:
  - `just analysis-mirror`
  - `just analysis-mirror-apply`

- The script usage block is the source of truth for the exact selection and operational behavior.

## Context Chain
← inherits from: /home/evo/workspace/AGENTS.md
→ overrides by: none
→ live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
→ conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md

## Tech Radar & Skills — Human-in-the-Loop Rule

Agents may research, assess, and propose updates to `TECH_RADAR.md` and `DNA/skills/`.
Agents may NEVER autonomously promote a tool to `Adopt` or install a skill to `~/.codex/skills/`.

The human pulls the trigger on all promotions. Agents propose, humans decide.

Workflow:
- Agent research → outputs a proposed radar entry or skill candidate
- Human reviews → approves or rejects
- Human executes → updates TECH_RADAR.md and deploys skill if approved

## Tech Radar & Skills — Human-in-the-Loop Rule

Agents may research, assess, and propose updates to TECH_RADAR.md and DNA/skills/.
Agents may NEVER autonomously promote a tool to Adopt or install a skill to ~/.codex/skills/.

The human pulls the trigger on all promotions. Agents propose, humans decide.

Workflow:
- Agent research outputs a proposed radar entry or skill candidate
- Human reviews and approves or rejects
- Human executes and updates TECH_RADAR.md and deploys skill if approved
