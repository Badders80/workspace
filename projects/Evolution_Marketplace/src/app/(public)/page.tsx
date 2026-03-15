import Link from "next/link";
import { ListingCard } from "@/components/marketing/listing-card";
import { SetupBanner } from "@/components/ui/setup-banner";
import { Card } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/env";
import { getPublishedListings } from "@/modules/listings/queries";

export default async function HomePage() {
  const listings = await getPublishedListings();
  const featured = listings.slice(0, 3);

  return (
    <main className="space-y-10 pb-12">
      <section className="shell grid gap-8 py-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Phase 1 Functional Marketplace Core</p>
          <h1 className="hero-title max-w-5xl text-[var(--foreground)]">
            Listings, tickets, offers, and transaction states.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
            This surface is for evaluating listings, opening order tickets, and moving
            through operational workflow states. Brand narrative and public marketing are
            intentionally out of scope for the current phase.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/marketplace"
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
            >
              Explore marketplace
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex rounded-full border border-[var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--foreground)]"
            >
              Enter dashboard
            </Link>
          </div>
        </div>
        <Card className="grid gap-4 bg-[var(--surface-dark)] text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
              System controls
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
              <li>All percentages are percentages of the whole horse.</li>
              <li>NZD is the native asset pricing currency.</li>
              <li>Order tickets route through offer and settlement states.</li>
              <li>Demo personas unlock owner and investor workflow review.</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Demo horses</p>
              <p className="mt-2 font-serif text-4xl">{listings.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Offer workflow</p>
              <p className="mt-2 font-serif text-4xl">5-state</p>
            </div>
          </div>
        </Card>
      </section>

      {!isSupabaseConfigured ? (
        <section className="shell">
          <SetupBanner />
        </section>
      ) : null}

      <section className="shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h2 className="section-title mt-5 text-[var(--foreground)]">
            Use the marketplace as a working board, not a landing page.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
            The current build is intentionally biased toward operational review: listing
            inspection, ticket access, dashboard navigation, and transaction-state clarity.
          </p>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Listings", "Create, edit, publish, and pause owner listings."],
            ["Tickets", "Open order tickets directly from listing cards."],
            ["Workflow", "Review offers, counters, and transaction states."],
          ].map(([title, body]) => (
            <Card key={title} className="bg-[var(--surface-strong)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="shell space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Active Listings</p>
            <h2 className="section-title mt-4">Current demo board</h2>
          </div>
          <Link
            href="/marketplace"
            className="text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
          >
            See all listings
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} currency="NZD" />
          ))}
        </div>
      </section>
    </main>
  );
}
