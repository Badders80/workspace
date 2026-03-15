import Link from "next/link";
import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";
import { getOwnerListings } from "@/modules/listings/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function DashboardListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireProfile();
  const query = await searchParams;

  if (profile.role !== "owner") {
    return (
      <Card>
        <p className="eyebrow">Owner Workspace</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">
          Listing management is only available to owner profiles.
        </h1>
      </Card>
    );
  }

  const listings = await getOwnerListings(profile.id);
  const message = getSearchValue(query.message);
  const error = getSearchValue(query.error);

  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Listings</p>
          <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">Manage horse offerings</h1>
          {message ? <p className="mt-4 text-sm text-[var(--success)]">{message}</p> : null}
          {error ? <p className="mt-4 text-sm text-[var(--danger)]">{error}</p> : null}
        </div>
        <Link
          href="/dashboard/listings/new"
          className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
        >
          Create listing
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            <tr>
              <th className="pb-3 pr-6">Horse</th>
              <th className="pb-3 pr-6">Status</th>
              <th className="pb-3 pr-6">Price / %</th>
              <th className="pb-3 pr-6">Available</th>
              <th className="pb-3 pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_td]:border-t [&_td]:border-[var(--line)] [&_td]:py-4 [&_td]:pr-6">
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td>{listing.headline}</td>
                <td>{listing.status}</td>
                <td>NZD {listing.pricePerPercentageNzd.toFixed(2)}</td>
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
  );
}
