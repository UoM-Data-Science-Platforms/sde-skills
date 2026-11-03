# Implementation brief: Validate SATRE mapping integrity and document its review lifecycle

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/124
Branch: codex/124-satre-validation-ownership
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

This draft contains the agreed plan. Implementation is pending owner review and a separate implementation session.

## Outcome

Work package 6 of 6: Validate SATRE mapping integrity and document its review lifecycle.

## Scope

- [ ] Extend the existing scripts/validate_yml.py and scripts/test_validate_yml.py and current CI checks. First inspect what remote main already validates; avoid duplicating working checks.
- [ ] Validate canonical reference existence and parentage, SATRE version/requirement references, duplicate relationships, contribution enums, rationale/review-state rules and explicit unmapped/gap representation.
- [ ] Add meaningful failure cases for malformed relationships and checks that generated output preserves source metadata and relationships. Test shared counts with duplicates, supporting-only mappings, pending review, gaps and applicability exclusions.
- [ ] Document how to review a SATRE release update, update the mapping, regenerate outputs and reconcile counts. Record source version, review date and actual reviewer identity; leave substantive review pending until performed.
- [ ] Document review responsibility for SATRE accuracy and competency-framework accuracy. Preserve the initial framework and federation caveat during future updates; framework expansion requires a separate decision.

## Acceptance criteria

- [ ] Invalid references and malformed reviewed mappings fail the existing validation/CI path with actionable messages.
- [ ] Tests cover data loss and misleading count cases, rather than merely mirroring implementation.
- [ ] Generated data and displayed counts derive from the same validated source.
- [ ] A documented update/review procedure records real review status and identifies the two review responsibilities.

## Implementation starting points

scripts/validate_yml.py; scripts/test_validate_yml.py; scripts/build_data.py; existing CI configuration; contributor/mapping-maintenance documentation.

Remote main already loads YAML-generated JSON and has mapping validation. Inspect current code and extend it; the original review used an older local main.

## Dependencies and coordination

Depends on: #114, #116, #118, #120, #122

Related existing work: #105 (reference and limitations), #106 (mapping review and explanations). These six packages make that work actionable and supersede the earlier deferral of mapping reconciliation for the agreed scope.

## Agreed federation scope

Federation is a recent addition to the SATRE standard. We have included a mapping from the initial version of the SDE RTP framework, but have not added to the framework in response to the additions to SATRE.

## Handoff

Planning only at creation. The owner will inspect this issue before a separate session implements it. A dedicated codex/ branch and draft PR hold the implementation brief. Refresh that branch from current main after dependencies land. Update this checklist and the PR description during implementation. Keep the PR draft until implementation and validation are complete. The planning commit does not complete this issue. Record any framework extensions as a separate proposal.
