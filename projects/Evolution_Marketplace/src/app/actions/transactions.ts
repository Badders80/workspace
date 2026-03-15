"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { isDemoAuthEnabled } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fromFormValue } from "@/lib/utils";
import { updateTransactionState } from "@/modules/transactions/mutations";

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to update transaction state.";
}

export async function updateTransactionStateAction(formData: FormData) {
  const { profile } = await requireProfile();
  const transactionId = fromFormValue(formData.get("transactionId"));
  const nextState = fromFormValue(formData.get("nextState"));

  if (isDemoAuthEnabled) {
    redirect(
      `/dashboard/transactions?message=Demo%20mode%20-%20transaction%20state%20${encodeURIComponent(nextState)}%20previewed%20without%20persisting`,
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/dashboard/transactions?error=Configure%20Supabase%20first");
  }

  try {
    await updateTransactionState(supabase, transactionId, profile.id, nextState as never);
  } catch (error) {
    redirect(
      `/dashboard/transactions?error=${encodeURIComponent(toErrorMessage(error))}`,
    );
  }

  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard/ownership");
  revalidatePath("/dashboard");
  redirect("/dashboard/transactions?message=Transaction%20updated");
}
