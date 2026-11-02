# Tools, Technologies & Standards (TTS) Sourcing & Traceability Matrix

> [!IMPORTANT]
> **Purpose**: This matrix provides full provenance, authoritative references, and verifiable web links for all proposed Tools, Technologies, and Standards across the 6 Competency Framework domains. No source files or YAML entries have been modified; this artifact is prepared for team review.

---

## Sourcing Taxonomy & Provenance Categories

Each tool, technology, or standard is attributed to an explicit source category and tag:

| Source Tag | Provenance Authority / Stream | Primary Focus Area |
| :--- | :--- | :--- |
| `satre-spec` | [Standard Architecture for TREs (SATRE)](https://satre-specification.readthedocs.io/) | Architectural components, access control, airlocks, audit |
| `nhs-england-sde` | [NHS England Secure Data Environment Architecture](https://digital.nhs.uk/services/secure-data-environment-service) | Health data interoperability, IG, clinical pipelines |
| `azure-tre` | [Microsoft Azure TRE OSS Reference Architecture](https://github.com/microsoft/AzureTRE) | Cloud automation, Terraform templates, workspace isolation |
| `ncsc-guidance` | [UK National Cyber Security Centre (NCSC)](https://www.ncsc.gov.uk/collection/cyber-security-design-principles) | Zero trust, security monitoring, key management, defence-in-depth |
| `ons-sdc` | [ONS / UK Government Statistical Disclosure Control](https://analysisfunction.civilservice.gov.uk/policy-store/statistical-disclosure-control-for-tables/) | Disclosure checking, threshold rules, microdata protection |
| `open-source-tre` | Production Open-Source TRE Platforms ([OpenSAFELY](https://www.opensafely.org/), [DataSHIELD](https://www.datashield.org/), [ARX](https://arx.deidentifier.org/)) | Privacy-enhancing technologies, federated analytics, airlocks |
| `dsp-toolkit` | [NHS Data Security & Protection Toolkit (DSPT)](https://www.dsptoolkit.nhs.uk/) & [DTAC](https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/) | Health compliance, audit trails, clinical safety |
| `cncf-radar` | [Cloud Native Computing Foundation (CNCF)](https://landscape.cncf.io/) & [ThoughtWorks Radar](https://www.thoughtworks.com/radar) | Containerisation, orchestration, observability, CI/CD |
| `job-specifications` | UK Public Sector & Research Recruitment (NHS SDE, Genomics England, ONS IDS, Turing) | Live market skill requirements for RTPs and SDE Engineers |

---

## 1. Safe Access & Identity

### 1.1 Identity Management
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Microsoft Entra ID** | Tool | `azure-tre` | [Microsoft Entra Docs](https://learn.microsoft.com/en-us/entra/identity/) | Primary identity provider in Azure TRE and NHS England regional SDEs for user authentication and tenant segregation. |
| **Keycloak** | Tool | `open-source-tre` | [Keycloak Documentation](https://www.keycloak.org/) | Open-source IAM broker used in on-premise and academic TREs (e.g. DARE UK drivers) for federated OpenID Connect/SAML. |
| **FreeIPA / Red Hat IdM** | Tool | `job-specifications` | [FreeIPA Official Site](https://www.freeipa.org/) | Centralized Linux identity and Kerberos domain controller frequently required in HPC-based research enclaves. |
| **OAuth 2.0 / OIDC** | Standard | `satre-spec` | [IETF RFC 6749 / OpenID Spec](https://openid.net/connect/) | Mandatory standard protocol for federated web authentication and API authorization in SATRE section 2.1. |
| **SAML 2.0** | Standard | `satre-spec` | [OASIS SAML Specification](http://docs.oasis-open.org/security/saml/v2.0/) | Used for institutional SSO integration via UK Access Management Federation (Shibboleth). |
| **SCIM (RFC 7644)** | Standard | `cncf-radar` | [IETF RFC 7644 (SCIM)](https://datatracker.ietf.org/doc/html/rfc7644) | Automated user provisioning and deprovisioning standard across institutional identity stores and SDE tenants. |

### 1.2 Access Control
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Role-Based Access Control (RBAC)** | Standard | `satre-spec` | [NIST SP 800-162 (ABAC/RBAC)](https://csrc.nist.gov/publications/detail/sp/800-162/final) | Fundamental access model required across all SATRE tiers to separate researchers, data stewards, and airlock reviewers. |
| **Attribute-Based Access Control (ABAC)** | Standard | `satre-spec` | [NIST Guide to ABAC](https://csrc.nist.gov/publications/detail/sp/800-162/final) | Fine-grained policy evaluation based on data sensitivity tags, researcher affiliation, and project approval status. |
| **Teleport / Boundary** | Tool | `cncf-radar` | [Teleport Identity-Aware Proxy](https://goteleport.com/) / [HashiCorp Boundary](https://www.boundaryproject.io/) | Zero-trust privileged access management (PAM) and session recording for SSH/RDP connections into air-gapped workspaces. |
| **CyberArk / Azure PIM** | Tool | `job-specifications` | [Microsoft Entra PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure) | Just-in-time privilege elevation and break-glass auditing for SDE system administrators. |

### 1.3 Secure User Experience
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Azure Key Vault** | Tool | `azure-tre` | [Azure Key Vault Overview](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) | Core secrets and encryption key manager in Microsoft Azure TRE implementations. |
| **HashiCorp Vault** | Tool | `cncf-radar` | [HashiCorp Vault Documentation](https://developer.hashicorp.com/vault) | Cloud-agnostic secret engine used for dynamic database credential leases and token encryption in multi-cloud SDEs. |
| **Guacamole (Apache)** | Tool | `open-source-tre` | [Apache Guacamole](https://guacamole.apache.org/) | Clientless HTML5 remote desktop gateway used in open TREs to restrict copy/paste and clipboard exfiltration. |
| **YubiKey / FIDO2 WebAuthn** | Standard | `ncsc-guidance` | [NCSC Multi-Factor Authentication](https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services) | Phishing-resistant hardware MFA standard recommended for accessing sensitive tier-4 health data enclaves. |

---

## 2. Safe Data Management

### 2.1 Data Governance
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **OpenMetadata / Apache Atlas** | Tool | `cncf-radar` | [OpenMetadata](https://open-metadata.org/) / [Apache Atlas](https://atlas.apache.org/) | Open-source data governance and automated metadata catalogue engines for data lineage and classification. |
| **HDR UK Gateway Metadata Schema** | Standard | `nhs-england-sde` | [HDR UK Metadata Specification](https://www.healthdatagateway.org/) | UK health data standard for dataset onboarding, discovery, and structural metadata publishing. |
| **SHA-256 / MD5 Checksums** | Standard | `satre-spec` | [NIST FIPS 180-4 (Secure Hash Standard)](https://csrc.nist.gov/publications/detail/fips/180-4/final) | Mandatory cryptographic integrity verification for all data ingress and egress payloads. |
| **Great Expectations** | Tool | `job-specifications` | [Great Expectations Docs](https://greatexpectations.io/) | Automated pipeline test framework for asserting data quality, missingness thresholds, and schema validation. |

### 2.2 Data Engineering & Processing
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Apache Airflow** | Tool | `azure-tre` | [Apache Airflow](https://airflow.apache.org/) | Standard orchestration engine in Azure TRE and health pipelines for scheduled ETL and ingestion workflows. |
| **dbt (data build tool)** | Tool | `job-specifications` | [dbt Core Documentation](https://docs.getdbt.com/) | In-warehouse SQL transformations, version-controlled testing, and lineage documentation in modern research lakes. |
| **OMOP Common Data Model** | Standard | `nhs-england-sde` | [OHDSI OMOP CDM Specifications](https://ohdsi.github.io/CommonDataModel/) | Primary healthcare standard for harmonising electronic health records (EHR) across regional NHS SDE nodes. |
| **HL7 FHIR** | Standard | `nhs-england-sde` | [HL7 FHIR Standard](https://hl7.org/fhir/) | Standard API and data exchange format for clinical data interoperability and real-time ingestion. |
| **DuckDB / Trino** | Tool | `cncf-radar` | [DuckDB](https://duckdb.org/) / [Trino](https://trino.io/) | High-performance analytical query engines used for privacy-preserving querying on large parquet/lakehouse stores. |
| **AWS Database Migration Service (DMS)** | Tool | `job-specifications` | [AWS DMS User Guide](https://docs.aws.amazon.com/dms/) | Cloud data migration tool used for secure database replication and transfer into AWS-hosted TREs. |
| **AES-256-GCM / TLS 1.3** | Standard | `ncsc-guidance` | [NCSC Data at Rest / In Transit](https://www.ncsc.gov.uk/collection/device-security-guidance/managing-data) | Standard symmetric authenticated encryption for sensitive health databases and encrypted volume storage. |

---

## 3. Safe Governance & Compliance

### 3.1 Regulatory Compliance
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **NHS Data Security & Protection Toolkit (DSPT)** | Standard | `dsp-toolkit` | [NHS DSPT Requirements](https://www.dsptoolkit.nhs.uk/) | Statutory annual self-assessment standard required for all organizations processing NHS health and care data. |
| **NHS Digital Technology Assessment Criteria (DTAC)** | Standard | `dsp-toolkit` | [NHS DTAC Framework](https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/) | Mandatory procurement framework evaluating clinical safety, data protection, and security for NHS technologies. |
| **ISO/IEC 27001:2022** | Standard | `satre-spec` | [ISO/IEC 27001 Standard](https://www.iso.org/standard/27001) | Global standard for Information Security Management Systems (ISMS); baseline certification for operational TREs. |
| **Caldicott Principles** | Standard | `nhs-england-sde` | [National Data Guardian Guidance](https://www.gov.uk/government/organisations/national-data-guardian) | 8 principles governing the ethical handling, sharing, and justification of patient-identifiable information. |

### 3.2 Security Management
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Wazuh / OSSEC** | Tool | `open-source-tre` | [Wazuh Open Source XDR](https://wazuh.com/) | Unified open-source host intrusion detection, file integrity monitoring, and compliance auditing in secure enclaves. |
| **Trivy / Clair** | Tool | `cncf-radar` | [Aqua Security Trivy](https://trivy.dev/) | Comprehensive container image, filesystem, and SBOM vulnerability scanner used in airlock build pipelines. |
| **Tenable Nessus / OpenVAS** | Tool | `job-specifications` | [Tenable Nessus](https://www.tenable.com/products/nessus) / [Greenbone OpenVAS](https://www.greenbone.net/en/community-edition/) | Vulnerability scanning and penetration testing tools required for annual IT Health Checks (ITHC). |
| **Falco** | Tool | `cncf-radar` | [Falco Runtime Security](https://falco.org/) | CNCF-graduated runtime security engine detecting unauthorized system calls and exfiltration attempts in Kubernetes. |

### 3.3 Ethics & Research Governance
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Integrated Research Application System (IRAS)** | Standard | `nhs-england-sde` | [Health Research Authority IRAS](https://www.myresearchproject.org.uk/) | UK single system for applying for ethical and regulatory approvals (HRA / NHS REC) to conduct health data research. |
| **Five Safes Framework** | Standard | `satre-spec` | [UK Data Service Five Safes](https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/) | Standard risk management model adopted across all UK TREs and SDEs (*People, Projects, Settings, Data, Outputs*). |

### 3.4 Audit & Compliance Monitoring
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Splunk Enterprise Security** | Tool | `job-specifications` | [Splunk for Healthcare](https://www.splunk.com/en_us/solutions/industries/healthcare.html) | Enterprise SIEM used in national SDEs to aggregate egress logs, access traces, and threat intelligence. |
| **Elasticsearch, Logstash, Kibana (ELK)** | Tool | `open-source-tre` | [Elastic Stack](https://www.elastic.co/elastic-stack) | Open SIEM stack deployed in academic TREs for real-time audit trail aggregation and visualization. |
| **RFC 5424 (Syslog Protocol)** | Standard | `satre-spec` | [IETF RFC 5424 (Syslog)](https://datatracker.ietf.org/doc/html/rfc5424) | Standard immutable syslog streaming format for centralized tamper-evident audit repositories. |

---

## 4. Safe Outputs & Disclosure Control

### 4.1 Output Checking & 4.3 Statistical Disclosure Control
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **sdcMicro** | Tool | `open-source-tre` | [sdcMicro on CRAN](https://cran.r-project.org/web/packages/sdcMicro/) / [GitHub](https://github.com/sdcTools/sdcMicro) | Gold standard R package used by National Statistical Institutes and TRE output checkers for microdata anonymization. |
| **ARX Data Anonymizer** | Tool | `open-source-tre` | [ARX Official Tool](https://arx.deidentifier.org/) | Comprehensive GUI and API software implementing $k$-anonymity, $\ell$-diversity, and risk analysis for tabular releases. |
| **OpenDP** | Tool | `open-source-tre` | [OpenDP Harvard / Microsoft](https://opendp.org/) | Open-source differential privacy algorithm suite for generating provably privacy-preserving statistical queries and models. |
| **Diffprivlib (IBM)** | Tool | `open-source-tre` | [IBM Diffprivlib GitHub](https://github.com/IBM/differential-privacy-library) | Python library for machine learning models and data analysis trained with differential privacy guarantees. |
| **ONS SDC Threshold Guidance** | Standard | `ons-sdc` | [ONS SDC Policy Guidelines](https://analysisfunction.civilservice.gov.uk/policy-store/statistical-disclosure-control-for-tables/) | Threshold rules (e.g. rule-of-10, dominance rules, cell suppression) enforced by SDE output checkers. |

### 4.2 Tools & Platforms to Support Output Checking
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Camunda BPM** | Tool | `job-specifications` | [Camunda BPMN Platform](https://camunda.com/) | Workflow automation engine used to orchestrate multi-stage human-in-the-loop output review requests and approvals. |
| **Miracum / TRE Data Airlocks** | Tool | `open-source-tre` | [MIRACUM Data Airlock](https://github.com/MIRACUM/data-airlock) | Dedicated staging environment and review console for inspecting, hashing, and approving files before release. |
| **Git / GitLab** | Tool | `azure-tre` | [GitLab SCM](https://about.gitlab.com/) | Version-controlled source code repository with integrated automated secret-scanning pipelines (e.g. Gitleaks). |
| **Gitleaks / Trufflehog** | Tool | `cncf-radar` | [Gitleaks GitHub](https://github.com/gitleaks/gitleaks) | Automated static analysis scanners executed on code exports to prevent API keys, tokens, and passwords escaping the SDE. |

### 4.4 Accidental Disclosure & 4.5 Emergency Response
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **NIST SP 800-61 Rev. 2** | Standard | `ncsc-guidance` | [NIST Computer Security Incident Handling](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final) | Standard computer security incident handling guide defining containment, eradication, and recovery workflows. |
| **ICO Data Breach Reporting Standard** | Standard | `nhs-england-sde` | [ICO 72-Hour Breach Notification](https://ico.org.uk/for-organisations/report-a-breach/) | Statutory 72-hour regulatory reporting workflow for personal data breaches under UK GDPR Section 33. |

---

## 5. Safe Projects & Operations

### 5.1 Project Management & 5.2 Service Management
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Jira Software / Confluence** | Tool | `job-specifications` | [Atlassian Jira Health](https://www.atlassian.com/solutions/health) | Industry-standard agile delivery tracking, researcher onboarding request tracking, and technical wiki management. |
| **ServiceNow ITSM** | Tool | `job-specifications` | [ServiceNow ITSM](https://www.servicenow.com/products/itsm.html) | Enterprise IT service desk platform used across NHS Trusts and large institutions for incident and change management. |
| **ITIL 4 Foundation** | Standard | `job-specifications` | [AXELOS ITIL 4 Guidance](https://www.axelos.com/certifications/itil-service-management) | Best practice framework for service level management, incident resolution lifecycles, and change release control. |
| **GitHub Actions** | Tool | `azure-tre` | [GitHub Actions Documentation](https://docs.github.com/en/actions) | Automated CI/CD platform used in Azure TRE for repeatable infrastructure testing, linting, and automated deployments. |

### 5.3 Operational Excellence & 5.4 Research Support
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Prometheus & Grafana** | Tool | `cncf-radar` | [Prometheus](https://prometheus.io/) / [Grafana Labs](https://grafana.com/) | Standard open telemetry and metric dashboard stack monitoring SDE workspace resource utilisation and health. |
| **OpenTelemetry (OTel)** | Standard | `cncf-radar` | [OpenTelemetry CNCF Standard](https://opentelemetry.io/) | Vendor-neutral standard for generating and exporting distributed traces and operational telemetry across SDE microservices. |
| **Azure Monitor / AWS CloudWatch** | Tool | `azure-tre` | [Azure Monitor Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/) | Native cloud telemetry, log analytics, and threshold alerting engines for infrastructure cost and capacity monitoring. |
| **UK TRE Community** | Standard | `dare-uk` | [UK TRE Community Forum (DARE UK)](https://uktre.net/) | National collaboration network establishing shared best practices, governance templates, and researcher training. |

---

## 6. Safe Technology & Engineering

### 6.1 Software Engineering
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Postman / Newman** | Tool | `job-specifications` | [Postman API Platform](https://www.postman.com/) | API development, automated regression testing, and security testing tool for SDE web services and gateways. |
| **OpenAPI / Swagger (OAS 3.1)** | Standard | `cncf-radar` | [OpenAPI Initiative](https://www.openapis.org/) | Standard specification for defining machine-readable REST API schemas, data contracts, and validation endpoints. |
| **PyTest / JUnit 5** | Tool | `job-specifications` | [PyTest Framework](https://docs.pytest.org/) / [JUnit](https://junit.org/) | Automated unit, integration, and contract test frameworks mandatory in research software engineering (RSE). |
| **OWASP Top 10** | Standard | `ncsc-guidance` | [OWASP Top Ten Security Risks](https://owasp.org/www-project-top-ten/) | Baseline awareness standard for preventing software injection, broken access control, and cryptographic failures. |

### 6.2 Infrastructure & Deployment
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Terraform / OpenTofu** | Tool | `azure-tre` | [HashiCorp Terraform](https://www.terraform.io/) / [OpenTofu](https://opentofu.org/) | Declarative Infrastructure-as-Code (IaC) tool powering automated deployments in Azure TRE and AWS TRE blueprints. |
| **Kubernetes (K8s)** | Tool | `cncf-radar` | [Kubernetes](https://kubernetes.io/) | CNCF container orchestration platform hosting multi-tenant SDE analytic workspaces and scalable microservices. |
| **Helm** | Tool | `cncf-radar` | [Helm Package Manager](https://helm.sh/) | Kubernetes package manager used for reproducible deployments of research tools (RStudio, JupyterHub, MLflow). |
| **Harbor** | Tool | `cncf-radar` | [Harbor Cloud Native Registry](https://goharbor.io/) | Secure container image registry with built-in vulnerability scanning (Trivy) and image signing (Cosign) for air-gapped SDEs. |
| **Docker / Podman** | Tool | `cncf-radar` | [Docker Engine](https://www.docker.com/) / [Podman](https://podman.io/) | Container runtimes; Podman provides daemonless and rootless container execution preferred in high-security environments. |

### 6.3 System Architecture & Advanced Compute
| Item Name | Type | Source Tag | Source URL | Traceability & SDE Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Slurm Workload Manager** | Tool | `job-specifications` | [SchedMD Slurm Workload Manager](https://slurm.schedmd.com/) | High-performance computing (HPC) batch job scheduler and resource allocator in academic bio-health research enclaves. |
| **Nextflow / Snakemake** | Tool | `job-specifications` | [Nextflow](https://www.nextflow.io/) / [Snakemake](https://snakemake.readthedocs.io/) | Scalable scientific workflow orchestration frameworks used in Genomics England and health SDEs for reproducible genomics/AI pipelines. |
| **Ansible** | Tool | `job-specifications` | [Red Hat Ansible](https://www.ansible.com/) | Configuration management automation tool for immutable baseline server hardening and compliance enforcement. |
| **Apache JMeter** | Tool | `job-specifications` | [Apache JMeter](https://jmeter.apache.org/) | Load testing and performance benchmarking tool assessing SDE system response times under multi-tenant researcher loads. |
| **NCSC Cyber Security Design Principles** | Standard | `ncsc-guidance` | [NCSC Secure Design Principles](https://www.ncsc.gov.uk/collection/cyber-security-design-principles) | Architectural reference standard ensuring defence-in-depth, zero-trust network segregation, and attack surface reduction. |

---

## 📋 Recommended Action Plan for YAML Integration

Once reviewed by the team, items can be directly ingested into each domain's `yaml/*_tools-tech-standards.yaml` under their verified source tag:

```yaml
subdomains:
  <subdomain-id>:
    name: <Subdomain Name>
    items:
    - source: community
      items: [...]
    - source: satre-spec
      items: [...]
    - source: azure-tre
      items: [...]
    - source: nhs-england-sde
      items: [...]
    - source: ncsc-guidance
      items: [...]
    - source: job-specifications
      items: [...]
    - source: open-source-tre
      items: [...]
    - source: cncf-radar
      items: [...]
```
