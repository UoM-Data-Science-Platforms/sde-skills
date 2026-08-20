# SDE/TRE Training & Qualifications Research Matrix

This document maps industry-recognized training materials, certifications, and academic qualifications to the 6 Competency Framework domains, based on UK SDE requirements (NHS DSPT, SATRE, DARE UK), research computing standards (Carpentries, HPCCF), and live job market analysis.

---

## Domain 1: Safe Access & Identity
*Focus: Authentication, Authorization, IAM, Zero Trust*

### Entry / Junior Level
* **CompTIA Security+**
  * **Issuer:** CompTIA
  * **Format:** Exam-based certification
  * **Why (SDE Context):** Baseline understanding of identity concepts, RBAC, and access control principles.
* **Microsoft Certified: Identity and Access Administrator Associate (SC-300)**
  * **Issuer:** Microsoft
  * **Format:** Online course & Exam
  * **Why (SDE Context):** Essential for junior engineers managing Microsoft Entra ID (fka Azure AD) which is ubiquitous in NHS/University SDEs.

### Mid / Professional Level
* **Certified Identity and Access Manager (CIAM)**
  * **Issuer:** Identity Management Institute (IMI)
  * **Format:** Exam-based certification
  * **Why (SDE Context):** Deep dive into identity federation, SSO (SAML/OIDC), and lifecycle management across institutions.
* **AWS Certified Security - Specialty / Azure Security Engineer (AZ-500)**
  * **Issuer:** AWS / Microsoft
  * **Format:** Advanced Exam
  * **Why (SDE Context):** Practical implementation of IAM policies, Key Vaults, and network boundaries within cloud environments.

### Senior / Lead Level
* **Certified Information Systems Security Professional (CISSP)**
  * **Issuer:** ISC2
  * **Format:** Rigorous Exam (requires 5+ years experience)
  * **Why (SDE Context):** The gold standard for designing enterprise-wide Zero Trust architectures and leading IAM strategy.

---

## Domain 2: Safe Data Management
*Focus: Data Engineering, Data Governance, FAIR Principles, Pipelines*

### Entry / Junior Level
* **Data Carpentry / Software Carpentry**
  * **Issuer:** The Carpentries
  * **Format:** 2-day interactive workshops
  * **Why (SDE Context):** Fundamental training for handling tabular data, introductory SQL, and basic data tidying/provenance.
* **AWS Certified Data Engineer - Associate**
  * **Issuer:** AWS
  * **Format:** Exam-based certification
  * **Why (SDE Context):** Foundational skills for building secure ETL pipelines in cloud environments.

### Mid / Professional Level
* **Certified Data Management Professional (CDMP) - Practitioner**
  * **Issuer:** DAMA International
  * **Format:** Exam
  * **Why (SDE Context):** Strong validation of data governance, metadata cataloguing, and data quality profiling skills.
* **ELIXIR / TeSS FAIR Data Training**
  * **Issuer:** ELIXIR UK
  * **Format:** Online modules / Workshops
  * **Why (SDE Context):** Specialized training on making health and bioinformatics datasets Findable, Accessible, Interoperable, and Reusable.

### Senior / Lead Level
* **MSc / PhD in Health Informatics, Data Science, or Bioinformatics**
  * **Issuer:** Higher Education Institutions
  * **Format:** Degree program
  * **Why (SDE Context):** Required for leading complex omics pipelines, clinical data modeling (e.g. OMOP/FHIR), and overarching data strategy.

---

## Domain 3: Safe Governance & Compliance
*Focus: DSPT, ISO 27001, Information Governance, Ethics*

### Entry / Junior Level
* **ONS Safe Researcher Training (SRT)**
  * **Issuer:** Office for National Statistics (UKSA)
  * **Format:** Online module & Assessment
  * **Why (SDE Context):** Mandatory baseline training for anyone accessing secure data. Covers the Five Safes framework and basic legal obligations.
* **Information Governance (IG) Mandatory Training**
  * **Issuer:** NHS England (e-LfH)
  * **Format:** Annual online module
  * **Why (SDE Context):** Essential NHS compliance training for handling patient data (Caldicott Principles).

### Mid / Professional Level
* **Certified Information Privacy Professional/Europe (CIPP/E)**
  * **Issuer:** IAPP
  * **Format:** Exam
  * **Why (SDE Context):** Highly sought-after certification proving expertise in UK GDPR, DPA 2018, and data sharing agreements.
* **BCS Practitioner Certificate in Information Risk Management**
  * **Issuer:** British Computer Society (BCS)
  * **Format:** Course & Exam
  * **Why (SDE Context):** Practical skills in assessing and treating risks, crucial for completing Data Protection Impact Assessments (DPIAs).

### Senior / Lead Level
* **ISO/IEC 27001 Lead Implementer / Lead Auditor**
  * **Issuer:** BSI / PECB
  * **Format:** 5-day course & Exam
  * **Why (SDE Context):** Necessary for the Information Security Manager responsible for maintaining the SDE's ISMS and passing external audits.
* **Certified Information Security Manager (CISM)**
  * **Issuer:** ISACA
  * **Format:** Exam
  * **Why (SDE Context):** Focuses on security governance, risk management, and compliance leadership.

---

## Domain 4: Safe Outputs & Disclosure Control
*Focus: SDC, Airlocks, Accidental Disclosure Handling*

### Entry / Junior Level
* **Introduction to Statistical Disclosure Control**
  * **Issuer:** ONS / UK Data Service
  * **Format:** Online webinar/course
  * **Why (SDE Context):** Teaches the 'Rule of 10', dominance metrics, and basics of cell suppression for output checkers.

### Mid / Professional Level
* **Advanced SDC and Microdata Anonymisation (e.g., sdcMicro training)**
  * **Issuer:** Various Statistical Agencies / Universities
  * **Format:** Specialized workshops
  * **Why (SDE Context):** Practical application of k-anonymity, l-diversity, and using R/Python packages (ACRO, sdcMicro) for complex output reviewing.

### Senior / Lead Level
* **Differential Privacy & Advanced PETs Training**
  * **Issuer:** Academic courses / specialized cohorts (e.g. OpenDP)
  * **Format:** Advanced academic modules
  * **Why (SDE Context):** Required to design automated airlocks, set epsilon budgets, and implement cutting-edge Privacy Enhancing Technologies.

---

## Domain 5: Safe Projects & Operations
*Focus: ITSM, Agile, Project Delivery, User Support*

### Entry / Junior Level
* **ITIL 4 Foundation**
  * **Issuer:** AXELOS
  * **Format:** Exam
  * **Why (SDE Context):** The bedrock of IT Service Management. Essential for SDE helpdesk, incident management, and basic change control.
* **Certified ScrumMaster (CSM) / Professional Scrum Master (PSM I)**
  * **Issuer:** Scrum Alliance / Scrum.org
  * **Format:** Exam
  * **Why (SDE Context):** Baseline for working in Agile sprints for SDE feature development.

### Mid / Professional Level
* **ITIL 4 Managing Professional (e.g., Create, Deliver and Support)**
  * **Issuer:** AXELOS
  * **Format:** Advanced course & Exam
  * **Why (SDE Context):** For service owners running the SDE as an enterprise service, managing SLAs, and coordinating major incident responses.
* **PRINCE2 Foundation / AgilePM**
  * **Issuer:** AXELOS / APMG
  * **Format:** Exam
  * **Why (SDE Context):** Formal project management for coordinating multi-institution SDE integrations.

### Senior / Lead Level
* **Lean Six Sigma (Green/Black Belt)**
  * **Issuer:** ASQ / IASSC
  * **Format:** Course, Exam, and Project
  * **Why (SDE Context):** Driving operational excellence, reducing user onboarding times, and optimizing workflow efficiencies across the TRE.

---

## Domain 6: Safe Technology & Engineering
*Focus: DevOps, Infrastructure as Code, HPC, Software Engineering*

### Entry / Junior Level
* **AWS Certified Cloud Practitioner / Azure Fundamentals (AZ-900)**
  * **Issuer:** AWS / Microsoft
  * **Format:** Exam
  * **Why (SDE Context):** Baseline cloud literacy for junior engineers.
* **RSE Society Mentorship / Software Carpentry**
  * **Issuer:** Society of Research Software Engineering
  * **Format:** Mentorship program
  * **Why (SDE Context):** Best practices in version control (Git), basic testing, and reproducible environments.

### Mid / Professional Level
* **Certified Kubernetes Administrator (CKA) / Certified Kubernetes Security Specialist (CKS)**
  * **Issuer:** CNCF / Linux Foundation
  * **Format:** Performance-based Exam
  * **Why (SDE Context):** Hardcore verification of ability to deploy, manage, and secure containerized research workloads.
* **AWS Certified Solutions Architect – Associate**
  * **Issuer:** AWS
  * **Format:** Exam
  * **Why (SDE Context):** Standard requirement for designing resilient, secure SDE infrastructures.
* **HashiCorp Certified: Terraform Associate**
  * **Issuer:** HashiCorp
  * **Format:** Exam
  * **Why (SDE Context):** Validates Infrastructure as Code (IaC) skills critical for reproducible, auditable environments.

### Senior / Lead Level
* **AWS Certified Solutions Architect – Professional**
  * **Issuer:** AWS
  * **Format:** Advanced Exam
  * **Why (SDE Context):** Required for Principal Engineers designing multi-account, highly secure, scalable landing zones for national SDE networks.
* **TOGAF (The Open Group Architecture Framework)**
  * **Issuer:** The Open Group
  * **Format:** Exam
  * **Why (SDE Context):** Enterprise architecture certification for leads designing complex systems interoperability (e.g. connecting NHS SDEs).
