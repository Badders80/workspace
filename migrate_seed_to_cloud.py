import json
import os
from pathlib import Path

from google.cloud import firestore


PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "evolution-engine")
SEED_PATH = Path(
    os.getenv("SSOT_SEED_PATH", "projects/SSOT_Build/intake/v0.1/seed.json")
)

# Initialize Firestore using application-default credentials.
db = firestore.Client(project=PROJECT_ID)

SECTION_ID_FIELDS = {
    "trainers": ["trainer_id"],
    "owners": ["owner_id"],
    "governingBodies": ["governing_body_code"],
    "horses": ["horse_id", "microchip_number", "nztr_life_number"],
    "leases": ["lease_id"],
    "documents": ["document_id"],
    "intakeQueue": ["intake_id"],
    "amendments": ["amendment_id"],
}


def choose_doc_id(section, item, index):
    for field in SECTION_ID_FIELDS.get(section, []):
        value = item.get(field)
        if value:
            return str(value)
    fallback = item.get("id") or item.get("name")
    if fallback:
        return str(fallback)
    return f"{section}-{index:04d}"


def migrate_ssot_data(json_file_path):
    print(f"Reading local SSOT data from: {json_file_path}")

    with open(json_file_path, "r", encoding="utf-8") as file:
        seed_data = json.load(file)

    if not isinstance(seed_data, dict):
        raise ValueError("Expected seed.json to be a top-level object keyed by section.")

    migrated_counts = {}

    for section, payload in seed_data.items():
        if section == "_meta":
            db.collection("ssot_meta").document("current").set(payload)
            migrated_counts["ssot_meta/current"] = 1
            print("✅ Wrote ssot_meta/current")
            continue

        if isinstance(payload, list):
            collection_ref = db.collection(section)
            if not payload:
                migrated_counts[section] = 0
                print(f"ℹ️  {section}: no records to migrate")
                continue

            for index, item in enumerate(payload, start=1):
                if isinstance(item, dict):
                    doc_id = choose_doc_id(section, item, index)
                    collection_ref.document(doc_id).set(item)
                    print(f"✅ {section}/{doc_id}")
                else:
                    doc_id = f"{section}-{index:04d}"
                    collection_ref.document(doc_id).set({"value": item})
                    print(f"✅ {section}/{doc_id}")

            migrated_counts[section] = len(payload)
            continue

        if isinstance(payload, dict):
            collection_ref = db.collection(section)
            for key, value in payload.items():
                doc_data = value if isinstance(value, dict) else {"value": value}
                collection_ref.document(str(key)).set(doc_data)
                print(f"✅ {section}/{key}")
            migrated_counts[section] = len(payload)
            continue

        db.collection("ssot_misc").document(section).set({"value": payload})
        migrated_counts[f"ssot_misc/{section}"] = 1
        print(f"✅ ssot_misc/{section}")

    db.collection("ssot_meta").document("manifest").set(
        {
            "project": PROJECT_ID,
            "seed_path": str(json_file_path),
            "section_counts": migrated_counts,
        }
    )

    print("\n🚀 Migration complete.")
    print("Firestore collections now mirror the SSOT seed sections:")
    for section, count in migrated_counts.items():
        print(f"  - {section}: {count}")


if __name__ == "__main__":
    if SEED_PATH.exists():
        migrate_ssot_data(SEED_PATH)
    else:
        print(f"File not found at {SEED_PATH}. Please check the path.")
