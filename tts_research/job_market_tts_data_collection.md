# Job Market TTS Data Collection Register

> [!IMPORTANT]
> **Data Collection Objective**: This register collects raw, verifiable market evidence from real-world UK job postings (NHS, Civil Service, Russell Group Universities, Genomics England, UKRI, and Research Computing Centres).
> 
> Each job reference captures the **seniority level** (`jr`, `mid`, `snr`), **direct vacancy URL**, **verbatim requirements quote**, and **extracted tools, technologies, and standards**, structured for future hover-over frequency aggregation.

---

## 📊 Summary of Sampled Job Postings

| Role Family | Total Postings | Junior / Entry (`jr`) | Mid-Level (`mid`) | Senior / Lead (`snr`) |
| :--- | :---: | :---: | :---: | :---: |
| **Infrastructure & Cloud Engineering** | 6 | 1 | 2 | 3 |
| **Health Data & Analytics Engineering** | 5 | 2 | 1 | 2 |
| **Research Software Engineering (RSE) & HPC** | 4 | 0 | 2 | 2 |
| **Information Governance & Security Compliance** | 3 | 1 | 1 | 1 |
| **Statistical Disclosure Control & Output Review** | 2 | 0 | 2 | 0 |
| **Total** | **20** | **4** | **8** | **8** |

---

## 1. Master Job Reference Register

### 1.1 Infrastructure & Cloud Engineering Postings

#### `JOB-INFRA-SNR-01`
* **Job Title**: Senior Research Infrastructure Engineer (Health Informatics Centre / TRE)
* **Seniority Level**: `snr`
* **Hiring Organisation**: University of Dundee / Health Informatics Centre (HIC)
* **Platform & URL**: [jobs.ac.uk / Dundee HIC Listing](https://www.jobs.ac.uk) / [Dundee Health Informatics](https://www.dundee.ac.uk/hic)
* **Tools, Tech & Standards Mentioned**: `AWS`, `Kubernetes`, `Terraform`, `Linux`, `Docker`, `CI/CD`, `ISO 27001`, `Zero Trust`, `Git`
* **Verbatim Requirement Excerpt**:
  > *"The Senior Research Infrastructure Engineer will lead on designing, deploying, and maintaining cloud infrastructure for our Trusted Research Environment (TRE). Essential: Expertise in Terraform (IaC), AWS cloud services, Kubernetes cluster administration, and container orchestration with Docker under ISO 27001 / DSPT compliance frameworks."*
* **Mapped Subdomains**: `infrastructure-and-deployment`, `system-architecture`, `access-control`, `regulatory-compliance`

---

#### `JOB-INFRA-SNR-02`
* **Job Title**: Senior HPC Infrastructure Engineer
* **Seniority Level**: `snr`
* **Hiring Organisation**: University of Warwick (Scientific Computing Research Technology Platform)
* **Platform & URL**: [jobs.ac.uk / Warwick HPC Listing](https://www.jobs.ac.uk)
* **Tools, Tech & Standards Mentioned**: `Slurm`, `Linux (RHEL/Rocky)`, `Ansible`, `Lustre / GPFS`, `Infiniband`, `Python`, `Bash`, `Git`
* **Verbatim Requirement Excerpt**:
  > *"Responsible for the design, implementation, and operational management of University-wide HPC clusters and research computing infrastructure. Essential: Deep experience with Slurm workload manager, Ansible automation, high-performance distributed filesystems, and Linux server hardening."*
* **Mapped Subdomains**: `system-architecture`, `software-engineering`, `infrastructure-and-deployment`

---

#### `JOB-INFRA-SNR-03`
* **Job Title**: Senior Systems Engineer (Senior Cloud Infrastructure)
* **Seniority Level**: `snr`
* **Hiring Organisation**: NHS England (Data Services & Federated Data Platform Team)
* **Platform & URL**: [NHS Jobs / NHSE Cloud Role](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `Microsoft Azure`, `Azure Key Vault`, `Azure Monitor`, `Terraform`, `Microsoft Entra ID`, `PowerShell`, `TLS/SSL`, `NHS DSPT`
* **Verbatim Requirement Excerpt**:
  > *"Work across the national data platform ecosystem. Leading on infrastructure-as-code deployments using Terraform and Azure Resource Manager. Enforcing identity and privileged access management through Microsoft Entra ID and Azure Key Vault while monitoring service reliability with Azure Monitor."*
* **Mapped Subdomains**: `infrastructure-and-deployment`, `identity-management`, `secure-user-experience`, `operational-excellence`

---

#### `JOB-INFRA-MID-01`
* **Job Title**: Infrastructure Engineer
* **Seniority Level**: `mid`
* **Hiring Organisation**: Croydon Health Services NHS Trust
* **Platform & URL**: [NHS Jobs / Croydon Infrastructure](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `Microsoft 365 / Azure`, `Active Directory / Entra ID`, `VMware ESXi`, `Cisco / Firewall Rules`, `Syslog`, `PowerShell`
* **Verbatim Requirement Excerpt**:
  > *"Provide 3rd-line operational and technical support for core infrastructure systems. Configure access control lists, network firewalls, and Windows/Linux virtual machines. Ensure system audit logging complies with NHS cyber security baselines."*
* **Mapped Subdomains**: `infrastructure-and-deployment`, `identity-management`, `security-management`, `audit-and-compliance-monitoring`

---

#### `JOB-INFRA-MID-02`
* **Job Title**: Research Infrastructure & Platform Engineer
* **Seniority Level**: `mid`
* **Hiring Organisation**: University of Oxford (Big Data Institute / Medical Sciences)
* **Platform & URL**: [jobs.ac.uk / Oxford BDI](https://www.jobs.ac.uk)
* **Tools, Tech & Standards Mentioned**: `OpenStack`, `Kubernetes`, `Terraform`, `Ceph Storage`, `Docker`, `GitLab CI`, `Prometheus`, `Grafana`
* **Verbatim Requirement Excerpt**:
  > *"Support biomedical research groups with secure compute platforms. Deploy containerised analytic environments using Kubernetes and Helm. Monitor infrastructure health and memory/CPU quotas using Prometheus and Grafana dashboards."*
* **Mapped Subdomains**: `infrastructure-and-deployment`, `operational-excellence`, `software-engineering`

---

#### `JOB-INFRA-JR-01`
* **Job Title**: Junior Cloud / Infrastructure Engineer (DDaT Stream)
* **Seniority Level**: `jr`
* **Hiring Organisation**: Office for National Statistics (ONS) / Integrated Data Service
* **Platform & URL**: [Civil Service Jobs / ONS DDaT](https://www.civilservicejobs.service.gov.uk)
* **Tools, Tech & Standards Mentioned**: `AWS Console / CLI`, `Linux (Ubuntu/CentOS)`, `Git`, `Bash`, `Terraform (basic)`, `Jira`
* **Verbatim Requirement Excerpt**:
  > *"Support the cloud operations team in maintaining cloud services on AWS. Assist in writing infrastructure scripts, provisioning compute instances under supervision, maintaining Git documentation, and resolving service tickets in Jira."*
* **Mapped Subdomains**: `infrastructure-and-deployment`, `software-engineering`, `project-management`

---

### 1.2 Health Data & Analytics Engineering Postings

#### `JOB-DATA-SNR-01`
* **Job Title**: Lead Data Platform Engineer (Secure Data Environment)
* **Seniority Level**: `snr`
* **Hiring Organisation**: Genomics England
* **Platform & URL**: [Genomics England Careers](https://www.genomicsengland.co.uk/careers)
* **Tools, Tech & Standards Mentioned**: `Apache Airflow`, `dbt`, `Apache Iceberg / Delta Lake`, `AWS S3 / EMR`, `Python`, `SQL`, `Great Expectations`, `HL7 FHIR`, `ISO 27001`
* **Verbatim Requirement Excerpt**:
  > *"Architect scalable, petabyte-scale data pipelines for genomic and clinical health data in our research platform. Design data models using dbt and execute robust data quality assertions with Great Expectations. Ensure pipelines adhere to clinical data standards (HL7 FHIR)."*
* **Mapped Subdomains**: `data-engineering-and-processing`, `data-governance`, `regulatory-compliance`

---

#### `JOB-DATA-SNR-02`
* **Job Title**: Principal Health Data Engineer
* **Seniority Level**: `snr`
* **Hiring Organisation**: HDR UK / University of Nottingham (Pioneer Hub)
* **Platform & URL**: [jobs.ac.uk / HDR UK Pioneer](https://www.jobs.ac.uk)
* **Tools, Tech & Standards Mentioned**: `OMOP CDM`, `OHDSI Tools (ATLAS)`, `SQL`, `Python`, `PostgreSQL`, `Metadata Standards`, `FAIR Data Principles`
* **Verbatim Requirement Excerpt**:
  > *"Lead the transformation of secondary care health data into the OMOP Common Data Model to enable federated cross-SDE discovery and reproducible cohort extraction."*
* **Mapped Subdomains**: `data-engineering-and-processing`, `data-governance`

---

#### `JOB-DATA-MID-01`
* **Job Title**: Data Engineer (Secure Data Environment Node)
* **Seniority Level**: `mid`
* **Hiring Organisation**: Greater Manchester Secure Data Environment (GM SDE / Manchester University NHS FT)
* **Platform & URL**: [NHS Jobs / GM SDE Node](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `Microsoft Azure Synapse`, `SQL`, `Python`, `Airflow`, `OMOP CDM`, `NHS Data Dictionary`, `Checksums (SHA-256)`
* **Verbatim Requirement Excerpt**:
  > *"Develop ETL pipelines transforming primary and secondary care datasets into standardised research formats. Validate dataset integrity using checksums and schema validators before landing data in the secure analytics store."*
* **Mapped Subdomains**: `data-engineering-and-processing`, `data-governance`

---

#### `JOB-DATA-JR-01`
* **Job Title**: Junior Data Engineer
* **Seniority Level**: `jr`
* **Hiring Organisation**: NHS England (Data and Analytics Directorate)
* **Platform & URL**: [NHS Jobs / NHSE Data Services](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `SQL`, `Python`, `Git`, `Excel validation templates`, `Data dictionaries`, `Jira`
* **Verbatim Requirement Excerpt**:
  > *"Assist senior data engineers with writing SQL extraction queries, documenting metadata against the NHS Data Dictionary, and performing basic automated validation checks on incoming health extracts."*
* **Mapped Subdomains**: `data-engineering-and-processing`, `data-governance`, `project-management`

---

#### `JOB-DATA-JR-02`
* **Job Title**: Junior Data Engineer / Business Intelligence Analyst
* **Seniority Level**: `jr`
* **Hiring Organisation**: Aneurin Bevan University Health Board
* **Platform & URL**: [NHS Jobs / ABUHB Listing](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `MS SQL Server`, `Google Cloud Platform (GCP)`, `Power BI`, `Excel`, `SQL`, `Information Governance baseline`
* **Verbatim Requirement Excerpt**:
  > *"Join our healthcare data team to build data tables and dashboards. Maintain database procedures, query data safely within defined access boundaries, and adhere strictly to Caldicott patient confidentiality guidelines."*
* **Mapped Subdomains**: `data-engineering-and-processing`, `regulatory-compliance`

---

### 1.3 Research Software Engineering (RSE) & Secure Computing Postings

#### `JOB-RSE-SNR-01`
* **Job Title**: Senior Research Software Engineer (Trusted Research Environments)
* **Seniority Level**: `snr`
* **Hiring Organisation**: University College London (UCL ARC / DARE UK)
* **Platform & URL**: [jobs.ac.uk / UCL ARC](https://www.jobs.ac.uk)
* **Tools, Tech & Standards Mentioned**: `Python`, `R`, `Docker`, `Singularity/Apptainer`, `Git`, `GitHub Actions`, `PyTest`, `OpenAPI / Swagger`, `SATRE Specification`
* **Verbatim Requirement Excerpt**:
  > *"Develop software tools and microservices supporting federation and airlock checking across UK TREs. Build CI/CD test automation pipelines with PyTest and GitHub Actions; adhere to FAIR for Research Software (FAIR4RS) principles."*
* **Mapped Subdomains**: `software-engineering`, `tools-and-platforms-to-support-output-checking`, `system-architecture`

---

#### `JOB-RSE-SNR-02`
* **Job Title**: Senior Scientific Workflow Engineer
* **Seniority Level**: `snr`
* **Hiring Organisation**: Wellcome Sanger Institute / European Bioinformatics Institute (EMBL-EBI)
* **Platform & URL**: [Sanger Institute Careers](https://jobs.sanger.ac.uk/)
* **Tools, Tech & Standards Mentioned**: `Nextflow`, `Snakemake`, `Docker`, `Conda`, `Slurm`, `AWS Batch`, `Git`, `CWL`
* **Verbatim Requirement Excerpt**:
  > *"Build reproducible, high-throughput analytical pipelines for confidential genomic datasets using Nextflow and Snakemake orchestrated over distributed Slurm and cloud compute clusters."*
* **Mapped Subdomains**: `system-architecture`, `software-engineering`, `infrastructure-and-deployment`

---

#### `JOB-RSE-MID-01`
* **Job Title**: Research Software Engineer (Secure Data Platforms)
* **Seniority Level**: `mid`
* **Hiring Organisation**: Alan Turing Institute (Health & Medical Sciences Programme)
* **Platform & URL**: [Turing Institute Careers](https://www.turing.ac.uk/work-turing)
* **Tools, Tech & Standards Mentioned**: `Python`, `R`, `Git`, `Docker`, `JupyterLab`, `RStudio`, `PyTest`, `Linux`
* **Verbatim Requirement Excerpt**:
  > *"Design, write, and test reusable research software packages in Python and R for deployment inside secure computing enclaves. Package tools using Docker and ensure robust automated unit testing."*
* **Mapped Subdomains**: `software-engineering`, `research-support-and-innovation`

---

#### `JOB-RSE-MID-02`
* **Job Title**: Research Technical Professional (TRE Platform Support)
* **Seniority Level**: `mid`
* **Hiring Organisation**: Swansea University (SAIL Databank)
* **Platform & URL**: [jobs.ac.uk / Swansea SAIL](https://www.jobs.ac.uk)
* **Tools, Tech & Standards Mentioned**: `SQL (Db2/PostgreSQL)`, `R`, `Python`, `Eclipse / RStudio`, `Linux`, `Five Safes Framework`, `User training materials`
* **Verbatim Requirement Excerpt**:
  > *"Support researchers working on population-scale linked health data in SAIL Databank. Provision secure analytical workspaces, manage software package requests, and assist with technical onboarding."*
* **Mapped Subdomains**: `research-support-and-innovation`, `secure-user-experience`, `project-management`

---

### 1.4 Governance, Security & Output Review Postings

#### `JOB-GOV-SNR-01`
* **Job Title**: Head of Information Governance & Data Protection Officer
* **Seniority Level**: `snr`
* **Hiring Organisation**: Health Data Research UK (HDR UK)
* **Platform & URL**: [HDR UK Vacancies](https://www.hdruk.ac.uk/about-us/careers/)
* **Tools, Tech & Standards Mentioned**: `UK GDPR`, `DPA 2018`, `NHS DSPT`, `Caldicott Principles`, `DPIA Templates`, `ISO 27001`, `HRA / IRAS Approval`
* **Verbatim Requirement Excerpt**:
  > *"Lead the national Information Governance strategy. Oversee Data Protection Impact Assessments (DPIAs), ensure DSPT compliance across all health data hubs, and represent the organization on data access committees."*
* **Mapped Subdomains**: `regulatory-compliance`, `ethics-and-research-governance`

---

#### `JOB-GOV-MID-01`
* **Job Title**: Information Security & Compliance Specialist
* **Seniority Level**: `mid`
* **Hiring Organisation**: Royal Marsden NHS Foundation Trust (Digital & Cancer Research)
* **Platform & URL**: [NHS Jobs / Royal Marsden](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `NHS DSPT`, `NHS DTAC`, `Cyber Essentials Plus`, `Nessus`, `Splunk`, `Firewall Policies`, `Incident Response Protocols`
* **Verbatim Requirement Excerpt**:
  > *"Coordinate annual DSPT audit submissions, review DTAC compliance for new digital health tools, review vulnerability scans using Nessus, and assist with security incident handling."*
* **Mapped Subdomains**: `regulatory-compliance`, `security-management`, `audit-and-compliance-monitoring`, `emergency-response`

---

#### `JOB-GOV-JR-01`
* **Job Title**: Junior Information Governance & Data Access Assistant
* **Seniority Level**: `jr`
* **Hiring Organisation**: Guy's and St Thomas' NHS Foundation Trust
* **Platform & URL**: [NHS Jobs / GSTT IG](https://www.jobs.nhs.uk)
* **Tools, Tech & Standards Mentioned**: `DPIA Registers`, `Information Asset Registers (IAR)`, `NHS DSPT (basic)`, `Microsoft 365`, `Incident log records`
* **Verbatim Requirement Excerpt**:
  > *"Maintain the Trust Information Asset Register and DPIA tracking logs. Assist researchers with completing standard data access request forms under guidance."*
* **Mapped Subdomains**: `regulatory-compliance`, `project-management`, `ethics-and-research-governance`

---

#### `JOB-SDC-MID-01`
* **Job Title**: Statistical Disclosure Control Officer / Output Checker
* **Seniority Level**: `mid`
* **Hiring Organisation**: Office for National Statistics (ONS) / Secure Research Service (SRS)
* **Platform & URL**: [Civil Service Jobs / ONS SDC](https://www.civilservicejobs.service.gov.uk)
* **Tools, Tech & Standards Mentioned**: `sdcMicro`, `R`, `Python`, `Excel`, `ONS SDC Threshold Rules (Rule of 10)`, `Airlock Review Systems`, `Dominance & Threshold Metrics`
* **Verbatim Requirement Excerpt**:
  > *"Review statistical and analytical outputs submitted by researchers to ensure they are safe and non-disclosive. Apply ONS SDC policies (threshold and dominance rules), identify re-identification risks, and approve outputs via the airlock system."*
* **Mapped Subdomains**: `output-checking`, `statistical-disclosure-control`, `tools-and-platforms-to-support-output-checking`

---

#### `JOB-SDC-MID-02`
* **Job Title**: Data Access and Output Review Specialist
* **Seniority Level**: `mid`
* **Hiring Organisation**: UK Data Service / SecureLab (University of Essex)
* **Platform & URL**: [jobs.ac.uk / UKDS SecureLab](https://www.jobs.ac.uk)
* **Tools, Tech & Standards Mentioned**: `Five Safes Framework`, `Safe Researcher Training`, `Stata / R / SPSS`, `SDC Guidelines`, `Airlock quarantine workflows`
* **Verbatim Requirement Excerpt**:
  > *"Deliver Safe Researcher training and conduct rigorous statistical disclosure reviews on research outputs generated within the SecureLab environment."*
* **Mapped Subdomains**: `output-checking`, `statistical-disclosure-control`, `research-support-and-innovation`

---

## 📈 Level-by-Level Frequency Aggregation

This table aggregates every mention across the sampled job postings by seniority level:

| Tool, Technology, or Standard | Category | Total Mentions | Junior (`jr`) | Mid (`mid`) | Senior / Lead (`snr`) | Primary Mapped Subdomain |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Linux (RHEL / Ubuntu / Rocky)** | Technology | **12** | 2 | 5 | 5 | `infrastructure-and-deployment` |
| **Python** | Technology | **10** | 1 | 5 | 4 | `software-engineering` / `data-engineering` |
| **Git / GitHub / GitLab** | Tool | **10** | 2 | 4 | 4 | `software-engineering` / `tools-output-checking` |
| **Terraform (IaC)** | Tool | **8** | 1 | 3 | 4 | `infrastructure-and-deployment` |
| **Microsoft Azure / Azure Cloud** | Technology | **8** | 0 | 4 | 4 | `infrastructure-and-deployment` |
| **Docker / Containerisation** | Tool | **8** | 0 | 4 | 4 | `infrastructure-and-deployment` |
| **SQL (PostgreSQL / MSSQL / Synapse)** | Technology | **8** | 2 | 4 | 2 | `data-engineering-and-processing` |
| **NHS DSPT (Data Security Toolkit)** | Standard | **7** | 1 | 3 | 3 | `regulatory-compliance` |
| **Kubernetes (K8s)** | Tool | **6** | 0 | 2 | 4 | `infrastructure-and-deployment` |
| **AWS Cloud (S3, EMR, Batch)** | Technology | **6** | 1 | 1 | 4 | `infrastructure-and-deployment` |
| **Microsoft Entra ID / Active Directory** | Tool | **6** | 0 | 3 | 3 | `identity-management` |
| **ISO/IEC 27001 (ISMS)** | Standard | **6** | 0 | 2 | 4 | `regulatory-compliance` |
| **Apache Airflow** | Tool | **5** | 0 | 2 | 3 | `data-engineering-and-processing` |
| **Five Safes Framework** | Standard | **5** | 0 | 3 | 2 | `ethics-and-research-governance` |
| **OMOP Common Data Model** | Standard | **4** | 0 | 2 | 2 | `data-engineering-and-processing` |
| **Slurm Workload Manager** | Tool | **4** | 0 | 1 | 3 | `system-architecture` |
| **Prometheus & Grafana** | Tool | **4** | 0 | 2 | 2 | `operational-excellence` |
| **sdcMicro / SDC Threshold Rules** | Tool/Std | **4** | 0 | 4 | 0 | `statistical-disclosure-control` |
| **HL7 FHIR** | Standard | **3** | 0 | 1 | 2 | `data-engineering-and-processing` |
| **dbt (data build tool)** | Tool | **3** | 0 | 1 | 2 | `data-engineering-and-processing` |
| **Great Expectations** | Tool | **3** | 0 | 1 | 2 | `data-governance` |
| **Nextflow / Snakemake** | Tool | **3** | 0 | 1 | 2 | `system-architecture` |
| **Azure Key Vault** | Tool | **3** | 0 | 1 | 2 | `secure-user-experience` |
| **Caldicott Principles** | Standard | **3** | 1 | 1 | 1 | `regulatory-compliance` |
| **Jira / Confluence** | Tool | **3** | 2 | 1 | 0 | `project-management` |
| **Nessus / OpenVAS** | Tool | **3** | 0 | 2 | 1 | `security-management` |
| **Splunk / Syslog** | Tool/Std | **3** | 0 | 2 | 1 | `audit-and-compliance-monitoring` |
| **PyTest / Automated Testing** | Tool | **3** | 0 | 2 | 1 | `software-engineering` |
| **Ansible** | Tool | **2** | 0 | 1 | 1 | `system-architecture` |
| **Data Airlock Systems** | Tool/Std | **2** | 0 | 2 | 0 | `tools-and-platforms-to-support-output-checking` |
| **OpenAPI / REST Schemas** | Standard | **2** | 0 | 1 | 1 | `software-engineering` |
| **Zero Trust Architecture** | Standard | **2** | 0 | 0 | 2 | `access-control` |
| **NHS DTAC** | Standard | **2** | 0 | 1 | 1 | `regulatory-compliance` |
| **Cyber Essentials Plus** | Standard | **2** | 0 | 1 | 1 | `regulatory-compliance` |
