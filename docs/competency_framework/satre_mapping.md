# SATRE Mapping to SDE Skills Competency Framework

This document maps the [Standard Architecture for Trusted Research Environments (SATRE)](https://satre-specification.readthedocs.io/) specification to the SDE Skills Competency Framework. An **X** indicates that the competencies within that subdomain substantively contribute to a TRE's ability to address that SATRE component's requirements.

Each X reflects a considered judgement across all individual competencies within the subdomain — the question asked is: *do the skills in this subdomain meaningfully enable a TRE team to deliver this SATRE capability?*

---

## Column Key

| Abbreviation | Domain | Subdomain |
|---|---|---|
| **STE-SE** | Safe Technology & Engineering | Software Engineering |
| **STE-SA** | Safe Technology & Engineering | System Architecture |
| **STE-ID** | Safe Technology & Engineering | Infrastructure & Deployment |
| **STE-TQ** | Safe Technology & Engineering | Testing & Quality Assurance |
| **SDM-DE** | Safe Data Management | Data Engineering & Processing |
| **SDM-DQ** | Safe Data Management | Data Quality Management |
| **SDM-DG** | Safe Data Management | Data Governance |
| **SDM-RD** | Safe Data Management | Research Data Preparation |
| **SAI-AU** | Safe Access & Identity | Authentication & Authorisation |
| **SAI-IM** | Safe Access & Identity | Identity Management |
| **SAI-UP** | Safe Access & Identity | User Provisioning & Lifecycle |
| **SOD-DC** | Safe Outputs & Disclosure Control | Statistical Disclosure Control |
| **SOD-OR** | Safe Outputs & Disclosure Control | Output Review & Management |
| **SOD-DP** | Safe Outputs & Disclosure Control | Safe Data Publication |
| **SPO-PM** | Safe Projects & Operations | Project Management |
| **SPO-OE** | Safe Projects & Operations | Operational Excellence |
| **SPO-RS** | Safe Projects & Operations | Research Support & Innovation |
| **SGC-IG** | Safe Governance & Compliance | Information Governance |
| **SGC-RC** | Safe Governance & Compliance | Regulatory Compliance |
| **SGC-SM** | Safe Governance & Compliance | Security Management |
| **SGC-RM** | Safe Governance & Compliance | Risk Management |

---

## Mapping Table

| SATRE Pillar | SATRE Component | STE-SE | STE-SA | STE-ID | STE-TQ | SDM-DE | SDM-DQ | SDM-DG | SDM-RD | SAI-AU | SAI-IM | SAI-UP | SOD-DC | SOD-OR | SOD-DP | SPO-PM | SPO-OE | SPO-RS | SGC-IG | SGC-RC | SGC-SM | SGC-RM |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Information Governance** | 1.1 Compliance, accreditation & certification management | | X | X | X | | | X | | X | X | X | | | | | X | | X | X | X | X |
| **1. Information Governance** | 1.2 Policy management | | X | | | | | X | | X | X | X | | X | | X | X | | X | X | X | X |
| **1. Information Governance** | 1.3 Risk management | | X | X | X | | X | X | | X | X | X | X | X | | X | X | | X | X | X | X |
| **1. Information Governance** | 1.4 Study management | | | | | | X | X | X | X | X | X | X | X | X | X | | X | X | X | | X |
| **1. Information Governance** | 1.5 Training delivery & management | | | | | | | | | | | X | X | | | | X | X | X | X | | |
| **1. Information Governance** | 1.6 Member accreditation | | | | | | | | | X | X | X | | | | | X | X | X | X | X | |
| **2. Computing Technology** | 2.1 End user computing | X | X | X | X | | | | | X | X | X | | | | | X | X | | | X | |
| **2. Computing Technology** | 2.2 Software tools & applications | X | X | X | X | X | | | | | | | X | X | | | | X | | | X | |
| **2. Computing Technology** | 2.3 Infrastructure management | | X | X | X | | | | | X | X | | | | | | X | X | | X | X | X |
| **2. Computing Technology** | 2.4 Data ingestion & egress | | X | X | X | X | X | X | X | X | X | X | X | X | | | X | | X | X | X | X |
| **2. Computing Technology** | 2.5 Identity & access management | | X | X | X | | | X | | X | X | X | | | | | X | | X | X | X | X |
| **2. Computing Technology** | 2.6 Output management | | | | X | | X | X | X | X | X | X | X | X | X | X | X | X | X | X | | X |
| **3. Data Management** | 3.1 Data security levels & tiering | | X | X | | X | X | X | X | X | X | X | X | X | | | | | X | X | X | X |
| **3. Data Management** | 3.2 Data lifecycle management | | X | X | | X | X | X | X | X | X | X | X | X | | | X | X | X | X | X | X |
| **3. Data Management** | 3.3 Metadata management | | X | | | X | X | X | X | | | | | X | X | | X | X | X | X | | |
| **4. Supporting Capabilities** | 4.1 Community engagement | X | | | | | | | | | | | | | X | | X | X | | | | |
| **4. Supporting Capabilities** | 4.2 Business continuity | X | X | X | X | | X | X | | | | | | | | X | X | X | X | X | | X |

---

## Coverage Summary

The table below shows how many of the 17 SATRE components each subdomain contributes to.

| Subdomain | SATRE components addressed | Coverage |
|---|:---:|---|
| STE-SE — Software Engineering | 6 | End user computing, software tools, data ingestion (code), community engagement, business continuity |
| STE-SA — System Architecture | 12 | Broad coverage; weakest on training, member accreditation, output management |
| STE-ID — Infrastructure & Deployment | 10 | Strong on computing technology and data management pillars |
| STE-TQ — Testing & Quality Assurance | 8 | Risk, computing technology, output management, business continuity |
| SDM-DE — Data Engineering & Processing | 7 | Computing technology and data management pillars |
| SDM-DQ — Data Quality Management | 9 | Risk, data ingestion, output management, data management pillar |
| SDM-DG — Data Governance | 14 | Very broad; weakest on training and supporting capabilities |
| SDM-RD — Research Data Preparation | 9 | Study management, data ingestion, output management, data lifecycle |
| SAI-AU — Authentication & Authorisation | 12 | Broad coverage across all pillars except training delivery |
| SAI-IM — Identity Management | 12 | Near-identical coverage to SAI-AU |
| SAI-UP — User Provisioning & Lifecycle | 12 | Particularly strong on information governance and computing technology |
| SOD-DC — Statistical Disclosure Control | 8 | Risk, training, study management, data ingestion, output, data tiers, lifecycle |
| SOD-OR — Output Review & Management | 9 | Risk, study management, data ingestion, output, data tiers, lifecycle |
| SOD-DP — Safe Data Publication | 5 | Study management, output management, metadata, community engagement |
| SPO-PM — Project Management | 7 | Risk, study management, output management, business continuity |
| SPO-OE — Operational Excellence | 13 | Very broad; only misses member accreditation and data security tiers |
| SPO-RS — Research Support & Innovation | 12 | Strong across all pillars; weakest on security-focused components |
| SGC-IG — Information Governance | 13 | Very broad; only misses end user computing and software tools |
| SGC-RC — Regulatory Compliance | 14 | Broadest coverage of all subdomains |
| SGC-SM — Security Management | 9 | Computing technology and compliance pillars; less relevant to data management pillar |
| SGC-RM — Risk Management | 12 | Broad coverage; weakest on training, member accreditation, software tools |

---

## Observations

**Broadest subdomains** — SGC-RC (Regulatory Compliance), SDM-DG (Data Governance), and SPO-OE (Operational Excellence) each contribute to 13–14 SATRE components, confirming their cross-cutting nature.

**Most SATRE-focused subdomains** — SAI-AU, SAI-IM, and SAI-UP together address SATRE's identity and access management component comprehensively, and each contributes to ~12 components overall, reflecting how central identity is to TRE architecture.

**Gaps worth noting:**

- **1.5 Training delivery & management** is addressed by relatively few subdomains (4). The framework covers training implicitly through SPO-RS and SGC-RC but does not have a dedicated training design or learning technology subdomain.
- **4.1 Community engagement** is a thin column — only 4 subdomains contribute. This reflects that community engagement is an emerging area and not yet deeply embedded across the framework.
- **SOD-DP (Safe Data Publication)** addresses only 5 SATRE components, consistent with it being a specialist output-focused subdomain rather than a foundational TRE capability.
- **STE-SE (Software Engineering)** contributes to fewer SATRE components than might be expected. This is because many software engineering competencies are prerequisites that underpin other subdomains (infrastructure, system architecture, testing) rather than directly addressing SATRE capabilities themselves.
