#!/usr/bin/env python3
"""
vault-lint.py — Health-check the research vault wiki
Usage: python3 vault-lint.py
"""

import os, re, sys
from datetime import datetime, timedelta

VAULT = "/home/evo/workspace/research_vault"
WIKI = os.path.join(VAULT, "wiki")
TIMESTAMP = datetime.utcnow().strftime("%Y-%m-%d")

def get_wiki_pages():
    pages = []
    for root, dirs, files in os.walk(WIKI):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for f in files:
            if f.endswith('.md'):
                pages.append(os.path.join(root, f))
    return pages

def get_raw_sources():
    sources = []
    for root, dirs, files in os.walk(os.path.join(VAULT, "raw")):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for f in files:
            if f.endswith('.md'):
                sources.append(os.path.join(root, f))
    return sources

def extract_wikilinks(content):
    # Match [[Target]] or [[Target|Alias]]
    return re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', content)

def check_orphans(pages):
    """Find pages with no inbound links."""
    page_map = {os.path.basename(p).replace('.md', ''): p for p in pages}
    linked = set()
    for page in pages:
        with open(page, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        for link in extract_wikilinks(content):
            # link may be "wiki/entities/Name" or just "Name"
            basename = os.path.basename(link).replace('.md', '')
            if basename in page_map:
                linked.add(basename)
    orphans = []
    for basename, path in page_map.items():
        if basename not in linked:
            orphans.append(os.path.relpath(path, VAULT))
    return orphans

def check_broken_links(pages):
    """Find wikilinks that don't point to existing pages."""
    # Build map of all valid targets (wiki + raw)
    all_targets = {}
    for p in pages:
        basename = os.path.basename(p).replace('.md', '')
        all_targets[basename] = p
        rel = os.path.relpath(p, VAULT)
        all_targets[rel.replace('.md', '')] = p
    # Also index raw/ files
    for root, dirs, files in os.walk(os.path.join(VAULT, "raw")):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for f in files:
            if f.endswith('.md'):
                p = os.path.join(root, f)
                basename = f.replace('.md', '')
                all_targets[basename] = p
                rel = os.path.relpath(p, VAULT)
                all_targets[rel.replace('.md', '')] = p
    
    broken = []
    for page in pages:
        with open(page, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        for link in extract_wikilinks(content):
            target = link.strip()
            basename = os.path.basename(target).replace('.md', '')
            if basename not in all_targets and target not in all_targets:
                rel = os.path.relpath(page, VAULT)
                broken.append((target, rel))
    return broken

def check_uncited(pages):
    """Find pages with paragraphs lacking source citations."""
    flagged = []
    for page in pages:
        with open(page, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        
        uncited = 0
        in_frontmatter = False
        in_code = False
        for line in lines:
            stripped = line.strip()
            if stripped == '---':
                in_frontmatter = not in_frontmatter
                continue
            if in_frontmatter:
                continue
            if stripped.startswith('```'):
                in_code = not in_code
                continue
            if in_code:
                continue
            # Skip structural elements
            if stripped.startswith('#') or stripped.startswith('>') or stripped.startswith('|'):
                continue
            if not stripped:
                continue
            # Check if line has a citation
            if '[^source' not in line and '[^' not in line:
                uncited += 1
        
        if uncited > 5:
            rel = os.path.relpath(page, VAULT)
            flagged.append((rel, uncited))
    return flagged

def check_stale(pages):
    """Find pages older than 30 days."""
    cutoff = datetime.now() - timedelta(days=30)
    stale = []
    for page in pages:
        mtime = datetime.fromtimestamp(os.path.getmtime(page))
        if mtime < cutoff:
            rel = os.path.relpath(page, VAULT)
            stale.append(rel)
    return stale

def check_frontmatter(pages):
    """Find pages missing YAML frontmatter."""
    missing = []
    for page in pages:
        with open(page, 'r', encoding='utf-8', errors='ignore') as f:
            first = f.readline().strip()
        if first != '---':
            rel = os.path.relpath(page, VAULT)
            missing.append(rel)
    return missing

def main():
    pages = get_wiki_pages()
    sources = get_raw_sources()
    
    print(f"=== Vault Lint: {TIMESTAMP} ===")
    print()
    print(f"Wiki pages: {len(pages)}")
    print(f"Raw sources: {len(sources)}")
    print()
    
    # Orphans
    print("--- Orphan Pages ---")
    orphans = check_orphans(pages)
    for o in orphans:
        print(f"  🟡 orphan: {o}")
    if not orphans:
        print("  ✅ none")
    print()
    
    # Broken links
    print("--- Broken Wikilinks ---")
    broken = check_broken_links(pages)
    for target, page in broken:
        print(f"  🔴 broken: [[{target}]] in {page}")
    if not broken:
        print("  ✅ none")
    print()
    
    # Uncited claims
    print("--- Uncited Claims ---")
    uncited = check_uncited(pages)
    for rel, count in uncited:
        print(f"  🟡 uncited: {rel} ({count} lines without citations)")
    if not uncited:
        print("  ✅ none")
    print()
    
    # Stale pages
    print("--- Stale Pages (>30 days) ---")
    stale = check_stale(pages)
    for s in stale:
        print(f"  🟡 stale: {s}")
    if not stale:
        print("  ✅ none")
    print()
    
    # Missing frontmatter
    print("--- Missing Frontmatter ---")
    missing = check_frontmatter(pages)
    for m in missing:
        print(f"  🟡 no-frontmatter: {m}")
    if not missing:
        print("  ✅ none")
    print()
    
    # Summary
    print("--- Lint Summary ---")
    issues = len(orphans) + len(broken) + len(uncited) + len(stale) + len(missing)
    if issues == 0:
        print("✅ All checks passed")
    else:
        print(f"⚠️  {issues} issue(s) found")
    print()
    print("Run 'just vault-ingest <source>' to add more sources.")
    print("Run 'just vault-search <query>' to search the vault.")
    print()
    
    # Append to log
    log_entry = f"## [{TIMESTAMP}] lint | vault | Wiki: {len(pages)} pages, Raw: {len(sources)} sources, Issues: {issues}"
    with open(os.path.join(VAULT, "log.md"), 'a') as f:
        f.write(f"\n{log_entry}\n")
    print("Appended to log.md")
    print("=== Lint Complete ===")

if __name__ == "__main__":
    main()
