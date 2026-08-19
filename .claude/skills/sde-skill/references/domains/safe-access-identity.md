<!-- AUTO-GENERATED FILE - do not edit by hand.
     Source of truth: yaml/safe_access_identity.yaml
     Regenerate with: python scripts/build_skill_references.py -->


# Domain 1: Safe Access & Identity (`safe-access-identity`)

This domain covers all aspects of user authentication, authorization, and access control within Secure Data Environments, ensuring that only authorised users can access appropriate resources.

## Identity Management (`identity-management`)

Identity Management encompasses the systems and processes that govern user digital identities within secure data environments. This subdomain covers the complete lifecycle of authentication credentials, from verification mechanisms and account provisioning to cross-organisational federation, ensuring that only properly authenticated users can access sensitive research data while maintaining security, operational efficiency, and compliance with organisational policies.

*Example tools/technologies/standards:* Microsoft Entra, Provisioning tools, SSO protocols (SAML

### Authentication Systems (`authentication-systems`)

Implements and maintains secure user verification mechanisms within research environments. Involves designing and configuring authentication protocols, password policies, and MFA solutions while troubleshooting security incidents. Requires the ability to evaluate technologies and architect enterprise-wide authentication strategies aligned with organisational security needs.

**Entry Level:**

- Understands basic authentication concepts and mechanisms (e.g. AD/Entra, kerberos, oauth2/OIDC)
- Familiar with password best practice and multi-factor authentication
- Can configure user accounts in identity systems under supervision
- Can understand existing SDE security Matrix.

**Mid Level:**

- Implements and configure secure authentication systems (e.g SDE security matrix, microsoft entra)
- Implements MFA solutions appropriate to security requirements
- Troubleshoots authentication issues and security incidents
- Can modify existing SDE security matrix

**Senior Level:**

- Consult on enterprise authentication strategies.
- Evaluates and selects authentication technologies aligned with security needs
- Leads identity system transformations and security enhancements
- Lead and provide support for existing Security Matrix.

### User Provisioning & Lifecycle (`user-provisioning-lifecycle`)

Manages the complete lifecycle of user accounts from creation to deactivation within secure environments. Encompasses designing and automating provisioning processes, ensuring compliance with management policies, and establishing governance frameworks that support efficient identity management across the organisation.

**Entry Level:**

- Understands user account lifecycle stages
- Familiar with provisioning and deprovisioning processes
- Can execute account management tasks following established procedures
- Understand existing user provisioning specification.

**Mid Level:**

- Designs and implements user lifecycle management processes
- Develops automation for provisioning and deprovisioning
- Ensures compliance with account management policies
- Can modify/troubleshoot existing user provisioning specification queries

**Senior Level:**

- Can identify and implement appropriate user lifecycle governance frameworks
- Implements advanced identity governance and administration solutions
- Leads identity management modernization initiatives
- Can lead new user provisioning specification implementation and support

### Federated Identity Management (`federated-identity-management`)

Enables secure authentication across organisational boundaries through single sign-on protocols like SAML, OAuth, and OIDC. Involves configuring and managing federation with multiple identity providers, troubleshooting security issues, and developing governance frameworks to enhance secure collaboration between healthcare organisations and research institutions.

**Entry Level:**

- Understands basic concepts of federated identity
- Familiar with SSO protocols (SAML, OAuth, OIDC)
- Can configure simple federated identity integrations

**Mid Level:**

- Implements federated identity solutions across systems
- Configures and manages federation with multiple identity providers
- Troubleshoots federation issues and security concerns

**Senior Level:**

- Architects complex federated identity solutions across organisational boundaries
- Develops federation governance and security frameworks
- Leads initiatives to enhance identity federation capabilities across healthcare organisations and research institutions

## Access Control (`access-control`)

Access Control ensures that only authorised individuals can access specific resources within secure data environments through structured permission systems. This subdomain covers role-based and attribute-based access models as well as least privilege implementation, providing robust security frameworks that enforce authorization policies while balancing operational requirements and minimizing access risks across research environments.

*Example tools/technologies/standards:* RBAC concepts, ABAC concepts, Privilege audit tools

### Role-Based Access Control (`role-based-access-control`)

Implements access permissions based on organizational roles within secure data environments. Involves defining appropriate roles, designing organizational role structures, implementing management processes, and conducting reviews. Requires skills to develop enterprise frameworks and optimise role structures to minimise access risks while meeting business needs.

**Entry Level:**

- Understands RBAC concepts and principles
- Familiar with role definition and assignment processes
- Can implement basic role assignments following established patterns
- Can understand existing Role definitions

**Mid Level:**

- Implements role structures appropriate to organisational needs
- Implements role management and governance processes
- Conducts role reviews and recommends improvements
- Can modify/troubleshoot existing Role definitions queries.

**Senior Level:**

- Develops enterprise RBAC frameworks and strategies
- Implements advanced access governance and role mining
- Leads initiatives to optimise role structures and reduce access risk
- Can lead new Role definitions implementation and support.

### Attribute-Based Access Control (`attribute-based-access-control`)

Implements dynamic, context-aware access control using attributes rather than roles. Requires defining policies based on various attribute types, designing controls for different contexts, evaluating their effectiveness, and developing advanced policy models for complex scenarios. Involves leading initiatives to implement dynamic access management across the organisation.

**Entry Level:**

- Understands ABAC concepts and use cases
- Familiar with policy definition and attribute types
- Can implement simple attribute-based policies

**Mid Level:**

- Designs complex ABAC policies for different contexts
- Implements attribute management and policy enforcement
- Evaluates effectiveness of attribute-based controls

**Senior Level:**

- Architects enterprise ABAC strategies and frameworks
- Develops advanced policy models for complex authorization scenarios
- Leads initiatives to implement dynamic access control

### Least Privilege Implementation (`least-privilege-implementation`)

Ensures users and systems have only the minimum access privileges needed for their functions. Involves identifying excessive permissions, implementing appropriate access models, conducting reviews, and designing attestation processes. Requires developing enterprise-wide strategies and implementing tools to maintain effective privilege governance throughout the organisation.

**Entry Level:**

- Understands the principle of least privilege
- Familiar with privilege management concepts
- Can identify excessive permissions in simple scenarios
- Understand existing role-level security

**Mid Level:**

- Implements least privilege access models across systems
- Conducts privilege reviews and recommends right-sizing
- Designs processes for regular privilege attestation
- Support existing role-level security policy

**Senior Level:**

- Develops enterprise privilege management strategies
- Implements advanced tools for privilege discovery and management
- Leads initiatives to mature privilege governance practices
- Leads audit, implementation involving role-level security.

## Secure User Experience (`secure-user-experience`)

Secure User Experience focuses on designing and maintaining protected research environments that balance robust security measures with usability. This subdomain encompasses researcher onboarding processes, protected workspace implementation, and secure collaboration platforms, enabling efficient work with sensitive healthcare data while ensuring appropriate controls that maintain compliance, data protection, and positive user experiences.

*Example tools/technologies/standards:* azure kevaults

### Researcher Onboarding (`researcher-onboarding`)

Designs and implements secure processes for integrating researchers into data environments. Involves verifying training and certifications, creating efficient workflows, implementing credential verification, and establishing governance frameworks. Requires developing cross-organisational strategies that enhance both security and researcher experience.

**Entry Level:**

- Understands researcher onboarding requirements and processes
- Familiar with training and certification verification
- Can execute onboarding steps following established procedures

**Mid Level:**

- Designs researcher onboarding workflows and documentation
- Implements verification systems for researcher credentials
- optimises onboarding processes for efficiency and security

**Senior Level:**

- Establishes enterprise researcher governance frameworks
- Develops cross-organisational onboarding strategies
- Leads initiatives to enhance researcher experience and security

### Secure Research Workspaces (`secure-research-workspaces`)

Creates and maintains protected environments for researchers working with sensitive data. Involves designing secure environments tailored to research needs, implementing isolation controls, troubleshooting issues, and optimizing user experience. Requires evaluating technologies and leading modernization initiatives to enhance security while supporting research activities.

**Entry Level:**

- Understands secure workspace concepts and components
- Familiar with workspace provisioning processes
- Can configure basic workspace settings following templates
- Understand current Research workspace

**Mid Level:**

- Designs secure workspace environments for different research needs
- Implements workspace isolation and security controls
- Troubleshoots workspace issues and optimises user experience
- Support existing current Research workspace including installing new software and applications, configuring existing applications, online services whitelisting

**Senior Level:**

- leads development of workspace strategies
- Evaluates and selects secure workspace technologies
- Leads workspace modernization and security enhancement initiatives
- Leads and support new/existing Research workspace

### Secure Collaboration Tools (`secure-collaboration-tools`)

Implements platforms enabling researchers to securely share and collaborate on sensitive data. Involves configuring security features, designing controls for data sharing, and evaluating tools for compliance. Requires developing cross-environment strategies, establishing governance frameworks, and enhancing collaborative capabilities while maintaining strong security standards.

**Entry Level:**

- Understands secure collaboration requirements in research environments
- Familiar with collaboration tool security features
- Can configure basic sharing and access controls
- Knowledge of any secret cloud service provider e.g azure kevaults
- Knowledge of simple collaborative platforms

**Mid Level:**

- Implements secure collaboration platforms and integrations
- Designs security controls for data sharing and communication
- Evaluates collaboration tools for security and compliance
- Support/create/maintain secrets using cloud services.

**Senior Level:**

- Develops secure collaboration strategies across research environments
- Implements governance frameworks for secure information sharing
- Leads initiatives to enhance collaboration capabilities while maintaining security
- Leads task/communication management on collaborative platforms.
