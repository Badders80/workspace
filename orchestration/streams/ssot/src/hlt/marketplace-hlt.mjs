/**
 * Horse Lease Token (HLT) — Governed Schema v0
 *
 * This is the single source of truth for the HLT contract shape.
 * Both SSOT producer and Platform consumer must validate against this schema.
 */

import { z } from 'zod';

// ─── Enums ───────────────────────────────────────────────────────────────────

export const PublishStatus = z.enum(['draft', 'ready_to_publish', 'live', 'closed']);

export const ReleaseStageEligibility = z.enum(['working_on', 'pending', 'production']);

export const DocumentStatus = z.enum(['current', 'historical']);

export const InventoryStatus = z.enum(['manual_tracking', 'automated']);

export const LeaseStatus = z.enum(['active', 'pending', 'closed', 'expired']);

// ─── Sub-schemas ─────────────────────────────────────────────────────────────

export const HorseSchema = z.object({
  horseId: z.string().min(1),
  name: z.string().min(1),
  countryCode: z.string().min(2).max(3),
  foalingDate: z.string().nullable(),
  sex: z.string().nullable(),
  colour: z.string().nullable(),
  sire: z.string().nullable(),
  dam: z.string().nullable(),
  nztrLifeNumber: z.string().nullable(),
  microchipNumber: z.string().nullable(),
  status: z.string().nullable(),
  identityStatus: z.string().nullable(),
});

export const TrainerSchema = z.object({
  trainerId: z.string().min(1),
  trainerName: z.string().min(1),
  stableName: z.string().nullable(),
  website: z.string().nullable(),
});

export const OwnerSchema = z.object({
  ownerId: z.string().min(1),
  ownerName: z.string().min(1),
  entityType: z.string().nullable(),
});

export const LinkedPartiesSchema = z.object({
  trainer: TrainerSchema,
  owner: OwnerSchema,
  governingBodyCode: z.string().nullable(),
});

export const OfferingSchema = z.object({
  leaseId: z.string().min(1),
  leaseStatus: LeaseStatus,
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  durationMonths: z.number(),
  percentLeased: z.number(),
  tokenCount: z.number(),
  percentPerToken: z.number(),
  tokenPriceNzd: z.number(),
  totalIssuanceValueNzd: z.number(),
  investorSharePercent: z.number(),
  ownerSharePercent: z.number(),
  pricePerOnePercentNzd: z.number(),
});

export const CommercialsSchema = z.object({
  model: z.enum(['workflow', 'tokinvest_placeholder']),
  workflowTarget: z.string().nullable(),
  placeholderLabel: z.string().nullable(),
  placeholderReason: z.string().nullable(),
});

export const InventorySchema = z.object({
  unitsIssued: z.number(),
  unitsAvailable: z.number().nullable(),
  unitsReserved: z.number().nullable(),
  inventoryStatus: InventoryStatus,
});

export const PerformanceSummarySchema = z.object({
  source: z.string(),
  profileUrl: z.string().nullable(),
  lastVerifiedAt: z.string().nullable(),
  starts: z.number().nullable(),
  wins: z.number().nullable(),
  placings: z.number().nullable(),
  stakesEarnedNzd: z.number().nullable(),
  last3Results: z.array(z.string()).nullable(),
});

export const DocumentSchema = z.object({
  documentId: z.string().min(1),
  documentType: z.string().min(1),
  documentVersion: z.string().nullable(),
  documentDate: z.string().nullable(),
  status: DocumentStatus,
  reference: z.string().nullable(),
  documentUri: z.string().min(1),
});

export const ListingMetaSchema = z.object({
  status: z.string(),
  readiness: z.string(),
  headline: z.string(),
  heroSummary: z.string(),
  faqSnippets: z.array(z.string()),
  marketplaceNotes: z.string(),
  publishedRef: z.string(),
});

export const ApplicationDefaultsSchema = z.object({
  campaignKey: z.string().min(1),
  minimumStakePercent: z.number(),
  maximumStakePercent: z.number(),
  defaultRequestedStakePercent: z.number(),
  defaultRequestedUnits: z.number(),
  defaultReservationAmountNzd: z.number(),
});

export const SourceReferencesSchema = z.object({
  breedingUrl: z.string().nullable(),
  performanceProfileUrl: z.string().nullable(),
  sourcePrimary: z.string().nullable(),
  sourceLastVerifiedAt: z.string().nullable(),
  sourceNotes: z.string().nullable(),
});

// ─── Top-level HLT ───────────────────────────────────────────────────────────

export const HLTSchema = z.object({
  listingId: z.string().regex(/^LST-/, 'listingId must follow LST-{horseId} format'),
  slug: z.string().min(1),
  publishStatus: PublishStatus,
  releaseStageEligibility: ReleaseStageEligibility,
  horse: HorseSchema,
  linkedParties: LinkedPartiesSchema,
  offering: OfferingSchema,
  commercials: CommercialsSchema,
  inventory: InventorySchema,
  performanceSummary: PerformanceSummarySchema,
  documents: z.array(DocumentSchema),
  listing: ListingMetaSchema,
  applicationDefaults: ApplicationDefaultsSchema,
  sourceReferences: SourceReferencesSchema,
});

// ─── Envelope ────────────────────────────────────────────────────────────────

export const HLTEvelopeSchema = z.object({
  schemaVersion: z.literal('marketplace-listing.v0'),
  generatedAt: z.string().datetime(),
  sourceSeedPath: z.string().min(1),
  listings: z.array(HLTSchema),
});

/**
 * @typedef {z.infer<typeof HLTSchema>} HLT
 */

/**
 * @typedef {z.infer<typeof HLTEvelopeSchema>} HLTEvelope
 */
