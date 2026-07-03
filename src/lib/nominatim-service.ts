/**
 * Nominatim Service
 *
 * Geocoding service for city search via OpenStreetMap's Nominatim API.
 * Caches results in memory with a 24-hour TTL.
 */

import type { CitySearchResult } from "@/types";
import {
  NOMINATIM_BASE,
  DEFAULT_USER_AGENT,
  NOMINATIM_TIMEOUT_MS,
  NOMINATIM_CACHE_TTL,
  RATE_LIMIT_INTERVAL_MS,
} from "./constants";
import { RateLimiter } from "./rate-limiter";

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

interface CacheEntry {
  data: CitySearchResult;
  timestamp: number;
}

const geocodeCache = new Map<string, CacheEntry>();

function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < NOMINATIM_CACHE_TTL;
}

// ---------------------------------------------------------------------------
// Rate limiter (separate from Overpass to be safe, but same interval)
// ---------------------------------------------------------------------------

const rateLimiter = new RateLimiter(RATE_LIMIT_INTERVAL_MS);

// ---------------------------------------------------------------------------
// Types for Nominatim response
// ---------------------------------------------------------------------------

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: string[];
  place_rank: number;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Geocode a city name via Nominatim.
 * Returns the result with the highest place_rank, or null if no results.
 *
 * @param city - The city name to search for.
 * @returns A CitySearchResult, or null if not found or on error.
 */
export async function geocodeCity(
  city: string,
): Promise<CitySearchResult | null> {
  const cacheKey = city.toLowerCase().trim();

  // Check cache
  const cached = geocodeCache.get(cacheKey);
  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  // Rate limit
  await rateLimiter.throttle();

  const url = `${NOMINATIM_BASE}?q=${encodeURIComponent(city)}&format=json&limit=5`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), NOMINATIM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": DEFAULT_USER_AGENT,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const results = (await response.json()) as NominatimResult[];

    if (!results || results.length === 0) {
      return null;
    }

    // Pick the result with the highest place_rank
    const best = results.reduce((prev, curr) =>
      curr.place_rank > prev.place_rank ? curr : prev,
    );

    const result: CitySearchResult = {
      lat: parseFloat(best.lat),
      lng: parseFloat(best.lon),
      bbox: [
        parseFloat(best.boundingbox[0]),
        parseFloat(best.boundingbox[1]),
        parseFloat(best.boundingbox[2]),
        parseFloat(best.boundingbox[3]),
      ] as [number, number, number, number],
      displayName: best.display_name,
    };

    // Cache
    geocodeCache.set(cacheKey, { data: result, timestamp: Date.now() });

    return result;
  } catch {
    // Silent failure — return null on any error
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
