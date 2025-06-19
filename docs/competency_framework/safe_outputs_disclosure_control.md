# Safe Outputs & Disclosure Control

This domain covers the processes, techniques, and tools used to ensure that research outputs from Secure Data Environments do not inadvertently disclose sensitive information.

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

### SDC Techniques & Methods

Applies statistical methods to protect confidentiality while preserving data utility. Involves implementing techniques like suppression and rounding, evaluating their effectiveness and impact, designing appropriate strategies for different outputs, developing advanced methodologies for complex scenarios, and establishing frameworks and best practices for the organization.

=== ":material-battery-10: Entry Level"

    - Understands common SDC techniques (suppression, rounding, etc.)
    - Familiar with when to apply different SDC methods (e.g., suppression for small cell sizes)
    - Understands basic SDC techniques and guidelines

=== ":material-battery-50: Mid Level"

    - Evaluates effectiveness and impact of SDC methods
    - Designs SDC strategies appropriate to specific outputs

=== ":material-battery-90: Senior Level"

    - Develops advanced SDC methodologies for complex scenarios (e.g., multi-dimensional datasets, linked data sets)
    - Establishes SDC frameworks and best practices

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

=== ":material-battery-50: Mid Level"

    - Implements output tracking and audit logs to support governance processes 


### Code Publication & Reusability

Makes research code available in a secure, reusable, and transparent manner following FAIR principles. Involves understanding code publication principles, using repositories and sharing platforms, preparing code for publication, implementing workflows, ensuring proper documentation, establishing frameworks and governance, and developing best practices while maintaining security.

=== ":material-battery-10: Entry Level"

    - Understands the principles of open code publication (FAIR principles)
    - Familiar with code repositories and sharing platforms (e.g., Git, Github, GitLab)
    - Can prepare code for publication following established templates

=== ":material-battery-50: Mid Level"

    - Implements code publication workflows and processes (e.g., code reviews)
    - Ensures code is well-documented and follows best practices
    - Addresses security concerns specific to SDEs when publishing code (e.g., ensuring secrets such as passwords, api keys, ip addresses are removed. Ensuring the code doesn't contain PID such as filtering on hospital ID numbers)

=== ":material-battery-90: Senior Level"

    - Establishes code publication frameworks and governance
    - Develops best practices for code metadata and documentation
    - Leads initiatives to enhance code sharing while maintaining security  (e.g., creating secure code repositories, developing sharing policies).
