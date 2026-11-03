"""Regression checks for silent data loss, incomplete levels and broken references."""

import shutil
import tempfile
import unittest
import json
from copy import deepcopy
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path

import yaml

from validate_yml import load_yaml, validate
from satre_data import compile_satre
from build_data import main as build_data


class ValidationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name) / "yaml"
        shutil.copytree("yaml", self.root)
        self.addCleanup(self.temp.cleanup)

    def change(self, filename, mutate):
        path = self.root / filename
        data = load_yaml(path)
        mutate(data)
        path.write_text(yaml.safe_dump(data, sort_keys=False), encoding="utf-8")

    def errors(self):
        return "\n".join(validate(self.root)[0])

    def test_current_data(self):
        self.assertEqual(validate(self.root)[0], [])

    def test_duplicate_keys(self):
        path = self.root / "satre_mapping.yaml"
        with path.open("a", encoding="utf-8") as stream:
            stream.write("\npillars: []\n")
        self.assertIn("Duplicate key", self.errors())

    def test_missing_senior(self):
        def mutate(data):
            del data["domain"]["subdomains"]["output-checking"]["competencies"][
                "output-review-processes"
            ]["levels"]["senior"]

        self.change("safe_outputs_disclosure_control.yaml", mutate)
        self.assertIn("requires exactly entry, mid and senior", self.errors())

    def test_empty_skills(self):
        def mutate(data):
            data["domain"]["subdomains"]["output-checking"]["competencies"][
                "output-review-processes"
            ]["levels"]["senior"]["skills"] = []

        self.change("safe_outputs_disclosure_control.yaml", mutate)
        self.assertIn("skills must be non-empty strings", self.errors())

    def test_unknown_support_reference(self):
        def mutate(data):
            comps = data["domain"]["subdomains"]["output-checking"]["competencies"]
            comps["unknown-competency"] = comps.pop("output-review-processes")

        self.change("safe-outputs-disclosure-control_self-learning.yml", mutate)
        self.assertIn("unknown competency reference", self.errors())

    def test_broken_satre_reference(self):
        def mutate(data):
            data["relationships"][0]["domain_id"] = "unknown-domain"

        self.change("satre_mapping.yaml", mutate)
        self.assertIn("unknown domain", self.errors())

    def test_satre_inventory_is_complete(self):
        data = load_yaml(self.root / "satre_mapping.yaml")
        self.assertEqual(len(data["pillars"]), 5)
        self.assertEqual(sum(len(p["components"]) for p in data["pillars"]), 35)
        self.assertEqual(
            sum(
                len(c["requirements"]) for p in data["pillars"] for c in p["components"]
            ),
            185,
        )
        federation = data["pillars"][4]
        self.assertEqual(
            sum(len(c["requirements"]) for c in federation["components"]), 21
        )
        self.assertEqual(
            data["source"]["relationship_review"],
            {"status": "pending", "reviewed_on": None, "reviewer": None},
        )

    def test_missing_official_requirement(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["pillars"][0]["components"][0]["requirements"].pop(),
        )
        self.assertIn("official requirements", self.errors())

    def test_editorial_text_cannot_replace_official_statement(self):
        def mutate(data):
            data["pillars"][0]["components"][0]["requirements"][0]["statement"] = (
                "Editorial paraphrase"
            )

        self.change("satre_mapping.yaml", mutate)
        self.assertIn("differs from pinned inventory", self.errors())

    def test_conditional_applicability_is_preserved(self):
        def mutate(data):
            for p in data["pillars"]:
                for c in p["components"]:
                    for r in c["requirements"]:
                        if r["importance"] == "Mandatory*":
                            r["applicability"]["conditional"] = False
                            return

        self.change("satre_mapping.yaml", mutate)
        self.assertIn("conditional flag", self.errors())

    def test_moving_source_reference_rejected(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["source"].update(
                url="https://satre-specification.readthedocs.io/en/stable/"
            ),
        )
        self.assertIn("pinned source commit", self.errors())

    def test_snapshot_tampering_rejected(self):
        with (self.root / "satre/specification-2.0.1.yaml").open(
            "a", encoding="utf-8"
        ) as stream:
            stream.write("\n# changed source\n")
        self.assertIn("SHA-256 mismatch", self.errors())

    def test_wrong_competency_parent_rejected(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["relationships"][0].update(subdomain_id="identity-management"),
        )
        self.assertIn("wrongly parented", self.errors())

    def test_wrong_requirement_parent_rejected(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["relationships"][0].update(requirement_ids=["5.1.01"]),
        )
        self.assertIn("wrongly parented SATRE requirement", self.errors())

    def test_duplicate_relationship_rejected(self):
        def mutate(data):
            r = deepcopy(data["relationships"][0])
            r["id"] = "another-id"
            data["relationships"].append(r)

        self.change("satre_mapping.yaml", mutate)
        self.assertIn("duplicate relationship", self.errors())

    def test_malformed_relationship_returns_actionable_error(self):
        self.change(
            "satre_mapping.yaml", lambda d: d["relationships"].append("free-text task")
        )
        self.assertIn("SATRE/relationships/", self.errors())

    def test_pending_cannot_claim_direct_contribution(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["relationships"][0].update(contribution="direct"),
        )
        self.assertIn("contribution", self.errors())

    def test_reviewed_relationship_requires_evidence(self):
        def mutate(data):
            data["relationships"][0]["review"]["status"] = "reviewed"

        self.change("satre_mapping.yaml", mutate)
        self.assertIn("requirement_ids", self.errors())

    def reviewed_fixture(self, data):
        r = data["relationships"][0]
        r.update(
            requirement_ids=["1.1.01"],
            contribution="supporting",
            rationale="Synthetic test evidence only",
        )
        r["review"] = {
            "status": "reviewed",
            "reviewer": "Test fixture reviewer",
            "reviewed_on": "2026-01-01",
        }

    def test_schema_supports_reviewed_relationships(self):
        self.change("satre_mapping.yaml", self.reviewed_fixture)
        self.assertEqual(self.errors(), "")

    def test_reviewed_relationship_requires_real_review_fields(self):
        def mutate(data):
            self.reviewed_fixture(data)
            data["relationships"][0]["review"]["reviewer"] = " "
            data["relationships"][0]["review"]["reviewed_on"] = "not-a-date"
            data["relationships"][0]["rationale"] = "TBD"

        self.change("satre_mapping.yaml", mutate)
        errors = self.errors()
        self.assertIn("rationale required", errors)
        self.assertIn("reviewer required", errors)
        self.assertIn("valid review date", errors)

    def test_unknown_contribution_rejected(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["relationships"][0].update(contribution="complete"),
        )
        self.assertIn("contribution", self.errors())

    def test_legacy_relationship_cannot_disappear(self):
        self.change("satre_mapping.yaml", lambda d: d["relationships"].pop(0))
        self.assertIn("legacy relationship lost", self.errors())

    def domains(self):
        return {
            d["domain"]["id"]: d["domain"]
            for d in (load_yaml(p) for p in self.root.glob("safe_*.yaml"))
        }

    def test_generation_preserves_evidence_and_derives_labels(self):
        mapping = load_yaml(self.root / "satre_mapping.yaml")
        domains = self.domains()
        r = mapping["relationships"][0]
        domains[r["domain_id"]]["name"] = "Renamed domain"
        domains[r["domain_id"]]["subdomains"][r["subdomain_id"]]["name"] = (
            "Renamed subdomain"
        )
        domains[r["domain_id"]]["subdomains"][r["subdomain_id"]]["competencies"][
            r["competency_id"]
        ]["name"] = "Renamed competency"
        generated = compile_satre(mapping, domains)
        for key in (
            "source",
            "relationships",
            "legacy_components",
            "federation_caveat",
        ):
            self.assertEqual(generated[key], mapping[key])
        for source_p, output_p in zip(mapping["pillars"], generated["pillars"]):
            for source_c, output_c in zip(
                source_p["components"], output_p["components"]
            ):
                self.assertEqual(source_c["requirements"], output_c["requirements"])
        competency = generated["competencies"][r["competency_id"]]
        self.assertEqual(competency["name"], "Renamed competency")
        self.assertEqual(
            next(s for s in generated["subdomains"] if s["id"] == r["subdomain_id"])[
                "name"
            ],
            "Renamed subdomain",
        )
        domain = next(d for d in generated["domains"] if d["id"] == r["domain_id"])
        self.assertEqual(domain["name"], "Renamed domain")
        self.assertEqual(domain["span"], len(domains[r["domain_id"]]["subdomains"]))
        first = generated["pillars"][0]["components"][0]
        self.assertIn(
            "Renamed competency", first["mappings"][r["domain_id"]][r["subdomain_id"]]
        )
        self.assertNotIn("mappings", mapping["pillars"][0]["components"][0])

    def test_rejected_candidate_retains_history_but_is_not_projected(self):
        mapping = load_yaml(self.root / "satre_mapping.yaml")
        for r in mapping["relationships"]:
            r["review"]["status"] = "rejected"
        generated = compile_satre(mapping, self.domains())
        self.assertEqual(generated["relationships"], mapping["relationships"])
        self.assertTrue(
            all(
                not c["mappings"] for p in generated["pillars"] for c in p["components"]
            )
        )

    def test_build_fails_before_writing_any_output(self):
        self.change(
            "satre_mapping.yaml",
            lambda d: d["relationships"][0].update(competency_id="stale-task"),
        )
        output = self.root.parent / "public"
        compiled = self.root.parent / "src"
        with self.assertRaisesRegex(ValueError, "wrongly parented competency"):
            build_data(self.root, output, compiled)
        self.assertFalse(output.exists())
        self.assertFalse(compiled.exists())

    def test_actual_build_serializes_all_source_evidence(self):
        output, compiled = self.root.parent / "public", self.root.parent / "src"
        with redirect_stdout(StringIO()):
            build_data(self.root, output, compiled)
        result = json.loads(
            (compiled / "satre_mapping.json").read_text(encoding="utf-8")
        )
        mapping = load_yaml(self.root / "satre_mapping.yaml")
        for key in (
            "source",
            "relationships",
            "legacy_components",
            "federation_caveat",
        ):
            self.assertEqual(result[key], mapping[key])


if __name__ == "__main__":
    unittest.main()
