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

## Submitting a Pull Request

1. Fork the repository and create a new branch for your changes.
2. Push your changes to your fork.
3. Open a pull request with a clear description of your changes.

Thank you for contributing!
