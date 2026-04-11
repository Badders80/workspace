/**
 * HLT Parity Test — Validates that the published HLT output
 * conforms to the governed schema.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HLTSchema, HLTEvelopeSchema } from '../src/hlt/marketplace-hlt.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ssotRoot = path.resolve(__dirname, '..');
const publishedPath = path.join(ssotRoot, 'data', 'published', 'marketplace-hlt.v0.json');

describe('HLT Parity', () => {
  it('published file exists', async () => {
    const stat = await fs.stat(publishedPath);
    assert.ok(stat.isFile(), 'Published HLT file must exist');
  });

  it('published envelope validates against governed schema', async () => {
    const raw = await fs.readFile(publishedPath, 'utf8');
    const envelope = JSON.parse(raw);

    const result = HLTEvelopeSchema.safeParse(envelope);
    assert.ok(result.success, `Envelope validation failed: ${result.success ? '' : JSON.stringify(result.error.issues, null, 2)}`);
  });

  it('every listing has a valid LST- listingId', async () => {
    const raw = await fs.readFile(publishedPath, 'utf8');
    const envelope = JSON.parse(raw);

    for (const listing of envelope.listings) {
      assert.match(
        listing.listingId,
        /^LST-/,
        `listingId "${listing.listingId}" must follow LST-{horseId} format`,
      );
    }
  });

  it('every listing has a valid releaseStageEligibility', async () => {
    const raw = await fs.readFile(publishedPath, 'utf8');
    const envelope = JSON.parse(raw);
    const validStages = ['working_on', 'pending', 'production'];

    for (const listing of envelope.listings) {
      assert.ok(
        validStages.includes(listing.releaseStageEligibility),
        `releaseStageEligibility "${listing.releaseStageEligibility}" must be one of: ${validStages.join(', ')}`,
      );
    }
  });

  it('every listing has commercials metadata', async () => {
    const raw = await fs.readFile(publishedPath, 'utf8');
    const envelope = JSON.parse(raw);

    for (const listing of envelope.listings) {
      assert.ok(listing.commercials, 'Commercials metadata must exist');
      assert.ok(
        ['workflow', 'tokinvest_placeholder'].includes(listing.commercials.model),
        'Commercials model must be workflow or tokinvest_placeholder',
      );
    }
  });

  it('no listing contains filePath in documents', async () => {
    const raw = await fs.readFile(publishedPath, 'utf8');
    const envelope = JSON.parse(raw);

    for (const listing of envelope.listings) {
      for (const doc of listing.documents) {
        assert.equal(
          Object.hasOwn(doc, 'filePath'),
          false,
          `Document ${doc.documentId} must not contain filePath — use documentUri instead`,
        );
        assert.ok(doc.documentUri, `Document ${doc.documentId} must have documentUri`);
      }
    }
  });

  it('schemaVersion is marketplace-listing.v0', async () => {
    const raw = await fs.readFile(publishedPath, 'utf8');
    const envelope = JSON.parse(raw);

    assert.equal(envelope.schemaVersion, 'marketplace-listing.v0');
  });
});
