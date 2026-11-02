# Align supporting YAML and validate current-version additions

Issue: https://github.com/UoM-Data-Science-Platforms/sde-skills/issues/107

Status: implemented; awaiting content review.

This branch integrates #99, #100 and #101 for local review. Merge their PRs
first, then this PR; its diff against main will shrink as dependencies merge.

Qualification entries are intentionally empty where no specific qualification is
suggested. This is not a missing competency level. Five pre-existing partial
qualification entries in Projects & Operations now explicitly list empty levels.
The original source-count research is unchanged; new resources carry dated source
URLs without new prevalence counts.

Timing: Current version

## Scope

- [x] Update self-learning, tools/standards and qualification YAML for the AI additions and completeness fixes.
- [x] Keep products and qualifications illustrative rather than mandatory proxies for competence.
- [x] Record sources for new resources without inventing supporting counts.
- [x] Validate YAML structure, IDs, references and complete level definitions.
- [x] Use the current schema and reserve the richer assessment model for v2.

## Acceptance criteria

Supporting entries match the updated competencies and relevant validation passes.

## Relationships

Depends on: #99.
Depends on: #100.
Depends on: #101.

## Implementation notes

- Use the current framework data model unless the issue explicitly says otherwise.
- Keep changes scoped to this issue and coordinate linked dependencies.
- Record relevant validation and any remaining limitations in the pull request.
