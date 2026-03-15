"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { isDemoAuthEnabled } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fromFormValue, parseNumber } from "@/lib/utils";
import { getListingById } from "@/modules/listings/queries";
import { getOfferByIdForProfile } from "@/modules/offers/queries";
import { counterOfferSchema, offerFormSchema } from "@/modules/offers/schema";
import {
  acceptCounterOffer,
  acceptOffer,
  counterOffer,
  declineOffer,
  submitOffer,
} from "@/modules/offers/mutations";

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to complete the offer workflow.";
}

export async function submitOfferAction(formData: FormData) {
  const { profile } = await requireProfile();
  const listingId = fromFormValue(formData.get("listingId"));
  const listingSlug = fromFormValue(formData.get("listingSlug"));
  const returnPath =
    fromFormValue(formData.get("returnPath")) || `/marketplace/${listingSlug}/ticket`;

  if (profile.role !== "investor") {
    redirect(`${returnPath}?error=Only%20investors%20can%20submit%20offers`);
  }

  if (isDemoAuthEnabled) {
    redirect(
      `${returnPath}?message=Demo%20mode%20-%20ticket%20reviewed%20without%20persisting%20an%20offer`,
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(`${returnPath}?error=Configure%20Supabase%20first`);
  }

  try {
    const listing = await getListingById(listingId);

    if (!listing || !listing.ownerProfileId) {
      throw new Error("Listing unavailable for offer submission.");
    }

    const values = offerFormSchema.parse({
      displayCurrency: fromFormValue(formData.get("displayCurrency")),
      message: fromFormValue(formData.get("message")),
      offeredPercentage: parseNumber(fromFormValue(formData.get("offeredPercentage"))),
    });

    await submitOffer(supabase, listing, profile.id, values);
  } catch (error) {
    redirect(`${returnPath}?error=${encodeURIComponent(toErrorMessage(error))}`);
  }

  revalidatePath("/dashboard/offers");
  revalidatePath(`/marketplace/${listingSlug}`);
  redirect(`/dashboard/offers?message=Offer%20submitted`);
}

export async function respondToOfferAction(formData: FormData) {
  const { profile } = await requireProfile();
  const offerId = fromFormValue(formData.get("offerId"));
  const actionType = fromFormValue(formData.get("actionType"));

  if (isDemoAuthEnabled) {
    redirect(
      `/dashboard/offers/${offerId}?message=Demo%20mode%20-%20${encodeURIComponent(actionType || "action")}%20previewed%20without%20persisting`,
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(`/dashboard/offers/${offerId}?error=Configure%20Supabase%20first`);
  }

  try {
    const offer = await getOfferByIdForProfile(offerId, profile.id);

    if (!offer) {
      throw new Error("Offer not found.");
    }

    if (actionType === "accept") {
      await acceptOffer(supabase, offer, profile.id);
    } else if (actionType === "decline") {
      await declineOffer(supabase, offerId, profile.id);
    } else if (actionType === "counter") {
      const values = counterOfferSchema.parse({
        counterMessage: fromFormValue(formData.get("counterMessage")),
        counterPercentageOfHorse: parseNumber(
          fromFormValue(formData.get("counterPercentageOfHorse")),
        ),
        counterPricePerPercentageNzd: parseNumber(
          fromFormValue(formData.get("counterPricePerPercentageNzd")),
        ),
      });

      await counterOffer(supabase, offerId, profile.id, values);
    } else if (actionType === "accept-counter") {
      await acceptCounterOffer(supabase, offer, profile.id);
    } else {
      throw new Error("Unknown offer action.");
    }
  } catch (error) {
    redirect(`/dashboard/offers/${offerId}?error=${encodeURIComponent(toErrorMessage(error))}`);
  }

  revalidatePath("/dashboard/offers");
  revalidatePath("/dashboard/transactions");
  revalidatePath(`/dashboard/offers/${offerId}`);
  revalidatePath("/dashboard/ownership");
  redirect(`/dashboard/offers/${offerId}?message=Offer%20updated`);
}
