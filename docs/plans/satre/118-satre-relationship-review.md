# Implementation brief: Review SATRE relationships and record contributions, rationale and gaps

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/118
Branch: codex/118-satre-relationship-review
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

This draft contains the agreed plan. Implementation is pending owner review and a separate implementation session.

## Outcome

Work package 3 of 6: Review SATRE relationships and record contributions, rationale and gaps.

## Scope

- [ ] Review relationships against underlying SATRE 2.0.1 requirements, including federation, using the existing initial SDE RTP framework.
- [ ] For each retained relationship record canonical competency ID, relevant requirement references, direct/supporting contribution, concise rationale and review status. Define direct and supporting consistently; neither proves satisfaction.
- [ ] Start with training, identity/access and data lifecycle management as a pilot. Review the pilot before applying the method to all core and federation capabilities.
- [ ] Remove speculative associations. Distinguish not-yet-reviewed relationships, reviewed requirements with no suitable competency, and applicability exclusions. Do not manufacture links to improve totals.
- [ ] Record missing capabilities as framework-gap observations for later consideration. Add no new competencies as part of this mapping review. Preserve the federation caveat: Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Acceptance criteria

- [ ] Pilot examples establish the review method and contain explicit rationales.
- [ ] All retained core and federation links have source references and contribution explanations, with an honest review state.
- [ ] Weak relationships are removed and unmapped or unsupported requirements are visible.
- [ ] No changes extend the initial framework in response to SATRE additions; resulting gaps are recorded.

## Implementation starting points

yaml/satre_mapping.yaml and generated outputs; mapping methodology and gap documentation.

Remote main already loads YAML-generated JSON and has mapping validation. Inspect current code and extend it; the original review used an older local main.

## Dependencies and coordination

Depends on: #114, #116

Related existing work: #105 (reference and limitations), #106 (mapping review and explanations). These six packages make that work actionable and supersede the earlier deferral of mapping reconciliation for the agreed scope.

## Agreed federation scope

Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Handoff

Planning only at creation. The owner will inspect this issue before a separate session implements it. A dedicated codex/ branch and draft PR hold the implementation brief. Refresh that branch from current main after dependencies land. Update this checklist and the PR description during implementation. Keep the PR draft until implementation and validation are complete. The planning commit does not complete this issue. Record any framework extensions as a separate proposal.
