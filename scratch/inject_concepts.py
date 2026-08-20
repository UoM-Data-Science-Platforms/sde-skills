import yaml
import glob
import os

CONCEPTS_DATA = {
    "safe_access_identity.yaml": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "Foundational Identity & Authentication",
                    "concepts": "Authentication vs. Authorization, password hashing, Multi-Factor Authentication (MFA) factors, Principle of Least Privilege (PoLP).",
                    "search_terms": [
                        "Difference between authentication and authorization",
                        "How MFA push notifications work",
                        "Principle of least privilege implementation"
                    ],
                    "why": "Essential theoretical baseline for provisioning user accounts securely."
                }
            ]
        },
        "mid": {
            "core_concepts": [
                {
                    "topic": "Federated Identity & SSO Protocols",
                    "concepts": "SAML 2.0 assertions, OAuth 2.0 grant types, OpenID Connect (OIDC) JWT tokens, IdP vs. SP, SCIM provisioning.",
                    "search_terms": [
                        "How SAML authentication flow works",
                        "OAuth 2.0 authorization code grant explained",
                        "JWT token structure and validation"
                    ],
                    "why": "Required for integrating research platforms across different university and NHS organizational boundaries."
                }
            ]
        },
        "senior": {
            "core_concepts": [
                {
                    "topic": "Zero Trust Architecture & Advanced Authorization",
                    "concepts": "Attribute-Based Access Control (ABAC), Policy-as-Code, micro-segmentation, continuous authentication.",
                    "search_terms": [
                        "Zero Trust network architecture principles",
                        "RBAC vs ABAC policy design",
                        "Implementing Policy as Code with OPA"
                    ],
                    "why": "Necessary for designing the overarching security posture of an SDE where perimeter defense is no longer sufficient."
                }
            ]
        }
    },
    "safe_data_management.yaml": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "Data Tidying & Relational Fundamentals",
                    "concepts": "Tabular data structures, relational database normalization (1NF, 2NF, 3NF), basic SQL querying, checksums/hashing for integrity.",
                    "search_terms": [
                        "Database normalization explained",
                        "How to use SHA-256 for file integrity",
                        "Tidy data principles"
                    ],
                    "why": "The foundational skills required before interacting with massive healthcare datasets."
                }
            ]
        },
        "mid": {
            "core_concepts": [
                {
                    "topic": "Data Engineering & Pipeline Orchestration",
                    "concepts": "Extract, Transform, Load (ETL) vs. ELT, idempotent data pipelines, Directed Acyclic Graphs (DAGs), data warehousing vs. data lakes.",
                    "search_terms": [
                        "Designing idempotent ETL pipelines",
                        "What is a DAG in data orchestration",
                        "Data lake vs Data warehouse architecture"
                    ],
                    "why": "Crucial for building automated, reliable clinical data flows (like OMOP or FHIR harmonization)."
                }
            ]
        },
        "senior": {
            "core_concepts": [
                {
                    "topic": "FAIR Principles & Metadata Governance",
                    "concepts": "Findable, Accessible, Interoperable, and Reusable (FAIR) principles, ontological mapping, active metadata cataloguing, data lineage tracking.",
                    "search_terms": [
                        "Implementing FAIR data principles in healthcare",
                        "Data lineage and provenance tracking architectures",
                        "Semantic interoperability using clinical ontologies"
                    ],
                    "why": "Essential for ensuring national SDE networks can federate and discover datasets consistently."
                }
            ]
        }
    },
    "safe_governance_compliance.yaml": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "Baseline Information Governance & Privacy",
                    "concepts": "The Five Safes framework, PII vs. De-identified data, Caldicott Principles, basic data protection laws (UK GDPR).",
                    "search_terms": [
                        "Understanding the Five Safes framework",
                        "The Caldicott Principles explained",
                        "UK GDPR key principles for data processing"
                    ],
                    "why": "Mandatory baseline knowledge for legally and ethically interacting with patient or citizen data."
                }
            ]
        },
        "mid": {
            "core_concepts": [
                {
                    "topic": "Risk Assessment & Compliance Operations",
                    "concepts": "Data Protection Impact Assessments (DPIAs), risk registers, threat modeling (STRIDE), incident severity classification, DSAs.",
                    "search_terms": [
                        "How to conduct a DPIA",
                        "STRIDE threat modeling methodology",
                        "Drafting a Data Sharing Agreement"
                    ],
                    "why": "Required to operationalize compliance, ensuring that new SDE features are legally and securely reviewed before deployment."
                }
            ]
        },
        "senior": {
            "core_concepts": [
                {
                    "topic": "Enterprise Security Frameworks & ISMS",
                    "concepts": "Information Security Management System (ISMS) design, ISO/IEC 27001 controls (Annex A), continuous compliance auditing, NHS DSPT overarching strategy.",
                    "search_terms": [
                        "How to implement an ISMS",
                        "ISO 27001 Annex A controls overview",
                        "Continuous compliance monitoring architectures"
                    ],
                    "why": "Required to lead the SDE's security strategy and successfully pass external national audits."
                }
            ]
        }
    },
    "safe_outputs_disclosure_control.yaml": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "Tabular Data Anonymisation",
                    "concepts": "Primary vs. secondary suppression, the Rule of 10, dominance metrics, p-percent rule, basic cell rounding.",
                    "search_terms": [
                        "Statistical disclosure control primary suppression",
                        "How dominance rules work in microdata",
                        "Applying the rule of 10 in health data"
                    ],
                    "why": "These are the foundational mathematical rules applied daily when reviewing researcher exports."
                }
            ]
        },
        "mid": {
            "core_concepts": [
                {
                    "topic": "Microdata Perturbation & Advanced SDC",
                    "concepts": "k-anonymity, l-diversity, t-closeness, synthetic data generation, noise addition.",
                    "search_terms": [
                        "k-anonymity vs l-diversity vs t-closeness",
                        "How to evaluate synthetic data utility vs privacy",
                        "Perturbation techniques in microdata"
                    ],
                    "why": "Necessary for assessing complex, row-level dataset extracts and using automated SDC tools."
                }
            ]
        },
        "senior": {
            "core_concepts": [
                {
                    "topic": "Privacy Enhancing Technologies (PETs)",
                    "concepts": "Differential Privacy (epsilon, delta budgets), Federated Learning, Homomorphic Encryption, automated airlock governance.",
                    "search_terms": [
                        "Understanding differential privacy epsilon budget",
                        "Federated learning architecture in healthcare",
                        "Practical applications of homomorphic encryption"
                    ],
                    "why": "Positions the SDE leader at the forefront of modern automated, cryptographically secure disclosure control."
                }
            ]
        }
    },
    "safe_projects_operations.yaml": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "IT Service Management Fundamentals",
                    "concepts": "Incident vs. Problem vs. Request management, ticketing lifecycles, SLAs, basic Kanban/Scrum ceremonies.",
                    "search_terms": [
                        "ITIL incident vs problem management",
                        "Understanding Service Level Agreements (SLAs)",
                        "Kanban board flow efficiency"
                    ],
                    "why": "Ensures junior engineers understand how to operate within a structured, auditable support desk environment."
                }
            ]
        },
        "mid": {
            "core_concepts": [
                {
                    "topic": "Agile Delivery & Change Control",
                    "concepts": "Change Advisory Boards (CAB), continuous delivery, sprint planning, user story mapping, major incident response.",
                    "search_terms": [
                        "How a Change Advisory Board operates",
                        "User story mapping techniques",
                        "Major Incident Management process flow"
                    ],
                    "why": "Essential for managing safe, auditable updates to the SDE without causing downtime or security breaches."
                }
            ]
        },
        "senior": {
            "core_concepts": [
                {
                    "topic": "Operational Excellence & Value Streams",
                    "concepts": "Lean operations, Value Stream Mapping (VSM), Site Reliability Engineering (SRE) error budgets, cost optimization (FinOps).",
                    "search_terms": [
                        "Value Stream Mapping for IT operations",
                        "Site Reliability Engineering error budgets",
                        "Cloud FinOps strategies"
                    ],
                    "why": "Critical for scaling the SDE sustainably, optimizing cloud costs, and continuously improving researcher onboarding times."
                }
            ]
        }
    },
    "safe_technology_engineering.yaml": {
        "entry": {
            "core_concepts": [
                {
                    "topic": "Source Control & Software Carpentry",
                    "concepts": "Distributed version control, branching strategies, commit history, merge conflict resolution, reproducible environments.",
                    "search_terms": [
                        "How to resolve git merge conflicts",
                        "Trunk-based development vs GitFlow",
                        "Why reproducible environments matter in research"
                    ],
                    "why": "Forms the foundation of modern, collaborative Research Software Engineering (RSE)."
                }
            ]
        },
        "mid": {
            "core_concepts": [
                {
                    "topic": "Infrastructure as Code & Containerization",
                    "concepts": "Declarative vs. Imperative provisioning, idempotency, state file management, container isolation (namespaces/cgroups).",
                    "search_terms": [
                        "Idempotency in cloud provisioning",
                        "How container namespaces and cgroups work",
                        "Declarative infrastructure principles"
                    ],
                    "why": "Ensures engineers understand the 'why' behind tools like Terraform and Docker, leading to highly secure and auditable SDE platforms."
                }
            ]
        },
        "senior": {
            "core_concepts": [
                {
                    "topic": "Distributed Systems & Cloud-Native Architecture",
                    "concepts": "Distributed consensus (Raft/Paxos), eventual consistency, microservices boundary definition, service mesh, highly available (HA) cluster design.",
                    "search_terms": [
                        "Distributed systems consensus algorithms",
                        "CAP theorem explained",
                        "Service mesh mutual TLS architecture"
                    ],
                    "why": "Required for Principal Engineers designing national, federated SDE networks that must be resilient, highly scalable, and impeccably secure."
                }
            ]
        }
    }
}


def process_yaml(filepath):
    filename = os.path.basename(filepath)
    if filename not in CONCEPTS_DATA:
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    domain_data = CONCEPTS_DATA[filename]
    
    domain_block = data.get('domain', {})
    subdomains = domain_block.get('subdomains', {})
    for sub_id, sub_data in subdomains.items():
        competencies = sub_data.get('competencies', {})
        for comp_id, comp_data in competencies.items():
            levels = comp_data.get('levels', {})
            for level_name, level_data in levels.items():
                if level_name in domain_data:
                    # Inject core concepts
                    if domain_data[level_name].get("core_concepts"):
                        level_data["core_concepts"] = domain_data[level_name]["core_concepts"]
                    # Delete old training materials if present
                    if "training_materials" in level_data:
                        del level_data["training_materials"]

    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
        
    print(f"Updated {filename} with core concepts.")

for file in glob.glob('yaml/safe_*.yaml'):
    process_yaml(file)
