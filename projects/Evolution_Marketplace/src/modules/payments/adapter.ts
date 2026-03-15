import type { OfferRecord } from "@/modules/listings/types";

export interface PaymentInstruction {
  provider: string;
  reference: string;
  dueAt: string;
  summary: string;
}

export function buildManualPaymentInstruction(offer: OfferRecord): PaymentInstruction {
  const reference = `EVM-${offer.id.slice(0, 8).toUpperCase()}`;
  const dueAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
  const summary =
    `Send NZD funds to the marketplace trust account using reference ${reference}. ` +
    `This MVP uses manual payment instructions and operator confirmation rather than a live processor.`;

  return {
    provider: "manual-instructions",
    reference,
    dueAt,
    summary,
  };
}
