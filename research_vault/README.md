# Research Vault

This vault is a tracked sidecar research layer for knowledge capture, tagging, and role-based review.

It is not part of the governed DNA operating system.

## v0.1 Structure (Karpathy LLM Wiki Pattern)

- `raw/` — immutable source documents. AI reads, never modifies.
  - `raw/inbox/` — fresh captures waiting to be ingested
  - `raw/sources/` — curated source notes (websites, socials, publications)
  - `raw/bootstrap/` — workspace docs used to seed the wiki
- `wiki/` — AI-generated knowledge base. Append-only, never overwritten.
  - `wiki/entities/` — people, companies, brands, projects, regulators
  - `wiki/topics/` — cross-cutting themes (tokenization, regulation, competitors)
  - `wiki/reviews/` — role-based filters and review queues
  - `wiki/reports/` — readable current reports
  - `wiki/promoted/` — research outputs promoted upward
  - `wiki/_templates/` — note templates
- `index.md` — master catalog of all wiki pages
- `log.md` — append-only record of all ingest, query, and lint operations
- `AGENT.md` — the vault's operating system (brain's constitution)

## Commands

- `just vault-ingest raw/<source>` — ingest a raw source into the wiki
- `just vault-lint` — health-check the wiki
- `just vault-search "query"` — search the vault
- `just vault-status` — show vault stats
- `just vault-push` — sync to Windows Obsidian mirror

## Use it for:
- normalized notes from crawls, socials, articles, and manual captures
- linked research around companies, people, topics, and timelines
- C-suite review notes that turn noise into signal

## Do not use it for:
- live operating rules
- architecture decisions
- stack locks
- transition or handoff truth

Start in [[HOME]].

## Context Chain
<- inherits from: /home/evo/workspace/AGENTS.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
