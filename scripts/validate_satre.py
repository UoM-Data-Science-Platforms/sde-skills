"""Source inventory checks shared by validation and generation."""
import hashlib
import re

from satre_source import COMMIT, SHA256, SOURCE_PATH, SOURCE_URL, VERSION, FEDERATION_CAVEAT, inventory


def validate_source(mapping, root, load_yaml):
    errors = []

    def check(condition, where, message):
        if not condition:
            errors.append(f"SATRE/{where}: {message}")

    source = mapping.get("source", {})
    check(source.get("version") == VERSION, "source", "expected SATRE 2.0.1")
    check(source.get("commit") == COMMIT and source.get("url") == SOURCE_URL,
          "source", "expected pinned source commit and URL")
    check(source.get("snapshot") == SOURCE_PATH, "source", "unexpected snapshot path")
    snapshot = root / SOURCE_PATH
    if not snapshot.exists():
        return errors + [f"SATRE/source: missing snapshot {snapshot}"]
    digest = hashlib.sha256(snapshot.read_text(encoding="utf-8").encode()).hexdigest()
    check(source.get("sha256") == digest == SHA256, "source", "snapshot SHA-256 mismatch (LF-normalized UTF-8)")
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
                check(ar.get("mapping_review_status") in {"pending", "reviewed", "gap", "excluded"},
                      er["id"], "invalid mapping review status")
    return errors
