# Implementation brief: Validate SATRE mapping integrity and document its review lifecycle

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/124
Branch: codex/124-satre-validation-ownership
Base: main at abf6fe40bf4f62257487d53b2d9f66ee16e7b98d

Updated 3 November 2026. This branch includes the #115/#117 implementations. This package remains a planning draft for the remaining scope in the delivery update below.

## Outcome

Work package 6 of 6: Validate SATRE mapping integrity and document its review lifecycle.

## Original scope (see delivery update below)

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

PR #125 is stacked on #117 to expose this brief without duplicating source/schema changes in review. Dependencies #118/#120/#122 remain pending. Refresh from main and retarget after dependencies merge. Keep this PR draft until the remaining implementation and validation are complete. Preserve existing tests and extend them with meaningful behavioral failures. Framework expansion requires a separate proposal.

## Delivery update — 3 November 2026

## Validation delivered by dependency PRs

Implemented in #115 and #117; pending their review and merge:

- Pinned SATRE source metadata, complete official inventory, importance/applicability preservation and snapshot integrity checks.
- Canonical domain/subdomain/competency parentage, SATRE requirement references, duplicate relationship and contribution-enum checks.
- Pending/reviewed/rejected relationship structure, completed-review rationale/identity/date rules, and lossless legacy migration provenance.
- Generation fails before output writes; generated JSON preserves metadata, official requirements and relationships. Canonical labels and spans derive from YAML.
- 26 regression tests, with CI generation and committed-JSON drift checking. Deployment installs validation dependencies.

Do not recreate these checks. Inspect them on the refreshed branch and extend them for the remaining packages.

## Remaining scope for this package

- [ ] Validate reviewed requirement/capability status against retained reviewed relationships; require evidence for actual gaps and applicability exclusions.
- [ ] Test shared metric numerators/denominators against #120 definitions, including duplicate requirement references, supporting-only links, pending review, confirmed gaps and applicability exclusions.
- [ ] Verify displayed counts and source provenance reconcile across the views delivered by #122.
- [ ] Document the complete release-update and relationship-review lifecycle, with real source version, date and reviewer identity. Coordinate SATRE-accuracy and competency-framework-accuracy review responsibilities without inventing named owners.
- [ ] Preserve the initial framework and federation caveat; record proposed extensions separately.
