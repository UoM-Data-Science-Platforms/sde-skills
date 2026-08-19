#!/usr/bin/env python3
"""
Build script for the sde-skill agent skill references.

Generates the reference files for skills/sde-skill/references/
from the single source of truth — the YAML files in yaml/ and the mapping
document in docs/competency_framework/:

- framework_index.md: compact navigable map of every domain, subdomain,
  and competency, so an agent can triage what is relevant before loading
  detail.
- domains/<domain-id>.md: full detail for each domain — descriptions,
  competencies with entry/mid/senior skill statements, and the example
  tools/technologies/standards from the companion
  *_tools-tech-standards.yaml files.
- framework_mapping.md: copy of docs/competency_framework/framework_mapping.md
  (the Five Safes / SATRE mapping) with an auto-generated banner.

All outputs are generated — never edit them by hand. Rerun this script
whenever the YAML files or the mapping doc change:

    python scripts/build_skill_references.py
"""

import re
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
YAML_DIR = REPO_ROOT / "yaml"
MAPPING_SRC = REPO_ROOT / "docs" / "competency_framework" / "framework_mapping.md"
REFERENCES_DIR = REPO_ROOT / "skills" / "sde-skill" / "references"

BANNER = (
    "<!-- AUTO-GENERATED FILE - do not edit by hand.\n"
    "     Source of truth: {source}\n"
    "     Regenerate with: python scripts/build_skill_references.py -->\n\n"
)

INDEX_INTRO = """\
# SDE Competency Framework - Index

Compact map of the full framework: every domain, subdomain, and competency
with its identifier. Use this to decide which domain reference files (in
`references/domains/`) to load for detail; each competency there defines
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
        domains.append((path.name, domain, tools))
    domains.sort(key=lambda d: d[1]["index"])
    return domains


def render_index(domains):
    lines = [BANNER.format(source="yaml/"), INDEX_INTRO]
    n_sub = sum(len(d["subdomains"]) for _, d, _ in domains)
    n_comp = sum(
        len(s.get("competencies", {}))
        for _, d, _ in domains
        for s in d["subdomains"].values()
    )
    lines.append(
        f"{len(domains)} domains / {n_sub} subdomains / {n_comp} competencies. "
        "Levels everywhere: entry, mid, senior.\n"
    )

    for _, domain, _ in domains:
        lines.append(
            f"## Domain {domain['index']}: {domain['name']} (`{domain['id']}`)"
        )
        lines.append("")
        lines.append(first_sentence(domain.get("description")))
        lines.append("")
        lines.append(f"Detail: `references/domains/{domain['id']}.md`")
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
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def render_domain(filename, domain, tools):
    lines = [BANNER.format(source=f"yaml/{filename}")]
    lines.append(f"# Domain {domain['index']}: {domain['name']} (`{domain['id']}`)")
    lines.append("")
    lines.append(domain.get("description", "").strip())
    lines.append("")
    for sub_id, sub in domain["subdomains"].items():
        lines.append(f"## {sub['name']} (`{sub_id}`)")
        lines.append("")
        lines.append(sub.get("description", "").strip())
        lines.append("")
        items = tools.get(sub_id, {}).get("items", [])
        if items:
            lines.append(f"*Example tools/technologies/standards:* {', '.join(items)}")
            lines.append("")
        competencies = sub.get("competencies", {})
        if not competencies:
            lines.append(
                "*No competencies defined yet for this subdomain — use the "
                "description above qualitatively.*"
            )
            lines.append("")
        for comp_id, comp in competencies.items():
            lines.append(f"### {comp['name']} (`{comp_id}`)")
            lines.append("")
            lines.append(comp.get("description", "").strip())
            lines.append("")
            for level_id in ("entry", "mid", "senior"):
                level = comp.get("levels", {}).get(level_id)
                if not level:
                    continue
                lines.append(f"**{level.get('name', level_id.title())}:**")
                lines.append("")
                for skill in level.get("skills", []):
                    lines.append(f"- {skill}")
                lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main():
    domains = load_domains()
    domains_dir = REFERENCES_DIR / "domains"
    domains_dir.mkdir(parents=True, exist_ok=True)

    index_path = REFERENCES_DIR / "framework_index.md"
    index_path.write_text(render_index(domains), encoding="utf-8")
    print(f"Wrote {index_path.relative_to(REPO_ROOT)}")

    for filename, domain, tools in domains:
        out = domains_dir / f"{domain['id']}.md"
        out.write_text(render_domain(filename, domain, tools), encoding="utf-8")
        print(f"Wrote {out.relative_to(REPO_ROOT)}")

    mapping_out = REFERENCES_DIR / "framework_mapping.md"
    mapping_out.write_text(
        BANNER.format(source=str(MAPPING_SRC.relative_to(REPO_ROOT)))
        + MAPPING_SRC.read_text(encoding="utf-8"),
        encoding="utf-8",
    )
    print(f"Wrote {mapping_out.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
