#!/usr/bin/env python3
import sys
import glob
import yaml
import jsonschema
from pathlib import Path

def load_yaml(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def main():
    schema_path = Path('yaml/schema.yml')
    if not schema_path.exists():
        print(f"Schema file not found at {schema_path}", file=sys.stderr)
        sys.exit(1)
        
    schema = load_yaml(schema_path)
    
    yaml_files = glob.glob('yaml/*.yaml') + glob.glob('yaml/*.yml')
    # Filter out the schema itself
    yaml_files = [f for f in yaml_files if 'schema.yml' not in f and 'schema.yaml' not in f]
    
    has_errors = False
    
    print(f"Validating {len(yaml_files)} YAML files against {schema_path}...")
    
    for yaml_file in yaml_files:
        data = load_yaml(yaml_file)
        if not data:
            continue
            
        try:
            jsonschema.validate(instance=data, schema=schema)
        except jsonschema.exceptions.ValidationError as e:
            print(f"\n[FAIL] Validation failed for {yaml_file}:")
            print(f"  Path: {' -> '.join(str(p) for p in e.path)}")
            print(f"  Error: {e.message}")
            has_errors = True
            
    if has_errors:
        print("\n[FAIL] Validation failed! Please fix the errors above.")
        sys.exit(1)
    else:
        print("\n[OK] All YAML files passed validation!")
        
if __name__ == '__main__':
    main()
