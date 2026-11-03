"""Exercise the path convention using real, disposable Git indexes."""

from pathlib import Path
import os
import subprocess
import sys
import tempfile
import unittest

from check_repository_paths import forbidden_tracked_paths


SCRIPT = Path(__file__).with_name("check_repository_paths.py").resolve()


class RepositoryPathTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.git("init", "--quiet")

    def git(self, *arguments):
        return subprocess.run(
            ["git", "-C", str(self.root), *arguments],
            check=True,
            capture_output=True,
        )

    def write(self, path, content="example\n"):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")

    def stage(self, path, force=False):
        self.write(path)
        self.git("add", *(["--force"] if force else []), "--", path)

    def cli(self, directory=None, env=None):
        return subprocess.run(
            [sys.executable, str(SCRIPT)],
            cwd=directory or self.root,
            capture_output=True,
            text=True,
            encoding="utf-8",
            env=env,
        )

    def test_legitimate_documentation_and_similar_names_pass(self):
        for path in (
            "AGENTS.md",
            "docs/architecture.md",
            "docs/plans-overview.md",
            "docs/planets/orbits.md",
            "src/localization/messages.json",
        ):
            self.stage(path)
        result = self.cli()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(forbidden_tracked_paths(self.root), [])

    def test_staged_plan_fails_with_actionable_path(self):
        self.stage("docs/plans/satre/implementation.md")
        result = self.cli()
        self.assertEqual(result.returncode, 1)
        self.assertIn('"docs/plans/satre/implementation.md"', result.stderr)
        self.assertIn("GitHub issues", result.stderr)

    def test_ignored_local_content_is_allowed(self):
        self.write(".gitignore", "/local\n")
        self.git("add", "--", ".gitignore")
        self.write("local/debug.txt")
        result = self.cli()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(forbidden_tracked_paths(self.root), [])

    def test_force_added_local_content_is_rejected(self):
        self.write(".gitignore", "/local\n")
        self.git("add", "--", ".gitignore")
        self.stage("local/debug.txt", force=True)
        self.assertEqual(forbidden_tracked_paths(self.root), ["local/debug.txt"])
        self.assertEqual(self.cli().returncode, 1)

    def test_case_variants_do_not_bypass_the_rule(self):
        self.stage("Docs/Plans/implementation.md")
        self.stage("LOCAL/debug.txt")
        self.assertEqual(len(forbidden_tracked_paths(self.root)), 2)

    def test_nested_invocation_still_checks_entire_repository(self):
        self.stage("docs/plans/implementation.md")
        nested = self.root / "src"
        nested.mkdir()
        result = self.cli(nested)
        self.assertEqual(result.returncode, 1)
        self.assertIn("docs/plans/implementation.md", result.stderr)

    def test_staged_removal_clears_violation_without_deleting_local_copy(self):
        self.stage("docs/plans/implementation.md")
        self.assertEqual(self.cli().returncode, 1)
        self.git("rm", "--cached", "--", "docs/plans/implementation.md")
        self.assertTrue((self.root / "docs/plans/implementation.md").exists())
        self.assertEqual(self.cli().returncode, 0)

    def test_repeated_checks_are_stable_and_do_not_mutate_index(self):
        self.stage("docs/plans/b.md")
        self.stage("docs/plans/a.md")
        before = self.git("ls-files", "--stage", "-z").stdout
        first, second = self.cli(), self.cli()
        after = self.git("ls-files", "--stage", "-z").stdout
        self.assertEqual(first.returncode, 1)
        self.assertEqual((first.stdout, first.stderr), (second.stdout, second.stderr))
        self.assertEqual(before, after)
        self.assertEqual(
            forbidden_tracked_paths(self.root), ["docs/plans/a.md", "docs/plans/b.md"]
        )

    def test_non_repository_returns_inspection_error(self):
        with tempfile.TemporaryDirectory() as other:
            env = dict(os.environ, GIT_CEILING_DIRECTORIES=str(Path(other).parent))
            result = self.cli(other, env=env)
        self.assertEqual(result.returncode, 2)
        self.assertIn("Unable to inspect the Git index", result.stderr)
        self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
