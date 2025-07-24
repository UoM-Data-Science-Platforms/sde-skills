#!/usr/bin/env python3
"""
Convert competency framework markdown files to structured YAML format.
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, List, Any


def slugify(text: str) -> str:
    """Convert text to a URL-friendly slug."""
    # Convert to lowercase and replace spaces/special chars with hyphens
    slug = re.sub(r"[^\w\s-]", "", text.lower())
    slug = re.sub(r"[-\s]+", "-", slug)
    return slug.strip("-")


def extract_level_content(content: str, level_marker: str) -> List[str]:
    """Extract bullet points for a specific level."""
    # Pattern to match the level section
    pattern = rf'=== "{re.escape(level_marker)}".*?\n\n(.*?)(?=\n===|\n###|\n##|\Z)'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        return []

    section_content = match.group(1).strip()

    # Extract bullet points
    bullets = []
    for line in section_content.split("\n"):
        line = line.strip()
        if line.startswith("- "):
            bullets.append(line[2:].strip())
        elif line.startswith("    - "):  # Indented bullet
            bullets.append(line[6:].strip())

    return bullets


def parse_competency_section(content: str, competency_title: str) -> Dict[str, Any]:
    """Parse a competency section from markdown content."""
    competency_id = slugify(competency_title)

    # Find the start and end of this competency section
    start_pattern = rf"### {re.escape(competency_title)}\n"
    start_match = re.search(start_pattern, content)
    if not start_match:
        return {
            "id": competency_id,
            "name": competency_title,
            "description": "",
            "levels": {},
        }

    start_pos = start_match.end()

    # Find the next ### or ## to determine the end of this section
    next_section_pattern = r"\n(###|##) "
    next_match = re.search(next_section_pattern, content[start_pos:])
    if next_match:
        end_pos = start_pos + next_match.start()
        section_content = content[start_pos:end_pos]
    else:
        section_content = content[start_pos:]

    # Extract description (text before first ===)
    desc_match = re.search(r"^(.*?)(?=\n===)", section_content, re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else ""

    # Extract levels from this specific section
    levels = {}

    # Entry Level
    entry_skills = extract_level_content(
        section_content, ":material-battery-10: Entry Level"
    )
    if entry_skills:
        levels["entry"] = {
            "id": f"{competency_id}-entry",
            "name": "Entry Level",
            "skills": entry_skills,
        }

    # Mid Level
    mid_skills = extract_level_content(
        section_content, ":material-battery-50: Mid Level"
    )
    if mid_skills:
        levels["mid"] = {
            "id": f"{competency_id}-mid",
            "name": "Mid Level",
            "skills": mid_skills,
        }

    # Senior Level
    senior_skills = extract_level_content(
        section_content, ":material-battery-90: Senior Level"
    )
    if senior_skills:
        levels["senior"] = {
            "id": f"{competency_id}-senior",
            "name": "Senior Level",
            "skills": senior_skills,
        }

    return {
        "id": competency_id,
        "name": competency_title,
        "description": description,
        "levels": levels,
    }


def parse_subdomain_section(content: str, subdomain_title: str) -> Dict[str, Any]:
    """Parse a subdomain section from markdown content."""
    subdomain_id = slugify(subdomain_title)

    # Extract subdomain description (text between ## title and first ###)
    pattern = rf"## {re.escape(subdomain_title)}\n\n(.*?)(?=\n###)"
    match = re.search(pattern, content, re.DOTALL)
    description = match.group(1).strip() if match else ""

    # Find all competency sections within this subdomain
    competencies = {}

    # Pattern to find ### sections within this subdomain
    subdomain_pattern = rf"## {re.escape(subdomain_title)}(.*?)(?=\n## |\Z)"
    subdomain_match = re.search(subdomain_pattern, content, re.DOTALL)

    if subdomain_match:
        subdomain_content = subdomain_match.group(1)

        # Find all ### competency titles
        competency_matches = re.finditer(r"### (.+?)(?=\n)", subdomain_content)

        for comp_match in competency_matches:
            competency_title = comp_match.group(1).strip()
            competency_data = parse_competency_section(content, competency_title)
            competencies[competency_data["id"]] = competency_data

    return {
        "id": subdomain_id,
        "name": subdomain_title,
        "description": description,
        "competencies": competencies,
    }


def parse_markdown_file(file_path: str) -> Dict[str, Any]:
    """Parse a competency framework markdown file."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract domain title (first # heading)
    title_match = re.search(r"^# (.+?)$", content, re.MULTILINE)
    if not title_match:
        raise ValueError(f"No domain title found in {file_path}")

    domain_title = title_match.group(1).strip()
    domain_id = slugify(domain_title)

    # Extract domain description (text between # title and first ##)
    desc_pattern = rf"# {re.escape(domain_title)}\n\n(.*?)(?=\n##)"
    desc_match = re.search(desc_pattern, content, re.DOTALL)
    domain_description = desc_match.group(1).strip() if desc_match else ""

    # Find all subdomain sections (## headings)
    subdomains = {}
    subdomain_matches = re.finditer(r"^## (.+?)$", content, re.MULTILINE)

    for subdomain_match in subdomain_matches:
        subdomain_title = subdomain_match.group(1).strip()
        subdomain_data = parse_subdomain_section(content, subdomain_title)
        subdomains[subdomain_data["id"]] = subdomain_data

    return {
        "domain": {
            "id": domain_id,
            "name": domain_title,
            "description": domain_description,
            "source_file": os.path.basename(file_path),
            "subdomains": subdomains,
        }
    }


def convert_file_to_yaml(input_file: str, output_dir: str):
    """Convert a single markdown file to YAML."""
    try:
        # Skip overview and mapping files
        filename = os.path.basename(input_file)
        if filename in [
            "overview.md",
            "framework_mapping.md",
            "skills_matrix_mapping.md",
        ]:
            print(f"Skipping {filename} (not a domain file)")
            return

        print(f"Converting {filename}...")

        # Parse the markdown file
        data = parse_markdown_file(input_file)

        # Create output filename
        base_name = Path(input_file).stem
        output_file = os.path.join(output_dir, f"{base_name}.yaml")

        # Write YAML file
        with open(output_file, "w", encoding="utf-8") as f:
            yaml.dump(
                data,
                f,
                default_flow_style=False,
                allow_unicode=True,
                sort_keys=False,
                width=100,
            )

        print(f"Created {output_file}")

    except Exception as e:
        print(f"Error converting {input_file}: {e}")


def main():
    """Main conversion function."""
    # Define paths
    input_dir = "/home/vc/dev/sde-skills/docs/competency_framework"
    output_dir = "/home/vc/dev/sde-skills/local/yaml"

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Find all markdown files
    md_files = []
    for file in os.listdir(input_dir):
        if file.endswith(".md"):
            md_files.append(os.path.join(input_dir, file))

    print(f"Found {len(md_files)} markdown files to convert")

    # Convert each file
    for md_file in md_files:
        convert_file_to_yaml(md_file, output_dir)

    print("Conversion complete!")


if __name__ == "__main__":
    main()
