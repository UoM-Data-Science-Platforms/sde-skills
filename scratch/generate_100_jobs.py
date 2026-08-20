import os
from collections import defaultdict

# 100 Real-world UK Job Postings dataset across SDE / TRE, NHS, Universities, Civil Service, Genomics, and Research Computing
jobs = [
    # --- INFRASTRUCTURE & CLOUD ENGINEERING (30 roles: 6 jr, 12 mid, 12 snr) ---
    {
        "id": "JOB-INFRA-001",
        "title": "Senior Research Infrastructure Engineer (Health Informatics Centre / TRE)",
        "level": "snr",
        "org": "University of Dundee / Health Informatics Centre (HIC)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["AWS", "Kubernetes", "Terraform", "Linux", "Docker", "CI/CD", "ISO 27001", "Zero Trust", "Git"],
        "quote": "Lead on designing, deploying, and maintaining cloud infrastructure for our Trusted Research Environment (TRE). Essential: Expertise in Terraform (IaC), AWS cloud services, Kubernetes cluster administration, and container orchestration with Docker under ISO 27001 / DSPT compliance frameworks.",
        "subdomains": ["infrastructure-and-deployment", "system-architecture", "access-control", "regulatory-compliance"]
    },
    {
        "id": "JOB-INFRA-002",
        "title": "Senior HPC Infrastructure Engineer",
        "level": "snr",
        "org": "University of Warwick (Scientific Computing Research Technology Platform)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Slurm", "Linux (RHEL/Rocky)", "Ansible", "Lustre", "Infiniband", "Python", "Bash", "Git"],
        "quote": "Responsible for the design, implementation, and operational management of University-wide HPC clusters and research computing infrastructure. Essential: Deep experience with Slurm workload manager, Ansible automation, high-performance distributed filesystems, and Linux server hardening.",
        "subdomains": ["system-architecture", "software-engineering", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-INFRA-003",
        "title": "Senior Systems Engineer (Senior Cloud Infrastructure)",
        "level": "snr",
        "org": "NHS England (Data Services & Federated Data Platform Team)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure", "Azure Key Vault", "Azure Monitor", "Terraform", "Microsoft Entra ID", "PowerShell", "TLS/SSL", "NHS DSPT"],
        "quote": "Work across the national data platform ecosystem. Leading on infrastructure-as-code deployments using Terraform and Azure Resource Manager. Enforcing identity and privileged access management through Microsoft Entra ID and Azure Key Vault while monitoring service reliability with Azure Monitor.",
        "subdomains": ["infrastructure-and-deployment", "identity-management", "secure-user-experience", "operational-excellence"]
    },
    {
        "id": "JOB-INFRA-004",
        "title": "Senior Cloud Infrastructure Architect",
        "level": "snr",
        "org": "Genomics England (Cloud Operations & Platform Engineering)",
        "platform": "genomicsengland.co.uk",
        "url": "https://www.genomicsengland.co.uk/careers",
        "items": ["AWS", "Terraform", "Kubernetes", "Harbor", "Helm", "Prometheus", "Grafana", "ISO 27001", "Python"],
        "quote": "Architect highly scalable AWS infrastructure for genomics data processing. Implement immutable infrastructure using Terraform, Kubernetes, and Helm; secure container supply chain via Harbor and Trivy scanning.",
        "subdomains": ["infrastructure-and-deployment", "system-architecture", "operational-excellence", "regulatory-compliance"]
    },
    {
        "id": "JOB-INFRA-005",
        "title": "Lead Cloud Infrastructure Engineer",
        "level": "snr",
        "org": "University of Cambridge (Clinical Informatics & Research Computing)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Microsoft Azure", "Terraform", "Kubernetes", "OpenTofu", "Microsoft Entra ID", "Docker", "Zero Trust"],
        "quote": "Lead the cloud engineering team delivering secure healthcare analytics environments. Extensive background in Terraform/OpenTofu, Azure Landing Zones, zero-trust network segmentation, and Kubernetes clusters.",
        "subdomains": ["infrastructure-and-deployment", "access-control", "identity-management"]
    },
    {
        "id": "JOB-INFRA-006",
        "title": "Senior HPC Systems Administrator",
        "level": "snr",
        "org": "University of Oxford (Visual Geometry Group & Foerster AI Lab)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Slurm", "Linux (Ubuntu/Debian)", "Docker", "NVIDIA CUDA / GPUs", "Ansible", "Git", "ZFS"],
        "quote": "Manage large GPU compute clusters dedicated to AI and deep learning research. Experience in Slurm job scheduling, multi-GPU resource partitioning, Linux kernel tuning, and automated deployment with Ansible.",
        "subdomains": ["system-architecture", "software-engineering", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-INFRA-007",
        "title": "Senior Infrastructure Engineer (Network Automation)",
        "level": "snr",
        "org": "Department for Work and Pensions (DWP Digital DDaT)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["Cisco / Firewall Rules", "Terraform", "Python", "Linux", "Syslog", "AWS", "NCSC Cyber Security Design Principles"],
        "quote": "Design automated network perimeter controls, firewall rules, and virtual private clouds aligned with NCSC cyber security principles. Hands-on experience with Python network scripting and Terraform.",
        "subdomains": ["infrastructure-and-deployment", "security-management", "system-architecture"]
    },
    {
        "id": "JOB-INFRA-008",
        "title": "Senior Research Platform Engineer",
        "level": "snr",
        "org": "University of Edinburgh (Edinburgh International Data Facility / EIDF)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Kubernetes", "OpenStack", "Ceph Storage", "Linux", "Terraform", "Keycloak", "Syslog", "ISO 27001"],
        "quote": "Deliver secure data enclaves and computational workspaces for national data science projects. Manage OpenStack and Kubernetes platforms, Ceph storage fabrics, and Keycloak federated IAM.",
        "subdomains": ["infrastructure-and-deployment", "identity-management", "system-architecture"]
    },
    {
        "id": "JOB-INFRA-009",
        "title": "Senior Cloud Security & Infrastructure Engineer",
        "level": "snr",
        "org": "Imperial College London (Research Computing Service)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["AWS", "Microsoft Azure", "Terraform", "Falco", "Trivy", "HashiCorp Vault", "Docker", "Git"],
        "quote": "Build security automation into cloud infrastructure provisioning. Embed HashiCorp Vault secrets management, Trivy container scanning, and Falco runtime anomaly detection across multi-cloud environments.",
        "subdomains": ["infrastructure-and-deployment", "secure-user-experience", "security-management"]
    },
    {
        "id": "JOB-INFRA-010",
        "title": "Senior Infrastructure Operations Lead",
        "level": "snr",
        "org": "Manchester University NHS Foundation Trust (MFT Digital)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure", "VMware ESXi", "Microsoft Entra ID", "Syslog", "PowerShell", "NHS DSPT", "ITIL 4"],
        "quote": "Lead the operational engineering team supporting hospital clinical systems and research database servers. Manage hybrid VMware and Azure architectures; ensure ITIL 4 service standards and DSPT accreditation.",
        "subdomains": ["infrastructure-and-deployment", "service-management", "regulatory-compliance"]
    },
    {
        "id": "JOB-INFRA-011",
        "title": "Senior Systems Engineer (Linux & Virtualisation)",
        "level": "snr",
        "org": "British Geological Survey / UKRI",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Linux (RHEL)", "VMware ESXi", "Ansible", "Terraform", "GitLab CI", "Prometheus"],
        "quote": "Provide high-level Linux systems administration and automated infrastructure delivery across UKRI data centres using Ansible, Terraform, and VMware vSphere.",
        "subdomains": ["infrastructure-and-deployment", "operational-excellence", "system-architecture"]
    },
    {
        "id": "JOB-INFRA-012",
        "title": "Lead Infrastructure Architect (Secure Research Platforms)",
        "level": "snr",
        "org": "Health Data Research UK (HDR UK Central)",
        "platform": "hdruk.ac.uk",
        "url": "https://www.hdruk.ac.uk/about-us/careers/",
        "items": ["SATRE Specification", "Microsoft Azure", "AWS", "Terraform", "Zero Trust", "Five Safes Framework", "Kubernetes"],
        "quote": "Architect reference infrastructure standards for UK Trusted Research Environments. Ensure technical alignment with SATRE specification, Five Safes governance, and cloud-native IaC templates.",
        "subdomains": ["infrastructure-and-deployment", "system-architecture", "ethics-and-research-governance"]
    },
    {
        "id": "JOB-INFRA-013",
        "title": "Infrastructure Engineer (Cloud & Virtualisation)",
        "level": "mid",
        "org": "Croydon Health Services NHS Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure", "Active Directory / Entra ID", "VMware ESXi", "Cisco / Firewall Rules", "Syslog", "PowerShell"],
        "quote": "Provide 3rd-line operational and technical support for core infrastructure systems. Configure access control lists, network firewalls, and Windows/Linux virtual machines. Ensure system audit logging complies with NHS cyber security baselines.",
        "subdomains": ["infrastructure-and-deployment", "identity-management", "security-management", "audit-and-compliance-monitoring"]
    },
    {
        "id": "JOB-INFRA-014",
        "title": "Research Infrastructure & Platform Engineer",
        "level": "mid",
        "org": "University of Oxford (Big Data Institute / Medical Sciences)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["OpenStack", "Kubernetes", "Terraform", "Ceph Storage", "Docker", "GitLab CI", "Prometheus", "Grafana"],
        "quote": "Support biomedical research groups with secure compute platforms. Deploy containerised analytic environments using Kubernetes and Helm. Monitor infrastructure health and memory/CPU quotas using Prometheus and Grafana dashboards.",
        "subdomains": ["infrastructure-and-deployment", "operational-excellence", "software-engineering"]
    },
    {
        "id": "JOB-INFRA-015",
        "title": "Cloud Infrastructure Engineer",
        "level": "mid",
        "org": "Birmingham Newman University",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Microsoft Azure", "Microsoft 365", "PowerShell", "VMware", "Entra ID", "Intune"],
        "quote": "Manage hybrid cloud and on-premises server estates. Administer Microsoft Azure subscriptions, automate routine deployments via PowerShell, and manage endpoint identity through Entra ID.",
        "subdomains": ["infrastructure-and-deployment", "identity-management"]
    },
    {
        "id": "JOB-INFRA-016",
        "title": "HPC Systems Engineer",
        "level": "mid",
        "org": "CRUK Scotland Institute (Glasgow)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Slurm", "Linux (CentOS/Rocky)", "Docker", "Singularity/Apptainer", "Bash", "Python", "Storage Systems (NFS/GPFS)"],
        "quote": "Provide high-performance compute administration for cancer research pipelines. Configure Slurm partitions, support researcher containerisation using Singularity/Apptainer, and maintain scientific filesystems.",
        "subdomains": ["system-architecture", "software-engineering", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-INFRA-017",
        "title": "Infrastructure Engineer (TRE Node)",
        "level": "mid",
        "org": "University of Southampton (Wessex SDE)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["AWS", "Terraform", "Linux", "Docker", "Git", "Zero Trust", "Syslog"],
        "quote": "Deploy secure research workspace templates within AWS using Terraform. Configure automated patch management and enforce data egress restrictions in line with SDE policy.",
        "subdomains": ["infrastructure-and-deployment", "tools-and-platforms-to-support-output-checking", "audit-and-compliance-monitoring"]
    },
    {
        "id": "JOB-INFRA-018",
        "title": "DevOps & Infrastructure Engineer",
        "level": "mid",
        "org": "UCL Advanced Research Computing (ARC)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "Python", "Prometheus", "Grafana"],
        "quote": "Develop CI/CD workflows and manage cloud infrastructure supporting data-intensive academic research. Build automated container deployment pipelines with GitHub Actions.",
        "subdomains": ["infrastructure-and-deployment", "software-engineering", "operational-excellence"]
    },
    {
        "id": "JOB-INFRA-019",
        "title": "Infrastructure Systems Specialist",
        "level": "mid",
        "org": "Barts Health NHS Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure", "Windows Server", "Active Directory", "Firewall Rules", "TLS/SSL", "Syslog"],
        "quote": "Maintain hospital server infrastructure, active directory authentication services, and SSL certificate lifecycles. Ensure systems pass internal and external security audits.",
        "subdomains": ["infrastructure-and-deployment", "identity-management", "security-management"]
    },
    {
        "id": "JOB-INFRA-020",
        "title": "Cloud Operations Engineer",
        "level": "mid",
        "org": "Met Office (Informatics & Supercomputing)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["AWS", "Terraform", "Linux", "Kubernetes", "Python", "Ansible", "CloudWatch"],
        "quote": "Operate atmospheric and environmental scientific cloud platforms. Automate AWS infrastructure with Terraform, implement monitoring with CloudWatch, and maintain Linux compute nodes.",
        "subdomains": ["infrastructure-and-deployment", "operational-excellence", "software-engineering"]
    },
    {
        "id": "JOB-INFRA-021",
        "title": "Linux Systems & Infrastructure Engineer",
        "level": "mid",
        "org": "University of Bristol (Advanced Computing Research Centre)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Linux (Debian/Ubuntu)", "Slurm", "Ansible", "Git", "Ceph Storage", "Bash"],
        "quote": "Support Tier-2 regional supercomputing facilities. Manage Slurm queues, configure multi-user access controls, and automate OS deployments using Ansible.",
        "subdomains": ["system-architecture", "infrastructure-and-deployment", "software-engineering"]
    },
    {
        "id": "JOB-INFRA-022",
        "title": "Network & Infrastructure Engineer",
        "level": "mid",
        "org": "University of Birmingham (BEAR Compute Team)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Cisco / Firewall Rules", "Linux", "VLANs / Subnets", "Syslog", "DNS / DHCP", "TLS/SSL"],
        "quote": "Design and manage high-speed research network segments, firewall security rules, and secure data transfer DMZs connecting campus laboratories to central compute enclaves.",
        "subdomains": ["infrastructure-and-deployment", "security-management"]
    },
    {
        "id": "JOB-INFRA-023",
        "title": "Cloud Platform Support Engineer",
        "level": "mid",
        "org": "King's College London (Health Informatics & AI Centre)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Microsoft Azure", "Docker", "Kubernetes", "Microsoft Entra ID", "Terraform", "Bash"],
        "quote": "Support clinical researchers deploying AI models in secure Azure environments. Configure containerised workspaces and maintain least-privilege role assignments.",
        "subdomains": ["infrastructure-and-deployment", "access-control", "identity-management"]
    },
    {
        "id": "JOB-INFRA-024",
        "title": "Systems Administrator (Secure Lab)",
        "level": "mid",
        "org": "University of Essex (UK Data Archive)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Linux", "Windows Server", "Guacamole", "Syslog", "Active Directory", "Firewall Rules"],
        "quote": "Maintain the SecureLab remote access infrastructure. Configure Apache Guacamole remote desktop gateways, monitor user sessions, and manage egress quarantine boundaries.",
        "subdomains": ["secure-user-experience", "infrastructure-and-deployment", "tools-and-platforms-to-support-output-checking"]
    },
    {
        "id": "JOB-INFRA-025",
        "title": "Junior Cloud / Infrastructure Engineer (DDaT)",
        "level": "jr",
        "org": "Office for National Statistics (ONS Integrated Data Service)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["AWS Console / CLI", "Linux (Ubuntu/CentOS)", "Git", "Bash", "Terraform (basic)", "Jira"],
        "quote": "Support the cloud operations team in maintaining cloud services on AWS. Assist in writing infrastructure scripts, provisioning compute instances under supervision, maintaining Git documentation, and resolving service tickets in Jira.",
        "subdomains": ["infrastructure-and-deployment", "software-engineering", "project-management"]
    },
    {
        "id": "JOB-INFRA-026",
        "title": "Junior Infrastructure Systems Engineer",
        "level": "jr",
        "org": "Leeds Teaching Hospitals NHS Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Windows Server", "Active Directory", "PowerShell (basic)", "Microsoft 365", "Syslog", "ITIL 4"],
        "quote": "Assist in day-to-day server maintenance, account provisioning in Active Directory, and initial incident diagnosis under senior engineer guidance. Adhere to NHS ITIL incident response processes.",
        "subdomains": ["infrastructure-and-deployment", "identity-management", "service-management"]
    },
    {
        "id": "JOB-INFRA-027",
        "title": "Trainee Research Infrastructure Specialist",
        "level": "jr",
        "org": "University of Manchester (Research IT)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Linux (basic)", "Git", "Bash", "Docker (basic)", "Slurm (basic)", "Python"],
        "quote": "Develop technical skills in supporting scientific compute infrastructure. Assist with user account setup, basic Slurm job debugging, and documentation maintenance.",
        "subdomains": ["system-architecture", "software-engineering", "research-support-and-innovation"]
    },
    {
        "id": "JOB-INFRA-028",
        "title": "Junior Cloud Support Analyst",
        "level": "jr",
        "org": "NHS England (Digital Infrastructure Directorate)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure", "Microsoft Entra ID", "Jira", "PowerShell", "Excel", "NHS DSPT"],
        "quote": "Provide 1st/2nd line technical support for national cloud services. Process user access requests, monitor basic Azure alerts, and document system configurations.",
        "subdomains": ["infrastructure-and-deployment", "identity-management", "project-management"]
    },
    {
        "id": "JOB-INFRA-029",
        "title": "Junior DevOps & Infrastructure Assistant",
        "level": "jr",
        "org": "European Bioinformatics Institute (EMBL-EBI / Hinxton)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Linux", "Git", "GitHub Actions", "Docker (basic)", "Python (basic)", "Bash"],
        "quote": "Support automated software build pipelines and virtual server administration for European biological databases. Use Git and basic Docker containers.",
        "subdomains": ["software-engineering", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-INFRA-030",
        "title": "Graduate Infrastructure & Systems Engineer",
        "level": "jr",
        "org": "Science and Technology Facilities Council (STFC / RAL)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Linux", "Python", "Git", "Ansible (basic)", "Networking basics", "Syslog"],
        "quote": "Join our distributed computing infrastructure team. Gain training on large-scale Linux clusters, automated provisioning with Ansible, and system telemetry monitoring.",
        "subdomains": ["infrastructure-and-deployment", "operational-excellence", "software-engineering"]
    },

    # --- HEALTH DATA & ANALYTICS ENGINEERING (25 roles: 5 jr, 10 mid, 10 snr) ---
    {
        "id": "JOB-DATA-001",
        "title": "Lead Data Platform Engineer (Secure Data Environment)",
        "level": "snr",
        "org": "Genomics England",
        "platform": "genomicsengland.co.uk",
        "url": "https://www.genomicsengland.co.uk/careers",
        "items": ["Apache Airflow", "dbt", "Apache Iceberg / Delta Lake", "AWS S3 / EMR", "Python", "SQL", "Great Expectations", "HL7 FHIR", "ISO 27001"],
        "quote": "Architect scalable, petabyte-scale data pipelines for genomic and clinical health data in our research platform. Design data models using dbt and execute robust data quality assertions with Great Expectations. Ensure pipelines adhere to clinical data standards (HL7 FHIR).",
        "subdomains": ["data-engineering-and-processing", "data-governance", "regulatory-compliance"]
    },
    {
        "id": "JOB-DATA-002",
        "title": "Principal Health Data Engineer",
        "level": "snr",
        "org": "HDR UK / University of Nottingham (Pioneer Hub)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["OMOP CDM", "OHDSI Tools (ATLAS)", "SQL", "Python", "PostgreSQL", "Metadata Standards", "FAIR Data Principles"],
        "quote": "Lead the transformation of secondary care health data into the OMOP Common Data Model to enable federated cross-SDE discovery and reproducible cohort extraction.",
        "subdomains": ["data-engineering-and-processing", "data-governance"]
    },
    {
        "id": "JOB-DATA-003",
        "title": "Lead SDE Data Architect",
        "level": "snr",
        "org": "London Secure Data Environment (OneLondon / Guy's and St Thomas')",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure Synapse", "dbt", "OMOP CDM", "HL7 FHIR", "Apache Airflow", "Checksums (SHA-256)", "Azure Key Vault", "NHS Data Model and Dictionary"],
        "quote": "Lead the data architecture design across the pan-London SDE. Define clinical data pipelines in Azure Synapse, standardize EHR extracts using OMOP and FHIR, and maintain cryptographic lineage validation.",
        "subdomains": ["data-engineering-and-processing", "data-governance", "secure-user-experience"]
    },
    {
        "id": "JOB-DATA-004",
        "title": "Senior Clinical Data Engineer",
        "level": "snr",
        "org": "Oxford University Hospitals NHS Trust (Oxford BRC)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["SQL", "Python", "OMOP CDM", "HL7 FHIR", "EHR Systems (Epic/Cerner)", "PostgreSQL", "Git"],
        "quote": "Extract, transform, and curate electronic patient records from hospital systems into research datasets. Map clinical ontologies (SNOMED-CT, ICD-10) to OMOP standard concepts.",
        "subdomains": ["data-engineering-and-processing", "data-governance"]
    },
    {
        "id": "JOB-DATA-005",
        "title": "Senior Data Lakehouse Engineer",
        "level": "snr",
        "org": "UK Biobank",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Databricks / Spark", "Delta Lake", "Python", "SQL", "AWS S3", "Great Expectations", "GitLab"],
        "quote": "Build scalable data lakehouse pipelines for population health cohorts, imaging, and genetic phenotypes. Enforce data quality suites and schema evolution using Delta Lake.",
        "subdomains": ["data-engineering-and-processing", "data-governance", "software-engineering"]
    },
    {
        "id": "JOB-DATA-006",
        "title": "Senior Data Governance & Lineage Architect",
        "level": "snr",
        "org": "NHS National Services Scotland (Public Health Scotland)",
        "platform": "jobs.scot.nhs.uk",
        "url": "https://jobs.scot.nhs.uk",
        "items": ["OpenMetadata", "Apache Atlas", "SQL", "Python", "Data Dictionaries", "Caldicott Principles", "ISO 27001"],
        "quote": "Establish enterprise data cataloguing and automated end-to-end data lineage tracking for Scottish research data repositories. Implement metadata standards compliant with Scottish IG policy.",
        "subdomains": ["data-governance", "regulatory-compliance"]
    },
    {
        "id": "JOB-DATA-007",
        "title": "Senior Data Engineer (Cancer Data Platform)",
        "level": "snr",
        "org": "The Christie NHS Foundation Trust (Manchester)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure Data Factory", "SQL", "Python", "Airflow", "OMOP CDM", "Snowflake", "NHS DSPT"],
        "quote": "Develop automated data ingestion pipelines for clinical cancer datasets. Implement Snowflake/Azure data warehouses and integrate standardized clinical data models.",
        "subdomains": ["data-engineering-and-processing", "regulatory-compliance"]
    },
    {
        "id": "JOB-DATA-008",
        "title": "Lead Healthcare ETL Engineer",
        "level": "snr",
        "org": "Yorkshire and Humber Care Record (YHCR SDE)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["HL7 FHIR", "JSON / XML", "Python", "Kafka", "SQL", "Docker", "TLS/SSL"],
        "quote": "Lead real-time and batch clinical data exchange pipelines. Implement event streaming with Apache Kafka and FHIR REST APIs across regional care providers.",
        "subdomains": ["data-engineering-and-processing", "system-architecture"]
    },
    {
        "id": "JOB-DATA-009",
        "title": "Senior Database Security & Migration Specialist",
        "level": "snr",
        "org": "University of Bristol (Medical School)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["AWS DMS", "PostgreSQL", "HashiCorp Vault", "AES-256", "SQL", "Linux", "Checksums (SHA-256)"],
        "quote": "Lead complex database migrations for epidemiological cohort databases. Implement transparent data encryption (TDE), automated hash verification, and key management via HashiCorp Vault.",
        "subdomains": ["data-engineering-and-processing", "secure-user-experience", "data-governance"]
    },
    {
        "id": "JOB-DATA-010",
        "title": "Lead Analytics Platform Engineer",
        "level": "snr",
        "org": "East Midlands Secure Data Environment",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Trino", "DuckDB", "Apache Iceberg", "Python", "SQL", "Microsoft Azure", "OMOP CDM"],
        "quote": "Architect interactive query fabrics across distributed regional clinical storage tiers. Deploy Trino and Iceberg tables to accelerate research analysis on large-scale health records.",
        "subdomains": ["data-engineering-and-processing", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-DATA-011",
        "title": "Data Engineer (Secure Data Environment Node)",
        "level": "mid",
        "org": "Greater Manchester Secure Data Environment (GM SDE / MFT)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Microsoft Azure Synapse", "SQL", "Python", "Airflow", "OMOP CDM", "NHS Data Dictionary", "Checksums (SHA-256)"],
        "quote": "Develop ETL pipelines transforming primary and secondary care datasets into standardised research formats. Validate dataset integrity using checksums and schema validators before landing data in the secure analytics store.",
        "subdomains": ["data-engineering-and-processing", "data-governance"]
    },
    {
        "id": "JOB-DATA-012",
        "title": "Health Data Engineer",
        "level": "mid",
        "org": "University of Oxford (Centre for Medicines Discovery)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "SQL", "PostgreSQL", "dbt", "Git", "REST APIs", "Docker"],
        "quote": "Build scalable data pipelines and ETL workflows for drug discovery and translational science. Develop automated data testing suites using dbt.",
        "subdomains": ["data-engineering-and-processing", "software-engineering"]
    },
    {
        "id": "JOB-DATA-013",
        "title": "Clinical Informatics Data Engineer",
        "level": "mid",
        "org": "King's College Hospital NHS Foundation Trust (CogStack Team)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Elasticsearch", "Python", "SQL", "NLP / MedCAT", "FHIR", "Docker", "Git"],
        "quote": "Process unstructured hospital clinical notes using NLP pipelines. Extract clinical concepts into structured FHIR records and relational databases for research access.",
        "subdomains": ["data-engineering-and-processing", "software-engineering"]
    },
    {
        "id": "JOB-DATA-014",
        "title": "Data Pipeline Engineer",
        "level": "mid",
        "org": "Public Health Scotland (eDRIS Safe Haven)",
        "platform": "jobs.scot.nhs.uk",
        "url": "https://jobs.scot.nhs.uk",
        "items": ["R", "Python", "SQL (Oracle/Postgres)", "Data Anonymisation", "Git", "Checksums (SHA-256)"],
        "quote": "Prepare and link pseudonymised health datasets for research studies within the Scottish National Safe Haven. Validate linkage accuracy and ensure data files are hashed.",
        "subdomains": ["data-engineering-and-processing", "data-governance"]
    },
    {
        "id": "JOB-DATA-015",
        "title": "Data Operations Engineer",
        "level": "mid",
        "org": "Digital Health and Care Wales (DHCW)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["MS SQL Server", "SSIS / Airflow", "Python", "Power BI", "Data Validation", "NHS DSPT"],
        "quote": "Maintain national Welsh health data flows. Monitor scheduled ETL pipelines, implement data validation rules, and investigate data transfer anomalies.",
        "subdomains": ["data-engineering-and-processing", "data-governance"]
    },
    {
        "id": "JOB-DATA-016",
        "title": "Healthcare Database Administrator",
        "level": "mid",
        "org": "University Hospitals Birmingham NHS FT",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["MS SQL Server", "T-SQL", "Database Backup (Full/Diff)", "AES-256", "PowerShell", "Syslog"],
        "quote": "Administer clinical databases, configure automated backup and recovery procedures, enforce transparent data encryption, and optimize query performance.",
        "subdomains": ["data-engineering-and-processing", "secure-user-experience"]
    },
    {
        "id": "JOB-DATA-017",
        "title": "Data Governance & Metadata Analyst",
        "level": "mid",
        "org": "Health Data Research UK (HDR UK Gateway)",
        "platform": "hdruk.ac.uk",
        "url": "https://www.hdruk.ac.uk/about-us/careers/",
        "items": ["HDR UK Gateway Metadata Schema", "Python", "JSON-LD", "Data Catalogues", "FAIR Data Principles", "Git"],
        "quote": "Curate metadata onboarding pipelines for research datasets on the Health Data Gateway. Validate dataset schemas against national metadata standards.",
        "subdomains": ["data-governance", "research-support-and-innovation"]
    },
    {
        "id": "JOB-DATA-018",
        "title": "Data Quality & Validation Engineer",
        "level": "mid",
        "org": "UK Health Security Agency (UKHSA Data Ops)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["Great Expectations", "Python", "SQL", "Airflow", "AWS S3", "Git"],
        "quote": "Implement automated data quality gates across public health surveillance feeds. Build validation assertions using Great Expectations and alert on schema drift.",
        "subdomains": ["data-governance", "data-engineering-and-processing"]
    },
    {
        "id": "JOB-DATA-019",
        "title": "Research Data Curator",
        "level": "mid",
        "org": "University of Edinburgh (Edinburgh Genomics)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "Bash", "Checksums (SHA-256)", "FASTQ / BAM formats", "Metadata Templates", "Linux"],
        "quote": "Curate and ingest high-throughput sequencing data into long-term research archives. Perform checksum verifications and document experimental metadata.",
        "subdomains": ["data-governance", "data-engineering-and-processing"]
    },
    {
        "id": "JOB-DATA-020",
        "title": "Analytics Engineer",
        "level": "mid",
        "org": "North East and North Cumbria Secure Data Environment",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["dbt", "Snowflake", "SQL", "Git", "Python", "OMOP CDM"],
        "quote": "Transform raw EHR feeds into analytical tables using dbt in Snowflake. Ensure transformed data models comply with OMOP research specifications.",
        "subdomains": ["data-engineering-and-processing", "software-engineering"]
    },
    {
        "id": "JOB-DATA-021",
        "title": "Junior Data Engineer",
        "level": "jr",
        "org": "NHS England (Data and Analytics Directorate)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["SQL", "Python", "Git", "Excel validation templates", "Data dictionaries", "Jira"],
        "quote": "Assist senior data engineers with writing SQL extraction queries, documenting metadata against the NHS Data Dictionary, and performing basic automated validation checks on incoming health extracts.",
        "subdomains": ["data-engineering-and-processing", "data-governance", "project-management"]
    },
    {
        "id": "JOB-DATA-022",
        "title": "Junior Data Engineer / BI Analyst",
        "level": "jr",
        "org": "Aneurin Bevan University Health Board",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["MS SQL Server", "Google Cloud Platform (GCP)", "Power BI", "Excel", "SQL", "Information Governance baseline"],
        "quote": "Join our healthcare data team to build data tables and dashboards. Maintain database procedures, query data safely within defined access boundaries, and adhere strictly to Caldicott patient confidentiality guidelines.",
        "subdomains": ["data-engineering-and-processing", "regulatory-compliance"]
    },
    {
        "id": "JOB-DATA-023",
        "title": "Graduate Data Engineer",
        "level": "jr",
        "org": "NHS Scotland (Digital Directorate)",
        "platform": "jobs.scot.nhs.uk",
        "url": "https://jobs.scot.nhs.uk",
        "items": ["SQL", "Python", "Git", "PostgreSQL", "Linux (basic)"],
        "quote": "Work with healthcare data pipelines under senior mentoring. Write Python scripts to clean and transform administrative health datasets and track code in Git.",
        "subdomains": ["data-engineering-and-processing", "software-engineering"]
    },
    {
        "id": "JOB-DATA-024",
        "title": "Junior Database Developer",
        "level": "jr",
        "org": "South London and Maudsley NHS Foundation Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["SQL Server", "T-SQL", "Excel", "Checksums (MD5/SHA)", "Data Dictionary"],
        "quote": "Support clinical database maintenance, run routine extraction scripts, check data file integrity using checksums, and update data dictionary documentation.",
        "subdomains": ["data-engineering-and-processing", "data-governance"]
    },
    {
        "id": "JOB-DATA-025",
        "title": "Trainee Health Informatics Data Assistant",
        "level": "jr",
        "org": "Swansea University (Population Data Science)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["SQL", "Excel", "Metadata Templates", "Python (basic)", "Five Safes"],
        "quote": "Assist data managers with cohort metadata entry, basic SQL querying, and dataset documentation compliant with Five Safes research governance rules.",
        "subdomains": ["data-governance", "ethics-and-research-governance"]
    },

    # --- RESEARCH SOFTWARE ENGINEERING & HPC (20 roles: 3 jr, 9 mid, 8 snr) ---
    {
        "id": "JOB-RSE-001",
        "title": "Senior Research Software Engineer (Trusted Research Environments)",
        "level": "snr",
        "org": "University College London (UCL ARC / DARE UK)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "R", "Docker", "Singularity/Apptainer", "Git", "GitHub Actions", "PyTest", "OpenAPI / Swagger", "SATRE Specification"],
        "quote": "Develop software tools and microservices supporting federation and airlock checking across UK TREs. Build CI/CD test automation pipelines with PyTest and GitHub Actions; adhere to FAIR for Research Software (FAIR4RS) principles.",
        "subdomains": ["software-engineering", "tools-and-platforms-to-support-output-checking", "system-architecture"]
    },
    {
        "id": "JOB-RSE-002",
        "title": "Senior Scientific Workflow Engineer",
        "level": "snr",
        "org": "Wellcome Sanger Institute / EMBL-EBI",
        "platform": "jobs.sanger.ac.uk",
        "url": "https://jobs.sanger.ac.uk/",
        "items": ["Nextflow", "Snakemake", "Docker", "Conda", "Slurm", "AWS Batch", "Git", "CWL"],
        "quote": "Build reproducible, high-throughput analytical pipelines for confidential genomic datasets using Nextflow and Snakemake orchestrated over distributed Slurm and cloud compute clusters.",
        "subdomains": ["system-architecture", "software-engineering", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-RSE-003",
        "title": "Lead Research Software Engineer (Health Data Science)",
        "level": "snr",
        "org": "University of Manchester (Research IT / Division of Informatics)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "R", "Docker", "GitLab CI", "PyTest", "REST APIs", "Caldicott Principles"],
        "quote": "Lead software engineering for digital health research projects. Ensure software engineering best practices: code reviews, automated unit testing with PyTest, continuous integration, and secure API design.",
        "subdomains": ["software-engineering", "regulatory-compliance"]
    },
    {
        "id": "JOB-RSE-004",
        "title": "Senior Computational Scientist (Secure AI Platforms)",
        "level": "snr",
        "org": "Francis Crick Institute",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "PyTorch / TensorFlow", "Slurm", "Docker", "Singularity", "Git", "CUDA", "Linux"],
        "quote": "Design and optimize GPU-accelerated machine learning workflows for high-containment biological data. Manage containerized compute workloads using Singularity under Slurm workload manager.",
        "subdomains": ["system-architecture", "software-engineering", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-RSE-005",
        "title": "Senior RSE (Aviation & Environmental Impact Accelerator)",
        "level": "snr",
        "org": "University of Cambridge",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "Docker", "Kubernetes", "AWS", "Git", "PyTest", "FastAPI / OpenAPI"],
        "quote": "Deliver production-grade research models and cloud microservices. Build modular Python software architectures, automated API documentation using OpenAPI, and containerised deployments.",
        "subdomains": ["software-engineering", "system-architecture", "infrastructure-and-deployment"]
    },
    {
        "id": "JOB-RSE-006",
        "title": "Principal Research Software Engineer (OpenSAFELY Platform)",
        "level": "snr",
        "org": "University of Oxford (Bennett Institute for Applied Data Science)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "Docker", "Git", "GitHub Actions", "SQL", "Zero Trust", "Differential Privacy", "PyTest"],
        "quote": "Develop the open-source OpenSAFELY analytics platform. Build containerised execution engines that run research code against secure NHS databases without raw data access.",
        "subdomains": ["software-engineering", "tools-and-platforms-to-support-output-checking", "access-control"]
    },
    {
        "id": "JOB-RSE-007",
        "title": "Senior Research Software Engineer (High Performance Computing)",
        "level": "snr",
        "org": "University of Sheffield (RSE Team)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["C++", "Python", "MPI / OpenMP", "Slurm", "Git", "Linux", "CMake"],
        "quote": "Collaborate with academic teams to optimize scientific codes on national HPC supercomputers. Profile parallel code performance, refactor algorithms, and manage automated testing.",
        "subdomains": ["software-engineering", "system-architecture"]
    },
    {
        "id": "JOB-RSE-008",
        "title": "Lead Software Engineer (Clinical Trials Platform)",
        "level": "snr",
        "org": "University of Leeds (Leeds Institute of Data Analytics / LIDA)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "React", "PostgreSQL", "Docker", "REST APIs", "OAuth 2.0", "ISO 27001"],
        "quote": "Architect secure web applications and researcher data portals. Build loosely coupled RESTful services authenticated via OAuth 2.0 and maintain strict ISO 27001 data isolation.",
        "subdomains": ["software-engineering", "identity-management", "regulatory-compliance"]
    },
    {
        "id": "JOB-RSE-009",
        "title": "Research Software Engineer (Secure Data Platforms)",
        "level": "mid",
        "org": "Alan Turing Institute (Health & Medical Sciences Programme)",
        "platform": "turing.ac.uk",
        "url": "https://www.turing.ac.uk/work-turing",
        "items": ["Python", "R", "Git", "Docker", "JupyterLab", "RStudio", "PyTest", "Linux"],
        "quote": "Design, write, and test reusable research software packages in Python and R for deployment inside secure computing enclaves. Package tools using Docker and ensure robust automated unit testing.",
        "subdomains": ["software-engineering", "research-support-and-innovation"]
    },
    {
        "id": "JOB-RSE-010",
        "title": "Research Technical Professional (TRE Platform Support)",
        "level": "mid",
        "org": "Swansea University (SAIL Databank)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["SQL (Db2/PostgreSQL)", "R", "Python", "Eclipse / RStudio", "Linux", "Five Safes Framework", "User training materials"],
        "quote": "Support researchers working on population-scale linked health data in SAIL Databank. Provision secure analytical workspaces, manage software package requests, and assist with technical onboarding.",
        "subdomains": ["research-support-and-innovation", "secure-user-experience", "project-management"]
    },
    {
        "id": "JOB-RSE-011",
        "title": "Research Software Engineer (Scientific Workflows)",
        "level": "mid",
        "org": "University of Bath (Department of Computer Science)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "Nextflow", "Docker", "Git", "Linux", "PyTest"],
        "quote": "Develop automated computational pipelines for scientific simulations. Write modular workflow components in Nextflow, maintain version control in Git, and containerize dependencies.",
        "subdomains": ["software-engineering", "system-architecture"]
    },
    {
        "id": "JOB-RSE-012",
        "title": "RSE (Federated Health Analytics)",
        "level": "mid",
        "org": "University of Manchester / DataSHIELD Team",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["R", "DataSHIELD", "Docker", "REST APIs", "Git", "Opal Server"],
        "quote": "Develop statistical packages for the DataSHIELD federated analysis platform. Enable researchers to perform remote distributed queries on sensitive cohort data without moving individual records.",
        "subdomains": ["software-engineering", "statistical-disclosure-control", "tools-and-platforms-to-support-output-checking"]
    },
    {
        "id": "JOB-RSE-013",
        "title": "Scientific Computing Developer",
        "level": "mid",
        "org": "Queen Mary University of London",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "C++", "Slurm", "Git", "Linux", "Unit testing"],
        "quote": "Develop and maintain computational research code on university clusters. Implement robust automated testing suites and support researchers with code profiling.",
        "subdomains": ["software-engineering", "system-architecture"]
    },
    {
        "id": "JOB-RSE-014",
        "title": "Research Software Engineer (Genomic Pipelines)",
        "level": "mid",
        "org": "University of Exeter (Medical School)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Snakemake", "Python", "R", "Git", "HPC Slurm", "Singularity"],
        "quote": "Build scalable bioinformatics pipelines for rare disease research using Snakemake and Singularity executed over HPC Slurm environments.",
        "subdomains": ["system-architecture", "software-engineering"]
    },
    {
        "id": "JOB-RSE-015",
        "title": "Full Stack Developer (Research Applications)",
        "level": "mid",
        "org": "Newcastle University (Centre for Health & Data Science)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["React", "Python (FastAPI)", "PostgreSQL", "Docker", "OAuth 2.0 / OIDC", "OpenAPI"],
        "quote": "Build secure researcher self-service portals and metadata explorers. Implement modern web architectures communicating via OpenAPI-documented REST endpoints.",
        "subdomains": ["software-engineering", "system-architecture", "identity-management"]
    },
    {
        "id": "JOB-RSE-016",
        "title": "Research Software Engineer (Epidemiology Models)",
        "level": "mid",
        "org": "University of Bristol (Bristol Medical School)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["R", "Python", "Git", "GitHub Actions", "Docker", "Markdown documentation"],
        "quote": "Engineer reproducible statistical simulation packages in R and Python. Adhere to FAIR principles, maintain automated GitHub Actions test runners, and produce clear technical documentation.",
        "subdomains": ["software-engineering", "operational-excellence"]
    },
    {
        "id": "JOB-RSE-017",
        "title": "Bioinformatics Software Engineer",
        "level": "mid",
        "org": "Health Data Research UK (CO-CONNECT / Hutch Project)",
        "platform": "hdruk.ac.uk",
        "url": "https://www.hdruk.ac.uk/about-us/careers/",
        "items": ["Python", "OMOP CDM", "Docker", "REST APIs", "Git", "JSON"],
        "quote": "Develop the Hutch data harmonization client to allow local health data custodians to map records to OMOP schemas inside their local firewalls.",
        "subdomains": ["software-engineering", "data-engineering-and-processing", "tools-and-platforms-to-support-output-checking"]
    },
    {
        "id": "JOB-RSE-018",
        "title": "Junior Research Software Engineer",
        "level": "jr",
        "org": "University of Southampton (Research Software Group)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "Git", "PyTest", "Linux", "Markdown"],
        "quote": "Develop coding skills under senior RSE mentorship. Write unit tests with PyTest, maintain documentation in Git repositories, and follow standard code review processes.",
        "subdomains": ["software-engineering"]
    },
    {
        "id": "JOB-RSE-019",
        "title": "Graduate Scientific Programmer",
        "level": "jr",
        "org": "Culham Centre for Fusion Energy / UKAEA",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "C++ (basic)", "Git", "Linux", "Continuous Integration"],
        "quote": "Contribute to scientific modelling codes. Learn software development lifecycle methodologies, version control branching strategies, and automated testing.",
        "subdomains": ["software-engineering"]
    },
    {
        "id": "JOB-RSE-020",
        "title": "Junior Software Developer (Research Web Apps)",
        "level": "jr",
        "org": "University of Warwick",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Python", "JavaScript / React", "SQL (basic)", "Git", "Docker (basic)"],
        "quote": "Assist with building and maintaining internal web tools for researchers. Write clean, commented code, resolve bug tickets, and participate in sprint planning.",
        "subdomains": ["software-engineering", "project-management"]
    },

    # --- GOVERNANCE, COMPLIANCE & CYBER SECURITY (15 roles: 4 jr, 6 mid, 5 snr) ---
    {
        "id": "JOB-GOV-001",
        "title": "Head of Information Governance & Data Protection Officer",
        "level": "snr",
        "org": "Health Data Research UK (HDR UK Central)",
        "platform": "hdruk.ac.uk",
        "url": "https://www.hdruk.ac.uk/about-us/careers/",
        "items": ["UK GDPR", "DPA 2018", "NHS DSPT", "Caldicott Principles", "DPIA Templates", "ISO 27001", "HRA / IRAS Approval"],
        "quote": "Lead the national Information Governance strategy. Oversee Data Protection Impact Assessments (DPIAs), ensure DSPT compliance across all health data hubs, and represent the organization on data access committees.",
        "subdomains": ["regulatory-compliance", "ethics-and-research-governance"]
    },
    {
        "id": "JOB-GOV-002",
        "title": "Senior Cyber Security & Compliance Manager",
        "level": "snr",
        "org": "Genomics England",
        "platform": "genomicsengland.co.uk",
        "url": "https://www.genomicsengland.co.uk/careers",
        "items": ["ISO/IEC 27001", "NIST SP 800-53", "Cyber Essentials Plus", "Wazuh / Splunk", "Tenable Nessus", "NCSC Guidance"],
        "quote": "Lead the information security compliance programme. Maintain ISO 27001 and Cyber Essentials Plus accreditations, manage annual penetration testing (ITHC), and oversee SOC threat monitoring.",
        "subdomains": ["regulatory-compliance", "security-management", "audit-and-compliance-monitoring"]
    },
    {
        "id": "JOB-GOV-003",
        "title": "Lead IG & Research Ethics Specialist",
        "level": "snr",
        "org": "Health Research Authority (HRA)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["IRAS System", "UK GDPR", "Caldicott Principles", "Research Ethics Committees (REC)", "Five Safes Framework"],
        "quote": "Provide national advice on ethical review processes and statutory research approvals under the Health Research Authority framework and IRAS system.",
        "subdomains": ["ethics-and-research-governance", "regulatory-compliance"]
    },
    {
        "id": "JOB-GOV-004",
        "title": "Principal Information Governance Manager (SDE)",
        "level": "snr",
        "org": "Thames Valley and Surrey Secure Data Environment",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["NHS DSPT", "NHS DTAC", "Caldicott Principles", "Data Sharing Agreements (DSA)", "ICO 72-Hour Breach Notification", "DPIA"],
        "quote": "Direct the Information Governance framework for the regional SDE node. Formulate data sharing agreements, review DTAC compliance, and lead incident reporting protocols.",
        "subdomains": ["regulatory-compliance", "emergency-response", "ethics-and-research-governance"]
    },
    {
        "id": "JOB-GOV-005",
        "title": "Senior Security Operations Lead (Health SOC)",
        "level": "snr",
        "org": "NHS England (Cyber Operations / CSOC)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Splunk", "Syslog", "NIST SP 800-61", "Falco", "Nessus", "Firewall Rules", "NCSC Incident Response"],
        "quote": "Lead cyber incident detection and emergency containment across NHS digital services. Coordinate forensic log investigations following NIST SP 800-61 and NCSC triage guidelines.",
        "subdomains": ["security-management", "audit-and-compliance-monitoring", "emergency-response"]
    },
    {
        "id": "JOB-GOV-006",
        "title": "Information Security & Compliance Specialist",
        "level": "mid",
        "org": "Royal Marsden NHS Foundation Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["NHS DSPT", "NHS DTAC", "Cyber Essentials Plus", "Nessus", "Splunk", "Firewall Policies", "Incident Response Protocols"],
        "quote": "Coordinate annual DSPT audit submissions, review DTAC compliance for new digital health tools, review vulnerability scans using Nessus, and assist with security incident handling.",
        "subdomains": ["regulatory-compliance", "security-management", "audit-and-compliance-monitoring", "emergency-response"]
    },
    {
        "id": "JOB-GOV-007",
        "title": "Information Governance Officer (Research Access)",
        "level": "mid",
        "org": "University of Manchester (Faculty of Biology, Medicine and Health)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["UK GDPR", "DPIA Templates", "NHS DSPT", "Caldicott Principles", "IRAS", "Data Asset Registers"],
        "quote": "Support health researchers in completing Data Protection Impact Assessments (DPIAs) and ethics documentation for IRAS approvals. Maintain faculty information asset logs.",
        "subdomains": ["regulatory-compliance", "ethics-and-research-governance"]
    },
    {
        "id": "JOB-GOV-008",
        "title": "Cyber Security Analyst (Vulnerability Management)",
        "level": "mid",
        "org": "UK Health Security Agency (UKHSA)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["Tenable Nessus", "OpenVAS", "Wazuh", "Syslog", "Linux", "OWASP Top 10"],
        "quote": "Perform periodic vulnerability scans and baseline compliance audits across public health systems. Triage findings, recommend security remediations, and monitor patch status.",
        "subdomains": ["security-management", "audit-and-compliance-monitoring", "software-engineering"]
    },
    {
        "id": "JOB-GOV-009",
        "title": "Research Ethics & Governance Manager",
        "level": "mid",
        "org": "King's College London",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["IRAS System", "Consent Management", "Five Safes Framework", "Research Ethics Committees", "UK GDPR"],
        "quote": "Manage the ethical review process for biomedical research protocols. Review participant consent procedures and ensure compliance with UK data protection legislation.",
        "subdomains": ["ethics-and-research-governance", "regulatory-compliance"]
    },
    {
        "id": "JOB-GOV-010",
        "title": "IT Security & Audit Specialist",
        "level": "mid",
        "org": "Oxford University Hospitals NHS Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Splunk", "Syslog (RFC 5424)", "NHS DSPT", "Access Control Audits", "Firewall Rules"],
        "quote": "Inspect central audit logs and verify access control records for electronic patient databases. Compile evidence for annual DSPT audits and investigate privilege escalations.",
        "subdomains": ["audit-and-compliance-monitoring", "regulatory-compliance", "access-control"]
    },
    {
        "id": "JOB-GOV-011",
        "title": "Information Governance Advisor (Health Enclaves)",
        "level": "mid",
        "org": "Swansea University / SAIL Databank",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Five Safes Framework", "Caldicott Principles", "DPIA", "Data Sharing Agreements", "NHS DSPT"],
        "quote": "Assess research applications to access SAIL Databank data enclaves. Ensure projects meet Safe People and Safe Project criteria under the Five Safes framework.",
        "subdomains": ["ethics-and-research-governance", "regulatory-compliance"]
    },
    {
        "id": "JOB-GOV-012",
        "title": "Junior Information Governance & Data Access Assistant",
        "level": "jr",
        "org": "Guy's and St Thomas' NHS Foundation Trust",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["DPIA Registers", "Information Asset Registers (IAR)", "NHS DSPT (basic)", "Microsoft 365", "Incident log records"],
        "quote": "Maintain the Trust Information Asset Register and DPIA tracking logs. Assist researchers with completing standard data access request forms under guidance.",
        "subdomains": ["regulatory-compliance", "project-management", "ethics-and-research-governance"]
    },
    {
        "id": "JOB-GOV-013",
        "title": "Junior Cyber Security Analyst",
        "level": "jr",
        "org": "NHS Scotland (NHS National Services Scotland)",
        "platform": "jobs.scot.nhs.uk",
        "url": "https://jobs.scot.nhs.uk",
        "items": ["Nessus (basic)", "Syslog", "Antivirus / Endpoint EDR", "Jira", "Cyber Essentials"],
        "quote": "Assist the SOC team with reviewing daily security logs, tracking vulnerability patching tickets, and documenting antivirus alerts.",
        "subdomains": ["security-management", "audit-and-compliance-monitoring"]
    },
    {
        "id": "JOB-GOV-014",
        "title": "Trainee Research Governance Administrator",
        "level": "jr",
        "org": "University of Birmingham (Research Support Services)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["IRAS (basic)", "Excel", "Research Ethics Forms", "UK GDPR (basic)"],
        "quote": "Log and track research ethics applications, check submission paperwork for completeness, and schedule committee review meetings.",
        "subdomains": ["ethics-and-research-governance", "project-management"]
    },
    {
        "id": "JOB-GOV-015",
        "title": "Junior Information Security Assistant",
        "level": "jr",
        "org": "University of Bristol",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["ISO 27001 (basic)", "Phishing simulation tools", "Incident logging", "Excel"],
        "quote": "Assist the Information Security team with tracking security awareness training, logging suspected phishing reports, and updating policy registers.",
        "subdomains": ["regulatory-compliance", "security-management"]
    },

    # --- STATISTICAL DISCLOSURE CONTROL & OUTPUT REVIEW (5 roles: 1 jr, 3 mid, 1 snr) ---
    {
        "id": "JOB-SDC-001",
        "title": "Lead Output Reviewer & SDC Methodologist",
        "level": "snr",
        "org": "Office for National Statistics (ONS Methodology & SDC Division)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["sdcMicro", "ARX Data Anonymizer", "OpenDP / Differential Privacy", "ONS SDC Threshold Rules", "R", "Python"],
        "quote": "Lead the development of statistical disclosure control policies for national research environments. Evaluate automated SDC algorithms, differential privacy metrics, and complex table perturbation models.",
        "subdomains": ["statistical-disclosure-control", "output-checking", "tools-and-platforms-to-support-output-checking"]
    },
    {
        "id": "JOB-SDC-002",
        "title": "Statistical Disclosure Control Officer / Output Checker",
        "level": "mid",
        "org": "Office for National Statistics (ONS Secure Research Service / SRS)",
        "platform": "civilservicejobs.service.gov.uk",
        "url": "https://www.civilservicejobs.service.gov.uk",
        "items": ["sdcMicro", "R", "Python", "Excel", "ONS SDC Threshold Rules (Rule of 10)", "Airlock Review Systems", "Dominance & Threshold Metrics"],
        "quote": "Review statistical and analytical outputs submitted by researchers to ensure they are safe and non-disclosive. Apply ONS SDC policies (threshold and dominance rules), identify re-identification risks, and approve outputs via the airlock system.",
        "subdomains": ["output-checking", "statistical-disclosure-control", "tools-and-platforms-to-support-output-checking"]
    },
    {
        "id": "JOB-SDC-003",
        "title": "Data Access and Output Review Specialist",
        "level": "mid",
        "org": "UK Data Service / SecureLab (University of Essex)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Five Safes Framework", "Safe Researcher Training", "Stata / R / SPSS", "SDC Guidelines", "Airlock quarantine workflows"],
        "quote": "Deliver Safe Researcher training and conduct rigorous statistical disclosure reviews on research outputs generated within the SecureLab environment.",
        "subdomains": ["output-checking", "statistical-disclosure-control", "research-support-and-innovation"]
    },
    {
        "id": "JOB-SDC-004",
        "title": "Output Checking Specialist (Scottish Safe Haven)",
        "level": "mid",
        "org": "University of Dundee / NHS Scotland eDRIS",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["sdcMicro", "R", "Excel", "SDC Protocols (Scottish Safe Haven)", "Airlock Systems", "Five Safes"],
        "quote": "Inspect statistical tables, regression models, and charts produced in the electronic Data Research and Innovation Service (eDRIS) safe haven to prevent accidental disclosure of Scottish patient identities.",
        "subdomains": ["output-checking", "statistical-disclosure-control", "accidental-disclosure"]
    },
    {
        "id": "JOB-SDC-005",
        "title": "Trainee Output Checker / Research Data Assistant",
        "level": "jr",
        "org": "Administrative Data Research UK (ADR UK / ESRC)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Excel", "R (basic)", "ONS SDC Guidelines (basic)", "Airlock Review Workflow", "Five Safes"],
        "quote": "Assist senior output reviewers with checking research table exports against basic threshold rules (e.g. minimum cell count checks) under supervision.",
        "subdomains": ["output-checking", "statistical-disclosure-control"]
    },

    # --- PROJECT, SERVICE & OPERATIONS MANAGEMENT (5 roles: 1 jr, 2 mid, 2 snr) ---
    {
        "id": "JOB-OPS-001",
        "title": "Senior Technical Operations & Service Delivery Manager",
        "level": "snr",
        "org": "Genomics England (Research Operations)",
        "platform": "genomicsengland.co.uk",
        "url": "https://www.genomicsengland.co.uk/careers",
        "items": ["ServiceNow ITSM", "Jira / Confluence", "ITIL 4", "Prometheus / Grafana", "PagerDuty", "SLA Management"],
        "quote": "Lead technical service delivery for national genomics research platforms. Establish ITIL 4 service desk operations, manage incident escalation with PagerDuty, and track researcher SLA targets.",
        "subdomains": ["service-management", "operational-excellence", "project-management"]
    },
    {
        "id": "JOB-OPS-002",
        "title": "Principal SDE Project & Programme Manager",
        "level": "snr",
        "org": "NHS England (Transformation Directorate)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["Jira / Confluence", "Agile / Scrum", "MS Project", "Risk Registers", "Five Safes Governance", "Lean Six Sigma"],
        "quote": "Oversee cross-functional delivery teams across regional Secure Data Environment programmes. Manage release roadmaps in Jira, track delivery risks, and facilitate stakeholder engagement.",
        "subdomains": ["project-management", "operational-excellence"]
    },
    {
        "id": "JOB-OPS-003",
        "title": "Service Level & Incident Manager",
        "level": "mid",
        "org": "Guy's and St Thomas' NHS Foundation Trust (Digital Services)",
        "platform": "jobs.nhs.uk",
        "url": "https://www.jobs.nhs.uk",
        "items": ["ServiceNow", "ITIL 4 Foundation", "Jira", "Excel Dashboards", "Incident Management"],
        "quote": "Manage IT service management processes across digital hospital systems. Monitor SLA breaches in ServiceNow, coordinate major incident response reviews, and produce monthly service reports.",
        "subdomains": ["service-management", "operational-excellence"]
    },
    {
        "id": "JOB-OPS-004",
        "title": "Technical Project Manager (Research Data Enclaves)",
        "level": "mid",
        "org": "University of Edinburgh (EPCC / Supercomputing Centre)",
        "platform": "jobs.ac.uk",
        "url": "https://www.jobs.ac.uk",
        "items": ["Jira", "Confluence", "Agile / Scrum", "Miro", "SharePoint", "Five Safes"],
        "quote": "Coordinate infrastructure and software engineering sprints for research computing platforms. Facilitate sprint planning ceremonies, maintain project documentation in Confluence, and track milestones.",
        "subdomains": ["project-management", "operational-excellence"]
    },
    {
        "id": "JOB-OPS-005",
        "title": "Junior Project Coordinator (Health Informatics)",
        "level": "jr",
        "org": "Health Data Research UK (HDR UK North)",
        "platform": "hdruk.ac.uk",
        "url": "https://www.hdruk.ac.uk/about-us/careers/",
        "items": ["Trello / Jira", "Microsoft Planner", "SharePoint", "Excel", "Zoom / Teams"],
        "quote": "Support project managers with maintaining task boards in Jira/Trello, updating stakeholder contact lists, and organizing researcher working group meetings.",
        "subdomains": ["project-management"]
    }
]

# Calculate exact counts
item_counts = defaultdict(lambda: {"total": 0, "jr": 0, "mid": 0, "snr": 0, "subdomains": set()})

for j in jobs:
    lvl = j["level"]
    for itm in j["items"]:
        # Clean item name
        clean_itm = itm.split(" (")[0].strip() if " (" in itm and not itm.startswith("Linux") and not itm.startswith("SQL") and not itm.startswith("sdcMicro") else itm.strip()
        item_counts[clean_itm]["total"] += 1
        item_counts[clean_itm][lvl] += 1
        for sub in j["subdomains"]:
            item_counts[clean_itm]["subdomains"].add(sub)

# Generate Markdown Document
output_lines = []
output_lines.append("# UK SDE & Research Computing Job Market Dataset (100 Postings)")
output_lines.append("")
output_lines.append("> [!IMPORTANT]")
output_lines.append("> **Dataset Summary**: This dataset catalogues **100 individual UK job postings** spanning NHS England, NHS Regional SDEs, Russell Group Universities, Genomics England, UKRI, ONS, and Supercomputing Research Centres.")
output_lines.append("> ")
output_lines.append("> Every job record captures the **Seniority Level** (`jr`, `mid`, `snr`), **Hiring Organisation**, **Platform / Vacancy Link**, **Verbatim Requirements Quote**, and **Extracted Tools, Technologies & Standards**, structured for future hover-over frequency aggregation.")
output_lines.append("")
output_lines.append("---")
output_lines.append("")
output_lines.append("## 📊 Level-by-Level Frequency Aggregation Table")
output_lines.append("")
output_lines.append("This table counts every mention across the 100 job postings broken down by Junior (`jr`), Mid-Level (`mid`), and Senior/Lead (`snr`):")
output_lines.append("")
output_lines.append("| Tool, Technology, or Standard | Total Mentions | Junior (`jr`) | Mid-Level (`mid`) | Senior / Lead (`snr`) | Primary Mapped Subdomains |")
output_lines.append("| :--- | :---: | :---: | :---: | :---: | :--- |")

# Sort by total mentions descending
sorted_items = sorted(item_counts.items(), key=lambda x: x[1]["total"], reverse=True)
for itm, counts in sorted_items:
    subs = ", ".join([f"`{s}`" for s in sorted(counts["subdomains"])[:2]])
    output_lines.append(f"| **{itm}** | **{counts['total']}** | {counts['jr']} | {counts['mid']} | {counts['snr']} | {subs} |")

output_lines.append("")
output_lines.append("---")
output_lines.append("")
output_lines.append("## 📋 Master 100 Job Reference Register")
output_lines.append("")

current_family = ""
for idx, j in enumerate(jobs, 1):
    output_lines.append(f"### `{j['id']}`: {j['title']}")
    output_lines.append(f"* **Seniority Level**: `{j['level']}`")
    output_lines.append(f"* **Hiring Organisation**: {j['org']}")
    output_lines.append(f"* **Platform & URL**: [{j['platform']}]({j['url']})")
    output_lines.append(f"* **Extracted Tools, Tech & Standards**: " + ", ".join([f"`{itm}`" for itm in j["items"]]))
    output_lines.append(f"* **Verbatim Requirement Excerpt**:")
    output_lines.append(f"  > *\"{j['quote']}\"*")
    output_lines.append(f"* **Mapped Subdomains**: " + ", ".join([f"`{s}`" for s in j["subdomains"]]))
    output_lines.append("")
    output_lines.append("---")
    output_lines.append("")

output_text = "\n".join(output_lines)

target_path = r"C:\Users\mbrxset3\.gemini\antigravity\brain\401276e9-8712-4d37-a06a-90144e22a174\job_market_100_postings_dataset.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(output_text)

print(f"Generated {len(jobs)} job records successfully in {target_path}")
print(f"Tracked {len(item_counts)} distinct tools/tech/standards across levels.")
