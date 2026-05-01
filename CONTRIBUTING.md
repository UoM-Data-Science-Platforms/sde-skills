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

## Submitting a Pull Request

1. Fork the repository and create a new branch for your changes.
2. Push your changes to your fork.
3. Open a pull request with a clear description of your changes.

Thank you for contributing!
