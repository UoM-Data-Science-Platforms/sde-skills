---
name: sde-skill
description: >-
  Interact with the SDE Skills Competency Framework for research technical
  professionals working with Secure Data Environments (SDEs) and Trusted
  Research Environments (TREs). Use this whenever a user uploads or mentions a
  CV or résumé to assess against the framework, shares a job description (JD)
  to check alignment or wants help drafting one, asks about skills gaps,
  career development, training needs, hiring, or team capability for SDE/TRE
  roles (e.g. data wranglers, research software engineers, output checkers,
  information governance staff, TRE operators/managers), or asks any question
  about the framework's domains, subdomains, competencies, levels, or its
  mapping to Five Safes or SATRE — even if they don't name the framework
  explicitly.
---

# SDE Skills Competency Framework

This skill lets you act as a knowledgeable guide to the **SDE Skills
Competency Framework** — a competency framework for research technical
professionals (RTPs) who build and operate Secure Data Environments (SDEs),
also known as Trusted Research Environments (TREs). It supports two audiences:

- **Professionals**: assess a CV against the framework, find gaps, plan
  career development and training.
- **Employers**: check a job description against the framework, draft
  role profiles, assess team capability and training needs.

## Framework structure

The framework is organised as **6 domains → 21 subdomains → 74
competencies**, and every competency defines skill statements at three
levels: **entry**, **mid**, and **senior**. The six domains echo the
[Five Safes](https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/)
model, with a sixth cross-cutting governance domain:

| # | Domain (id) | Covers |
|---|---|---|
| 1 | Safe Access & Identity (`safe-access-identity`) | Authentication, authorisation, access control, secure UX |
| 2 | Safe Data Management (`safe-data-management`) | Data governance, engineering, processing, quality, de-identification |
| 3 | Safe Governance & Compliance (`safe-governance-compliance`) | Information governance, security controls, audit, incident response |
| 4 | Safe Outputs & Disclosure Control (`safe-outputs-disclosure-control`) | Statistical disclosure control, output checking, synthetic data |
| 5 | Safe Projects & Operations (`safe-projects-operations`) | Project facilitation, service management, researcher support, training |
| 6 | Safe Technology & Engineering (`safe-technology-engineering`) | Infrastructure, cloud, software engineering, architecture |

## References — load them progressively

The full framework is large, so don't load everything up front:

1. **Always start with `references/framework_index.md`** — a compact,
   auto-generated map of every domain, subdomain, and competency with
   one-line descriptions. This is usually enough to triage which domains
   matter for the task and to answer broad "what's in the framework"
   questions.
2. **Load only the relevant domain YAML files** from `references/yaml/`
   (e.g. `safe_data_management.yaml`) when you need the full competency
   descriptions and the entry/mid/senior skill statements. Load a domain
   file when you're actually assessing someone or something against its
   competencies — the index alone is too thin for grading levels.
3. Each domain also has a `*_tools-tech-standards.yaml` companion listing
   **example** tools, technologies, and standards per subdomain. These are
   illustrative, community-contributed examples — treat experience with an
   equivalent tool (e.g. GitLab CI instead of a listed CI tool) as fully
   satisfying the same competency signal.
4. **`references/framework_mapping.md`** maps the domains to the Five
   Safes principles and the SATRE specification components. Load it when
   the user asks about Five Safes, SATRE, or how the framework relates to
   established standards.

Note: the files under `references/yaml/` and `framework_mapping.md` are
symlinks into the repository's `yaml/` and `docs/` folders — the single
source of truth. `framework_index.md` is generated; regenerate it with
`python scripts/build_skill_references.py` after YAML changes.

### Reading the domain YAML

Each domain file has this shape:

```yaml
domain:
  id: safe-data-management        # kebab-case ids at every level
  name: Safe Data Management
  description: ...
  subdomains:
    <subdomain-id>:
      name: ...
      description: ...
      competencies:
        <competency-id>:
          name: ...
          description: ...       # multi-sentence prose
          levels:
            entry: {name: Entry Level, skills: [...]}   # skill statements
            mid:   {name: Mid Level, skills: [...]}
            senior: {name: Senior Level, skills: [...]}
```

Interpret levels as **cumulative**: someone operating at senior level in a
competency is assumed to also cover the entry and mid statements. Entry ≈
works with supervision / foundational understanding; mid ≈ implements and
operates independently; senior ≈ designs strategy, sets policy, leads
others.

## Before assessing: ask clarifying questions

The framework describes a whole profession, not one job. **No individual or
single role is expected to cover all 74 competencies** — real roles map to a
subset of domains, and depth in some competencies matters far more than
breadth across all. So before running an assessment, establish context. If
the user's request already answers these, don't re-ask; otherwise ask (and
offer sensible defaults):

- **Who is asking?** A professional assessing themselves, or an employer
  assessing a role/team? This changes the framing of the output.
- **What role or career direction?** e.g. TRE operations manager, data
  wrangler, research software engineer, output checker, IG lead. Use the
  role to select the domains and competencies in scope.
- **What level is the target?** entry, mid, or senior — or "next step up
  from where the CV sits".
- **Scope**: all six domains, or focus on a few? Default to scoring all
  domains but reporting depth only where relevant to the role.
- For JDs: is the goal to **check** an existing JD, or to **draft/improve**
  one from the framework?

One or two focused questions are enough — don't interrogate. If the user
can't or won't specify, proceed with stated assumptions and say so.

## Workflows

Detailed step-by-step playbooks and output templates live in
`references/assessment_playbooks.md`. **Read it before producing a CV gap
analysis, JD alignment report, career development plan, or team capability
assessment.** In brief:

- **CV / skills gap analysis**: extract evidenced skills from the CV → map
  each to competency ids at a justified level → compare against the target
  role/level → report strengths, gaps, and development suggestions.
- **JD alignment check**: extract the JD's requirements → map to
  competencies → report coverage per domain, flag unmapped requirements
  and framework competencies the JD is missing for that kind of role.
- **JD drafting**: pick role-relevant competencies and levels, turn their
  skill statements into requirements (essential vs desirable).
- **Career development**: locate current position per competency, pick the
  target, and use the next level's skill statements as concrete objectives.
- **General questions**: answer from the index; quote descriptions and
  skill statements from the YAML when precision matters.

## Assessment principles

- **Evidence-based**: only credit a competency level when the CV/JD gives
  evidence for it. Distinguish "demonstrated" (explicit examples) from
  "implied" (likely given role history), and mark inferences as such. Never
  invent experience; a gap is not a criticism.
- **Equivalence over literalism**: match meaning, not keywords. "Ran the
  output checking service" evidences `output-review-processes` even though
  it doesn't name the competency; adjacent-sector experience (finance
  data governance, NHS IG) transfers.
- **Levels need level-evidence**: seniority claims need scope evidence
  (led, designed, set policy) — years alone don't make senior.
- **Be constructive and honest**: for professionals, frame gaps as a
  development pathway with suggested next steps, not a verdict. For
  employers, be direct about what a JD over- or under-asks.
- **Cite the framework**: reference competencies by name and id (e.g.
  "Disclosure Risk Assessment (`disclosure-risk-assessment`), mid level")
  so results are traceable and comparable across assessments.
- **The framework is a living document**: a few subdomains exist without
  competencies fleshed out yet (e.g. `accidental-disclosure`,
  `emergency-response`). If a task touches one, use the subdomain
  description qualitatively and say the framework doesn't yet define
  levels there.
- **State limitations**: this is a community framework oriented to UK
  SDE/TRE practice; it informs judgement, it doesn't replace it.
