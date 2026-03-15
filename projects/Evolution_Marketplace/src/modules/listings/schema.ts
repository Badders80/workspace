import { z } from "zod";
import type { ListingStatus, OfferingStructure } from "@/types/database";

export const listingStatusValues: ListingStatus[] = [
  "draft",
  "review",
  "published",
  "paused",
  "closed",
  "sold_out",
];

export const offeringStructureValues: OfferingStructure[] = [
  "equity-stake",
  "lease-share",
  "synthetic-demo",
];

export const listingFormSchema = z.object({
  horseName: z.string().min(2),
  sire: z.string().optional(),
  dam: z.string().optional(),
  damsire: z.string().optional(),
  sex: z.enum(["colt", "filly", "gelding", "horse", "mare", "unknown"]),
  foaledOn: z.string().optional(),
  colour: z.string().optional(),
  trainerName: z.string().optional(),
  vendorName: z.string().optional(),
  location: z.string().optional(),
  overview: z.string().min(20),
  pedigreeNotes: z.string().optional(),
  highlightText: z.string().optional(),
  headline: z.string().min(4),
  summary: z.string().min(12),
  percentageAvailable: z.number().gt(0).max(100),
  pricePerPercentageNzd: z.number().gt(0),
  minimumPurchasePercentage: z.number().gt(0).max(100),
  estimatedMonthlyFeeNzd: z.number().min(0).nullable(),
  offeringStructure: z.enum(offeringStructureValues),
  offerNotes: z.string().optional(),
  sourceReferenceLabel: z.string().optional(),
  sourceReferenceUrl: z.string().url().optional().or(z.literal("")),
  sourceNotes: z.string().optional(),
  mediaUrls: z.array(z.string().min(1)).min(1),
  documentUrls: z.array(z.string().min(1)).optional().default([]),
  status: z.enum(listingStatusValues),
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;
