import { z } from "zod";
import { currencyOptions, roleOptions } from "@/lib/constants";

export const profileFormSchema = z.object({
  fullName: z.string().min(2),
  displayName: z.string().min(2),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(roleOptions),
  preferredDisplayCurrency: z.enum(currencyOptions),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
