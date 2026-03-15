import Link from "next/link";
import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";
import { getOffersForProfile } from "@/modules/offers/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function DashboardOffersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireProfile();
  const offers = await getOffersForProfile(profile.id, profile.role === "owner" ? "owner" : "investor");
  const query = await searchParams;

  return (
    <Card>
      <p className="eyebrow">{profile.role === "owner" ? "Incoming Offers" : "My Offers"}</p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">Offer workflow queue</h1>
      {getSearchValue(query.message) ? (
        <p className="mt-4 text-sm text-[var(--success)]">{getSearchValue(query.message)}</p>
      ) : null}
      {getSearchValue(query.error) ? (
        <p className="mt-4 text-sm text-[var(--danger)]">{getSearchValue(query.error)}</p>
      ) : null}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            <tr>
              <th className="pb-3 pr-6">Offer Id</th>
              <th className="pb-3 pr-6">Status</th>
              <th className="pb-3 pr-6">Percentage</th>
              <th className="pb-3 pr-6">NZD Total</th>
              <th className="pb-3 pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border-t [&_td]:border-[var(--line)] [&_td]:py-4 [&_td]:pr-6">
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.id.slice(0, 8)}</td>
                <td>{offer.status}</td>
                <td>{offer.offeredPercentage}%</td>
                <td>NZD {offer.totalOfferNzd.toFixed(2)}</td>
                <td>
                  <Link
                    href={`/dashboard/offers/${offer.id}`}
                    className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
