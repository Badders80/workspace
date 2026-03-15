import Link from "next/link";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { getOwnerListings } from "@/modules/listings/queries";
import { getOffersForProfile } from "@/modules/offers/queries";
import { getOwnershipPositions } from "@/modules/ownership/queries";
import { getTransactionsForProfile } from "@/modules/transactions/queries";

export default async function DashboardOverviewPage() {
  const { profile } = await requireUser();

  if (!profile) {
    return (
      <Card>
        <p className="eyebrow">Profile Required</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">
          Complete onboarding to unlock the dashboard.
        </h1>
        <Link
          href="/dashboard/profile"
          className="mt-6 inline-flex text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
        >
          Finish profile setup
        </Link>
      </Card>
    );
  }

  if (profile.role === "owner") {
    const [listings, offers, transactions] = await Promise.all([
      getOwnerListings(profile.id),
      getOffersForProfile(profile.id, "owner"),
      getTransactionsForProfile(profile.id),
    ]);

    return (
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-3">
          <StatCard
            label="Published Listings"
            value={String(listings.filter((item) => item.status === "published").length)}
            note="Active public opportunities under your control."
          />
          <StatCard
            label="Open Offers"
            value={String(
              offers.filter((item) => item.status === "submitted" || item.status === "countered")
                .length,
            )}
            note="Offer activity that still needs an operator decision."
          />
          <StatCard
            label="Transactions"
            value={String(transactions.length)}
            note="Accepted opportunities already in the transaction pipeline."
          />
        </div>
        <Card>
          <p className="eyebrow">Recent listings</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                <tr>
                  <th className="pb-3 pr-6">Listing</th>
                  <th className="pb-3 pr-6">Status</th>
                  <th className="pb-3 pr-6">Available</th>
                  <th className="pb-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-t [&_td]:border-[var(--line)] [&_td]:py-4 [&_td]:pr-6">
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td>{listing.headline}</td>
                    <td>{listing.status}</td>
                    <td>{listing.percentageAvailable}%</td>
                    <td>
                      <Link
                        href={`/dashboard/listings/${listing.id}`}
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
      </div>
    );
  }

  const [offers, transactions, positions] = await Promise.all([
    getOffersForProfile(profile.id, "investor"),
    getTransactionsForProfile(profile.id),
    getOwnershipPositions(profile.id),
  ]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        <StatCard
          label="Submitted Offers"
          value={String(offers.length)}
          note="Offers currently in review, counter, or transaction states."
        />
        <StatCard
          label="Transactions"
          value={String(transactions.length)}
          note="Accepted offers moving through instructions and settlement."
        />
        <StatCard
          label="Ownership Positions"
          value={String(positions.length)}
          note="Settled positions recorded against the whole horse."
        />
      </div>
      <Card>
        <p className="eyebrow">Investor workflow</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          Browse public opportunities, submit NZD-native offers, review counter terms, and
          monitor transactions until settlement updates your ownership ledger.
        </p>
      </Card>
    </div>
  );
}
