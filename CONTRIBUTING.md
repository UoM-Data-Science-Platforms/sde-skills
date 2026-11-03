# Contributing Guide

Thank you for considering contributing to the SDE Skills project! Here are some guidelines to help you get started:

## Setting Up the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies using `uv`:
   ```bash
   uv install
   ```

3. Set up pre-commit hooks:
   ```bash
   pre-commit install
   ```

## Making Changes

- Lint your code using `ruff`.
- Write clear and concise commit messages.

## Previewing the Site

To preview the Astro app locally:

1. Install Node dependencies:
   ```bash
   cd astro-app
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:4321/sde-skills`.

Ensure the documentation builds locally before submitting a pull request.

Before previewing competency data changes, validate and regenerate the data from
the repository root:

```bash
python -m pip install -r scripts/requirements-validation.txt
python scripts/validate_yml.py
python -m unittest discover -s scripts -p 'test_validate_yml.py'
python scripts/build_data.py
python scripts/build_skill_references.py
```

The validator checks YAML syntax (including duplicate keys), the current schema,
unique IDs, complete competency levels, supporting references and SATRE reference
integrity. It does not validate SATRE alignment or organisational compliance.
Qualification lists may be empty: no particular certificate is required as a proxy
for competence. New AI entries have all three supporting levels; products and
qualifications are illustrative, with source URLs and review dates in their text.

### SATRE source and relationship data

Edit `yaml/satre_mapping.yaml`; regenerate `astro-app/src/data/satre_mapping.json`
with `python scripts/build_data.py`. Generation validates before writing outputs;
CI also checks that the committed JSON matches generation. Install the validation
requirements before running the builder. Domain, subdomain and competency names
and parents come from the six canonical `yaml/safe_*.yaml` files; mapping records
store IDs rather than another editable set of labels.

SATRE 2.0.1 is pinned by commit and an attributed snapshot under `yaml/satre/`.
The snapshot SHA-256 uses LF-normalized UTF-8 text. Official requirement text,
guidance, numbering, importance and conditional applicability must match it.
Treat a future source update as an explicit inventory migration: inspect the
release and changelog, replace the attributed snapshot, update the pin and hash
in `scripts/satre_source.py` and source metadata, reconcile the complete inventory,
and rerun validation, regression tests, generation and the Astro build. A changed
pin does not constitute a relationship review.

Canonical relationships carry `capability_id`, `domain_id`, `subdomain_id`,
`competency_id`, `requirement_ids`, `contribution`, `rationale` and `review`.
Migrated candidates remain `pending`, with unknown contribution, no reviewer and
no review date. A retained, reviewed link needs requirement IDs under its
capability, `direct` or `supporting` contribution, a rationale and the actual
reviewer's identity and date. Direct means the competency directly contributes
to the requirement; supporting means it enables that work. Neither proves
requirement satisfaction. These judgments belong to work package #118.

The `legacy_components` section is migration evidence. Its old IDs are editorial
groupings, not official SATRE IDs. Preserve provenance when rejecting a candidate
by setting review status to `rejected` with rationale and reviewer details;
rejected records stay in the evidence and are excluded from matrix projections.
Do not delete links silently. Requirements distinguish `pending`, `reviewed`,
`gap` and `excluded` mapping status; an empty candidate list is not a confirmed
gap or applicability exclusion. Full gap/exclusion evidence, count reconciliation
and the two review responsibilities remain part of #124 after #118/#120/#122.

Relationships are reviewed against individual official requirement IDs. A
competency may contribute to several requirements in one capability, with a
different direct/supporting contribution where justified; each competency and
requirement pair must be unique. The capability matrix projects each competency
once, while each requirement lists its own mapped competencies.

Completed mapping reviews carry a per-requirement `mapping_assessment` with the
result (`direct`, `supporting_only`, `unmapped` or `excluded`), rationale,
reviewer/date and gap observations for supporting-only or unmapped requirements. An AI-assisted
editorial review records that identity explicitly and leaves human sign-off unset.
Deployment-specific applicability remains separate: without a TRE profile, do not
infer exclusions from a missing competency. Source statements and conditional
importance stay unchanged. Superseded broad migration candidates remain rejected
audit records; retained links use scoped requirement references.
An actual exclusion needs an applicability assessment, an `exclusion_rationale`
and a `profile_reference` identifying the deployment scope; it cannot retain
contributing links. The generic framework review asserts no such exclusions.

Keep review metadata in the source data and maintenance discussions in GitHub
issues. The public mapping displays requirements, guidance and competencies
without disclaimer banners or pending/unverified notices. Keep implementation
plans and handoffs in issues rather than committing plan documents.

## Submitting a Pull Request

1. Fork the repository and create a new branch for your changes.
2. Push your changes to your fork.
3. Open a pull request with a clear description of your changes.

Thank you for contributing!
