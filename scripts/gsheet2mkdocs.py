import pandas as pd
from dotenv import load_dotenv, find_dotenv
import os
from pathlib import Path
import re

load_dotenv(find_dotenv())

sheet_id = os.environ["GSHEET_ID"]
sheet_name = os.environ["GSHEET_NAME"]

dir_docs = Path(__file__).parent.joinpath("..", "docs")
print(__file__)

url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

# load from local cache if available
local_cache = Path(__file__).joinpath("..", "local", "data.csv")

if local_cache.exists():
    print(f"Loading from local cache: {local_cache}")
    url = local_cache.absolute()


df = pd.read_csv(
    url,
    usecols=[
        "Item",
        "Key Area",
        "Competency Domain",
        "Entry-level",
        "Mid-level",
        "Senior-level",
    ],
)


df = df.rename(
    columns={
        "Item": "item",
        "Key Area": "key_area",
        "Competency Domain": "competency_domain",
        "Entry-level": "entry_level",
        "Mid-level": "mid_level",
        "Senior-level": "senior_level",
    }
)


df = df.fillna("")

df = (
    df.groupby(["item", "key_area", "competency_domain"])
    .agg(
        func={
            "entry_level": "\n\t- ".join,
            "mid_level": "\n\t- ".join,
            "senior_level": "\n\t- ".join,
        }
    )
    .reset_index()
)

nonalphanum = re.compile("[^a-zA-Z]+")

# Modify this to change the output format
item_template = """
### {item}

=== ":material-battery-10: Entry Level"

    - {entry_level}

=== ":material-battery-50: Mid Level"

    - {mid_level}

=== ":material-battery-90: Senior Level"

    - {senior_level}
"""

for cd in df.competency_domain.unique():
    try:
        fn = nonalphanum.sub("_", cd).lower() + ".md"
        with dir_docs.joinpath("skills_matrix", fn).open(mode="w") as f:
            f.write(f"# {cd}\n\n")
            for key_area in df[df.competency_domain == cd].key_area.unique():
                f.write(f"## {key_area}\n\n")
                for row in df.loc[
                    (df.competency_domain == cd) & (df.key_area == key_area)
                ].itertuples():
                    item = item_template.format(
                        item=row.item,
                        entry_level=row.entry_level,
                        mid_level=row.mid_level,
                        senior_level=row.senior_level,
                    ).replace("\t", "    ")
                    f.write(item)

    except Exception as e:
        print(str(e))
