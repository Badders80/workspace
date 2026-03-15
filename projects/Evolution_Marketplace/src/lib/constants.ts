import type {
  AppRole,
  CurrencyCode,
  ListingStatus,
  OfferStatus,
  TransactionStatus,
} from "@/types/database";

export const currencyOptions: CurrencyCode[] = ["NZD", "USD", "AUD", "GBP"];

export const roleOptions: AppRole[] = ["owner", "investor"];

export const listingStatusLabels: Record<ListingStatus, string> = {
  draft: "Draft",
  review: "Review",
  published: "Published",
  paused: "Paused",
  closed: "Closed",
  sold_out: "Sold Out",
};

export const offerStatusLabels: Record<OfferStatus, string> = {
  submitted: "Submitted",
  countered: "Countered",
  accepted: "Accepted",
  declined: "Declined",
  withdrawn: "Withdrawn",
  expired: "Expired",
};

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  payment_instruction_required: "Payment Instructions",
  instructions_sent: "Instructions Sent",
  funds_received: "Funds Received",
  settled: "Settled",
  cancelled: "Cancelled",
};
