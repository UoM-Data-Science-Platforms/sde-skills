# Implementation brief: Expose SATRE mapping evidence through an accessible drill-down

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/122
Branch: codex/122-satre-traceable-accessible-ui
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

This draft contains the agreed plan. Implementation is pending owner review and a separate implementation session.

## Outcome

Work package 5 of 6: Expose SATRE mapping evidence through an accessible drill-down.

## Scope

- [ ] Retain the pillar → capability → contributing competency drill-down; expose versioned source links, requirement references, contribution type, rationale, review state and gaps.
- [ ] Display official requirements and editorial summaries distinctly; render federation as an extension with its applicability and the approved initial-framework caveat.
- [ ] Use keyboard-operable controls for pillar, capability and subdomain expansion, with aria-expanded and appropriate accessible names. Ensure detail is available on touch and without hover.
- [ ] Keep focus behaviour predictable and validate usable layout on narrow screens. Hover tooltips may supplement the detail view but cannot be its only access route.
- [ ] Align the overview, dedicated SATRE page, framework-mapping view and published documentation so labels, caveats and metrics agree.

## Acceptance criteria

- [ ] A user can trace a SATRE requirement to a canonical competency and read why it contributes.
- [ ] Keyboard-only users can open every initially collapsed level and reach all essential information.
- [ ] Touch and narrow-screen users can inspect the same evidence.
- [ ] Version, federation caveat, review state and metric explanations agree across all entry points.

## Implementation starting points

astro-app/src/components/SatreMappingMatrix.jsx; CFOverview.jsx; MappingMatrix.jsx; astro-app/src/pages/satre-mapping.astro; docs/competency_framework/framework_mapping.md and generated/published equivalents.

Remote main already loads YAML-generated JSON and has mapping validation. Inspect current code and extend it; the original review used an older local main.

## Dependencies and coordination

Depends on: #114, #116, #118, #120

Related existing work: #105 (reference and limitations), #106 (mapping review and explanations). These six packages make that work actionable and supersede the earlier deferral of mapping reconciliation for the agreed scope.

## Agreed federation scope

Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Handoff

Planning only at creation. The owner will inspect this issue before a separate session implements it. A dedicated codex/ branch and draft PR hold the implementation brief. Refresh that branch from current main after dependencies land. Update this checklist and the PR description during implementation. Keep the PR draft until implementation and validation are complete. The planning commit does not complete this issue. Record any framework extensions as a separate proposal.
