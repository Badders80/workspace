import type { SupabaseClient } from "@supabase/supabase-js";
import { convertFromNzd, getDisplayRate } from "@/modules/currency/service";
import type { CounterOfferValues, OfferFormValues } from "@/modules/offers/schema";
import type { MarketplaceListingRecord, OfferRecord } from "@/modules/listings/types";
import { buildManualPaymentInstruction } from "@/modules/payments/adapter";
import type { Database } from "@/types/database";

export async function submitOffer(
  supabase: SupabaseClient<Database>,
  listing: MarketplaceListingRecord,
  investorProfileId: string,
  values: OfferFormValues,
) {
  const totalOfferNzd = values.offeredPercentage * listing.pricePerPercentageNzd;
  const displayRate = getDisplayRate(values.displayCurrency);
  const displayTotalAmount = convertFromNzd(totalOfferNzd, values.displayCurrency);

  const { data, error } = await supabase
    .from("offers")
    .insert({
      display_currency: values.displayCurrency,
      display_currency_rate: displayRate,
      display_total_amount: displayTotalAmount,
      fees_nzd: 0,
      horse_id: listing.horse.id,
      investor_profile_id: investorProfileId,
      listing_id: listing.id,
      message: values.message || null,
      offered_percentage: values.offeredPercentage,
      owner_profile_id: listing.ownerProfileId!,
      total_offer_nzd: totalOfferNzd,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  await supabase.from("offer_events").insert({
    actor_profile_id: investorProfileId,
    event_type: "submitted",
    offer_id: data.id,
    notes: values.message || null,
  });

  return data.id;
}

export async function acceptOffer(
  supabase: SupabaseClient<Database>,
  offer: OfferRecord,
  actorProfileId: string,
) {
  const { error: offerError } = await supabase
    .from("offers")
    .update({
      reviewed_at: new Date().toISOString(),
      status: "accepted",
    })
    .eq("id", offer.id)
    .eq("owner_profile_id", actorProfileId);

  if (offerError) {
    throw offerError;
  }

  await supabase.from("offer_events").insert({
    actor_profile_id: actorProfileId,
    event_type: "accepted",
    offer_id: offer.id,
  });

  const instruction = buildManualPaymentInstruction(offer);

  const { error: transactionError } = await supabase.from("transactions").upsert(
    {
      horse_id: offer.horseId,
      instruction_due_at: instruction.dueAt,
      instructions_summary: instruction.summary,
      investor_profile_id: offer.investorProfileId,
      listing_id: offer.listingId,
      offer_id: offer.id,
      owner_profile_id: offer.ownerProfileId,
      payment_provider: instruction.provider,
      payment_reference: instruction.reference,
      state: "payment_instruction_required",
    },
    {
      onConflict: "offer_id",
    },
  );

  if (transactionError) {
    throw transactionError;
  }
}

export async function declineOffer(
  supabase: SupabaseClient<Database>,
  offerId: string,
  actorProfileId: string,
) {
  const { error } = await supabase
    .from("offers")
    .update({
      reviewed_at: new Date().toISOString(),
      status: "declined",
    })
    .eq("id", offerId)
    .eq("owner_profile_id", actorProfileId);

  if (error) {
    throw error;
  }

  await supabase.from("offer_events").insert({
    actor_profile_id: actorProfileId,
    event_type: "declined",
    offer_id: offerId,
  });
}

export async function counterOffer(
  supabase: SupabaseClient<Database>,
  offerId: string,
  actorProfileId: string,
  values: CounterOfferValues,
) {
  const { error } = await supabase
    .from("offers")
    .update({
      counter_message: values.counterMessage || null,
      counter_percentage_of_horse: values.counterPercentageOfHorse,
      counter_price_per_percentage_nzd: values.counterPricePerPercentageNzd,
      counter_total_nzd:
        values.counterPercentageOfHorse * values.counterPricePerPercentageNzd,
      countered_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
      status: "countered",
    })
    .eq("id", offerId)
    .eq("owner_profile_id", actorProfileId);

  if (error) {
    throw error;
  }

  await supabase.from("offer_events").insert({
    actor_profile_id: actorProfileId,
    event_type: "countered",
    offer_id: offerId,
    notes: values.counterMessage || null,
  });
}

export async function acceptCounterOffer(
  supabase: SupabaseClient<Database>,
  offer: OfferRecord,
  actorProfileId: string,
) {
  const acceptedPercentage = offer.counterPercentageOfHorse ?? offer.offeredPercentage;
  const acceptedTotal = offer.counterTotalNzd ?? offer.totalOfferNzd;

  const { error } = await supabase
    .from("offers")
    .update({
      offered_percentage: acceptedPercentage,
      reviewed_at: new Date().toISOString(),
      status: "accepted",
      total_offer_nzd: acceptedTotal,
    })
    .eq("id", offer.id)
    .eq("investor_profile_id", actorProfileId);

  if (error) {
    throw error;
  }

  await supabase.from("offer_events").insert({
    actor_profile_id: actorProfileId,
    event_type: "accepted",
    offer_id: offer.id,
    notes: "Counter offer accepted by investor.",
  });

  const instruction = buildManualPaymentInstruction({
    ...offer,
    offeredPercentage: acceptedPercentage,
    status: "accepted",
    totalOfferNzd: acceptedTotal,
  });

  const { error: transactionError } = await supabase.from("transactions").upsert(
    {
      horse_id: offer.horseId,
      instruction_due_at: instruction.dueAt,
      instructions_summary: instruction.summary,
      investor_profile_id: offer.investorProfileId,
      listing_id: offer.listingId,
      offer_id: offer.id,
      owner_profile_id: offer.ownerProfileId,
      payment_provider: instruction.provider,
      payment_reference: instruction.reference,
      state: "payment_instruction_required",
    },
    {
      onConflict: "offer_id",
    },
  );

  if (transactionError) {
    throw transactionError;
  }
}
