#!/usr/bin/env python3
"""
Build script that merges supplemental yamls (tools, qualifications, etc.) into main domain YAML files
and dynamically compiles skills_index.yaml.

Takes the separate supplemental YAML files and inlines them into the
appropriate objects in the main domain YAML files, then outputs to
astro-app/public/data/. It also compiles all skills into a unified skills_index.yaml
serving the index page.

Usage:
    python scripts/build_data.py
"""

import os
import yaml
import copy
from pathlib import Path


def load_yaml(filepath):
    """Load YAML file and return parsed content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


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


def deep_merge(dict1, dict2):
    """Recursively deep merge dict2 into dict1."""
    if not isinstance(dict1, dict) or not isinstance(dict2, dict):
        return dict2
    
    merged = copy.deepcopy(dict1)
    for k, v in dict2.items():
        if k in merged and isinstance(merged[k], dict) and isinstance(v, dict):
            merged[k] = deep_merge(merged[k], v)
        else:
            merged[k] = copy.deepcopy(v)
    return merged


def generate_skills_index(domain_data_list):
    """Compile a unified skills_index.yaml containing all skills across all domains."""
    skills_map = {}
    total_subdomains = 0
    total_competencies = 0
    total_skills = 0

    # Sort domain files to have a deterministic order of generation (e.g. by index or filename)
    sorted_domains = sorted(
        domain_data_list,
        key=lambda d: d.get('domain', {}).get('index', 0)
    )

    for domain_data in sorted_domains:
        domain = domain_data.get('domain', {})
        domain_id = domain.get('id', '')
        subdomains = domain.get('subdomains', {})
        total_subdomains += len(subdomains)

        for subdomain_id, subdomain_data in subdomains.items():
            competencies = subdomain_data.get('competencies', {})
            total_competencies += len(competencies)

            for competency_id, competency_data in competencies.items():
                levels = competency_data.get('levels', {})
                for level_id, level_data in levels.items():
                    level_name = level_data.get('name', '')
                    skills = level_data.get('skills', [])
                    for idx, skill_text in enumerate(skills):
                        skill_id = f"{competency_id}-{level_id}-{idx+1:03d}"
                        skills_map[skill_id] = {
                            'id': skill_id,
                            'text': skill_text,
                            'competency_id': competency_id,
                            'level': level_id,
                            'level_name': level_name,
                            'domain_id': domain_id,
                            'subdomain_id': subdomain_id
                        }
                        total_skills += 1

    return {
        'metadata': {
            'version': '1.0',
            'generated_from': 'domain yaml files',
            'total_domains': len(domain_data_list),
            'total_subdomains': total_subdomains,
            'total_competencies': total_competencies,
            'total_skills': total_skills
        },
        'skills': skills_map
    }


def main():
    """Main build process."""
    local_yaml_dir = Path('yaml')
    output_dir = Path('astro-app/public/data')

    main_domain_files = [
        'safe_access_identity.yaml',
        'safe_data_management.yaml',
        'safe_governance_compliance.yaml',
        'safe_outputs_disclosure_control.yaml',
        'safe_projects_operations.yaml',
        'safe_technology_engineering.yaml',
    ]

    print(f"Loading YAML files from {local_yaml_dir}...")
    compiled_domains = []

    for domain_file in main_domain_files:
        domain_path = local_yaml_dir / domain_file

        if not domain_path.exists():
            print(f"[SKIP] {domain_file}: file not found")
            continue

        print(f"\nProcessing {domain_file}...")
        merged_data = load_yaml(domain_path)

        # Merge all supplemental files matching this domain (.yaml and .yml)
        prefix = domain_file.replace('.yaml', '').replace('_', '-') + '_'
        supp_files = list(local_yaml_dir.glob(f"{prefix}*.yaml")) + list(local_yaml_dir.glob(f"{prefix}*.yml"))
        
        for supp_path in supp_files:
            print(f"  [MERGE] Found supplemental file: {supp_path.name}")
            tech_data = load_yaml(supp_path)
            
            if 'subdomains' in tech_data and 'domain' in merged_data and 'subdomains' in merged_data['domain']:
                if 'domain' not in tech_data or 'subdomains' not in tech_data.get('domain', {}):
                    tech_data.setdefault('domain', {})
                    tech_data['domain']['subdomains'] = tech_data.pop('subdomains')
                    
            merged_data = deep_merge(merged_data, tech_data)

        # Add to collection for skills_index.yaml compiling
        compiled_domains.append(merged_data)

        # Save domain to output directory
        output_path = output_dir / domain_file
        save_yaml(output_path, merged_data)
        print(f"  [OK] Saved merged domain to {output_path}")

    # Compile and save skills_index.yaml
    if compiled_domains:
        print("\nCompiling skills_index.yaml...")
        skills_index_data = generate_skills_index(compiled_domains)
        skills_index_path = output_dir / 'skills_index.yaml'
        save_yaml(skills_index_path, skills_index_data)
        print(f"  [OK] Saved skills index to {skills_index_path}")
        print(f"  [INFO] Compiled {skills_index_data['metadata']['total_skills']} skills across "
              f"{skills_index_data['metadata']['total_domains']} domains.")

    print("\n[OK] Build complete! Data files ready in astro-app/public/data/")


if __name__ == '__main__':
    main()
