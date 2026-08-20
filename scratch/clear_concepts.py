import yaml, glob, os

def clear_yaml(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    domain_block = data.get('domain', {})
    subdomains = domain_block.get('subdomains', {})
    for sub_id, sub_data in subdomains.items():
        competencies = sub_data.get('competencies', {})
        for comp_id, comp_data in competencies.items():
            levels = comp_data.get('levels', {})
            for level_name, level_data in levels.items():
                if 'core_concepts' in level_data:
                    del level_data['core_concepts']
                if 'qualifications' in level_data:
                    del level_data['qualifications']
                if 'training_materials' in level_data:
                    del level_data['training_materials']

    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

for file in glob.glob('yaml/safe_*.yaml'):
    clear_yaml(file)
    print(f"Cleared {file}")
