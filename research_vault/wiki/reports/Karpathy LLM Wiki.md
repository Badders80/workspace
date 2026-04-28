---
aliases:
  - LLM Wiki
  - Karpathy Wiki
tags:
  - knowledge-management
  - llm
  - wiki
created: 2026-04-24
updated: 2026-04-24
sources:
  - raw/karpathy-llm-wiki.md#L1-L75
confidence: 0.9
---

# Karpathy LLM Wiki

A pattern for building personal knowledge bases using LLMs, proposed by Andrej Karpathy. The core idea: instead of RAG (retrieving raw chunks on every query), the LLM incrementally builds and maintains a persistent wiki — a structured, interlinked collection of markdown files that sits between the user and raw sources.

## Core Architecture (3 Layers)

1. **Raw Sources** — immutable input documents (articles, PDFs, transcripts). The LLM reads but never modifies.
2. **The Wiki** — LLM-generated markdown files: summaries, entity pages, concept pages, comparisons. The LLM owns this layer entirely.
3. **The Schema** — a document (e.g., `CLAUDE.md` or `AGENT.md`) that tells the LLM how the wiki is structured, what conventions to follow, and what workflows to use.

## Key Operations

- **Ingest** — drop a new source into raw/, tell the LLM to process it. The LLM reads, extracts key ideas, creates/updates wiki pages, adds backlinks, updates the index, and appends to the log.
- **Query** — ask questions against the wiki. The LLM searches relevant pages, reads them, and synthesizes an answer with citations. Valuable answers get filed back into the wiki as new pages.
- **Lint** — periodic health-check: contradictions, stale claims, orphan pages, missing cross-references, data gaps.

## Indexing and Logging

- `index.md` — content-oriented catalog of all wiki pages with one-line summaries.
- `log.md` — chronological, append-only record of ingests, queries, and lint passes.

## Why It Works

The tedious part of maintaining a knowledge base is bookkeeping — updating cross-references, keeping summaries current, noting contradictions. Humans abandon wikis because maintenance burden grows faster than value. LLMs don't get bored and can touch 15 files in one pass.

## Criticisms and Responses

- **Hallucination risk** — LLM-generated prose can drift from source truth. Mitigation: immutable pages, strict provenance, confidence scoring, human audit.
- **Scale limits** — `index.md` approach breaks at ~100–500 pages. Mitigation: add `qmd` or embedding-based search at scale.
- **No version history** — Mitigation: the wiki is a git repo; every edit is tracked.

## Related Concepts

- [[wiki/topics/Knowledge Management]]
- [[wiki/entities/Andrej Karpathy]]
- [[wiki/topics/RAG vs Wiki]]
- [[wiki/topics/Zettelkasten]]

## Source

[^source: raw/karpathy-llm-wiki.md#L1-L75]

Updated: 2026-04-24
Changed files: wiki/reports/Karpathy LLM Wiki.md
