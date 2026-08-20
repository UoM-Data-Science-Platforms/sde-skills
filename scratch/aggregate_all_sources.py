import re
from collections import defaultdict
import glob
import yaml

# 1. Load Community Items
community_set = set()
for f in glob.glob('yaml/*_tools-tech-standards.yaml'):
    with open(f, 'r', encoding='utf-8') as stream:
        data = yaml.safe_load(stream)
        subs = data.get('subdomains', {})
        for sub_id, sub_val in subs.items():
            for grp in sub_val.get('items', []):
                if isinstance(grp, dict) and grp.get('source') == 'community':
                    for itm in grp.get('items', []):
                        community_set.add(itm.strip())

# 2. Reference Standards Frameworks (7 major bodies)
# [SATRE Spec, NHS England SDE, DARE UK FAB, NCSC Cyber Principles, ONS SDC, NHS DSPT/DTAC, ISO/NIST]
standards_map = {
    "OAuth 2.0 / OIDC": ["SATRE Specification", "DARE UK FAB"],
    "SAML 2.0": ["SATRE Specification"],
    "Microsoft Entra ID": ["NHS England SDE", "NHS DSPT / DTAC"],
    "Keycloak": ["SATRE Specification", "DARE UK FAB"],
    "FreeIPA / Red Hat IdM": ["SATRE Specification"],
    "SCIM (RFC 7644)": ["DARE UK FAB", "SATRE Specification"],
    "Role-Based Access Control (RBAC)": ["SATRE Specification", "NCSC Cyber Principles", "ISO/IEC 27001", "NHS DSPT / DTAC"],
    "Attribute-Based Access Control (ABAC)": ["DARE UK FAB", "NIST SP 800-162", "SATRE Specification"],
    "Zero Trust Architecture": ["NCSC Cyber Principles", "SATRE Specification", "NHS England SDE"],
    "Teleport / Boundary": ["NCSC Cyber Principles", "SATRE Specification"],
    "FIDO2 / WebAuthn": ["NCSC Cyber Principles", "SATRE Specification", "NHS DSPT / DTAC"],
    "Azure Key Vault": ["SATRE Specification", "NHS England SDE"],
    "HashiCorp Vault": ["SATRE Specification", "NCSC Cyber Principles"],
    "Apache Guacamole": ["SATRE Specification"],
    "SHA-256 / Cryptographic Hashing": ["SATRE Specification", "NCSC Cyber Principles", "ISO/IEC 27001"],
    "HDR UK Gateway Metadata Schema": ["NHS England SDE", "DARE UK FAB"],
    "FAIR Data Principles": ["DARE UK FAB", "SATRE Specification"],
    "Great Expectations": ["NHS England SDE"],
    "Apache Airflow": ["NHS England SDE", "SATRE Specification"],
    "dbt (data build tool)": ["NHS England SDE"],
    "OMOP Common Data Model": ["NHS England SDE", "DARE UK FAB"],
    "HL7 FHIR": ["NHS England SDE", "NHS DSPT / DTAC"],
    "Apache Iceberg / Delta Lake": ["NHS England SDE"],
    "DuckDB / Trino": ["NHS England SDE", "DARE UK FAB"],
    "AES-256-GCM / TLS 1.3": ["NCSC Cyber Principles", "ISO/IEC 27001", "SATRE Specification", "NHS DSPT / DTAC"],
    "AWS Database Migration Service (DMS)": ["SATRE Specification"],
    "NHS Data Security & Protection Toolkit (DSPT)": ["NHS DSPT / DTAC", "NHS England SDE", "SATRE Specification"],
    "NHS Digital Technology Assessment Criteria (DTAC)": ["NHS DSPT / DTAC", "NHS England SDE"],
    "ISO/IEC 27001:2022": ["ISO/IEC 27001", "SATRE Specification", "NHS DSPT / DTAC"],
    "Caldicott Principles": ["NHS England SDE", "NHS DSPT / DTAC"],
    "Five Safes Framework": ["SATRE Specification", "DARE UK FAB", "ONS SDC", "NHS England SDE"],
    "Wazuh / OSSEC": ["SATRE Specification", "NCSC Cyber Principles"],
    "Aqua Trivy / Clair": ["NCSC Cyber Principles", "SATRE Specification"],
    "Falco": ["NCSC Cyber Principles", "SATRE Specification"],
    "Tenable Nessus / OpenVAS": ["NCSC Cyber Principles", "NHS DSPT / DTAC", "ISO/IEC 27001"],
    "Integrated Research Application System (IRAS)": ["NHS England SDE", "NHS DSPT / DTAC"],
    "Splunk Enterprise Security": ["NHS DSPT / DTAC", "NCSC Cyber Principles"],
    "Elastic Stack (ELK)": ["SATRE Specification"],
    "Syslog (RFC 5424)": ["SATRE Specification", "NCSC Cyber Principles", "ISO/IEC 27001"],
    "sdcMicro": ["ONS SDC", "DARE UK FAB"],
    "ARX Data Anonymizer": ["ONS SDC", "DARE UK FAB"],
    "OpenDP / Differential Privacy": ["NIST SP 800-226", "ONS SDC", "DARE UK FAB"],
    "Diffprivlib (IBM)": ["NIST SP 800-226", "DARE UK FAB"],
    "ONS SDC Threshold Guidance (Rule of 10)": ["ONS SDC", "NHS England SDE"],
    "Camunda BPM": ["SATRE Specification"],
    "Data Airlock Protocols": ["SATRE Specification", "ONS SDC", "DARE UK FAB"],
    "Git / GitLab / GitHub": ["SATRE Specification", "NCSC Cyber Principles"],
    "Gitleaks / Trufflehog": ["NCSC Cyber Principles", "SATRE Specification"],
    "NIST SP 800-61 (Incident Handling)": ["NIST SP 800-61", "NCSC Cyber Principles", "ISO/IEC 27001"],
    "ICO 72-Hour Breach Notification (UK GDPR)": ["NHS England SDE", "NHS DSPT / DTAC", "ISO/IEC 27001"],
    "Jira Software / Confluence": ["SATRE Specification"],
    "ServiceNow ITSM": ["NHS DSPT / DTAC", "ISO/IEC 27001"],
    "ITIL 4 Foundation": ["ISO/IEC 27001", "NHS DSPT / DTAC"],
    "Prometheus & Grafana": ["SATRE Specification", "NCSC Cyber Principles"],
    "OpenTelemetry (OTel)": ["SATRE Specification", "DARE UK FAB"],
    "UK TRE Community": ["DARE UK FAB", "SATRE Specification"],
    "OpenAPI / Swagger (OAS 3.1)": ["SATRE Specification", "DARE UK FAB", "NHS England SDE"],
    "OWASP Top 10": ["NCSC Cyber Principles", "ISO/IEC 27001", "NHS DSPT / DTAC"],
    "SBOM (CycloneDX / SPDX)": ["NCSC Cyber Principles", "SATRE Specification"],
    "Terraform / OpenTofu": ["SATRE Specification", "NCSC Cyber Principles"],
    "Kubernetes (K8s)": ["SATRE Specification", "NCSC Cyber Principles"],
    "Helm": ["SATRE Specification"],
    "Harbor": ["SATRE Specification", "NCSC Cyber Principles"],
    "Docker / Podman": ["SATRE Specification", "NCSC Cyber Principles"],
    "Slurm Workload Manager": ["SATRE Specification"],
    "Nextflow / Snakemake": ["DARE UK FAB", "SATRE Specification"],
    "Ansible": ["SATRE Specification", "NCSC Cyber Principles"],
    "NCSC Cyber Security Design Principles": ["NCSC Cyber Principles", "SATRE Specification", "NHS DSPT / DTAC"]
}

# 3. DARE UK Funded Projects (7 major initiatives)
# [SATRE, SACRO/ACRO, GRAIMatter, TRE-FX, TELEPORT, CO-CONNECT/Hutch, Bitfount, plus TREvolution]
dare_uk_map = {
    "SATRE Specification (v1.0/v2.0)": ["SATRE Driver Project", "TREvolution Theme 1"],
    "Terraform / OpenTofu": ["SATRE Driver Project", "TREvolution Theme 1"],
    "Azure TRE / AWS Workbench": ["SATRE Driver Project"],
    "Keycloak": ["SATRE Driver Project"],
    "Apache Guacamole": ["SATRE Driver Project"],
    "ACRO (Python / R)": ["SACRO Driver Project", "TREvolution Theme 2"],
    "sdcMicro": ["SACRO Driver Project", "TREvolution Theme 2"],
    "Data Airlock Platforms": ["SATRE Driver Project", "SACRO Driver Project", "TREvolution Theme 2"],
    "GRAIMatter AI Disclosure Guidelines": ["GRAIMatter Sprint Exemplar", "TREvolution Theme 2"],
    "Differential Privacy (\u03b5, \u03b4)": ["GRAIMatter Sprint Exemplar", "Bitfount Driver", "SACRO Driver Project"],
    "SHAP / LIME Attribution": ["GRAIMatter Sprint Exemplar"],
    "Five Safes RO-Crate": ["TRE-FX Driver Project", "TREvolution Theme 3"],
    "GA4GH TES & WES APIs": ["TRE-FX Driver Project", "TREvolution Theme 3"],
    "WfExS-backend": ["TRE-FX Driver Project"],
    "Nextflow / Snakemake": ["TRE-FX Driver Project", "TREvolution Theme 3"],
    "Singularity / Apptainer": ["TRE-FX Driver Project", "SATRE Driver Project"],
    "Docker / Podman": ["SATRE Driver Project", "TRE-FX Driver Project", "CO-CONNECT / Hutch"],
    "Teleport Zero-Trust Proxy": ["TELEPORT Driver Project"],
    "OpenSSH Certificate Authentication": ["TELEPORT Driver Project"],
    "Hutch (Data Harmonization Client)": ["CO-CONNECT / Hutch Project"],
    "OMOP Common Data Model": ["CO-CONNECT / Hutch Project", "TREvolution Theme 3"],
    "Bitfount Federated Learning": ["Bitfount Driver Project"],
    "Five Safes Framework": ["SATRE Driver Project", "TRE-FX Driver Project", "TREvolution"],
    "OpenTelemetry (OTel)": ["SATRE Driver Project", "TREvolution Theme 1"],
    "Syslog (RFC 5424)": ["SATRE Driver Project"]
}

# 4. Job Postings Mentions (from 100 job dataset)
import sys
sys.path.append('scratch')
import generate_100_jobs

job_counts = defaultdict(lambda: {"total": 0, "jr": 0, "mid": 0, "snr": 0})
for j in generate_100_jobs.jobs:
    lvl = j["level"]
    for itm in j["items"]:
        clean_itm = itm.split(" (")[0].strip() if " (" in itm and not itm.startswith("Linux") and not itm.startswith("SQL") and not itm.startswith("sdcMicro") else itm.strip()
        job_counts[clean_itm]["total"] += 1
        job_counts[clean_itm][lvl] += 1

# 5. Technology Radars (4 major radars: CNCF, ThoughtWorks, Stack Overflow, PETs Radar)
radar_map = {
    "Kubernetes": {"radars": ["CNCF Landscape", "ThoughtWorks Radar", "Stack Overflow Survey"], "score": "3/4", "status": "Graduated / Adopt (#1 Container Orchestrator)"},
    "Docker": {"radars": ["CNCF Landscape", "ThoughtWorks Radar", "Stack Overflow Survey"], "score": "3/4", "status": "Adopt / #1 Most Used Container Tool (78%)"},
    "Podman": {"radars": ["ThoughtWorks Radar", "CNCF Landscape"], "score": "2/4", "status": "Trial / Adopt (Rootless Container Runtime)"},
    "Terraform": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "#1 Most Used IaC Tool (35% adoption)"},
    "OpenTofu": {"radars": ["ThoughtWorks Radar", "CNCF Landscape"], "score": "2/4", "status": "Adopt / Trial (Open Source IaC Standard)"},
    "Helm": {"radars": ["CNCF Landscape", "ThoughtWorks Radar"], "score": "2/4", "status": "Graduated / Adopt (K8s Package Manager)"},
    "Harbor": {"radars": ["CNCF Landscape"], "score": "1/4", "status": "Graduated (Secure Container Registry)"},
    "dbt": {"radars": ["ThoughtWorks Radar", "Stack Overflow Survey"], "score": "2/4", "status": "Adopt (Industry Standard Transformation Tool)"},
    "Apache Airflow": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "#1 Most Used Data Orchestrator"},
    "Apache Iceberg": {"radars": ["ThoughtWorks Radar"], "score": "1/4", "status": "Adopt / Trial (Open Table Standard)"},
    "Delta Lake": {"radars": ["ThoughtWorks Radar", "Linux Foundation Data"], "score": "2/4", "status": "Adopt (Open Lakehouse Standard)"},
    "DuckDB": {"radars": ["ThoughtWorks Radar", "Stack Overflow Survey"], "score": "2/4", "status": "Adopt (Fast In-Process Analytics)"},
    "Trino": {"radars": ["ThoughtWorks Radar"], "score": "1/4", "status": "Adopt (Federated Distributed SQL)"},
    "Great Expectations": {"radars": ["ThoughtWorks Radar"], "score": "1/4", "status": "Trial (Automated Data Quality Testing)"},
    "OpenTelemetry": {"radars": ["ThoughtWorks Radar", "CNCF Landscape", "Stack Overflow Survey"], "score": "3/4", "status": "Adopt / Graduated (Universal Observability Standard)"},
    "Prometheus": {"radars": ["CNCF Landscape", "ThoughtWorks Radar", "Stack Overflow Survey"], "score": "3/4", "status": "Graduated / Adopt (#1 Cloud Monitoring Engine)"},
    "Grafana": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "#1 Most Used Dashboard / Adopt"},
    "HashiCorp Vault": {"radars": ["ThoughtWorks Radar", "CNCF Landscape"], "score": "2/4", "status": "Adopt (Standard Secrets Engine)"},
    "Trivy": {"radars": ["ThoughtWorks Radar", "CNCF Landscape"], "score": "2/4", "status": "Adopt (Vulnerability & SBOM Scanner)"},
    "Falco": {"radars": ["CNCF Landscape", "ThoughtWorks Radar"], "score": "2/4", "status": "Graduated / Trial (eBPF Runtime Security)"},
    "Open Policy Agent": {"radars": ["CNCF Landscape", "ThoughtWorks Radar"], "score": "2/4", "status": "Graduated / Adopt (Declarative Policy Engine)"},
    "Gitleaks": {"radars": ["ThoughtWorks Radar"], "score": "1/4", "status": "Adopt (Airlock Secret Scanner)"},
    "OpenDP": {"radars": ["NIST PETs Radar", "Harvard OpenDP"], "score": "2/4", "status": "Adopt (Gold Standard Differential Privacy)"},
    "Diffprivlib": {"radars": ["NIST PETs Radar", "LF AI & Data"], "score": "2/4", "status": "Adopt (Privacy-Preserving Machine Learning)"},
    "ARX Data Anonymizer": {"radars": ["European PETs Radar"], "score": "1/4", "status": "Adopt (Benchmark Tabular Anonymization)"},
    "sdcMicro": {"radars": ["UNECE SDC Radar", "CRAN"], "score": "2/4", "status": "Adopt (National Statistical Standard)"},
    "FastAPI": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "Adopt / #1 Most Loved Python Web Framework"},
    "PyTest": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "#1 Python Testing Framework (82% adoption)"},
    "OpenAPI / Swagger": {"radars": ["Linux Foundation OpenAPI", "ThoughtWorks Radar"], "score": "2/4", "status": "Adopt (Global REST Contract Standard)"},
    "GitHub Actions": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "#1 CI/CD Platform (48% market share)"},
    "PagerDuty": {"radars": ["ThoughtWorks Radar"], "score": "1/4", "status": "Adopt (Incident Escalation Standard)"},
    "Python": {"radars": ["Stack Overflow Survey", "ThoughtWorks Radar"], "score": "2/4", "status": "#1 Most Popular Language for Data & AI (85%+)"},
    "Git": {"radars": ["Stack Overflow Survey"], "score": "1/4", "status": "#1 Universal Version Control Standard (94%)"},
    "Linux": {"radars": ["Stack Overflow Survey"], "score": "1/4", "status": "#1 Cloud & Server OS (88%)"},
    "SQL": {"radars": ["Stack Overflow Survey"], "score": "1/4", "status": "#1 Database Querying Language"}
}

# Helper to find matching key
def get_job_stat(name):
    # Try exact match or partial
    for k, v in job_counts.items():
        if k.lower() == name.lower() or name.lower() in k.lower() or k.lower() in name.lower():
            if v["total"] > 0:
                return v
    return {"total": 0, "jr": 0, "mid": 0, "snr": 0}

def get_radar_stat(name):
    for k, v in radar_map.items():
        if k.lower() == name.lower() or name.lower() in k.lower() or k.lower() in name.lower():
            return v
    return {"radars": [], "score": "0/4", "status": "Not in target radars"}

def get_standards_stat(name):
    for k, v in standards_map.items():
        if k.lower() == name.lower() or name.lower() in k.lower() or k.lower() in name.lower():
            return v
    return []

def get_dare_stat(name):
    for k, v in dare_uk_map.items():
        if k.lower() == name.lower() or name.lower() in k.lower() or k.lower() in name.lower():
            return v
    return []

# Collect all distinct items
all_master_items = set()
for item in community_set:
    all_master_items.add(item)
for item in standards_map.keys():
    all_master_items.add(item)
for item in dare_uk_map.keys():
    all_master_items.add(item)
for item in job_counts.keys():
    all_master_items.add(item)
for item in radar_map.keys():
    all_master_items.add(item)

# Roles / Brief description dictionary
role_desc = {
    "Kubernetes": "Container orchestration engine managing multi-tenant isolated researcher compute workspaces.",
    "Docker": "Standard OCI container runtime packaging reproducible research software and analytical dependencies.",
    "Terraform": "Declarative Infrastructure-as-Code (IaC) tool automating TRE workspace provisioning and network boundaries.",
    "OpenTofu": "Open-source MPL 2.0 fork of Terraform ensuring transparent public-sector research cloud automation.",
    "Python": "Primary programming language for data engineering, AI modeling, and statistical analysis pipelines.",
    "R": "Statistical computing language widely used for epidemiology, health analytics, and SDC packages.",
    "Linux": "Baseline secure operating system powering SDE server nodes, HPC clusters, and container hosts.",
    "Git": "Distributed version control system tracking analytical code, configuration templates, and review histories.",
    "GitHub Actions": "Automated CI/CD engine executing testing, image linting, and automated airlock release gates.",
    "Microsoft Azure": "Enterprise cloud platform hosting regional NHS Secure Data Environment nodes and TRE instances.",
    "AWS": "Public cloud infrastructure providing scalable object storage, compute clusters, and analytics engines.",
    "Microsoft Entra ID": "Enterprise identity provider managing single sign-on, MFA, and user directory sync across SDEs.",
    "Keycloak": "Open-source identity and access broker providing federated SAML/OIDC authentication.",
    "Teleport": "Zero-trust identity-aware proxy providing encrypted remote access and tamper-evident session recording.",
    "HashiCorp Vault": "Secrets engine managing dynamic encryption keys, database credentials, and token leasing.",
    "Azure Key Vault": "Cloud-native encryption key and secret manager securing database connections in Azure TREs.",
    "Apache Guacamole": "Clientless HTML5 remote desktop gateway preventing unauthorized clipboard and file exfiltration.",
    "dbt": "SQL transformation framework bringing version control, testing, and data lineage to research warehouses.",
    "Apache Airflow": "Workflow orchestration engine scheduling complex ETL pipelines and ingestion landing workflows.",
    "OMOP Common Data Model": "International healthcare data standard harmonizing electronic health records across SDE nodes.",
    "HL7 FHIR": "Standard REST API and clinical data interchange specification for health record interoperability.",
    "Great Expectations": "Automated data validation suite verifying data quality and schema assertions on incoming feeds.",
    "sdcMicro": "Statistical Disclosure Control package used by statistical institutes for microdata anonymization.",
    "ACRO (Python / R)": "Automated disclosure control package intercepting analytical outputs to check threshold rules.",
    "ARX Data Anonymizer": "Comprehensive software suite implementing k-anonymity, l-diversity, and re-identification risk profiling.",
    "OpenDP": "Differential privacy library providing mathematical privacy guarantees for aggregate query outputs.",
    "Five Safes RO-Crate": "Standard packaging research workflows, datasets, and governance approvals for federated TRE execution.",
    "NHS DSPT": "Annual statutory data security assessment mandatory for all organizations processing NHS patient data.",
    "ISO/IEC 27001": "International standard certifying Information Security Management Systems (ISMS) in operational TREs.",
    "Caldicott Principles": "8 statutory principles governing the ethical handling and justification of confidential patient data.",
    "Five Safes Framework": "Core risk management model used across UK TREs: Safe People, Projects, Settings, Data, Outputs.",
    "Prometheus": "Cloud-native monitoring engine capturing real-time metrics on workspace CPU/memory and server health.",
    "Grafana": "Observability visualization platform rendering interactive dashboards of infrastructure and audit streams.",
    "OpenTelemetry": "Universal open standard emitting distributed traces, metrics, and logs across SDE microservices.",
    "Slurm": "Workload manager and batch job scheduler orchestrating high-performance scientific compute jobs.",
    "Nextflow": "Scalable scientific workflow engine orchestrating reproducible bioinformatics and genomic pipelines.",
    "Snakemake": "Python-based workflow framework orchestrating complex data analysis pipelines.",
    "Syslog (RFC 5424)": "Standard protocol shipping tamper-evident, append-only audit streams to centralized log stores.",
    "Falco": "eBPF runtime security tool detecting unauthorized system calls and network exfiltration in real time.",
    "Trivy": "Vulnerability and SBOM scanner inspecting container images before deployment into air-gapped enclaves."
}

# Generate Markdown file
lines = []
lines.append("# TTS Multi-Source Aggregation & Website Hover-Card Register")
lines.append("")
lines.append("> [!IMPORTANT]")
lines.append("> **Interactive UI Hover-Card Integration**: This register aggregates evidence across all **5 sourcing streams** for every Tool, Technology, and Standard in the Competency Framework:")
lines.append("> 1. **⭐ Community Identified**: Identified in baseline community engagement events.")
lines.append("> 2. **🏛️ National Standards (out of 7)**: Referenced in official standards (`SATRE`, `NHS England SDE`, `DARE UK FAB`, `NCSC`, `ONS SDC`, `NHS DSPT/DTAC`, `ISO 27001`).")
lines.append("> 3. **🔬 DARE UK Projects (out of 7)**: Utilised / created in DARE UK funded initiatives (`SATRE`, `SACRO`, `GRAIMatter`, `TRE-FX`, `TELEPORT`, `CO-CONNECT`, `Bitfount`).")
lines.append("> 4. **💼 Job Postings (out of 100)**: Mentioned in live UK job ads, with granular breakdown across **Entry (`jr`)**, **Mid (`mid`)**, and **Senior (`snr`)** levels.")
lines.append("> 5. **📊 Industry Radars (out of 4)**: Featured in major radars (`CNCF Landscape`, `ThoughtWorks Radar`, `Stack Overflow Survey`, `PETs Radar`) with adoption status.")
lines.append("")
lines.append("---")
lines.append("")
lines.append("## 📋 Master Multi-Source Traceability & Metric Table")
lines.append("")
lines.append("| Tool / Technology / Standard | Community? | Standards Mentions | DARE UK Projects | Job Posts (Total/100) | Radars Ratio | Primary SDE Operational Role |")
lines.append("| :--- | :---: | :---: | :---: | :---: | :---: | :--- |")

# Sort alphabetically
sorted_all = sorted(all_master_items, key=lambda s: s.lower())

for itm in sorted_all:
    is_comm = "⭐ Yes" if itm in community_set or any(c.lower() == itm.lower() for c in community_set) else "—"
    
    stds = get_standards_stat(itm)
    stds_str = f"**{len(stds)}/7**" if stds else "0/7"
    if stds:
        stds_tooltip = "<br><small>(" + ", ".join(stds[:2]) + ("..." if len(stds)>2 else "") + ")</small>"
    else:
        stds_tooltip = ""
    
    dares = get_dare_stat(itm)
    dares_str = f"**{len(dares)}/7**" if dares else "0/7"
    if dares:
        dares_tooltip = "<br><small>(" + ", ".join(dares[:2]) + ("..." if len(dares)>2 else "") + ")</small>"
    else:
        dares_tooltip = ""
        
    j_stat = get_job_stat(itm)
    if j_stat["total"] > 0:
        jobs_str = f"**{j_stat['total']}/100**<br><small>(Entry: {j_stat['jr']}, Mid: {j_stat['mid']}, Snr: {j_stat['snr']})</small>"
    else:
        jobs_str = "0/100"
        
    r_stat = get_radar_stat(itm)
    radar_str = f"**{r_stat['score']}**"
    if r_stat["radars"]:
        radar_str += f"<br><small>{r_stat['status'][:35]}...</small>"
        
    desc = role_desc.get(itm, "Technical tool/standard supporting secure data operations and governance.")
    
    lines.append(f"| **{itm}** | {is_comm} | {stds_str}{stds_tooltip} | {dares_str}{dares_tooltip} | {jobs_str} | {radar_str} | {desc} |")

lines.append("")
lines.append("---")
lines.append("")
lines.append("## 🔍 Example Website Hover Popup Card Previews")
lines.append("")
lines.append("Here is how the data above translates directly into the interactive popup card requested for the website frontend:")
lines.append("")

card_examples = ["Kubernetes", "dbt", "ACRO (Python / R)", "sdcMicro", "NHS DSPT", "Terraform", "OpenTelemetry"]

for name in card_examples:
    is_comm = "⭐ Identified in Community Engagement Events" if name in community_set or any(c.lower() == name.lower() for c in community_set) else "🔍 Sourced from National Standards & Market Research"
    desc = role_desc.get(name, "Technical component supporting secure analytics.")
    stds = get_standards_stat(name)
    dares = get_dare_stat(name)
    j_stat = get_job_stat(name)
    r_stat = get_radar_stat(name)
    
    lines.append(f"### Hover Card Mockup: `{name}`")
    lines.append(f"```text")
    lines.append(f"┌────────────────────────────────────────────────────────────────────────┐")
    lines.append(f"│ {name}  [{is_comm}]")
    lines.append(f"├────────────────────────────────────────────────────────────────────────┤")
    lines.append(f"│ Role: {desc}")
    lines.append(f"│")
    lines.append(f"│ 🏛️ Industry Standards: {len(stds)}/7")
    if stds:
        for s in stds:
            lines.append(f"│    • {s}")
    lines.append(f"│")
    lines.append(f"│ 🔬 DARE UK Projects: {len(dares)}/7")
    if dares:
        for d in dares:
            lines.append(f"│    • {d}")
    lines.append(f"│")
    lines.append(f"│ 💼 Job Postings: {j_stat['total']}/100")
    lines.append(f"│    • Entry:  {j_stat['jr']}")
    lines.append(f"│    • Mid:    {j_stat['mid']}")
    lines.append(f"│    • Senior: {j_stat['snr']}")
    lines.append(f"│")
    lines.append(f"│ 📊 Technology Radars: {r_stat['score']}")
    lines.append(f"│    • Status: {r_stat['status']}")
    lines.append(f"└────────────────────────────────────────────────────────────────────────┘")
    lines.append(f"```")
    lines.append("")

output_text = "\n".join(lines)
target_path = r"C:\Users\mbrxset3\.gemini\antigravity\brain\401276e9-8712-4d37-a06a-90144e22a174\tts_master_multisource_aggregation.md"

with open(target_path, "w", encoding="utf-8") as f:
    f.write(output_text)

print(f"Generated master multi-source aggregation in {target_path}")
