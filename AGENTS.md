# Repository working agreements

## Product changes

- Keep the working site and its existing navigation usable throughout a change.
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

## Verification and handoff

- A successful production build or green CI does not establish that the interactive
  site works. Before declaring a website change ready, inspect it in a browser.
- Check desktop and narrow-screen navigation, the changed page, and its key
  interactions. For SATRE, expand a pillar, capability and competency subdomain.
  Check browser errors, visible content and labels, not only generated data.
- Verify the actual development preview after production builds and branch changes.
  If it fails, inspect runtime errors and dependency caches. Do not blame unrelated
  navigation code without evidence. Explain before restarting a user-owned server.
- Preserve unrelated user files and changes. Keep source data as the authority,
  regenerate outputs and run the checks appropriate to the code being changed.
- Before pushing, inspect the complete PR diff, staged paths, generated output and
  branch base. Refresh dependent branches and keep the PR stack reviewable.
- Report exactly what was tested and any outstanding failures. Mark PRs ready only
  after both automated checks and browser verification have succeeded.
