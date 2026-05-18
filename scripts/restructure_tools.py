#!/usr/bin/env python3
"""
Restructure SAFE markdown files to split Tools/Technologies/Standards at competency level.

Parses competency sections, extracts items from existing Technologies/Tools sections
and inline proficiency references, classifies them, and rewrites markdown with
structured #### subsections.
"""

import os
import re
import sys
from pathlib import Path
from typing import Dict, List


def extract_inline_refs(text: str) -> List[str]:
    """Extract items that follow 'e.g.' or 'e.g.' patterns."""
    items = []
    pattern = r'e\.g\.?\s+([^).\n]+)'
    for match in re.finditer(pattern, text, re.IGNORECASE):
        content = match.group(1).strip()
        if content:
            parts = [p.strip() for p in content.split(',')]
            items.extend([p for p in parts if p])
    return items


def deduplicate(items: List[str]) -> List[str]:
    """Remove duplicates (case-insensitive), preserving order."""
    seen = set()
    result = []
    for item in items:
        lower = item.lower().strip()
        if lower and lower not in seen:
            seen.add(lower)
            result.append(item)
    return result


def classify_items(items: List[str]) -> Dict[str, List[str]]:
    """Classify items into Tools, Technologies, and Standards."""
    standards_patterns = [
        'iso', 'gdpr', 'hipaa', 'fips', 'owasp', 'nist', 'cis', 'dspt',
        'caldicott', 'pci', 'sox', 'hitrust', 'annex', 'principle',
        'directive', 'regulation'
    ]

    tool_patterns = [
        'jira', 'splunk', 'github', 'gitlab', 'jenkins', 'terraform',
        'ansible', 'docker', 'kubernetes', 'helm', 'aws', 'azure', 'gcp',
        'vault', 'prometheus', 'grafana', 'elasticsearch', 'servicenow',
        'salesforce', 'zendesk', 'confluence', 'sharepoint', 'trello',
        'slack', 'zoom', 'miro', 'nessus', 'postman', 'redcap',
        'rstudio', 'jupyter', 'moodle', 'camunda', 'airflow',
        'pagerduty', 'opsgenie', 'coupa', 'ariba', 'sap', 'veeam',
        'artifactory', 'nexus', 'sonarqube', 'snyk'
    ]

    technology_patterns = [
        'oauth', 'oidc', 'jwt', 'kerberos', 'ldap', 'saml', 'rest',
        'kafka', 'redis', 'mongodb', 'postgresql', 'mysql', 'oracle',
        'aes', 'rsa', 'tls', 'ssl', 'ssh', 'vpn', 'sso', 'mfa',
        'api', 'sdk', 'cli', 'http', 'protocol', 'encryption',
        'python', 'java', 'javascript', 'go', 'rust', 'fhir', 'omop',
        'hl7', 'etl', 'spark', 'containers', 'microservice', 'serverless',
        'sdn', 'vlan', 'xml', 'json', 'csv', 'graphql', 'grpc'
    ]

    tools = []
    technologies = []
    standards = []

    for item in items:
        item_lower = item.lower()
        item_clean = item.strip()

        if not item_clean:
            continue

        # Filter out vague concepts
        if any(v in item_lower for v in [
            'awareness', 'strategies', 'governance', 'modernization',
            'initiatives', 'enterprise ', 'support', 'process',
            'management', 'implementation', 'framework'
        ]):
            continue

        classified = False

        # Standards first (highest specificity)
        for kw in standards_patterns:
            if kw in item_lower:
                standards.append(item_clean)
                classified = True
                break

        if not classified:
            for kw in tool_patterns:
                if kw in item_lower:
                    tools.append(item_clean)
                    classified = True
                    break

        if not classified:
            for kw in technology_patterns:
                if kw in item_lower:
                    technologies.append(item_clean)
                    classified = True
                    break

        if not classified:
            technologies.append(item_clean)

    return {
        "tools": deduplicate(tools),
        "technologies": deduplicate(technologies),
        "standards": deduplicate(standards),
    }


def build_structured_section(classifications: Dict[str, List[str]]) -> str:
    """Build the #### Tools/Technologies/Standards markdown."""
    sections = []

    if classifications.get("tools"):
        items_text = "\n".join(f"- {item}" for item in classifications["tools"])
        sections.append(f"#### Tools\n\n{items_text}")

    if classifications.get("technologies"):
        items_text = "\n".join(f"- {item}" for item in classifications["technologies"])
        sections.append(f"#### Technologies\n\n{items_text}")

    if classifications.get("standards"):
        items_text = "\n".join(f"- {item}" for item in classifications["standards"])
        sections.append(f"#### Standards\n\n{items_text}")

    return "\n\n" + "\n\n".join(sections) + "\n" if sections else ""


def process_file(filepath: str) -> None:
    """Process a single SAFE markdown file."""
    print(f"\nProcessing {Path(filepath).name}...")

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Process each competency
    # Pattern: ### Title ... (description) ... === Level1 ... === Level2 ... === Level3 ... ## Tools section (if exists) ... ### NextCompetency

    # Find all competencies with their tools sections
    comp_pattern = r'^### (.+?)$\n(.*?)(?=^### |\Z)'
    new_content = content

    for match in re.finditer(comp_pattern, content, re.MULTILINE | re.DOTALL):
        comp_title = match.group(1).strip()
        comp_body = match.group(2)

        print(f"  {comp_title}...", end=" ")

        # Extract existing tools section
        tools_pattern = r'\n## Technologies/Tools\n\n(.+?)(?=\n###|\n##|\Z)'
        tools_match = re.search(tools_pattern, comp_body, re.DOTALL)
        tools_text = tools_match.group(1).strip() if tools_match else ""

        # Extract inline refs from level bullets
        level_pattern = r'=== "[^"]*".*?\n(.*?)(?=\n===|\n##|\Z)'
        bullets_text = "\n".join(m.group(1) for m in re.finditer(level_pattern, comp_body, re.DOTALL))

        # Collect all items
        all_items = []
        if tools_text:
            for item in tools_text.split(","):
                item = item.strip()
                if item and not item.endswith("."):
                    all_items.append(item)

        all_items.extend(extract_inline_refs(bullets_text))
        all_items = deduplicate(all_items)

        if all_items:
            print(f"{len(all_items)} items")
            classifications = classify_items(all_items)

            # Build replacement: remove old tools section, add new structured sections
            comp_body_clean = re.sub(
                r'\n## Technologies/Tools\n\n.+?(?=\n###|\n##|\Z)',
                "",
                comp_body,
                flags=re.DOTALL,
            )

            # Find where to insert (after last === block, before next ### or ##)
            last_level = None
            for level_match in re.finditer(r'=== "[^"]*".*?\n(.*?)(?=\n===|\Z)', comp_body_clean, re.DOTALL):
                last_level = level_match

            if last_level:
                insert_marker = last_level.group(0)
                # Find the end of this level block
                level_end = re.search(r'\n(?===|\n##|\Z)', comp_body_clean[last_level.start():])
                if level_end:
                    insert_pos = last_level.start() + level_end.end()
                    comp_body_final = (
                        comp_body_clean[:insert_pos] +
                        build_structured_section(classifications) +
                        comp_body_clean[insert_pos:]
                    )
                else:
                    comp_body_final = comp_body_clean + build_structured_section(classifications)
            else:
                comp_body_final = comp_body_clean + build_structured_section(classifications)

            # Replace in content
            old_section = match.group(0)
            new_section = f"### {comp_title}\n{comp_body_final}"
            new_content = new_content.replace(old_section, new_section, 1)
        else:
            print("no items")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  + Saved {filepath}")


def main():
    """Process all SAFE markdown files."""
    if len(sys.argv) > 1:
        for filepath in sys.argv[1:]:
            if os.path.isfile(filepath):
                process_file(filepath)
            else:
                print(f"File not found: {filepath}")
    else:
        framework_dir = "docs/competency_framework"
        if not os.path.isdir(framework_dir):
            print(f"Error: {framework_dir} not found")
            sys.exit(1)

        safe_files = sorted(
            f for f in os.listdir(framework_dir) if f.startswith("safe_") and f.endswith(".md")
        )
        if not safe_files:
            print(f"No safe_*.md files found in {framework_dir}")
            sys.exit(1)

        for filename in safe_files:
            process_file(os.path.join(framework_dir, filename))

        print(f"\nProcessed {len(safe_files)} files")


if __name__ == "__main__":
    main()
