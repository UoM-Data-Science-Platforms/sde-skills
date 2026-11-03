"""Source inventory checks shared by validation and generation."""
import hashlib
import re
import json
from datetime import date

import jsonschema

from satre_source import COMMIT, SHA256, SOURCE_PATH, SOURCE_URL, VERSION, FEDERATION_CAVEAT, inventory


def validate_source(mapping, root, load_yaml):
    errors = []

    def check(condition, where, message):
        if not condition:
            errors.append(f"SATRE/{where}: {message}")

    source = mapping.get("source", {})
    if not isinstance(source, dict):
        return ['SATRE/source: expected an object']
    check(source.get("version") == VERSION, "source", "expected SATRE 2.0.1")
    check(source.get("commit") == COMMIT and source.get("url") == SOURCE_URL,
          "source", "expected pinned source commit and URL")
    check(source.get("snapshot") == SOURCE_PATH, "source", "unexpected snapshot path")
    snapshot = root / SOURCE_PATH
    if not snapshot.exists():
        return errors + [f"SATRE/source: missing snapshot {snapshot}"]
    digest = hashlib.sha256(snapshot.read_text(encoding="utf-8").encode()).hexdigest()
    check(source.get("sha256") == digest == SHA256, "source", "snapshot SHA-256 mismatch (LF-normalized UTF-8)")
    if digest != SHA256:
        return errors
    check(bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(source.get("inventory_checked_on", "")))),
          "source", "missing inventory check date")
    check(source.get("release_date") == "2026-07-23", "source", "incorrect release date")
    check(mapping.get("federation_caveat") == FEDERATION_CAVEAT, "federation", "missing agreed caveat")
    expected = inventory(load_yaml(snapshot))
    actual = mapping.get("pillars", [])
    check(isinstance(actual, list), "pillars", "expected a list")
    if not isinstance(actual, list):
        return errors
    check([p.get("id") for p in actual if isinstance(p, dict)] == [p["id"] for p in expected],
          "pillars", "missing, duplicate or out-of-order official pillars")
    for ep, ap in zip(expected, actual):
        if not isinstance(ap, dict):
            check(False, "pillar", "expected an object")
            continue
        check(all(ap.get(k) == ep[k] for k in ("id", "name", "scope")), ep["id"], "incorrect pillar metadata")
        if ep["scope"] == "federation":
            check(ap.get("caveat") == FEDERATION_CAVEAT, ep["id"], "missing federation caveat")
        components = ap.get("components", [])
        if not isinstance(components, list):
            check(False, ep["id"], "components must be a list")
            continue
        check([c.get("id") for c in components if isinstance(c, dict)] == [c["id"] for c in ep["components"]],
              ep["id"], "missing, duplicate or wrongly parented official capabilities")
        for ec, ac in zip(ep["components"], components):
            if not isinstance(ac, dict):
                check(False, ep["id"], "capability must be an object")
                continue
            where = ec["id"]
            check('mappings' not in ac, where, 'edit canonical relationships; mappings are generated output only')
            check(ac.get("name") == ec["name"], where, "incorrect official capability name")
            requirements = ac.get("requirements", [])
            if not isinstance(requirements, list):
                check(False, where, "requirements must be a list")
                continue
            check([r.get("id") for r in requirements if isinstance(r, dict)] == [r["id"] for r in ec["requirements"]],
                  where, "missing, duplicate or wrongly parented official requirements")
            for er, ar in zip(ec["requirements"], requirements):
                if not isinstance(ar, dict):
                    check(False, where, "requirement must be an object")
                    continue
                check(all(ar.get(k) == er[k] for k in ("id", "statement", "guidance", "importance", "architecture_url")),
                      er["id"], "official requirement text, importance or source differs from pinned inventory")
                applicability = ar.get("applicability", {})
                check(isinstance(applicability, dict) and all(applicability.get(k) == er["applicability"][k] for k in ("scope", "conditional")),
                      er["id"], "incorrect applicability scope or conditional flag")
                check(ar.get("mapping_review_status") in ("pending", "reviewed", "gap", "excluded"),
                      er["id"], "invalid mapping review status")
                check(isinstance(applicability, dict) and applicability.get('assessment') in ('pending', 'applicable', 'excluded'),
                      er['id'], 'invalid applicability assessment')
    return errors


def validate_relationships(mapping, domains, root):
    """Validate canonical parentage, review claims and lossless legacy provenance."""
    schema = json.loads((root / 'satre/relationship-schema.json').read_text(encoding='utf-8'))
    schema_errors = sorted(jsonschema.Draft7Validator(schema).iter_errors(mapping), key=lambda e: str(list(e.path)))
    if schema_errors:
        return [f"SATRE/{'/'.join(map(str, e.path))}: {e.message}" for e in schema_errors]
    errors, seen, seen_ids = [], set(), set()
    capabilities = {c['id']: c for p in mapping['pillars'] for c in p['components']}
    legacy = {c['id']: c for c in mapping['legacy_components']}
    migrated = set()

    def check(condition, where, message):
        if not condition:
            errors.append(f'SATRE/{where}: {message}')

    for r in mapping['relationships']:
        where = r['id']
        key = (r['capability_id'], r['competency_id'])
        check(where not in seen_ids, where, 'duplicate relationship ID')
        seen_ids.add(where)
        check(key not in seen, where, 'duplicate relationship for capability and competency')
        seen.add(key)
        did, sid, cid = r['domain_id'], r['subdomain_id'], r['competency_id']
        check(did in domains, where, f'unknown domain {did}')
        subs = domains.get(did, {}).get('subdomains', {})
        check(sid in subs, where, f'unknown or wrongly parented subdomain {sid}')
        check(cid in subs.get(sid, {}).get('competencies', {}), where, f'unknown or wrongly parented competency {cid}')
        capability = capabilities.get(r['capability_id'])
        check(capability is not None, where, 'unknown SATRE capability')
        requirements = {req['id'] for req in (capability or {}).get('requirements', [])}
        for ref in r['requirement_ids']:
            check(ref in requirements, where, f'unknown or wrongly parented SATRE requirement {ref}')
        if r['review']['status'] in {'reviewed', 'rejected'}:
            for name, value in [('rationale', r['rationale']), ('reviewer', r['review']['reviewer'])]:
                check(isinstance(value, str) and bool(value.strip()) and not re.search(r'\b(TODO|TBD|FIXME|placeholder)\b', value, re.I),
                      where, f'{name} required for completed review')
            try:
                reviewed = date.fromisoformat(r['review']['reviewed_on'] or '')
                check(reviewed <= date.today(), where, 'review date is in the future')
            except (TypeError, ValueError):
                check(False, where, 'valid review date required for completed review')
        for old_id in r['legacy_component_ids']:
            old = legacy.get(old_id, {})
            old_comps = old.get('mappings', {}).get(did, {}).get(sid, [])
            check(cid in old_comps and r['capability_id'] in old.get('candidate_capability_ids', []),
                  where, f'invalid legacy provenance {old_id}')
            migrated.add((old_id, r['capability_id'], did, sid, cid))
    for old_id, old in legacy.items():
        for capability in old.get('candidate_capability_ids', []):
            check(capability in capabilities, old_id, f'unknown migration candidate {capability}')
            for did, subs in old.get('mappings', {}).items():
                for sid, comps in subs.items():
                    for cid in comps:
                        check((old_id, capability, did, sid, cid) in migrated, old_id,
                              f'legacy relationship lost in migration: {capability}/{did}/{sid}/{cid}')
    return errors
