"use client";

import { useState } from "react";
import { ListingCard } from "@/components/marketing/listing-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { MarketplaceListingRecord } from "@/modules/listings/types";
import type { CurrencyCode } from "@/types/database";

export function MarketplaceExplorer({
  listings,
}: {
  listings: MarketplaceListingRecord[];
}) {
  const [query, setQuery] = useState("");
  const [sex, setSex] = useState("all");
  const [currency, setCurrency] = useState<CurrencyCode>("NZD");

  const filteredListings = listings.filter((listing) => {
    const matchesQuery =
      !query ||
      listing.headline.toLowerCase().includes(query.toLowerCase()) ||
      listing.horse.sire?.toLowerCase().includes(query.toLowerCase()) ||
      listing.horse.trainerName?.toLowerCase().includes(query.toLowerCase());

    const matchesSex = sex === "all" || listing.horse.sex === sex;

    return matchesQuery && matchesSex;
  });

  return (
    <div className="space-y-10">
      <Card className="grid gap-6 p-8 md:grid-cols-[1.4fr_0.8fr_0.6fr]">
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Search
          </span>
          <Input
            placeholder="Horse, sire, trainer"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Sex
          </span>
          <Select value={sex} onChange={(event) => setSex(event.target.value)}>
            <option value="all">All</option>
            <option value="colt">Colt</option>
            <option value="filly">Filly</option>
            <option value="gelding">Gelding</option>
            <option value="mare">Mare</option>
            <option value="horse">Horse</option>
            <option value="unknown">Unknown</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Display Currency
          </span>
          <Select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
          >
            <option value="NZD">NZD</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
          </Select>
        </label>
      </Card>

      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Asset board
        </p>
        <p className="text-sm text-[var(--muted)]">
          {filteredListings.length} {filteredListings.length === 1 ? "asset" : "assets"}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} currency={currency} />
        ))}
      </div>
    </div>
  );
}
