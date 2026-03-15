"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { isDemoAuthEnabled } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fromFormValue } from "@/lib/utils";
import { upsertProfile } from "@/modules/profiles/mutations";
import { profileFormSchema } from "@/modules/profiles/schema";

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to save profile.";
}

export async function saveProfileAction(formData: FormData) {
  const { user } = await requireUser();

  if (isDemoAuthEnabled) {
    redirect("/dashboard/profile?message=Demo%20mode%20-%20profile%20changes%20are%20not%20persisted");
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/dashboard/profile?error=Configure%20Supabase%20first");
  }

  try {
    const values = profileFormSchema.parse({
      bio: fromFormValue(formData.get("bio")),
      companyName: fromFormValue(formData.get("companyName")),
      displayName: fromFormValue(formData.get("displayName")),
      fullName: fromFormValue(formData.get("fullName")),
      phone: fromFormValue(formData.get("phone")),
      preferredDisplayCurrency: fromFormValue(formData.get("preferredDisplayCurrency")),
      role: fromFormValue(formData.get("role")),
    });

    await upsertProfile(supabase, user.id, user.email ?? undefined, values);
  } catch (error) {
    redirect(`/dashboard/profile?error=${encodeURIComponent(toErrorMessage(error))}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  redirect("/dashboard?message=Profile%20saved");
}
