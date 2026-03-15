import Link from "next/link";
import { notFound } from "next/navigation";
import { submitOfferAction } from "@/app/actions/offers";
import { OfferForm } from "@/components/forms/offer-form";
import { Card } from "@/components/ui/card";
import { PageMessage } from "@/components/ui/page-message";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import { getCurrentUserContext } from "@/lib/auth";
import { getMarketplaceListingBySlug } from "@/modules/listings/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function OrderTicketPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const listing = await getMarketplaceListingBySlug(slug);
  const { user, profile } = await getCurrentUserContext();

  if (!listing) {
    notFound();
  }

  const error = getSearchValue(query.error);
  const message = getSearchValue(query.message);
  const defaultPercentage = listing.minimumPurchasePercentage;
  const indicativeTotal = listing.pricePerPercentageNzd * defaultPercentage;

  return (
    <main className="shell space-y-12 pb-20 pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
        <div className="space-y-4">
          <p className="eyebrow">Buy Asset</p>
          <h1 className="section-title">{listing.headline}</h1>
          <p className="max-w-2xl text-sm leading-8 text-[var(--muted)]">
            Review the execution summary, set the percentage of the whole horse you want to
            purchase, and queue the order for owner response.
          </p>
        </div>
        <Link
          href={`/marketplace/${listing.slug}`}
          className="text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
        >
          Back to asset
        </Link>
      </div>

      <div className="grid gap-10 xl:grid-cols-[0.62fr_1.38fr]">
        <Card className="space-y-8 p-8">
          <div className="space-y-4">
            <p className="eyebrow">Execution Summary</p>
            <p className="font-serif text-5xl tracking-[-0.05em] text-[var(--foreground)]">
              {formatCurrency(listing.pricePerPercentageNzd)}
            </p>
            <p className="text-sm leading-8 text-[var(--muted)]">
              NZD price per 1% of the whole horse.
            </p>
          </div>

          <div className="space-y-5 border-y border-[var(--line)] py-6">
            {[
              ["Minimum ticket", formatPercentage(listing.minimumPurchasePercentage)],
              ["Available", formatPercentage(listing.percentageAvailable)],
              ["Indicative minimum", formatCurrency(indicativeTotal)],
              ["Settlement path", "Offer -> Instructions -> Funds -> Settlement"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {label}
                </p>
                <p className="max-w-[220px] text-right text-sm font-semibold text-[var(--foreground)]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="eyebrow">Listing Controls</p>
            <div className="space-y-4">
              {[
                ["Trainer", listing.horse.trainerName ?? "Not stated"],
                ["Structure", listing.offeringStructure],
                ["Vendor", listing.horse.vendorName ?? "Not stated"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-6 border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {label}
                  </p>
                  <p className="text-right text-sm text-[var(--foreground)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="space-y-8 p-8">
          <PageMessage error={error} message={message} />
          <div className="space-y-4">
            <p className="eyebrow">Ticket Input</p>
            <p className="max-w-2xl text-sm leading-8 text-[var(--muted)]">
              This ticket collects percentage, display currency, and execution notes. Owner
              review, countering, and transaction-state updates continue in the dashboard flow.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr]">
            <div>
              {user && profile?.role === "investor" ? (
                <OfferForm
                  action={submitOfferAction}
                  listing={listing}
                  preferredCurrency={profile.preferred_display_currency}
                  returnPath={`/marketplace/${listing.slug}/ticket`}
                  submitLabel="Queue offer"
                />
              ) : (
                <div className="space-y-5">
                  <p className="text-sm leading-8 text-[var(--muted)]">
                    Investor access is required to queue an order ticket. In demo mode you
                    can switch the session to Investor from the header and return here.
                  </p>
                  <Link
                    href="/sign-in"
                    className="inline-flex text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
                  >
                    Access investor mode
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <section className="space-y-4 border-t border-[var(--line)] pt-5">
                <p className="eyebrow">Workflow Notes</p>
                <p className="text-sm leading-8 text-[var(--muted)]">
                  Submitted orders create an offer record first. The owner can accept, decline,
                  or counter before the transaction moves into payment instruction handling.
                </p>
              </section>
              <section className="space-y-4 border-t border-[var(--line)] pt-5">
                <p className="eyebrow">Phase 1 Scope</p>
                <p className="text-sm leading-8 text-[var(--muted)]">
                  Payments remain abstracted for now. The important outcome in this phase is a
                  clean ticket, response, and settlement-state path.
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
