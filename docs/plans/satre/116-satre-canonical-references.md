# Implementation brief: Tighten SATRE mapping references to the canonical competency framework

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/116
Branch: codex/116-satre-canonical-references
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

Implemented on 3 November 2026, building on #115. Canonical integrity is validated; substantive relationship review remains pending under #118.

## Outcome

Work package 2 of 6: Tighten SATRE mapping references to the canonical competency framework.

## Scope

- [x] Build on the YAML-to-JSON pipeline already present on remote main; do not recreate the retired hard-coded JavaScript taxonomy.
- [x] Use canonical domain, subdomain and competency IDs from the domain YAML files. Derive display labels and parent relationships from those definitions.
- [x] Audit every existing relationship for correct parentage and replace remaining free-text task references with canonical competencies where justified; retain useful task wording only as explanatory examples.
- [x] Make invalid, stale or wrongly parented references explicit errors rather than silently dropping them. Preserve the initial framework scope, especially for federation.
- [x] Define a migration-compatible relationship structure supporting work package 3: canonical competency ID, SATRE requirement references, direct/supporting contribution, rationale and review state. Coordinate exact field names with the source inventory.

## Acceptance criteria

- [x] Every mapped competency resolves to the existing canonical framework under its correct parents.
- [x] Generated labels follow YAML changes without maintaining another taxonomy.
- [x] No unexplained free-text competency substitutes or silent unresolved-reference omissions remain.
- [x] Mapping schema supports relationship rationale, contribution and review status without expanding the framework.

## Implementation starting points

yaml/satre_mapping.yaml; yaml/safe_*.yaml (read as source); scripts/build_data.py; astro-app/src/data/satreMapping.js; generated JSON.

Remote main already loads YAML-generated JSON and has mapping validation. Inspect current code and extend it; the original review used an older local main.

## Dependencies and coordination

Depends on: #114

Related existing work: #105 (reference and limitations), #106 (mapping review and explanations). These six packages make that work actionable and supersede the earlier deferral of mapping reconciliation for the agreed scope.

## Agreed federation scope

Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Handoff

Planning only at creation. The owner will inspect this issue before a separate session implements it. A dedicated codex/ branch and draft PR hold the implementation brief. Refresh that branch from current main after dependencies land. Update this checklist and the PR description during implementation. Keep the PR draft until implementation and validation are complete. The planning commit does not complete this issue. Record any framework extensions as a separate proposal.


## Implementation evidence

238 distinct candidate relationships preserve all legacy links and their migration provenance. Canonical IDs resolve under their correct parents; names and the 26 subdomain columns derive from six existing domain YAML files. Requirement references, contribution, rationale, review state and real reviewer/date fields are supported. Pending candidates have no assigned contribution or completed review. No competency definitions changed.

Validation: 26 regression tests passed; YAML validation and data generation passed; generated JSON matches the validated source; Astro production build generated 23 pages. CI now builds and checks generated JSON consistency. Deployment installs the validation dependencies for generation. Validation runs before any outputs are written. Broader metric reconciliation, gap/applicability evidence and review ownership remain in #124.

PR #117 is stacked on #115 to expose only this package for review. Retarget it to main after #115 merges. Keep issues open until their implementation PRs merge.
