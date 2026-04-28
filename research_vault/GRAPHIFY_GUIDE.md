# Graphify Guide for Evolution Workspace

> Last updated: 2026-04-23
> Purpose: How to use Graphify knowledge graphs across the workspace

## What is Graphify?

Graphify turns any folder of code, docs, or papers into a queryable knowledge graph. It extracts AST (Abstract Syntax Tree) from code files and builds relationship maps.

## Current Graphify Outputs

| Project | Location | Nodes | Edges | Status |
|---------|----------|-------|-------|--------|
| DNA | `/home/evo/workspace/DNA/graphify-out/` | 32 | 8 | ✅ Active |
| SSOT_Build | `/home/evo/workspace/projects/SSOT_Build/graphify-out/` | 199 | 334 | ✅ Active |
| Evolution_Platform | `/home/evo/workspace/projects/Evolution_Platform/graphify-out/` | 267 | 203 | ✅ Active |
| Evolution_CRM | N/A | - | - | ⚠️ No code files to graph |
| research_vault | N/A | - | - | ⚠️ No code files to graph |

## How to Update Graphs

```bash
# Update DNA graph
cd /home/evo/workspace/DNA && graphify update . --no-viz

# Update SSOT graph
cd /home/evo/workspace/projects/SSOT_Build && graphify update . --no-viz

# Update Platform graph
cd /home/evo/workspace/projects/Evolution_Platform && graphify update . --no-viz
```

## How to Query Graphs

```bash
# Query a graph for information
cd /home/evo/workspace/DNA && graphify query "How does the agent system work?"

# Find shortest path between two concepts
cd /home/evo/workspace/projects/SSOT_Build && graphify path "horse" "listing"

# Explain a node
cd /home/evo/workspace/projects/Evolution_Platform && graphify explain "marketplace"
```

## Files Generated

Each `graphify-out/` folder contains:
- `graph.json` - Raw graph data (nodes, edges, communities)
- `graph.html` - Interactive visual graph (if not using --no-viz)
- `GRAPH_REPORT.md` - Summary report with god nodes, surprising connections, knowledge gaps
- `cache/` - Cached AST extractions

## Integration with Agents

Agents can use Graphify to:
1. **Discover relationships** - "How does SSOT_Build connect to Evolution_Platform?"
2. **Find god nodes** - Most central concepts in each project
3. **Identify knowledge gaps** - Areas where documentation is thin
4. **Navigate codebases** - Token-efficient exploration vs reading raw files

## Notes

- The `--no-viz` flag skips HTML generation for large graphs (avoids "too large for HTML viz" errors)
- `research_vault/` and `Evolution_CRM/` have no code files, so Graphify has nothing to extract
- For markdown/note-based knowledge, use Obsidian's native graph view instead
- Run `graphify update` after significant code changes to keep graphs current

## Next Steps

- [ ] Add Graphify to session-start/session-end workflow
- [ ] Create cross-project queries (DNA → SSOT → Platform relationships)
- [ ] Use graph reports to identify architectural gaps
