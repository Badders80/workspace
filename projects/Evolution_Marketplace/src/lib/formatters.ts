import { format } from "date-fns";
import type { CurrencyCode } from "@/types/database";

const formatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: CurrencyCode) {
  const key = `currency:${currency}`;
  const existing = formatters.get(key);

  if (existing) {
    return existing;
  }

  const formatter = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  formatters.set(key, formatter);
  return formatter;
}

export function formatCurrency(amount: number, currency: CurrencyCode = "NZD") {
  return getCurrencyFormatter(currency).format(amount);
}

export function formatPercentage(value: number) {
  return `${Number(value).toFixed(value % 1 === 0 ? 0 : 2)}%`;
}

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return "Not stated";
  }

  return format(new Date(value), "d MMM yyyy");
}
