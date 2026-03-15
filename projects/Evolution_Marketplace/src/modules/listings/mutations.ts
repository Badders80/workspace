import type { SupabaseClient } from "@supabase/supabase-js";
import { toSlug } from "@/lib/utils";
import type { ListingFormValues } from "@/modules/listings/schema";
import type { Database } from "@/types/database";

async function replaceListingMedia(
  supabase: SupabaseClient<Database>,
  listingId: string,
  urls: string[],
  altText: string,
) {
  await supabase.from("listing_media").delete().eq("listing_id", listingId);

  const mediaRows = urls.map((url, index) => ({
    listing_id: listingId,
    alt_text: altText,
    is_cover: index === 0,
    url,
    sort_order: index,
  }));

  const { error } = await supabase.from("listing_media").insert(mediaRows);

  if (error) {
    throw error;
  }
}

async function replaceListingDocuments(
  supabase: SupabaseClient<Database>,
  listingId: string,
  urls: string[],
) {
  await supabase.from("listing_documents").delete().eq("listing_id", listingId);

  if (!urls.length) {
    return;
  }

  const { error } = await supabase.from("listing_documents").insert(
    urls.map((url, index) => ({
      listing_id: listingId,
      title: index === 0 ? "Supporting Document" : `Supporting Document ${index + 1}`,
      kind: index === 0 ? ("offering-brief" as const) : ("terms" as const),
      external_url: url,
      sort_order: index,
    })),
  );

  if (error) {
    throw error;
  }
}

export async function createListingWithHorse(
  supabase: SupabaseClient<Database>,
  ownerProfileId: string,
  values: ListingFormValues,
) {
  const horseSlug = toSlug(values.horseName);

  const { data: horse, error: horseError } = await supabase
    .from("horses")
    .insert({
      colour: values.colour || null,
      dam: values.dam || null,
      damsire: values.damsire || null,
      foaled_on: values.foaledOn || null,
      highlight_text: values.highlightText || null,
      location: values.location || null,
      name: values.horseName,
      overview: values.overview,
      pedigree_notes: values.pedigreeNotes || null,
      sex: values.sex,
      sire: values.sire || null,
      slug: horseSlug,
      source_notes: values.sourceNotes || null,
      source_reference_label: values.sourceReferenceLabel || null,
      source_reference_url: values.sourceReferenceUrl || null,
      trainer_name: values.trainerName || null,
      vendor_name: values.vendorName || null,
    })
    .select("id, slug, name")
    .single();

  if (horseError) {
    throw horseError;
  }

  const listingSlug = horse.slug;

  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .insert({
      estimated_monthly_fee_nzd: values.estimatedMonthlyFeeNzd,
      headline: values.headline,
      horse_id: horse.id,
      minimum_purchase_percentage: values.minimumPurchasePercentage,
      offer_notes: values.offerNotes || null,
      offering_structure: values.offeringStructure,
      owner_profile_id: ownerProfileId,
      percentage_available: values.percentageAvailable,
      price_per_percentage_nzd: values.pricePerPercentageNzd,
      published_at: values.status === "published" ? new Date().toISOString() : null,
      slug: listingSlug,
      status: values.status,
      summary: values.summary,
    })
    .select("id")
    .single();

  if (listingError) {
    throw listingError;
  }

  await replaceListingMedia(supabase, listing.id, values.mediaUrls, values.horseName);
  await replaceListingDocuments(supabase, listing.id, values.documentUrls);

  await supabase.from("ownership_positions").upsert(
    {
      average_cost_nzd: 0,
      horse_id: horse.id,
      percentage_owned: 100,
      profile_id: ownerProfileId,
    },
    {
      onConflict: "horse_id,profile_id",
    },
  );

  return listing.id;
}

export async function updateListingWithHorse(
  supabase: SupabaseClient<Database>,
  listingId: string,
  ownerProfileId: string,
  values: ListingFormValues,
) {
  const { data: existing, error: existingError } = await supabase
    .from("listings")
    .select("id, horse_id")
    .eq("id", listingId)
    .eq("owner_profile_id", ownerProfileId)
    .single();

  if (existingError) {
    throw existingError;
  }

  const horseSlug = toSlug(values.horseName);

  const { error: horseError } = await supabase
    .from("horses")
    .update({
      colour: values.colour || null,
      dam: values.dam || null,
      damsire: values.damsire || null,
      foaled_on: values.foaledOn || null,
      highlight_text: values.highlightText || null,
      location: values.location || null,
      name: values.horseName,
      overview: values.overview,
      pedigree_notes: values.pedigreeNotes || null,
      sex: values.sex,
      sire: values.sire || null,
      slug: horseSlug,
      source_notes: values.sourceNotes || null,
      source_reference_label: values.sourceReferenceLabel || null,
      source_reference_url: values.sourceReferenceUrl || null,
      trainer_name: values.trainerName || null,
      vendor_name: values.vendorName || null,
    })
    .eq("id", existing.horse_id);

  if (horseError) {
    throw horseError;
  }

  const { error: listingError } = await supabase
    .from("listings")
    .update({
      estimated_monthly_fee_nzd: values.estimatedMonthlyFeeNzd,
      headline: values.headline,
      minimum_purchase_percentage: values.minimumPurchasePercentage,
      offer_notes: values.offerNotes || null,
      offering_structure: values.offeringStructure,
      percentage_available: values.percentageAvailable,
      price_per_percentage_nzd: values.pricePerPercentageNzd,
      published_at: values.status === "published" ? new Date().toISOString() : null,
      slug: horseSlug,
      status: values.status,
      summary: values.summary,
    })
    .eq("id", listingId)
    .eq("owner_profile_id", ownerProfileId);

  if (listingError) {
    throw listingError;
  }

  await replaceListingMedia(supabase, listingId, values.mediaUrls, values.horseName);
  await replaceListingDocuments(supabase, listingId, values.documentUrls);
}
