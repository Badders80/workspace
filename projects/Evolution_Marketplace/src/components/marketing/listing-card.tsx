import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import { convertFromNzd } from "@/modules/currency/service";
import type { MarketplaceListingRecord } from "@/modules/listings/types";
import type { CurrencyCode } from "@/types/database";

export function ListingCard({
  listing,
  currency,
}: {
  listing: MarketplaceListingRecord;
  currency: CurrencyCode;
}) {
  const coverImage = listing.media.find((item) => item.isCover) ?? listing.media[0];
  const convertedPrice =
    currency === "NZD"
      ? null
      : formatCurrency(convertFromNzd(listing.pricePerPercentageNzd, currency), currency);

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-strong)]">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={coverImage.altText ?? listing.headline}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="space-y-8 p-8">
        <div className="space-y-3">
          <p className="eyebrow">Asset</p>
          <h3 className="font-serif text-4xl tracking-[-0.05em] text-[var(--foreground)]">
            {listing.horse.name}
          </h3>
          <p className="text-sm leading-7 text-[var(--muted)]">
            {listing.horse.vendorName ?? "Evolution Marketplace"}
            {listing.horse.trainerName ? ` / ${listing.horse.trainerName}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 border-y border-[var(--line)] py-6 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Price (Per 1%)
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
              {formatCurrency(listing.pricePerPercentageNzd)}
            </p>
            {convertedPrice ? (
              <p className="mt-1 text-xs text-[var(--muted)]">Approx. {convertedPrice}</p>
            ) : null}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              For Sale
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
              {formatPercentage(listing.percentageAvailable)}
            </p>
          </div>
        </div>

        <p className="max-w-xl text-sm leading-8 text-[var(--muted)]">
          {listing.summary ?? "Asset summary pending owner disclosure."}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={`/marketplace/${listing.slug}/ticket`}
            className="inline-flex min-w-[116px] items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[#243342]"
          >
            BUY
          </Link>
          <Link
            href={`/marketplace/${listing.slug}`}
            className="inline-flex min-w-[136px] items-center justify-center rounded-full border border-[var(--line-strong)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white/70"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </Card>
  );
}
