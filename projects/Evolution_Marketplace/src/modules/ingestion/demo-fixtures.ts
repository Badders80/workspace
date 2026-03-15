import { demoProfiles } from "@/modules/auth/demo-session";
import type {
  MarketplaceListingRecord,
  OfferRecord,
  OwnershipPositionRecord,
  TransactionRecord,
} from "@/modules/listings/types";

export const demoListings: MarketplaceListingRecord[] = [
  {
    id: "demo-listing-inspire",
    slug: "sword-of-state-x-home-alone",
    headline: "Sword of State x Home Alone",
    summary:
      "A value-led colt placement with strong Australasian sire momentum, Sharrock training, and a low-friction entry point for new owners.",
    status: "published",
    percentageAvailable: 25,
    pricePerPercentageNzd: 1278.8,
    minimumPurchasePercentage: 1,
    estimatedMonthlyFeeNzd: 38.8,
    offeringStructure: "equity-stake",
    offerNotes:
      "Source pricing was published as NZD 3,197 per 2.5% share. The MVP seed normalizes this to whole-horse percentage pricing.",
    publishedAt: "2026-03-11T00:00:00.000Z",
    ownerProfileId: demoProfiles.owner.id,
    horse: {
      id: "demo-horse-inspire",
      slug: "sword-of-state-x-home-alone",
      name: "Sword of State x Home Alone",
      sire: "Sword of State",
      dam: "Home Alone",
      damsire: "O'Reilly",
      sex: "colt",
      foaledOn: "2024-10-08",
      colour: null,
      trainerName: "Allan Sharrock",
      vendorName: "Inspire Racing",
      location: "New Zealand",
      overview:
        "An athletic colt with physical scope and a pedigree that blends precocity with New Zealand staying depth through the female line.",
      pedigreeNotes:
        "The source page references O'Reilly and Zabeel through the female family and positions the colt as a 1200m-1600m profile.",
      highlightText: "Outstanding value colt by a rapidly ascending young sire.",
      sourceReferenceLabel: "Inspire Racing listing",
      sourceReferenceUrl:
        "https://www.inspireracing.co.nz/horse-available/12473/sword-of-state-x-home-alone",
      sourceNotes:
        "Commercial terms were partly structured on-page and partly prose. The demo now uses a local copy of the source image and keeps the underlying source reference for attribution.",
    },
    media: [
      {
        id: "demo-media-inspire",
        url: "/demo/inspire-racing-source.jpeg",
        altText: "Sword of State x Home Alone from the Inspire Racing source page",
        isCover: true,
        sortOrder: 0,
      },
    ],
    documents: [
      {
        id: "demo-doc-inspire-source",
        title: "Source Listing",
        kind: "source",
        externalUrl:
          "https://www.inspireracing.co.nz/horse-available/12473/sword-of-state-x-home-alone",
      },
      {
        id: "demo-doc-inspire-notes",
        title: "Demo Seed Notes",
        kind: "offering-brief",
        externalUrl: "/demo/inspire-racing-notes.txt",
      },
    ],
  },
  {
    id: "demo-listing-first-gear",
    slug: "first-gear-nz-2021",
    headline: "First Gear (NZ) 2021",
    summary:
      "A manually normalized demo listing built from breeding-profile data to test non-commercial source ingestion and fallback offer mechanics.",
    status: "published",
    percentageAvailable: 20,
    pricePerPercentageNzd: 980,
    minimumPurchasePercentage: 2.5,
    estimatedMonthlyFeeNzd: 42,
    offeringStructure: "synthetic-demo",
    offerNotes:
      "LOVERACING exposes pedigree data but no sale pricing or ownership availability. Commercial terms here are synthetic and clearly marked as demo-only.",
    publishedAt: "2026-03-11T00:00:00.000Z",
    ownerProfileId: demoProfiles.owner.id,
    horse: {
      id: "demo-horse-first-gear",
      slug: "first-gear-nz-2021",
      name: "First Gear (NZ)",
      sire: "Derryn (AUS)",
      dam: "A'Guin Ace (NZ)",
      damsire: null,
      sex: "gelding",
      foaledOn: "2021-10-02",
      colour: "Bay",
      trainerName: null,
      vendorName: "Evolution Demo Syndication",
      location: "New Zealand",
      overview:
        "A deliberately synthetic marketplace record used to validate normalization when the source is a breeding or stud-book profile rather than a live offering.",
      pedigreeNotes:
        "The underlying source surfaced birth date, colour, sex, sire, and dam but no listing or commercial intent.",
      highlightText: "Synthetic fallback listing derived from a non-commercial source page.",
      sourceReferenceLabel: "LOVERACING breeding profile",
      sourceReferenceUrl:
        "https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx",
      sourceNotes:
        "This horse record proves the ingestion path can carry source pedigree while manually supplying marketplace economics where no listing exists. No horse-specific image was exposed on the source page, so a placeholder remains in use.",
    },
    media: [
      {
        id: "demo-media-first-gear",
        url: "/demo/first-gear.svg",
        altText: "Editorial placeholder for First Gear (NZ)",
        isCover: true,
        sortOrder: 0,
      },
    ],
    documents: [
      {
        id: "demo-doc-first-gear-source",
        title: "Source Breeding Profile",
        kind: "source",
        externalUrl: "https://loveracing.nz/Breeding/428364/First-Gear-NZ-2021.aspx",
      },
      {
        id: "demo-doc-first-gear-notes",
        title: "Normalization Notes",
        kind: "offering-brief",
        externalUrl: "/demo/first-gear-notes.txt",
      },
    ],
  },
  {
    id: "demo-listing-manolo",
    slug: "i-stole-a-manolo",
    headline: "I Stole A Manolo",
    summary:
      "A 2YO filly profile carrying lease-share source language, normalized into whole-horse percentage terms for consistent marketplace handling.",
    status: "published",
    percentageAvailable: 35,
    pricePerPercentageNzd: 1450,
    minimumPurchasePercentage: 1,
    estimatedMonthlyFeeNzd: 65,
    offeringStructure: "lease-share",
    offerNotes:
      "The source exposed monthly fees by percentage share but no clear upfront valuation. Upfront NZD pricing is therefore a demo assumption.",
    publishedAt: "2026-03-11T00:00:00.000Z",
    ownerProfileId: demoProfiles.owner.id,
    horse: {
      id: "demo-horse-manolo",
      slug: "i-stole-a-manolo",
      name: "I Stole A Manolo",
      sire: "Satono Aladdin",
      dam: "Canuhandleajandal",
      damsire: "Jimmy Choux",
      sex: "filly",
      foaledOn: null,
      colour: null,
      trainerName: "Wexford Stables",
      vendorName: "B.A.X LTD",
      location: "New Zealand",
      overview:
        "A smart, scopey filly with educational work completed and an ownership story shaped more like a managed lease-share than a disclosed outright sale.",
      pedigreeNotes:
        "The source references a physically athletic type and close relatives including Aspen Colorado and Canuhandleajandal.",
      highlightText: "Lease-share commercial language normalized for marketplace consistency.",
      sourceReferenceLabel: "B.A.X LTD horse page",
      sourceReferenceUrl: "https://www.baxltd.com/istoleamanolo",
      sourceNotes:
        "Monthly fee data was usable, and the demo now stores a local copy of the source image. Valuation data still required manual normalization.",
    },
    media: [
      {
        id: "demo-media-manolo",
        url: "/demo/i-stole-a-manolo-source.jpeg",
        altText: "I Stole A Manolo from the B.A.X LTD source page",
        isCover: true,
        sortOrder: 0,
      },
    ],
    documents: [
      {
        id: "demo-doc-manolo-source",
        title: "Source Horse Page",
        kind: "source",
        externalUrl: "https://www.baxltd.com/istoleamanolo",
      },
      {
        id: "demo-doc-manolo-notes",
        title: "Demo Seed Notes",
        kind: "offering-brief",
        externalUrl: "/demo/i-stole-a-manolo-notes.txt",
      },
    ],
  },
];

export const demoOffers: OfferRecord[] = [
  {
    id: "demo-offer-submitted",
    listingId: "demo-listing-inspire",
    horseId: "demo-horse-inspire",
    ownerProfileId: demoProfiles.owner.id,
    investorProfileId: demoProfiles.investor.id,
    status: "submitted",
    offeredPercentage: 2.5,
    totalOfferNzd: 3197,
    displayCurrency: "NZD",
    displayTotalAmount: 3197,
    message: "Requesting 2.5% at listed pricing for diligence review.",
    submittedAt: "2026-03-11T02:00:00.000Z",
    reviewedAt: null,
    counterPercentageOfHorse: null,
    counterPricePerPercentageNzd: null,
    counterTotalNzd: null,
    counterMessage: null,
    counteredAt: null,
  },
  {
    id: "demo-offer-countered",
    listingId: "demo-listing-manolo",
    horseId: "demo-horse-manolo",
    ownerProfileId: demoProfiles.owner.id,
    investorProfileId: demoProfiles.investor.id,
    status: "countered",
    offeredPercentage: 5,
    totalOfferNzd: 7250,
    displayCurrency: "NZD",
    displayTotalAmount: 7250,
    message: "Indicative interest for 5% with room to improve price.",
    submittedAt: "2026-03-10T22:00:00.000Z",
    reviewedAt: "2026-03-11T00:30:00.000Z",
    counterPercentageOfHorse: 5,
    counterPricePerPercentageNzd: 1500,
    counterTotalNzd: 7500,
    counterMessage: "Countered to listed lease-share terms.",
    counteredAt: "2026-03-11T00:30:00.000Z",
  },
  {
    id: "demo-offer-accepted",
    listingId: "demo-listing-first-gear",
    horseId: "demo-horse-first-gear",
    ownerProfileId: demoProfiles.owner.id,
    investorProfileId: demoProfiles.investor.id,
    status: "accepted",
    offeredPercentage: 2.5,
    totalOfferNzd: 2450,
    displayCurrency: "NZD",
    displayTotalAmount: 2450,
    message: "Accepted allocation awaiting payment instructions.",
    submittedAt: "2026-03-10T18:00:00.000Z",
    reviewedAt: "2026-03-10T20:00:00.000Z",
    counterPercentageOfHorse: null,
    counterPricePerPercentageNzd: null,
    counterTotalNzd: null,
    counterMessage: null,
    counteredAt: null,
  },
];

export const demoTransactions: TransactionRecord[] = [
  {
    id: "demo-transaction-accepted",
    offerId: "demo-offer-accepted",
    listingId: "demo-listing-first-gear",
    horseId: "demo-horse-first-gear",
    ownerProfileId: demoProfiles.owner.id,
    investorProfileId: demoProfiles.investor.id,
    state: "instructions_sent",
    paymentProvider: "manual-instructions",
    paymentReference: "EVM-DEMO2450",
    instructionsSummary:
      "Manual payment instruction issued for NZD settlement. Demo flow only.",
    instructionDueAt: "2026-03-14T00:00:00.000Z",
    fundsReceivedAt: null,
    settledAt: null,
  },
];

export const demoOwnershipPositions: OwnershipPositionRecord[] = [
  {
    id: "demo-owner-position-inspire",
    horseId: "demo-horse-inspire",
    profileId: demoProfiles.owner.id,
    percentageOwned: 100,
    averageCostNzd: 0,
    horse: demoListings[0].horse,
  },
  {
    id: "demo-owner-position-first-gear",
    horseId: "demo-horse-first-gear",
    profileId: demoProfiles.owner.id,
    percentageOwned: 100,
    averageCostNzd: 0,
    horse: demoListings[1].horse,
  },
  {
    id: "demo-owner-position-manolo",
    horseId: "demo-horse-manolo",
    profileId: demoProfiles.owner.id,
    percentageOwned: 100,
    averageCostNzd: 0,
    horse: demoListings[2].horse,
  },
];

export function getDemoListingById(listingId: string) {
  return demoListings.find((listing) => listing.id === listingId) ?? null;
}

export function getDemoListingBySlug(slug: string) {
  return demoListings.find((listing) => listing.slug === slug) ?? null;
}
