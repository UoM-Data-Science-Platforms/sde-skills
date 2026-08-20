import yaml
import glob
import os

# Define the training and qualifications per domain and level based on the research artifact

TRAINING_DATA = {
    "safe_access_identity.yaml": {
        "entry": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "CompTIA Security+",
                    "issuer": "CompTIA",
                    "description": "Baseline understanding of identity concepts, RBAC, and access control principles.",
                    "career_impact": "Essential for junior engineers managing access controls."
                },
                {
                    "name": "Microsoft Certified: Identity and Access Administrator (SC-300)",
                    "issuer": "Microsoft",
                    "description": "Essential for junior engineers managing Microsoft Entra ID which is ubiquitous in NHS/University SDEs.",
                    "career_impact": "Strong validation of identity management platform skills."
                }
            ]
        },
        "mid": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "Certified Identity and Access Manager (CIAM)",
                    "issuer": "Identity Management Institute",
                    "description": "Deep dive into identity federation, SSO (SAML/OIDC), and lifecycle management.",
                    "career_impact": "Necessary for architects integrating multi-institutional access."
                },
                {
                    "name": "AWS Certified Security - Specialty / Azure Security Engineer (AZ-500)",
                    "issuer": "AWS / Microsoft",
                    "description": "Practical implementation of IAM policies, Key Vaults, and network boundaries.",
                    "career_impact": "Proves capability to securely configure cloud IAM."
                }
            ]
        },
        "senior": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "Certified Information Systems Security Professional (CISSP)",
                    "issuer": "ISC2",
                    "description": "The gold standard for designing enterprise-wide Zero Trust architectures and leading IAM strategy.",
                    "career_impact": "Required for Principal Security Architects in SDEs."
                }
            ]
        }
    },
    "safe_data_management.yaml": {
        "entry": {
            "training_materials": [
                {
                    "name": "Data Carpentry / Software Carpentry",
                    "format": "2-day interactive workshops",
                    "duration": "16 hours",
                    "description": "Fundamental training for handling tabular data, introductory SQL, and basic data tidying.",
                    "why": "Essential baseline for processing health and research data."
                }
            ],
            "qualifications": [
                {
                    "name": "AWS Certified Data Engineer - Associate",
                    "issuer": "AWS",
                    "description": "Foundational skills for building secure ETL pipelines in cloud environments.",
                    "career_impact": "Validates ability to operationalize data flows."
                }
            ]
        },
        "mid": {
            "training_materials": [
                {
                    "name": "ELIXIR / TeSS FAIR Data Training",
                    "format": "Online modules / Workshops",
                    "duration": "Varies",
                    "description": "Specialized training on making health and bioinformatics datasets Findable, Accessible, Interoperable, and Reusable.",
                    "why": "Crucial for aligning data with national metadata standards."
                }
            ],
            "qualifications": [
                {
                    "name": "Certified Data Management Professional (CDMP) - Practitioner",
                    "issuer": "DAMA International",
                    "description": "Strong validation of data governance, metadata cataloguing, and data quality profiling skills.",
                    "career_impact": "Standardizes data governance practices across the SDE."
                }
            ]
        },
        "senior": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "MSc / PhD in Health Informatics, Data Science, or Bioinformatics",
                    "issuer": "Higher Education Institutions",
                    "description": "Required for leading complex omics pipelines, clinical data modeling (e.g. OMOP/FHIR), and overarching data strategy.",
                    "career_impact": "Provides the domain expertise required to architect health data platforms."
                }
            ]
        }
    },
    "safe_governance_compliance.yaml": {
        "entry": {
            "training_materials": [
                {
                    "name": "ONS Safe Researcher Training (SRT)",
                    "format": "Online module & Assessment",
                    "duration": "Half-day",
                    "description": "Mandatory baseline training covering the Five Safes framework and basic legal obligations.",
                    "why": "Mandatory for anyone accessing secure data."
                },
                {
                    "name": "Information Governance (IG) Mandatory Training",
                    "format": "Annual online module",
                    "duration": "1-2 hours",
                    "description": "Essential NHS compliance training for handling patient data (Caldicott Principles).",
                    "why": "Legal and NHS DSPT requirement."
                }
            ],
            "qualifications": []
        },
        "mid": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "Certified Information Privacy Professional/Europe (CIPP/E)",
                    "issuer": "IAPP",
                    "description": "Highly sought-after certification proving expertise in UK GDPR, DPA 2018, and data sharing agreements.",
                    "career_impact": "Essential for Information Governance leads."
                },
                {
                    "name": "BCS Practitioner Certificate in Information Risk Management",
                    "issuer": "BCS",
                    "description": "Practical skills in assessing and treating risks, crucial for completing DPIAs.",
                    "career_impact": "Standardizes risk assessment across the SDE."
                }
            ]
        },
        "senior": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "ISO/IEC 27001 Lead Implementer / Lead Auditor",
                    "issuer": "BSI / PECB",
                    "description": "Necessary for maintaining the SDE's ISMS and passing external audits.",
                    "career_impact": "Mandatory for the Information Security Manager (ISM)."
                },
                {
                    "name": "Certified Information Security Manager (CISM)",
                    "issuer": "ISACA",
                    "description": "Focuses on security governance, risk management, and compliance leadership.",
                    "career_impact": "Validates senior leadership in information security."
                }
            ]
        }
    },
    "safe_outputs_disclosure_control.yaml": {
        "entry": {
            "training_materials": [
                {
                    "name": "Introduction to Statistical Disclosure Control",
                    "format": "Online webinar/course",
                    "duration": "1 day",
                    "description": "Teaches the 'Rule of 10', dominance metrics, and basics of cell suppression for output checkers.",
                    "why": "Fundamental for preventing accidental disclosure in exports."
                }
            ],
            "qualifications": []
        },
        "mid": {
            "training_materials": [
                {
                    "name": "Advanced SDC and Microdata Anonymisation",
                    "format": "Specialized workshops",
                    "duration": "2-3 days",
                    "description": "Practical application of k-anonymity, l-diversity, and using R/Python packages (ACRO, sdcMicro).",
                    "why": "Enables complex output reviewing and automated airlock configuration."
                }
            ],
            "qualifications": []
        },
        "senior": {
            "training_materials": [
                {
                    "name": "Differential Privacy & Advanced PETs Training",
                    "format": "Advanced academic modules",
                    "duration": "Varies",
                    "description": "Required to design automated airlocks, set epsilon budgets, and implement cutting-edge Privacy Enhancing Technologies.",
                    "why": "Positions the SDE at the forefront of automated disclosure control."
                }
            ],
            "qualifications": []
        }
    },
    "safe_projects_operations.yaml": {
        "entry": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "ITIL 4 Foundation",
                    "issuer": "AXELOS",
                    "description": "The bedrock of IT Service Management. Essential for SDE helpdesk and incident management.",
                    "career_impact": "Standardizes service delivery terminology."
                },
                {
                    "name": "Certified ScrumMaster (CSM) / PSM I",
                    "issuer": "Scrum Alliance",
                    "description": "Baseline for working in Agile sprints for SDE feature development.",
                    "career_impact": "Enables participation in Agile teams."
                }
            ]
        },
        "mid": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "ITIL 4 Managing Professional",
                    "issuer": "AXELOS",
                    "description": "For service owners running the SDE as an enterprise service, managing SLAs.",
                    "career_impact": "Essential for Service Managers."
                },
                {
                    "name": "PRINCE2 Foundation / AgilePM",
                    "issuer": "AXELOS / APMG",
                    "description": "Formal project management for coordinating multi-institution SDE integrations.",
                    "career_impact": "Validates project delivery capabilities."
                }
            ]
        },
        "senior": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "Lean Six Sigma (Green/Black Belt)",
                    "issuer": "ASQ / IASSC",
                    "description": "Driving operational excellence, reducing user onboarding times, and optimizing workflows.",
                    "career_impact": "Strategic operations leadership."
                }
            ]
        }
    },
    "safe_technology_engineering.yaml": {
        "entry": {
            "training_materials": [
                {
                    "name": "RSE Society Mentorship / Software Carpentry",
                    "format": "Mentorship program",
                    "duration": "6 months",
                    "description": "Best practices in version control (Git), basic testing, and reproducible environments.",
                    "why": "Embeds rigorous research software engineering practices early."
                }
            ],
            "qualifications": [
                {
                    "name": "AWS Certified Cloud Practitioner / Azure Fundamentals (AZ-900)",
                    "issuer": "AWS / Microsoft",
                    "description": "Baseline cloud literacy for junior engineers.",
                    "career_impact": "Foundational step for infrastructure roles."
                }
            ]
        },
        "mid": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "Certified Kubernetes Administrator (CKA)",
                    "issuer": "CNCF",
                    "description": "Hardcore verification of ability to deploy, manage, and secure containerized research workloads.",
                    "career_impact": "Highly sought after for modern cloud-native SDEs."
                },
                {
                    "name": "HashiCorp Certified: Terraform Associate",
                    "issuer": "HashiCorp",
                    "description": "Validates Infrastructure as Code (IaC) skills critical for reproducible, auditable environments.",
                    "career_impact": "Essential for infrastructure automation."
                }
            ]
        },
        "senior": {
            "training_materials": [],
            "qualifications": [
                {
                    "name": "AWS Certified Solutions Architect – Professional",
                    "issuer": "AWS",
                    "description": "Required for Principal Engineers designing multi-account, highly secure, scalable landing zones.",
                    "career_impact": "Validates elite cloud architecture skills."
                }
            ]
        }
    }
}


def process_yaml(filepath):
    filename = os.path.basename(filepath)
    if filename not in TRAINING_DATA:
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        
    domain_data = TRAINING_DATA[filename]
    
    # Iterate through subdomains and competencies
    domain_block = data.get('domain', {})
    subdomains = domain_block.get('subdomains', {})
    for sub_id, sub_data in subdomains.items():
        competencies = sub_data.get('competencies', {})
        for comp_id, comp_data in competencies.items():
            levels = comp_data.get('levels', {})
            for level_name, level_data in levels.items():
                if level_name in domain_data:
                    # Inject training materials
                    if domain_data[level_name].get("training_materials"):
                        level_data["training_materials"] = domain_data[level_name]["training_materials"]
                    # Inject qualifications
                    if domain_data[level_name].get("qualifications"):
                        level_data["qualifications"] = domain_data[level_name]["qualifications"]

    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
        
    print(f"Updated {filename} with training & qualifications.")

for file in glob.glob('yaml/safe_*.yaml'):
    process_yaml(file)
