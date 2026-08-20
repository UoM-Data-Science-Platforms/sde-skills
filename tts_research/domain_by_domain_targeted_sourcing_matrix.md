# Domain-by-Domain Targeted Sourcing Matrix

> [!IMPORTANT]
> **Purpose**: This matrix provides a structured, exhaustive mapping of modern Tools, Technologies, and Standards across **all 6 Framework Domains and 22 Subdomains**.
> 
> Each entry specifies the **Subdomain Operational Role**, **Item Name & Type**, **Source Tag**, **Direct Authoritative URL**, and **SDE Implementation Context**.

---

## Domain 1: Safe Access & Identity

### 1.1 Identity Management
* **Subdomain Role**: Manages authentication, researcher identity lifecycles, single sign-on (SSO), and account federation across institutional boundaries.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Microsoft Entra ID** | Tool | `azure-tre` | [Microsoft Entra Docs](https://learn.microsoft.com/en-us/entra/identity/) | Primary enterprise IdP for Azure TRE and NHS England regional SDE nodes. |
| **Keycloak** | Tool | `open-source-tre` | [Keycloak Documentation](https://www.keycloak.org/) | Open-source IAM broker for federated academic identity in on-premises/hybrid TREs. |
| **FreeIPA / Red Hat IdM** | Tool | `job-specifications` | [FreeIPA Project](https://www.freeipa.org/) | Linux-native identity, Kerberos domain management, and LDAP directory for HPC research enclaves. |
| **OAuth 2.0 / OIDC** | Standard | `satre-spec` | [OpenID Connect Core Spec](https://openid.net/connect/) | Mandatory standard token-based authentication protocol required by SATRE section 2.1. |
| **SAML 2.0** | Standard | `satre-spec` | [OASIS SAML 2.0 Standard](http://docs.oasis-open.org/security/saml/v2.0/) | Federated SSO standard integrating institutional credentials via UK Access Management Federation (Shibboleth). |
| **SCIM (RFC 7644)** | Standard | `dare-uk` | [IETF RFC 7644 SCIM](https://datatracker.ietf.org/doc/html/rfc7644) | Automated user provisioning and deprovisioning standard synchronizing university registries with SDE tenants. |

### 1.2 Access Control
* **Subdomain Role**: Enforces least-privilege authorization, zero-trust boundary evaluation, and privileged administrative access control.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Role-Based Access Control (RBAC)** | Standard | `satre-spec` | [NIST SP 800-162](https://csrc.nist.gov/publications/detail/sp/800-162/final) | Baseline access model separating researchers, project leads, data stewards, and airlock reviewers. |
| **Attribute-Based Access Control (ABAC)** | Standard | `dare-uk` | [NIST Guide to ABAC](https://csrc.nist.gov/publications/detail/sp/800-162/final) | Context-aware policy evaluation evaluating user clearance, data classification, and project approval dates. |
| **Open Policy Agent (OPA)** | Tool | `cncf-radar` | [Open Policy Agent Project](https://www.openpolicyagent.org/) | Declarative policy engine enforcing authorization rules across APIs and Kubernetes admission controllers. |
| **Teleport / Boundary** | Tool | `cncf-radar` | [Teleport PAM](https://goteleport.com/) / [HashiCorp Boundary](https://www.boundaryproject.io/) | Zero-trust privileged access management (PAM) and session recording for SSH/RDP ingress channels. |
| **Microsoft Entra PIM / CyberArk** | Tool | `job-specifications` | [Microsoft Entra PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure) | Just-in-time privilege elevation and break-glass auditing for platform administrators. |

### 1.3 Secure User Experience
* **Subdomain Role**: Provides isolated, clientless remote desktop environments and secure cryptographic credential stores to prevent local data leakage.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Azure Key Vault** | Tool | `azure-tre` | [Azure Key Vault Overview](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) | Managed secrets and certificate store in Microsoft Azure TRE architectures. |
| **HashiCorp Vault** | Tool | `cncf-radar` | [HashiCorp Vault Documentation](https://developer.hashicorp.com/vault) | Cloud-agnostic secret engine managing dynamic database credentials and token leasing. |
| **Apache Guacamole** | Tool | `open-source-tre` | [Apache Guacamole](https://guacamole.apache.org/) | Clientless HTML5 remote desktop gateway restricting clipboard copying and unauthorized file transfers. |
| **FIDO2 / WebAuthn** | Standard | `ncsc-guidance` | [NCSC MFA Guidance](https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services) | Phishing-resistant hardware MFA standard recommended for high-containment tier-4 research data access. |

---

## Domain 2: Safe Data Management

### 2.1 Data Governance
* **Subdomain Role**: Ensures data discoverability, metadata cataloguing, data quality profiling, and end-to-end provenance integrity.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **OpenMetadata / Apache Atlas** | Tool | `cncf-radar` | [OpenMetadata](https://open-metadata.org/) / [Apache Atlas](https://atlas.apache.org/) | Open-source metadata cataloguing and automated end-to-end data lineage tracking engines. |
| **HDR UK Gateway Metadata Schema** | Standard | `nhs-england-sde` | [HDR UK Metadata Specification](https://www.healthdatagateway.org/) | National health metadata standard for publishing structural dataset descriptions and onboarding discovery. |
| **SHA-256 Checksums** | Standard | `satre-spec` | [NIST FIPS 180-4 (SHS)](https://csrc.nist.gov/publications/detail/fips/180-4/final) | Cryptographic hash verification mandatory for all data ingestion and egress transfer batches. |
| **Great Expectations** | Tool | `job-specifications` | [Great Expectations Docs](https://greatexpectations.io/) | Automated pipeline test framework asserting data quality, schema integrity, and missingness thresholds. |
| **FAIR Data Principles** | Standard | `dare-uk` | [GO-FAIR Principles](https://www.go-fair.org/fair-principles/) | International standard ensuring scientific datasets are Findable, Accessible, Interoperable, and Reusable. |

### 2.2 Data Engineering & Processing
* **Subdomain Role**: Implements scalable ETL/ELT pipelines, clinical ontology harmonization, secure analytical stores, and encrypted data transfers.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Apache Airflow** | Tool | `azure-tre` | [Apache Airflow](https://airflow.apache.org/) | Workflow orchestrator scheduling DAGs for clinical data extraction, de-identification, and landing. |
| **dbt (data build tool)** | Tool | `job-specifications` | [dbt Core Docs](https://docs.getdbt.com/) | In-warehouse SQL transformation framework with built-in versioning, automated testing, and lineage docs. |
| **OMOP Common Data Model** | Standard | `nhs-england-sde` | [OHDSI OMOP CDM](https://ohdsi.github.io/CommonDataModel/) | Standard healthcare data model harmonizing primary and secondary care records across national SDE nodes. |
| **HL7 FHIR** | Standard | `nhs-england-sde` | [HL7 FHIR Standard](https://hl7.org/fhir/) | Standard REST API specification for clinical data exchange and real-time electronic health record ingestion. |
| **Apache Iceberg / Delta Lake** | Technology | `cncf-radar` | [Apache Iceberg](https://iceberg.apache.org/) / [Delta Lake](https://delta.io/) | High-performance open table formats providing ACID guarantees, schema evolution, and time-travel querying. |
| **DuckDB / Trino** | Tool | `cncf-radar` | [DuckDB](https://duckdb.org/) / [Trino](https://trino.io/) | Fast SQL engines: DuckDB for in-process exploratory analytics; Trino for distributed cross-store federated querying. |
| **AES-256-GCM / TLS 1.3** | Standard | `ncsc-guidance` | [NCSC Data Security Standards](https://www.ncsc.gov.uk/collection/cloud/principles) | Standard symmetric encryption for sensitive databases at rest and encrypted transit over networks. |

---

## Domain 3: Safe Governance & Compliance

### 3.1 Regulatory Compliance
* **Subdomain Role**: Aligns organizational data processing with UK data protection legislation, NHS health standards, and accredited ISMS frameworks.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **NHS Data Security & Protection Toolkit (DSPT)** | Standard | `dsp-toolkit` | [NHS DSPT Requirements](https://www.dsptoolkit.nhs.uk/) | Annual statutory self-assessment mandatory for all entities processing NHS health and care data. |
| **NHS Digital Technology Assessment Criteria (DTAC)** | Standard | `dsp-toolkit` | [NHS DTAC Framework](https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/) | Mandatory procurement framework evaluating clinical safety (DCB0129), data protection, and security. |
| **ISO/IEC 27001:2022** | Standard | `satre-spec` | [ISO/IEC 27001 Standard](https://www.iso.org/standard/27001) | Global Information Security Management System standard; mandatory baseline accreditation for operational TREs. |
| **Caldicott Principles** | Standard | `nhs-england-sde` | [National Data Guardian](https://www.gov.uk/government/organisations/national-data-guardian) | 8 ethical principles governing patient-identifiable data justification, sharing, and duty of care. |

### 3.2 Security Management
* **Subdomain Role**: Conducts vulnerability management, runtime container security monitoring, and continuous threat mitigation.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Wazuh / OSSEC** | Tool | `open-source-tre` | [Wazuh Open Source XDR](https://wazuh.com/) | Open-source host intrusion detection, file integrity monitoring, and configuration compliance scanner. |
| **Aqua Trivy** | Tool | `cncf-radar` | [Trivy Documentation](https://trivy.dev/) | Comprehensive scanner detecting CVE vulnerabilities, misconfigurations, and licenses in container images and SBOMs. |
| **Falco** | Tool | `cncf-radar` | [Falco Runtime Security](https://falco.org/) | eBPF-powered Kubernetes runtime security engine detecting anomalous system calls and egress attempts in real time. |
| **Tenable Nessus / OpenVAS** | Tool | `job-specifications` | [Tenable Nessus](https://www.tenable.com/products/nessus) / [Greenbone OpenVAS](https://www.greenbone.net/) | Vulnerability scanning tools utilized for scheduled perimeter scanning and annual IT Health Checks (ITHC). |

### 3.3 Ethics & Research Governance
* **Subdomain Role**: Governs project onboarding approvals, research protocol ethical reviews, and data access committee (DAC) oversight.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Integrated Research Application System (IRAS)** | Standard | `nhs-england-sde` | [Health Research Authority IRAS](https://www.myresearchproject.org.uk/) | UK single portal for obtaining ethical and regulatory approvals (HRA / NHS REC) for health research studies. |
| **Five Safes Framework** | Standard | `satre-spec` | [UK Data Service Five Safes](https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/) | Operational risk management framework adopted across UK TREs (*Safe People, Projects, Settings, Data, Outputs*). |

### 3.4 Audit & Compliance Monitoring
* **Subdomain Role**: Collects, aggregates, and protects immutable audit trails, access records, and event logs for compliance reporting.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Splunk Enterprise Security** | Tool | `job-specifications` | [Splunk for Healthcare](https://www.splunk.com/en_us/solutions/industries/healthcare.html) | Enterprise SIEM aggregating researcher access traces, egress attempts, and security alarms in national platforms. |
| **Elastic Stack (ELK)** | Tool | `open-source-tre` | [Elasticsearch / Kibana](https://www.elastic.co/elastic-stack) | Open-source log analytics platform used in academic TREs for real-time audit visualization. |
| **RFC 5424 (Syslog Protocol)** | Standard | `satre-spec` | [IETF RFC 5424 (Syslog)](https://datatracker.ietf.org/doc/html/rfc5424) | Standard streaming format for shipping tamper-evident audit logs to centralized write-once repositories. |

---

## Domain 4: Safe Outputs & Disclosure Control

### 4.1 Output Checking & 4.3 Statistical Disclosure Control
* **Subdomain Role**: Inspects and perturbs analytical results, tables, graphs, and ML models to prevent re-identification of individuals.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **sdcMicro** | Tool | `open-source-tre` | [sdcMicro on CRAN](https://cran.r-project.org/package=sdcMicro) / [GitHub](https://github.com/sdcTools/sdcMicro) | Core R package used by National Statistical Institutes and TRE output checkers for microdata anonymization. |
| **ARX Data Anonymizer** | Tool | `open-source-tre` | [ARX Anonymizer Project](https://arx.deidentifier.org/) | Comprehensive GUI and API software implementing $k$-anonymity, $\ell$-diversity, and disclosure risk profiling. |
| **OpenDP** | Tool | `open-source-tre` | [OpenDP Harvard / Microsoft](https://opendp.org/) | Open-source differential privacy library providing formal mathematical privacy guarantees for statistical queries. |
| **Diffprivlib (IBM)** | Tool | `open-source-tre` | [IBM Diffprivlib](https://github.com/IBM/differential-privacy-library) | Python library enabling privacy-preserving machine learning models with differential privacy bounds. |
| **ONS SDC Threshold Guidance** | Standard | `ons-sdc` | [ONS SDC Policy Guidelines](https://analysisfunction.civilservice.gov.uk/policy-store/statistical-disclosure-control-for-tables/) | Threshold rules (Rule-of-10, dominance rules, cell suppression) enforced during human output checking. |

### 4.2 Tools & Platforms to Support Output Checking
* **Subdomain Role**: Provides workflow orchestrators, airlock staging areas, and automated secret scanners to streamline egress governance.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Camunda BPM** | Tool | `job-specifications` | [Camunda BPMN Platform](https://camunda.com/) | Workflow automation engine orchestrating multi-stage human-in-the-loop output review requests and approvals. |
| **Data Airlock Platforms** | Tool | `open-source-tre` | [MIRACUM Data Airlock](https://github.com/MIRACUM/data-airlock) | Dedicated staging environment for inspecting, cryptographic hashing, and approving research files before export. |
| **Git / GitLab** | Tool | `azure-tre` | [GitLab SCM](https://about.gitlab.com/) | Version-controlled source code repository with automated egress scanning pipelines. |
| **Gitleaks / Trufflehog** | Tool | `cncf-radar` | [Gitleaks GitHub](https://github.com/gitleaks/gitleaks) | Automated static analysis scanners executed on code exports to prevent API keys and passwords escaping the SDE. |

### 4.4 Accidental Disclosure & 4.5 Emergency Response
* **Subdomain Role**: Coordinates immediate quarantine, containment, regulatory notification, and forensic remediation following a data breach.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **NIST SP 800-61 Rev. 2** | Standard | `ncsc-guidance` | [NIST Incident Handling](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final) | Standard computer security incident lifecycle: Preparation, Detection, Containment, Eradication, Post-Incident. |
| **ICO 72-Hour Breach Reporting** | Standard | `nhs-england-sde` | [ICO Breach Reporting](https://ico.org.uk/for-organisations/report-a-breach/) | Statutory regulatory reporting workflow for personal data breaches under UK GDPR Article 33. |

---

## Domain 5: Safe Projects & Operations

### 5.1 Project Management & 5.2 Service Management
* **Subdomain Role**: Tracks research project delivery, manages onboarding requests, and maintains formal IT service levels (ITSM).

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Jira Software / Confluence** | Tool | `job-specifications` | [Atlassian Jira Health](https://www.atlassian.com/solutions/health) | Agile sprint tracking, researcher onboarding workflow management, and technical documentation wikis. |
| **ServiceNow ITSM** | Tool | `job-specifications` | [ServiceNow ITSM](https://www.servicenow.com/products/itsm.html) | Enterprise IT service desk platform used across NHS Trusts for incident, change, and SLA management. |
| **ITIL 4 Foundation** | Standard | `job-specifications` | [AXELOS ITIL 4](https://www.axelos.com/certifications/itil-service-management) | Service management best practice framework establishing SLAs, Change Advisory Boards (CAB), and incident lifecycles. |
| **GitHub Actions** | Tool | `azure-tre` | [GitHub Actions Docs](https://docs.github.com/en/actions) | Automated CI/CD platform executing automated testing, linting, and infrastructure provisioning. |

### 5.3 Operational Excellence & 5.4 Research Support & Innovation
* **Subdomain Role**: Monitors infrastructure capacity, provides user training, and fosters national community collaboration.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Prometheus & Grafana** | Tool | `cncf-radar` | [Prometheus](https://prometheus.io/) / [Grafana](https://grafana.com/) | Standard observability stack monitoring workspace CPU/memory utilization, network throughput, and uptime. |
| **OpenTelemetry (OTel)** | Standard | `cncf-radar` | [OpenTelemetry CNCF Standard](https://opentelemetry.io/) | Vendor-neutral standard emitting distributed traces, metrics, and logs across SDE microservices. |
| **Azure Monitor / CloudWatch** | Tool | `azure-tre` | [Azure Monitor Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/) | Native cloud telemetry and log analytics engines for infrastructure capacity planning and cost alerting. |
| **UK TRE Community** | Standard | `dare-uk` | [UK TRE Community Network](https://uktre.net/) | National collaboration forum sharing governance templates, researcher training curricula, and technical blueprints. |

---

## Domain 6: Safe Technology & Engineering

### 6.1 Software Engineering
* **Subdomain Role**: Enforces rigorous research software engineering (RSE) practices, automated testing, secure coding, and API standards.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Postman / Newman** | Tool | `job-specifications` | [Postman Platform](https://www.postman.com/) | API development, automated regression testing, and security contract testing tool for SDE web endpoints. |
| **OpenAPI / Swagger (OAS 3.1)** | Standard | `cncf-radar` | [OpenAPI Initiative](https://www.openapis.org/) | Standard specification defining machine-readable REST API schemas, data contracts, and validation endpoints. |
| **PyTest / JUnit 5** | Tool | `job-specifications` | [PyTest Framework](https://docs.pytest.org/) / [JUnit](https://junit.org/) | Automated unit, integration, and regression testing frameworks mandatory for research software pipelines. |
| **OWASP Top 10** | Standard | `ncsc-guidance` | [OWASP Top Ten](https://owasp.org/www-project-top-ten/) | Baseline secure development standard preventing injection, broken access control, and cryptographic vulnerabilities. |
| **SBOM (CycloneDX / SPDX)** | Standard | `ncsc-guidance` | [CycloneDX Standard](https://cyclonedx.org/) | Machine-readable Software Bill of Materials standard inspecting software dependencies entering secure perimeters. |

### 6.2 Infrastructure & Deployment
* **Subdomain Role**: Manages declarative infrastructure automation, container registries, and scalable compute clusters.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Terraform / OpenTofu** | Tool | `azure-tre` | [HashiCorp Terraform](https://www.terraform.io/) / [OpenTofu](https://opentofu.org/) | Declarative Infrastructure-as-Code (IaC) tools automating deployment of secure workspaces and cloud landing zones. |
| **Kubernetes (K8s)** | Tool | `cncf-radar` | [Kubernetes Project](https://kubernetes.io/) | CNCF container orchestration platform hosting multi-tenant SDE research workspaces and microservices. |
| **Helm** | Tool | `cncf-radar` | [Helm Package Manager](https://helm.sh/) | Kubernetes package manager deploying reproducible researcher workspace templates (JupyterHub, RStudio). |
| **Harbor** | Tool | `cncf-radar` | [Harbor Registry](https://goharbor.io/) | Secure container image registry featuring built-in vulnerability scanning (Trivy) and image signing (Cosign). |
| **Docker / Podman** | Tool | `cncf-radar` | [Docker Engine](https://www.docker.com/) / [Podman](https://podman.io/) | OCI container runtimes; Podman provides rootless container execution preferred in locked-down HPC enclaves. |

### 6.3 System Architecture & Advanced Compute
* **Subdomain Role**: Delivers high-performance scientific batch computing, scalable bioinformatics workflows, and server hardening.

| Item | Type | Source Tag | Authoritative URL | SDE Implementation Context |
| :--- | :--- | :--- | :--- | :--- |
| **Slurm Workload Manager** | Tool | `job-specifications` | [SchedMD Slurm](https://slurm.schedmd.com/) | High-performance computing (HPC) batch job scheduler and resource partitioner in academic biomedical enclaves. |
| **Nextflow / Snakemake** | Tool | `job-specifications` | [Nextflow](https://www.nextflow.io/) / [Snakemake](https://snakemake.readthedocs.io/) | Scalable scientific workflow frameworks orchestrating reproducible multi-step genomics and AI pipelines. |
| **Ansible** | Tool | `job-specifications` | [Red Hat Ansible](https://www.ansible.com/) | Configuration management tool automating immutable server hardening and baseline compliance enforcement. |
| **Apache JMeter** | Tool | `job-specifications` | [Apache JMeter](https://jmeter.apache.org/) | Load testing and performance benchmarking tool assessing SDE system response times under multi-tenant researcher loads. |
| **NCSC Cyber Security Design Principles** | Standard | `ncsc-guidance` | [NCSC Design Principles](https://www.ncsc.gov.uk/collection/cyber-security-design-principles) | Architectural reference standard ensuring defence-in-depth, zero-trust network segregation, and attack surface reduction. |
