import os
import yaml
import sys

# Import everything from aggregate_by_domain
sys.path.append('scratch')
from aggregate_by_domain import DOMAINS, community_set, get_standards_stat, get_dare_stat, get_job_stat, get_radar_stat

YAML_FILES = {
    "access-identity": "yaml/safe-access-identity_tools-tech-standards.yaml",
    "data-management": "yaml/safe-data-management_tools-tech-standards.yaml",
    "governance-compliance": "yaml/safe-governance-compliance_tools-tech-standards.yaml",
    "outputs-disclosure-control": "yaml/safe-outputs-disclosure-control_tools-tech-standards.yaml",
    "projects-operations": "yaml/safe-projects-operations_tools-tech-standards.yaml",
    "technology-engineering": "yaml/safe-technology-engineering_tools-tech-standards.yaml"
}

def build_new_items(sub_id, items_list, role_desc):
    new_items = []
    for itm in sorted(items_list, key=lambda s: s.lower()):
        # Community
        is_comm = (sub_id, itm.lower()) in community_set or any(c[1] == itm.lower() for c in community_set)
        
        # Standards
        stds = get_standards_stat(itm)
        
        # DARE
        dares = get_dare_stat(itm)
        
        # Jobs
        j_stat = get_job_stat(itm)
        
        # Radars
        r_stat = get_radar_stat(itm)
        
        item_obj = {
            "name": itm,
            "role": role_desc, # We can assign the subdomain role here
            "sources": {
                "community": is_comm,
                "standards": {
                    "count": len(stds),
                    "mentions": stds
                },
                "projects": {
                    "count": len(dares),
                    "mentions": dares
                },
                "jobs": {
                    "total": j_stat["total"],
                    "entry": j_stat["jr"],
                    "mid": j_stat["mid"],
                    "senior": j_stat["snr"]
                },
                "radars": {
                    "score": r_stat["score"],
                    "status": r_stat["status"]
                }
            }
        }
        new_items.append(item_obj)
    return new_items

for dom in DOMAINS:
    dom_id = dom["id"]
    yaml_path = YAML_FILES.get(dom_id)
    
    if not yaml_path or not os.path.exists(yaml_path):
        print(f"Skipping {dom_id}, file not found")
        continue
        
    with open(yaml_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    if not data or 'subdomains' not in data:
        continue
        
    for sub in dom["subdomains"]:
        sub_id = sub["id"]
        if sub_id in data["subdomains"]:
            new_items = build_new_items(sub_id, sub["items"], sub["role"])
            data["subdomains"][sub_id]["items"] = new_items
            
    with open(yaml_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

print("YAML files migrated to new schema.")
