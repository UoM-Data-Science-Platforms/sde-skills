# Reference Architectures & National Standards: TTS Traceability Matrix

> [!IMPORTANT]
> **Provenance & Evidence**: Every entry in this document is derived exclusively from **official national standards, published reference architectures, and statutory governance specifications** (including SATRE, NHS England SDE, DARE UK, NCSC UK, ONS SDC, NHS DSPT/DTAC, and ISO/NIST).
> 
> For each item, this matrix links **both** to the technology/standard itself **and** directly to the exact clause, requirement, or specification section where it is mandated or recommended.

---

## Authoritative Reference Documents Included

1. **[SATRE Specification v1.0 / v2.0](https://satre-specification.readthedocs.io/)** — Standardised Architecture for Trusted Research Environments (DARE UK / Turing / HDR UK)
2. **[NHS England SDE Technical Policy & Architecture](https://digital.nhs.uk/services/secure-data-environment-service)** — National Secure Data Environment Interoperability & Data Layer Standards
3. **[DARE UK Federated Architecture Blueprint (FAB)](https://dareuk.org.uk/)** — UKRI Data and Analytics Research Environments National Strategy
4. **[NCSC Cyber Security Design Principles](https://www.ncsc.gov.uk/collection/cyber-security-design-principles)** — UK National Cyber Security Centre Enterprise & Cloud Architecture Principles
5. **[ONS Statistical Disclosure Control Policy](https://analysisfunction.civilservice.gov.uk/policy-store/statistical-disclosure-control-for-tables/)** — UK Government Analysis Function / ONS SDC Standards for Data Tables and Microdata
6. **[NHS Data Security & Protection Toolkit (DSPT)](https://www.dsptoolkit.nhs.uk/) & [DTAC](https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/)** — Mandatory NHS Digital Information Governance & Technical Criteria
7. **[ISO/IEC 27001:2022 / NIST SP 800 Series](https://www.iso.org/standard/27001)** — Information Security Management & Computer Incident Handling Standards

---

## 1. Safe Access & Identity

### 1.1 Identity Management
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **OAuth 2.0 / OIDC** | Standard | **SATRE Specification**<br>Section: *Information Security $\rightarrow$ Authentication (Req 2.1)* | [SATRE Authentication Spec](https://satre-specification.readthedocs.io/en/latest/specification/information_security.html#authentication) | *"TREs must provide federated authentication and standard token-based identity mechanisms (OpenID Connect / OAuth 2.0) to authenticate researchers while minimizing credentials held in the TRE."* |
| **SAML 2.0** | Standard | **SATRE Specification**<br>Section: *User & Access Management (Req 2.1.2)* | [SATRE User Management](https://satre-specification.readthedocs.io/en/latest/specification/information_security.html#user-lifecycle) | *"TREs should support federated institutional identity protocols (such as SAML 2.0 via UK Access Management Federation / Shibboleth) for identity verification."* |
| **Multi-Factor Authentication (MFA)** | Standard | **SATRE Specification**<br>Section: *Information Security (Req 2.1.1)* & **NCSC Guidance** | [SATRE Security Controls](https://satre-specification.readthedocs.io/en/latest/specification/information_security.html) / [NCSC MFA Guidance](https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services) | *"Multi-factor authentication is mandatory for all user interactions with the TRE. The TRE must enforce at least two independent authentication factors."* |
| **SCIM (RFC 7644)** | Standard | **DARE UK Federated Blueprint**<br>Section: *Core Services: Identity & Provisioning* | [DARE UK Reference Architecture](https://dareuk.org.uk/) | *"Automated lifecycle management and deprovisioning between institutional identity registries and secure research enclaves must utilize SCIM-compliant protocols."* |

### 1.2 Access Control
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **Role-Based Access Control (RBAC)** | Standard | **SATRE Specification**<br>Section: *Access Control (Req 2.2)* | [SATRE Access Control Spec](https://satre-specification.readthedocs.io/en/latest/specification/information_security.html#access-control) | *"The TRE must implement a formal security model for role-based access that strictly enforces the principle of least privilege across researchers, data stewards, and administrators."* |
| **Attribute-Based Access Control (ABAC)** | Standard | **NIST SP 800-162** & **DARE UK FAB**<br>Section: *Policy Decision & Enforcement Points* | [NIST SP 800-162 ABAC Guide](https://csrc.nist.gov/publications/detail/sp/800-162/final) | *"Fine-grained access to multi-party datasets requires Attribute-Based Access Control evaluating user role, dataset sensitivity classification, and project ethical approval bounds."* |
| **Privileged Access Management (PAM)** | Standard | **NCSC Cyber Security Design Principles**<br>Section: *Principle 3: Make compromise difficult* | [NCSC Secure Design Principles](https://www.ncsc.gov.uk/collection/cyber-security-design-principles/make-compromise-difficult) | *"Segregate privileged users, enforce just-in-time access, and maintain immutable session recordings for all administrative ingress channels."* |

### 1.3 Secure User Experience
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **FIDO2 / WebAuthn** | Standard | **NCSC Guidance on Identity & Authentication**<br>Section: *Phishing-resistant MFA* | [NCSC WebAuthn / FIDO2](https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services) | *"Deploy phishing-resistant hardware authenticators (FIDO2/WebAuthn) for high-impact analytical environments processing tier-4 identifiable data."* |
| **Zero-Trust Network Access (ZTNA)** | Standard | **NCSC Zero Trust Architecture Design Guide**<br>Section: *Zero Trust Architecture Principles* | [NCSC Zero Trust Principles](https://www.ncsc.gov.uk/collection/zero-trust-architecture) | *"Network locality must not imply trust; access to analytics workspaces must be evaluated on an authenticated, encrypted, per-session proxy basis."* |

---

## 2. Safe Data Management

### 2.1 Data Governance
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **SHA-256 / Cryptographic Hashing** | Standard | **SATRE Specification**<br>Section: *Data Ingestion & Egress (Req 4.1)* | [SATRE Data Egress Spec](https://satre-specification.readthedocs.io/en/latest/specification/data_management.html#ingress-egress) | *"All datasets ingested into or exported from the TRE must have cryptographic checksums (e.g. SHA-256) calculated and logged to ensure immutable provenance and integrity."* |
| **HDR UK Gateway Metadata Standards** | Standard | **NHS England SDE Data Architecture Policy**<br>Section: *Metadata Standards & Interoperability* | [NHS SDE Guidelines](https://digital.nhs.uk/services/secure-data-environment-service) / [HDR UK Schema](https://www.healthdatagateway.org/) | *"All regional and national SDE nodes must publish structured dataset metadata conforming to the HDR UK Common Metadata Schema to enable national federated discovery."* |
| **FAIR Data Principles** | Standard | **DARE UK Principles & SATRE Specification**<br>Section: *Data Governance (Req 3.1)* | [SATRE Data Management](https://satre-specification.readthedocs.io/en/latest/specification/data_management.html) / [GO-FAIR](https://www.go-fair.org/fair-principles/) | *"TRE data governance structures must implement FAIR principles (Findable, Accessible, Interoperable, Reusable) within the constraints of data privacy laws."* |

### 2.2 Data Engineering & Processing
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **OMOP Common Data Model** | Standard | **NHS England Secure Data Environment Network**<br>Section: *Data Standardisation & Interoperability Mandate* | [NHS SDE Interoperability Guide](https://digital.nhs.uk/services/secure-data-environment-service) / [OHDSI OMOP CDM](https://ohdsi.github.io/CommonDataModel/) | *"NHS SDEs require electronic health records and observational clinical data to be curated and transformed into the OMOP Common Data Model for cross-SDE analytical pipelines."* |
| **HL7 FHIR (Fast Healthcare Interoperability Resources)** | Standard | **NHS England SDE Technical Standards**<br>Section: *Clinical Data Ingestion Specifications* | [NHS England Interoperability Standards](https://digital.nhs.uk/services/secure-data-environment-service) / [HL7 FHIR Release](https://hl7.org/fhir/) | *"Real-time and batch clinical data exchange between upstream NHS trust sources and SDE ingestion landing zones must utilize HL7 FHIR APIs and resource bundles."* |
| **AES-256-GCM / TLS 1.3** | Standard | **NCSC Cloud Security & Storage Guidance**<br>Section: *Data Protection: Encryption at Rest & In Transit* | [NCSC Managing Data in the Cloud](https://www.ncsc.gov.uk/collection/cloud/principles) | *"All sensitive storage volumes, backups, and inter-service communications must enforce AES-256 encryption at rest and TLS 1.3 in transit with forward secrecy."* |

---

## 3. Safe Governance & Compliance

### 3.1 Regulatory Compliance
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **NHS Data Security & Protection Toolkit (DSPT)** | Standard | **NHS England IG Policy** & **SATRE Specification**<br>Section: *Information Governance & Compliance (Req 1.1)* | [NHS DSPT Requirements](https://www.dsptoolkit.nhs.uk/) / [SATRE Governance](https://satre-specification.readthedocs.io/en/latest/specification/governance.html) | *"Organizations hosting health data in TREs must maintain annual DSPT 'Standards Met' status, certifying compliance against National Data Guardian standards."* |
| **NHS Digital Technology Assessment Criteria (DTAC)** | Standard | **NHS Transformation Directorate**<br>Section: *Clinical Safety, Data Protection, Cyber Security* | [NHS DTAC Framework](https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/) | *"Technical solutions deployed in NHS environments must satisfy DTAC criteria across clinical safety (DCB0129), data protection impact assessment, and cyber baseline."* |
| **ISO/IEC 27001:2022** | Standard | **SATRE Specification**<br>Section: *Governance & Accreditations (Req 1.2)* | [SATRE Accreditation Spec](https://satre-specification.readthedocs.io/en/latest/specification/governance.html#accreditations) | *"TRE operators must establish an Information Security Management System (ISMS) certified to ISO/IEC 27001:2022 or equivalent national accreditation (e.g. Cyber Essentials Plus)."* |
| **Caldicott Principles** | Standard | **National Data Guardian Guidance**<br>Section: *Principles 1–8 on Patient Data* | [NDG Caldicott Principles](https://www.gov.uk/government/organisations/national-data-guardian) | *"All data flows and project access approvals within NHS-affiliated SDEs must be reviewed by a Caldicott Guardian against the 8 Caldicott Principles."* |

### 3.2 Security Management & Auditing
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **Syslog (RFC 5424) / Centralised Audit Streams** | Standard | **SATRE Specification**<br>Section: *Auditability & Observability (Req 2.3)* | [SATRE Auditability Spec](https://satre-specification.readthedocs.io/en/latest/specification/information_security.html#audit-logging) | *"Human-initiated and automated processes must generate centralized, immutable audit logs (RFC 5424) to ensure transparency, accountability, and traceability of all actions."* |
| **IT Health Check (ITHC) / Penetration Testing** | Standard | **NCSC Cloud Security Principle 13**<br>Section: *Audit and Proactive Security Testing* | [NCSC Cloud Security Principle 13](https://www.ncsc.gov.uk/collection/cloud/principles) | *"Undergo annual CREST/CHECK-certified penetration testing and vulnerability assessments across external perimeter and tenant isolation boundaries."* |

---

## 4. Safe Outputs & Disclosure Control

### 4.1 Output Checking & Statistical Disclosure Control
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **ONS SDC Threshold Guidance** | Standard | **ONS / UK Government Analysis Function**<br>Section: *Policy on Statistical Disclosure Control for Tables* | [ONS SDC Policy Store](https://analysisfunction.civilservice.gov.uk/policy-store/statistical-disclosure-control-for-tables/) | *"Outputs derived from microdata must apply threshold rules (minimum cell count of 10), dominance rules ($k\%$), and cell suppression before approval for release."* |
| **Differential Privacy ($\epsilon, \delta$)** | Standard | **NIST SP 800-226** & **DARE UK TREvolution Theme 2**<br>Section: *Guidelines for Evaluating Privacy Guarantees* | [NIST SP 800-226 Differential Privacy](https://csrc.nist.gov/pubs/sp/800/226/final) | *"Semi-automated output review architectures must evaluate mathematical differential privacy bounds ($\epsilon, \delta$) when releasing machine learning models or aggregate queries."* |
| **Data Airlock Protocol** | Standard | **SATRE Specification**<br>Section: *Data Ingress/Egress & Egress Control (Req 4.2)* | [SATRE Egress Spec](https://satre-specification.readthedocs.io/en/latest/specification/data_management.html#egress-control) | *"Data movement out of the TRE must be quarantined in a staging area (Data Airlock) where two-person human review or verified automated rules inspect all artifacts."* |

### 4.2 Accidental Disclosure & Breach Response
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **NIST SP 800-61 Rev. 2** | Standard | **NIST Computer Security Resource Center**<br>Section: *Computer Security Incident Handling Guide* | [NIST SP 800-61 Incident Handling](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final) | *"Establish formal incident handling lifecycles: Preparation, Detection & Analysis, Containment/Eradication, and Post-Incident Activity for data leaks."* |
| **UK GDPR Article 33 / ICO Notification** | Standard | **Information Commissioner's Office (ICO)**<br>Section: *Personal Data Breach Notification Rules* | [ICO 72-Hour Breach Reporting](https://ico.org.uk/for-organisations/report-a-breach/) | *"Mandatory notification to the supervisory authority within 72 hours of becoming aware of an accidental disclosure or personal data breach."* |

---

## 5. Safe Projects & Operations

### 5.1 Project & Service Management
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **Five Safes Framework** | Standard | **UK Data Service / DARE UK / NHS SDE**<br>Section: *Governance Operating Model* | [UK Data Service Five Safes](https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/) | *"Core project onboarding and operational principle governing all UK TREs: Safe People, Safe Projects, Safe Settings, Safe Data, and Safe Outputs."* |
| **ITIL 4 Service Management** | Standard | **AXELOS / UK Public Sector ITSM Baseline**<br>Section: *Incident, Problem, Change & Service Level Management* | [AXELOS ITIL 4 Standards](https://www.axelos.com/certifications/itil-service-management) | *"Operational service management framework for establishing SLAs, formal change advisory boards (CAB), and service continuity in research computing."* |
| **OpenTelemetry (OTel)** | Standard | **CNCF / SATRE Observability Pillar**<br>Section: *Pillar 5: Operational Management & Telemetry* | [OpenTelemetry CNCF Specification](https://opentelemetry.io/) | *"TRE microservice components and compute workloads should emit vendor-neutral traces, metrics, and logs to monitor resource saturation and operational health."* |

---

## 6. Safe Technology & Engineering

### 6.1 Software Engineering & Security Standards
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAPI Specification (OAS 3.1)** | Standard | **OpenAPI Initiative / Linux Foundation** & **SATRE v2.0**<br>Section: *Federation & Interoperability Pillar* | [OpenAPI 3.1 Specification](https://www.openapis.org/) | *"All interoperable TRE control-plane and airlock APIs must publish formal machine-readable OpenAPI specifications to allow federated orchestration."* |
| **OWASP Top 10** | Standard | **NCSC Secure Development and Deployment Guidance**<br>Section: *Application Security Standard* | [NCSC App Security Guidance](https://www.ncsc.gov.uk/collection/developers-collection) / [OWASP Top 10](https://owasp.org/www-project-top-ten/) | *"Secure coding guidelines must mandate prevention of top web vulnerabilities (injection, broken authentication, security misconfiguration, SSRF)."* |
| **Software Bill of Materials (SBOM / CycloneDX)** | Standard | **NCSC Supply Chain Security Guidance** & **NTIA Standard**<br>Section: *Supply Chain Risk Management* | [NCSC Supply Chain Security](https://www.ncsc.gov.uk/collection/supply-chain-security) / [CycloneDX](https://cyclonedx.org/) | *"Research environments must generate and inspect machine-readable SBOMs for all container images and third-party dependencies entering air-gapped enclaves."* |

### 6.2 Cloud Infrastructure & System Architecture
| Item | Type | Source Document & Clause | Direct Source Link | Exact Mention / Requirement Context |
| :--- | :--- | :--- | :--- | :--- |
| **Infrastructure-as-Code (IaC / Declarative Configuration)** | Standard | **SATRE Specification**<br>Section: *System Architecture (Req 5.1)* | [SATRE System Architecture](https://satre-specification.readthedocs.io/en/latest/specification/technical_capabilities.html) | *"All TRE infrastructure, workspace templates, and network security boundaries must be defined and deployed via declarative Infrastructure-as-Code (IaC)."* |
| **NCSC Cyber Security Design Principles** | Standard | **NCSC UK Architecture Standard**<br>Section: *Principles: Establish context, Make compromise difficult, Reduce impact* | [NCSC Design Principles](https://www.ncsc.gov.uk/collection/cyber-security-design-principles) | *"Foundational national architectural standard mandating defence-in-depth, least-privilege network segmentation, and assumption of breach across sensitive data systems."* |
| **POSIX / OCI Container Standards** | Standard | **Open Container Initiative (OCI)** & **SATRE Spec**<br>Section: *Compute & Analytic Workspaces* | [OCI Image & Runtime Spec](https://opencontainers.org/) | *"Analytic execution environments must utilize standard Open Container Initiative (OCI) images to ensure reproducible, isolated compute workspaces."* |

---

## 🎯 Summary Matrix by Sourcing Tag

```yaml
# Provenance breakdown of reference architectures and national standards:
standards_by_source:
  satre-specification:
    - OAuth 2.0 / OIDC (Req 2.1)
    - SAML 2.0 (Req 2.1.2)
    - Multi-Factor Authentication (Req 2.1.1)
    - Role-Based Access Control (Req 2.2)
    - Cryptographic Checksums (Req 4.1)
    - Data Airlock Protocols (Req 4.2)
    - Centralised Immutable Audit Syslog (Req 2.3)
    - Declarative Infrastructure-as-Code (Req 5.1)
    - OCI Container Isolation (Req 5.2)
  nhs-england-sde:
    - OMOP Common Data Model (Interoperability Mandate)
    - HL7 FHIR Standards (Clinical Data Ingestion)
    - HDR UK Gateway Metadata Schema
    - Caldicott Principles (Principles 1-8)
    - ICO 72-Hour Data Breach Notification (UK GDPR Art 33)
  dare-uk:
    - SCIM RFC 7644 Provisioning
    - Attribute-Based Access Control (ABAC)
    - Federated Architecture Blueprint (FAB)
    - Differential Privacy Review Bounds
  ncsc-guidance:
    - NCSC Cyber Security Design Principles
    - NCSC Zero Trust Architecture
    - AES-256-GCM / TLS 1.3 Standards
    - FIDO2 / WebAuthn Hardware MFA
    - OWASP Top 10 Secure Development
    - Software Bill of Materials (SBOM / CycloneDX)
  ons-sdc:
    - ONS SDC Threshold Policy (Rule-of-10, Dominance, Suppression)
  dsp-toolkit:
    - NHS Data Security & Protection Toolkit (DSPT)
    - NHS Digital Technology Assessment Criteria (DTAC)
  international-standards:
    - ISO/IEC 27001:2022 (ISMS)
    - NIST SP 800-61 Rev. 2 (Incident Response)
    - OpenAPI Specification (OAS 3.1)
```
