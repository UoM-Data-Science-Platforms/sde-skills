# Complete missing or incomplete competency levels

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/99

Status: implemented; awaiting content review.

Timing: Current version

## Scope

- [x] Add the missing senior level to Output Review Processes, focused on systems supporting qualified reviewers.
- [x] Verify completeness of Accidental Disclosure and Emergency Response, which already contain structured entry, mid and senior levels.
- [x] Check remaining definitions for missing levels, empty skills and unfinished descriptions.
- [x] Preserve the current schema, IDs and structure. Exclude broad rewriting, renaming and consolidation.

## Acceptance criteria

Every existing competency has complete level definitions or an explicitly documented exception, and all reported gaps have been checked.

## Implementation notes

- Use the current framework data model unless the issue explicitly says otherwise.
- Keep changes scoped to this issue and coordinate linked dependencies.
- Record relevant validation and any remaining limitations in the pull request.

## Validation results

Audited all 76 existing competencies across six domains for entry, mid and senior levels, non-empty skill lists, IDs, names and descriptions. Output Review Processes was the only missing level. Accidental Disclosure and Emergency Response already have all three levels and were retained. No exceptions or placeholder descriptions were found.
