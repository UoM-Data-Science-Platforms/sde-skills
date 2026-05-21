#!/usr/bin/env python3
"""
Extract Tools, Technologies, and Standards from markdown competency sections
and consolidate them into safe_*_tools-tech-standards.yaml files.

For each subdomain, collects all Tools/Technologies/Standards blocks from its competencies
and groups them under a single 'items' block per subdomain for later display.

Usage:
    python scripts/extract_tools_tech_standards.py docs/competency_framework safe_technology_engineering.md
"""

import os
import re
import yaml
from pathlib import Path


def extract_competencies_from_md(filepath):
    """Parse markdown file and extract competencies with their Tools/Technologies/Standards blocks.

    Returns:
        dict: {
            'domain_name': str,
            'subdomains': {
                'subdomain-id': {
                    'name': str,
                    'competencies': {
                        'competency-id': {
                            'name': str,
                            'tools': [str],
                            'technologies': [str],
                            'standards': [str]
                        }
                    }
                }
            }
        }
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract domain name from # heading
    domain_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    domain_name = domain_match.group(1) if domain_match else 'Unknown'

    result = {
        'domain_name': domain_name,
        'subdomains': {}
    }

    # Split by ## subdomain headings
    subdomain_pattern = r'^## (.+?)$'
    subdomain_sections = re.split(subdomain_pattern, content, flags=re.MULTILINE)

    # subdomain_sections = ['header stuff', 'Sub 1 name', 'Sub 1 content', 'Sub 2 name', 'Sub 2 content', ...]
    # Process pairs of (name, content)
    for i in range(1, len(subdomain_sections), 2):
        if i + 1 < len(subdomain_sections):
            subdomain_name = subdomain_sections[i].strip()
            subdomain_content = subdomain_sections[i + 1]

            # Convert subdomain name to ID (e.g., "Software Engineering" -> "software-engineering")
            subdomain_id = subdomain_name.lower().replace(' ', '-').replace('&', 'and')

            subdom_data = {
                'name': subdomain_name,
                'competencies': {}
            }

            # Split by ### competency headings within this subdomain
            comp_pattern = r'^### (.+?)$'
            comp_sections = re.split(comp_pattern, subdomain_content, flags=re.MULTILINE)

            # Process pairs of (name, content)
            for j in range(1, len(comp_sections), 2):
                if j + 1 < len(comp_sections):
                    comp_name = comp_sections[j].strip()
                    comp_content = comp_sections[j + 1]

                    # Convert competency name to ID
                    comp_id = comp_name.lower().replace(' ', '-').replace('&', 'and')

                    # Extract Tools, Technologies, Standards blocks
                    tools = extract_section(comp_content, 'Tools')
                    technologies = extract_section(comp_content, 'Technologies')
                    standards = extract_section(comp_content, 'Standards')

                    comp_data = {
                        'name': comp_name,
                        'tools': tools,
                        'technologies': technologies,
                        'standards': standards
                    }

                    subdom_data['competencies'][comp_id] = comp_data

            result['subdomains'][subdomain_id] = subdom_data

    return result


def extract_section(text, heading):
    """Extract items from a #### Heading section.

    Returns list of cleaned items (removes trailing parentheses artifacts).
    """
    # Match #### Heading and collect lines until next #### or ###
    pattern = rf'^#### {heading}\s*$(.+?)(?=^####|^###|$)'
    match = re.search(pattern, text, re.MULTILINE | re.DOTALL)

    if not match:
        return []

    content = match.group(1).strip()

    # Split by lines and extract list items (lines starting with -)
    items = []
    for line in content.split('\n'):
        line = line.strip()
        if line.startswith('- '):
            item = line[2:].strip()
            # Remove trailing parenthesis artifacts (e.g., "GitHub)" -> "GitHub")
            item = re.sub(r'\)$', '', item)
            if item:
                items.append(item)

    return items


def consolidate_for_yaml(data):
    """Convert extracted data into YAML structure with items grouped by subdomain.

    Structure:
        domain:
          name: Domain Name
        subdomains:
          subdomain-id:
            name: Subdomain Name
            items:
              - Tool A
              - Technology B
              - Standard C
    """
    yaml_data = {
        'domain': {
            'name': data['domain_name']
        },
        'subdomains': {}
    }

    for subdomain_id, subdom in data['subdomains'].items():
        items = []

        # Collect all items from all competencies in this subdomain
        for comp_id, comp in subdom['competencies'].items():
            # Add tools
            items.extend(comp['tools'])

            # Add technologies
            items.extend(comp['technologies'])

            # Add standards
            items.extend(comp['standards'])

        subdom_data = {
            'name': subdom['name'],
            'items': items
        }

        yaml_data['subdomains'][subdomain_id] = subdom_data

    return yaml_data


def save_yaml(filepath, data):
    """Save data to YAML file with clean formatting."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(
            data,
            f,
            default_flow_style=False,
            sort_keys=False,
            allow_unicode=True,
            width=120
        )


def domain_id_from_filename(filename):
    """Convert filename to domain ID. E.g., safe_technology_engineering.md -> safe-technology-engineering"""
    stem = Path(filename).stem
    return stem.replace('_', '-')


def main():
    """Main extraction process."""
    md_dir = Path('docs/competency_framework')
    output_dir = Path('yaml')

    # Find all safe_*.md files
    md_files = sorted(md_dir.glob('safe_*.md'))

    if not md_files:
        print(f"[ERROR] No safe_*.md files found in {md_dir}")
        return

    print(f"Processing {len(md_files)} markdown files...\n")

    for md_file in md_files:
        print(f"Processing {md_file.name}...")

        # Extract data from markdown
        data = extract_competencies_from_md(md_file)

        # Consolidate into YAML structure
        yaml_data = consolidate_for_yaml(data)

        # Determine output filename
        domain_id = domain_id_from_filename(md_file.name)
        output_filename = f"{domain_id}_tools-tech-standards.yaml"
        output_path = output_dir / output_filename

        # Save YAML
        save_yaml(output_path, yaml_data)
        print(f"  [OK] Saved to {output_path}")

        # Summary
        subdom_count = len(yaml_data['subdomains'])
        item_count = sum(len(sub.get('items', [])) for sub in yaml_data['subdomains'].values())
        print(f"  [INFO] {subdom_count} subdomain(s), {item_count} item(s) total\n")

    print("[OK] Extraction complete!")


if __name__ == '__main__':
    main()
