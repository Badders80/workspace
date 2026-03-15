export interface AssetFeedItem {
  id: string;
  title: string;
  detail: string;
  meta: string;
}

export interface AssetDetailContent {
  marketNote: string;
  news: AssetFeedItem[];
  results: AssetFeedItem[];
  upcoming: AssetFeedItem[];
  diligence: AssetFeedItem[];
}

const fallbackDetailContent: AssetDetailContent = {
  marketNote:
    "Operational placeholders are active for news, results, and upcoming races until a durable racing-data feed is connected.",
  news: [
    {
      id: "news-placeholder",
      title: "News feed not connected",
      detail:
        "This MVP keeps the asset page ready for operational updates, but no external news ingestion is running yet.",
      meta: "Placeholder",
    },
  ],
  results: [
    {
      id: "results-placeholder",
      title: "Results not loaded",
      detail:
        "Structured race-result ingestion is still future work, so the results rail stays in placeholder mode.",
      meta: "Placeholder",
    },
  ],
  upcoming: [
    {
      id: "upcoming-placeholder",
      title: "Upcoming races not loaded",
      detail:
        "This space is reserved for nominations, acceptances, and planned targets once the race-data layer exists.",
      meta: "Placeholder",
    },
  ],
  diligence: [
    {
      id: "docs-placeholder",
      title: "Diligence room",
      detail:
        "Supporting documents and operational notes can be attached here as the listing moves toward live execution.",
      meta: "Placeholder",
    },
  ],
};

const detailContentBySlug: Record<string, AssetDetailContent> = {
  "sword-of-state-x-home-alone": {
    marketNote:
      "The source page carries stronger commercial disclosure than the other demo seeds, including stated share pricing, trainer context, and operational cost language.",
    news: [
      {
        id: "inspire-news-1",
        title: "Sword of State momentum remains a core talking point",
        detail:
          "The source narrative leans heavily on early sire performance and commercial demand, which is why that sits at the top of the asset thesis.",
        meta: "Source narrative",
      },
      {
        id: "inspire-news-2",
        title: "Insurance and vet protocol references are already disclosed",
        detail:
          "The page explicitly references veterinary clearance and insured status, making this the cleanest diligence-style source of the three demo horses.",
        meta: "Disclosure note",
      },
    ],
    results: [
      {
        id: "inspire-results-1",
        title: "No official race results yet",
        detail:
          "This is an unraced colt listing in the MVP seed, so the results panel is intentionally a placeholder until race data exists.",
        meta: "Unraced asset",
      },
    ],
    upcoming: [
      {
        id: "inspire-upcoming-1",
        title: "Education and stable milestones pending",
        detail:
          "Upcoming work, trial timing, and target races are not connected to the app yet and would be added by owner operations.",
        meta: "Ops input required",
      },
    ],
    diligence: [
      {
        id: "inspire-diligence-1",
        title: "Commercial terms were normalized from 2.5% share pricing",
        detail:
          "The source publishes NZD 3,197 per 2.5% share, which has been normalized into a per-1% marketplace price for consistent ticket handling.",
        meta: "Normalization",
      },
      {
        id: "inspire-diligence-2",
        title: "Source image pulled through for the demo asset card",
        detail:
          "A local copy of the source hero image is stored with the demo content so the marketplace does not depend on remote hotlinking.",
        meta: "Media",
      },
    ],
  },
  "first-gear-nz-2021": {
    marketNote:
      "This asset proves the marketplace can hold a real horse record even when the source is only a breeding profile and contains no live investment terms.",
    news: [
      {
        id: "first-gear-news-1",
        title: "Breeding profile only",
        detail:
          "The source page is a horse profile, not a listing. News and commercial updates therefore need manual ops input in the MVP.",
        meta: "Source limitation",
      },
    ],
    results: [
      {
        id: "first-gear-results-1",
        title: "No normalized result feed attached",
        detail:
          "The app has no race-result connector yet, and the seed economics for this horse are synthetic rather than source-derived.",
        meta: "Demo-only",
      },
    ],
    upcoming: [
      {
        id: "first-gear-upcoming-1",
        title: "Upcoming race targets not connected",
        detail:
          "Future race planning is left open because the source does not provide an execution-ready ownership or stable-management context.",
        meta: "Placeholder",
      },
    ],
    diligence: [
      {
        id: "first-gear-diligence-1",
        title: "No horse-specific sale image was exposed on the source page",
        detail:
          "The listing retains a local placeholder because the source page did not present a reliable horse image alongside the pedigree record.",
        meta: "Media limitation",
      },
      {
        id: "first-gear-diligence-2",
        title: "Pricing and available stake are manual demo inputs",
        detail:
          "The source provided pedigree and identity fields only, so all marketplace economics for this asset are synthetic and clearly marked as such.",
        meta: "Normalization",
      },
    ],
  },
  "i-stole-a-manolo": {
    marketNote:
      "This asset is useful because the source behaves more like a managed-interest sales page than a standardized outright ownership offering.",
    news: [
      {
        id: "manolo-news-1",
        title: "Source page combines media, percentage options, and inquiry flow",
        detail:
          "The page surfaces interest capture and share bands, but it still lacks a normalized marketplace-style headline price for outright ownership.",
        meta: "Source structure",
      },
    ],
    results: [
      {
        id: "manolo-results-1",
        title: "Results rail reserved for future race data",
        detail:
          "No official result ingestion is wired into the MVP yet, so this section is intentionally operational scaffolding.",
        meta: "Placeholder",
      },
    ],
    upcoming: [
      {
        id: "manolo-upcoming-1",
        title: "Upcoming race schedule pending stable input",
        detail:
          "Training updates and target races would be entered manually until a proper racing calendar integration is introduced.",
        meta: "Ops input required",
      },
    ],
    diligence: [
      {
        id: "manolo-diligence-1",
        title: "Source image pulled through from the asset page",
        detail:
          "The demo now uses a local copy of the source image so the listing presents as a real asset rather than a generic placeholder.",
        meta: "Media",
      },
      {
        id: "manolo-diligence-2",
        title: "Lease-share language was normalized into whole-horse percentages",
        detail:
          "The listing translates source share language into Phase 1 marketplace rules where all percentages refer to the whole horse.",
        meta: "Normalization",
      },
    ],
  },
};

export function getAssetDetailContent(slug: string) {
  return detailContentBySlug[slug] ?? fallbackDetailContent;
}
