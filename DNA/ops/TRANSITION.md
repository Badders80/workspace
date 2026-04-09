# TRANSITION

> /home/evo2 deleted 2026-03-16. This document is historical.

## Purpose

Append-only merge and workspace-consolidation handoff log for the `/home/evo/workspace` canonical root.

## Daily Log

### 2026-03-10 [agent: Codex][phase-1-governance-reroot]
- Done: Wrote `/home/evo/AI_SESSION_BOOTSTRAP.md` and `/home/evo/AGENTS.md` with `/home/evo` as canonical root.
- Next: Complete Phase 2 skeleton and destination mapping before any file moves begin.
- Blocked: `DNA/` governance files and `/home/evo/_scripts/evo-check.sh` were not yet present at the new root when the bootstrap was first written.
- Decisions: `/home/evo2` is legacy only and must not be referenced as canonical for new sessions.

### 2026-03-10 [agent: Codex][phase-2-skeleton]
- Done: Created `/home/evo/DNA/`, `/home/evo/DNA/ops/`, and baseline governance docs required by the new bootstrap.
- Next: Reconcile missing active-path artifacts, especially `/home/evo/_scripts/evo-check.sh`, before merge execution advances.
- Blocked: Phase 2 destination verification still shows no local `evo-check.sh` at `/home/evo/_scripts/evo-check.sh`.
- Decisions: No file moves from `/home/evo2` have been executed in this phase.

### 2026-03-10 [agent: Codex][phase-3-selective-salvage]
- Done: Imported `/home/evo2` audit helper scripts into `/home/evo/_scripts`, rewrote them for `/home/evo` root assumptions, updated `/home/evo/Justfile` audit entries and DNA path references, and added `/home/evo/projects/Evolution_Platform/DONE.md`.
- Next: Reconcile project-level conflicts for `Evolution_Platform` and determine whether any additional lifted files can be merged without overwriting local work.
- Blocked: `/home/evo/projects/Evolution_Platform` has active local modifications and extra content not present in `/home/evo2`, so direct replacement is unsafe. `/home/evo2/projects/Evolution_Content` does not contain the expected orchestration source tree, and `/home/evo2/projects/SSOT_Build` is absent.
- Decisions: Phase 3 proceeded with governance/tooling salvage only where the merge was non-destructive. LIFT project promotion must be conflict-aware, not wholesale.

## Phase 5 — Legacy Freeze (2026-03-10)

- `/home/evo2` is now legacy reference only.
- No active scripts, agent entrypoints, or governance docs route through `/home/evo2`.
- Intentionally deferred workstreams (not blocking merge close):
  - Evolution_Studio rewrite — contract-first rebuild, separate workstream
  - Evolution_Intelligence rewrite — module-contract rebuild, separate workstream
  - `seo-baseline` — isolated, excluded from core
  - vendor/external infra — excluded from core
- These items are registered in `INBOX.md` for future scoping.

### 2026-03-10 [agent: Codex][workspace-reroot]
- Done: Created `/home/evo/workspace` skeleton, moved `Evolution_Platform` and `SSOT_Build` into `/home/evo/workspace/projects/`, copied the selected DNA files into `/home/evo/workspace/DNA/`, moved governance assets into `/home/evo/workspace/`, archived the requested project and root material into dated `/home/evo/workspace/_archive/*/2026-03-10/` batches, rewrote the workspace bootstrap, and added `/home/evo/workspace/MANIFEST.md`.
- Next: Resolve the remaining `/home/evo/projects/External` wrapper if elevated permissions are later available, and decide whether `/home/evo/projects/.gemini.md` should remain untouched under the no-dotfiles rule or be archived by explicit exception.
- Blocked: `/home/evo/projects/External` is root-owned and cannot be moved across parents without elevated permissions. `/home/evo/projects/.gemini.md` was intentionally left untouched because the task also forbids touching dotfiles.
- Decisions: `/home/evo/workspace` is the active working surface. `/home/evo/` remains system home only, with `.env` still SSOT at `/home/evo/.env`.

### 2026-03-11 [agent: Codex][ssot-build-minimum-tidy]
- Done: Reviewed `/home/evo/workspace/projects/SSOT_Build`, updated workspace gate paths in `Justfile` and `_scripts/evo-check.sh`, refreshed `SSOT_Build` README paths, and changed the app bootstrap flow to prefer the latest seed snapshot over stale localStorage payloads while preserving local edits.
- Next: Restore a consistently documented canonical intake source for `SSOT_Build` and then rerun build/demo checks.
- Blocked: `SSOT_Build` build currently depends on `intake/v0.1/seed.json`, which is absent in the working tree until restored or redefined.
- Decisions: Minimum tidy-up before sharing prioritizes buildability, current workspace path correctness, and demo freshness over broader refactors.

### 2026-03-11 [agent: Codex][session-close-ssot-build]
- Done: Restored `SSOT_Build` intake seed from the existing public snapshot, verified `npm run build`, `just check`, and `npx tsc --noEmit`, and added a short next-steps handoff to `/home/evo/workspace/projects/SSOT_Build/README.md`.
- Next: Triage the tracked deletions and untracked assets inside `SSOT_Build`, then do a presentation-focused cleanup pass on bundle size and oversized `App.tsx`.
- Blocked: The legacy `evo` wrapper in `/home/evo/.local/bin/evo` and shell aliases still point to pre-workspace script paths, but they were left untouched because dotfiles and dot-directories are out of scope.
- Decisions: For the current handoff, workspace-native checks are the authoritative gate and the README now holds the immediate follow-up items for the next session.

### 2026-03-11 [agent: Codex][asset-library-recovery]
- Done: Identified the recovered raw asset bundle in the workspace archive, copied it into `/home/evo/workspace/projects/Evolution_Content/assets/library/originals/`, added a reusable asset-mapping script at `/home/evo/workspace/_scripts/asset_library_map.py`, and documented the library plus report outputs.
- Next: Decide whether to also re-home the `/mnt/s/Evolution-Content-Factory/assets` working library into the workspace or keep that path linked as an external working source.
- Blocked: The content-factory working library still lives on `/mnt/s/Evolution-Content-Factory/assets`, so the workspace library remains partly linked to an external location until that move is scoped.
- Decisions: `projects/Evolution_Content/assets/library/` is the canonical discovery surface for asset recovery work in the new workspace; the recovered bundle now lives there as real directories, and `Evolution_Platform/public/images` remains a distribution copy unless a file exists only there.

### 2026-03-12 [agent: Codex][site-wide-alignment-start]
- Done: Archived `projects/Evolution_Platform/seo-baseline` into `/home/evo/workspace/_archive/projects/2026-03-12/Evolution_Platform/seo-baseline`, added the required archive `MANIFEST.md`, rewired root launcher scripts to delegate to `/home/evo/workspace/_scripts`, and replaced stale `/home/evo/00_DNA` context loading with workspace-native context helpers.
- Next: Rewrite the remaining stale DNA docs that still describe `/home/evo/00_DNA` as canonical, then continue the repo-by-repo state-trap mapping for cloud seams.
- Blocked: `~/.gemini/settings.json` still advertises `gemini-api-key` auth, so Gemini CLI itself still needs a verified settings pass after the launcher cleanup.
- Decisions: `seo-baseline` is no longer part of the active `Evolution_Platform` surface; Google local-tool routing now defaults to `evolution-engine` ADC conventions via the control plane instead of exporting raw Google API keys into every shell.

### 2026-03-12 [agent: Codex][docs-auth-seam-map]
- Done: Rewrote the workspace bootstrap, AGENTS, manifest, AI context, memory protocol, and inbox docs for the real `/home/evo/workspace` operating model; added Gemini system settings that enforce `vertex-ai`; switched user Gemini settings to `vertex-ai`; and wrote the first seam-ready state trap map at `/home/evo/workspace/_docs/STATE_TRAP_MAP_2026-03-12.md`.
- Next: Verify live ADC auth against `evolution-engine`, then start implementing the first repository seam in `Evolution_Platform`.
- Blocked: The ADC credential file exists locally, but `gcloud auth application-default print-access-token` is still not succeeding from the current shell.
- Decisions: Gemini CLI auth is now locked to `vertex-ai` by config, while local API-key auth is intentionally scrubbed from the control-plane bootstrap.

### 2026-03-13 [agent: Codex][reel-generator-google-path]
- Done: Audited `projects/reel-generator` against the workspace Google-first rules, confirmed the Gemini Developer API key works for text but has zero image quota, confirmed Vertex AI auth is blocked by stale ADC reauthentication (`invalid_rapt`), installed a local Google Cloud CLI at `/home/evo/google-cloud-sdk`, updated `/home/evo/.env` with `GOOGLE_GENAI_USE_VERTEXAI=true`, `GOOGLE_CLOUD_PROJECT=evolution-engine`, and `GOOGLE_CLOUD_LOCATION=global`, and rewired `scripts/generate_nanobanana.py` to support Vertex/ADC diagnostics plus explicit Google auth mode selection.
- Next: Refresh ADC with `gcloud auth application-default login --project evolution-engine`, then rerun `python3 scripts/generate_nanobanana.py --diagnose-google` and a real image generation test on Vertex AI.
- Blocked: Vertex AI remains unusable until the local Google user credential is reauthenticated; the existing Developer API key still has no Gemini image quota.
- Decisions: `reel-generator` should follow the workspace-standard Google execution path by default: Vertex AI on `evolution-engine` with ADC first, Developer API key second only as a compatibility and diagnostics path.

### 2026-03-13 [agent: Codex][reel-generator-google-validated]
- Done: Verified refreshed ADC for `alex@evolutionstables.nz`, confirmed `gcloud auth application-default print-access-token` works, fixed the Vertex request payload shape in `projects/reel-generator/scripts/generate_nanobanana.py`, proved Vertex text and image generation both succeed against `evolution-engine`, and reran the original `gemini_baseline_test_batch.json` successfully with `Processed: 4/4` and `Successful: 4/4`.
- Next: Review the generated comparison set under `projects/reel-generator/assets/gemini-baseline-compare/test/`, decide whether to keep `gemini-3-pro-image-preview` as the first-choice model, and extend the same Vertex-native pattern to the next Google-first generation workflow.
- Blocked: The standalone Gemini Developer API key still has zero image quota, but this no longer blocks the Google-first path because Vertex AI is now working through ADC.
- Decisions: For this workspace, successful Gemini image generation should be treated as a Vertex/ADC capability on `evolution-engine`, not as a signal that the separate Developer API key has been fixed.

### 2026-03-13 [agent: Codex][reel-generator-test-batch-validated]
- Done: Ran the default command shape `python3 scripts/generate_nanobanana.py --batch prompts/test_batch.json` successfully through the Vertex default path, generated all 5 prompts without overrides, saved the batch manifest at `/home/evo/workspace/projects/reel-generator/assets/adhoc/gemini_batch_results_20260313_153414.json`, and updated the batch-label fallback so unlabeled batch files now group outputs under their filename stem instead of `assets/adhoc`.
- Next: Re-run future unlabeled prompt batches to confirm the new filename-stem label behavior lands assets under cleaner folders such as `assets/test_batch/` or add explicit labels inside batch JSON when a named run is desired.
- Blocked: The already-generated `test_batch.json` assets from this run remain under the historical `adhoc` label because they were produced before the fallback improvement.
- Decisions: Default Google-first runs should be usable with no extra flags; `--auth-mode vertex` is now optional rather than required for routine execution.

### 2026-03-13 [agent: Codex][reel-generator-review-bundles]
- Done: Added a desktop review helper at `/home/evo/workspace/projects/reel-generator/scripts/build_review_bundle.ps1` that reads a successful Gemini batch manifest, creates a contact sheet PNG, and exports a CSV review manifest with keep/rating/notes columns so successful labels can be curated into a reusable asset library.
- Next: Run the review helper on the live `adhoc` and `library-v1` labels, pick keepers by shot role, and use those selections to define the first approved reel asset pack.
- Blocked: The existing Python contact-sheet helper could not be validated from this desktop thread because direct `wsl.exe` execution is hanging here; the new PowerShell review path is the validated desktop fallback.
- Decisions: For reel-generator, a successful generation batch is not considered operationally complete until it also has a human-review surface: a contact sheet plus a curation manifest.

### 2026-03-13 [agent: Codex][reel-generator-v2-backfill-prep]
- Done: Added `/home/evo/workspace/projects/reel-generator/prompts/library_v2_backfill_batch.json` as the next deliberate generation pass, targeting the visible gaps after `adhoc` and `library-v1`: tighter equine foreground detail, cleaner midground rail and start-gate layers, more panoramic backgrounds, and vertical-safe reel portraits.
- Next: Curate the keepers from `adhoc` and `library-v1`, then run the backfill batch only for the missing shot roles instead of spending quota on another broad exploratory pass.
- Blocked: The next batch is intentionally not auto-run because prompt quality is already strong and the smarter use of quota now depends on human keeper selection.
- Decisions: Post-authentication generation work should shift from generic testing to targeted library completion, with each new batch justified by a visible asset gap.

### 2026-03-13 [agent: Codex][ssot-build-modular-contract]
- Done: Wrote `/home/evo/workspace/projects/SSOT_Build/docs/contracts/CURRENT_DATA_CONTRACT_2026-03-13.md` to freeze the modular SSOT model: `Horses`, `Trainers / Stables`, `Owners`, `Governing Bodies`, and `Lease Commercial Terms` as the only canonical inputs to HLT; updated the `SSOT_Build` README to point at the contract; and registered the new markdown file in workspace conventions.
- Next: Map each current `SSOT_Build` save action to one canonical Firestore write surface, then replace browser-local overlay persistence with repository writes behind the same module boundaries.
- Blocked: `SSOT_Build` still persists most runtime edits in browser `localStorage`, so the new contract is defined but not yet enforced by the implementation.
- Decisions: `SSOT_Build` is the only canonical authoring surface for horse and lease data; HLT is a derived assembly outcome that only becomes valid when one qualified `horse`, `trainer/stable`, `owner`, and `governing body` are combined with complete lease commercial terms.

### 2026-03-13 [agent: Codex][ssot-build-gemini-route-cleanup]
- Done: Reviewed the new `SSOT_Build` contract and Firestore write-map docs, confirmed the current UI no longer calls the old Gemini profile proxy, removed the unused `/__gemini_profile` middleware from `projects/SSOT_Build/vite.config.ts`, and updated `docs/architecture/CURRENT_BUILD_MAP_2026-03-11.md` to remove the stale middleware reference.
- Next: Start repository extraction inside `SSOT_Build` for `horses`, `trainers`, `owners`, `governing_bodies`, `lease_terms`, and `hlt_records`, then replace local `save*` and edit-overlay flows behind those repository seams.
- Blocked: The Firestore architecture is ready enough to code against, but the write boundaries are still documented in project-local docs rather than a neutral workspace-wide Firestore contract surface, and runtime persistence is still local-first until the repositories are implemented.
- Decisions: The obsolete direct Gemini Developer API route in `SSOT_Build` is removed under the archive-first policy; active SSOT work should only keep local middleware routes that are still used by the current UI or explicitly required for the next migration step.

### 2026-03-13 [agent: Codex][ssot-build-identity-vs-association-refine]
- Done: Refined the active `SSOT_Build` contract and Firestore write map so horse identity truth is explicitly separated from current HLT associations; the horse module now treats the microchip plus Stud Book evidence as intrinsic identity, while trainer/stable, owner, and governing-body links are documented as mutable current association state for HLT readiness rather than horse identity itself. Updated the repo README to reflect the same sequence.
- Next: Build repository extraction around explicit module qualification helpers: horse identity qualification, current association readiness, and lease qualification, then route HLT generation through those preconditions.
- Blocked: The current runtime still mixes identity and association data in `App.tsx` state and save flows, so the refined boundary exists in docs but not yet in implementation.
- Decisions: The stable SSOT abstraction is module qualification, not individual field coupling; HLT should depend on qualified modules plus lease terms, not on hidden per-field UI assumptions.

### 2026-03-13 [agent: Codex][ssot-build-horse-stage-one-shape]
- Done: Tightened the `SSOT_Build` contract and Firestore write map to define the first concrete Firestore write surface as `horses/{microchip_number}` for horse identity only; renamed the key source links to `pedigree_url` and `horse_performance_url`, mapped current UI field names toward the stage-one Firestore shape, and documented that associations and media are intentionally out of scope for the initial horse registration pass.
- Next: Scaffold the stage-one horse repository around the documented `horses/{microchip_number}` contract, including the field mapping from current local `horse_id`, `breeding_url`, and `performance_profile_url` names.
- Blocked: The live app still writes local horse state with the old field names and mixed identity/association semantics, so the new Firestore shape is documented but not yet enforced in code.
- Decisions: Stage one Firestore work should focus on horse identity truth only; current associations are deferred and media/assets remain out of the horse document entirely.

### 2026-03-13 [agent: Codex][ssot-build-firestore-write-map]
- Done: Wrote `/home/evo/workspace/projects/SSOT_Build/docs/contracts/FIRESTORE_WRITE_MAP_2026-03-13.md` to map the current `SSOT_Build` local save actions to future Firestore write surfaces, distinguishing canonical module writes from derived HLT, document, and archive outputs; updated the README docs index; and registered the markdown file in workspace conventions.
- Next: Start the code implementation by extracting repository interfaces and replacing the current horse, trainer, owner, governing-body, and lease save paths with module-specific repositories.
- Blocked: The current app still uses `localStorage`, local custom arrays, and local edit maps as the active write path, so repository-backed Firestore writes do not exist yet.
- Decisions: Firestore rollout should follow the same module boundaries as the contract: canonical collections first, derived HLT and document records second, downstream consumers last.

### 2026-03-13 [agent: Codex][ssot-build-firestore-horse-samples]
- Done: Added a reusable stage-one horse Firestore mapper at `/home/evo/workspace/projects/SSOT_Build/src/lib/ssot/firestore-horse-stage-one.ts`, prepared Firestore-ready sample payloads for First Gear and Prudentia at `/home/evo/workspace/projects/SSOT_Build/data/firestore/stage-one/horses.prudentia-first-gear.json`, updated the `SSOT_Build` README with a first-run console workflow, and corrected the write-map assumption so `stud_book_id` is derived from Stud Book source evidence rather than copied from the legacy local `horse_id`.
- Next: Add the first write-side horse repository that uses the same stage-one mapping, then decide whether the initial live write path should be Firebase Console only, an admin script, or a browser-side Firestore adapter.
- Blocked: The repo still does not contain a validated live Firestore write adapter or Firebase SDK wiring, so this pass prepares the contract and operator workflow without performing real writes.
- Decisions: For stage-one horse registration, the Firestore document key is the microchip and the Stud Book ID must come from source evidence, not the local `HRS-*` identifiers.

### 2026-03-13 [agent: Codex][ssot-build-sync-status-and-image-path]
- Done: Verified that `evolution-engine` currently has no default Firestore database yet, added a small local-first horse sync-status layer inside `projects/SSOT_Build/App.tsx`, added reusable sync and profile-image path helpers under `src/lib/ssot/`, added a repo script to write the prepared stage-one horse docs once Firestore exists, and documented the Cloud Storage image-path rule in the repo README.
- Next: Create the Firestore database with the chosen mode and location, run the stage-one horse write script, then replace the manual sync status with a real Firestore-backed check.
- Blocked: Live Firestore writes are still blocked because the project currently returns `404` for database `(default)`; there is no Firestore database provisioned in `evolution-engine` yet.
- Decisions: Do not remove local repository content while the Firestore seam is unproven; keep horse sync state manual and local-first until the database and read/write adapter exist, and keep profile-image blobs out of Firestore in favor of Cloud Storage object paths.

### 2026-03-13 [agent: Codex][ssot-build-live-firestore-horses]
- Done: Wrote the two stage-one horse identity docs into the live Firestore database for `evolution-engine` in Native mode (`australia-southeast1`) using ADC-backed REST calls, then verified the live `horses` collection contains `horses/985125000126462` for Prudentia (`stud_book_id: 427416`) and `horses/985125000126713` for First Gear (`stud_book_id: 428364`). Updated the `SSOT_Build` README with the automated write command that targets the prepared stage-one payload.
- Next: Replace the manual horse sync state with a real Firestore-backed read check so the UI can show `local`, `firestore`, or `synced` automatically for the live horse records.
- Blocked: The current desktop shell still does not have Python/Node available directly, so live writes were executed through Firestore REST instead of the repo script; the browser app still lacks a validated Firestore read adapter.
- Decisions: Stage one is now operational on the real Google project; keep the local repository content and manual sync overlay until the browser-side Firestore seam is implemented and parity-checked.

### 2026-03-13 [agent: Codex][session-close-ssot-firestore]
- Done: Closed the day with stage-one horse identity live in Firestore for `evolution-engine`, local repository content preserved in `SSOT_Build`, a manual sync-state layer present in the UI, and Cloud Storage image-path planning documented rather than prematurely pushed into Firestore.
- Next: Wire Firestore into the build itself: implement the browser-side horse read seam, compare Firestore horse docs against the local seed/custom horse surface, and replace the manual `local|firestore|synced` status with an automatic check.
- Blocked: The app still reads from the local seed path only; Firestore is live for the first two horses, but there is no validated browser-side Firestore repository or parity check yet.
- Decisions: The next session should prioritize Firestore integration into `SSOT_Build` over more contract/design work, using the now-live `horses` collection as the first real seam.

### 2026-03-16 [agent: Codex][workspace-git-attach]
- Done: Read the required workspace context chain, confirmed `/home/evo/workspace` was not yet a git repository, initialized it with branch `main`, and attached `origin` to `https://github.com/Badders80/workspace.git`.
- Next: Add a deliberate top-level `.gitignore`, inspect what should actually belong in the repository, and only then create the first commit and push if requested.
- Blocked: The workspace is about `60G` and had no root `.gitignore`, so an initial add/commit/push would be unsafe without a scoping pass.
- Decisions: The GitHub repo is attached at the workspace root, but no files were staged, committed, or pushed in this session.

### 2026-03-16 [agent: Codex][workspace-cloud-snapshot-push]
- Done: Reframed the GitHub path around a dedicated analysis mirror: the active workspace now has a scripted export-and-push workflow that collects the text-first build surface from root files plus `DNA/`, `_docs/`, `_scripts/`, `gateways/`, and `projects/`, while excluding archives, sandboxes, runtime state, and heavy generated media.
- Next: Use the scripted mirror flow for the first real push, then reuse it for future cloud-analysis refreshes instead of trying to treat the live workspace root as a normal git worktree.
- Blocked: The active workspace still contains embedded git repositories, so a naive `git add .` at the root would create embedded-repo pointers instead of shipping the actual project files; the dedicated mirror clone avoids that trap.
- Decisions: The GitHub mirror is the curated "brains of the build" surface, operated through a separate cached clone and clean export path rather than direct commits from the live workspace root.

### 2026-03-16 [agent: Codex][workspace-analysis-mirror-live]
- Done: Created `/home/evo/workspace/_scripts/sync-analysis-mirror-git.sh`, added `just analysis-mirror` and `just analysis-mirror-apply`, cleaned the abandoned root-repo staged index, ran the first live GitHub mirror push to `https://github.com/Badders80/workspace.git`, and verified commit `0790dc0` on `main`. The pushed mirror contains `466` selected files at roughly `6.6M`.
- Next: Re-run `just analysis-mirror-apply` whenever the cloud-analysis repo should be refreshed, and tune the include/exclude rules only if future AI review needs a missing code/config surface.
- Blocked: The live workspace root still is not intended to be used as a normal git worktree; the durable operational path is the cached mirror clone at `/home/evo/.cache/workspace-analysis-mirror`.
- Decisions: Runtime gateway snapshots are excluded from the mirror, the script performs a lightweight secret preflight before committing, and local git hooks are bypassed only inside the cached mirror clone after that preflight passes.

### 2026-03-16 [agent: Codex][stack-registry-authority]
- Done: Created `/home/evo/workspace/DNA/ops/STACK.md`, inserted it into the required agent context chain and validation scripts, retired Google Docs sync in the live docs, marked `sync-md-context-gdocs.sh` as retired, and aligned tool-governance helpers so `STACK.md` is checked first while `TECH_RADAR.md` is consult-on-demand only.
- Next: Keep `STACK.md` and `DECISION_LOG.md` updated together whenever a tool becomes adopted, active, locked, or replaced.
- Blocked: `TECH_RADAR.md` still contains older Adopt history entries; if they diverge from `STACK.md`, treat `STACK.md` as authoritative.
- Decisions: `STACK.md` is now the live tool registry, `TECH_RADAR.md` is not part of the default entry chain, and Google Drive remains assets only.

### 2026-03-16 [agent: Codex][tech-radar-handoff-documents]
- Done: Added a raw tech-radar intake note for the Charles J Dove Claude Code handoff-document reel, distilled it into `DNA/ops/TECH_RADAR.md` as an `ASSESS` item, and brought the radar intake surface into context-chain compliance while registering the new markdown files in conventions.
- Next: Pilot the workflow in one active repo if session restart cost becomes painful, using a local markdown handoff file rather than any cloud doc surface.
- Blocked: No workspace trial has been run yet, so the pattern remains research only and is not part of the adopted stack.
- Decisions: Treat session handoff documents as a workflow pattern on the radar, not an adopted tool change; any future trial should stay markdown-first and should not revive retired Google Docs sync.

### 2026-03-16 [agent: Codex][tech-radar-memory-rules]
- Done: Reclassified the handoff-documents workflow from `ASSESS` to `ARCHIVE` because the DNA chain already covers the underlying problem, added a `TRIAL` radar entry plus raw intake note for the `tasks/lessons.md` correction-rulebook pattern, and queued both the explicit session-close ritual and the lessons-log experiment in `DNA/INBOX.md`.
- Next: Trial the correction-rulebook pattern in one bounded agent path and only promote it if it measurably reduces repeated corrections without bloating the bootstrap load.
- Blocked: There is no baseline yet for repeat-correction frequency or token-cost impact, so the lessons rulebook remains an experiment rather than an adopted memory layer.
- Decisions: Do not duplicate `AI_SESSION_BOOTSTRAP.md` with separate handoff documents; steal only the mandatory end-of-session ritual. Treat `lessons.md` as complementary anti-pattern memory, not a replacement for the DNA chain.

### 2026-03-16 [agent: Codex][tech-radar-intake-stage-1]
- Done: Rewrote `DNA/ops/tech-radar-intake/README.md` to document the new Stage 1 intake-only workflow, added the referenced `DNA/ops/GEM_TECH_RADAR_PROCESSOR.md` path as a governed stub so the workflow no longer points at a missing file, and registered that markdown file in `DNA/ops/CONVENTIONS.md`.
- Next: Replace the processor stub with the real Grok/Gem system prompt and how-to guide when that source text is available.
- Blocked: The actual processor prompt body was not included in this session, so the new processor document is a placeholder rather than the final operating prompt.
- Decisions: `tech-radar-intake/` is now explicitly a raw-dump Stage 1 surface only; distillation and Codex prompt generation belong to the separate processor stage.

### 2026-03-16 [agent: Codex][tech-radar-batch-sync]
- Done: Added the new multi-item raw intake batch, aligned `TECH_RADAR.md` with the processor-based intake workflow, added `Nano Banana 2 Prompt Libraries`, `Claude Three-Tier Memory Hierarchy`, `Claude Skills`, `Obsidian + Claude Second Brain`, `Undescribed Instagram Reel`, and `AI Design Workflows`, and reclassified `Paperclip` and `Skills.sh` to match the latest fit assessments while updating related inbox tasks.
- Next: Run the backlog trials for `Paperclip` and the Claude three-tier memory merge only if those workstreams rise above current platform priorities.
- Blocked: Several of the source items are Instagram reels or posts with no durable primary-source docs captured yet, so these remain judgment-based radar entries rather than verified implementation plans.
- Decisions: Treat creative-image prompt libraries as future-facing `ASSESS` only, keep design-only workflow posts archived for domain mismatch, and prefer the latest explicit fit verdict when it conflicts with an older radar status.

### 2026-03-17 [agent: Codex][tech-radar-batch-sync-2]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-17_batch.md` to capture the full March 14-17 discovery sweep one by one, updated `TECH_RADAR.md` with new `TRIAL`, `ASSESS`, and `ARCHIVE` entries, promoted `Skills.sh`, `claude-mem`, `AionUi`, and `SuperClaude Framework` to `TRIAL`, and queued the newly promoted trials in `DNA/INBOX.md`.
- Next: Run the new trial backlog selectively, starting with the lowest-risk workflow enhancers (`Claude Code Hooks`, a small `skills.sh` or free-skills audit, and one bounded `SuperClaude` or `claude-mem` session) before heavier gateway experiments.
- Blocked: Several discoveries still come from Instagram-only surfaces or an attachment with no durable transcript, so parts of the batch remain guided by the supplied descriptions rather than fully inspectable primary docs.
- Decisions: Record the sweep in one governed batch file instead of exploding the conventions registry with dozens of new markdown files, and keep locked-tool governance intact by archiving `OpenCode` rather than advancing an orchestrator replacement without matching `STACK.md` and `DECISION_LOG.md` updates.

### 2026-03-17 [agent: Codex][workspace-full-snapshot-flow]

### 2026-03-19 [agent: Codex][evolution-platform-seo-audit]
- Done: Completed a live SEO audit of `projects/Evolution_Platform` against `https://www.evolutionstables.nz`, compared production crawl/index signals to the local Next.js metadata surfaces, and verified the biggest drift areas: canonical host mismatch, sitemap/robots mismatch, indexable private/demo/auth surfaces, placeholder legal pages, broken or missing updates routes, and poor homepage mobile LCP driven by heavyweight media payloads.
- Next: Decide whether to execute a production-alignment fix pass now, starting with `robots.txt` + sitemap parity, private-route `noindex` enforcement, legal-page replacement, and homepage image/LCP reduction.
- Blocked: Search Console and analytics were not available in this session, so index coverage, query performance, and cannibalization could only be inferred from live crawlable output and Lighthouse.
- Decisions: For SEO work on `Evolution_Platform`, treat live production output as the source of truth until deployment parity is re-established, because the current repo metadata and crawl directives do not match what the public site is serving.

### 2026-04-08 [agent: Codex][openfang-memory-handoff-alignment]
- Done: Stabilized the OpenFang memory-system handoff at the documentation and governance layer by confirming the three target hands are active on `qwen3.5:latest`, identifying that direct one-shot assistant responses can still drift from real CLI/runtime behavior, creating `DNA/ops/memory-system-adoption.md`, correcting `research_vault/OBSIDIAN_SETUP.md` to keep the tracked workspace copy canonical, and updating the OpenFang wizard README to match the live starter path, hand roles, and local-model strategy.
- Next: Re-run the bounded OpenFang validation loop after any hand/template updates, and only add `qmd` operational commands once the helper is actually installed and tested locally.
- Blocked: `qmd` is not currently installed in the workspace environment, so it remains documented as a helper path rather than an executable part of the workflow. OpenFang one-shot agent responses also still need skepticism because a live test returned invented inspection commands instead of the real CLI surface.
- Decisions: Keep `qwen3.5:latest` as the active local OpenFang route, treat `gemma4:latest` as an optional spot-check auditor rather than a default gate, and keep runtime/config inspection ahead of agent prose when validating setup health.

### 2026-04-06 [agent: Codex][agent-stack-paperclip-runtime-pin]
- Done: Traced the Paperclip startup failure to the transient `npx paperclipai` dependency graph (`jsdom@28.1.0` -> `cssstyle@6.2.0` -> ESM-only `@asamuzakjp/css-color`), added a managed local runtime at `/home/evo/workspace/_sandbox/agent-stack/.paperclip-runtime/`, added `/home/evo/workspace/_sandbox/agent-stack/paperclip-local.sh`, and updated `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh` so existing `npx --yes paperclipai ...` launches are rerouted through the pinned runtime. Verified both direct `with-node20.sh ... paperclipai` launch and `paperclip-trial.sh start`.
- Next: If Paperclip ships a fix upstream, remove the local pin by testing the plain transient `npx paperclipai run` path first and then simplifying the wrapper only after parity is proven.
- Blocked: The upstream transient install path is still broken on this machine today, so a direct `npx --yes paperclipai run ...` outside the wrapper shim remains unsafe.
- Decisions: Keep the workaround isolated to the sidecar sandbox instead of changing the global Node toolchain or weakening the workspace-wide Node 20 wrapper.

### 2026-04-06 [agent: Codex][agent-stack-phase0-marketplace-checklist]
- Done: Converted the domestic marketplace game plan into an operational Phase 0 go/no-go checklist at `/home/evo/workspace/_docs/agent-stack/PHASE0_MARKETPLACE_READINESS_CHECKLIST_2026-04-06.md`, indexed it from the agent-stack README, and registered it in conventions so the first marketplace Paperclip proof has a governed readiness surface.
- Next: Use the checklist to define the first five bounded Paperclip ticket templates and keep the first proof inside the sandbox-only authority model.
- Blocked: The checklist is ready, but the actual ticket templates and lane-specific Paperclip artifacts still need to be created before execution starts.
- Decisions: Treat marketplace readiness as a bounded Phase 0 operating question, not a reason to widen workspace tooling or prematurely implement the full North Star architecture.
- Done: Created `/home/evo/workspace/_scripts/sync-workspace-full-git.sh` as a repeatable broad snapshot export for `workspace_full`, added `just workspace-full` and `just workspace-full-apply`, and set the default exclusions to nested `.git/` directories, secret-shaped files, media assets (`mp3/mp4/jpg/jpeg/png/gif/webp/svg/mov/wav`), and files above the GitHub-safe size threshold.
- Next: Re-run the workspace-full script whenever a fresh broad agent-facing snapshot is needed, and only widen the exclusions if GitHub rejects a new class of file or the repo becomes too heavy for the intended investigation workflow.
- Blocked: The broad snapshot still intentionally keeps local installs and generated code when they fit, so repo weight can grow quickly even with media and oversized files excluded.
- Decisions: Keep `Badders80/workspace` as the curated analysis mirror and use `Badders80/workspace_full` for the widest practical GitHub-safe workspace export.

### 2026-03-17 [agent: Codex][tech-radar-baudbot-promptfoo-pi-gists-opencode]
- Done: Added focused intake files for `BaudBot`, `promptfoo`, `gists.sh`, `Pi (pi.dev)`, and `OpenCode`; updated `TECH_RADAR.md` to mark `BaudBot` as `ASSESS`, `promptfoo`/`gists.sh`/`Pi` as `TRIAL`, and reopened `OpenCode` from `ARCHIVE` to a bounded `TRIAL`; registered the new markdown files in conventions; and appended the related trial tasks to `DNA/INBOX.md`.
- Next: Run the low-risk trials first, especially `promptfoo`, `gists.sh`, and one bounded terminal-agent comparison between `Pi`, `OpenCode`, and the current Codex path.
- Blocked: Some of these tools were added from user-supplied fit assessments rather than a fresh full-source validation pass in this session, so the radar entries should still be treated as working notes until a real hands-on trial happens.
- Decisions: Reopening `OpenCode` in `TECH_RADAR.md` is a trial-scope revisit only and does not change the adopted stack in `STACK.md`.

### 2026-03-17 [agent: Codex][workspace-root-cleanup]
- Done: Copied the archive vault template/schema into `workspace/DNA/vault`, pointed `vault.sh` at the workspace project tree while still validating master `/home/evo/.env`, and rewired `evo-docker.sh`/`evo-doctor.sh` to derive their paths from `WORKSPACE_ROOT` instead of hard-coded `/home/evo` references.
- Next: Keep the workspace vault schema/template in sync with any future env contract changes and let `vault.sh check` surface unexpected symlink targets as it walks the workspace projects.
- Blocked: None.
- Decisions: Treat `/home/evo/workspace` as the canonical repo surface and reserve `workspace_full` for the broad snapshot export per the March 17 decision log.

### 2026-03-17 [agent: Codex][google-auth-policy-realign]
- Done: Realigned the live Gemini control-plane settings back to `vertex-ai` in both `/home/evo/.config/evo/gemini-system-settings.json` and `/home/evo/.gemini/settings.json`, and removed default `GEMINI_API_KEY` / `GOOGLE_API_KEY` shell export from `/home/evo/.config/evo/auth.direct.sh` so Google tooling now follows the workspace ADC-first policy by default.
- Next: Keep the raw Gemini Developer API key in `/home/evo/.env` only as a diagnostics or explicit fallback secret until the secret-registry pass decides whether it should be retired entirely.
- Blocked: None.
- Decisions: For this workspace, Google API keys may exist in vault storage but must not be injected into every shell by default; the standard operating path is Vertex AI on `evolution-engine` via ADC.

### 2026-03-17 [agent: Codex][workspace-full-secret-exclusions]
- Done: Investigated the blocked `workspace_full` push, confirmed the secret scan correctly flagged a vault archive backup and a legacy runtime workspace token file, and updated `/home/evo/workspace/_scripts/sync-workspace-full-git.sh` to exclude `DNA/vault/archive/` plus legacy runtime workspace snapshots from the broad export.
- Next: Re-run `just workspace-full-apply` after the export cache refreshes so the excluded runtime and vault surfaces are deleted from the cached mirror before commit.
- Blocked: The previously interrupted export repo may still contain stale copies of those files until the next successful sync completes.
- Decisions: `workspace_full` remains broad, but it must not include vault backup material or runtime workspace snapshots that can carry live auth tokens.

### 2026-03-17 [agent: Codex][skills-integration-strategy]
- Done: Reviewed the required workspace governance chain, checked the governed `DNA/skills` surface plus the live stack/radar, inspected current project-local agent surfaces in `Evolution_Platform` and `SSOT_Build`, and assessed the proposed external skill and MCP candidates against the current build direction.
- Next: If approved, formalize a small workspace-first skills operating model: `DNA/skills` as the governed catalog, project-local overlays only where repo-specific behavior exists, and a first-wave trial pack documented before any runtime installs.
- Blocked: Human approval is still required before promoting any candidate beyond `TRIAL` or installing anything into `~/.codex/skills/`.
- Decisions: Recommendation only for now - keep skill governance at the workspace level and use project-level skill overlays selectively for repo-specific build behavior.

### 2026-03-19 [agent: Codex][workspace-truth-surface-slimming]
- Done: Rewrote the live prompt library to the workspace-only model, corrected the lingering `00_DNA` skill path in `DNA/agents/AGENTS.core.md`, fixed `Justfile` so `dna-commit` targets the real workspace git root, rewired `evo-audit.sh` to inspect workspace DNA and workspace projects instead of `00_DNA`, trimmed the live doctor wrapper list, simplified the governed skills index so it only lists files that actually exist, and updated the live stack plus decision log to match the current operating model.
- Next: Validate whether `evo-audit-partners.sh` should be reduced to the preferred core set, and decide whether to clean the retired Kimi and Kilo wrappers from the control-plane install paths under `~/.local/bin`.
- Blocked: Historical references to Kimi, Kilo, `00_DNA`, and older path models remain in `DECISION_LOG.md` by design; they are ledger entries, not live rules.
- Decisions: `/home/evo/.env` remains the single shared vault for active projects; the live preferred agent flow is Codex primary, Claude browser/chat advisory, Claude Code and Gemini capability-specific, with Aider plus OpenRouter or Groq APIs and Jules as optional utility paths.

### 2026-03-19 [agent: Codex][marketplace-archive-retire]
- Done: Moved `projects/Evolution_Marketplace` out of the active workspace surface to `/home/evo/_archive/projects/2026-03-19/Evolution_Marketplace`, updated bootstrap and agent context docs to remove Marketplace from active-project lists, and updated inbox/manifest surfaces to track the archive state.
- Next: Reduce `evo-audit-partners.sh` to the preferred core set and retire partner routes that no longer match the live stack.
- Blocked: None.
- Decisions: `Evolution_Marketplace` is no longer an active project surface under `/home/evo/workspace/projects`; reactivation requires explicit re-scope from the dated archive batch.

### 2026-03-19 [agent: Codex][audit-partners-core-reducer]
- Done: Rewrote `_scripts/evo-audit-partners.sh` to the preferred core first-level auditors (`Codex`, `Gemini`, `Groq`, `Anthropic`), removed `Kimi` and `GLM` routing complexity, switched audit output to `/home/evo/workspace/_logs/audit_runs`, and updated report context-chain links to workspace-native governance paths.
- Next: Align `_scripts/evo-audit-claude-meta.sh` and `_scripts/evo-groq-watchdog.sh` with the same reduced core model and workspace-native output assumptions.
- Blocked: None.
- Decisions: The first-level partner audit surface now matches the current live stack strategy; retired partner routes should be treated as historical only.

### 2026-03-19 [agent: Codex][audit-wrapper-alignment-complete]
- Done: Updated `_scripts/evo-groq-watchdog.sh` to remove stale `KIMI_AUDIT_ENABLED` and `GLM_AUDIT_ENABLED` toggles, updated `_scripts/evo-audit-claude-meta.sh` to use the reduced core first-level partner reports (`Gemini`, `Groq`, `Anthropic`, `Codex`) and workspace-native context-chain paths, and verified with `bash -n _scripts/evo-audit-partners.sh _scripts/evo-audit-claude-meta.sh _scripts/evo-groq-watchdog.sh` plus `just check`.
- Next: Optional cleanup pass to archive or simplify any remaining legacy direct audit helpers that are no longer called by active workflows.
- Blocked: None.
- Decisions: Audit orchestration wrappers now align with the reduced core partner contract and workspace-only truth surface.

### 2026-03-19 [agent: Codex][tech-radar-nemotron-super]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_nemotron-super.md`, promoted the existing Nemotron row in `TECH_RADAR.md` from `ASSESS` to `TRIAL`, and queued a bounded local-Ollama trial in `DNA/INBOX.md`.
- Next: Run one contained local Ollama trial and compare quality, speed, and operational cost against the current worker-model mix before treating Nemotron as a default worker brain.
- Blocked: NVIDIA's official materials advertise up to `1M` context, but the current Ollama library listing exposes `256K` for the local model entry, so the first trial should not assume full `1M` local context without confirmation.
- Decisions: Promote Nemotron based on primary-source evidence from NVIDIA and Ollama, but record the local-context mismatch explicitly so the trial stays honest and bounded.

### 2026-03-19 [agent: Codex][tech-radar-march-14-15-reconciliation]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_march-14-15-review.md` to reconcile the March 14-15 batch against the newer workflow trials, kept `skills.sh` and `claude-mem` as `TRIAL`, downgraded `Paperclip` to `ASSESS`, archived `AionUi` and `SuperClaude Framework`, and updated the inbox to replace stale trial tasks with steal-only follow-ups.
- Next: Prioritize the clear winners (`skills.sh`, `claude-mem`) and only revisit `Paperclip` after the current workflow and memory trials stabilize.
- Blocked: None; this was a fit-and-priority reconciliation pass rather than a source-verification problem.
- Decisions: Keep heavyweight orchestration and overlapping UI-management experiments parked until the simpler workflow wins are proven.

### 2026-03-19 [agent: Codex][tech-radar-priority-shortlist]
- Done: Added a priority shortlist synthesis row into `TECH_RADAR.md` and added an explicit ordered execution block for `skills.sh`, `claude-mem`, and `NVIDIA Nemotron 3 Super` to `DNA/INBOX.md`.
- Next: Execute the shortlist one branch at a time in the documented order: `skills.sh`, then `claude-mem`, then `NVIDIA Nemotron 3 Super`.
- Blocked: The local Nemotron path still needs real hardware validation.
- Decisions: Keep the shortlist as a synthesis layer on top of existing tool rows rather than inventing new per-tool statuses or duplicating the same fit analysis again.

### 2026-03-19 [agent: Codex][research-vault-scaffold]
- Done: Created a sidecar research vault scaffold at `/home/evo/workspace/_sandbox/research_vault` for the Obsidian-first knowledge layer, added starter home, schema, inbox, review queue, and CEO/CTO report notes, added reusable templates for manual capture, normalized notes, and review reports, and added `/home/evo/workspace/_scripts/research-capture.sh` plus `just research-capture` for fast founder note capture.
- Next: Add the first real normalized notes for the target source set, then decide what crawler or importer path should feed the vault without writing into DNA.
- Blocked: The previously referenced runtime island is not present in this workspace right now, so the first scaffold lives under `_sandbox/` rather than an island-owned path.
- Decisions: The research layer is a sidecar sandbox, not DNA; Obsidian is the hub and SSOT for this research surface, and role-based review turns research noise into signal before any human-led promotion into governed docs.

### 2026-03-19 [agent: Codex][research-vault-obsidian-fresh-start]
- Done: Added a fresh-vault setup note at `/home/evo/workspace/_sandbox/research_vault/OBSIDIAN_SETUP.md` and minimal Obsidian config under `/home/evo/workspace/_sandbox/research_vault/.obsidian/` so the new research vault can be opened as a clean dedicated Obsidian vault without depending on any previous local Obsidian state.
- Next: Reinstall or reopen Obsidian against the research vault path, then decide whether any pieces from the old `Evolution_Brain` structure are worth selectively reintroducing.
- Blocked: None.
- Decisions: After the local reset, treat the research vault as the clean starting point rather than trying to reconstruct or merge the previous personal vault immediately.

### 2026-03-19 [agent: Codex][research-vault-obsidian-install]
- Done: Installed Obsidian desktop on Windows via `winget`, registered the new research vault path in `%APPDATA%\\Obsidian\\obsidian.json`, and added `/home/evo/workspace/_scripts/open-research-vault.ps1` plus `just research-vault-open` as a simple launcher for the fresh research vault.
- Next: Open the fresh vault once in the desktop app, confirm the default landing flow around `HOME.md`, then begin adding the first real source and manual-capture notes.
- Blocked: Obsidian still retains older vault registrations in local app state, so the user may want to close or ignore those rather than deleting them immediately.
- Decisions: The fresh research vault is now the preferred Obsidian starting point for the sidecar research layer; the old vault registrations remain as historical local app entries until explicitly cleaned up.

### 2026-03-19 [agent: Codex][research-vault-source-seed]
- Done: Added `/home/evo/workspace/_scripts/seed_research_sources.py`, seeded the research vault with last-six-month website digests for Tokinvest and Evolution Stables plus source-profile notes for Tokinvest X, Evolution X, Alex Baddeley LinkedIn, and the Evolution LinkedIn admin URL, and linked those seeded sources from the vault home for immediate review.
- Next: Add a stronger social-timeline ingestion path if X or LinkedIn post-level capture becomes a priority, and start promoting the highest-signal source items into entity, topic, and review notes.
- Blocked: Public website capture works now, but social timelines remain profile-level only in this first pass because those surfaces are more likely to need auth-aware or anti-bot-aware crawling.
- Decisions: The initial knowledge-repository seed prioritizes reliable public website capture plus explicit social-source registration over brittle pseudo-scraping of gated or unstable social timelines.

### 2026-03-19 [agent: Codex][research-vault-windows-mirror]
- Done: Created a Windows-local Obsidian mirror at `C:\Users\Evo\Research_Vault`, added `/home/evo/workspace/_scripts/research-vault-sync.ps1` plus `just research-vault-pull` and `just research-vault-push`, updated the launcher to target the local mirror, and documented the mirror-based sync workflow in `OBSIDIAN_SETUP.md`.
- Next: Open the local mirror in Obsidian, confirm editing works cleanly, then use the explicit pull/push flow until or unless a more automatic sync path is warranted.
- Blocked: Windows Obsidian hit a watcher error on the raw WSL UNC path, so the local mirror is required for now.
- Decisions: The workspace copy remains canonical for the sidecar, while the Windows-local mirror exists as the UI-friendly Obsidian editing surface.

### 2026-03-20 [agent: Codex][github-sync-hardening]
- Done: Reviewed the required workspace context chain, confirmed `Badders80/workspace` remains the curated analysis mirror and `Badders80/workspace_full` remains the broad snapshot surface, and hardened both sync scripts so reviewed sample-token docs and tests no longer block mirror exports while real secret scanning stays active.
- Next: Use the two sync scripts for fresh GitHub pushes, and only expand the sample-secret allowlist when a reviewed documentation or test fixture is clearly using placeholder tokens rather than live credentials.
- Blocked: Concurrent `wsl.exe` calls from this desktop thread are unreliable, so git and export operations should be run sequentially from here.
- Decisions: Keep `workspace` on the curated mirror path and `workspace_full` on the broad export path; keep vault backups and local reference clones out of the curated mirror commit path.

### 2026-03-20 [agent: Codex][tokinvest-dds-brand-and-deck-surface]
- Done: Created a reusable Tokinvest / DDS brand asset home at `/home/evo/workspace/_docs/brand_assets/tokinvest_dds/`, curated the key logo, tagline, guideline, color, and font assets into that surface, extracted the core brand tokens into `brand_tokens.txt`, and built an owner-led minimalist deck handoff at `/home/evo/workspace/_docs/presentations/tokinvest_dds_owner_minimalist_2026-03-20/` with both an editable HTML deck and a Canva-ready slide-copy brief.
- Next: Review the HTML deck with Sophie and the team, tune the slide density and visual hierarchy in Canva or PowerPoint, and decide whether a native `.pptx` export path should be added later through dedicated deck-generation tooling.
- Blocked: The current environment does not have a native PowerPoint-generation library or desktop presentation exporter available by default, so the first delivery is HTML plus text handoff rather than a `.pptx`.
- Decisions: Use `_docs/brand_assets/` as the reusable governed home for cross-project brand packs and `_docs/presentations/` as the working surface for lightweight presentation deliverables.

### 2026-03-20 [agent: Codex][brand-shorthand-removal]
- Done: Removed the `GTI` and `Q7` internal shorthand from the live brand system docs, replaced the metaphor block in `DNA/brand/BRAND_SYSTEM.md` with direct Awareness/Ownership language, and cleaned the remaining active legacy context reference in `_docs/EVOLUTION_MASTER_CONTEXT.md`.
- Next: Use `Awareness Layer` and `Ownership Layer` consistently across future brand and positioning edits, and only retain the old shorthand in archived historical material if needed for provenance.
- Blocked: Historical and archived pre-workspace brand material may still contain the old shorthand, but those surfaces were intentionally left untouched.
- Decisions: The active internal vocabulary for the brand system is now explicit layer naming only, with no `GTI` or `Q7` shorthand in live workspace docs.

### 2026-03-20 [agent: Codex][research-vault-promotion]
- Done: Promoted the research vault from `/home/evo/workspace/_sandbox/research_vault` to `/home/evo/workspace/research_vault`, updated the workspace docs and helper scripts to treat it as a tracked sidecar, and added the promoted path to the curated analysis mirror scope while keeping `_sandbox/` excluded.
- Next: Use the promoted vault path for future captures and Obsidian syncs, and decide later whether any raw capture payloads should move to a lighter-weight archive policy.
- Blocked: None.
- Decisions: The research vault now lives in the main `workspace` repo as a tracked sidecar layer, but it remains outside DNA and outside the default agent entry chain.

### 2026-03-17 [agent: Codex][workspace-full-snapshot-flow]

### 2026-03-19 [agent: Codex][evolution-platform-seo-audit]
- Done: Completed a live SEO audit of `projects/Evolution_Platform` against `https://www.evolutionstables.nz`, compared production crawl/index signals to the local Next.js metadata surfaces, and verified the biggest drift areas: canonical host mismatch, sitemap/robots mismatch, indexable private/demo/auth surfaces, placeholder legal pages, broken or missing updates routes, and poor homepage mobile LCP driven by heavyweight media payloads.
- Next: Decide whether to execute a production-alignment fix pass now, starting with `robots.txt` + sitemap parity, private-route `noindex` enforcement, legal-page replacement, and homepage image/LCP reduction.
- Blocked: Search Console and analytics were not available in this session, so index coverage, query performance, and cannibalization could only be inferred from live crawlable output and Lighthouse.
- Decisions: For SEO work on `Evolution_Platform`, treat live production output as the source of truth until deployment parity is re-established, because the current repo metadata and crawl directives do not match what the public site is serving.
- Done: Created `/home/evo/workspace/_scripts/sync-workspace-full-git.sh` as a repeatable broad snapshot export for `workspace_full`, added `just workspace-full` and `just workspace-full-apply`, and set the default exclusions to nested `.git/` directories, secret-shaped files, media assets (`mp3/mp4/jpg/jpeg/png/gif/webp/svg/mov/wav`), and files above the GitHub-safe size threshold.
- Next: Re-run the workspace-full script whenever a fresh broad agent-facing snapshot is needed, and only widen the exclusions if GitHub rejects a new class of file or the repo becomes too heavy for the intended investigation workflow.
- Blocked: The broad snapshot still intentionally keeps local installs and generated code when they fit, so repo weight can grow quickly even with media and oversized files excluded.
- Decisions: Keep `Badders80/workspace` as the curated analysis mirror and use `Badders80/workspace_full` for the widest practical GitHub-safe workspace export.

### 2026-03-17 [agent: Codex][tech-radar-baudbot-promptfoo-pi-gists-opencode]
- Done: Added focused intake files for `BaudBot`, `promptfoo`, `gists.sh`, `Pi (pi.dev)`, and `OpenCode`; updated `TECH_RADAR.md` to mark `BaudBot` as `ASSESS`, `promptfoo`/`gists.sh`/`Pi` as `TRIAL`, and reopened `OpenCode` from `ARCHIVE` to a bounded `TRIAL`; registered the new markdown files in conventions; and appended the related trial tasks to `DNA/INBOX.md`.
- Next: Run the low-risk trials first, especially `promptfoo`, `gists.sh`, and one bounded terminal-agent comparison between `Pi`, `OpenCode`, and the current Codex path.
- Blocked: Some of these tools were added from user-supplied fit assessments rather than a fresh full-source validation pass in this session, so the radar entries should still be treated as working notes until a real hands-on trial happens.
- Decisions: Reopening `OpenCode` in `TECH_RADAR.md` is a trial-scope revisit only and does not change the adopted stack in `STACK.md`.

### 2026-03-17 [agent: Codex][workspace-root-cleanup]
- Done: Copied the archive vault template/schema into `workspace/DNA/vault`, pointed `vault.sh` at the workspace project tree while still validating master `/home/evo/.env`, and rewired `evo-docker.sh`/`evo-doctor.sh` to derive their paths from `WORKSPACE_ROOT` instead of hard-coded `/home/evo` references.
- Next: Keep the workspace vault schema/template in sync with any future env contract changes and let `vault.sh check` surface unexpected symlink targets as it walks the workspace projects.
- Blocked: None.
- Decisions: Treat `/home/evo/workspace` as the canonical repo surface and reserve `workspace_full` for the broad snapshot export per the March 17 decision log.

### 2026-03-17 [agent: Codex][google-auth-policy-realign]
- Done: Realigned the live Gemini control-plane settings back to `vertex-ai` in both `/home/evo/.config/evo/gemini-system-settings.json` and `/home/evo/.gemini/settings.json`, and removed default `GEMINI_API_KEY` / `GOOGLE_API_KEY` shell export from `/home/evo/.config/evo/auth.direct.sh` so Google tooling now follows the workspace ADC-first policy by default.
- Next: Keep the raw Gemini Developer API key in `/home/evo/.env` only as a diagnostics or explicit fallback secret until the secret-registry pass decides whether it should be retired entirely.
- Blocked: None.
- Decisions: For this workspace, Google API keys may exist in vault storage but must not be injected into every shell by default; the standard operating path is Vertex AI on `evolution-engine` via ADC.

### 2026-03-17 [agent: Codex][workspace-full-secret-exclusions]
- Done: Investigated the blocked `workspace_full` push, confirmed the secret scan correctly flagged a vault archive backup and an OpenClaw runtime workspace token file, and updated `/home/evo/workspace/_scripts/sync-workspace-full-git.sh` to exclude `DNA/vault/archive/` plus `gateways/openclaw/workspace/workspace-gateway-*/` from the broad export.
- Next: Re-run `just workspace-full-apply` after the export cache refreshes so the excluded runtime and vault surfaces are deleted from the cached mirror before commit.
- Blocked: The previously interrupted export repo may still contain stale copies of those files until the next successful sync completes.
- Decisions: `workspace_full` remains broad, but it must not include vault backup material or runtime gateway workspaces that can carry live auth tokens.

### 2026-03-17 [agent: Codex][skills-integration-strategy]
- Done: Reviewed the required workspace governance chain, checked the governed `DNA/skills` surface plus the live stack/radar, inspected current project-local agent surfaces in `Evolution_Platform` and `SSOT_Build`, and assessed the proposed external skill and MCP candidates against the current build direction.
- Next: If approved, formalize a small workspace-first skills operating model: `DNA/skills` as the governed catalog, project-local overlays only where repo-specific behavior exists, and a first-wave trial pack documented before any runtime installs.
- Blocked: Human approval is still required before promoting any candidate beyond `TRIAL` or installing anything into `~/.codex/skills/`.
- Decisions: Recommendation only for now - keep skill governance at the workspace level and use project-level skill overlays selectively for repo-specific build behavior.

### 2026-03-19 [agent: Codex][workspace-truth-surface-slimming]
- Done: Rewrote the live prompt library to the workspace-only model, corrected the lingering `00_DNA` skill path in `DNA/agents/AGENTS.core.md`, fixed `Justfile` so `dna-commit` targets the real workspace git root, rewired `evo-audit.sh` to inspect workspace DNA and workspace projects instead of `00_DNA`, trimmed the live doctor wrapper list, simplified the governed skills index so it only lists files that actually exist, and updated the live stack plus decision log to match the current operating model.
- Next: Validate whether `evo-audit-partners.sh` should be reduced to the preferred core set, and decide whether to clean the retired Kimi and Kilo wrappers from the control-plane install paths under `~/.local/bin`.
- Blocked: Historical references to Kimi, Kilo, `00_DNA`, and older path models remain in `DECISION_LOG.md` by design; they are ledger entries, not live rules.
- Decisions: `/home/evo/.env` remains the single shared vault for active projects; the live preferred agent flow is Codex primary, Claude browser/chat advisory, Claude Code and Gemini capability-specific, with Aider plus OpenRouter or Groq APIs and Jules as optional utility paths.

### 2026-03-19 [agent: Codex][marketplace-archive-retire]
- Done: Moved `projects/Evolution_Marketplace` out of the active workspace surface to `/home/evo/_archive/projects/2026-03-19/Evolution_Marketplace`, updated bootstrap and agent context docs to remove Marketplace from active-project lists, and updated inbox/manifest surfaces to track the archive state.
- Next: Reduce `evo-audit-partners.sh` to the preferred core set and retire partner routes that no longer match the live stack.
- Blocked: None.
- Decisions: `Evolution_Marketplace` is no longer an active project surface under `/home/evo/workspace/projects`; reactivation requires explicit re-scope from the dated archive batch.

### 2026-03-19 [agent: Codex][audit-partners-core-reducer]
- Done: Rewrote `_scripts/evo-audit-partners.sh` to the preferred core first-level auditors (`Codex`, `Gemini`, `Groq`, `Anthropic`), removed `Kimi` and `GLM` routing complexity, switched audit output to `/home/evo/workspace/_logs/audit_runs`, and updated report context-chain links to workspace-native governance paths.
- Next: Align `_scripts/evo-audit-claude-meta.sh` and `_scripts/evo-groq-watchdog.sh` with the same reduced core model and workspace-native output assumptions.
- Blocked: None.
- Decisions: The first-level partner audit surface now matches the current live stack strategy; retired partner routes should be treated as historical only.

### 2026-03-19 [agent: Codex][audit-wrapper-alignment-complete]
- Done: Updated `_scripts/evo-groq-watchdog.sh` to remove stale `KIMI_AUDIT_ENABLED` and `GLM_AUDIT_ENABLED` toggles, updated `_scripts/evo-audit-claude-meta.sh` to use the reduced core first-level partner reports (`Gemini`, `Groq`, `Anthropic`, `Codex`) and workspace-native context-chain paths, and verified with `bash -n _scripts/evo-audit-partners.sh _scripts/evo-audit-claude-meta.sh _scripts/evo-groq-watchdog.sh` plus `just check`.
- Next: Optional cleanup pass to archive or simplify any remaining legacy direct audit helpers that are no longer called by active workflows.
- Blocked: None.
- Decisions: Audit orchestration wrappers now align with the reduced core partner contract and workspace-only truth surface.

### 2026-03-19 [agent: Codex][tech-radar-openclaw-ops-batch]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_batch.md` for the latest AlphaClaw, OpenShell, Scrapling, autoresearch, and Figr pass; added `AlphaClaw` and `OpenClaw + Scrapling` to `TECH_RADAR.md` as `TRIAL`; added `OpenShell` as `ASSESS`; archived `autoresearch` and `Figr.design`; and queued the new AlphaClaw, Scrapling, and hooks-prompt follow-up work in `DNA/INBOX.md`.
- Next: Trial `AlphaClaw` first because it has the strongest primary-source evidence and cleanest island fit, then test the Scrapling path in one bounded research task if the OpenClaw island remains stable.
- Blocked: `OpenShell` is still sourced mainly from a throttled Instagram reel plus secondary chatter, so there is not yet enough durable upstream documentation to justify a `TRIAL` classification.
- Decisions: Keep duplicate Magic Animator coverage out of the live radar, and prefer an evidence-weighted downgrade to `ASSESS` when the founder verdict is stronger than the available source quality.

### 2026-03-19 [agent: Codex][tech-radar-nemotron-super]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_nemotron-super.md`, promoted the existing Nemotron row in `TECH_RADAR.md` from `ASSESS` to `TRIAL`, and queued a bounded local-Ollama trial in `DNA/INBOX.md`.
- Next: Run one contained OpenClaw-side trial with the local Ollama path and compare quality, speed, and operational cost against the current worker-model mix before treating Nemotron as a default worker brain.
- Blocked: NVIDIA's official materials advertise up to `1M` context, but the current Ollama library listing exposes `256K` for the local model entry, so the first trial should not assume full `1M` local context without confirmation.
- Decisions: Promote Nemotron based on primary-source evidence from NVIDIA and Ollama, but record the local-context mismatch explicitly so the trial stays honest and bounded.

### 2026-03-19 [agent: Codex][tech-radar-march-14-15-reconciliation]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_march-14-15-review.md` to reconcile the March 14-15 batch against the newer OpenClaw trials, kept `skills.sh` and `claude-mem` as `TRIAL`, downgraded `Paperclip` to `ASSESS`, archived `AionUi` and `SuperClaude Framework`, and updated the inbox to replace stale trial tasks with steal-only follow-ups.
- Next: Prioritize the clear winners (`skills.sh`, `claude-mem`, `AlphaClaw`) and only revisit `Paperclip` after the current OpenClaw ops stack is stable.
- Blocked: None; this was a fit-and-priority reconciliation pass rather than a source-verification problem.
- Decisions: Prefer one primary UI-management trial (`AlphaClaw`) over running overlapping desktop-management layers in parallel, and keep heavyweight orchestration experiments parked until the simpler operational wins are proven.

### 2026-03-19 [agent: Codex][tech-radar-priority-shortlist]
- Done: Added `/home/evo/workspace/DNA/ops/tech-radar-intake/2026-03-19_priority-shortlist.md`, inserted a `Priority Trial Shortlist` synthesis row into `TECH_RADAR.md`, and added an explicit ordered execution block for `AlphaClaw`, `skills.sh`, `claude-mem`, and `NVIDIA Nemotron 3 Super` to `DNA/INBOX.md`.
- Next: Execute the shortlist one branch at a time in the documented order: `AlphaClaw`, then `skills.sh` plus `claude-mem`, then `NVIDIA Nemotron 3 Super`.
- Blocked: The local Nemotron path still needs real hardware validation, and `AlphaClaw` must keep Google Workspace or Drive paths disabled to stay within current workspace policy.
- Decisions: Keep the shortlist as a synthesis layer on top of existing tool rows rather than inventing new per-tool statuses or duplicating the same fit analysis again.

### 2026-03-19 [agent: Codex][research-vault-scaffold]
- Done: Created a sidecar research vault scaffold at `/home/evo/workspace/_sandbox/research_vault` for the Obsidian-first knowledge layer, added starter home, schema, inbox, review queue, and CEO/CTO report notes, added reusable templates for manual capture, normalized notes, and review reports, and added `/home/evo/workspace/_scripts/research-capture.sh` plus `just research-capture` for fast founder note capture.
- Next: Add the first real normalized notes for the target source set, then decide what crawler or importer path should feed the vault without writing into DNA.
- Blocked: The previously referenced `gateways/openclaw/` island is not present in this workspace right now, so the first scaffold lives under `_sandbox/` rather than an OpenClaw-owned path.
- Decisions: The research layer is a sidecar sandbox, not DNA; Obsidian is the hub and SSOT for this research surface, and role-based review turns research noise into signal before any human-led promotion into governed docs.

### 2026-03-19 [agent: Codex][research-vault-obsidian-fresh-start]
- Done: Added a fresh-vault setup note at `/home/evo/workspace/_sandbox/research_vault/OBSIDIAN_SETUP.md` and minimal Obsidian config under `/home/evo/workspace/_sandbox/research_vault/.obsidian/` so the new research vault can be opened as a clean dedicated Obsidian vault without depending on any previous local Obsidian state.
- Next: Reinstall or reopen Obsidian against the research vault path, then decide whether any pieces from the old `Evolution_Brain` structure are worth selectively reintroducing.
- Blocked: None.
- Decisions: After the local reset, treat the research vault as the clean starting point rather than trying to reconstruct or merge the previous personal vault immediately.

### 2026-03-19 [agent: Codex][research-vault-obsidian-install]
- Done: Installed Obsidian desktop on Windows via `winget`, registered the new research vault path in `%APPDATA%\\Obsidian\\obsidian.json`, and added `/home/evo/workspace/_scripts/open-research-vault.ps1` plus `just research-vault-open` as a simple launcher for the fresh research vault.
- Next: Open the fresh vault once in the desktop app, confirm the default landing flow around `HOME.md`, then begin adding the first real source and manual-capture notes.
- Blocked: Obsidian still retains older vault registrations in local app state, so the user may want to close or ignore those rather than deleting them immediately.
- Decisions: The fresh research vault is now the preferred Obsidian starting point for the sidecar research layer; the old vault registrations remain as historical local app entries until explicitly cleaned up.

### 2026-03-19 [agent: Codex][research-vault-source-seed]
- Done: Added `/home/evo/workspace/_scripts/seed_research_sources.py`, seeded the research vault with last-six-month website digests for Tokinvest and Evolution Stables plus source-profile notes for Tokinvest X, Evolution X, Alex Baddeley LinkedIn, and the Evolution LinkedIn admin URL, and linked those seeded sources from the vault home for immediate review.
- Next: Add a stronger social-timeline ingestion path if X or LinkedIn post-level capture becomes a priority, and start promoting the highest-signal source items into entity, topic, and review notes.
- Blocked: Public website capture works now, but social timelines remain profile-level only in this first pass because those surfaces are more likely to need auth-aware or anti-bot-aware crawling.
- Decisions: The initial knowledge-repository seed prioritizes reliable public website capture plus explicit social-source registration over brittle pseudo-scraping of gated or unstable social timelines.

### 2026-03-19 [agent: Codex][research-vault-windows-mirror]
- Done: Created a Windows-local Obsidian mirror at `C:\Users\Evo\Research_Vault`, added `/home/evo/workspace/_scripts/research-vault-sync.ps1` plus `just research-vault-pull` and `just research-vault-push`, updated the launcher to target the local mirror, and documented the mirror-based sync workflow in `OBSIDIAN_SETUP.md`.
- Next: Open the local mirror in Obsidian, confirm editing works cleanly, then use the explicit pull/push flow until or unless a more automatic sync path is warranted.
- Blocked: Windows Obsidian hit a watcher error on the raw WSL UNC path, so the local mirror is required for now.
- Decisions: The workspace copy remains canonical for the sidecar, while the Windows-local mirror exists as the UI-friendly Obsidian editing surface.

### 2026-03-20 [agent: Codex][github-sync-hardening]
- Done: Reviewed the required workspace context chain, confirmed `Badders80/workspace` remains the curated analysis mirror and `Badders80/workspace_full` remains the broad snapshot surface, and hardened both sync scripts so reviewed sample-token docs and tests no longer block mirror exports while real secret scanning stays active.
- Next: Use the two sync scripts for fresh GitHub pushes, and only expand the sample-secret allowlist when a reviewed documentation or test fixture is clearly using placeholder tokens rather than live credentials.
- Blocked: Concurrent `wsl.exe` calls from this desktop thread are unreliable, so git and export operations should be run sequentially from here.
- Decisions: Keep `workspace` on the curated mirror path and `workspace_full` on the broad export path; keep vault backups and local reference clones out of the curated mirror commit path.

### 2026-03-22 [agent: Codex][startup-governance-reset]
- Done: Audited Windows startup surfaces, backed up and disabled the legacy EVO startup tasks, replaced them with a single hidden `\EVO\Startup Health` task backed by `C:\evo\startup`, and trimmed optional startup apps and updater noise to reduce boot-time RAM drag.
- Next: Keep future startup changes inside `C:\evo\startup` only, and route any new login automation through the documented backup and restore scripts instead of one-off Scheduled Tasks, desktop `.bat` files, or Startup-folder shortcuts.
- Blocked: None.
- Decisions: `C:\evo\startup` is now the machine startup SSOT for this workstation; startup behavior is governed infrastructure and should stay hidden-by-default, reversible, backed up, and documented.

### 2026-03-22 [agent: Codex][workspace-drift-guardrail-tokinvest]
- Done: Created `/home/evo/workspace/_sandbox/README.md` as the lightweight intake rule surface, moved the loose root Tokinvest source folder into `/home/evo/workspace/_docs/brand_assets/tokinvest_dds/source_pack_2026-03-20/`, removed Windows `Zone.Identifier` sidecar noise from that promoted pack, and added README links to the Tokinvest brand asset and presentation surfaces so source and output are clearly connected.
- Next: Put future ad-hoc source packs in `_sandbox/` during active work, and once they are worth keeping promote them into `_docs/`, `projects/`, `research_vault/`, or `/home/evo/_archive/` before they linger at workspace root.
- Blocked: None.
- Decisions: `projects/` remains the build and workstream surface, while reusable brand and source packs plus lightweight decks live under `_docs/`; `_sandbox/` is the temporary intake lane, not a second permanent root.

### 2026-03-22 [agent: Codex][tech-radar-march-22-library-batch]
- Done: Added ten durable repository notes under `/home/evo/workspace/DNA/ops/tech-radar-intake/` for the March 22 discovery batch, registered the new markdown files in conventions, added `Local Claude Code Runner (lcc)`, `stop-slop`, `NotebookLM Cinematic Video Overviews`, `MiroFish`, `Claude Content Brain System`, and `Ghostling / libghostty` to `TECH_RADAR.md`, and queued bounded follow-up trials for `lcc` and `stop-slop` in `DNA/INBOX.md`.
- Next: Run the two new trial items first, then revisit the new `ASSESS` items only if a concrete racing, content, or terminal-UI use case appears.
- Blocked: Several items in this batch come from Instagram-only or otherwise source-limited surfaces, so the repository notes preserve caveats and avoid overclaiming certainty.
- Decisions: Keep duplicate or low-substance March 22 discoveries in the intake library only instead of inflating the live radar with every archive-grade item.

### 2026-03-22 [agent: Codex][tech-radar-processor-rewrite-and-batch-2]
- Done: Rewrote `/home/evo/workspace/DNA/ops/GEM_TECH_RADAR_PROCESSOR.md` to enforce mandatory full link pulls, repository-first evaluation, and the new fixed output order (`Title`, `Source`, `Human Review`, `Technical / Fit Review`, `Tech Radar Recommendation`); aligned the intake template to the same flow; added new March 22 notes for `Impeccable`, `Awesome Codex Subagents`, `Claude Code + Remotion`, `Google AI Studio 2.0`, and `Xiaomi MiMo-V2 Models`; added a short source-limited batch capture; backfilled the visible creator handles into the March 22 AI-creators note; updated `TECH_RADAR.md` with the new `TRIAL` and `ASSESS` rows; and queued the `Impeccable` and `Claude Code + Remotion` follow-up trials in `DNA/INBOX.md`.
- Next: Use the rewritten processor prompt for the next live link batch and confirm the output consistently preserves actual extracted content, especially creator lists, source-limited reels, and linked follow-up resources.
- Blocked: Some March 22 items still remain partially source-limited because the original materials depended on Instagram or gated Notion content rather than durable fully open docs.
- Decisions: The radar processor now treats supplied links as intentional research signals that must be pulled and evaluated before any archive-grade judgment is made; trend tracking, optionality, and future pivots are first-class reasons to preserve an item.

### 2026-03-23 [agent: Codex][startup-health-review-hardening]
- Done: Audited the governed startup surface under `C:\evo\startup`, confirmed the `\EVO\Startup Health` task ran successfully on 2026-03-23 at 09:38 local time, verified the observed ~47-50% RAM baseline came from a resume/login session rather than a cold boot, and upgraded `C:\evo\startup\bin\Invoke-EvoStartupHealth.ps1` plus `C:\evo\startup\README.md` so the monitor now records session context (`cold_boot`, `resume`, `steady_state`), previous-snapshot memory delta, and top RAM-consuming process families and processes.
- Next: Let the upgraded monitor capture the next real cold boot, then compare that snapshot to the 2026-03-23 resume snapshot before making any further startup cuts.
- Blocked: Today's review cannot prove the cold-boot baseline because Windows reports the last full boot on 2026-03-20 at 12:47 local time and the current session resumed from sleep at 2026-03-23 09:37 local time.
- Decisions: Startup monitoring on this machine should explain memory baseline, not just threshold breaches; boot-vs-resume context and top resident RAM consumers are part of the governed startup health output going forward.

### 2026-03-23 [agent: Codex][startup-health-delta-noise-fix]
- Done: Re-reviewed the live startup logs after the next real cold boot, confirmed the boot snapshot was healthy at 24.3% RAM and the later resume snapshot was healthy at 28.7% RAM, and tightened `C:\evo\startup\bin\Invoke-EvoStartupHealth.ps1` so the memory-delta warning now only fires for upward drift on matching session types instead of falsely warning when a clean cold boot follows a heavy interactive resume session.
- Next: Keep the new cold-boot and resume samples as the baseline pair, then only investigate further if future cold boots climb materially above the March 23 boot baseline.
- Blocked: None.
- Decisions: Snapshot-to-snapshot delta is useful for drift detection, but only when the comparison is apples-to-apples; cross-context comparisons should stay informational, not warning-grade.

### 2026-03-23 [agent: Codex][codex-peers-mcp-sandbox-trial]
- Done: Read the required workspace context chain, reviewed `louislva/claude-peers-mcp`, confirmed the Claude-specific blocker is `claude/channel` push delivery plus the missing local Bun/Node runtime, built a Codex-compatible Python adaptation at `/home/evo/workspace/_sandbox/codex-peers-mcp/`, registered it in the Windows Codex config as the global `codex-peers` MCP server, and smoke-tested peer discovery plus queued messaging between two local server processes.
- Next: Validate the UX in a fresh Codex desktop session, then decide whether to add a lightweight Codex rule or prompt habit for checking messages at collaboration boundaries.
- Blocked: Codex does not expose the Claude development-channel push path used by the upstream repo, so inbound messages currently require explicit `check_messages` polling instead of instant session injection.
- Decisions: Keep the Codex adaptation in `_sandbox/` as a reversible utility path, launch it through the Windows-side `C:\Users\Evo\.codex\config.toml` MCP registration via `wsl.exe`, and prefer a Python/std-lib implementation over installing Bun or Node globally for this trial.

### 2026-03-23 [agent: Codex][codex-peers-collaboration-checkpoint]
- Done: Added a new `collaboration_checkpoint` MCP tool plus stronger MCP initialization instructions in `/home/evo/workspace/_sandbox/codex-peers-mcp/server.py` so Codex has a single routine call that can update the session summary, fetch unread peer messages, and list nearby peers in one step; re-smoke-tested the flow between two local peer sessions.
- Next: Restart active Codex sessions so they pick up the refreshed MCP tool list and instructions, then use `collaboration_checkpoint` as the default handoff and inbox-sync call.
- Blocked: This still does not create true live push into an already-running Codex turn; the improvement is lower-friction polling, not transport-level notification support.
- Decisions: Smoother Codex collaboration should come from a first-class checkpoint routine inside the MCP surface rather than from workspace-rule sprawl or hidden background automation.

### 2026-04-03 [agent: Codex][agent-stack-scaffold]
- Done: Ran `just check`, updated the bootstrap for the new operating-layer surface, scaffolded `/home/evo/workspace/_sandbox/agent-stack/` plus `/home/evo/workspace/_docs/agent-stack/`, added the `with-node20.sh` non-interactive Node launcher, and wrote the first governed docs for install notes, runbook, allowlist, role lenses, ticket flow, and budget rules.
- Next: Verify the current official install steps, install OpenFang first, prove one Hand wake -> execute -> report, then install Paperclip, onboard Evolution Stables, set the hard daily budget cap, and connect OpenFang as the single executor.
- Blocked: Non-interactive WSL shells still do not expose `node` or `pnpm` without loading `nvm`, so Node-based launches must go through the new wrapper until shell init is cleaned up.
- Decisions: Paperclip + OpenFang starts as a workspace-side sidecar, not a product-repo surface; Paperclip is the orchestration layer, OpenFang is the only executor in v1.0, and CEO/CTO-style roles remain lenses or queues rather than separate runtimes.

### 2026-04-03 [agent: Codex][agent-stack-install-pass]
- Done: Installed the latest currently installable OpenFang Linux tarball (`v0.5.6` asset; binary reports `openfang 0.5.5`) into `/home/evo/workspace/_sandbox/agent-stack/openfang/bin/`, verified `openfang start` boots on `127.0.0.1:4200`, documented the current CLI quirk where `init --config` still writes to `~/.openfang`, and redirected that path as a symlink back into `/home/evo/workspace/_sandbox/agent-stack/openfang/state`. Also onboarded Paperclip into `/home/evo/workspace/_sandbox/agent-stack/paperclip/data/` with local defaults, verified doctor checks passed, and confirmed the local UI responds on `127.0.0.1:3100`.
- Next: Create the first Paperclip company for Evolution Stables, set the first conservative budget cap, configure a working OpenFang LLM provider, then prove one bounded ticket end-to-end with OpenFang as the only executor.
- Blocked: The current OpenFang latest release (`v0.5.7`) has no published Linux binary assets, so the install had to fall back to the previous installable release. OpenFang also has no working LLM provider configured yet, and current Paperclip docs expose monthly budgets rather than a first-class daily cap.
- Decisions: Keep `/home/evo/.openfang` as a documented symlink only, not a source-of-truth directory; keep Paperclip state isolated under `_sandbox/agent-stack/paperclip/data`; and treat daily spend control as an operator rule layered on top of Paperclip's current monthly budget model until a better native control is available.

### 2026-04-03 [agent: Codex][agent-stack-openrouter-trial]
- Done: Rewired the OpenFang sidecar default model to the trial OpenRouter path `openrouter/qwen/qwen3.6-plus-preview:free`, added `/home/evo/workspace/_sandbox/agent-stack/openfang-trial.sh` to load `/home/evo/.env` before running the sidecar binary, updated the runbook and install notes to reflect the trial-only model choice, and annotated the legacy `audit-openfang-bridge` Justfile target as a pre-sidecar bridge rather than current operating-layer truth.
- Next: Add `OPENROUTER_API_KEY` to `/home/evo/.env`, verify OpenFang sees it through the new launcher, then prove the first bounded Hand run and Paperclip ticket handoff.
- Blocked: `OPENROUTER_API_KEY` is not currently present in the shared `/home/evo/.env`, so the trial model is wired but not yet executable.
- Decisions: Treat the OpenRouter Qwen preview model as a bootstrap trial only, not a locked long-term default; keep the old `audit-openfang-bridge` target dormant but documented until the new sidecar proves itself and a redirect or retirement decision can be made.

### 2026-04-03 [agent: Codex][agent-stack-openrouter-trial-hardening]
- Done: Tightened `openfang-trial.sh` so it still sources the shared `/home/evo/.env` but explicitly unsets other remote-provider keys afterward, preventing OpenFang from silently falling back to Anthropic or Groq when `OPENROUTER_API_KEY` is absent.
- Next: Add the OpenRouter key to the shared env, then verify the sidecar stays on the intended OpenRouter route during the first bounded Hand run.
- Blocked: Until `OPENROUTER_API_KEY` exists, the sidecar should remain intentionally blocked instead of quietly switching providers.
- Decisions: Trial wiring should fail closed, not drift to another vendor because a different key happens to be present in the shared env.

### 2026-04-03 [agent: Codex][agent-stack-openrouter-model-swap]
- Done: Swapped the OpenFang sidecar trial model from the preview path `openrouter/qwen/qwen3.6-plus-preview:free` to the requested stable path `openrouter/qwen/qwen3.6-plus:free` and updated the sidecar docs to match.
- Next: Add `OPENROUTER_API_KEY` to `/home/evo/.env`, then verify the first bounded Hand run against the new model ID.
- Blocked: `OPENROUTER_API_KEY` is still missing, so the sidecar remains correctly blocked on provider auth.
- Decisions: Prefer the non-preview `qwen/qwen3.6-plus:free` route over the preview variant for this bootstrap trial.

### 2026-04-03 [agent: Codex][control-plane-vault-reconcile]
- Done: Backed up `/home/evo/.env` and `/home/evo/.bashrc`, reconciled the legacy `~/.vault/*.env` files into the governed `/home/evo/.env` without exposing secret values, normalized the consolidated file back to Unix line endings, and replaced the live `.bashrc` vault shim with direct loading of `/home/evo/.env`. Verified interactive shells now see the expected keys and `just check` reports the central vault as healthy with `~17` keys.
- Next: Leave `~/.vault/` dormant as a backup surface for now, then decide in a later cleanup pass whether to archive or remove it once there is confidence that no remaining manual workflows depend on it.
- Blocked: None on the active env path; the remaining risk is only historical drift if someone manually starts sourcing `~/.vault/load.sh` again.
- Decisions: `/home/evo/.env` is now the active control-plane secret SSOT in practice as well as policy, and interactive shell startup should load that file directly instead of the older multi-file `~/.vault` loader.

### 2026-04-03 [agent: Codex][agent-stack-openrouter-live-proof]
- Done: Verified `OPENROUTER_API_KEY` is now present in `/home/evo/.env`, confirmed the sidecar daemon reports `Provider: openrouter` with model `openrouter/qwen/qwen3.6-plus:free`, activated the `researcher` hand, and proved live model-backed execution by sending direct messages through the active hand agent path. Updated the runbook to use `status` plus `hand active` as the first smoke-test checks and documented that the stock researcher prompt needs explicit bounded instructions during proof runs.
- Next: Tune or replace the stock researcher-hand prompt so bounded operational tasks return direct answers instead of clarification loops, then move on to the first Paperclip company setup and single-executor ticket handoff.
- Blocked: The current hand proof is functionally live but not yet ergonomically clean; the stock `researcher` hand persona is overly chatty for strict operator smoke tests.
- Decisions: Count the OpenRouter route and active-hand execution path as proven for bootstrap purposes, but do not treat the default hand prompt as production-ready without further tightening.

### 2026-04-03 [agent: Codex][agent-stack-zero-budget-trial]
- Done: Set the governed v1.0 trial budget policy to `0` in the agent-stack docs, explicitly limiting the stack to free-model routes only until the human raises the cap. Updated install notes so the first Paperclip company should be created with `budgetMonthlyCents = 0` to mirror the daily operator cap.
- Next: Recover or relaunch the local Paperclip server, create the first company record, stamp the monthly company budget to `0` cents, then connect OpenFang as the only executor.
- Blocked: The Paperclip app layer is not consistently answering right now, so the company-side zero-budget field has not yet been written into a live company object.
- Decisions: Zero spend is now the active operating rule for this bootstrap phase; any route that could incur non-zero model cost stays disabled until the board seat explicitly changes the cap.

### 2026-04-03 [agent: Codex][paperclip-detach-fix]
- Done: Verified that OpenFang was healthy while Paperclip was dying after bind when launched from a transient `wsl.exe` shell, isolated the failure to Paperclip session detachment rather than Windows localhost forwarding, added `/home/evo/workspace/_sandbox/agent-stack/paperclip-trial.sh`, and updated the agent-stack runbook/install notes so Paperclip now starts reliably through `setsid` plus `with-node20.sh`.
- Next: Use the new launcher for future restarts, then complete the first company-budget stamp and executor wiring inside Paperclip.
- Blocked: Paperclip still has no company or executor integration proof yet; this fix restores service stability only.
- Decisions: On this machine, Paperclip must be started as a detached session from the sidecar launcher surface rather than by plain `nohup` from a one-shot `wsl.exe` command.

### 2026-04-03 [agent: Codex][paperclip-codex-crlf-shim-fix]
- Done: Traced the Paperclip CEO failure `/usr/bin/env: 'bash\r': No such file or directory` to a CRLF-terminated Codex shim at `C:\Users\Evo\.codex\.sandbox-bin\codex`, updated `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh` to generate and prefer a Linux-safe sidecar shim under `.sandbox-bin-linux/`, normalized the Windows-side shim to LF, and revalidated Paperclip on `127.0.0.1:3100`.
- Next: Retry the failed CEO run and confirm the next Codex-backed task no longer dies before execution starts.
- Blocked: The Paperclip UI still needs a human retry on the already-failed run item; this pass fixed the runtime path, not the historical failed record.
- Decisions: Treat Windows-managed executable shims as untrusted for Linux execution unless they are normalized or wrapped by a workspace-side LF-safe shim.

### 2026-04-03 [agent: Codex][paperclip-git-path-hardening]
- Done: Confirmed the active FoundingEngineer Paperclip run is now launching Codex successfully, identified remaining non-blocking startup noise from `git` missing inside the Paperclip-launched PATH, and hardened `/home/evo/workspace/_sandbox/agent-stack/with-node20.sh` to generate a Linux-safe `git` shim alongside the existing `codex` shim while explicitly restoring standard Linux bin directories into PATH. Validated the wrapper with `with-node20.sh git --version`.
- Next: Let the next fresh Paperclip Codex run confirm the `git ls-remote` startup warning is gone, then decide whether the remote plugin-sync `403` noise is worth suppressing separately.
- Blocked: The currently running FoundingEngineer run started before the PATH hardening, so only subsequent runs will prove the warning is eliminated.
- Decisions: Treat Paperclip-launched Codex sessions as sanitized runtimes that should explicitly expose required core binaries rather than assuming the ambient shell PATH will survive intact.

### 2026-04-03 [agent: Codex][paperclip-founding-engineer-deliverable-split]
- Done: Recovered the actual `EVO-2` through `EVO-6` issue definitions from Paperclip run logs, split the monolithic Founding Engineer hiring packet into discrete issue-aligned deliverables under the project instance, and turned `FOUNDING_ENGINEER_HIRING_PACKET.md` into an index that links each artifact directly.
- Next: Mirror these files back into the live Paperclip issue comments or document surfaces if the board wants each ticket explicitly closed from the app layer instead of treating the filesystem outputs as the fulfillment surface.
- Blocked: This session can write the project workspace directly, but it does not yet have a clean low-noise Paperclip issue API workflow in place for updating `EVO-2` through `EVO-6` from the terminal without pulling more runtime plumbing into scope.
- Decisions: For this project instance, the fastest reliable delivery path is one file per staffed issue: scorecard, hiring brief, roadmap, backlog, and assessment rubric.

### 2026-04-03 [agent: Codex][paperclip-founding-engineer-operator-pack]
- Done: Added three operator-ready follow-on artifacts to the active Founding Engineer project bundle: `INTERVIEW_WORKSHEET.md` for live interview scoring, `CANDIDATE_ASSESSMENT_BRIEF.md` for the take-home task handoff, and `SOURCING_BRIEF.md` for candidate targeting and outreach filtering. Updated `FOUNDING_ENGINEER_HIRING_PACKET.md` so the packet now indexes both the issue-aligned deliverables and the execution-ready follow-ons, and registered the new markdown files in `DNA/ops/CONVENTIONS.md`.
- Next: If the board wants to operationalize hiring immediately, mirror these three follow-on artifacts into the relevant Paperclip comments or next child issues so interview, assessment, and sourcing work can be tracked in-app instead of only on disk.
- Blocked: There is still no clean Paperclip-side CLI workflow wired for low-noise issue comment or document updates from this terminal session, so the new artifacts currently exist as governed filesystem deliverables only.
- Decisions: The fastest useful continuation after the core hiring packet is not more strategy prose; it is founder-usable execution material that closes the gap between “we have the brief” and “we can run the hiring process this week.”

### 2026-04-03 [agent: Codex][paperclip-founding-engineer-runbook-and-outreach]
- Done: Added `HIRING_PROCESS_RUNBOOK.md` to turn the packet into a usable weekly execution loop and `OUTREACH_TEMPLATES.md` to give the founder warm-intro, direct outbound, follow-up, assessment, and pass-note copy. Updated `FOUNDING_ENGINEER_HIRING_PACKET.md` to index both artifacts and registered them in `DNA/ops/CONVENTIONS.md`.
- Next: If this work should move back into the app layer, mirror the runbook and templates into the relevant Paperclip issue comments or create a new follow-on hiring-ops issue for pipeline execution.
- Blocked: The current terminal flow still does not have a clean low-noise Paperclip comment-write path, so the new hiring-ops surfaces remain filesystem deliverables for now.
- Decisions: The next useful continuation after the operator pack is execution enablement: one runbook for the hiring loop and one reusable outbound-copy surface, rather than more abstract hiring strategy.

### 2026-04-03 [agent: Codex][paperclip-founding-engineer-delivery-status]
- Done: Added `DELIVERY_STATUS.md` to the active Founding Engineer project bundle as a single founder-facing closure surface covering shipped deliverables, usage order, immediate next actions, open blockers, and explicit decisions. Updated `FOUNDING_ENGINEER_HIRING_PACKET.md` to link it and registered the new markdown file in `DNA/ops/CONVENTIONS.md`.
- Next: If the board wants app-layer parity, mirror the delivery status summary into the relevant Paperclip issue comments or use it as the source text for closing notes inside `EVO-2` through `EVO-6`.
- Blocked: The same Paperclip writeback gap remains: there is still no clean low-noise terminal path here for syncing these closure notes directly into issue comments.
- Decisions: This project instance now has a single filesystem-native handoff surface that satisfies the workspace requirement to end with Done, Next, Blocked, and Decisions without adding more planning overhead.

### 2026-04-06 [agent: Codex][agent-stack-wsl-ollama-proof]
- Done: Rebuilt the local Ollama path as a WSL-only sidecar under `/home/evo/workspace/_sandbox/agent-stack/ollama`, moved the model store to `/home/evo/workspace/models/ollama`, proved `qwen3:14b` on the local API at `127.0.0.1:11434`, copied the bundled `lib/ollama` runtime tree so CUDA backends were present, verified full GPU offload on the RTX 3060, and removed the stray Windows installer processes plus `C:\Users\Evo\Downloads\OllamaSetup.exe`.
- Next: Re-cut OpenFang to the local Ollama route, scrub any persisted remote-provider or embedding state from the OpenFang sidecar, then prove one deterministic OpenFang prompt before reconnecting Paperclip.
- Blocked: OpenFang still carries historical state risk from earlier remote-provider experiments, so the later cutover must fail closed and explicitly verify no remote embedding auto-detect remains.
- Decisions: The sanctioned local inference truth for this stack is now WSL-only Ollama; Windows Ollama installers or runtime surfaces should stay absent, and binary-only manual installs are not sufficient because the sidecar also requires the bundled `lib/ollama` runtime tree for GPU support.

### 2026-04-06 [agent: Codex][agent-stack-openfang-manual-routes]
- Done: Re-checked WSL health after the earlier transient desktop error, confirmed Ubuntu is healthy again, added explicit OpenFang route configs for `local`, `openrouter`, and `groq`, and updated `openfang-trial.sh` so route selection is manual, visible, and rewrites the active `secrets.env` surface instead of inheriting hidden provider drift from the shared env.
- Next: Start with `local` as the default safe route, prove one deterministic OpenFang prompt on that route against WSL Ollama, then choose and test the intended hosted route before reconnecting Paperclip.
- Blocked: Paperclip executor reconnection and company budget setup are still pending, and the Telegram channel is currently disabled in practice because the route-managed secrets surface does not include `TELEGRAM_BOT_TOKEN`.
- Decisions: Provider choice stays human-in-the-loop for now. `local` must remain isolated, hosted routes must be selected deliberately, and automatic fallback is deferred until the sidecar earns enough trust.

### 2026-04-06 [agent: Codex][paperclip-founding-engineer-launch-kit]
- Done: Extended the active Founding Engineer Paperclip project bundle with `HIRING_LAUNCH_KIT.md`, `CANDIDATE_PIPELINE_TEMPLATE.csv`, and `TARGET_LIST_TEMPLATE.csv` so the founder can move from strategy into immediate execution. Updated `FOUNDING_ENGINEER_HIRING_PACKET.md` and `DELIVERY_STATUS.md` to include the new launch assets, and registered the new markdown file in `DNA/ops/CONVENTIONS.md`.
- Next: Use the launch kit to post the role, load the first 30 targets, send the first outbound batch, and only create new Paperclip issues if hiring execution needs to be tracked as separate in-app work.
- Blocked: The Paperclip terminal writeback gap remains, so these execution assets are still filesystem-native rather than mirrored into issue comments or a synced ATS surface.
- Decisions: The next useful increment for this Paperclip project is operational hiring infrastructure, not more planning docs; file-based trackers are the fastest honest path until app-side writeback is reliable.

### 2026-04-06 [agent: Codex][paperclip-runtime-truth-audit]
- Done: Verified the first Paperclip company (`Evolution Stables`) exists, confirmed `budgetMonthlyCents = 0`, checked the live agent roster, and found the current execution path still uses `adapterType: codex_local` for both `CEO` and `FoundingEngineer`. Updated the governed agent-stack docs so they no longer imply OpenFang is already the active Paperclip executor.
- Next: Decide whether to migrate the company agents to an OpenFang-backed adapter path or keep OpenFang as a separate sidecar proof surface while Paperclip continues to dispatch directly to Codex.
- Blocked: No validated Paperclip-side OpenFang adapter path has been proven in this workspace yet, and `wsl.exe` from this shell is intermittently failing, which makes restart-heavy cutover work noisy.
- Decisions: Documentation must reflect runtime truth. Zero-budget company setup is complete; OpenFang executor integration is not.

### 2026-04-06 [agent: Codex][paperclip-local-writeback-path]
- Done: Proved the local Paperclip server on `127.0.0.1:3100` accepts direct issue reads in `local_trusted` mode, added `/home/evo/workspace/_sandbox/agent-stack/paperclip-issue-writeback.ps1` as a low-noise PowerShell wrapper for `issue-get`, `issue-comment`, and `issue-update`, used it to mirror a founder-facing delivery extension comment back into `EVO-1`, and updated the Founding Engineer handoff plus agent-stack runbook to reflect the now-working writeback path.
- Next: Reuse the same wrapper for future issue close-outs and, if needed, extend it later for document sync instead of falling back to manual UI copy-paste.
- Blocked: This writeback path is valid for the current localhost private instance only; if Paperclip exposure or auth mode changes, the wrapper must be revisited rather than assumed safe.
- Decisions: For this sidecar phase, direct localhost HTTP calls are the honest terminal writeback surface for local-trusted Paperclip instances when WSL CLI execution is noisy.

### 2026-04-06 [agent: Codex][marketplace-phased-execution-plan]
- Done: Consolidated the Evolution Stables marketplace planning lineage from `v2.3`, `v2.4`, and `v2.5` into `/home/evo/workspace/_docs/agent-stack/MARKETPLACE_PHASED_EXECUTION_PLAN_2026-04-06.md`, preserving the full product scope while separating live sandbox truth, immediate Phase 0 work, later build phases, and parked target-state architecture. Updated the agent-stack README and registered the new markdown file in `DNA/ops/CONVENTIONS.md`.
- Next: Use the phased execution plan alongside the Phase 0 readiness checklist to decide the exact active role set and the first bounded marketplace artifacts before creating more Paperclip agents or tickets.
- Blocked: The Paperclip UI still exposes run logs and issue shells more clearly than final deliverables, so human review remains necessary to keep planning work from drifting into tooling archaeology.
- Decisions: The marketplace planning surface should keep the full North Star visible, but execution decisions should now be made against phased steps rather than against a single blended strategy document.

### 2026-04-06 [agent: Codex][phase0-paperclip-operator-pack]
- Done: Converted the marketplace plan into an operator-ready Phase 0 Paperclip pack at `/home/evo/workspace/_docs/agent-stack/PHASE0_PAPERCLIP_OPERATOR_PACK_2026-04-06.md`, including the exact active role set (`CEO`, `ExecutionWorker`, `VerificationWorker`), loading order, reporting structure, first bounded ticket queue, and what to pause or park. Added companion instruction drafts for `CEO`, `ExecutionWorker`, and `VerificationWorker`, updated the agent-stack README, and registered all new markdown files in `DNA/ops/CONVENTIONS.md`.
- Next: Load or align the Paperclip company to the approved minimum role set, pause `HeadHunter` unless still needed for role-definition work, then use the first bounded queue from the operator pack instead of continuing to invent roles inside the UI.
- Blocked: This session can prepare the exact content and terminal-side support surfaces, but the Paperclip UI still requires human clicks for agent creation, pausing, renaming, and queue loading unless a broader local API workflow is explicitly added.
- Decisions: Phase 0 should now be run from a three-role execution model rather than from the wider North Star org. Paperclip should execute bounded roles and tickets, not continue designing the operating system by itself.

### 2026-04-07 [agent: Codex][wsl-link-handler]
- Done: Added Windows-side startup-governed scripts at `C:\evo\startup\bin\Open-EvoWslLink.ps1` and `C:\evo\startup\bin\Install-EvoWslLinkProtocol.ps1`, registered the `evo-wsl://` custom protocol, and proved the handler can target `/home/evo/workspace/_docs/agent-stack/MARKETPLACE_PHASED_EXECUTION_PLAN_2026-04-06.md` through the VS Code WSL remote URI path instead of the broken blank-buffer handoff.
- Next: Use `evo-wsl://open?path=/home/evo/workspace/...` as the reliable clickable route for workspace files until the native Codex desktop WSL file-link bug is fixed upstream.
- Blocked: The built-in absolute file-link behavior in the current desktop path still misroutes WSL targets on Windows, so native `/home/...` click handling remains unreliable.
- Decisions: Machine-level file-click behavior for WSL workspace paths is now managed through the startup source of truth under `C:\evo\startup`, not by ad hoc per-session path formatting.

## Context Chain
← inherits from: /home/evo/workspace/DNA/AGENTS.md
→ overrides by: none
→ live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
→ conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md

### 2026-04-07 [agent: Codex][paperclip-founding-engineer-writeback-sync]
- Done: Re-read the required workspace context chain, verified EVO-2 through EVO-6 are status done, posted delivery-extension comments to each issue via localhost Paperclip API (/api/issues/{id}/comments), and updated the project-level DELIVERY_STATUS.md to reflect the completed in-app writeback.
- Next: If requested, post one parent-level closure comment on EVO-1 summarizing that all child issue deliverables plus operator follow-ons are now mirrored in-app and filesystem.
- Blocked: The local PowerShell execution policy blocks direct execution of unsigned UNC-path scripts, so the wrapper script path was bypassed in favor of direct REST calls.
- Decisions: For this local-trusted instance, direct localhost API calls are an acceptable execution fallback when script-signing policy blocks the wrapper invocation.

### 2026-04-08 [agent: Codex][marketplace-v0-sprint-close]
- Done: Re-read the required workspace context chain, confirmed `just check` is GREEN, republished the SSOT marketplace payload into both `projects/SSOT_Build/data/published/marketplace-v0.json` and `projects/Evolution_Platform/src/data/marketplace-listings.generated.json`, hardened `projects/SSOT_Build/scripts/publish-marketplace-v0.mjs` so the actual generated image set plus `silhouette.svg` are copied into the platform output, verified `npm run build` passes in both `SSOT_Build` and `Evolution_Platform`, and smoke-checked `/marketplace`, `/marketplace/first-gear`, and `/mystable` locally on `127.0.0.1:3001`.
- Next: If the operator wants broader publishing hygiene, add a lightweight documented release step so marketplace payload publish is always run intentionally before staging or deployment.
- Blocked: Founder-visible manual ops capture still depends on the configured `GOOGLE_SHEETS_WEB_APP_URL` path in `Evolution_Platform`; this session verified the app path and build health, not a live write into the external sheet.
- Decisions: Treat the generated marketplace JSON as the deployable platform input and keep SSOT as the authoring surface; the SSOT publisher must carry fallback assets so new live listings do not silently ship with broken hero images.

### 2026-04-08 [agent: Codex][marketplace-manual-ops-inbox]
- Done: Hardened `projects/Evolution_Platform/src/app/api/interest/route.ts` so marketplace submissions are validated server-side against the live generated listing payload, issue a submission reference, save into a founder-visible local manual ops inbox, and use Google Sheets as an optional mirror rather than a hard dependency for the marketplace path. Added the noindex founder route at `projects/Evolution_Platform/src/app/marketplace/manual-ops/`, surfaced submission references and delivery warnings in the investor form, added an empty-state on the marketplace index, updated the local env/readme/gitignore support for the inbox path, reran `npm run build` for `Evolution_Platform`, reran `just check`, and smoke-tested `/marketplace`, `/marketplace/first-gear`, `/marketplace/manual-ops`, a valid marketplace POST, and a tampered marketplace POST locally with `GOOGLE_SHEETS_WEB_APP_URL` disabled.
- Next: If this flow is promoted beyond v0.0, decide whether the manual ops inbox should remain local-file based or move to a more durable governed store while keeping the current route contract stable.
- Blocked: This session proved the local inbox path and validation guardrails, but it did not execute a live mirrored write into the external Google Sheets web app.
- Decisions: For marketplace v0.0, founder-visible manual ops capture is now local-first inside `Evolution_Platform` with Google Sheets treated as a mirror when configured; generic non-marketplace lead capture remains fail-closed when the Google Sheets endpoint is absent.

### 2026-04-08 [agent: Codex][marketplace-live-vs-staging-split]
- Done: Restored the pre-sprint public `Marketplace` and `MyStable` experiences inside `Evolution_Platform` as the default `live` surface, moved the new listing/detail/manual-ops workflow behind the env-controlled `MARKETPLACE_RELEASE_STAGE=staging` gate, blocked `/marketplace/[slug]`, `/marketplace/manual-ops`, and marketplace application POSTs when the app is running in `live` mode, updated metadata and README/env docs accordingly, and verified `npm run build` passes in both default `live` mode and explicit `staging` mode.
- Next: Set the deployment env explicitly per target so production stays on `MARKETPLACE_RELEASE_STAGE=live` and the review environment runs `MARKETPLACE_RELEASE_STAGE=staging`.
- Blocked: None in repo; the remaining work is deployment-side env assignment and whatever branch or host naming the operator wants for staging.
- Decisions: Treat the pre-existing public experience as the production-safe default and use env-gated staging to preview the new marketplace workflow until it is explicitly approved for promotion.

### 2026-04-08 [agent: Codex][racing-weekly-101-starter-pack]
- Done: Added the first tracked `Racing Weekly 101` starter docs under `/home/evo/workspace/_docs/openfang-wizard/`: a simple topic backlog note and a short reusable Fang prompt. Locked the first two weekly topics to `Track Conditions / Track Ratings` and `Barrier Draw`, and registered both new markdown files in `DNA/ops/CONVENTIONS.md`.
- Next: Use the new prompt to draft the first short-form `Track Conditions / Track Ratings` issue, then move that topic into `Done` once the first weekly piece is approved and shipped.
- Blocked: None for the manual v1 workflow; reminders, queue automation, and Telegram handling remain intentionally deferred.
- Decisions: `Racing Weekly 101` starts as a manual, human-triggered workflow. Markdown under `_docs/openfang-wizard/` is the control surface, not `docx`, bots, or scheduled automation.

### 2026-04-08 [agent: Codex][racing-weekly-101-track-conditions-mvp]
- Done: Created the first full `Racing Weekly 101` MVP at `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-track-conditions-2026-04-08.md`, covering the `Track Conditions / Track Ratings` topic with a short-form social-ready pack: hook, explanation, why-it-matters section, caption, short email version, five carousel slides, simple visual direction, and a structured JSON block for future reuse.
- Next: Review the wording for final brand voice, manually lay out the carousel in Canva, and if the piece is posted, move `Track Conditions / Track Ratings` into `Done` in the topic backlog while keeping `Barrier Draw` as the next queued topic.
- Blocked: None; this MVP is intentionally manual and does not depend on the HTML generator, reminders, or automation.
- Decisions: The first live `Racing Weekly 101` issue should stay concise and generic, using the approved fact set without introducing unsupported horse-specific examples.

### 2026-04-08 [agent: Codex][production-studio-hand-v0]
- Done: Added a new tracked `production-studio` hand template under `/home/evo/workspace/_docs/openfang-wizard/hands/production-studio/`, positioned it as a read-only v0.0 packaging assistant for manual-ready content outputs, updated the wizard README to include it in the current operating model, mirrored the hand into `~/.openfang/hands/production-studio/`, and installed it into the runtime. The new hand takes its styling lead from the existing `Evolution_Platform` investor update surfaces and defaults to producing a heading, subheading, caption, 4 to 8 square slides, and simple visual direction notes.
- Next: Use the existing `Racing Weekly 101` track-conditions pack as the first real production-studio test input, then tighten the output structure based on what is actually useful in Canva and manual publishing.
- Blocked: `openfang hand info production-studio` resolves correctly after install, but `openfang hand list` did not show the new hand in this shell, which looks like a local CLI listing quirk rather than a missing install.
- Decisions: The production studio starts narrow and packaging-focused rather than trying to become a full publishing system. Existing investor update styling in `Evolution_Platform` is the reference baseline for v0.0.

### 2026-04-08 [agent: Codex][production-studio-track-conditions-pack]
- Done: Used the new `production-studio` pattern against the approved `Racing Weekly 101` track-conditions source and created the first manual-ready square-slide pack at `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-track-conditions-production-pack-2026-04-08.md`. The pack includes a heading, subheading, caption, six `1:1` carousel slides, investor-update-led visual direction, and Canva build notes.
- Next: Build the carousel from this pack in Canva, note what was missing or awkward during layout, and use those lessons to refine the `production-studio` hand before the next topic.
- Blocked: None for v0.0; the pack is complete enough for manual production and intentionally does not depend on downstream automation.
- Decisions: The first production-studio output stays concise, square-slide-first, and copy-led. The investor update system in `Evolution_Platform` remains the styling reference, but the output shape is adapted for social education rather than investor email.

### 2026-04-08 [agent: Codex][production-studio-track-conditions-html-deck]
- Done: Converted the track-conditions production pack into a slide-style HTML deck at `/home/evo/workspace/_docs/openfang-wizard/racing-weekly-101-track-conditions-slides-2026-04-08.html`, using a square-slide, PDF-friendly layout with black/white/gold styling and investor-update-inspired typography hierarchy.
- Next: Open the HTML locally, review the slide rhythm in a browser, and export it to PDF if the layout feels right. If needed, tighten any slide that feels too wordy once seen in the real rendered format.
- Blocked: The local browser-preview automation path did not cooperate with the `file://` target in this shell, so the deck was verified structurally on disk rather than through an automated visual pass.
- Decisions: The first HTML deck stays self-contained and presentation-first, giving the production workflow a PDF-ready review artifact before any Canva-specific adaptation.

### 2026-04-08 [agent: Codex][track-conditions-report-output]
- Done: Added a cleaner report-style presentation output under `/home/evo/workspace/_docs/presentations/racing_weekly_101_track_conditions_report_2026-04-08/`, including a folder README and an `index.html` handoff page. The new report reframes the artifact around the purpose of the week's content, two short explanatory sections, and a proposed carousel structure rather than a full slide deck.
- Next: Use this report-style output as the review artifact, and only move into Canva or a more visual slide layout once the report framing and proposed carousel bullets feel right.
- Blocked: None; the report-style output is self-contained and ready for browser viewing or PDF export.
- Decisions: Working inputs and production packs stay in `_docs/openfang-wizard/`, while polished presentation-style review outputs now live in `_docs/presentations/` as a separate surface.

### 2026-04-08 [agent: Codex][presentations-aggregator-folders]
- Done: Reorganized `_docs/presentations/` into general aggregator folders so outputs can accumulate by stream rather than as one-off sibling folders. Created `/home/evo/workspace/_docs/presentations/racing_weekly_101/` and `/home/evo/workspace/_docs/presentations/tokinvest/`, moved the existing Racing Weekly 101 report and Tokinvest owner deck into those homes, added aggregator READMEs, updated presentation references, and refined the Racing Weekly 101 report HTML to feel more premium.
- Next: Add future polished outputs under the relevant aggregator folder, keeping `_docs/openfang-wizard/` for working material and `_docs/presentations/` for review-ready artifacts.
- Blocked: None; the new structure is in place and ready to extend.
- Decisions: Aggregator folders are now the preferred pattern under `_docs/presentations/`. Use stream-level homes such as `racing_weekly_101/` and `tokinvest/`, then dated subfolders beneath them for each output.

### 2026-04-08 [agent: Codex][openfang-openrouter-qwen36-plus-paid-smoke]
- Done: Switched the governed OpenFang OpenRouter route onto paid `qwen/qwen3.6-plus`, confirmed the daemon boots cleanly on `openrouter/qwen/qwen3.6-plus`, and ran a bounded smoke set against the provider: one exact-response ping plus four review-style prompts focused on today's Evolution marketplace work. The useful audit targets were the `live` vs `staging` release split, the marketplace interest validation route, workflow fit against Sprint `v0.0`, and the highest-value missing tests. With OpenRouter reasoning disabled (`reasoning: { effort: "none", exclude: true }`), all prompts completed cleanly, total spend stayed low, and no rate-limit behavior was hit during the test window. Restarted the daemon afterward to clear a transient crashed assistant process and re-verified all four default agents running on the paid route.
- Next: Treat paid `qwen/qwen3.6-plus` as a deliberate hosted review and audit lane, keep prompts narrow and evidence-led, and prefer the reasoning-disabled shape for day-to-day bounded checks unless a slower deep-think pass is explicitly needed.
- Blocked: Large code-dump prompts with reasoning enabled were too slow to be a practical default review pattern and can exceed a 60-second curl window.
- Decisions: OpenFang's governed OpenRouter route now targets paid `qwen/qwen3.6-plus` instead of the deprecated `:free` variant. Local providers remain the daily default; paid OpenRouter is the bounded second-pass reviewer.

### 2026-04-08 [agent: Codex][openfang-route-surface-qwen-nemotron]
- Done: Extended the governed OpenFang launcher so route selection can target explicit model-named hosted lanes: `openrouter-qwen` for paid `qwen/qwen3.6-plus` and `openrouter-nemotron` for free `nvidia/nemotron-3-super-120b-a12b:free`, while keeping legacy `openrouter` as a backward-compatible alias to the paid Qwen lane. Added dedicated route files for both hosted models, updated the sidecar runbook with the new commands and route intent, booted OpenFang successfully on the Nemotron free route, and then restored the active runtime to `local` with a clean `ollama/qwen3.5:latest` boot so the daily default is safe again.
- Next: Use `openrouter-qwen` for bounded second-pass review, `openrouter-nemotron` as the free backup reviewer, and keep `local` as the first-choice route for regular daily work.
- Blocked: Nemotron free is callable and boots cleanly, but it did not obey an exact-response micro-prompt precisely, so it should be treated as a review lane rather than a precision control surface.
- Decisions: Route names should describe model intent, not just provider. `local` remains the active default route after hosted smoke tests complete.

### 2026-04-08 [agent: Codex][openfang-route-surface-glm]
- Done: Added `openrouter-glm` as a first-class hosted OpenFang route for paid `z-ai/glm-5.1`, updated the launcher usage surface and runbook to include it, booted OpenFang successfully on `openrouter/z-ai/glm-5.1`, and verified a direct OpenRouter API call returns `200` through the current provider path. Restored the active runtime to `local` afterward and re-booted cleanly on `ollama/qwen3.5:latest`.
- Next: Use `openrouter-glm` as an experimental paid coding and review lane when you want to A/B it directly against `openrouter-qwen`.
- Blocked: The direct exact-response micro-prompt returned `200` but no text content body, so `GLM-5.1` is wired and reachable, though it still needs a more realistic bounded prompt test before trusting it as a precision control surface.
- Decisions: `GLM-5.1` is now part of the governed hosted route set, but it remains experimental rather than replacing the proven paid Qwen lane.

### 2026-04-08 [agent: Codex][local-specialist-models-deepseek-granite]
- Done: Pulled `deepseek-coder-v2:16b` and `granite4:7b-a1b-h` into the local Ollama store, confirmed both appear in `ollama list`, and added governed OpenFang route aliases `local-debug` and `local-audit` to target them without replacing the default `local` route. Updated the sidecar runbook to document the new local specialist lanes. Smoke-tested both models directly through the local Ollama API: Granite returned `AUDIT_OK` quickly, and DeepSeek returned `DEBUG_OK` after a slower first load consistent with a larger 16B local model on the RTX 3060 12GB setup.
- Next: Use `local-debug` when `qwen3.5` is looping on logic tracing, and use `local-audit` for stricter low-fluff review or compliance-style checks.
- Blocked: No blocker on installation; only the expected tradeoff that DeepSeek has noticeably slower first-token/load behavior than Granite and the smaller daily-default local models.
- Decisions: Skip a local Mistral long-context addition for now. Keep the local specialist expansion focused on one debugger lane and one audit lane that fit the current GPU comfortably.

### 2026-04-09 [agent: Codex][paperclip-retirement-hermes-reserve]
- Done: Updated the live bootstrap, stack registry, tech radar, and `agent-stack` docs so they no longer treat Paperclip as an active surface, added `/home/evo/workspace/DNA/roles/README.md` as the reserved home for future Hermes-facing role definitions, archived about `660M` of Paperclip runtime and pinned-runtime footprint plus the Paperclip operator docs, launchers, temp helpers, duplicate `_sandbox/openfang-wizard/` surface, and Paperclip-era OpenFang/Gemini runtime traces into `/home/evo/_archive/agent-stack/2026-04-09/`, and cleaned the live Node wrapper plus Gemini sandbox project map so the active sidecar no longer routes or remembers Paperclip.
- Next: Run a dedicated Hermes onboarding pass to define workspace context loading, role/profile boundaries, and the Hermes -> DNA -> OpenFang handoff contract.
- Blocked: Hermes itself remains intentionally uninstalled and unadopted in this pass.
- Decisions: Paperclip is retired from the live workspace surface. OpenFang + Ollama remain the active bounded sidecar, and Hermes is the designated next personal layer once the onboarding pass is approved.

### 2026-04-09 [agent: Codex][hermes-onboarding-pass-v1]
- Done: Installed Hermes into `/home/evo/.hermes/hermes-agent` with a user-space Python environment, added `/home/evo/.hermes/config.yaml` for local Ollama `qwen3.5:latest`, added `/home/evo/.hermes/SOUL.md` as the durable personality layer, created `/home/evo/.local/bin/hermes` plus the workspace launcher `/home/evo/workspace/_scripts/hermesc.sh`, added `just hermes`, created the tracked runbook at `/home/evo/workspace/_docs/hermes/README.md`, and updated the live bootstrap, stack, tech radar, roles reserve, and agent-stack docs so Hermes is active as the personal layer while OpenFang remains the bounded execution surface.
- Next: Use Hermes on real workspace tasks, decide whether hosted provider switching is worth enabling after some local-first usage, and define the first stable Hermes profile only once repeated work patterns are obvious.
- Blocked: Browser-heavy Hermes tooling is not fully provisioned because Playwright system dependencies requested sudo during install. The chat and terminal path is active; browser tooling remains deferred.
- Decisions: Hermes is now the live personal assistant layer. Launch it from the workspace root, keep DNA canonical, and require explicit human approval before handing work into OpenFang.

### 2026-04-09 [agent: Codex][docs-root-legacy-cleanup-google-grouping]
- Done: Created `/home/evo/_archive/docs-legacy/2026-04-09/` with a `MANIFEST.md`, grouped the surviving Google support notes under `/home/evo/workspace/_docs/google/`, updated their paths and context metadata, and rewired the active merge, audit, Hermes review, and conventions surfaces so they no longer assume the old loose root-level layout.
- Next: Decide later whether `_docs/MERGE_PLAN_2026-03-10.md` also graduates out of the active root into a dedicated merge-history or legacy surface once it is no longer a working reference.
- Blocked: None in repo; this pass was structural only.
- Decisions: Legacy root docs that compete with the live bootstrap should move out of the active workspace surface, while still-useful Google notes can stay in the workspace when they are clearly grouped and marked non-canonical.
