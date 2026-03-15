import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageMessage } from "@/components/ui/page-message";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface ListingFormDefaults {
  listingId?: string;
  horseName?: string;
  sire?: string;
  dam?: string;
  damsire?: string;
  sex?: string;
  foaledOn?: string | null;
  colour?: string | null;
  trainerName?: string | null;
  vendorName?: string | null;
  location?: string | null;
  overview?: string | null;
  pedigreeNotes?: string | null;
  highlightText?: string | null;
  headline?: string;
  summary?: string | null;
  percentageAvailable?: number;
  pricePerPercentageNzd?: number;
  minimumPurchasePercentage?: number;
  estimatedMonthlyFeeNzd?: number | null;
  offeringStructure?: string;
  offerNotes?: string | null;
  sourceReferenceLabel?: string | null;
  sourceReferenceUrl?: string | null;
  sourceNotes?: string | null;
  mediaUrls?: string[];
  documentUrls?: string[];
  status?: string;
}

export function ListingForm({
  action,
  defaults,
  submitLabel,
  error,
  message,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: ListingFormDefaults;
  submitLabel: string;
  error?: string;
  message?: string;
}) {
  return (
    <Card>
      <p className="eyebrow">Listing Editor</p>
      <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em]">
        Horse and offering details
      </h1>
      <div className="mt-6">
        <PageMessage error={error} message={message} />
      </div>
      <form action={action} className="mt-6 space-y-8">
        {defaults?.listingId ? <input name="listingId" type="hidden" value={defaults.listingId} /> : null}
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Horse Name
            </span>
            <Input defaultValue={defaults?.horseName ?? ""} name="horseName" required />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Headline
            </span>
            <Input defaultValue={defaults?.headline ?? ""} name="headline" required />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Sire
            </span>
            <Input defaultValue={defaults?.sire ?? ""} name="sire" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Dam
            </span>
            <Input defaultValue={defaults?.dam ?? ""} name="dam" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Damsire
            </span>
            <Input defaultValue={defaults?.damsire ?? ""} name="damsire" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Sex
            </span>
            <Select defaultValue={defaults?.sex ?? "unknown"} name="sex">
              <option value="colt">Colt</option>
              <option value="filly">Filly</option>
              <option value="gelding">Gelding</option>
              <option value="mare">Mare</option>
              <option value="horse">Horse</option>
              <option value="unknown">Unknown</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Foaled On
            </span>
            <Input defaultValue={defaults?.foaledOn ?? ""} name="foaledOn" type="date" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Colour
            </span>
            <Input defaultValue={defaults?.colour ?? ""} name="colour" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Trainer
            </span>
            <Input defaultValue={defaults?.trainerName ?? ""} name="trainerName" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Vendor
            </span>
            <Input defaultValue={defaults?.vendorName ?? ""} name="vendorName" />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Summary
            </span>
            <Textarea defaultValue={defaults?.summary ?? ""} name="summary" required />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Overview
            </span>
            <Textarea defaultValue={defaults?.overview ?? ""} name="overview" required />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Pedigree Notes
            </span>
            <Textarea defaultValue={defaults?.pedigreeNotes ?? ""} name="pedigreeNotes" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Percentage Available
            </span>
            <Input
              defaultValue={defaults?.percentageAvailable ?? ""}
              name="percentageAvailable"
              step="0.1"
              type="number"
              required
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Price Per Percentage (NZD)
            </span>
            <Input
              defaultValue={defaults?.pricePerPercentageNzd ?? ""}
              name="pricePerPercentageNzd"
              step="0.01"
              type="number"
              required
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Minimum Purchase %
            </span>
            <Input
              defaultValue={defaults?.minimumPurchasePercentage ?? ""}
              name="minimumPurchasePercentage"
              step="0.1"
              type="number"
              required
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Estimated Monthly Fee (NZD)
            </span>
            <Input
              defaultValue={defaults?.estimatedMonthlyFeeNzd ?? ""}
              name="estimatedMonthlyFeeNzd"
              step="0.01"
              type="number"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Offering Structure
            </span>
            <Select defaultValue={defaults?.offeringStructure ?? "equity-stake"} name="offeringStructure">
              <option value="equity-stake">Equity stake</option>
              <option value="lease-share">Lease-share</option>
              <option value="synthetic-demo">Synthetic demo</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Status
            </span>
            <Select defaultValue={defaults?.status ?? "draft"} name="status">
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Offer Notes
            </span>
            <Textarea defaultValue={defaults?.offerNotes ?? ""} name="offerNotes" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Source Label
            </span>
            <Input
              defaultValue={defaults?.sourceReferenceLabel ?? ""}
              name="sourceReferenceLabel"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Source URL
            </span>
            <Input
              defaultValue={defaults?.sourceReferenceUrl ?? ""}
              name="sourceReferenceUrl"
              type="url"
            />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Source Notes
            </span>
            <Textarea defaultValue={defaults?.sourceNotes ?? ""} name="sourceNotes" />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Media URLs
            </span>
            <Textarea
              defaultValue={(defaults?.mediaUrls ?? []).join("\n")}
              name="mediaUrls"
              placeholder="One URL per line"
              required
            />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Document URLs
            </span>
            <Textarea
              defaultValue={(defaults?.documentUrls ?? []).join("\n")}
              name="documentUrls"
              placeholder="One URL per line"
            />
          </label>
        </div>
        <Button>{submitLabel}</Button>
      </form>
    </Card>
  );
}
