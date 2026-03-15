import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { MarketplaceListingRecord } from "@/modules/listings/types";
import type { CurrencyCode } from "@/types/database";

export function OfferForm({
  action,
  listing,
  preferredCurrency,
  returnPath,
  submitLabel = "Queue offer",
}: {
  action: (formData: FormData) => void | Promise<void>;
  listing: MarketplaceListingRecord;
  preferredCurrency: CurrencyCode;
  returnPath?: string;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <input name="listingId" type="hidden" value={listing.id} />
      <input name="listingSlug" type="hidden" value={listing.slug} />
      <input
        name="returnPath"
        type="hidden"
        value={returnPath ?? `/marketplace/${listing.slug}/ticket`}
      />
      <label className="block space-y-2 text-sm">
        <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Percentage Of Whole Horse
        </span>
        <Input
          defaultValue={listing.minimumPurchasePercentage}
          max={listing.percentageAvailable}
          min={listing.minimumPurchasePercentage}
          name="offeredPercentage"
          step="0.1"
          type="number"
          required
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Display Currency
        </span>
        <Select defaultValue={preferredCurrency} name="displayCurrency">
          <option value="NZD">NZD</option>
          <option value="USD">USD</option>
          <option value="AUD">AUD</option>
          <option value="GBP">GBP</option>
        </Select>
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Notes
        </span>
        <Textarea name="message" placeholder="Execution note or diligence comment" />
      </label>
      <Button wide>{submitLabel}</Button>
    </form>
  );
}
