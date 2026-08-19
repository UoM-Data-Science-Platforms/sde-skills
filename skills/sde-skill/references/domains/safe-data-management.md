<!-- AUTO-GENERATED FILE - do not edit by hand.
     Source of truth: yaml/safe_data_management.yaml
     Regenerate with: python scripts/build_skill_references.py -->


# Domain 2: Safe Data Management (`safe-data-management`)

This domain covers all aspects of data handling, processing, governance, and engineering within Secure Data Environments, focusing on ensuring data is managed securely and effectively throughout its lifecycle.

## Data Governance (`data-governance`)

Data Governance establishes frameworks and processes for ensuring data quality, security, and proper management throughout its lifecycle.
This subdomain encompasses classification of sensitive data, tracking data lineage and provenance, and implementing quality management practices that maintain data integrity, accuracy, and compliance with organisational policies while providing visibility into data origins and transformations.

*Example tools/technologies/standards:* Checksums, Excel validation templates

### Data Integrity (`data-integrity`)

Ensures that data remains accurate, consistent, and unaltered throughout its lifecycle.
Involves implementing mechanisms such as checksums, hash validation, and digital signatures to detect and prevent unauthorised modification or corruption.
Requires regular integrity checks, monitoring, and alerting, as well as procedures for remediation in the event of integrity violations.

**Entry Level:**

- Understands the importance of data integrity in secure environments
- Familiar with basic integrity verification methods (e.g., checksums)
- Can perform manual integrity checks under supervision

**Mid Level:**

- Implements automated data integrity verification processes
- Monitors and responds to integrity check failures
- Integrates integrity validation into data pipelines and storage workflows

**Senior Level:**

- Designs and oversees enterprise-wide data integrity strategies
- Establishes policies and procedures for ongoing integrity assurance
- Leads incident response for data integrity breaches

### Data Cataloguing & Discovery (`data-cataloguing-discovery`)

Creates and maintains systems that enable researchers to find and understand available datasets in line with FAIR (Findable, Accessible, Interoperable, and Reusable) principles.
Involves documenting datasets with appropriate metadata, implementing catalogue systems, developing metadata standards, ensuring catalogue accuracy and usability, and architecting enterprise discovery solutions.
Requires establishing governance frameworks and enhancing data reusability.

**Entry Level:**

- Understands the purpose and structure of data catalogues
- Familiar with metadata standards and practices
- Familiar with common data cataloguing tools

**Mid Level:**

- Implements and maintains data catalogue systems
- Develops metadata standards and collection processes

**Senior Level:**

- Architects enterprise-wide data catalogue implementations
- Establishes governance frameworks for metadata management
- Leads initiatives to enhance data discovery and reuse

### Data Classification & Sensitivity (`data-classification-sensitivity`)

Implements frameworks for categorising data based on sensitivity and security requirements.
Involves understanding different data types, applying appropriate classification labels, designing handling procedures, conducting reviews, and developing organisational policies.
Requires implementing classification systems and leading risk assessment initiatives across the organisation.

**Entry Level:**

- Understands basic data classification principles and sensitivity levels
- Familiar with common data types (PII, PHI, etc.) and their handling requirements
- Can apply classification labels following established guidelines

**Mid Level:**

- Implements data classification schemes and sensitivity management
- Designs data handling procedures appropriate to classification levels
- Conducts data classification reviews and recommends improvements

**Senior Level:**

- Develops organisational data classification frameworks and policies
- Implements classification and data discovery systems
- Leads data sensitivity governance and risk assessment initiatives

### Data Lineage & Provenance (`data-lineage-provenance`)

Tracks and documents the origins, movements, and transformations of data throughout systems.
Involves maintaining metadata documentation, implementing lineage tools, verifying data provenance, analysing quality issues, and architecting enterprise-wide systems.
Requires developing governance frameworks that maintain visibility of sensitive data across multiple systems.

**Entry Level:**

- Understands basic concepts of data tracking through systems
- Familiar with metadata documentation for data lineage
- Can document data sources and transformations

**Mid Level:**

- Implements data lineage tools and frameworks
- Designs processes to maintain and verify data provenance
- Analyses data lineage to identify quality or security issues

**Senior Level:**

- Architects enterprise-wide data lineage and provenance systems
- Develops governance frameworks that maintain provenance of sensitive data
- Leads initiatives to improve cross-system data lineage visibility

### Data Quality Management (`data-quality-management`)

Ensures the accuracy, completeness, and reliability of data within secure environments.
Involves understanding quality dimensions, performing validation, designing quality frameworks, developing metrics, implementing automated validation, and establishing enterprise-wide strategies.
Requires leading quality improvement initiatives and developing advanced measurement and remediation approaches.

**Entry Level:**

- Understands data quality dimensions (accuracy, completeness, etc.)
- Familiar with basic data validation techniques
- Can execute data quality checks following established procedures

**Mid Level:**

- Designs and implements data quality frameworks and controls
- Develops data quality metrics and monitoring processes
- Implements data quality validation pipelines

**Senior Level:**

- Establishes enterprise data quality management policies
- Leads data quality improvement initiatives across the organisation
- Develops advanced data quality measurement and remediation approaches

## Data Engineering & Processing (`data-engineering-processing`)

Data Engineering & Processing focuses on building and maintaining secure systems that extract, transform, store, and process sensitive data.
This subdomain covers the development of secure data pipelines, management of database systems, implementation of structured data models and healthcare standards, and processing methodologies that ensure data is securely handled throughout workflows while maintaining appropriate levels of performance and reliability.

### Data Pipeline Development (`data-pipeline-development`)

Builds and maintains processes that extract, transform, and load data securely between systems.
Involves developing ETL processes, designing secure pipelines for various data types, implementing error handling, monitoring data flows, and optimising performance.
Requires architecting complex systems at enterprise scale and establishing best practices for secure data processing.

**Entry Level:**

- Familiar with data pipeline concepts and components
- Can develop simple ETL processes under supervision
- Understands data transformation and loading techniques

**Mid Level:**

- Designs and implements secure data pipelines for various data types
- Develops error handling and monitoring for data flows
- Optimises pipeline performance and resource usage

**Senior Level:**

- Architects complex data pipeline systems at enterprise scale
- Establishes best practices and patterns for secure data processing
- Leads pipeline modernisation and optimisation initiatives

### Data Storage & Database Management (`data-storage-database-management`)

Designs and maintains secure database systems for storing and retrieving sensitive data.
Involves understanding database types, performing SQL operations, designing secure schemas, implementing access policies, optimising performance, and architecting enterprise storage solutions.
Requires developing governance frameworks and leading database modernisation initiatives.

**Entry Level:**

- Understands various database types (relational, NoSQL, etc.)
- Familiar with basic SQL and database operations
- Can perform database administration tasks under supervision

**Mid Level:**

- Designs database schemas for security and performance
- Implements database security controls and access policies
- Optimises database performance and troubleshoots issues

**Senior Level:**

- Architects enterprise data storage solutions across platforms
- Develops database governance and security frameworks
- Leads database modernisation and migration initiatives

### Data Models & Standardisation (`data-models-standardisation`)

Enables the secure and effective use of standardised data models such as FHIR and OMOP within secure data environments.
Involves understanding platform and integration requirements, assessing platform capabilities, supporting configuration and adaptation for model adoption, and ensuring compliance with relevant standards.
Requires developing approaches to enhance interoperability, security, and governance for standardised data models across platforms.

**Entry Level:**

- Understands the purpose and basic structure of standardised data models (e.g., FHIR, OMOP)
- Aware of the need for platform support to enable use of these models
- Can identify when a platform supports or does not support a given data model

**Mid Level:**

- Assesses platform capabilities for supporting standardised data models
- Identifies integration requirements and dependencies for enabling models like FHIR and OMOP
- Supports configuration or adaptation of platforms to facilitate use of these models

**Senior Level:**

- Develops enterprise data modelling approaches
- Establishes processes for maintaining and evolving data models
- Leads initiatives to harmonise data models across systems

### Event-Driven Data Processing (`event-driven-data-processing`)

Implements systems that process data in real-time based on events and triggers.
Involves understanding event-driven architecture, working with streaming platforms like Kafka, implementing event producers and consumers, designing specialised pipelines, and ensuring data quality.
Requires architecting enterprise-scale, high-throughput, reliable event-driven processing systems.

**Entry Level:**

- Understands event-driven architecture concepts for data processing
- Familiar with event streaming platforms (Kafka, etc.)
- Can implement simple event producers and consumers

**Mid Level:**

- Designs event-driven data pipelines for specific domains
- Implements event schemas and data quality controls
- Develops specialised processing for domains like NLP or analytics

**Senior Level:**

- Architects enterprise event-driven data systems
- Designs high-throughput, reliable event processing systems
- Leads innovation in event-based analytical systems

### Encryption Standards & Implementation (`encryption-standards-implementation`)

Implements cryptographic solutions to protect sensitive data throughout its lifecycle in secure environments.
Involves understanding encryption methods, configuring cryptographic systems, managing encryption keys, and ensuring compliance with security standards.
Requires designing enterprise encryption frameworks, implementing advanced cryptographic techniques, and establishing organisational policies that maintain data confidentiality and integrity.

**Entry Level:**

- Familiar with symmetric and asymmetric encryption methods (AES, RSA, etc.)
- Can follow predefined encryption standards and best practices
- Understands how encryption protects data at rest and in transit

**Mid Level:**

- Configures and deploys encryption technologies in storage and communication systems
- Implements secure key generation, storage, and rotation practices
- Ensures encryption implementations align with regulatory standards (GDPR, HIPAA, FIPS)

**Senior Level:**

- Designs enterprise encryption frameworks and security architectures
- Implements advanced cryptographic techniques (post-quantum cryptography, zero-knowledge proofs, homomorphic encryption)
- Establishes encryption policies and oversees compliance across the organisation

### Data Backups (`data-backups`)

Ensures data availability and recoverability through systematic backup and restoration processes.
Involves understanding backup plans, implementing automated backup systems, managing retention policies, and designing recovery procedures.
Requires architecting resilient backup infrastructures, establishing security protocols, and developing enterprise-wide policies that minimise data loss and downtime while maintaining compliance with regulatory requirements.

**Entry Level:**

- Familiar with different backup types (full, incremental, differential) and their use cases
- Can adhere to predefined backup schedules and retention policies
- Understands how to restore data from backups in case of accidental deletion or corruption

**Mid Level:**

- Configures and optimises backup plans for different environments (on-premises, cloud, hybrid)
- Implements scripts and tools to streamline backup operations and reduce manual intervention
- Ensures backups meet regulatory requirements and conducts regular integrity checks

**Senior Level:**

- Designs scalable, resilient backup architectures for large-scale systems
- Leads the development of recovery plans to minimise downtime and data loss
- Establishes policies for backup security, encryption, and compliance with industry standards

### Data Retention & Disposal (`data-retention-disposal`)

Manages the secure lifecycle of data from creation to disposal, ensuring compliance with regulatory requirements and organisational policies.
Involves understanding storage types and data lifecycles, implementing retention strategies, designing secure disposal processes, and establishing governance frameworks.
Requires developing enterprise-wide policies that balance performance, cost, and compliance while maintaining data accessibility and security throughout the retention period.

**Entry Level:**

- Familiar with different storage types (databases, cloud storage, file systems) and data retention concepts
- Can follow predefined data lifecycle rules and retention guidelines
- Assists in tracking data usage and retention timelines for audit and compliance checks

**Mid Level:**

- Implements data lifecycle approaches that balance retention requirements with storage efficiency
- Applies data access policies, encryption, and secure storage practices to protect retained data from unauthorised access
- Conducts data usage audits and ensures adherence to regulatory standards (GDPR, HIPAA)

**Senior Level:**

- Defines and implements enterprise data retention policies including archival and secure disposal strategies to comply with regulatory requirements
- Architects scalable storage solutions balancing performance, cost, and compliance requirements ensuring long-term data accessibility without unnecessary overhead
- Has deep understanding of legal and regulatory frameworks (such as GDPR, HIPAA, or industry-specific standards) to ensure data retention practices align with security, privacy, and governance requirements.

### Data Migration (`data-migration`)

Ensures the secure, reliable, and efficient transfer of data between systems, storage solutions, or environments.
Involves planning and executing migrations to minimise downtime and data loss, validating data integrity before and after migration, and ensuring compliance with security and regulatory requirements.
Requires implementing automated migration workflows, monitoring migration processes, and remediating issues as they arise.

**Entry Level:**

- Understands the basic concepts and risks associated with data migration
- Can assist with manual data migration tasks under supervision
- Follows established procedures for data validation post-migration

**Mid Level:**

- Plans and executes secure data migrations between systems or environments
- Implements automated migration workflows and tools
- Validates data integrity and completeness before and after migration
- Monitors migration processes and resolves common issues

**Senior Level:**

- Designs enterprise-wide data migration approaches and policies
- Leads complex or large-scale migration projects with minimal downtime
- Ensures compliance with security and regulatory requirements during migration
- Develops and oversees remediation plans for migration failures or data discrepancies
