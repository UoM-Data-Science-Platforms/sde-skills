# Implementation brief: Pin SATRE 2.0.1 and include the federation extension

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/114
Branch: codex/114-satre-201-federation
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

Implemented on 3 November 2026. Source inventory and migration history are available; substantive relationship review remains pending under #118.

## Outcome

Work package 1 of 6: Pin SATRE 2.0.1 and include the federation extension.

## Scope

- [x] Pin SATRE 2.0.1, the latest published release checked on 3 November 2026; record release date, immutable release/source reference and review date. Link to https://satre-specification.readthedocs.io/en/stable/ for context, but do not use a moving stable URL as the sole version anchor.
- [x] Inventory all official capabilities and requirement identifiers across the four core pillars and federation extension. Correct names, numbering and hierarchy; retain Mandatory/Recommended/Optional and conditional applicability. Record old-to-new identifiers where useful.
- [x] Represent official requirement statements and editorial summaries separately. Do not mark the existing relationships as validated simply because the source is pinned.
- [x] Include federation as pillar 5. Add this visible caveat alongside federation and its explanatory documentation: Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.
- [x] Keep the competency framework at its existing initial-version scope. Identify gaps introduced by SATRE additions without adding competencies to conceal them. Actual relationship review belongs to work package 3.

## Acceptance criteria

- [x] Source metadata identifies SATRE 2.0.1 and a fixed release reference.
- [x] All official core and federation capabilities/requirements are accounted for, with explicit applicability or mapping-review status.
- [x] Federation caveat is visible and makes clear that mapping inclusion does not imply the framework has been extended.
- [x] Editorial summaries are distinguishable from official requirements, and existing mappings remain explicitly unverified until reviewed.

## Implementation starting points

yaml/satre_mapping.yaml; scripts/build_data.py; astro-app/src/data/satre_mapping.json; SATRE page and framework-mapping documentation.

Remote main already loads YAML-generated JSON and has mapping validation. Inspect current code and extend it; the original review used an older local main.

## Dependencies and coordination

Depends on: None; establishes the source baseline.

Related existing work: #105 (reference and limitations), #106 (mapping review and explanations). These six packages make that work actionable and supersede the earlier deferral of mapping reconciliation for the agreed scope.

## Agreed federation scope

Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Handoff

Planning only at creation. The owner will inspect this issue before a separate session implements it. A dedicated codex/ branch and draft PR hold the implementation brief. Refresh that branch from current main after dependencies land. Update this checklist and the PR description during implementation. Keep the PR draft until implementation and validation are complete. The planning commit does not complete this issue. Record any framework extensions as a separate proposal.


## Implementation evidence

Pinned commit 133b4af7f3c69586a8fe3da7d5d06685158fe473; attributed source snapshot with LF-normalized SHA-256. Inventory: 35 capabilities / 185 requirements, including 7 federation capabilities / 21 requirements. All 17 legacy component records and their mappings are preserved separately with unverified topic candidates. No framework competencies changed.

Validation: YAML validator (25 files, 92 competencies, zero errors); 12 regression tests passed; data generation and Astro production build (23 pages) passed. New checks cover source pinning, completeness, official wording, applicability and snapshot tampering. Relationship-schema migration follows in #116; wider count and review-lifecycle validation remains in #124.

