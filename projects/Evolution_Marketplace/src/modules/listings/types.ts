import type {
  CurrencyCode,
  ListingStatus,
  OfferStatus,
  OfferingStructure,
  TransactionStatus,
} from "@/types/database";
import type { HorseRecord } from "@/modules/horses/types";

export interface ListingMediaRecord {
  id: string;
  url: string;
  altText: string | null;
  isCover: boolean;
  sortOrder: number;
}

export interface ListingDocumentRecord {
  id: string;
  title: string;
  kind: "source" | "offering-brief" | "terms";
  externalUrl: string | null;
}

export interface MarketplaceListingRecord {
  id: string;
  slug: string;
  headline: string;
  summary: string | null;
  status: ListingStatus;
  percentageAvailable: number;
  pricePerPercentageNzd: number;
  minimumPurchasePercentage: number;
  estimatedMonthlyFeeNzd: number | null;
  offeringStructure: OfferingStructure;
  offerNotes: string | null;
  publishedAt: string | null;
  ownerProfileId: string | null;
  horse: HorseRecord;
  media: ListingMediaRecord[];
  documents: ListingDocumentRecord[];
}

export interface ProfileSnapshot {
  id: string;
  displayName: string;
  companyName: string | null;
  role: "owner" | "investor" | "admin";
  preferredDisplayCurrency: CurrencyCode;
}

export interface OfferRecord {
  id: string;
  listingId: string;
  horseId: string;
  ownerProfileId: string;
  investorProfileId: string;
  status: OfferStatus;
  offeredPercentage: number;
  totalOfferNzd: number;
  displayCurrency: CurrencyCode;
  displayTotalAmount: number | null;
  message: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  counterPercentageOfHorse: number | null;
  counterPricePerPercentageNzd: number | null;
  counterTotalNzd: number | null;
  counterMessage: string | null;
  counteredAt: string | null;
  listing?: MarketplaceListingRecord | null;
}

export interface TransactionRecord {
  id: string;
  offerId: string;
  listingId: string;
  horseId: string;
  ownerProfileId: string;
  investorProfileId: string;
  state: TransactionStatus;
  paymentProvider: string | null;
  paymentReference: string | null;
  instructionsSummary: string | null;
  instructionDueAt: string | null;
  fundsReceivedAt: string | null;
  settledAt: string | null;
  listing?: MarketplaceListingRecord | null;
  offer?: OfferRecord | null;
}

export interface OwnershipPositionRecord {
  id: string;
  horseId: string;
  profileId: string;
  percentageOwned: number;
  averageCostNzd: number | null;
  horse?: HorseRecord | null;
}
