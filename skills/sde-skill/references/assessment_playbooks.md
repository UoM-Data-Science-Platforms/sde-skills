# Assessment Playbooks

Step-by-step playbooks and output templates for the main ways people use the
SDE Skills Competency Framework. Follow the structure but adapt tone and
depth to the user — a quick "how does my CV stack up?" deserves a lighter
report than a formal team capability review.

Shared vocabulary for all playbooks — rate evidence per competency as:

- **Demonstrated (D)** — explicit, concrete evidence at the stated level
  (projects, responsibilities, outcomes).
- **Implied (I)** — plausible given roles held, but not shown; say what
  would confirm it.
- **Not evidenced (—)** — nothing in the document supports it. This means
  "not shown", not "absent in the person".

## 1. CV / skills gap analysis

**Goal**: show a professional where they sit against the framework for a
target role/level, and what to develop next.

1. Establish target role and level (ask if unclear — see SKILL.md). From
   the role, pick the in-scope domains and, within them, the relevant
   competencies using `framework_index.md`. Typical shapes:
   - *Data wrangler / data engineer*: Safe Data Management deep; Outputs +
     Governance mid; Technology working knowledge.
   - *TRE operator / platform engineer*: Safe Technology & Engineering +
     Safe Access & Identity deep; Governance + Projects mid.
   - *Output checker / disclosure control*: Safe Outputs deep; Data +
     Governance mid.
   - *IG / compliance lead*: Safe Governance & Compliance deep; touches
     every other domain at entry–mid.
   - *SDE service / operations manager*: Safe Projects & Operations deep;
     broad mid-level across the rest.
   These are starting points, not rules — let the user's actual JD or
   career goal override them. Within a "deep" domain, not every
   competency needs the same target: set the role's core competencies at
   the target level and peripheral ones a level below (or entry), and
   state that choice in the report's assumptions.
2. Read the CV fully. Extract skills, tools, responsibilities, and
   achievements *with the evidence attached* (which role, what they did).
3. Load the in-scope files from `references/domains/`. For each relevant
   competency,
   compare the CV evidence against the entry/mid/senior skill statements
   and assign the highest level with real support, with a D/I rating.
   Match meaning, not keywords; credit equivalent tools and transferable
   sector experience. Seniority needs scope evidence (led, designed,
   owned), not just years.
4. Compare against the target level per competency to classify: strength
   (at/above target), partial (evidenced below target), or gap (not
   evidenced but needed).
5. Report using the template below. For the development plan, quote the
   skill statements of the *next* level up as concrete objectives, and
   suggest realistic routes (courses, certifications, stretch tasks,
   shadowing) — the example tools/technologies/standards lists in the
   domain files suggest concrete technologies worth hands-on practice.

**Template:**

```markdown
# CV assessment against the SDE Skills Competency Framework
**Target:** <role>, <level> · **Scope:** <domains> · **Assumptions:** <...>

## Summary
<3–5 sentences: overall shape, standout strengths, main development areas.>

## Competency mapping
| Domain | Competency (id) | Target | Evidenced | Rating | Evidence |
|---|---|---|---|---|---|
| Safe Data Management | Data Pipeline Development (`data-pipeline-development`) | mid | mid | D | Built Airflow ETL for ... |
<one row per in-scope competency; group by domain; use — for gaps>

## Strengths
<bullets: where they meet/exceed target, with the evidence>

## Gaps and partials
<bullets: what's missing for the target, why it matters for the role>

## Suggested development plan
<per gap: the next-level skill statements as objectives + a concrete route>

## Caveats
<CV-based inference; what a conversation/interview should verify>
```

## 2. JD alignment check

**Goal**: show an employer how a job description maps onto the framework —
coverage, over-asks, and blind spots.

1. Identify the role type and seniority the JD implies.
2. Extract every requirement/responsibility from the JD (essential and
   desirable separately if the JD distinguishes them).
3. Map each requirement to competency ids and levels; note requirements
   that don't map (they may be legitimate — generic HR items, org-specific
   duties — or signs the JD is really two jobs).
4. Reverse-check: from the framework side, list competencies the framework
   suggests for this kind of role that the JD never asks for — especially
   safety-critical ones (disclosure control, IG, incident response are
   common blind spots in technically-framed SDE JDs).
5. Sanity-check level coherence: does the JD ask senior-level breadth at a
   mid-level title/salary band, or demand senior depth in five domains at
   once (a "unicorn" JD)? Say so plainly.

**Template:**

```markdown
# JD alignment with the SDE Skills Competency Framework
**Role:** <title> · **Implied level:** <entry/mid/senior> · **Best-fit profile:** <role shape>

## Summary
<3–5 sentences: overall alignment, notable blind spots, level coherence.>

## Requirement mapping
| JD requirement | Competency (id) | Level asked | Notes |
|---|---|---|---|
<one row per requirement; "unmapped" where nothing fits>

## Coverage by domain
<per domain: covered well / partially / not at all — and whether that's appropriate for this role>

## Possible blind spots
<framework competencies this role type usually needs that the JD omits>

## Recommendations
<concrete edits: add/drop/reword requirements, fix level asks, split role if overloaded>
```

## 3. JD drafting

Run the role-shape step from playbook 1, agree scope with the user, then
turn the chosen competencies' skill statements into requirements: the
target level's statements become *essential* criteria; one level up (or
adjacent nice-to-have competencies) become *desirable*. Write requirements
in the employer's voice, not framework prose; cite competency ids in a
mapping appendix so the JD stays traceable to the framework. Include the
role's safety-critical governance/disclosure expectations even for
technical roles.

## 4. Career development planning

For a professional who asks "how do I get from here to X": run a light
version of playbook 1 (self-reported skills are fine — no CV needed, but
say the assessment is self-report based), locate their current level per
relevant competency, then build the plan from the delta. Structure output
as: current profile → target profile → per-competency objectives (next
level's skill statements) → suggested activities and evidence to collect.
Encourage picking 3–5 focus competencies, not everything at once.

## 5. Team capability assessment

For an employer with several CVs/role profiles: run playbook 1 per person
(briefly), then aggregate into a coverage matrix — competencies × team
members with levels — and report single points of failure (competencies
held by one person), collective gaps, and training priorities. Keep
individual assessments non-comparative and constructive; the deliverable
is team resilience, not a ranking.
