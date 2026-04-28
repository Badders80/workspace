#!/usr/bin/env python3
"""
vault-search.py — Lightweight v0.1 search for the research vault.
Replaces qmd until v0.2. Uses simple grep + file listing.
Usage: python3 vault-search.py <query>
"""

import sys, os, re, glob

VAULT = "/home/evo/workspace/research_vault"

def search(query):
    terms = query.lower().split()
    results = []
    for root, dirs, files in os.walk(VAULT):
        # Skip .obsidian and hidden dirs
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for f in files:
            if not f.endswith('.md'):
                continue
            path = os.path.join(root, f)
            rel = os.path.relpath(path, VAULT)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read()
                    score = sum(1 for t in terms if t in content.lower())
                    if score > 0:
                        # Extract first matching line
                        lines = content.split('\n')
                        preview = ''
                        for line in lines:
                            if any(t in line.lower() for t in terms):
                                preview = line.strip()[:120]
                                break
                        results.append((score, rel, preview))
            except Exception:
                pass
    results.sort(key=lambda x: (-x[0], x[1]))
    return results[:20]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 vault-search.py \u003cquery\u003e")
        sys.exit(1)
    query = ' '.join(sys.argv[1:])
    print(f"=== Vault Search: '{query}' ===\n")
    for score, rel, preview in search(query):
        print(f"[{score}] {rel}")
        if preview:
            print(f"    {preview}")
        print()
