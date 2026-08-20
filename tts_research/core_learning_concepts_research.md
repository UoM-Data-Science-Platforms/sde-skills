# SDE/TRE Core Concepts & Self-Study Research Matrix

This document maps the conceptual knowledge syllabus across the 6 Competency Framework domains. It is designed to replace traditional "Training Materials" with actionable, vendor-agnostic research topics, core concepts, and targeted search terms that engineers and governance professionals should master on the job.

---

## Domain 1: Safe Access & Identity
*Focus: Authentication, Authorization, IAM, Zero Trust*

### Entry Level
* **Topic:** Foundational Identity & Authentication
  * **Core Concepts:** Authentication vs. Authorization, password hashing, Multi-Factor Authentication (MFA) factors, Principle of Least Privilege (PoLP).
  * **Recommended Search Terms:** *"Difference between authentication and authorization"*, *"How MFA push notifications work"*, *"Principle of least privilege implementation"*.
  * **Why:** Essential theoretical baseline for provisioning user accounts securely.

### Mid Level
* **Topic:** Federated Identity & SSO Protocols
  * **Core Concepts:** SAML 2.0 assertions, OAuth 2.0 grant types, OpenID Connect (OIDC) JWT tokens, Identity Provider (IdP) vs. Service Provider (SP), SCIM provisioning.
  * **Recommended Search Terms:** *"How SAML authentication flow works"*, *"OAuth 2.0 authorization code grant explained"*, *"JWT token structure and validation"*.
  * **Why:** Required for integrating research platforms across different university and NHS organizational boundaries.

### Senior Level
* **Topic:** Zero Trust Architecture & Advanced Authorization
  * **Core Concepts:** Attribute-Based Access Control (ABAC), Policy-as-Code, micro-segmentation, continuous authentication, identity governance.
  * **Recommended Search Terms:** *"Zero Trust network architecture principles"*, *"RBAC vs ABAC policy design"*, *"Implementing Policy as Code with OPA"*.
  * **Why:** Necessary for designing the overarching security posture of an SDE where perimeter defense is no longer sufficient.

---

## Domain 2: Safe Data Management
*Focus: Data Engineering, Data Governance, FAIR Principles, Pipelines*

### Entry Level
* **Topic:** Data Tidying & Relational Fundamentals
  * **Core Concepts:** Tabular data structures, relational database normalization (1NF, 2NF, 3NF), basic SQL querying, data types, checksums/hashing for integrity.
  * **Recommended Search Terms:** *"Database normalization explained"*, *"How to use SHA-256 for file integrity"*, *"Tidy data principles"*.
  * **Why:** The foundational skills required before interacting with massive healthcare datasets.

### Mid Level
* **Topic:** Data Engineering & Pipeline Orchestration
  * **Core Concepts:** Extract, Transform, Load (ETL) vs. ELT, idempotent data pipelines, Directed Acyclic Graphs (DAGs), data warehousing vs. data lakes, schema-on-read.
  * **Recommended Search Terms:** *"Designing idempotent ETL pipelines"*, *"What is a DAG in data orchestration"*, *"Data lake vs Data warehouse architecture"*.
  * **Why:** Crucial for building automated, reliable clinical data flows (like OMOP or FHIR harmonization).

### Senior Level
* **Topic:** FAIR Principles & Metadata Governance
  * **Core Concepts:** Findable, Accessible, Interoperable, and Reusable (FAIR) principles, ontological mapping, active metadata cataloguing, data lineage tracking.
  * **Recommended Search Terms:** *"Implementing FAIR data principles in healthcare"*, *"Data lineage and provenance tracking architectures"*, *"Semantic interoperability using clinical ontologies"*.
  * **Why:** Essential for ensuring national SDE networks can federate and discover datasets consistently.

---

## Domain 3: Safe Governance & Compliance
*Focus: DSPT, ISO 27001, Information Governance, Ethics*

### Entry Level
* **Topic:** Baseline Information Governance & Privacy
  * **Core Concepts:** The Five Safes framework, Personal Identifiable Information (PII) vs. De-identified data, Caldicott Principles, basic data protection laws (UK GDPR).
  * **Recommended Search Terms:** *"Understanding the Five Safes framework"*, *"The Caldicott Principles explained"*, *"UK GDPR key principles for data processing"*.
  * **Why:** Mandatory baseline knowledge for legally and ethically interacting with patient or citizen data.

### Mid Level
* **Topic:** Risk Assessment & Compliance Operations
  * **Core Concepts:** Data Protection Impact Assessments (DPIAs), risk registers, threat modeling, incident severity classification, data sharing agreements (DSAs).
  * **Recommended Search Terms:** *"How to conduct a DPIA"*, *"STRIDE threat modeling methodology"*, *"Drafting a Data Sharing Agreement"*.
  * **Why:** Required to operationalize compliance, ensuring that new SDE features are legally and securely reviewed before deployment.

### Senior Level
* **Topic:** Enterprise Security Frameworks & ISMS
  * **Core Concepts:** Information Security Management System (ISMS) design, ISO/IEC 27001 controls (Annex A), continuous compliance auditing, NHS DSPT overarching strategy.
  * **Recommended Search Terms:** *"How to implement an ISMS"*, *"ISO 27001 Annex A controls overview"*, *"Continuous compliance monitoring architectures"*.
  * **Why:** Required to lead the SDE's security strategy and successfully pass external national audits.

---

## Domain 4: Safe Outputs & Disclosure Control
*Focus: SDC, Airlocks, Accidental Disclosure Handling*

### Entry Level
* **Topic:** Tabular Data Anonymisation
  * **Core Concepts:** Primary vs. secondary suppression, the Rule of 10, dominance metrics, p-percent rule, basic cell rounding.
  * **Recommended Search Terms:** *"Statistical disclosure control primary suppression"*, *"How dominance rules work in microdata"*, *"Applying the rule of 10 in health data"*.
  * **Why:** These are the foundational mathematical rules applied daily when reviewing researcher exports.

### Mid Level
* **Topic:** Microdata Perturbation & Advanced SDC
  * **Core Concepts:** k-anonymity, l-diversity, t-closeness, synthetic data generation, noise addition, secure computation environments.
  * **Recommended Search Terms:** *"k-anonymity vs l-diversity vs t-closeness"*, *"How to evaluate synthetic data utility vs privacy"*, *"Perturbation techniques in microdata"*.
  * **Why:** Necessary for assessing complex, row-level dataset extracts and using automated SDC tools (like sdcMicro or ACRO).

### Senior Level
* **Topic:** Privacy Enhancing Technologies (PETs)
  * **Core Concepts:** Differential Privacy (epsilon, delta budgets), Federated Learning, Homomorphic Encryption, automated airlock governance.
  * **Recommended Search Terms:** *"Understanding differential privacy epsilon budget"*, *"Federated learning architecture in healthcare"*, *"Practical applications of homomorphic encryption"*.
  * **Why:** Positions the SDE leader at the forefront of modern automated, cryptographically secure disclosure control.

---

## Domain 5: Safe Projects & Operations
*Focus: ITSM, Agile, Project Delivery, User Support*

### Entry Level
* **Topic:** IT Service Management Fundamentals
  * **Core Concepts:** Incident vs. Problem vs. Request management, ticketing lifecycles, SLAs, basic Kanban/Scrum ceremonies.
  * **Recommended Search Terms:** *"ITIL incident vs problem management"*, *"Understanding Service Level Agreements (SLAs)"*, *"Kanban board flow efficiency"*.
  * **Why:** Ensures junior engineers understand how to operate within a structured, auditable support desk environment.

### Mid Level
* **Topic:** Agile Delivery & Change Control
  * **Core Concepts:** Change Advisory Boards (CAB), continuous delivery, sprint planning, user story mapping, major incident response.
  * **Recommended Search Terms:** *"How a Change Advisory Board operates"*, *"User story mapping techniques"*, *"Major Incident Management process flow"*.
  * **Why:** Essential for managing safe, auditable updates to the SDE without causing downtime or security breaches.

### Senior Level
* **Topic:** Operational Excellence & Value Streams
  * **Core Concepts:** Lean operations, Value Stream Mapping (VSM), Site Reliability Engineering (SRE) error budgets, cost optimization (FinOps).
  * **Recommended Search Terms:** *"Value Stream Mapping for IT operations"*, *"Site Reliability Engineering error budgets"*, *"Cloud FinOps strategies"*.
  * **Why:** Critical for scaling the SDE sustainably, optimizing cloud costs, and continuously improving researcher onboarding times.

---

## Domain 6: Safe Technology & Engineering
*Focus: DevOps, Infrastructure as Code, HPC, Software Engineering*

### Entry Level
* **Topic:** Source Control & Software Carpentry
  * **Core Concepts:** Distributed version control, branching strategies, commit history, merge conflict resolution, reproducible environments.
  * **Recommended Search Terms:** *"How to resolve git merge conflicts"*, *"Trunk-based development vs GitFlow"*, *"Why reproducible environments matter in research"*.
  * **Why:** Forms the foundation of modern, collaborative Research Software Engineering (RSE).

### Mid Level
* **Topic:** Infrastructure as Code & Containerization
  * **Core Concepts:** Declarative vs. Imperative provisioning, idempotency, state file management, container isolation (namespaces/cgroups), CI/CD pipelines.
  * **Recommended Search Terms:** *"Idempotency in cloud provisioning"*, *"How container namespaces and cgroups work"*, *"Declarative infrastructure principles"*.
  * **Why:** Ensures engineers understand the 'why' behind tools like Terraform and Docker, leading to highly secure and auditable SDE platforms.

### Senior Level
* **Topic:** Distributed Systems & Cloud-Native Architecture
  * **Core Concepts:** Distributed consensus (Raft/Paxos), eventual consistency, microservices boundary definition, service mesh, highly available (HA) cluster design.
  * **Recommended Search Terms:** *"Distributed systems consensus algorithms"*, *"CAP theorem explained"*, *"Service mesh mutual TLS architecture"*.
  * **Why:** Required for Principal Engineers designing national, federated SDE networks that must be resilient, highly scalable, and impeccably secure.
