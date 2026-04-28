#!/usr/bin/env python3
"""
build-dashboard.py — Scan project MEMORY.md + workspace blockers, emit DASHBOARD.md

Rule: DASHBOARD.md is read-only. Edit MEMORY.md, then run `just dash`.
"""

import re
from datetime import datetime
from pathlib import Path

WORKSPACE = Path("/home/evo/workspace")
MEMORY_DIR = WORKSPACE / "memory"
PROJECTS_DIR = WORKSPACE / "projects"
DASHBOARD_PATH = WORKSPACE / "DASHBOARD.md"

# Map emoji / text statuses to board columns
STATUS_META = {
    "🔥": "In Flight", "[A]": "In Flight",
    "🟡": "In Flight", "[W]": "In Flight",
    "🟢": "Completing", "[R]": "Completing",
    "✅": "Done",
    "❌": "Stalled", "🔴": "Stalled",
}
KNOWN_STATUS_PREFIXES = set(STATUS_META.keys())
COLUMN_ORDER = ["In Flight", "Completing", "Stalled", "Blocked", "Ready", "Done"]

SKIP_FIRST_COL = {
    "Blocker", "System", "Date", "Pundit", "Scene", "Component",
    "Product", "Tech", "Next", "What", "Item", "---", "========",
    "Tech Stack", "Integration", "Machine", "Context",
}


def parse_memory(md_path: Path) -> dict:
    """Parse a MEMORY.md for active threads + metadata."""
    text = md_path.read_text(encoding="utf-8") if md_path.exists() else ""
    project = md_path.parent.name

    # Extract last-updated date
    m = re.search(r"Last updated:\s*(\d{4}-\d{2}-\d{2})", text)
    last_updated = m.group(1) if m else None

    threads = []
    lines = text.splitlines()
    for i, line in enumerate(lines):
        # Look for thread table header
        if "| Thread |" not in line:
            continue
        # Read rows until table ends (blank line, new section header, or line without |)
        for j in range(i + 2, len(lines)):
            row = lines[j].strip()
            if not row.startswith("|"):
                break
            cols = [c.strip() for c in row.strip("|").split("|")]
            if len(cols) < 3:
                continue
            name, status = cols[0], cols[1]
            # Skip header rows and non-thread rows
            if name in SKIP_FIRST_COL or not name:
                continue
            # Only accept rows where status looks like a real status
            status_prefix = status.split()[0] if status else ""
            if status_prefix not in KNOWN_STATUS_PREFIXES and not any(
                status.startswith(p) for p in KNOWN_STATUS_PREFIXES
            ):
                continue
            threads.append({
                "name": name,
                "status": status,
                "next": cols[2] if len(cols) > 2 else "",
                "owner": cols[3] if len(cols) > 3 else "",
            })

    return {"project": project, "last_updated": last_updated, "threads": threads}


def parse_blockers() -> list:
    """Parse memory/BLOCKERS.md for active blockers (Current Blockers section only)."""
    path = MEMORY_DIR / "BLOCKERS.md"
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    blockers = []
    in_current = False
    in_table = False
    for line in text.splitlines():
        if "## Current Blockers" in line:
            in_current = True
            continue
        if in_current and line.startswith("## "):
            break  # Next section
        if in_current and ("| ID |" in line or "|----|" in line):
            in_table = True
            continue
        if in_table and line.startswith("|"):
            cols = [c.strip() for c in line.strip("|").split("|")]
            if len(cols) >= 5 and cols[0] not in ("ID", ""):
                blockers.append({
                    "id": cols[0],
                    "name": cols[1],
                    "impact": cols[2],
                    "since": cols[3],
                    "owner": cols[4],
                })
    return blockers


def bucket_threads(projects: list) -> dict:
    """Bucket threads into board columns."""
    buckets = {c: [] for c in COLUMN_ORDER}
    for p in projects:
        for t in p["threads"]:
            status_prefix = t["status"].split()[0] if t["status"] else ""
            col = STATUS_META.get(status_prefix, "Ready")
            buckets[col].append({
                "project": p["project"],
                "name": t["name"],
                "status": t["status"],
                "next": t["next"],
                "owner": t["owner"],
                "last_updated": p["last_updated"],
            })
    return buckets


def wip_count(buckets: dict) -> dict:
    counts = {}
    for item in buckets.get("In Flight", []):
        counts[item["project"]] = counts.get(item["project"], 0) + 1
    return counts


def render_dashboard(buckets: dict, blockers: list, wip: dict) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    lines = [
        "# Evolution Workspace — Productivity Dashboard",
        f"# Auto-generated: {now}",
        "# Rule: DASHBOARD.md is read-only. Edit MEMORY.md, then run `just dash`.",
        "",
        "---",
        "",
        "## 🎯 Top of Stack",
        "",
    ]

    in_flight = buckets.get("In Flight", [])
    if in_flight:
        oldest = min(in_flight, key=lambda x: x.get("last_updated") or "9999")
        lines.extend([
            f"**{oldest['project']}** — {oldest['name']}",
            f"Status: {oldest['status']} | Next: {oldest['next']} | Owner: {oldest['owner'] or 'Unassigned'}",
            "",
        ])
    else:
        lines.extend([
            "No items In Flight. Pick one from Ready or start something new.",
            "",
        ])

    lines.extend([
        "## 📊 WIP Health",
        "",
        "| Project | In Flight | Warning |",
        "|---------|-----------|---------|",
    ])
    for proj, count in sorted(wip.items()):
        warn = "⚠️ >3" if count > 3 else "✅"
        lines.append(f"| {proj} | {count} | {warn} |")
    lines.append("")

    for col in COLUMN_ORDER:
        items = buckets.get(col, [])
        lines.extend([f"## {col} ({len(items)})", ""])
        if not items:
            lines.append("_Empty_\n")
            continue
        lines.append("| Project | Item | Status | Next Step | Owner | Updated |")
        lines.append("|---------|------|--------|-----------|-------|---------|")
        for item in sorted(items, key=lambda x: x.get("last_updated") or "9999"):
            updated = item.get("last_updated") or "—"
            lines.append(
                f"| {item['project']} | {item['name']} | {item['status']} | {item['next']} | {item['owner'] or '—'} | {updated} |"
            )
        lines.append("")

    lines.extend(["## 🛑 Blocked", ""])
    if blockers:
        lines.append("| ID | Blocker | Impact | Since | Owner |")
        lines.append("|----|---------|--------|-------|-------|")
        for b in blockers:
            lines.append(f"| {b['id']} | {b['name']} | {b['impact']} | {b['since']} | {b['owner']} |")
    else:
        lines.append("_No active blockers_")
    lines.append("")

    completing = buckets.get("Completing", [])
    lines.extend(["## 🏁 Completing — Quick Wins", ""])
    if completing:
        lines.append("These are one step away from Done. Ship them before starting new work.")
        lines.append("")
        for item in completing:
            lines.append(f"- **{item['project']}** — {item['name']}: *{item['next']}*")
    else:
        lines.append("_Nothing in Completing_")
    lines.append("")

    done = buckets.get("Done", [])
    lines.extend(["## ✅ Done (This Week)", ""])
    if done:
        for item in done:
            lines.append(f"- **{item['project']}** — {item['name']}")
    else:
        lines.append("_Nothing marked Done_")
    lines.append("")

    lines.extend([
        "## Commands",
        "",
        "```bash",
        "just dash      # rebuild this dashboard",
        "just check     # workspace health gate",
        "just status    # project status",
        "```",
        "",
        "## Context Chain",
        "<- inherits from: workspace/memory/STATE.md",
        "<- inherits from: workspace/memory/BLOCKERS.md",
        "<- inherits from: projects/*/MEMORY.md",
        "-> overrides by: none",
    ])

    return "\n".join(lines)


def main():
    projects = []
    for proj_dir in sorted(PROJECTS_DIR.iterdir()):
        if proj_dir.name.startswith("_"):
            continue
        memory_path = proj_dir / "MEMORY.md"
        if memory_path.exists():
            projects.append(parse_memory(memory_path))

    blockers = parse_blockers()
    buckets = bucket_threads(projects)
    dashboard = render_dashboard(buckets, blockers, wip_count(buckets))
    DASHBOARD_PATH.write_text(dashboard, encoding="utf-8")
    print(f"Dashboard written to {DASHBOARD_PATH}")


if __name__ == "__main__":
    main()