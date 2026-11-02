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



def main():
    """Main build process."""
    local_yaml_dir = Path('yaml')
    output_dir = Path('astro-app/public/data')
    src_data_dir = Path('astro-app/src/data')

    main_domain_files = [
        'safe_access_identity.yaml',
        'safe_data_management.yaml',
        'safe_governance_compliance.yaml',
        'safe_outputs_disclosure_control.yaml',
        'safe_projects_operations.yaml',
        'safe_technology_engineering.yaml',
    ]

    print(f"Loading YAML files from {local_yaml_dir}...")
    
    all_domains = {}

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



        # Save domain to output directory
        output_path = output_dir / domain_file
        save_yaml(output_path, merged_data)
        print(f"  [OK] Saved merged domain to {output_path}")
        
        if 'domain' in merged_data:
            all_domains[merged_data['domain']['id']] = merged_data['domain']


    print("\nProcessing SATRE Mappings...")
    satre_path = local_yaml_dir / 'satre_mapping.yaml'
    if satre_path.exists():
        satre_data = load_yaml(satre_path)
        warnings_count = 0
        
        for pillar in satre_data.get('pillars', []):
            for comp in pillar.get('components', []):
                if 'mappings' not in comp or not comp['mappings']:
                    continue
                # mappings is {domain_id: {subdomain_id: [competency_ids]}}
                for d_id, s_map in list(comp['mappings'].items()):
                    if d_id not in all_domains:
                        print(f"  [WARNING] SATRE {comp['id']}: Domain '{d_id}' not found in framework.")
                        warnings_count += 1
                        continue
                    
                    for s_id, competencies in list(s_map.items()):
                        if s_id not in all_domains[d_id].get('subdomains', {}):
                            print(f"  [WARNING] SATRE {comp['id']}: Subdomain '{s_id}' not found in domain '{d_id}'.")
                            warnings_count += 1
                            continue
                        
                        valid_comps = all_domains[d_id]['subdomains'][s_id].get('competencies', {})
                        for c_id in competencies:
                            if c_id not in valid_comps:
                                print(f"  [WARNING] SATRE {comp['id']}: Competency '{c_id}' not found in subdomain '{s_id}'.")
                                warnings_count += 1
        
        import json
        
        # Hardcode domain metadata for frontend since it's UI specific
        domain_metadata = {
            'ste': {'color': 'var(--color-nhs-blue)', 'span': 4},
            'sdm': {'color': 'var(--color-purple)', 'span': 4},
            'sai': {'color': 'var(--color-deep-blue)', 'span': 3},
            'sod': {'color': 'var(--color-deep-blue)', 'span': 3},
            'spo': {'color': 'var(--color-purple)', 'span': 3},
            'sgc': {'color': 'var(--color-nhs-blue)', 'span': 4},
        }
        
        out_domains = []
        out_subdomains = []
        
        for d_id, d_data in all_domains.items():
            meta = domain_metadata.get(d_id, {'color': 'var(--color-text)', 'span': 3})
            out_domains.append({
                'id': d_id,
                'name': d_data.get('name', d_id),
                'color': meta['color'],
                'span': meta['span']
            })
            
            for s_id, s_data in d_data.get('subdomains', {}).items():
                out_subdomains.append({
                    'id': s_id,
                    'domain': d_data.get('name', d_id),
                    'domainId': d_id,
                    'name': s_data.get('name', s_id),
                    'color': meta['color']
                })
        
        satre_data['domains'] = out_domains
        satre_data['subdomains'] = out_subdomains

        src_data_dir.mkdir(parents=True, exist_ok=True)
        json_path = src_data_dir / 'satre_mapping.json'
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(satre_data, f, indent=2)
        print(f"  [OK] Saved SATRE mapping to {json_path}")
        if warnings_count > 0:
            print(f"  [WARN] Found {warnings_count} broken/missing mappings in satre_mapping.yaml")
    
    print("\n[OK] Build complete! Data files ready in astro-app/public/data/")

if __name__ == '__main__':
    main()
