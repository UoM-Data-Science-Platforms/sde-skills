#!/usr/bin/env python3
"""Validate YAML syntax, current schema, complete levels and references.

Install scripts/requirements-validation.txt and run from the repository root.
Reference integrity does not establish semantic SATRE alignment or compliance.
"""
import re
import sys
from pathlib import Path

import jsonschema
import yaml

LEVELS = {"entry", "mid", "senior"}


class UniqueKeyLoader(yaml.SafeLoader):
    """Reject duplicate keys instead of silently overwriting content."""


def unique_mapping(loader, node, deep=False):
    keys = set()
    for key_node, _ in node.value:
        key = loader.construct_object(key_node, deep=deep)
        if key in keys:
            raise ValueError(f"Duplicate key {key!r} at line {key_node.start_mark.line + 1}")
        keys.add(key)
    return yaml.SafeLoader.construct_mapping(loader, node, deep=deep)


UniqueKeyLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, unique_mapping)


def load_yaml(path):
    return yaml.load(path.read_text(encoding="utf-8"), Loader=UniqueKeyLoader)


def validate(root=Path("yaml")):
    errors, documents, domains, ids = [], {}, {}, set()

    def check(condition, where, message):
        if not condition:
            errors.append(f"{where}: {message}")

    def text(value):
        return isinstance(value, str) and bool(value.strip()) and not re.search(
            r"\b(TODO|TBD|FIXME|placeholder)\b", value, re.I
        )

    def strings(value):
        return isinstance(value, list) and bool(value) and all(text(v) for v in value)

    def named(obj, where, expected, description=False):
        if not isinstance(obj, dict):
            check(False, where, "expected an object")
            return False
        check(text(obj.get("name")), where, "missing or unfinished name")
        if description:
            check(text(obj.get("description")), where, "missing or unfinished description")
        identifier = obj.get("id")
        check(text(identifier), where, "missing ID")
        check(identifier not in ids, where, f"duplicate ID {identifier}")
        ids.add(identifier)
        check(identifier == expected, where, "ID does not match its key")
        return True

    schema = load_yaml(root / "schema.yml")
    jsonschema.Draft7Validator.check_schema(schema)
    validator = jsonschema.Draft7Validator(schema)
    for path in sorted(root.glob("*.y*ml")):
        if path.name == "schema.yml":
            continue
        try:
            data = load_yaml(path)
            if not isinstance(data, dict) or not data:
                raise ValueError("Expected a non-empty mapping")
            documents[path.name] = data
            for error in validator.iter_errors(data):
                errors.append(f"{path}:{list(error.path)}: {error.message}")
        except (yaml.YAMLError, ValueError, TypeError) as error:
            errors.append(f"{path}: {error}")

    count = 0
    for filename, data in documents.items():
        if not filename.startswith("safe_"):
            continue
        domain = data.get("domain")
        if not named(domain, filename, filename[:-5].replace("_", "-"), True):
            continue
        domains[domain["id"]] = domain
        subdomains = domain.get("subdomains")
        if not isinstance(subdomains, dict) or not subdomains:
            check(False, filename, "missing subdomains")
            continue
        for sid, sub in subdomains.items():
            where = f"{filename}/{sid}"
            if not named(sub, where, sid, True):
                continue
            comps = sub.get("competencies")
            if not isinstance(comps, dict) or not comps:
                check(False, where, "missing competencies")
                continue
            for cid, comp in comps.items():
                count += 1
                where = f"{filename}/{sid}/{cid}"
                if not named(comp, where, cid, True):
                    continue
                levels = comp.get("levels", {})
                if not isinstance(levels, dict):
                    check(False, where, "levels must be an object")
                    continue
                check(set(levels) == LEVELS, where, "requires exactly entry, mid and senior")
                for level, value in levels.items():
                    if named(value, f"{where}/{level}", f"{cid}-{level}"):
                        check(strings(value.get("skills")), f"{where}/{level}", "skills must be non-empty strings")
    check(len(domains) == 6, "domains", "expected all six domain files")

    for filename, data in documents.items():
        if not filename.startswith("safe-"):
            continue
        did = filename.split("_", 1)[0]
        main = domains.get(did, {}).get("subdomains", {})
        subs = data.get("subdomains", data.get("domain", {}).get("subdomains", {}))
        check(bool(subs), filename, "missing supporting subdomains")
        for sid, sub in subs.items():
            where = f"{filename}/{sid}"
            check(sid in main, where, "unknown subdomain reference")
            for item in sub.get("items", []):
                check(text(item.get("name")) and text(item.get("role")), where, "tool requires name and role")
            for cid, comp in sub.get("competencies", {}).items():
                where = f"{filename}/{sid}/{cid}"
                check(cid in (main.get(sid, {}).get("competencies") or {}), where, "unknown competency reference")
                levels = comp.get("levels", {})
                check(set(levels) == LEVELS, where, "supporting entries require all three levels")
                for level, value in levels.items():
                    if "self-learning" in filename:
                        concepts = value.get("core_concepts")
                        check(isinstance(concepts, list) and bool(concepts), where, "missing core concepts")
                        for concept in concepts or []:
                            check(all(text(concept.get(k)) for k in ("topic", "why")), where, "missing learning topic or rationale")
                            check(all(strings(concept.get(k)) for k in ("concepts", "search_terms")), where, "invalid learning lists")
                    if "qualifications" in filename:
                        qualifications = value.get("qualifications")
                        check(isinstance(qualifications, list), where, "qualifications must be a list (empty is allowed)")
                        for qual in qualifications or []:
                            check(all(text(qual.get(k)) for k in ("issuer", "description", "career_impact")), where, "incomplete qualification")

    for did, domain in domains.items():
        for sid, sub in domain.get("subdomains", {}).items():
            if not sid.startswith("ai-"):
                continue
            for suffix in ("self-learning.yml", "qualifications.yaml", "tools-tech-standards.yaml"):
                doc = documents.get(f"{did}_{suffix}", {})
                support = doc.get("subdomains", doc.get("domain", {}).get("subdomains", {})).get(sid, {})
                if suffix.startswith("tools"):
                    check(bool(support.get("items")), sid, "missing supporting tools/standards")
                else:
                    for cid in sub.get("competencies") or {}:
                        check(cid in support.get("competencies", {}), cid, f"missing {suffix} entry")

    mapping = documents.get("satre_mapping.yaml", {})
    component_ids = set()
    check(bool(mapping.get("pillars")), "SATRE", "missing pillars")
    for pillar in mapping.get("pillars", []):
        for component in pillar.get("components", []):
            ref = component.get("id")
            check(ref not in component_ids, "SATRE", f"duplicate component ID {ref}")
            component_ids.add(ref)
            for did, subs in component.get("mappings", {}).items():
                check(did in domains, ref, f"unknown domain {did}")
                for sid, comps in subs.items():
                    main = domains.get(did, {}).get("subdomains", {})
                    check(sid in main, ref, f"unknown subdomain {sid}")
                    for cid in comps:
                        check(cid in (main.get(sid, {}).get("competencies") or {}), ref, f"unknown competency {cid}")
    return errors, len(documents), count


def main():
    errors, files, count = validate()
    for error in errors:
        print(f"[FAIL] {error}")
    print(f"Validated {files} YAML files and {count} competencies; {len(errors)} errors.")
    return bool(errors)


if __name__ == "__main__":
    sys.exit(main())
