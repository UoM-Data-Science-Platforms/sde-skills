import yaml, glob, os

TARGETED_DATA = {
    "software-development-lifecycle": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "Source Control & Collaboration",
                    "concepts": "Version control fundamentals, forking, branching, committing, and pushing.",
                    "search_terms": [
                        "How to resolve git merge conflicts",
                        "Trunk-based development vs GitFlow",
                        "Why reproducible environments matter in research"
                    ],
                    "why": "Forms the foundation of modern, collaborative Research Software Engineering (RSE)."
                }
            ]
        }
    },
    "cloud-infrastructure-management": {
        "mid": {
            "core_concepts": [
                {
                    "topic": "Infrastructure as Code (IaC)",
                    "concepts": "Declarative vs. Imperative provisioning, idempotency, state file management.",
                    "search_terms": [
                        "Idempotency in cloud provisioning",
                        "Declarative infrastructure principles",
                        "Terraform state management best practices"
                    ],
                    "why": "Ensures engineers understand the 'why' behind tools like Terraform, leading to highly secure and auditable SDE platforms."
                }
            ],
            "qualifications": [
                {
                    "name": "HashiCorp Certified: Terraform Associate",
                    "issuer": "HashiCorp",
                    "description": "Validates Infrastructure as Code (IaC) skills critical for reproducible, auditable environments.",
                    "career_impact": "Essential for infrastructure automation."
                }
            ]
        }
    },
    "containerisation-orchestration": {
        "mid": {
            "core_concepts": [
                {
                    "topic": "Containerization Fundamentals",
                    "concepts": "Container isolation (namespaces/cgroups), images vs containers, container registries.",
                    "search_terms": [
                        "How container namespaces and cgroups work",
                        "Docker multi-stage builds",
                        "Kubernetes pods vs containers"
                    ],
                    "why": "Crucial for securely isolating and scaling researcher workloads."
                }
            ],
            "qualifications": [
                {
                    "name": "Certified Kubernetes Administrator (CKA)",
                    "issuer": "CNCF",
                    "description": "Hardcore verification of ability to deploy, manage, and secure containerized research workloads.",
                    "career_impact": "Highly sought after for modern cloud-native SDEs."
                }
            ]
        }
    },
    "code-documentation-reusability": {
        "mid": {
            "core_concepts": [
                {
                    "topic": "Technical Documentation",
                    "concepts": "Docstrings, Markdown structure, Architecture Decision Records (ADRs), API specification.",
                    "search_terms": [
                        "How to write Architecture Decision Records (ADRs)",
                        "OpenAPI Swagger specification best practices",
                        "Self-documenting code principles"
                    ],
                    "why": "Essential for ensuring research code and SDE infrastructure can be maintained and reused across institutions."
                }
            ]
        }
    }
}

def process_targeted(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    domain_block = data.get('domain', {})
    subdomains = domain_block.get('subdomains', {})
    modified = False
    
    for sub_id, sub_data in subdomains.items():
        competencies = sub_data.get('competencies', {})
        for comp_id, comp_data in competencies.items():
            if comp_id in TARGETED_DATA:
                levels = comp_data.get('levels', {})
                for level_name, level_data in levels.items():
                    if level_name in TARGETED_DATA[comp_id]:
                        if "core_concepts" in TARGETED_DATA[comp_id][level_name]:
                            level_data["core_concepts"] = TARGETED_DATA[comp_id][level_name]["core_concepts"]
                        if "qualifications" in TARGETED_DATA[comp_id][level_name]:
                            level_data["qualifications"] = TARGETED_DATA[comp_id][level_name]["qualifications"]
                        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

for file in glob.glob('yaml/safe_*.yaml'):
    process_targeted(file)
