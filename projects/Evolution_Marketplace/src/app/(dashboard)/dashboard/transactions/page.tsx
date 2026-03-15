import { updateTransactionStateAction } from "@/app/actions/transactions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageMessage } from "@/components/ui/page-message";
import { requireProfile } from "@/lib/auth";
import { getTransactionsForProfile } from "@/modules/transactions/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireProfile();
  const transactions = await getTransactionsForProfile(profile.id);
  const query = await searchParams;

  return (
    <div className="space-y-4">
      <PageMessage error={getSearchValue(query.error)} message={getSearchValue(query.message)} />
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <p className="eyebrow">Transaction {transaction.id.slice(0, 8)}</p>
          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-start">
            <div>
              <p className="text-lg font-semibold text-[var(--foreground)]">
                State: {transaction.state}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                {transaction.instructionsSummary ?? "Awaiting payment instruction summary."}
              </p>
              {transaction.paymentReference ? (
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  Reference: {transaction.paymentReference}
                </p>
              ) : null}
            </div>
            {profile.role === "owner" ? (
              <div className="flex flex-wrap gap-3">
                {transaction.state === "payment_instruction_required" ? (
                  <form action={updateTransactionStateAction}>
                    <input name="transactionId" type="hidden" value={transaction.id} />
                    <input name="nextState" type="hidden" value="instructions_sent" />
                    <Button variant="secondary">Mark instructions sent</Button>
                  </form>
                ) : null}
                {transaction.state === "instructions_sent" ? (
                  <form action={updateTransactionStateAction}>
                    <input name="transactionId" type="hidden" value={transaction.id} />
                    <input name="nextState" type="hidden" value="funds_received" />
                    <Button variant="secondary">Mark funds received</Button>
                  </form>
                ) : null}
                {transaction.state === "funds_received" ? (
                  <form action={updateTransactionStateAction}>
                    <input name="transactionId" type="hidden" value={transaction.id} />
                    <input name="nextState" type="hidden" value="settled" />
                    <Button>Settle transaction</Button>
                  </form>
                ) : null}
              </div>
            ) : null}
          </div>
        </Card>
      ))}
      {!transactions.length ? (
        <Card>
          <p className="text-sm leading-7 text-[var(--muted)]">
            No transactions yet. Accepted offers will appear here and progress through manual
            instruction and settlement states.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
