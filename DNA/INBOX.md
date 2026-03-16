# INBOX

Deferred workspace items and active cleanup queue.

## Current Status

- `/home/evo/workspace` is canonical.
- `/home/evo` is control plane only.
- Site-wide alignment audit is in progress.
- `seo-baseline` was archived out of the active platform surface on 2026-03-12.

## Active Cleanup Queue

- [x] Rewrite the core stale DNA docs and path references
- [x] Finish Gemini CLI auth enforcement on `vertex-ai`
- [x] Verify GCP ADC state for `evolution-engine`
- [ ] Map state traps in `Evolution_Platform` and `SSOT_Build` into seam-ready work items
- [ ] Build a secret registry before the rotation pass

## Deferred Workstreams

- [ ] Evolution_Studio - contract-first rebuild. Define API surface, align status enums, and fix workspace boundaries before feature work.
- [ ] Evolution_Intelligence - module-contract rebuild. Remove placeholders, define adapters, and keep only callable or testable modules.
- [ ] Vendor or external infrastructure - excluded from merge core and requires separate contract-led scoping before reintegration.

## Archived Reactivation Candidates

- [ ] `seo-baseline` - archived legacy SEO surface. Only reactivate by explicit re-scope from `/home/evo/workspace/_archive/projects/2026-03-12/Evolution_Platform/seo-baseline`.

## SSOT_Build Follow-Up

- [ ] Define explicit folder rules for `Horses/`, `data/`, `docs/`, and `public/`
- [ ] Verify `Horses/` contains only active structured horse-state, not issued or history items
- [ ] Update `README.md` to reflect current top-level structure accurately
- [ ] Keep anything historical, prototype-only, or superseded out of repo root and in dated archive batches

## Context Chain
<- inherits from: /home/evo/workspace/DNA/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md

---

## Session Backlog — 2026-03-16

- [ ] TECH_RADAR: add entry for lossless-claw (Assess)
- [ ] TECH_RADAR: add entry for skills.sh (Trial)
- [ ] BUILD_SOP.md — new-build checklist with skills/agent selection step
- [ ] Starred repo inventory doc — document what exists so nothing gets rebuilt
- [ ] Evolution_Marketplace — create GitHub remote and connect local repo
- [ ] Fix just check — missing .env symlinks for Evolution_Content and Evolution_Marketplace
- [ ] End-of-session ritual — add a Codex prompt template that always updates `AI_SESSION_BOOTSTRAP.md` + `DNA/INBOX.md` before session close; store it in `DNA/ops/TEMPLATES.md` or an equivalent governed surface
- [ ] Trial correction rulebook — add `DNA/ops/lessons.md` to the `AI_SESSION_BOOTSTRAP.md` load sequence if present, create an initial empty `lessons.md`, then test one deliberate correction/reopen loop and log the result
