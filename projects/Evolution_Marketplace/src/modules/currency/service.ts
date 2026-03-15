import { env } from "@/lib/env";
import type { CurrencyCode } from "@/types/database";

const rates: Record<CurrencyCode, number> = {
  NZD: 1,
  USD: env.NEXT_PUBLIC_FX_USD,
  AUD: env.NEXT_PUBLIC_FX_AUD,
  GBP: env.NEXT_PUBLIC_FX_GBP,
};

export function getDisplayRate(currency: CurrencyCode) {
  return rates[currency];
}

export function convertFromNzd(amount: number, currency: CurrencyCode) {
  return amount * getDisplayRate(currency);
}

export function getSupportedCurrencies() {
  return Object.keys(rates) as CurrencyCode[];
}
