import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";
import { getOwnershipPositions } from "@/modules/ownership/queries";

export default async function OwnershipPage() {
  const { profile } = await requireProfile();
  const positions = await getOwnershipPositions(profile.id);

  return (
    <Card>
      <p className="eyebrow">Ownership Ledger</p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">Whole-horse positions</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            <tr>
              <th className="pb-3 pr-6">Horse</th>
              <th className="pb-3 pr-6">Owned %</th>
              <th className="pb-3 pr-6">Average Cost NZD</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border-t [&_td]:border-[var(--line)] [&_td]:py-4 [&_td]:pr-6">
            {positions.map((position) => (
              <tr key={position.id}>
                <td>{position.horse?.name ?? position.horseId}</td>
                <td>{position.percentageOwned}%</td>
                <td>{position.averageCostNzd?.toFixed(2) ?? "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!positions.length ? (
        <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
          Positions appear here when transactions settle and ownership records roll forward.
        </p>
      ) : null}
    </Card>
  );
}
