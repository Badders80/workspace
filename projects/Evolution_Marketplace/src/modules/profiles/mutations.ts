import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProfileFormValues } from "@/modules/profiles/schema";
import type { Database } from "@/types/database";

export async function upsertProfile(
  supabase: SupabaseClient<Database>,
  authUserId: string,
  email: string | undefined,
  values: ProfileFormValues,
) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        auth_user_id: authUserId,
        bio: values.bio || null,
        company_name: values.companyName || null,
        display_name: values.displayName,
        email: email ?? null,
        full_name: values.fullName,
        onboarding_complete: true,
        phone: values.phone || null,
        preferred_display_currency: values.preferredDisplayCurrency,
        role: values.role,
      },
      {
        onConflict: "auth_user_id",
      },
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
