import { createServerSupabaseClient } from "@/lib/supabase/server";
import { demoOwnershipPositions } from "@/modules/ingestion/demo-fixtures";
import type { HorseSex } from "@/types/database";

const ownershipSelect = `
  id,
  horse_id,
  profile_id,
  percentage_owned,
  average_cost_nzd,
  horse:horses (
    id,
    slug,
    name,
    sire,
    dam,
    damsire,
    sex,
    foaled_on,
    colour,
    trainer_name,
    vendor_name,
    location,
    overview,
    pedigree_notes,
    highlight_text,
    source_reference_label,
    source_reference_url,
    source_notes
  )
`;

export async function getOwnershipPositions(profileId: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoOwnershipPositions.filter((position) => position.profileId === profileId);
  }

  const { data, error } = await supabase
    .from("ownership_positions")
    .select(ownershipSelect)
    .eq("profile_id", profileId)
    .order("percentage_owned", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => {
    const horse = (row as unknown as { horse: Record<string, unknown> | null }).horse;

    return {
      id: String(row.id),
      horseId: String(row.horse_id),
      profileId: String(row.profile_id),
      percentageOwned: Number(row.percentage_owned),
      averageCostNzd:
        row.average_cost_nzd === null ? null : Number(row.average_cost_nzd),
      horse: horse
        ? {
            id: String(horse.id),
            slug: String(horse.slug),
            name: String(horse.name),
            sire: horse.sire ? String(horse.sire) : null,
            dam: horse.dam ? String(horse.dam) : null,
            damsire: horse.damsire ? String(horse.damsire) : null,
            sex: horse.sex as HorseSex,
            foaledOn: horse.foaled_on ? String(horse.foaled_on) : null,
            colour: horse.colour ? String(horse.colour) : null,
            trainerName: horse.trainer_name ? String(horse.trainer_name) : null,
            vendorName: horse.vendor_name ? String(horse.vendor_name) : null,
            location: horse.location ? String(horse.location) : null,
            overview: horse.overview ? String(horse.overview) : null,
            pedigreeNotes: horse.pedigree_notes ? String(horse.pedigree_notes) : null,
            highlightText: horse.highlight_text ? String(horse.highlight_text) : null,
            sourceReferenceLabel: horse.source_reference_label
              ? String(horse.source_reference_label)
              : null,
            sourceReferenceUrl: horse.source_reference_url
              ? String(horse.source_reference_url)
              : null,
            sourceNotes: horse.source_notes ? String(horse.source_notes) : null,
          }
        : null,
    };
  });
}
