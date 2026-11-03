# Repository working agreements

## Product changes

- Keep the working site and its existing navigation usable throughout a change.
- Reconcile issue requirements with the latest user direction before changing the
  interface. Record superseded requirements in the issue so they do not return in
  another work package. Distinguish required data changes from optional UI changes.
- Do not add disclaimers, warning banners, unverified notices, review-status labels,
  migration histories or implementation notes to the public interface unless the
  user explicitly requests them. Keep maintenance and review metadata in source
  data and GitHub issues; never falsify a review state to simplify the interface.
- For the SATRE mapping, show the mapping, official requirements, guidance and
  readable competency names. The user has explicitly requested removal of the
  previously added federation disclaimer and pending/unverified notices. This
  direction supersedes the earlier presentation requirements in the SATRE issues.

## Plans and temporary files

- Put plans, implementation briefs, handoffs and outstanding work in GitHub issues.
  Do not commit them under `docs/plans/` or elsewhere in the codebase.
- Keep PR descriptions focused on implemented behavior, validation and dependencies.
- Use the existing ignored `/local` directory for downloaded source checkouts,
  temporary scripts, local tooling and test artifacts. Check ignore rules and
  staged files before committing; never commit these working files.
- Run `python scripts/check_repository_paths.py` after staging. It checks the Git
  index for tracked `docs/plans/**` and `local/**` files; CI runs the same check.
  An ignore rule does not protect files that are already tracked or force-added.

## Verification and handoff

- A successful production build or green CI does not establish that the interactive
  site works. Before declaring a website change ready, inspect it in a browser.
- Check desktop and narrow-screen navigation, the changed page, and its key
  interactions. For SATRE, expand a pillar, capability and competency subdomain.
  Check browser errors, visible content and labels, not only generated data.
- Verify the actual development preview after production builds and branch changes.
  If it fails, inspect runtime errors and dependency caches. Do not blame unrelated
  navigation code without evidence. Explain before restarting a user-owned server.
- When building alongside a live preview, isolate build caches and outputs where
  practical. Keep suspected causes separate from observed errors; a successful
  restart alone does not establish a runtime mismatch's root cause.
- Before retrying a yielded command, collect its completion result. Reuse existing
  working tools and installed dependencies; avoid duplicate builds and setup work.
- Prefer focused diagnostics. Verbose build/debug flags can print environment
  values; do not dump the environment or publish raw diagnostic output. Keep issue
  evidence limited to relevant, sanitized errors and check results.
- Preserve unrelated user files and changes. Keep source data as the authority,
  regenerate outputs and run the checks appropriate to the code being changed.
- Before pushing, inspect the complete PR diff, staged paths, generated output and
  branch base. Refresh dependent branches and keep the PR stack reviewable.
- Report exactly what was tested and any outstanding failures. Mark PRs ready only
  after both automated checks and browser verification have succeeded.
- Separate data tests, production-build results and development-browser results in
  the handoff. When verification is incomplete, keep readiness claims limited to
  what was actually checked.
