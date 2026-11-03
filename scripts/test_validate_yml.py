"""Regression checks for silent data loss, incomplete levels and broken references."""
import shutil
import tempfile
import unittest
from pathlib import Path

import yaml

from validate_yml import load_yaml, validate


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
            del data["domain"]["subdomains"]["output-checking"]["competencies"]["output-review-processes"]["levels"]["senior"]
        self.change("safe_outputs_disclosure_control.yaml", mutate)
        self.assertIn("requires exactly entry, mid and senior", self.errors())

    def test_empty_skills(self):
        def mutate(data):
            data["domain"]["subdomains"]["output-checking"]["competencies"]["output-review-processes"]["levels"]["senior"]["skills"] = []
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
            data["pillars"][0]["components"][0]["mappings"] = {"unknown-domain": {"unknown-subdomain": ["unknown-competency"]}}
        self.change("satre_mapping.yaml", mutate)
        self.assertIn("unknown domain", self.errors())

    def test_satre_inventory_is_complete(self):
        data = load_yaml(self.root / 'satre_mapping.yaml')
        self.assertEqual(len(data['pillars']), 5)
        self.assertEqual(sum(len(p['components']) for p in data['pillars']), 35)
        self.assertEqual(sum(len(c['requirements']) for p in data['pillars'] for c in p['components']), 185)
        federation = data['pillars'][4]
        self.assertEqual(sum(len(c['requirements']) for c in federation['components']), 21)
        self.assertEqual(data['source']['relationship_review'], {'status': 'pending', 'reviewed_on': None, 'reviewer': None})

    def test_missing_official_requirement(self):
        self.change('satre_mapping.yaml', lambda d: d['pillars'][0]['components'][0]['requirements'].pop())
        self.assertIn('official requirements', self.errors())

    def test_editorial_text_cannot_replace_official_statement(self):
        def mutate(data):
            data['pillars'][0]['components'][0]['requirements'][0]['statement'] = 'Editorial paraphrase'
        self.change('satre_mapping.yaml', mutate)
        self.assertIn('differs from pinned inventory', self.errors())

    def test_conditional_applicability_is_preserved(self):
        def mutate(data):
            for p in data['pillars']:
                for c in p['components']:
                    for r in c['requirements']:
                        if r['importance'] == 'Mandatory*':
                            r['applicability']['conditional'] = False
                            return
        self.change('satre_mapping.yaml', mutate)
        self.assertIn('conditional flag', self.errors())

    def test_moving_source_reference_rejected(self):
        self.change('satre_mapping.yaml', lambda d: d['source'].update(url='https://satre-specification.readthedocs.io/en/stable/'))
        self.assertIn('pinned source commit', self.errors())

    def test_snapshot_tampering_rejected(self):
        with (self.root / 'satre/specification-2.0.1.yaml').open('a', encoding='utf-8') as stream:
            stream.write('\n# changed source\n')
        self.assertIn('SHA-256 mismatch', self.errors())


if __name__ == "__main__":
    unittest.main()
