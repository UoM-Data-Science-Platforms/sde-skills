# Competency Framework Mapping

This document provides a detailed mapping of the SDE Skills Competency Framework to established standards, specifically the [Five Safes](https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/) model and [Standard Architecture for Trusted Research Environments (SATRE)](https://satre-specification.readthedocs.io/) specification.

## SATRE source baseline and mapping status

The requirement inventory is pinned to **SATRE 2.0.1**, released 23 July 2026,
at [source commit 133b4af](https://github.com/sa-tre/satre-specification/blob/133b4af7f3c69586a8fe3da7d5d06685158fe473/docs/source/spec/specification.yaml).
The inventory was checked on 3 November 2026. It includes all 185 requirements
in 35 capabilities across four core pillars and the federation extension.
Official statements, guidance and importance are reproduced from SATRE contributors
under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with the source
snapshot and license in `yaml/satre/`. The SHA-256 is calculated over LF-normalized
UTF-8 source text so that Windows and Linux checkouts agree.

Official statements are separate from editorial summaries. The previous mapping
used editorial groupings with identifiers that do not consistently match SATRE.
Those records are preserved separately, including topic-based migration candidates.
They are **unverified**; source pinning and canonical reference checks do not
establish substantive alignment. Empty mappings are awaiting review, rather than
confirmed gaps. Applicability assessments are pending; original conditional
wording and guidance are retained. Reviewer identity and review date remain unset
until an actual relationship review is performed in work package #118.

Federation is a recent addition to the SATRE standard. We have included a mapping
from the initial version of the SDE RTP framework, but have not added to the
framework in response to the additions to SATRE.

The initial framework is preserved. Newly inventoried capabilities without reviewed
relationships are potential gap observations for review, not reasons to add competencies.
The topic summaries later in this document are editorial context, not official
SATRE capability names or requirement statements. Consult the SATRE mapping page
for the complete official hierarchy and review status.

## Mapping to Five Safes

The Five Safes framework is a set of principles enabling safe research access to sensitive data. Our competency domains are designed to align with and support these principles:

### Safe Data

> *Data is treated to protect any confidentiality concerns.*

**Primary Domain Mapping:**

- Safe Data Management

**Key Competencies:**

- Data classification & sensitivity assessment
- Data lineage & provenance tracking
- De-identification techniques
- Data quality management
- Data storage & database security

### Safe Projects

> *Research projects are approved by data owners for the public good.*

**Primary Domain Mapping:**

- Safe Projects & Operations

**Key Competencies:**

- SDE project planning
- Research project facilitation
- Research ethics compliance
- Service level management
- Researcher training & support

### Safe People

> *Researchers are trained and authorised to use data safely.*

**Primary Domain Mapping:**

- Safe Access & Identity

**Key Competencies:**

- Authentication systems
- User provisioning & lifecycle management
- Role-based access control
- Researcher onboarding
- Training & certification verification

### Safe Settings

> *A SecureLab environment prevents unauthorised use.*

**Primary Domain Mapping:**

- Safe Technology & Engineering

**Key Competencies:**

- Secure environment design
- Network architecture
- Infrastructure & deployment
- Cloud infrastructure management
- System architecture

### Safe Outputs

> *Screened and approved outputs that are non-disclosive.*

**Primary Domain Mapping:**

- Safe Outputs & Disclosure Control

**Key Competencies:**

- Statistical disclosure control techniques
- Disclosure risk assessment
- Output review processes
- Output documentation & justification
- Synthetic data generation

## Mapping to SATRE

The [Standard Architecture for Trusted Research Environments (SATRE)](https://satre-specification.readthedocs.io/) specification _provides a comprehensive high-level architecture for research organisations handling sensitive data safely._ Our framework aligns with these components:

### Authentication & Authorisation

**Primary Domain Mapping:**

- Safe Access & Identity

**Key Competencies:**

- Authentication systems
- Federated identity management
- Role-based access control
- Attribute-based access control
- Least privilege implementation

### Environment Provisioning

**Primary Domain Mapping:**

- Safe Technology & Engineering

**Key Competencies:**

- Secure environment design
- Containerization & orchestration
- Cloud infrastructure management
- Microservices & API design
- Software development lifecycle

### Data Ingestion & Egress

**Primary Domain Mapping:**

- Safe Data Management

**Key Competencies:**

- Data pipeline development
- Data validation
- Data models & standardization
- Data quality management
- Research dataset creation

### Resource Management

**Primary Domain Mapping:**

- Safe Projects & Operations

**Key Competencies:**

- Service level management
- Change & release management
- TRE tools & capabilities
- Monitoring & observability
- Documentation & knowledge management

### Audit & Monitoring

**Primary Domain Mapping:**

- Safe Governance & Compliance

**Key Competencies:**

- Audit trail implementation
- Compliance monitoring & reporting
- Security assessment & testing
- Certification & accreditation
- Incident response management

### Output Checking

**Primary Domain Mapping:**

- Safe Outputs & Disclosure Control

**Key Competencies:**

- Output review processes
- Statistical disclosure control techniques
- Decision support systems
- De-identification techniques
- Synthetic data generation

## Cross-Cutting Competencies

Some competencies span multiple Five Safes principles or SATRE components:

### Governance & Compliance

**Spans across all Five Safes principles and SATRE components**

**Key Competencies:**

- Information governance
- Data protection compliance
- Healthcare standards compliance
- Research ethics compliance
- Security controls implementation

### Collaboration & Communication

**Key to effective implementation of all domains**

**Key Competencies:**

- Documentation & knowledge management
- Researcher training & support
- Continuous improvement
- Research project facilitation
- Technical collaboration
