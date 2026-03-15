import { createServerSupabaseClient } from "@/lib/supabase/server";
import { demoOffers } from "@/modules/ingestion/demo-fixtures";
import { getOwnerListingById } from "@/modules/listings/queries";
import type { OfferRecord } from "@/modules/listings/types";

const offerSelect = `
  id,
  listing_id,
  horse_id,
  owner_profile_id,
  investor_profile_id,
  status,
  offered_percentage,
  total_offer_nzd,
  display_currency,
  display_total_amount,
  message,
  submitted_at,
  reviewed_at,
  counter_percentage_of_horse,
  counter_price_per_percentage_nzd,
  counter_total_nzd,
  counter_message,
  countered_at
`;

function mapOfferRow(row: Record<string, unknown>): OfferRecord {
  return {
    id: String(row.id),
    listingId: String(row.listing_id),
    horseId: String(row.horse_id),
    ownerProfileId: String(row.owner_profile_id),
    investorProfileId: String(row.investor_profile_id),
    status: row.status as OfferRecord["status"],
    offeredPercentage: Number(row.offered_percentage),
    totalOfferNzd: Number(row.total_offer_nzd),
    displayCurrency: row.display_currency as OfferRecord["displayCurrency"],
    displayTotalAmount:
      row.display_total_amount === null ? null : Number(row.display_total_amount),
    message: row.message ? String(row.message) : null,
    submittedAt: String(row.submitted_at),
    reviewedAt: row.reviewed_at ? String(row.reviewed_at) : null,
    counterPercentageOfHorse:
      row.counter_percentage_of_horse === null
        ? null
        : Number(row.counter_percentage_of_horse),
    counterPricePerPercentageNzd:
      row.counter_price_per_percentage_nzd === null
        ? null
        : Number(row.counter_price_per_percentage_nzd),
    counterTotalNzd:
      row.counter_total_nzd === null ? null : Number(row.counter_total_nzd),
    counterMessage: row.counter_message ? String(row.counter_message) : null,
    counteredAt: row.countered_at ? String(row.countered_at) : null,
  };
}

export async function getOffersForProfile(profileId: string, role: "owner" | "investor") {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoOffers.filter((offer) =>
      role === "owner"
        ? offer.ownerProfileId === profileId
        : offer.investorProfileId === profileId,
    );
  }

  const column = role === "owner" ? "owner_profile_id" : "investor_profile_id";

  const { data, error } = await supabase
    .from("offers")
    .select(offerSelect)
    .eq(column, profileId)
    .order("submitted_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapOfferRow(row as Record<string, unknown>));
}

export async function getOfferByIdForProfile(offerId: string, profileId: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    const offer =
      demoOffers.find(
        (item) =>
          item.id === offerId &&
          (item.ownerProfileId === profileId || item.investorProfileId === profileId),
      ) ?? null;

    if (!offer) {
      return null;
    }

    if (offer.ownerProfileId === profileId) {
      offer.listing = await getOwnerListingById(offer.listingId, profileId);
    }

    return offer;
  }

  const { data, error } = await supabase
    .from("offers")
    .select(offerSelect)
    .eq("id", offerId)
    .or(`owner_profile_id.eq.${profileId},investor_profile_id.eq.${profileId}`)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const offer = mapOfferRow(data as Record<string, unknown>);

  if (offer.ownerProfileId === profileId) {
    offer.listing = await getOwnerListingById(offer.listingId, profileId);
  }

  return offer;
}
