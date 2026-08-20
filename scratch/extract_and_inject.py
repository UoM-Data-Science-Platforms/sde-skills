import json, re, glob, yaml, os

MASTER_DATA = {}
transcript_path = r'C:\Users\mbrxset3\.gemini\antigravity\brain\401276e9-8712-4d37-a06a-90144e22a174\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            # The system messages from subagents are delivered as SYSTEM_MESSAGE
            # Wait, no, they are delivered as MODEL message with tool calls?
            # No, they are delivered as SYSTEM_MESSAGE in the transcript because it's a notification from the system.
            if step.get('type') == 'SYSTEM_MESSAGE':
                content = step.get('content', '')
                if 'mapping_domain' in content or 'DATA =' in content:
                    match = re.search(r'```python\n(.*?)```', content, re.DOTALL)
                    if match:
                        code = match.group(1)
                        local_vars = {}
                        exec(code, globals(), local_vars)
                        if 'DATA' in local_vars:
                            MASTER_DATA.update(local_vars['DATA'])
        except Exception as e:
            pass

print(f"Extracted {len(MASTER_DATA)} competencies from subagent messages.")

def process_yaml(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    domain_block = data.get('domain', {})
    subdomains = domain_block.get('subdomains', {})
    modified = False
    
    for sub_id, sub_data in subdomains.items():
        competencies = sub_data.get('competencies', {})
        for comp_id, comp_data in competencies.items():
            if comp_id in MASTER_DATA:
                levels = comp_data.get('levels', {})
                for level_name, level_data in levels.items():
                    if level_name in MASTER_DATA[comp_id]:
                        if "core_concepts" in MASTER_DATA[comp_id][level_name]:
                            level_data["core_concepts"] = MASTER_DATA[comp_id][level_name]["core_concepts"]
                        if "qualifications" in MASTER_DATA[comp_id][level_name]:
                            level_data["qualifications"] = MASTER_DATA[comp_id][level_name]["qualifications"]
                        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
        print(f"Updated {os.path.basename(filepath)}")

for file in glob.glob('yaml/safe_*.yaml'):
    process_yaml(file)
