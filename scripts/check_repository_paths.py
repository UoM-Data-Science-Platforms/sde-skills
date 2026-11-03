#!/usr/bin/env python3
"""Reject tracked planning briefs and local working files before review.

Inspect the Git index, including staged additions/deletions. Ignored local files
are allowed; a force-added file is still checked. No repository files are changed.
"""

import json
from pathlib import Path
import subprocess
import sys


FORBIDDEN_PREFIXES = ("docs/plans/", "local/")


def git_output(directory, *arguments):
    result = subprocess.run(
        ["git", "-C", str(directory), *arguments],
        check=True,
        capture_output=True,
    )
    return result.stdout.decode("utf-8", errors="surrogateescape")


def forbidden_tracked_paths(directory):
    """Return sorted violations across the whole repo, even from a subdirectory."""
    root = git_output(directory, "rev-parse", "--show-toplevel").rstrip("\r\n")
    paths = git_output(root, "ls-files", "--cached", "--full-name", "-z")
    return sorted(
        path
        for path in paths.split("\0")
        if path and path.casefold().startswith(FORBIDDEN_PREFIXES)
    )


def main(directory=None):
    try:
        violations = forbidden_tracked_paths(directory or Path.cwd())
    except (OSError, subprocess.CalledProcessError) as error:
        detail = (
            error.stderr.decode("utf-8", errors="replace").strip()
            if isinstance(error, subprocess.CalledProcessError)
            else str(error)
        )
        print(f"Unable to inspect the Git index: {detail}", file=sys.stderr)
        return 2

    if violations:
        print("Repository path check failed:", file=sys.stderr)
        for path in violations:
            print(f"  {json.dumps(path, ensure_ascii=True)}", file=sys.stderr)
        print(
            "Keep plans in GitHub issues and working files in ignored /local. "
            "Remove these paths from the Git index before committing.",
            file=sys.stderr,
        )
        return 1

    print("Repository path check passed: no tracked plan or local working files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
