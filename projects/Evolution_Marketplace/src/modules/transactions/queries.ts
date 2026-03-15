import { createServerSupabaseClient } from "@/lib/supabase/server";
import { demoTransactions } from "@/modules/ingestion/demo-fixtures";
import type { TransactionRecord } from "@/modules/listings/types";

const transactionSelect = `
  id,
  offer_id,
  listing_id,
  horse_id,
  owner_profile_id,
  investor_profile_id,
  state,
  payment_provider,
  payment_reference,
  instructions_summary,
  instruction_due_at,
  funds_received_at,
  settled_at
`;

function mapTransactionRow(row: Record<string, unknown>): TransactionRecord {
  return {
    id: String(row.id),
    offerId: String(row.offer_id),
    listingId: String(row.listing_id),
    horseId: String(row.horse_id),
    ownerProfileId: String(row.owner_profile_id),
    investorProfileId: String(row.investor_profile_id),
    state: row.state as TransactionRecord["state"],
    paymentProvider: row.payment_provider ? String(row.payment_provider) : null,
    paymentReference: row.payment_reference ? String(row.payment_reference) : null,
    instructionsSummary: row.instructions_summary
      ? String(row.instructions_summary)
      : null,
    instructionDueAt: row.instruction_due_at ? String(row.instruction_due_at) : null,
    fundsReceivedAt: row.funds_received_at ? String(row.funds_received_at) : null,
    settledAt: row.settled_at ? String(row.settled_at) : null,
  };
}

export async function getTransactionsForProfile(profileId: string) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoTransactions.filter(
      (transaction) =>
        transaction.ownerProfileId === profileId ||
        transaction.investorProfileId === profileId,
    );
  }

  const { data, error } = await supabase
    .from("transactions")
    .select(transactionSelect)
    .or(`owner_profile_id.eq.${profileId},investor_profile_id.eq.${profileId}`)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapTransactionRow(row as Record<string, unknown>));
}
