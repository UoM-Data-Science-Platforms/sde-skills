#!/usr/bin/env python3
"""
Build script that merges tools/technologies/standards and training/qualifications into main domain YAML files.

Takes the separate tools-tech-standards and training-qualifications YAML files and inlines them into the
appropriate subdomain objects in the main domain YAML files, then outputs to
astro-app/public/data/.

Usage:
    python scripts/build_data.py
"""

import os
import yaml
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


def extract_domain_id(filename):
    """Extract domain ID from filename. E.g. safe_access_identity.yaml -> safe-access-identity"""
    basename = Path(filename).stem
    return basename.replace('_', '-')


def merge_yaml_data(domain_yaml, merge_yaml, keys, merge_type='subdomain'):
    """Merge keys from merge_yaml into domain_yaml at subdomain or competency level.

    Args:
        domain_yaml: Main domain YAML data
        merge_yaml: YAML data to merge in
        keys: List of keys to merge (e.g., ['items'] or ['qualifications', 'training_materials'])
        merge_type: 'subdomain' for tools/tech/standards, 'competency' for training/qualifications
    """
    merged = domain_yaml.copy()

    # Access the domain object
    if 'domain' in merged and 'subdomains' in merged['domain']:
        domain_subdomains = merged['domain']['subdomains']

        # Access merge_yaml structure
        if 'subdomains' in merge_yaml:
            merge_subdomains = merge_yaml['subdomains']

            # For each subdomain in the main domain YAML
            for subdomain_id, subdomain_data in domain_subdomains.items():
                # Find matching subdomain in merge_yaml
                if subdomain_id in merge_subdomains:
                    merge_sub = merge_subdomains[subdomain_id]

                    if merge_type == 'competency':
                        # Merge training/qualifications into competency levels
                        if 'competencies' in merge_sub and 'competencies' in subdomain_data:
                            for comp_id, comp_data in subdomain_data['competencies'].items():
                                if comp_id in merge_sub['competencies']:
                                    merge_comp = merge_sub['competencies'][comp_id]
                                    if 'levels' in comp_data and 'levels' in merge_comp:
                                        # Merge into each level
                                        for level_id, level_data in comp_data['levels'].items():
                                            if level_id in merge_comp['levels']:
                                                merge_level = merge_comp['levels'][level_id]
                                                for key in keys:
                                                    if key in merge_level:
                                                        level_data[key] = merge_level[key]
                    else:
                        # Merge at subdomain level (for tools/technologies/standards)
                        for key in keys:
                            if key in merge_sub:
                                subdomain_data[key] = merge_sub[key]

    return merged


def main():
    """Main build process."""
    local_yaml_dir = Path('yaml')
    output_dir = Path('astro-app/public/data')

    # Domain mapping: main YAML filename -> supporting files
    domain_files = [
        ('safe_access_identity.yaml', 'safe-access-identity_tools-tech-standards.yaml', 'safe-access-identity_training-qualifications.yaml'),
        ('safe_data_management.yaml', 'safe-data-management_tools-tech-standards.yaml', 'safe-data-management_training-qualifications.yaml'),
        ('safe_governance_compliance.yaml', 'safe-governance-compliance_tools-tech-standards.yaml', 'safe-governance-compliance_training-qualifications.yaml'),
        ('safe_outputs_disclosure_control.yaml', 'safe-outputs-disclosure-control_tools-tech-standards.yaml', 'safe-outputs-disclosure-control_training-qualifications.yaml'),
        ('safe_projects_operations.yaml', 'safe-projects-operations_tools-tech-standards.yaml', 'safe-projects-operations_training-qualifications.yaml'),
        ('safe_technology_engineering.yaml', 'safe-technology-engineering_tools-tech-standards.yaml', 'safe-technology-engineering_training-qualifications.yaml'),
    ]

    print(f"Loading YAML files from {local_yaml_dir}...")

    for domain_file, tech_file, training_file in domain_files:
        domain_path = local_yaml_dir / domain_file
        tech_path = local_yaml_dir / tech_file
        training_path = local_yaml_dir / training_file

        if not domain_path.exists():
            print(f"[SKIP] {domain_file}: file not found")
            continue

        # Load main domain YAML
        print(f"\nProcessing {domain_file}...")
        domain_data = load_yaml(domain_path)
        merged_data = domain_data

        # Merge tools/tech/standards if available
        if tech_path.exists():
            tech_data = load_yaml(tech_path)
            merged_data = merge_yaml_data(merged_data, tech_data, ['items'], merge_type='subdomain')
            print(f"  [OK] Merged tools/technologies/standards")
        else:
            print(f"  [SKIP] {tech_file} not found")

        # Merge training/qualifications if available
        if training_path.exists():
            training_data = load_yaml(training_path)
            merged_data = merge_yaml_data(merged_data, training_data, ['qualifications', 'training_materials'], merge_type='competency')
            print(f"  [OK] Merged qualifications/training_materials")
        else:
            print(f"  [SKIP] {training_file} not found")

        # Save to output directory
        output_path = output_dir / domain_file
        save_yaml(output_path, merged_data)
        print(f"  [OK] Saved to {output_path}")

    print("\n[OK] Build complete! Data files ready in astro-app/public/data/")


if __name__ == '__main__':
    main()
