"""Read the attributed, immutable SATRE source snapshot (no network at build time)."""

from collections import OrderedDict

VERSION = "2.0.1"
COMMIT = "133b4af7f3c69586a8fe3da7d5d06685158fe473"
SHA256 = "3ee191d5c451e1ca4b5a603f8f18dee82f8e59859ae3440f8e396adec66bef2f"
SOURCE_PATH = "satre/specification-2.0.1.yaml"
SOURCE_URL = f"https://github.com/sa-tre/satre-specification/blob/{COMMIT}/docs/source/spec/specification.yaml"
FEDERATION_CAVEAT = (
    "Federation is a recent addition to the SATRE standard. We have included a mapping "
    "from the initial version of the SDE RTP framework, but have not added to the "
    "framework in response to the additions to SATRE."
)


def inventory(source):
    """Group every official statement without rewriting its text or importance."""
    pillars = OrderedDict()
    for row in source["specification"]:
        cid = row["capability_index"]
        pid = cid.split(".")[0]
        pillar = pillars.setdefault(
            pid,
            {
                "id": pid,
                "name": f"{pid}. {row['pillar']}",
                "scope": "federation" if pid == "5" else "core",
                "components": {},
            },
        )
        component = pillar["components"].setdefault(
            cid,
            {
                "id": cid,
                "name": row["capability"],
                "requirements": [],
            },
        )
        component["requirements"].append(
            {
                "id": row["requirement_index"],
                "statement": row["statement"],
                "guidance": row["guidance"],
                "importance": row["importance"],
                "architecture_url": row["architecture_url"],
                "applicability": {
                    "scope": pillar["scope"],
                    "conditional": row["importance"].endswith("*"),
                    "assessment": "pending",
                },
                "mapping_review_status": "pending",
            }
        )
    for pillar in pillars.values():
        pillar["components"] = list(pillar["components"].values())
    return list(pillars.values())
