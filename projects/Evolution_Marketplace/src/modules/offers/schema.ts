import { z } from "zod";
import { currencyOptions } from "@/lib/constants";

export const offerFormSchema = z.object({
  offeredPercentage: z.number().gt(0).max(100),
  displayCurrency: z.enum(currencyOptions),
  message: z.string().optional(),
});

export const counterOfferSchema = z.object({
  counterPercentageOfHorse: z.number().gt(0).max(100),
  counterPricePerPercentageNzd: z.number().gt(0),
  counterMessage: z.string().optional(),
});

export type OfferFormValues = z.infer<typeof offerFormSchema>;
export type CounterOfferValues = z.infer<typeof counterOfferSchema>;
