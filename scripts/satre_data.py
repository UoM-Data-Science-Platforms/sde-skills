"""Compile display metadata from canonical framework definitions and relationships."""

from copy import deepcopy


def compile_satre(mapping, domains):
    """Keep source evidence intact; project labels for existing matrix consumers."""
    result = deepcopy(mapping)
    colors = {
        "safe-technology-engineering": "var(--color-nhs-blue)",
        "safe-data-management": "var(--color-purple)",
        "safe-access-identity": "var(--color-deep-blue)",
        "safe-outputs-disclosure-control": "var(--color-deep-blue)",
        "safe-projects-operations": "var(--color-purple)",
        "safe-governance-compliance": "var(--color-nhs-blue)",
    }
    result["domains"], result["subdomains"], result["competencies"] = [], [], {}
    for did, domain in sorted(domains.items(), key=lambda item: item[1]["index"]):
        color = colors.get(did, "var(--color-text)")
        result["domains"].append(
            {
                "id": did,
                "name": domain["name"],
                "color": color,
                "span": len(domain["subdomains"]),
            }
        )
        for sid, sub in domain["subdomains"].items():
            result["subdomains"].append(
                {
                    "id": sid,
                    "name": sub["name"],
                    "domainId": did,
                    "domain": domain["name"],
                    "color": color,
                }
            )
            for cid, competency in sub["competencies"].items():
                result["competencies"][cid] = {
                    "id": cid,
                    "name": competency["name"],
                    "domainId": did,
                    "subdomainId": sid,
                }
    project_relationships(result)
    return result


def project_relationships(result):
    """Project requirement links and unique capability-level competency labels."""
    capabilities = {c["id"]: c for p in result["pillars"] for c in p["components"]}
    for capability in capabilities.values():
        capability["mappings"] = {}
        for requirement in capability["requirements"]:
            requirement["mapped_competency_ids"] = []
    requirements = {
        r["id"]: r for c in capabilities.values() for r in c["requirements"]
    }
    # IDs and full evidence remain in top-level relationships. This label projection
    # is generated, never edited or used as evidence of substantive alignment.
    projected = set()
    for r in result["relationships"]:
        if r["review"]["status"] == "rejected":
            continue
        for ref in r["requirement_ids"]:
            ids = requirements[ref]["mapped_competency_ids"]
            if r["competency_id"] not in ids:
                ids.append(r["competency_id"])
        key = (r["capability_id"], r["competency_id"])
        if key in projected:
            continue
        projected.add(key)
        competency = result["competencies"][r["competency_id"]]
        if (competency["domainId"], competency["subdomainId"]) != (
            r["domain_id"],
            r["subdomain_id"],
        ):
            raise ValueError(f"{r['id']}: wrongly parented competency")
        labels = (
            capabilities[r["capability_id"]]["mappings"]
            .setdefault(r["domain_id"], {})
            .setdefault(r["subdomain_id"], [])
        )
        labels.append(competency["name"])
