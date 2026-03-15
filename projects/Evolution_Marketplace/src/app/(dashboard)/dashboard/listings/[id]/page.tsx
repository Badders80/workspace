import { notFound } from "next/navigation";
import { updateListingAction } from "@/app/actions/listings";
import { ListingForm } from "@/components/forms/listing-form";
import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";
import { getOwnerListingById } from "@/modules/listings/queries";
import { getOffersForProfile } from "@/modules/offers/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ListingDetailDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireProfile();
  const { id } = await params;
  const query = await searchParams;

  if (profile.role !== "owner") {
    notFound();
  }

  const [listing, offers] = await Promise.all([
    getOwnerListingById(id, profile.id),
    getOffersForProfile(profile.id, "owner"),
  ]);

  if (!listing) {
    notFound();
  }

  const listingOffers = offers.filter((offer) => offer.listingId === listing.id);

  return (
    <div className="space-y-4">
      <ListingForm
        action={updateListingAction}
        defaults={{
          colour: listing.horse.colour,
          dam: listing.horse.dam ?? undefined,
          damsire: listing.horse.damsire ?? undefined,
          documentUrls: listing.documents
            .map((item) => item.externalUrl)
            .filter((item): item is string => Boolean(item)),
          estimatedMonthlyFeeNzd: listing.estimatedMonthlyFeeNzd,
          foaledOn: listing.horse.foaledOn,
          headline: listing.headline,
          highlightText: listing.horse.highlightText ?? undefined,
          horseName: listing.horse.name,
          listingId: listing.id,
          location: listing.horse.location,
          mediaUrls: listing.media.map((item) => item.url),
          minimumPurchasePercentage: listing.minimumPurchasePercentage,
          offerNotes: listing.offerNotes,
          offeringStructure: listing.offeringStructure,
          overview: listing.horse.overview,
          pedigreeNotes: listing.horse.pedigreeNotes,
          percentageAvailable: listing.percentageAvailable,
          pricePerPercentageNzd: listing.pricePerPercentageNzd,
          sex: listing.horse.sex,
          sire: listing.horse.sire ?? undefined,
          sourceNotes: listing.horse.sourceNotes,
          sourceReferenceLabel: listing.horse.sourceReferenceLabel,
          sourceReferenceUrl: listing.horse.sourceReferenceUrl,
          status: listing.status,
          summary: listing.summary,
          trainerName: listing.horse.trainerName,
          vendorName: listing.horse.vendorName,
        }}
        error={getSearchValue(query.error)}
        message={getSearchValue(query.message)}
        submitLabel="Update listing"
      />
      <Card>
        <p className="eyebrow">Incoming Offers</p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              <tr>
                <th className="pb-3 pr-6">Offer</th>
                <th className="pb-3 pr-6">Status</th>
                <th className="pb-3 pr-6">NZD Total</th>
                <th className="pb-3 pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_td]:border-t [&_td]:border-[var(--line)] [&_td]:py-4 [&_td]:pr-6">
              {listingOffers.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.offeredPercentage}%</td>
                  <td>{offer.status}</td>
                  <td>NZD {offer.totalOfferNzd.toFixed(2)}</td>
                  <td>
                    <a
                      href={`/dashboard/offers/${offer.id}`}
                      className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                    >
                      Review
                    </a>
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
