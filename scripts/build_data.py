#!/usr/bin/env python3
"""Validate and compile framework YAML and SATRE JSON.

Merge supporting material into public domain files; derive SATRE display labels
and parent relationships from the unmodified canonical domain definitions.

Usage:
    python scripts/build_data.py
"""

import os
import yaml
import copy
from pathlib import Path
from validate_yml import validate, load_yaml
from satre_data import compile_satre
import json


def save_yaml(filepath, data):
    """Save data to YAML file with clean formatting."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        yaml.dump(
            data,
            f,
            default_flow_style=False,
            sort_keys=False,
            allow_unicode=True,
            width=120,
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


def main(
    local_yaml_dir=Path("yaml"),
    output_dir=Path("astro-app/public/data"),
    src_data_dir=Path("astro-app/src/data"),
):
    """Main build process."""
    errors, _, _ = validate(local_yaml_dir)
    if errors:
        raise ValueError(
            "Data validation failed before generation:\n" + "\n".join(errors)
        )

    main_domain_files = [
        "safe_access_identity.yaml",
        "safe_data_management.yaml",
        "safe_governance_compliance.yaml",
        "safe_outputs_disclosure_control.yaml",
        "safe_projects_operations.yaml",
        "safe_technology_engineering.yaml",
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
        all_domains[merged_data["domain"]["id"]] = copy.deepcopy(merged_data["domain"])

        # Merge all supplemental files matching this domain (.yaml and .yml)
        prefix = domain_file.replace(".yaml", "").replace("_", "-") + "_"
        supp_files = list(local_yaml_dir.glob(f"{prefix}*.yaml")) + list(
            local_yaml_dir.glob(f"{prefix}*.yml")
        )

        for supp_path in supp_files:
            print(f"  [MERGE] Found supplemental file: {supp_path.name}")
            tech_data = load_yaml(supp_path)

            if (
                "subdomains" in tech_data
                and "domain" in merged_data
                and "subdomains" in merged_data["domain"]
            ):
                if "domain" not in tech_data or "subdomains" not in tech_data.get(
                    "domain", {}
                ):
                    tech_data.setdefault("domain", {})
                    tech_data["domain"]["subdomains"] = tech_data.pop("subdomains")

            merged_data = deep_merge(merged_data, tech_data)

        # Save domain to output directory
        output_path = output_dir / domain_file
        save_yaml(output_path, merged_data)
        print(f"  [OK] Saved merged domain to {output_path}")

    print("\nProcessing SATRE Mappings...")
    satre_path = local_yaml_dir / "satre_mapping.yaml"
    if satre_path.exists():
        satre_data = load_yaml(satre_path)
        satre_data = compile_satre(satre_data, all_domains)

        src_data_dir.mkdir(parents=True, exist_ok=True)
        json_path = src_data_dir / "satre_mapping.json"
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(satre_data, f, indent=2)
        print(f"  [OK] Saved SATRE mapping to {json_path}")
    print("\n[OK] Build complete! Data files ready in astro-app/public/data/")


if __name__ == "__main__":
    main()
