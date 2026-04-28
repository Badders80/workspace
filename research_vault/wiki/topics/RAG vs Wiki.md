---
aliases:
  - RAG
tags:
  - methodology
  - retrieval
  - llm
created: 2026-04-24
updated: 2026-04-24
sources:
  - raw/karpathy-llm-wiki.md
confidence: 0.7
---

# RAG vs Wiki

Comparison of Retrieval-Augmented Generation (RAG) and the LLM Wiki pattern.

## RAG

- Index raw documents, retrieve chunks at query time
- No accumulation between sessions
- LLM rediscovers knowledge from scratch on every question
- Works well for ad-hoc queries

## LLM Wiki

- LLM incrementally builds persistent wiki
- Knowledge compounds with every source
- Cross-references already exist
- Synthesis reflects everything read
- Better for deep, ongoing research

## When to Use Which

- **RAG** — quick answers, one-off questions, large document sets
- **Wiki** — accumulating knowledge, connecting ideas, long-term research

## Related

- [[wiki/reports/Karpathy LLM Wiki]]
- [[wiki/topics/Knowledge Management]]

## Source

[^source: raw/karpathy-llm-wiki.md]

Updated: 2026-04-24
Changed files: wiki/topics/RAG vs Wiki.md
