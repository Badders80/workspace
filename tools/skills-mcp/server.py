#!/usr/bin/env python3
"""Skills MCP Server — Auto-discovery for /workspace/skills/

Enables agents to query available skills and get implementation guidance.
Skills are organized by category: content/, video/, automation/, ai/

Usage:
    python server.py

MCP client config (.vscode/mcp.json):
    {
        "mcpServers": {
            "skills": {
                "command": "python3",
                "args": ["/home/evo/workspace/tools/skills-mcp/server.py"]
            }
        }
    }

Tools:
    - list_skills: List all skills or filter by category
    - search_skills: Search skills by keyword
    - get_skill: Get full details of a specific skill
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import Any

SERVER_NAME = "skills"
SERVER_VERSION = "0.1.0"
PROTOCOL_VERSION = "2025-03-26"

SKILLS_ROOT = Path("/home/evo/workspace/skills")
DNA_SKILLS_ROOT = Path("/home/evo/workspace/DNA/skills")


def log(message: str) -> None:
    print(f"[{SERVER_NAME}] {message}", file=sys.stderr, flush=True)


def get_category_path(category: str | None = None) -> Path:
    """Get the skills directory path for a category."""
    if category:
        return SKILLS_ROOT / category
    return SKILLS_ROOT


def list_skills_in_dir(directory: Path, category: str = "") -> list[dict[str, Any]]:
    """Recursively list all skill files in a directory."""
    skills = []
    
    if not directory.exists():
        return skills
    
    for md_file in directory.rglob("*.md"):
        # Skip README.md
        if md_file.name == "README.md":
            continue
        
        # Get relative path for skill ID
        try:
            rel_path = md_file.relative_to(directory.parent.parent)
        except ValueError:
            continue
        
        skill_id = str(rel_path.with_suffix("")).replace("/", "_")
        
        # Extract title from first H1
        title = md_file.stem.replace("-", " ").replace("_", " / ")
        description = ""
        
        try:
            content = md_file.read_text(encoding="utf-8")
            # Get title from first H1
            h1_match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
            if h1_match:
                title = h1_match.group(1).strip()
            
            # Get description from first paragraph after status
            status_match = re.search(r"Status[:\s]+([^\n]+)", content, re.MULTILINE | re.IGNORECASE)
            if status_match:
                desc_start = status_match.end()
                next_h1 = content.find("\n#", desc_start)
                desc_end = next_h1 if next_h1 > 0 else content.find("\n---", desc_start)
                if desc_end > 0:
                    description = content[desc_start:desc_end].strip()[:200]
        except Exception as e:
            log(f"Error reading {md_file}: {e}")
        
        skills.append({
            "id": skill_id,
            "title": title,
            "description": description,
            "path": str(md_file),
            "category": category or "root"
        })
    
    return skills


def search_skill_content(keyword: str, directory: Path) -> list[dict[str, Any]]:
    """Search skill files for keyword matches."""
    results = []
    keyword_lower = keyword.lower()
    
    if not directory.exists():
        return results
    
    for md_file in directory.rglob("*.md"):
        if md_file.name == "README.md":
            continue
        
        try:
            content = md_file.read_text(encoding="utf-8").lower()
            if keyword_lower in content:
                # Calculate relevance score (more matches = higher score)
                matches = content.count(keyword_lower)
                
                # Get title
                title = md_file.stem.replace("-", " ").replace("_", " / ")
                h1_match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
                if h1_match:
                    title = h1_match.group(1).strip()
                
                results.append({
                    "id": md_file.stem,
                    "title": title,
                    "path": str(md_file),
                    "relevance": min(matches, 10)  # Cap at 10
                })
        except Exception as e:
            log(f"Error searching {md_file}: {e}")
    
    # Sort by relevance
    results.sort(key=lambda x: x["relevance"], reverse=True)
    return results


def get_skill_details(path: str) -> dict[str, Any]:
    """Get full details of a skill file."""
    skill_path = Path(path)
    
    if not skill_path.exists():
        return {"error": f"Skill file not found: {path}"}
    
    try:
        content = skill_path.read_text(encoding="utf-8")
        return {
            "path": str(skill_path),
            "content": content,
            "exists": True
        }
    except Exception as e:
        return {"error": str(e)}


# ---------------------------------------------------------------------------
# MCP JSON-RPC protocol (stdio transport)
# ---------------------------------------------------------------------------

def list_tools() -> dict[str, Any]:
    return {
        "tools": [
            {
                "name": "list_skills",
                "title": "List Skills",
                "description": (
                    "List all available skills from /workspace/skills/. "
                    "Optionally filter by category: content, video, automation, ai. "
                    "Returns skill ID, title, and brief description."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "description": "Filter by category: content, video, automation, ai",
                            "enum": ["content", "video", "automation", "ai"]
                        },
                        "include_dna": {
                            "type": "boolean",
                            "description": "Also include DNA/skills registry",
                            "default": True
                        }
                    },
                    "additionalProperties": False
                }
            },
            {
                "name": "search_skills",
                "title": "Search Skills",
                "description": (
                    "Search all skills for a keyword or topic. "
                    "Returns matching skills sorted by relevance. "
                    "Use when working on a task and need to find relevant tools."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "keyword": {
                            "type": "string",
                            "description": "Keyword to search for (e.g., 'video', 'automation', 'hooks')"
                        }
                    },
                    "required": ["keyword"]
                }
            },
            {
                "name": "get_skill",
                "title": "Get Skill Details",
                "description": (
                    "Get full content of a specific skill file. "
                    "Returns the complete skill documentation for implementation."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "path": {
                            "type": "string",
                            "description": "Full path to the skill file"
                        }
                    },
                    "required": ["path"]
                }
            },
            {
                "name": "get_skill_by_id",
                "title": "Get Skill By ID",
                "description": (
                    "Get skill by ID (e.g., 'content_go-viral-bro-skill' or 'ai_repomix-skill'). "
                    "Easier than remembering file paths."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "skill_id": {
                            "type": "string",
                            "description": "Skill ID (e.g., 'go-viral-bro-skill', 'remotion-skill')"
                        }
                    },
                    "required": ["skill_id"]
                }
            },
            {
                "name": "get_brand_colors",
                "title": "Get Brand Colors",
                "description": (
                    "Returns the complete Evolution Stables color palette. "
                    "Use when building UI, designing content, or rendering video. "
                    "Always use these exact hex values — no substitutions."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False
                }
            },
            {
                "name": "get_typography",
                "title": "Get Typography Specs",
                "description": (
                    "Returns font families, weights, and usage rules. "
                    "Three fonts: Instrument Serif (headings), Inter Tight (body/UI), Geist Mono (data). "
                    "Use when selecting fonts for any visual output."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False
                }
            },
            {
                "name": "get_brand_guidelines",
                "title": "Get Brand Guidelines",
                "description": (
                    "Returns the full Evolution Stables brand guidelines document. "
                    "Covers logo usage, colors, typography, voice/tone, and prohibited uses. "
                    "Read before building any customer-facing content."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "section": {
                            "type": "string",
                            "description": "Optional section filter: colors, typography, voice, logo, intelligence. Empty = full doc."
                        }
                    },
                    "additionalProperties": False
                }
            },
            {
                "name": "validate_design",
                "title": "Validate Design Against Brand",
                "description": (
                    "Check if a design description or color usage violates brand guidelines. "
                    "Pass colors, fonts, and context to get a pass/fail with explanation."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "colors_used": {
                            "type": "string",
                            "description": "Hex colors being used (comma-separated, e.g. '#d4a964,#09090b,#ff0000')"
                        },
                        "fonts_used": {
                            "type": "string",
                            "description": "Fonts being used (e.g., 'Inter Bold, Arial')"
                        },
                        "context": {
                            "type": "string",
                            "description": "What is being built (e.g., 'Instagram reel for Evolution Intelligence')"
                        }
                    },
                    "required": ["colors_used"]
                }
            },
            {
                "name": "get_memory_state",
                "title": "Get Workspace Memory State",
                "description": (
                    "Returns the current workspace state from memory/STATE.md and active blockers. "
                    "Call this at session start to know what projects are active, what's blocked, and what's next. "
                    "No parameters needed — always returns the latest live state."
                ),
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "include_blockers": {
                            "type": "boolean",
                            "description": "Also read memory/BLOCKERS.md and return active blockers. Default: true."
                        },
                        "include_project": {
                            "type": "string",
                            "description": "Optional: project name (e.g., 'Evolution_Token') to also read that project's MEMORY.md"
                        }
                    },
                    "additionalProperties": False
                }
            }
        ]
    }


def call_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    try:
        if name == "list_skills":
            category = arguments.get("category")
            include_dna = arguments.get("include_dna", True)
            
            skills = []
            
            # List skills from /workspace/skills/
            if category:
                skills.extend(list_skills_in_dir(SKILLS_ROOT / category, category))
            else:
                for cat in ["content", "video", "automation", "ai"]:
                    skills.extend(list_skills_in_dir(SKILLS_ROOT / cat, cat))
            
            # Include DNA/skills if requested
            if include_dna and not category:
                dna_skills = list_skills_in_dir(DNA_SKILLS_ROOT, "dna")
                skills.extend(dna_skills)
            
            return {
                "content": [{
                    "type": "text",
                    "text": json.dumps({
                        "skills": skills,
                        "count": len(skills),
                        "tip": "Use get_skill with path to see full details"
                    }, indent=2)
                }]
            }
        
        elif name == "search_skills":
            keyword = arguments["keyword"]
            
            results = []
            for cat in ["content", "video", "automation", "ai"]:
                results.extend(search_skill_content(keyword, SKILLS_ROOT / cat))
            
            return {
                "content": [{
                    "type": "text",
                    "text": json.dumps({
                        "keyword": keyword,
                        "results": results[:10],  # Top 10
                        "count": len(results)
                    }, indent=2)
                }]
            }
        
        elif name == "get_skill":
            path = arguments["path"]
            return {
                "content": [{
                    "type": "text",
                    "text": json.dumps(get_skill_details(path), indent=2)
                }]
            }
        
        elif name == "get_skill_by_id":
            skill_id = arguments["skill_id"]
            
            # Search for matching file
            for md_file in SKILLS_ROOT.rglob("*.md"):
                if md_file.name == "README.md":
                    continue
                if skill_id in md_file.stem or skill_id.replace("_", "-") in md_file.stem:
                    return {
                        "content": [{
                            "type": "text",
                            "text": json.dumps(get_skill_details(str(md_file)), indent=2)
                        }]
                    }
            
            return {
                "content": [{
                    "type": "text",
                    "text": json.dumps({"error": f"Skill not found: {skill_id}"})
                }]
            }
        
        elif name == "get_brand_colors":
            colors = {
                "palette": [
                    {"name": "Background (Velvet Night)", "token": "--color-background", "hex": "#09090b", "rgb": "9,9,11", "usage": "Primary surface"},
                    {"name": "Surface", "token": "--color-surface", "hex": "#0a0a0a", "rgb": "10,10,10", "usage": "Elevated surface (cards, modals)"},
                    {"name": "Foreground", "token": "--color-foreground", "hex": "#f5f5f5", "rgb": "245,245,245", "usage": "Primary text on dark backgrounds"},
                    {"name": "Muted", "token": "--color-muted", "hex": "#a1a1aa", "rgb": "161,161,170", "usage": "Secondary text, captions"},
                    {"name": "Gold Accent", "token": "--brand-gold", "hex": "#d4a964", "rgb": "212,169,100", "usage": "ONLY accent. CTAs, key metrics. NEVER body text."},
                    {"name": "Border", "token": "--color-border", "hex": "rgba(255,255,255,0.06)", "rgb": "255,255,255,0.06", "usage": "Subtle dividers"}
                ],
                "rules": [
                    "Background: ALWAYS #09090b for primary surfaces",
                    "Gold accent #d4a964: ONLY for CTAs, metrics, brand marks. NEVER body text or large blocks.",
                    "No secondary accent colors. No green, no burgundy.",
                    "Foreground #f5f5f5 on background #09090b: contrast 15.6:1 ✓",
                    "Gold #d4a964 on background #09090b: contrast 7.2:1 ✓"
                ],
                "css_variables": {
                    "background": "#09090b",
                    "foreground": "#f5f5f5",
                    "muted": "#a1a1aa",
                    "accent": "#d4a964",
                    "surface": "#0a0a0a",
                    "border": "rgba(255,255,255,0.06)"
                }
            }
            return {"content": [{"type": "text", "text": json.dumps(colors, indent=2)}]}
        
        elif name == "get_typography":
            typography = {
                "fonts": [
                    {"role": "Heritage Heading", "font": "Instrument Serif", "weights": "Bold, SemiBold, Medium, Regular", "usage": "H1-H6, hero statements, brand expressions. NEVER for body/UI."},
                    {"role": "Precision Body", "font": "Inter Tight", "weights": "Regular, Medium, SemiBold", "usage": "Body text, labels, UI elements, navigation, buttons."},
                    {"role": "Data", "font": "Geist Mono", "weights": "Regular, Medium", "usage": "Code, data tables, odds, timestamps, metrics."}
                ],
                "scale": [
                    {"level": "H1", "size": "3.5rem (56px)", "font": "Instrument Serif Bold"},
                    {"level": "H2", "size": "2.75rem (44px)", "font": "Instrument Serif SemiBold"},
                    {"level": "H3", "size": "2.25rem (36px)", "font": "Instrument Serif SemiBold"},
                    {"level": "H4", "size": "1.75rem (28px)", "font": "Instrument Serif Medium"},
                    {"level": "H5", "size": "1.5rem (24px)", "font": "Instrument Serif Regular"},
                    {"level": "Body Large", "size": "1.125rem (18px)", "font": "Inter Tight Medium"},
                    {"level": "Body", "size": "1rem (16px)", "font": "Inter Tight Regular"},
                    {"level": "Body Small", "size": "0.875rem (14px)", "font": "Inter Tight Regular"},
                    {"level": "Caption", "size": "0.75rem (12px)", "font": "Inter Tight Light"},
                    {"level": "Data", "size": "0.875rem (14px)", "font": "Geist Mono Regular"}
                ],
                "rules": [
                    "Max 2 font families per composition",
                    "Line height: 1.4 body, 1.2 headings",
                    "Instrument Serif: headings/hero ONLY",
                    "Inter Tight: ALL body/UI/everything else",
                    "Geist Mono: data presentation ONLY"
                ]
            }
            return {"content": [{"type": "text", "text": json.dumps(typography, indent=2)}]}
        
        elif name == "get_brand_guidelines":
            section = arguments.get("section", "")
            guidelines_path = Path("/home/evo/workspace/DNA/brand/BRAND_GUIDELINES.md")
            design_path = Path("/home/evo/workspace/DNA/brand/DESIGN.md")
            intelligence_path = Path("/home/evo/workspace/DNA/brand/INTELLIGENCE_SYSTEM.md")
            
            brand_doc = ""
            if guidelines_path.exists():
                brand_doc += guidelines_path.read_text(encoding="utf-8")
            
            if not section:
                # Return key extracts
                result = {
                    "colors": "#09090b (bg), #d4a964 (gold), #f5f5f5 (text), #a1a1aa (muted), #0a0a0a (surface)",
                    "typography": "Instrument Serif (headings), Inter Tight (body/UI), Geist Mono (data)",
                    "voice_ownership": "Mature, refined, stewardship-led. For platform, investor relations.",
                    "voice_intelligence": "Fast, accessible, democratic. For faceless content, social media.",
                    "separation_rule": "INTELLIGENCE NEVER mentions ownership, Evolution Stables, Tokinvest, VARA, or DRC.",
                    "imagery": "Real horses, archival/documentary style, dark overlays. No stock AI, no cartoons, no gambling iconography.",
                    "motion": "'Unblur' reveal: blur(10px) → blur(0px). Deliberate, smooth, decelerating.",
                    "full_docs": [
                        str(guidelines_path),
                        str(design_path),
                        str(intelligence_path)
                    ]
                }
                return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}
            else:
                # Extract specific section
                content = brand_doc
                section_lower = section.lower()
                match = re.search(f"## \\d+\\. .*{section_lower}.*?\n(.*?)(?=\n## \\d+\\.|$)", content, re.DOTALL | re.IGNORECASE)
                if match:
                    return {"content": [{"type": "text", "text": match.group(0).strip()}]}
                return {"content": [{"type": "text", "text": f"Section '{section}' not found. Available: colors, typography, voice, logo, imagery, motion"}]}
        
        elif name == "validate_design":
            colors_str = arguments.get("colors_used", "")
            fonts_str = arguments.get("fonts_used", "")
            context = arguments.get("context", "unknown")
            
            colors = [c.strip().lower() for c in colors_str.split(",") if c.strip()]
            
            approved_colors = ["#09090b", "#0a0a0a", "#f5f5f5", "#a1a1aa", "#d4a964", "rgba(255,255,255,0.06)"]
            approved_colors_hex = ["#09090b", "#0a0a0a", "#f5f5f5", "#a1a1aa", "#d4a964"]
            
            violations = []
            
            for color in colors:
                if color.startswith("#") and len(color) == 7:
                    if color not in approved_colors_hex:
                        violations.append(f"Color {color} is NOT in approved palette. Approved: {', '.join(approved_colors_hex)}")
            
            # Check for gold accent misuse
            if "#d4a964" in colors and len(colors) == 1:
                violations.append("Gold (#d4a964) must always be paired with dark background. Never used alone or for large blocks.")
            
            # Check for prohibited colors
            prohibited = {"green": "#00ff00", "burgundy": "#800020"}
            for name, hex_val in prohibited.items():
                if hex_val in colors:
                    violations.append(f"PROHIBITED: {name} ({hex_val}) is explicitly banned from brand palette.")
            
            # Font validation
            if fonts_str:
                fonts_lower = fonts_str.lower()
                approved_fonts = ["instrument serif", "inter tight", "geist mono", "inter bold"]
                font_list = [f.strip().lower() for f in fonts_str.split(",")]
                for font in font_list:
                    if not any(approved in font for approved in approved_fonts):
                        violations.append(f"Font '{font}' is NOT in approved list. Use: Instrument Serif, Inter Tight, Geist Mono")
            
            # Intelligence layer checks
            if context and "intelligence" in context.lower():
                violations.append("REMINDER: Intelligence layer = NO ownership mentions, NO Evolution Stables branding, NO Tokinvest/VARA references.")
                if "#d4a964" in colors:
                    violations.append("For Evolution Intelligence faceless content, use #121212 background (NOT #09090b) and reduced gold accent.")
            
            if not violations:
                result = {"status": "PASS", "message": "Design complies with Evolution Stables brand guidelines.", "violations": []}
            else:
                result = {"status": "FAIL", "message": f"Found {len(violations)} brand violation(s).", "violations": violations}
            
            return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}
        
        elif name == "get_memory_state":
            state_path = Path("/home/evo/workspace/memory/STATE.md")
            blockers_path = Path("/home/evo/workspace/memory/BLOCKERS.md")
            include_blockers = arguments.get("include_blockers", True)
            include_project = arguments.get("include_project", "")
            
            result = {}
            
            # Read STATE.md
            if state_path.exists():
                result["state"] = state_path.read_text(encoding="utf-8")
            else:
                result["state"] = "ERROR: memory/STATE.md not found"
            
            # Read BLOCKERS.md
            if include_blockers and blockers_path.exists():
                result["blockers"] = blockers_path.read_text(encoding="utf-8")
            
            # Read project MEMORY.md if requested
            if include_project:
                project_path = Path(f"/home/evo/workspace/projects/{include_project}/MEMORY.md")
                if project_path.exists():
                    result["project_memory"] = project_path.read_text(encoding="utf-8")
                else:
                    result["project_memory"] = f"ERROR: Project MEMORY.md not found at {project_path}"
            
            return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}
        
        else:
            return {
                "content": [{"type": "text", "text": f"Unknown tool: {name}"}],
                "isError": True
            }
    
    except Exception as e:
        return {
            "content": [{"type": "text", "text": f"Error: {e}"}],
            "isError": True
        }


# ---------------------------------------------------------------------------
# Stdio JSON-RPC transport
# ---------------------------------------------------------------------------

def write_message(payload: dict[str, Any]) -> None:
    body = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    sys.stdout.buffer.write(f"Content-Length: {len(body)}\r\n\r\n".encode("ascii"))
    sys.stdout.buffer.write(body)
    sys.stdout.buffer.flush()


def read_message() -> dict[str, Any] | None:
    headers: dict[str, str] = {}
    while True:
        line = sys.stdin.buffer.readline()
        if not line:
            return None
        if line in (b"\r\n", b"\n"):
            break
        name, _, value = line.decode("utf-8", errors="replace").partition(":")
        headers[name.strip().lower()] = value.strip()

    content_length = int(headers.get("content-length", "0"))
    if content_length <= 0:
        return None
    body = sys.stdin.buffer.read(content_length)
    return json.loads(body.decode("utf-8"))


def success_response(message_id: Any, result: dict[str, Any]) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": message_id, "result": result}


def error_response(message_id: Any, code: int, message: str) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": message_id, "error": {"code": code, "message": message}}


def main() -> None:
    log(f"Skills MCP Server v{SERVER_VERSION}")
    log(f"Skills root: {SKILLS_ROOT}")
    
    while True:
        message = read_message()
        if message is None:
            break

        message_id = message.get("id")
        method = message.get("method")
        params = message.get("params") or {}

        if method == "notifications/initialized":
            continue

        if method == "ping" and message_id is not None:
            write_message(success_response(message_id, {}))
            continue

        if method == "initialize" and message_id is not None:
            write_message(success_response(message_id, {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {"tools": {}},
                "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
                "instructions": (
                    "MCP server for Evolution workspace skills, brand, and memory. "
                    "AT SESSION START: Call get_memory_state to load current workspace state. "
                    "Skills: Use list_skills, search_skills, get_skill_by_id for discovery. "
                    "Brand: Use get_brand_colors, get_typography, get_brand_guidelines, validate_design. "
                    "Categories: content, video, automation, ai"
                ),
            }))
            continue

        if method == "tools/list" and message_id is not None:
            write_message(success_response(message_id, list_tools()))
            continue

        if method == "tools/call" and message_id is not None:
            try:
                tool_name = str(params["name"])
                tool_args = params.get("arguments") or {}
                result = call_tool(tool_name, tool_args)
                write_message(success_response(message_id, result))
            except Exception as exc:
                write_message(error_response(message_id, -32603, str(exc)))
            continue

        if message_id is not None:
            write_message(error_response(message_id, -32601, f"Method not found: {method}"))


if __name__ == "__main__":
    main()