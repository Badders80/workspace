import { MarketplaceExplorer } from "@/components/marketing/marketplace-explorer";
import { SetupBanner } from "@/components/ui/setup-banner";
import { isSupabaseConfigured } from "@/lib/env";
import { getPublishedListings } from "@/modules/listings/queries";

export default async function MarketplacePage() {
  const listings = await getPublishedListings();

  return (
    <main className="shell space-y-12 pb-20 pt-12">
      <section className="grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">Marketplace</p>
          <h1 className="section-title mt-5">Browse assets, then buy or learn more.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[var(--muted)]">
            Each asset card surfaces the horse name, the NZD price per 1%, the percentage
            currently for sale, and direct paths into the asset page or order process.
          </p>
        </div>
        <div className="rounded-[32px] border border-[var(--line)] bg-white/60 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Assets Live
          </p>
          <p className="mt-6 font-serif text-6xl tracking-[-0.06em] text-[var(--foreground)]">
            {listings.length}
          </p>
          <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
            The demo set spans a source listing, a breeding-profile fallback, and a
            lease-share style page to pressure-test normalization and execution flow.
          </p>
        </div>
      </section>

      {!isSupabaseConfigured ? <SetupBanner /> : null}

      <MarketplaceExplorer listings={listings} />
    </main>
  );
}
