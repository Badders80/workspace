/**
 * Publish HLT — Reads seed data from SSOT_Build, builds HLT listings,
 * validates against the governed schema, and writes the published output.
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HLTEvelopeSchema } from '../src/hlt/marketplace-hlt.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ssotRoot = path.resolve(__dirname, '..');
const ssotBuildRoot = path.resolve(ssotRoot, '..', '..', '..', 'projects', 'SSOT_Build');

const seedPath = path.join(ssotBuildRoot, 'intake', 'v0.1', 'seed.json');
const outputPath = path.join(ssotRoot, 'data', 'published', 'marketplace-hlt.v0.json');

const isWatch = process.argv.includes('--watch');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

// ─── Resolve functions ───────────────────────────────────────────────────────

function resolveReleaseStageEligibility(horse) {
  const readiness = horse?.listing?.readiness ?? 'draft';
  const status = horse?.listing?.status ?? 'local';

  if (readiness === 'published' || status === 'published') {
    return 'production';
  }
  if (readiness === 'publish_ready' || status === 'publish_ready') {
    return 'pending';
  }
  return 'working_on';
}

function hasPublishReadiness(horse, lease, trainer, owner) {
  return Boolean(
    horse?.horse_name &&
      horse?.horse_id &&
      horse?.identity_status &&
      lease?.lease_id &&
      trainer?.trainer_name &&
      owner?.owner_name,
  );
}

function resolvePublishStatus(horse, lease, trainer, owner) {
  if (!hasPublishReadiness(horse, lease, trainer, owner)) {
    return 'draft';
  }

  if (lease.lease_status === 'active' && horse.identity_status === 'verified') {
    return 'live';
  }

  if (lease.lease_status === 'closed' || lease.lease_status === 'expired') {
    return 'closed';
  }

  return 'ready_to_publish';
}

// ─── Build HLT ──────────────────────────────────────────────────────────────

function buildHLT(horse, lease, trainer, owner, documents) {
  const slug = slugify(horse.horse_name);
  const stakeUnitPercent = toNumber(lease.percent_per_token);
  const percentLeased = toNumber(lease.percent_leased);
  const tokenPriceNzd = toNumber(lease.token_price_nzd);
  const tokenCount = toNumber(lease.token_count);
  const requestedUnitsDefault = 1;
  const requestedStakePercentDefault = stakeUnitPercent * requestedUnitsDefault;

  return {
    listingId: `LST-${horse.horse_id}`,
    slug,
    publishStatus: resolvePublishStatus(horse, lease, trainer, owner),
    releaseStageEligibility: resolveReleaseStageEligibility(horse),
    horse: {
      horseId: horse.horse_id,
      name: horse.horse_name,
      countryCode: horse.country_code,
      foalingDate: horse.foaling_date,
      sex: horse.sex,
      colour: horse.colour,
      sire: horse.sire,
      dam: horse.dam,
      nztrLifeNumber: horse.nztr_life_number,
      microchipNumber: horse.microchip_number,
      status: horse.horse_status,
      identityStatus: horse.identity_status,
    },
    linkedParties: {
      trainer: {
        trainerId: trainer.trainer_id,
        trainerName: trainer.trainer_name,
        stableName: trainer.stable_name,
        website: trainer.website,
      },
      owner: {
        ownerId: owner.owner_id,
        ownerName: owner.owner_name,
        entityType: owner.entity_type,
      },
      governingBodyCode: horse.governing_body_code,
    },
    offering: {
      leaseId: lease.lease_id,
      leaseStatus: lease.lease_status,
      startDate: lease.start_date,
      endDate: lease.end_date,
      durationMonths: toNumber(lease.duration_months),
      percentLeased,
      tokenCount,
      percentPerToken: stakeUnitPercent,
      tokenPriceNzd,
      totalIssuanceValueNzd: toNumber(lease.total_issuance_value_nzd),
      investorSharePercent: toNumber(lease.investor_share_percent),
      ownerSharePercent: toNumber(lease.owner_share_percent),
      pricePerOnePercentNzd: toNumber(lease.price_per_one_percent_nzd),
    },
    commercials: {
      model: 'tokinvest_placeholder',
      workflowTarget: null,
      placeholderLabel: 'Tokinvest',
      placeholderReason: 'Dead push placeholder for a marketplace handoff that is not live yet.',
    },
    inventory: {
      unitsIssued: tokenCount,
      unitsAvailable: null,
      unitsReserved: null,
      inventoryStatus: 'manual_tracking',
    },
    performanceSummary: {
      source: horse.performance_summary?.source ?? 'loveracing_profile',
      profileUrl: horse.performance_summary?.profile_url ?? horse.performance_profile_url,
      lastVerifiedAt: horse.performance_summary?.last_verified_at ?? horse.source_last_verified_at,
      starts: horse.performance_summary?.starts ?? null,
      wins: horse.performance_summary?.wins ?? null,
      placings: horse.performance_summary?.placings ?? null,
      stakesEarnedNzd: horse.performance_summary?.stakes_earned_nzd ?? null,
      last3Results: horse.performance_summary?.last_3_results ?? [],
    },
    documents: documents.map((document) => ({
      documentId: document.document_id,
      documentType: document.document_type,
      documentVersion: document.document_version,
      documentDate: document.document_date,
      status: document.is_current === 'yes' ? 'current' : 'historical',
      reference: document.source_reference,
      documentUri: `documents/${document.document_type}/${path.basename(document.file_path)}`,
    })),
    listing: {
      status: horse.listing?.status ?? 'local',
      readiness: horse.listing?.readiness ?? 'draft',
      headline: horse.listing?.headline ?? '',
      heroSummary: horse.listing?.hero_summary ?? '',
      faqSnippets: horse.listing?.faq_snippets ?? [],
      marketplaceNotes: horse.listing?.marketplace_notes ?? '',
      publishedRef: horse.listing?.published_ref ?? (horse.microchip_number || horse.horse_id),
    },
    applicationDefaults: {
      campaignKey: `marketplace-${slug}-apply`,
      minimumStakePercent: stakeUnitPercent,
      maximumStakePercent: percentLeased,
      defaultRequestedStakePercent: requestedStakePercentDefault,
      defaultRequestedUnits: requestedUnitsDefault,
      defaultReservationAmountNzd: Number((requestedUnitsDefault * tokenPriceNzd).toFixed(2)),
    },
    sourceReferences: {
      breedingUrl: horse.breeding_url,
      performanceProfileUrl: horse.performance_profile_url,
      sourcePrimary: horse.source_primary,
      sourceLastVerifiedAt: horse.source_last_verified_at,
      sourceNotes: horse.source_notes,
    },
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function publish() {
  const seed = JSON.parse(await fsp.readFile(seedPath, 'utf8'));

  const hltListings = seed.horses
    .map((horse) => {
      const lease = seed.leases.find((entry) => entry.horse_id === horse.horse_id);
      const trainer = seed.trainers.find((entry) => entry.trainer_id === horse.trainer_id);
      const owner = seed.owners.find((entry) => entry.owner_id === horse.owner_id);
      const documents = seed.documents.filter((entry) => entry.horse_id === horse.horse_id);

      if (!lease || !trainer || !owner) {
        return null;
      }

      return buildHLT(horse, lease, trainer, owner, documents);
    })
    .filter(Boolean);

  const envelope = {
    schemaVersion: 'marketplace-listing.v0',
    generatedAt: new Date().toISOString(),
    sourceSeedPath: 'intake/v0.1/seed.json',
    listings: hltListings,
  };

  // Validate against governed schema before writing
  const result = HLTEvelopeSchema.safeParse(envelope);

  if (!result.success) {
    console.error('❌ HLT validation failed:');
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exitCode = 1;
    return;
  }

  await fsp.mkdir(path.dirname(outputPath), { recursive: true });
  await fsp.writeFile(outputPath, `${JSON.stringify(envelope, null, 2)}\n`);

  console.log(`✅ Published HLT payload (${hltListings.length} listings) to:`);
  console.log(`   ${outputPath}`);
}

async function main() {
  await publish();

  if (isWatch) {
    console.log('👀 Watching for changes... (Ctrl+C to stop)');
    const watcher = fs.watch(path.dirname(seedPath), { recursive: true }, async (eventType) => {
      console.log(`\n🔄 Change detected (${eventType}), republishing...`);
      await publish();
    });
    process.on('SIGINT', () => {
      watcher.close();
      console.log('\nStopped watching.');
      process.exit(0);
    });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
