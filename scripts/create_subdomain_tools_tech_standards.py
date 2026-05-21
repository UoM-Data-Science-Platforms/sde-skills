#!/usr/bin/env python3
"""
Create one YAML file per subdomain with tools, technologies, and standards all in one file.

Creates files named: safe_{domain-id}_{subdomain-id}_tools-tech-standards.yaml
"""

import os
import yaml
from pathlib import Path


def create_files(input_dir: str, output_dir: str) -> None:
    """Create one file per subdomain with tools, technologies, standards."""

    # Find all safe_*.yaml files in input (the regenerated full domain files)
    yaml_files = sorted(Path(input_dir).glob('safe_*.yaml'))

    for yaml_file in yaml_files:
        print(f"\nProcessing {yaml_file.name}...")

        with open(yaml_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        domain = data.get('domain', {})
        domain_id = domain.get('id', '')
        domain_name = domain.get('name', '')

        if not domain_id:
            print(f"  Skipping: no domain ID found")
            continue

        subdomains = domain.get('subdomains', {})

        for subdomain_key, subdomain_data in subdomains.items():
            subdomain_id = subdomain_data.get('id', subdomain_key)
            subdomain_name = subdomain_data.get('name', subdomain_key)

            tools = subdomain_data.get('tools', [])
            technologies = subdomain_data.get('technologies', [])
            standards = subdomain_data.get('standards', [])

            # Create one file per subdomain within the domain
            # Use domain_id as the filename, append all subdomains
            pass

        # After processing all subdomains, create one file per domain with all subdomains
        filename = f"{domain_id}_tools-tech-standards.yaml"
        filepath = os.path.join(output_dir, filename)

        subdomains_data = {}
        for subdomain_key, subdomain_data in subdomains.items():
            subdomain_id = subdomain_data.get('id', subdomain_key)
            subdomain_name = subdomain_data.get('name', subdomain_key)

            subdomains_data[subdomain_id] = {
                'name': subdomain_name,
                'tools': subdomain_data.get('tools', []),
                'technologies': subdomain_data.get('technologies', []),
                'standards': subdomain_data.get('standards', [])
            }

        data_to_write = {
            'domain': domain_name,
            'subdomains': subdomains_data
        }

        with open(filepath, 'w', encoding='utf-8') as f:
            yaml.dump(data_to_write, f, default_flow_style=False, allow_unicode=True)
        print(f"  + {filename}")


def main():
    """Main function."""
    input_dir = "local/yaml"
    output_dir = "local/yaml"

    if not os.path.isdir(input_dir):
        print(f"Error: Input directory '{input_dir}' not found")
        return

    os.makedirs(output_dir, exist_ok=True)
    create_files(input_dir, output_dir)
    print("\nDone!")


if __name__ == "__main__":
    main()
