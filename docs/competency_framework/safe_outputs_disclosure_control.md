# Safe Outputs & Disclosure Control

This domain covers the processes, techniques, and tools used to ensure that research outputs from Secure Data Environments do not inadvertently disclose sensitive information.

## Tools and platforms to support output checking

### Workflow engines
Organizations, standards, and governance may all describe requirements that ensure research outputs are suitable for release from the SDE. The may describe the steps involved in the output checks, the personnel, the qualifications and experience, and the documentation required to ensure data security. Workflow engines are software platforms that can model business processes that encapsulate these requirements, and enforce a consistent procedure that helps to provide confidence that data exports comply with data sharing agreements; governance, regulatory, and legal requirements; and internal policy.

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
    - can advise on implementation of standards and guidelines that might influence project teams disclose review policy

### Data airlocks

Data airlocks provide technical controls that facilitate and force correct procedure for importing and exporting data inputs and outputs from SDEs. The can be used in conjunction with workflow engines to control and audit the process.

=== ":material-battery-10: Entry Level"
    - is familiar with data airlocks
    - is familiar with user roles in data airlocks

=== ":material-battery-50: Mid Level"
    - can write user documentation relating to the operation of data airlocks
    - can provide training to users relating to the operation of data airlocks
    - can troubleshoot common user issues with data airlocks

=== ":material-battery-90: Senior Level"
    - can influence design of data airlocks according to user requirements and changes in standards and governance

## Statistical Disclosure Control

Statistical Disclosure Control employs mathematical and statistical techniques to protect sensitive information in research outputs. This subdomain encompasses assessing disclosure risks through comprehensive evaluation methodologies, applying appropriate control techniques that balance data protection with research utility, and implementing automated systems that enforce consistent application of disclosure controls across varied research outputs while maintaining statistical validity.

### Disclosure Risk Assessment

Implementing tools to facilitate reviewing research outputs for potential privacy violations and re-identification risks. Has an awareness of different types of disclosure risks (identity and attribute), recommending appropriate controls.

=== ":material-battery-10: Entry Level"

    - Understands basic disclosure risk concepts (re-identification risks, data sensitivity levels)
    - Familiar with common types of disclosure risks (identity, attribute)

=== ":material-battery-50: Mid Level"

    - Recommends appropriate controls based on risk assessment

=== ":material-battery-90: Senior Level"

    - Implements advanced risk quantification approaches
    - Leads initiatives to enhance disclosure risk management (e.g., developing training programs, implementing new tools or techniques, anticipate introduction of new regulatory frameworks).


### Automated Disclosure Control

Implements systems that automatically apply disclosure controls to research outputs. Involves  automated tools and solutions for common output types, configuring rules and thresholds, validating effectiveness, architecting enterprise strategies, and developing advanced algorithms to enhance automated disclosure control capabilities.

=== ":material-battery-10: Entry Level"

    - Understands automated SDC tool concepts (e.g., rule-based systems, threshold settings)
    - Familiar with available SDC automation tools

=== ":material-battery-50: Mid Level"

    - Implements automated SDC solutions for common output types
    - Configures SDC rules and thresholds in automation systems
    - Validates accuracy and effectiveness of automated controls (e.g., testing against known risks, benchmarking)

=== ":material-battery-90: Senior Level"

    - Architects enterprise automated SDC strategies
    - Leads initiatives to enhance automated SDC capabilities

## Output Checking

Output Checking provides systematic review and verification of research outputs before they leave secure environments. This subdomain focuses on facilitating structured review processes for different output formats, and developing decision support systems that ensure consistent application of disclosure control rules while maintaining appropriate governance and traceability.

### Output Review Processes

Involves understanding review requirements for different output formats, conducting reviews using established checklists, designing workflows, implementing tracking and governance processes, establishing frameworks and policies, and developing innovative approaches to improve efficiency.

=== ":material-battery-10: Entry Level"

    - Understands output review requirements and processes
    - Familiar with common output formats and their risks
    - Understands 

=== ":material-battery-50: Mid Level"

    - Implements output tracking and audit logs to support governance processes 


### Code Publication & Reusability

Code developed within an SDE is often executed on sensitive data as part of peer-reviewed studies. To support transparency and reproducibility, this code may need to be shared externally. However, code can sometimes contain secrets (such as passwords, API keys, or infrastructure details) or other confidential information that must not be disclosed. Before code leaves the SDE, it should be subjected to thorough checks to ensure that no sensitive or confidential information is present. Code sharing platforms and tools (such as Git) provide industry-standard mechanisms for publishing code and tracking changes to data analysis routines, but secure code review and sanitization processes are essential prior to external release.

=== ":material-battery-10: Entry Level"

    - Familiar with code repositories and sharing platforms (e.g., Git, Github, GitLab)

=== ":material-battery-50: Mid Level"

    - Implements code publication workflows and processes (e.g., code reviews)
    - Can install and configure code repositories with correct access controls for data ingress and egress
    - Can develop automated pipelines that check for known security risk (e.g., using static analysis techniques to check for passwords, ip addresses, or other sensitive infrastructural information)

=== ":material-battery-90: Senior Level"

    - Establishes code publication frameworks and governance
    - Develops best practices for code metadata and documentation
    - Leads initiatives to enhance code sharing while maintaining security  (e.g., creating secure code repositories, developing sharing policies, designing automated pipelines to review eligibility of code for release)).


## Emergency response

The infrastructure team should be prepared for emergency response when a suspected data leak is reported.

=== ":material-battery-10: Entry Level"

    - can work under direction to acquire logs and other facts relating to a potential data breaches

=== ":material-battery-50: Mid Level"

    - can execute emergency response plans and direct colleagues
    - can review and contribute to emergency response policy and procedure
    - can train colleagues to perform emergency response tasks
    - can review and assess logs and other facts relating to data breaches and communicate findings appropriately to diverse audiences

=== ":material-battery-90: Senior Level"

    - can design emergency response plans (in accordance with necessary governance, regulatory, and legal requirements) to  address suspected data breach
    - can liaise across organisational units facts relating to a data breach
    - can design short term mitigations to prevent further disclosure
    - can design long term mitigations against confirmed data leaks