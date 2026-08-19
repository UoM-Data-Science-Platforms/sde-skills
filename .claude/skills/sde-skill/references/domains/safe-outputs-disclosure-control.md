<!-- AUTO-GENERATED FILE - do not edit by hand.
     Source of truth: yaml/safe_outputs_disclosure_control.yaml
     Regenerate with: python scripts/build_skill_references.py -->


# Domain 4: Safe Outputs & Disclosure Control (`safe-outputs-disclosure-control`)

This domain covers the technical controls that help to protect projects from accidental or intentional disclosure, as well as providing tooling to support disclosure review operations of project teams to ensure that research outputs from Secure Data Environments do not inadvertently disclose sensitive information.

## Output Checking (`output-checking`)

This subdomain focuses on providing output checkers with tools that facilitate structured review processes for different output formats, and developing decision support systems that ensure consistent application of disclosure control rules while maintaining appropriate governance and traceability.

*Example tools/technologies/standards:* CSV

### Output Review Processes (`output-review-processes`)

Involves understanding review requirements for different output formats, designing workflows, implementing tracking and governance processes.

**Entry Level:**

- Understands output review requirements and processes
- Familiar with common output formats and their risks

**Mid Level:**

- Implements output tracking and audit logs to support governance processes

## Tools and platforms to support output checking (`tools-and-platforms-to-support-output-checking`)

### Workflow engines
Deploy and administer workflow engines to help ensure consistency, reliability, and traceability of output checking processes. Create individual workflow that meet governance and legal requirements for project teams.

=== ":material-battery-10: Entry Level"

    - is aware of workflow engines and the functionality they provide
    - is aware of actors and stages in the disclosure review process
    - can administer workflow engines to make changes to existing disclosure review workflows

=== ":material-battery-50: Mid Level"

    - can assess suitability of workflow engines for achieving desired functionality
    - can work with project stakeholder to design workflows that address local policy and governance/regulatory stipulations
    - can administer workflow engines to implement disclosure review workflows
    - can develop and maintain workflow templates so maximize reuse across similar governance constraints

=== ":material-battery-90: Senior Level"

    - Leads the technology strategy for business process management

*Example tools/technologies/standards:* Camunda, Data airlocks, GitHub, Git

### Workflow engines (`workflow-engines`)

Deploy and administer workflow engines to help ensure consistency, reliability, and traceability of output checking processes. Create individual workflow that meet governance and legal requirements for project teams.

**Entry Level:**

- is aware of workflow engines and the functionality they provide
- is aware of actors and stages in the disclosure review process
- can administer workflow engines to make changes to existing disclosure review workflows

**Mid Level:**

- can assess suitability of workflow engines for achieving desired functionality
- can work with project stakeholder to design workflows that address local policy and governance/regulatory stipulations
- can administer workflow engines to implement disclosure review workflows
- can develop and maintain workflow templates so maximize reuse across similar governance constraints

**Senior Level:**

- Leads the technology strategy for business process management

### Data airlocks (`data-airlocks`)

Install and administer data airlock applications, understand the roles and what level of access is required to achieve given tasks (e.g., approvals, requests, triage, audit, review etc.) within the airlock application, create user documentation and training materials, contribute to on-going improvements to data airlocks to ensure they meet user needs as well as comply with standards and regulations.

**Entry Level:**

- is familiar with data airlocks
- is familiar with user roles in data airlocks

**Mid Level:**

- can write user documentation relating to the operation of data airlocks
- can provide training to users relating to the operation of data airlocks
- can troubleshoot common user issues with data airlocks

**Senior Level:**

- can influence design of data airlocks according to user requirements and changes in standards and governance

### Code repositories (`code-repositories`)

Install and configure code repository systems (e.g., Git) that allow source code to be imported and exported from SDEs in industry standard ways. Develop automated checks that can perform static analysis to ensure source code doesn't contain passwords, API keys, or other infrastructural secrets. Develop workflows for disclosure checking to ensure the source code does not contain any restricted data. Use advanced techniques to perform automated code reviews to assess further requirement for manual inspection.

**Entry Level:**

- Familiar with code repositories and sharing platforms (e.g., Git, Github, GitLab)

**Mid Level:**

- Implements code publication workflows and processes (e.g., code reviews)
- Can install and configure code repositories with correct access controls for data ingress and egress
- Can develop automated pipelines that check for known security risk (e.g., using static analysis techniques to check for passwords, ip addresses, or other sensitive infrastructural information)

**Senior Level:**

- Establishes code publication frameworks and governance
- Leads initiatives to enhance code sharing while maintaining security  (e.g., creating secure code repositories, developing sharing policies, designing automated pipelines to review eligibility of code for release).

## Statistical Disclosure Control (`statistical-disclosure-control`)

Implementing automated systems that enforce consistent application of disclosure controls across varied research outputs while maintaining statistical validity.

*Example tools/technologies/standards:* Risk classification templates

### Disclosure Risk Assessment (`disclosure-risk-assessment`)

Implementing tools to facilitate reviewing research outputs for potential privacy violations and re-identification risks. Has an awareness of different types of disclosure risks (identity and attribute), recommending appropriate controls.

**Entry Level:**

- Understands basic disclosure risk concepts (re-identification risks, data sensitivity levels)
- Familiar with common types of disclosure risks (identity, attribute)

**Mid Level:**

- Recommends appropriate controls based on risk assessment

**Senior Level:**

- Leads initiatives to enhance disclosure risk management (e.g., implementing new tools or techniques, anticipate introduction of new regulatory frameworks).

### Automated Disclosure Control (`automated-disclosure-control`)

Implements systems that automatically apply disclosure controls to research outputs. Involves automated tools and solutions for common output types, configuring rules and thresholds, validating effectiveness, architecting enterprise strategies, and developing advanced algorithms to enhance automated disclosure control capabilities.

**Entry Level:**

- Understands automated SDC tool concepts (e.g., rule-based systems, threshold settings)
- Familiar with available SDC automation tools

**Mid Level:**

- Implements automated SDC solutions for common output types
- Configures SDC rules and thresholds in automation systems
- Validates accuracy and effectiveness of automated controls (e.g., testing against known risks, benchmarking)

**Senior Level:**

- Leads initiatives to enhance automated SDC capabilities

## Accidental disclosure (`accidental-disclosure`)



*No competencies defined yet for this subdomain — use the description above qualitatively.*

## Emergency response (`emergency-response`)

The infrastructure team should be prepared for emergency response when a suspected data leak is reported.

=== ":material-battery-10: Entry Level"

    - can work under direction to acquire logs and other facts relating to a potential data breaches

=== ":material-battery-50: Mid Level"

    - can review and assess logs and other facts relating to data breaches and communicate findings appropriately to diverse audiences

=== ":material-battery-90: Senior Level"

    - can represent the infrastructure team when designing emergency response plans (in accordance with necessary governance, regulatory, and legal requirements) to  address suspected data breach
    - can liaise across organisational units facts relating to a data breach
    - can design short term mitigations to prevent further disclosure
    - can design long term mitigations against confirmed data leaks

*No competencies defined yet for this subdomain — use the description above qualitatively.*
