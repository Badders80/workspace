import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, TransactionStatus } from "@/types/database";

export async function updateTransactionState(
  supabase: SupabaseClient<Database>,
  transactionId: string,
  profileId: string,
  nextState: TransactionStatus,
) {
  const updates: Database["public"]["Tables"]["transactions"]["Update"] = {
    state: nextState,
  };

  if (nextState === "funds_received") {
    updates.funds_received_at = new Date().toISOString();
  }

  if (nextState === "settled") {
    updates.settled_at = new Date().toISOString();
  }

  if (nextState === "cancelled") {
    updates.cancelled_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", transactionId)
    .or(`owner_profile_id.eq.${profileId},investor_profile_id.eq.${profileId}`);

  if (error) {
    throw error;
  }
}
