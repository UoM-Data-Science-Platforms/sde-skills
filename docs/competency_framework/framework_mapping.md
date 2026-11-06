# Competency Framework Mapping

This document provides a detailed mapping of the SDE Skills Competency Framework to established standards, specifically the [Five Safes](https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/) model and the [Standard Architecture for Trusted Research Environments (SATRE v2.0.1)](https://satre-specification.readthedocs.io/en/v2.0.1/) specification.

## Mapping to Five Safes

The Five Safes framework is a set of principles enabling safe research access to sensitive data. Our competency domains are designed to align with and support these principles:

### Safe Data

> *Data is treated to protect any confidentiality concerns.*

**Primary Domain Mapping:**

- Safe Data Management

**Key Competencies:**

- Data Classification & Sensitivity (`data-classification-sensitivity`)
- Data Lineage & Provenance (`data-lineage-provenance`)
- Data Integrity (`data-integrity`)
- Data Quality Management (`data-quality-management`)
- Data Storage & Database Management (`data-storage-database-management`)
- Encryption Standards & Implementation (`encryption-standards-implementation`)

### Safe Projects

> *Research projects are approved by data owners for the public good.*

**Primary Domain Mapping:**

- Safe Projects & Operations
- Safe Governance & Compliance

**Key Competencies:**

- SDE Project Planning (`sde-project-planning`)
- Research Project Facilitation (`research-project-facilitation`)
- Research Ethics Compliance (`research-ethics-compliance`)
- Ethics & Research Approval Systems (`ethics-research-approval-systems`)
- Service Level Management (`service-level-management`)
- Researcher Training & Support (`researcher-training-support`)

### Safe People

> *Researchers are trained and authorised to use data safely.*

**Primary Domain Mapping:**

- Safe Access & Identity
- Safe Projects & Operations

**Key Competencies:**

- Authentication Systems (`authentication-systems`)
- User Provisioning & Lifecycle (`user-provisioning-lifecycle`)
- Federated Identity Management (`federated-identity-management`)
- Role-Based Access Control (`role-based-access-control`)
- Researcher Onboarding (`researcher-onboarding`)
- Researcher Training & Support (`researcher-training-support`)

### Safe Settings

> *A SecureLab environment prevents unauthorised use.*

**Primary Domain Mapping:**

- Safe Technology & Engineering
- Safe Access & Identity

**Key Competencies:**

- Secure Environment Design (`secure-environment-design`)
- Network Architecture (`network-architecture`)
- Cloud Infrastructure Management (`cloud-infrastructure-management`)
- Containerisation & Orchestration (`containerisation-orchestration`)
- Configuration Management (`configuration-management`)
- Secure Research Workspaces (`secure-research-workspaces`)

### Safe Outputs

> *Screened and approved outputs that are non-disclosive.*

**Primary Domain Mapping:**

- Safe Outputs & Disclosure Control

**Key Competencies:**

- Output Review Processes (`output-review-processes`)
- Disclosure Risk Assessment (`disclosure-risk-assessment`)
- Automated Disclosure Control (`automated-disclosure-control`)
- Data Airlocks (`data-airlocks`)
- Accidental Disclosure Management (`accidental-disclosure-management`)
- AI Artefact and Generated-output Release Controls (`ai-artefact-release-controls`)

## Mapping to SATRE

The [Standard Architecture for Trusted Research Environments (SATRE v2.0.1)](https://satre-specification.readthedocs.io/en/v2.0.1/) specification ([GitHub release v2.0.1](https://github.com/sa-tre/satre-specification/releases/tag/v2.0.1), 35 capabilities and 185 requirement statements across five pillars) provides a comprehensive reference architecture for organisations handling sensitive research data safely. Our competency framework maps to all five SATRE v2.0.1 pillars and their capabilities (see [`yaml/satre_mapping.yaml`](https://github.com/UoM-Data-Science-Platforms/sde-skills/blob/main/yaml/satre_mapping.yaml) and the interactive SATRE Mapping Matrix for the full capability-to-competency breakdown):

### 1. Information Governance

**SATRE v2.0.1 Capabilities:**

- **1.1 Information Governance** — Gathering legal, regulatory, and ethical requirements, implementing controls, and resourcing governance.
- **1.2 Quality Management** — Versioned policies and SOPs, governance performance reporting, internal/external audits, supplier compliance, physical asset tracking, and continuous improvement.
- **1.3 Risk Management** — Risk quantification, project data processing assessments, risk mitigation design, and risk ownership/escalation.
- **1.4 Study Management** — Project lifecycle compliance checks, Safe Projects register, workflow automation, and secure study closure.
- **1.5 Researcher Accreditation** — Member identity verification, role onboarding, Data Controller approval, and unique authenticated accounts.
- **1.6 Training Management and Delivery** — Role-based training curricula, refresh cycles, training records tied to access, and LMS/certification tracking.
- **1.7 Public Involvement and Engagement** — Inclusive public involvement in operations/oversight, public transparency of projects/datasets, and incident disclosure.

**Primary Domain Mappings:**

- Safe Governance & Compliance
- Safe Projects & Operations
- Safe Access & Identity

**Key Competencies:**

- Information Governance (`information-governance`)
- Data Protection Compliance (`data-protection-compliance`)
- Compliance Monitoring & Reporting (`compliance-monitoring-reporting`)
- Certification & Accreditation (`certification-accreditation`)
- Research Ethics Compliance (`research-ethics-compliance`)
- Ethics & Research Approval Systems (`ethics-research-approval-systems`)
- Security Assessment & Testing (`security-assessment-testing`)
- Researcher Onboarding (`researcher-onboarding`)
- Researcher Training & Support (`researcher-training-support`)
- Community Engagement & Networking (`community-engagement-networking`)

### 2. Computing Technology and Information Security

**SATRE v2.0.1 Capabilities:**

- **2.1 End User Computing** — Isolated researcher workspaces, clipboard/exfiltration prevention, reproducible analysis tools, package registries, HPC, and GPU accelerators.
- **2.2 Infrastructure Management** — Automated deployment, pre-production testing, network isolation (default outbound internet block), and usage/access logging.
- **2.3 Capacity Management** — Compute and storage resource planning, project allocation, and cost control.
- **2.4 Configuration Management** — Automated configuration management, baseline verification, and system replacement.
- **2.5 Information Security** — Regulatory security compliance, threat modelling, and security event log monitoring.
- **2.6 Cyber Resilience** — Infrastructure redundancy, compliant backups, and tested incident response.
- **2.7 Vulnerability Management** — Vulnerability scanning, automated patching, and penetration testing.
- **2.8 Encryption** — Data encryption at rest and in transit with secure key management.
- **2.9 Physical Security** — Physical protection of hosting infrastructure.

**Primary Domain Mappings:**

- Safe Technology & Engineering
- Safe Access & Identity
- Safe Governance & Compliance
- Safe Projects & Operations

**Key Competencies:**

- Secure Environment Design (`secure-environment-design`)
- Cloud Infrastructure Management (`cloud-infrastructure-management`)
- Network Architecture (`network-architecture`)
- Configuration Management (`configuration-management`)
- Vulnerability & Patch Management (`vulnerability-patch-management`)
- Encryption & Key Management (`encryption-key-management`)
- High Performance Computing (`high-performance-computing`)
- GPU and Accelerator Infrastructure (`ai-accelerator-infrastructure`)
- Secure Research Workspaces (`secure-research-workspaces`)
- Security Controls Implementation (`security-controls-implementation`)
- Incident Response Management (`incident-response-management`)

### 3. Data Management

**SATRE v2.0.1 Capabilities:**

- **3.1 Data Lifecycle Management** — Data classification, controlled ingress/egress, provenance tracking, minimisation, tiered security controls, ML artefact management, archival, and verifiable deletion.
- **3.2 Identity and Access Management** — Individual verified accounts, MFA, federated SSO, least-privilege dataset scoping, and network/location restrictions.
- **3.3 Output Management** — Output classification, statistical disclosure control, output checking workflows, policies for complex/ML outputs, and machine-readable release records.
- **3.4 Information Search and Discovery** — Dataset metadata catalogues, standardised metadata models, query interfaces, and synthetic/summary data.

**Primary Domain Mappings:**

- Safe Data Management
- Safe Access & Identity
- Safe Outputs & Disclosure Control

**Key Competencies:**

- Data Classification & Sensitivity (`data-classification-sensitivity`)
- Data Cataloguing & Discovery (`data-cataloguing-discovery`)
- Data Lineage & Provenance (`data-lineage-provenance`)
- Data Pipeline Development (`data-pipeline-development`)
- Data Retention & Disposal (`data-retention-disposal`)
- AI Data Provenance and Permissions (`ai-data-provenance-permissions`)
- Authentication Systems (`authentication-systems`)
- Role-Based Access Control (`role-based-access-control`)
- Least Privilege Implementation (`least-privilege-implementation`)
- Output Review Processes (`output-review-processes`)
- Disclosure Risk Assessment (`disclosure-risk-assessment`)
- Automated Disclosure Control (`automated-disclosure-control`)
- Data Airlocks (`data-airlocks`)
- AI Artefact and Generated-output Release Controls (`ai-artefact-release-controls`)

### 4. Supporting Capabilities

**SATRE v2.0.1 Capabilities:**

- **4.1 Business Continuity** — Business continuity and disaster recovery planning and testing.
- **4.2 Project and Programme Management** — Named project managers and separation of duties from direct TRE data access.
- **4.3 Knowledge Management** — Implementation documentation, stakeholder education programmes, and training needs analysis.
- **4.4 Financial Management** — Project cost transparency, expenditure tracking, infrastructure cost optimisation, and financial sustainability.
- **4.5 Procurement** — Hardware, cloud, software, and service procurement planning.
- **4.6 IT Service Management** — Dedicated operator support teams and service management processes.
- **4.7 Relationship Management** — Stakeholder communication and infrastructure feedback processes.
- **4.8 Legal Services** — Access to legal and data protection advice and contract management.

**Primary Domain Mappings:**

- Safe Projects & Operations
- Safe Governance & Compliance
- Safe Technology & Engineering

**Key Competencies:**

- SDE Project Planning (`sde-project-planning`)
- Research Project Facilitation (`research-project-facilitation`)
- Resource & Cost Management (`resource-cost-management`)
- Procurement & Vendor Management (`procurement-vendor-management`)
- Service Level Management (`service-level-management`)
- Incident & Problem Management (`incident-problem-management`)
- Change & Release Management (`change-release-management`)
- Documentation & Knowledge Management (`documentation-knowledge-management`)
- Continuous Improvement (`continuous-improvement`)

### 5. Federation

**SATRE v2.0.1 Capabilities:**

- **5.1 Federation Governance** — Multi-TRE governance structure, shared responsibility model, common compliance rules, risk equivalence, and incident/audit sharing.
- **5.2 Federation Researcher Accreditation** — Baseline safe-researcher competency requirements across federated TREs.
- **5.3 Federation Study Management** — Shared Safe Projects register and common legal, ethical, and compliance standards.
- **5.4 Federation Information Security** — Federation-wide encryption/PKI standards, shared incident response, federated user/machine identities, and cross-TRE security log sharing.
- **5.5 Federation Infrastructure Management** — Shared configuration management across federated services.
- **5.6 Federation Data Management** — Shared safe output definitions and federated metadata catalogues.
- **5.7 Federation Financial Management** — Transparent pricing framework for federated projects.

**Primary Domain Mappings:**

- Safe Governance & Compliance
- Safe Access & Identity
- Safe Data Management
- Safe Outputs & Disclosure Control
- Safe Projects & Operations
- Safe Technology & Engineering

**Key Competencies:**

- Federated Identity Management (`federated-identity-management`)
- Attribute-Based Access Control (`attribute-based-access-control`)
- Encryption & Key Management (`encryption-key-management`)
- Data Cataloguing & Discovery (`data-cataloguing-discovery`)
- Data Models & Standardisation (`data-models-standardisation`)
- Output Review Processes (`output-review-processes`)
- Compliance Monitoring & Reporting (`compliance-monitoring-reporting`)
- Incident Response Management (`incident-response-management`)

## Cross-Cutting Competencies

Some competencies span multiple Five Safes principles and SATRE pillars:

### Governance & Compliance

**Spans across all Five Safes principles and SATRE pillars**

**Key Competencies:**

- Information Governance (`information-governance`)
- Data Protection Compliance (`data-protection-compliance`)
- Healthcare Standards Compliance (`healthcare-standards-compliance`)
- Healthcare Data Security Frameworks (`healthcare-data-security-frameworks`)
- Research Ethics Compliance (`research-ethics-compliance`)
- Security Controls Implementation (`security-controls-implementation`)
- Audit Trail Implementation (`audit-trail-implementation`)
- Compliance Monitoring & Reporting (`compliance-monitoring-reporting`)

### Collaboration & Communication

**Key to effective implementation of all domains**

**Key Competencies:**

- Documentation & Knowledge Management (`documentation-knowledge-management`)
- Researcher Training & Support (`researcher-training-support`)
- Continuous Improvement (`continuous-improvement`)
- Research Project Facilitation (`research-project-facilitation`)
- Community Engagement & Networking (`community-engagement-networking`)
- Code Documentation & Reusability (`code-documentation-reusability`)
