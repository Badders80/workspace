import { notFound } from "next/navigation";
import { respondToOfferAction } from "@/app/actions/offers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageMessage } from "@/components/ui/page-message";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requireProfile } from "@/lib/auth";
import { getListingById } from "@/modules/listings/queries";
import { getOfferByIdForProfile } from "@/modules/offers/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function OfferDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile } = await requireProfile();
  const { id } = await params;
  const query = await searchParams;
  const offer = await getOfferByIdForProfile(id, profile.id);

  if (!offer) {
    notFound();
  }

  const listing = await getListingById(offer.listingId);

  return (
    <div className="space-y-4">
      <Card>
        <PageMessage error={getSearchValue(query.error)} message={getSearchValue(query.message)} />
        <p className="eyebrow mt-4">Offer Detail</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">
          {listing?.headline ?? "Offer"}
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Status", offer.status],
            ["Offered Percentage", `${offer.offeredPercentage}%`],
            ["NZD Total", `NZD ${offer.totalOfferNzd.toFixed(2)}`],
            ["Display Total", offer.displayTotalAmount ? `${offer.displayCurrency} ${offer.displayTotalAmount.toFixed(2)}` : "Not stored"],
          ].map(([label, value]) => (
            <Card key={label} className="bg-[var(--surface-strong)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {label}
              </p>
              <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">{value}</p>
            </Card>
          ))}
        </div>
        {offer.message ? (
          <Card className="mt-6 bg-[var(--surface-strong)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Investor Message
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{offer.message}</p>
          </Card>
        ) : null}
      </Card>

      {profile.role === "owner" && offer.status === "submitted" ? (
        <div className="grid gap-4 xl:grid-cols-3">
          <Card>
            <form action={respondToOfferAction} className="space-y-4">
              <input name="offerId" type="hidden" value={offer.id} />
              <input name="actionType" type="hidden" value="accept" />
              <Button wide>Accept offer</Button>
            </form>
          </Card>
          <Card>
            <form action={respondToOfferAction} className="space-y-4">
              <input name="offerId" type="hidden" value={offer.id} />
              <input name="actionType" type="hidden" value="decline" />
              <Button variant="secondary" wide>
                Decline offer
              </Button>
            </form>
          </Card>
          <Card>
            <form action={respondToOfferAction} className="space-y-4">
              <input name="offerId" type="hidden" value={offer.id} />
              <input name="actionType" type="hidden" value="counter" />
              <label className="block space-y-2 text-sm">
                <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Counter Percentage
                </span>
                <Input
                  defaultValue={offer.offeredPercentage}
                  name="counterPercentageOfHorse"
                  step="0.1"
                  type="number"
                  required
                />
              </label>
              <label className="block space-y-2 text-sm">
                <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Counter Price / %
                </span>
                <Input
                  defaultValue={listing?.pricePerPercentageNzd ?? 0}
                  name="counterPricePerPercentageNzd"
                  step="0.01"
                  type="number"
                  required
                />
              </label>
              <label className="block space-y-2 text-sm">
                <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Counter Message
                </span>
                <Textarea name="counterMessage" />
              </label>
              <Button variant="secondary" wide>
                Send counter
              </Button>
            </form>
          </Card>
        </div>
      ) : null}

      {profile.role === "investor" && offer.status === "countered" ? (
        <Card>
          <p className="eyebrow">Counter offer</p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            The owner has proposed {offer.counterPercentageOfHorse}% at NZD{" "}
            {offer.counterPricePerPercentageNzd?.toFixed(2)} per percentage.
          </p>
          {offer.counterMessage ? (
            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
              {offer.counterMessage}
            </p>
          ) : null}
          <form action={respondToOfferAction} className="mt-6">
            <input name="offerId" type="hidden" value={offer.id} />
            <input name="actionType" type="hidden" value="accept-counter" />
            <Button>Accept counter</Button>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
