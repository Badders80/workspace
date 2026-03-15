import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  demoListings,
  getDemoListingById,
  getDemoListingBySlug,
} from "@/modules/ingestion/demo-fixtures";
import type {
  ListingDocumentRecord,
  ListingMediaRecord,
  MarketplaceListingRecord,
} from "@/modules/listings/types";

const listingSelect = `
  id,
  slug,
  headline,
  summary,
  status,
  percentage_available,
  price_per_percentage_nzd,
  minimum_purchase_percentage,
  estimated_monthly_fee_nzd,
  offering_structure,
  offer_notes,
  published_at,
  owner_profile_id,
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
  ),
  media:listing_media (
    id,
    url,
    alt_text,
    is_cover,
    sort_order
  ),
  documents:listing_documents (
    id,
    title,
    kind,
    external_url
  )
`;

function mapListingMedia(items: Array<Record<string, unknown>> | null): ListingMediaRecord[] {
  return (items ?? []).map((item) => ({
    id: String(item.id),
    url: String(item.url),
    altText: item.alt_text ? String(item.alt_text) : null,
    isCover: Boolean(item.is_cover),
    sortOrder: Number(item.sort_order ?? 0),
  }));
}

function mapListingDocuments(
  items: Array<Record<string, unknown>> | null,
): ListingDocumentRecord[] {
  return (items ?? []).map((item) => ({
    id: String(item.id),
    title: String(item.title),
    kind: item.kind as ListingDocumentRecord["kind"],
    externalUrl: item.external_url ? String(item.external_url) : null,
  }));
}

function mapListingRow(row: Record<string, unknown>): MarketplaceListingRecord {
  const horse = row.horse as Record<string, unknown>;

  return {
    id: String(row.id),
    slug: String(row.slug),
    headline: String(row.headline),
    summary: row.summary ? String(row.summary) : null,
    status: row.status as MarketplaceListingRecord["status"],
    percentageAvailable: Number(row.percentage_available),
    pricePerPercentageNzd: Number(row.price_per_percentage_nzd),
    minimumPurchasePercentage: Number(row.minimum_purchase_percentage),
    estimatedMonthlyFeeNzd:
      row.estimated_monthly_fee_nzd === null
        ? null
        : Number(row.estimated_monthly_fee_nzd),
    offeringStructure: row.offering_structure as MarketplaceListingRecord["offeringStructure"],
    offerNotes: row.offer_notes ? String(row.offer_notes) : null,
    publishedAt: row.published_at ? String(row.published_at) : null,
    ownerProfileId: row.owner_profile_id ? String(row.owner_profile_id) : null,
    horse: {
      id: String(horse.id),
      slug: String(horse.slug),
      name: String(horse.name),
      sire: horse.sire ? String(horse.sire) : null,
      dam: horse.dam ? String(horse.dam) : null,
      damsire: horse.damsire ? String(horse.damsire) : null,
      sex: horse.sex as MarketplaceListingRecord["horse"]["sex"],
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
    },
    media: mapListingMedia(row.media as Array<Record<string, unknown>> | null),
    documents: mapListingDocuments(row.documents as Array<Record<string, unknown>> | null),
  };
}

export async function getPublishedListings() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoListings;
  }

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapListingRow(row as Record<string, unknown>));
}

export async function getMarketplaceListingBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return getDemoListingBySlug(slug);
  }

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapListingRow(data as Record<string, unknown>) : null;
}

export async function getOwnerListings(profileId: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoListings.filter((listing) => listing.ownerProfileId === profileId);
  }

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("owner_profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapListingRow(row as Record<string, unknown>));
}

export async function getOwnerListingById(listingId: string, ownerProfileId: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    const listing = getDemoListingById(listingId);
    return listing?.ownerProfileId === ownerProfileId ? listing : null;
  }

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("id", listingId)
    .eq("owner_profile_id", ownerProfileId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapListingRow(data as Record<string, unknown>) : null;
}

export async function getListingById(listingId: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return getDemoListingById(listingId);
  }

  const { data, error } = await supabase
    .from("listings")
    .select(listingSelect)
    .eq("id", listingId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapListingRow(data as Record<string, unknown>) : null;
}
