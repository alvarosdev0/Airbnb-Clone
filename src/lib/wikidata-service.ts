/**
 * Wikidata Service
 *
 * Fetches photos from Wikidata for a given QID.
 * Extracts the P18 (image) property and returns Wikimedia file URLs.
 */

import {
  WIKIDATA_BASE,
  WIKIMEDIA_FILE_BASE,
  DEFAULT_USER_AGENT,
  WIKIDATA_TIMEOUT_MS,
  WIKIDATA_CACHE_TTL,
} from "./constants";

// ---------------------------------------------------------------------------
// Cache (permanent — wikidata entries don't change)
// ---------------------------------------------------------------------------

const photoCache = new Map<string, string[]>();

// ---------------------------------------------------------------------------
// Types for the Wikidata response
// ---------------------------------------------------------------------------

interface WikidataEntity {
  claims?: Record<string, Array<{ mainsnak?: { datavalue?: { value?: string } } }>>;
}

interface WikidataResponse {
  entities?: Record<string, WikidataEntity>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch photos for a given Wikidata QID.
 *
 * @param qid - The Wikidata entity ID (e.g. "Q904945").
 * @returns An array of Wikimedia file URLs, or an empty array if none found.
 */
export async function getWikidataPhotos(qid: string): Promise<string[]> {
  // Strip possible URL prefix if someone passes a full URL
  const cleanQid = qid.replace(/^https?:\/\/www\.wikidata\.org\/(wiki|entity)\//, "");

  // Check cache
  const cached = photoCache.get(cleanQid);
  if (cached !== undefined) {
    return cached;
  }

  const url = `${WIKIDATA_BASE}/${cleanQid}.json`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WIKIDATA_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": DEFAULT_USER_AGENT },
      signal: controller.signal,
    });

    if (!response.ok) {
      photoCache.set(cleanQid, []);
      return [];
    }

    const data = (await response.json()) as WikidataResponse;
    const entity = data.entities?.[cleanQid];

    if (!entity?.claims?.P18) {
      photoCache.set(cleanQid, []);
      return [];
    }

    // Extract all P18 image filenames
    const filenames: string[] = [];
    for (const claim of entity.claims.P18) {
      const value = claim.mainsnak?.datavalue?.value;
      if (value && typeof value === "string") {
        filenames.push(value);
      }
    }

    // Build Wikimedia file URLs
    const photos = filenames.map(
      (filename) =>
        `${WIKIMEDIA_FILE_BASE}/${encodeURIComponent(filename.replace(/ /g, "_"))}`,
    );

    // Cache (permanent)
    photoCache.set(cleanQid, photos);

    return photos;
  } catch {
    // Silent failure — return empty on any error
    photoCache.set(cleanQid, []);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}
