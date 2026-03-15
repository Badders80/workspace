"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { isDemoAuthEnabled } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fromFormValue, parseLines, parseNumber } from "@/lib/utils";
import {
  createListingWithHorse,
  updateListingWithHorse,
} from "@/modules/listings/mutations";
import { listingFormSchema } from "@/modules/listings/schema";

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to save listing.";
}

function parseListingForm(formData: FormData) {
  return listingFormSchema.parse({
    colour: fromFormValue(formData.get("colour")),
    dam: fromFormValue(formData.get("dam")),
    damsire: fromFormValue(formData.get("damsire")),
    documentUrls: parseLines(fromFormValue(formData.get("documentUrls"))),
    estimatedMonthlyFeeNzd: fromFormValue(formData.get("estimatedMonthlyFeeNzd"))
      ? parseNumber(fromFormValue(formData.get("estimatedMonthlyFeeNzd")))
      : null,
    foaledOn: fromFormValue(formData.get("foaledOn")),
    headline: fromFormValue(formData.get("headline")),
    highlightText: fromFormValue(formData.get("highlightText")),
    horseName: fromFormValue(formData.get("horseName")),
    location: fromFormValue(formData.get("location")),
    mediaUrls: parseLines(fromFormValue(formData.get("mediaUrls"))),
    minimumPurchasePercentage: parseNumber(
      fromFormValue(formData.get("minimumPurchasePercentage")),
    ),
    offerNotes: fromFormValue(formData.get("offerNotes")),
    offeringStructure: fromFormValue(formData.get("offeringStructure")),
    overview: fromFormValue(formData.get("overview")),
    pedigreeNotes: fromFormValue(formData.get("pedigreeNotes")),
    percentageAvailable: parseNumber(fromFormValue(formData.get("percentageAvailable"))),
    pricePerPercentageNzd: parseNumber(
      fromFormValue(formData.get("pricePerPercentageNzd")),
    ),
    sex: fromFormValue(formData.get("sex")) || "unknown",
    sire: fromFormValue(formData.get("sire")),
    sourceNotes: fromFormValue(formData.get("sourceNotes")),
    sourceReferenceLabel: fromFormValue(formData.get("sourceReferenceLabel")),
    sourceReferenceUrl: fromFormValue(formData.get("sourceReferenceUrl")),
    status: fromFormValue(formData.get("status")) || "draft",
    summary: fromFormValue(formData.get("summary")),
    trainerName: fromFormValue(formData.get("trainerName")),
    vendorName: fromFormValue(formData.get("vendorName")),
  });
}

export async function createListingAction(formData: FormData) {
  const { profile } = await requireProfile();

  if (profile.role !== "owner") {
    redirect("/dashboard/listings?error=Only%20owners%20can%20create%20listings");
  }

  if (isDemoAuthEnabled) {
    redirect("/dashboard/listings?message=Demo%20mode%20-%20listing%20creation%20is%20preview-only");
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/dashboard/listings?error=Configure%20Supabase%20first");
  }

  try {
    const values = parseListingForm(formData);
    const listingId = await createListingWithHorse(supabase, profile.id, values);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/listings");
    revalidatePath("/marketplace");
    redirect(`/dashboard/listings/${listingId}?message=Listing%20saved`);
  } catch (error) {
    redirect(`/dashboard/listings/new?error=${encodeURIComponent(toErrorMessage(error))}`);
  }
}

export async function updateListingAction(formData: FormData) {
  const { profile } = await requireProfile();

  if (profile.role !== "owner") {
    redirect("/dashboard/listings?error=Only%20owners%20can%20edit%20listings");
  }

  const listingId = fromFormValue(formData.get("listingId"));

  if (isDemoAuthEnabled) {
    redirect(
      `/dashboard/listings/${listingId}?message=Demo%20mode%20-%20listing%20updates%20are%20preview-only`,
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/dashboard/listings?error=Configure%20Supabase%20first");
  }

  try {
    const values = parseListingForm(formData);
    await updateListingWithHorse(supabase, listingId, profile.id, values);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/listings");
    revalidatePath(`/dashboard/listings/${listingId}`);
    revalidatePath("/marketplace");
    redirect(`/dashboard/listings/${listingId}?message=Listing%20updated`);
  } catch (error) {
    redirect(
      `/dashboard/listings/${listingId}?error=${encodeURIComponent(toErrorMessage(error))}`,
    );
  }
}
