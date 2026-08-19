#!/usr/bin/env python3
"""
Build script for the sde-skill agent skill references.

Generates a compact, navigable index of the competency framework
(.claude/skills/sde-skill/references/framework_index.md) from the source
YAML files in yaml/. The index lets an agent triage which domains and
competencies are relevant to a task before loading the full domain YAML
files (which are symlinked into .claude/skills/sde-skill/references/yaml/
so the skill always reads the single source of truth).

Run this whenever the YAML files change:

    python scripts/build_skill_references.py

Note on symlinks: the references/yaml/ symlinks are relative and resolve
inside a normal git checkout on Linux/macOS. On Windows, enable symlink
support (git config core.symlinks true + Developer Mode) or regenerate
the references from the YAML files directly.
"""

import re
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
YAML_DIR = REPO_ROOT / "yaml"
OUTPUT_FILE = (
    REPO_ROOT / ".claude" / "skills" / "sde-skill" / "references" / "framework_index.md"
)

HEADER = """\
<!-- AUTO-GENERATED FILE - do not edit by hand.
     Regenerate with: python scripts/build_skill_references.py -->

# SDE Competency Framework - Index

Compact map of the full framework: every domain, subdomain, and competency
with its identifier. Use this to decide which domain YAML files (in
`references/yaml/`) to load for detail; each competency there defines
entry, mid, and senior level skill statements.
"""


def first_sentence(text):
    """Return the first sentence of a (possibly multi-paragraph) description."""
    if not text:
        return ""
    line = text.strip().splitlines()[0].strip()
    match = re.match(r"(.+?\.)(\s|$)", line)
    return match.group(1) if match else line


def load_domains():
    """Load domain YAML files paired with their tools-tech-standards files."""
    domains = []
    for path in sorted(YAML_DIR.glob("safe_*.yaml")):
        with open(path, encoding="utf-8") as f:
            domain = yaml.safe_load(f)["domain"]
        tools_path = YAML_DIR / f"{domain['id']}_tools-tech-standards.yaml"
        tools = {}
        if tools_path.exists():
            with open(tools_path, encoding="utf-8") as f:
                tools = yaml.safe_load(f).get("subdomains", {})
        domains.append((path.name, domain, tools_path.name, tools))
    domains.sort(key=lambda d: d[1]["index"])
    return domains


def render_index(domains):
    lines = [HEADER]
    n_sub = sum(len(d["subdomains"]) for _, d, _, _ in domains)
    n_comp = sum(
        len(s.get("competencies", {}))
        for _, d, _, _ in domains
        for s in d["subdomains"].values()
    )
    lines.append(
        f"{len(domains)} domains / {n_sub} subdomains / {n_comp} competencies. "
        "Levels everywhere: entry, mid, senior.\n"
    )

    for filename, domain, tools_filename, tools in domains:
        lines.append(
            f"## Domain {domain['index']}: {domain['name']} (`{domain['id']}`)"
        )
        lines.append("")
        lines.append(f"{first_sentence(domain.get('description'))}")
        lines.append("")
        lines.append(
            f"Detail: `references/yaml/{filename}` | "
            f"Example tools & standards: `references/yaml/{tools_filename}`"
        )
        lines.append("")
        for sub_id, sub in domain["subdomains"].items():
            lines.append(f"### {sub['name']} (`{sub_id}`)")
            lines.append("")
            lines.append(first_sentence(sub.get("description")))
            lines.append("")
            for comp_id, comp in sub.get("competencies", {}).items():
                lines.append(
                    f"- **{comp['name']}** (`{comp_id}`): "
                    f"{first_sentence(comp.get('description'))}"
                )
            items = tools.get(sub_id, {}).get("items", [])
            if items:
                lines.append(f"- *Example tools/standards:* {', '.join(items)}")
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main():
    domains = load_domains()
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(render_index(domains), encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
