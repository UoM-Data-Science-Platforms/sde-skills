# Implementation brief: Define defensible SATRE mapping counts and coverage language

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/120
Branch: codex/120-satre-coverage-semantics
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

This draft contains the agreed plan. Implementation is pending owner review and a separate implementation session.

## Outcome

Work package 4 of 6: Define defensible SATRE mapping counts and coverage language.

## Scope

- [ ] Replace ambiguous 'addressed' or coverage claims with precise wording such as 'has mapped competencies', with a concise definition next to counts.
- [ ] Distinguish direct contributions, supporting contributions, reviewed requirements without mappings, and requirements awaiting review. Define deduplication at requirement/capability/domain level.
- [ ] Report core and federation separately and explain denominators, applicability exclusions and whether counts are requirement-level or capability-level. Keep requirement importance visible where useful.
- [ ] Keep mapping completeness, demonstrated team proficiency and organisational SATRE compliance conceptually distinct. The mapping alone establishes relevant skill contributions.
- [ ] Use the same mapping data and calculation functions for the overview and detailed views. Preserve the federation caveat and initial-framework limitation.

## Acceptance criteria

- [ ] Every displayed metric has a documented numerator, denominator and treatment of duplicates, review state and exclusions.
- [ ] A supporting-only or unreviewed relationship cannot be mistaken for complete requirement coverage.
- [ ] Core and federation totals are transparent and reconcile across views.
- [ ] No wording implies competency presence proves team readiness or SATRE compliance.

## Implementation starting points

astro-app/src/components/CFOverview.jsx; SatreMappingMatrix.jsx; MappingMatrix.jsx; shared mapping helpers; framework-mapping documentation.

Remote main already loads YAML-generated JSON and has mapping validation. Inspect current code and extend it; the original review used an older local main.

## Dependencies and coordination

Depends on: #114, #116, #118

Related existing work: #105 (reference and limitations), #106 (mapping review and explanations). These six packages make that work actionable and supersede the earlier deferral of mapping reconciliation for the agreed scope.

## Agreed federation scope

Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Handoff

Planning only at creation. The owner will inspect this issue before a separate session implements it. A dedicated codex/ branch and draft PR hold the implementation brief. Refresh that branch from current main after dependencies land. Update this checklist and the PR description during implementation. Keep the PR draft until implementation and validation are complete. The planning commit does not complete this issue. Record any framework extensions as a separate proposal.
