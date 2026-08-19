<!-- AUTO-GENERATED FILE - do not edit by hand.
     Source of truth: yaml/
     Regenerate with: python scripts/build_skill_references.py -->


# SDE Competency Framework - Index

Compact map of the full framework: every domain, subdomain, and competency
with its identifier. Use this to decide which domain reference files (in
`references/domains/`) to load for detail; each competency there defines
entry, mid, and senior level skill statements.

6 domains / 21 subdomains / 74 competencies. Levels everywhere: entry, mid, senior.

## Domain 1: Safe Access & Identity (`safe-access-identity`)

This domain covers all aspects of user authentication, authorization, and access control within Secure Data Environments, ensuring that only authorised users can access appropriate resources.

Detail: `references/domains/safe-access-identity.md`

### Identity Management (`identity-management`)

Identity Management encompasses the systems and processes that govern user digital identities within secure data environments.

- **Authentication Systems** (`authentication-systems`): Implements and maintains secure user verification mechanisms within research environments.
- **User Provisioning & Lifecycle** (`user-provisioning-lifecycle`): Manages the complete lifecycle of user accounts from creation to deactivation within secure environments.
- **Federated Identity Management** (`federated-identity-management`): Enables secure authentication across organisational boundaries through single sign-on protocols like SAML, OAuth, and OIDC.

### Access Control (`access-control`)

Access Control ensures that only authorised individuals can access specific resources within secure data environments through structured permission systems.

- **Role-Based Access Control** (`role-based-access-control`): Implements access permissions based on organizational roles within secure data environments.
- **Attribute-Based Access Control** (`attribute-based-access-control`): Implements dynamic, context-aware access control using attributes rather than roles.
- **Least Privilege Implementation** (`least-privilege-implementation`): Ensures users and systems have only the minimum access privileges needed for their functions.

### Secure User Experience (`secure-user-experience`)

Secure User Experience focuses on designing and maintaining protected research environments that balance robust security measures with usability.

- **Researcher Onboarding** (`researcher-onboarding`): Designs and implements secure processes for integrating researchers into data environments.
- **Secure Research Workspaces** (`secure-research-workspaces`): Creates and maintains protected environments for researchers working with sensitive data.
- **Secure Collaboration Tools** (`secure-collaboration-tools`): Implements platforms enabling researchers to securely share and collaborate on sensitive data.

## Domain 2: Safe Data Management (`safe-data-management`)

This domain covers all aspects of data handling, processing, governance, and engineering within Secure Data Environments, focusing on ensuring data is managed securely and effectively throughout its lifecycle.

Detail: `references/domains/safe-data-management.md`

### Data Governance (`data-governance`)

Data Governance establishes frameworks and processes for ensuring data quality, security, and proper management throughout its lifecycle.

- **Data Integrity** (`data-integrity`): Ensures that data remains accurate, consistent, and unaltered throughout its lifecycle.
- **Data Cataloguing & Discovery** (`data-cataloguing-discovery`): Creates and maintains systems that enable researchers to find and understand available datasets in line with FAIR (Findable, Accessible, Interoperable, and Reusable) principles.
- **Data Classification & Sensitivity** (`data-classification-sensitivity`): Implements frameworks for categorising data based on sensitivity and security requirements.
- **Data Lineage & Provenance** (`data-lineage-provenance`): Tracks and documents the origins, movements, and transformations of data throughout systems.
- **Data Quality Management** (`data-quality-management`): Ensures the accuracy, completeness, and reliability of data within secure environments.

### Data Engineering & Processing (`data-engineering-processing`)

Data Engineering & Processing focuses on building and maintaining secure systems that extract, transform, store, and process sensitive data.

- **Data Pipeline Development** (`data-pipeline-development`): Builds and maintains processes that extract, transform, and load data securely between systems.
- **Data Storage & Database Management** (`data-storage-database-management`): Designs and maintains secure database systems for storing and retrieving sensitive data.
- **Data Models & Standardisation** (`data-models-standardisation`): Enables the secure and effective use of standardised data models such as FHIR and OMOP within secure data environments.
- **Event-Driven Data Processing** (`event-driven-data-processing`): Implements systems that process data in real-time based on events and triggers.
- **Encryption Standards & Implementation** (`encryption-standards-implementation`): Implements cryptographic solutions to protect sensitive data throughout its lifecycle in secure environments.
- **Data Backups** (`data-backups`): Ensures data availability and recoverability through systematic backup and restoration processes.
- **Data Retention & Disposal** (`data-retention-disposal`): Manages the secure lifecycle of data from creation to disposal, ensuring compliance with regulatory requirements and organisational policies.
- **Data Migration** (`data-migration`): Ensures the secure, reliable, and efficient transfer of data between systems, storage solutions, or environments.

## Domain 3: Safe Governance & Compliance (`safe-governance-compliance`)

This domain covers the regulatory, ethical, and compliance aspects of operating Secure Data Environments, ensuring systems meet legal requirements and maintain appropriate controls.

Detail: `references/domains/safe-governance-compliance.md`

### Regulatory Compliance (`regulatory-compliance`)

Regulatory Compliance ensures that secure data environments meet legal requirements and standards for handling sensitive healthcare information.

- **Information Governance** (`information-governance`): Establishes and maintains frameworks for managing information assets securely and compliantly.
- **Data Protection Compliance** (`data-protection-compliance`): Ensures adherence to data protection laws and regulations such as GDPR.
- **Healthcare Standards Compliance** (`healthcare-standards-compliance`): Ensures adherence to healthcare-specific regulatory standards such as DSPT and NHS DTAC.
- **Healthcare Data Security Frameworks** (`healthcare-data-security-frameworks`): Implements specialised security controls required for protecting healthcare data.
- **Ethics & Research Approval Systems** (`ethics-research-approval-systems`): Manages systems and processes for ensuring research meets ethical standards and approval requirements.

### Security Management (`security-management`)

Security Management establishes and maintains protections for data assets and systems within secure research environments.

- **Security Controls Implementation** (`security-controls-implementation`): Deploys technical, administrative, and physical safeguards to protect data and systems.
- **Security Assessment & Testing** (`security-assessment-testing`): Evaluates the effectiveness of security controls through testing and analysis.
- **Incident Response Management** (`incident-response-management`): Prepares for and manages security incidents effectively to minimise impact.

### Ethics & Research Governance (`ethics-research-governance`)

Ethics & Research Governance maintains the ethical integrity of research activities involving sensitive healthcare data.

- **Research Ethics Compliance** (`research-ethics-compliance`): Ensures research activities adhere to ethical principles and requirements.
- **Consent Management** (`consent-management`): Manages processes for obtaining, recording, and honoring data subject consent.
- **Ethical Review Processes** (`ethical-review-processes`): Facilitates the assessment of research proposals against ethical standards.

### Audit & Compliance Monitoring (`audit-compliance-monitoring`)

Audit & Compliance Monitoring ensures continuous verification of regulatory adherence through systematic tracking and reporting.

- **Audit Trail Implementation** (`audit-trail-implementation`): Creates comprehensive records of system and user activities for security and compliance.
- **Compliance Monitoring & Reporting** (`compliance-monitoring-reporting`): Continuously assesses and documents adherence to regulatory requirements and standards.
- **Certification & Accreditation** (`certification-accreditation`): Guides systems through formal security validation by external authorities.

## Domain 4: Safe Outputs & Disclosure Control (`safe-outputs-disclosure-control`)

This domain covers the technical controls that help to protect projects from accidental or intentional disclosure, as well as providing tooling to support disclosure review operations of project teams to ensure that research outputs from Secure Data Environments do not inadvertently disclose sensitive information.

Detail: `references/domains/safe-outputs-disclosure-control.md`

### Output Checking (`output-checking`)

This subdomain focuses on providing output checkers with tools that facilitate structured review processes for different output formats, and developing decision support systems that ensure consistent application of disclosure control rules while maintaining appropriate governance and traceability.

- **Output Review Processes** (`output-review-processes`): Involves understanding review requirements for different output formats, designing workflows, implementing tracking and governance processes.

### Tools and platforms to support output checking (`tools-and-platforms-to-support-output-checking`)

### Workflow engines

- **Workflow engines** (`workflow-engines`): Deploy and administer workflow engines to help ensure consistency, reliability, and traceability of output checking processes.
- **Data airlocks** (`data-airlocks`): Install and administer data airlock applications, understand the roles and what level of access is required to achieve given tasks (e.g., approvals, requests, triage, audit, review etc.) within the airlock application, create user documentation and training materials, contribute to on-going improvements to data airlocks to ensure they meet user needs as well as comply with standards and regulations.
- **Code repositories** (`code-repositories`): Install and configure code repository systems (e.g., Git) that allow source code to be imported and exported from SDEs in industry standard ways.

### Statistical Disclosure Control (`statistical-disclosure-control`)

Implementing automated systems that enforce consistent application of disclosure controls across varied research outputs while maintaining statistical validity.

- **Disclosure Risk Assessment** (`disclosure-risk-assessment`): Implementing tools to facilitate reviewing research outputs for potential privacy violations and re-identification risks.
- **Automated Disclosure Control** (`automated-disclosure-control`): Implements systems that automatically apply disclosure controls to research outputs.

### Accidental disclosure (`accidental-disclosure`)




### Emergency response (`emergency-response`)

The infrastructure team should be prepared for emergency response when a suspected data leak is reported.


## Domain 5: Safe Projects & Operations (`safe-projects-operations`)

This domain covers the management of secure data environment projects, operational excellence, and the delivery of services to research communities.

Detail: `references/domains/safe-projects-operations.md`

### Project Management (`project-management`)

Project Management oversees the planning and delivery of secure data environment initiatives.

- **SDE Project Planning** (`sde-project-planning`): Plans and executes projects related to secure data environments.
- **Research Project Facilitation** (`research-project-facilitation`): Supports researchers in utilizing secure data environments effectively.
- **Agile Delivery Methods** (`agile-delivery-methods`): Applies iterative and incremental approaches to SDE development and operations.
- **Procurement & Vendor Management** (`procurement-vendor-management`): Acquires and manages external resources and services for secure data environments.
- **Resource & Cost Management** (`resource-cost-management`): Allocates and optimises resources within secure data environments to maximise value.

### Service Management (`service-management`)

Service Management ensures the reliable delivery of secure data environment services to research users.

- **Service Level Management** (`service-level-management`): Defines, measures, and maintains service quality for SDE users.
- **Incident & Problem Management** (`incident-problem-management`): Responds to and resolves service disruptions while preventing recurrence.
- **Change & Release Management** (`change-release-management`): Controls modifications to SDE infrastructure, applications, and services.

### Operational Excellence (`operational-excellence`)

Operational Excellence establishes consistent, high-quality service delivery within secure data environments.

- **Continuous Improvement** (`continuous-improvement`): Systematically enhances SDE processes, services, and capabilities.
- **Documentation & Knowledge Management** (`documentation-knowledge-management`): Creates, maintains, and shares operational knowledge within the SDE.
- **Monitoring & Observability** (`monitoring-observability`): Tracks system health, performance, and security in the SDE.

### Research Support & Innovation (`research-support-innovation`)

Research Support & Innovation enhances researcher effectiveness within secure data environments.

- **Researcher Training & Support** (`researcher-training-support`): Enables researchers to effectively use secure data environments.
- **TRE Tools & Capabilities** (`tre-tools-capabilities`): Provides and manages tools for research in secure environments.
- **Future TRE Innovation** (`future-tre-innovation`): Explores and implements new technologies and approaches for secure research.
- **Community Engagement & Networking** (`community-engagement-networking`): Participates in and contributes to the wider secure data environment community.

## Domain 6: Safe Technology & Engineering (`safe-technology-engineering`)

This domain covers the technical implementation and maintenance of secure systems, focusing on the infrastructure, development, and engineering aspects of Secure Data Environments.

Detail: `references/domains/safe-technology-engineering.md`

### Software Engineering (`software-engineering`)

Software Engineering applies structured approaches to developing and maintaining secure, high-quality code for research environments.

- **Software Development Lifecycle** (`software-development-lifecycle`): Applies structured approaches to developing and maintaining software throughout its lifecycle.
- **Secure Coding Practices** (`secure-coding-practices`): Develops software with security built into the code itself.
- **Testing & Quality Assurance** (`testing-quality-assurance`): Validates software functionality, security, and performance before deployment.
- **Microservices & API Design** (`microservices-api-design`): Develops loosely coupled, independently deployable services that communicate via APIs.
- **Code Documentation & Reusability** (`code-documentation-reusability`): Creates understandable, maintainable, and reusable code.
- **Artefact Management** (`artefact-management`): Securely stores, distributes, and controls access to software artefacts including container images, helm charts, and package repositories.

### Infrastructure & Deployment (`infrastructure-deployment`)

Infrastructure & Deployment establishes the foundation for secure, scalable research environments.

- **Cloud Infrastructure Management** (`cloud-infrastructure-management`): Designs, deploys, and manages cloud resources for secure data environments.
- **Containerisation & Orchestration** (`containerisation-orchestration`): Packages and manages applications in isolated, portable environments.
- **Network Architecture** (`network-architecture`): Designs and implements secure networks for data environments.
- **Encryption & Key Management** (`encryption-key-management`): Protects data at rest and in transit using secure algorithms and robust key management practices.

### System Architecture (`system-architecture`)

System Architecture establishes the foundational design principles for secure, scalable, and maintainable research environments.

- **Secure Environment Design** (`secure-environment-design`): Creates system designs that prioritise data security and privacy, compliance with 5-safes and SATRE.
- **Scalability & Performance** (`scalability-performance`): Builds systems that can handle growing workloads while maintaining responsiveness.
- **Enterprise Solution Development** (`enterprise-solution-development`): Creates robust systems that meet business-critical requirements.
- **Component-Based Architecture** (`component-based-architecture`): Designs systems as assemblies of modular, reusable components.
- **Vulnerability & Patch Management** (`vulnerability-patch-management`): Identifies, assesses, and remediates security vulnerabilities across systems and infrastructure.
- **Configuration Management** (`configuration-management`): Deploys and maintains infrastructure and applications in consistent, secure, and compliant states.
- **High Performance Computing** (`high-performance-computing`): Provisions, configures, and securely manages high-performance computing resources and specialised hardware accelerators.
