# 2025/2026 Industry Technology Radars & Surveys: TTS Sourcing Matrix

> [!IMPORTANT]
> **Purpose**: This matrix documents the prevailing industry consensus, adoption rings (*Adopt*, *Trial*, *Assess*), and developer benchmark statistics across major independent technology radars:
> 1. **[CNCF (Cloud Native Computing Foundation) Landscape](https://landscape.cncf.io/)** — Graduated & Incubating projects
> 2. **[ThoughtWorks Technology Radar (Vols 31–33 / 2025–2026)](https://www.thoughtworks.com/radar)** — Enterprise technology lifecycle recommendations
> 3. **[Stack Overflow Developer Survey (2025/2026)](https://survey.stackoverflow.co/)** — Industry developer adoption metrics
> 4. **[Privacy-Enhancing Technologies (PETs) Adoption Radar](https://csrc.nist.gov/pubs/sp/800/226/final)** — Emerging differential privacy and secure enclave tools

---

## 1. Cloud Native Infrastructure, Containers & IaC

| Item | Type | Radar / Survey Authority & Ring | Direct URL | Radar Analysis & SDE Rationale | Primary Subdomain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenTofu** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` / `Trial` | [ThoughtWorks Radar: OpenTofu](https://www.thoughtworks.com/radar/tools/opentofu) | Community-driven, truly open-source (MPL 2.0) fork of Terraform under the Linux Foundation, avoiding BSL licensing risks in public sector research clouds. | `infrastructure-and-deployment` |
| **Terraform** | Tool | **Stack Overflow Survey**<br>Ranking: #1 IaC Tool (35%+ adoption) | [Stack Overflow IaC Trends](https://survey.stackoverflow.co/) | Established industry standard for declarative infrastructure definitions across multi-cloud TRE deployments (Azure TRE / AWS). | `infrastructure-and-deployment` |
| **Kubernetes** | Technology | **CNCF Landscape**<br>Status: `Graduated` | [CNCF Kubernetes Project](https://landscape.cncf.io/?item=orchestration-management--scheduling-orchestration--kubernetes) | Ubiquitous container orchestration standard powering scalable research compute workspaces and multi-tenant isolation. | `infrastructure-and-deployment` |
| **Helm** | Tool | **CNCF Landscape**<br>Status: `Graduated` | [CNCF Helm Project](https://landscape.cncf.io/?item=app-definition-and-development--application-definition-image-build--helm) | Standard Kubernetes package manager used for deploying standardized researcher workspace charts (JupyterHub, RStudio Server). | `infrastructure-and-deployment` |
| **Harbor** | Tool | **CNCF Landscape**<br>Status: `Graduated` | [CNCF Harbor Project](https://landscape.cncf.io/?item=provisioning--container-registry--harbor) | Enterprise-grade, compliance-ready container registry offering automated vulnerability scanning, role-based access, and image signing. | `infrastructure-and-deployment` |
| **Cosign / Sigstore** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: Sigstore](https://www.thoughtworks.com/radar/tools/sigstore) | Standard for signing and verifying container images before entering air-gapped secure computing perimeters. | `infrastructure-and-deployment` |
| **Podman** | Tool | **ThoughtWorks Radar**<br>Ring: `Trial` | [ThoughtWorks Radar: Podman](https://www.thoughtworks.com/radar/tools/podman) | Rootless, daemonless OCI container engine preferred in locked-down HPC and multi-user research enclaves without elevated privileges. | `infrastructure-and-deployment` |

---

## 2. Modern Data Stack & Analytical Engineering

| Item | Type | Radar / Survey Authority & Ring | Direct URL | Radar Analysis & SDE Rationale | Primary Subdomain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **dbt (data build tool)** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: dbt](https://www.thoughtworks.com/radar/tools/dbt) | The recognized standard for transformation modeling in data warehouses, bringing CI/CD version control and automated testing to SQL pipelines. | `data-engineering-and-processing` |
| **Apache Iceberg** | Technology | **ThoughtWorks Radar**<br>Ring: `Adopt` / `Trial` | [ThoughtWorks Radar: Apache Iceberg](https://www.thoughtworks.com/radar/platforms/apache-iceberg) | High-performance open table format for massive analytic datasets, providing ACID transactions, time-travel queries, and schema evolution. | `data-engineering-and-processing` |
| **Delta Lake** | Technology | **Linux Foundation Data**<br>Status: `Active LF Standard` | [Delta Lake Project](https://delta.io/) | Open-source storage layer enabling reliability and ACID guarantees over object storage in health data lakehouses. | `data-engineering-and-processing` |
| **DuckDB** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: DuckDB](https://www.thoughtworks.com/radar/platforms/duckdb) | Embeddable analytical SQL database engine optimized for fast local exploratory queries and single-node data transformations inside secure workspaces. | `data-engineering-and-processing` |
| **Trino** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: Trino](https://www.thoughtworks.com/radar/platforms/trino) | Fast distributed SQL query engine designed for interactive federated queries across disparate clinical data stores without moving raw data. | `data-engineering-and-processing` |
| **Great Expectations** | Tool | **ThoughtWorks Radar**<br>Ring: `Trial` | [ThoughtWorks Radar: Great Expectations](https://www.thoughtworks.com/radar/tools/great-expectations) | Leading data quality assertion and profiling library validating that incoming health feeds meet strict schema constraints before ingestion. | `data-governance` |
| **Apache Airflow** | Tool | **Stack Overflow Survey**<br>Ranking: #1 Data Orchestration Tool | [Stack Overflow Orchestration](https://survey.stackoverflow.co/) | Industry standard workflow orchestrator scheduling complex DAGs for health data ingestion, transformation, and airlock release. | `data-engineering-and-processing` |

---

## 3. Observability, Monitoring & Operations

| Item | Type | Radar / Survey Authority & Ring | Direct URL | Radar Analysis & SDE Rationale | Primary Subdomain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenTelemetry (OTel)** | Standard | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: OpenTelemetry](https://www.thoughtworks.com/radar/techniques/opentelemetry) | The universal standard for distributed tracing, metrics, and logs, eliminating proprietary vendor lock-in across SDE services. | `operational-excellence` |
| **Prometheus** | Tool | **CNCF Landscape**<br>Status: `Graduated` | [CNCF Prometheus Project](https://landscape.cncf.io/?item=observability-and-analysis--monitoring--prometheus) | Cloud-native metric monitoring and alerting engine tracking CPU/memory quotas, network throughput, and workspace availability. | `operational-excellence` |
| **Grafana** | Tool | **Stack Overflow Survey**<br>Ranking: Most Popular Visualization | [Stack Overflow Visualization](https://survey.stackoverflow.co/) | Industry standard observability dashboard for real-time visualization of infrastructure health and audit metric streams. | `operational-excellence` |
| **PagerDuty** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: PagerDuty](https://www.thoughtworks.com/radar/tools/pagerduty) | Incident response and on-call escalation platform ensuring high-availability SLAs for clinical and research platform services. | `service-management` |

---

## 4. Security, Secrets Management & Policy Automation

| Item | Type | Radar / Survey Authority & Ring | Direct URL | Radar Analysis & SDE Rationale | Primary Subdomain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HashiCorp Vault** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: Vault](https://www.thoughtworks.com/radar/tools/vault) | Leading secrets engine managing dynamic encryption keys, database credentials, and token leasing for zero-trust environments. | `secure-user-experience` |
| **Trivy** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: Trivy](https://www.thoughtworks.com/radar/tools/trivy) | Fast, comprehensive security scanner detecting vulnerabilities, misconfigurations, and license issues in container images and SBOMs. | `security-management` |
| **Falco** | Tool | **CNCF Landscape**<br>Status: `Graduated` | [CNCF Falco Project](https://landscape.cncf.io/?item=provisioning--security-compliance--falco) | De facto Kubernetes runtime security engine using eBPF to detect unauthorized file writes, network egress, and privilege escalation in real time. | `security-management` |
| **Open Policy Agent (OPA)** | Tool | **CNCF Landscape**<br>Status: `Graduated` | [CNCF OPA Project](https://landscape.cncf.io/?item=provisioning--security-compliance--open-policy-agent-opa) | General-purpose policy engine enforcing fine-grained, context-aware authorization rules (ABAC) and Kubernetes admission control. | `access-control` |
| **Gitleaks** | Tool | **ThoughtWorks Radar**<br>Ring: `Adopt` | [ThoughtWorks Radar: Gitleaks](https://www.thoughtworks.com/radar/tools/gitleaks) | Fast, regex-based secret scanner executed in CI/CD airlock pipelines to ensure no API tokens or passwords leave the research environment. | `tools-and-platforms-to-support-output-checking` |

---

## 5. Privacy-Enhancing Technologies (PETs) & Anonymisation

| Item | Type | Radar / Survey Authority & Ring | Direct URL | Radar Analysis & SDE Rationale | Primary Subdomain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenDP** | Tool | **NIST PETs Adoption Radar**<br>Status: `Recommended Open Source` | [OpenDP Harvard Project](https://opendp.org/) | Rigorously vetted differential privacy library providing formal mathematical privacy guarantees for aggregate query outputs. | `statistical-disclosure-control` |
| **Diffprivlib (IBM)** | Tool | **Linux Foundation AI & Data**<br>Status: `Active Open Source` | [IBM Diffprivlib](https://github.com/IBM/differential-privacy-library) | Python library for privacy-preserving machine learning and data analytics trained with differential privacy bounds. | `statistical-disclosure-control` |
| **ARX Data Anonymizer** | Tool | **European Health Data Radar**<br>Status: `Benchmark Tool` | [ARX Anonymizer](https://arx.deidentifier.org/) | Comprehensive tabular data anonymization software supporting $k$-anonymity, $\ell$-diversity, and $t$-closeness with risk analysis. | `statistical-disclosure-control` |
| **sdcMicro** | Tool | **CRAN / UNECE SDC Guidelines**<br>Status: `National Statistics Standard` | [sdcMicro Package](https://cran.r-project.org/package=sdcMicro) | Core package used by National Statistical Institutes for microdata disclosure risk assessment and perturbation. | `statistical-disclosure-control` |

---

## 6. Software Engineering, Testing & APIs

| Item | Type | Radar / Survey Authority & Ring | Direct URL | Radar Analysis & SDE Rationale | Primary Subdomain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FastAPI** | Technology | **Stack Overflow Survey**<br>Ranking: #1 Most Loved Python Web Framework | [Stack Overflow Web Frameworks](https://survey.stackoverflow.co/) | High-performance modern Python web framework featuring automatic OpenAPI documentation and strict Pydantic data validation. | `software-engineering` |
| **PyTest** | Tool | **Stack Overflow Survey**<br>Ranking: Industry Standard Test Framework | [Stack Overflow Python Testing](https://survey.stackoverflow.co/) | Essential unit, integration, and contract testing framework required across Research Software Engineering (RSE). | `software-engineering` |
| **OpenAPI / Swagger (OAS 3.1)** | Standard | **Linux Foundation / OpenAPI**<br>Status: `Global Industry Standard` | [OpenAPI Specification](https://www.openapis.org/) | Machine-readable API schema standard for defining data contracts and interoperable microservices across federated SDEs. | `software-engineering` |
| **GitHub Actions / GitLab CI** | Tool | **Stack Overflow Survey**<br>Ranking: Top CI/CD Platforms (60%+ combined) | [Stack Overflow CI/CD Trends](https://survey.stackoverflow.co/) | Automated build, lint, test, and container packaging pipelines essential for reproducible scientific software workflows. | `software-engineering` |
