import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageMessage } from "@/components/ui/page-message";
import { formatCurrency, formatDate, formatPercentage } from "@/lib/formatters";
import { getCurrentUserContext } from "@/lib/auth";
import { getAssetDetailContent } from "@/modules/listings/detail-content";
import { getMarketplaceListingBySlug } from "@/modules/listings/queries";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ListingDetailPage({
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

  const coverImage = listing.media.find((item) => item.isCover) ?? listing.media[0];
  const error = getSearchValue(query.error);
  const message = getSearchValue(query.message);
  const detailContent = getAssetDetailContent(listing.slug);
  const feedSections = [
    { label: "News", items: detailContent.news },
    { label: "Results", items: detailContent.results },
    { label: "Upcoming Races", items: detailContent.upcoming },
  ];

  return (
    <main className="shell space-y-12 pb-20 pt-12">
      <section className="grid gap-12 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-10">
          <div className="space-y-5 border-b border-[var(--line)] pb-8">
            <p className="eyebrow">Asset</p>
            <h1 className="section-title">{listing.horse.name}</h1>
            <p className="max-w-3xl text-sm leading-8 text-[var(--muted)]">
              {listing.summary}
            </p>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-[var(--line)] bg-[var(--surface-strong)]">
            <div className="relative aspect-[16/10]">
              {coverImage ? (
                <Image
                  src={coverImage.url}
                  alt={coverImage.altText ?? listing.horse.name}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>

          <div className="grid gap-8 border-y border-[var(--line)] py-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Price (Per 1%)", formatCurrency(listing.pricePerPercentageNzd)],
              ["For Sale", formatPercentage(listing.percentageAvailable)],
              ["Minimum Order", formatPercentage(listing.minimumPurchasePercentage)],
              ["Structure", listing.offeringStructure.replace("-", " ")],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {label}
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{value}</p>
              </div>
            ))}
          </div>

          <Card className="p-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <section className="space-y-4">
                <p className="eyebrow">Overview</p>
                <p className="text-sm leading-8 text-[var(--foreground)]">
                  {listing.horse.overview}
                </p>
              </section>
              <section className="space-y-4">
                <p className="eyebrow">Pedigree</p>
                <p className="text-sm leading-8 text-[var(--foreground)]">
                  {listing.horse.pedigreeNotes}
                </p>
                <p className="text-sm leading-8 text-[var(--muted)]">
                  {detailContent.marketNote}
                </p>
              </section>
            </div>
          </Card>

          <div className="grid gap-10 lg:grid-cols-3">
            {feedSections.map((section) => (
              <section key={section.label} className="space-y-6">
                <p className="eyebrow">{section.label}</p>
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="border-t border-[var(--line)] pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        {item.meta}
                      </p>
                      <p className="mt-3 text-base font-semibold text-[var(--foreground)]">
                        {item.title}
                      </p>
                      <p className="mt-3 text-sm leading-8 text-[var(--muted)]">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <Card className="space-y-8 p-8">
            <PageMessage error={error} message={message} />
            <div className="space-y-4">
              <p className="eyebrow">Asset Ticket</p>
              <p className="font-serif text-5xl tracking-[-0.05em] text-[var(--foreground)]">
                {formatCurrency(listing.pricePerPercentageNzd)}
              </p>
              <p className="text-sm leading-8 text-[var(--muted)]">
                NZD native price per 1% of the whole horse.
              </p>
            </div>

            <div className="space-y-5 border-y border-[var(--line)] py-6">
              {[
                ["For Sale", formatPercentage(listing.percentageAvailable)],
                ["Minimum Order", formatPercentage(listing.minimumPurchasePercentage)],
                ["Trainer", listing.horse.trainerName ?? "Not stated"],
                ["Foaled", formatDate(listing.horse.foaledOn)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/marketplace/${listing.slug}/ticket`}
                className="inline-flex min-w-[132px] items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[#243342]"
              >
                Buy Asset
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex min-w-[164px] items-center justify-center rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white/70"
              >
                Back to Marketplace
              </Link>
            </div>

            {!user ? (
              <p className="text-sm leading-8 text-[var(--muted)]">
                In demo mode, switch the session to Investor to continue from asset review
                into the order process.
              </p>
            ) : profile?.role !== "investor" ? (
              <p className="text-sm leading-8 text-[var(--muted)]">
                Investor mode is required to queue an order from the ticket page.
              </p>
            ) : (
              <p className="text-sm leading-8 text-[var(--muted)]">
                Investor mode is active. Continue into the ticket to set percentage and
                queue the order for owner review.
              </p>
            )}
          </Card>

          <Card className="space-y-5 p-8">
            <p className="eyebrow">Asset Snapshot</p>
            <div className="space-y-4">
              {[
                ["Vendor", listing.horse.vendorName ?? "Not stated"],
                ["Location", listing.horse.location ?? "Not stated"],
                ["Sire", listing.horse.sire ?? "Not stated"],
                ["Dam", listing.horse.dam ?? "Not stated"],
                ["Damsire", listing.horse.damsire ?? "Not stated"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-6 border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {label}
                  </p>
                  <p className="text-sm text-right text-[var(--foreground)]">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-6 p-8">
            <p className="eyebrow">Diligence and Source</p>
            <div className="space-y-6">
              {detailContent.diligence.map((item) => (
                <div key={item.id} className="border-t border-[var(--line)] pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {item.meta}
                  </p>
                  <p className="mt-3 text-base font-semibold text-[var(--foreground)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="border-t border-[var(--line)] pt-5 text-sm leading-8 text-[var(--foreground)]">
              {listing.horse.sourceNotes}
            </p>
            {listing.horse.sourceReferenceUrl ? (
              <Link
                href={listing.horse.sourceReferenceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
              >
                View source page
              </Link>
            ) : null}
          </Card>
        </div>
      </section>
    </main>
  );
}
