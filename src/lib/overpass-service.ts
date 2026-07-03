/**
 * Overpass API Service
 *
 * Queries OpenStreetMap via the Overpass API to find properties
 * by Travelio category. Supports in-memory caching with TTL,
 * rate limiting, and automatic fallback between mirrors.
 */

import type { TravelioProperty, TravelioCategory } from "@/types";
import {
  OVERPASS_ENDPOINTS,
  OVERPASS_TIMEOUT_MS,
  OVERPASS_MAX_RESULTS,
  DEFAULT_USER_AGENT,
  OVERPASS_CACHE_TTL,
  RATE_LIMIT_INTERVAL_MS,
  CATEGORY_OSM_MAP,
} from "./constants";
import { RateLimiter } from "./rate-limiter";

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

interface CacheEntry {
  data: TravelioProperty[];
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < OVERPASS_CACHE_TTL;
}

// ---------------------------------------------------------------------------
// Rate limiter (shared instance)
// ---------------------------------------------------------------------------

const rateLimiter = new RateLimiter(RATE_LIMIT_INTERVAL_MS);

// ---------------------------------------------------------------------------
// OSM Amenity mapping
// ---------------------------------------------------------------------------

const AMENITY_MAP: Record<string, string> = {
  "internet_access": "wifi",
  "wifi": "wifi",
  "pool": "pool",
  "breakfast": "breakfast",
  "parking": "parking",
  "air_conditioning": "air conditioning",
  "restaurant": "restaurant",
  "bar": "bar",
  "gym": "gym",
  "sauna": "sauna",
  "wheelchair": "wheelchair accessible",
  "pets": "pet friendly",
  "smoking": "smoking allowed",
};

function extractAmenities(tags: Record<string, string>): string[] {
  const amenities: string[] = [];
  for (const [key, label] of Object.entries(AMENITY_MAP)) {
    if (tags[key] === "yes" || tags[key] === "true") {
      if (!amenities.includes(label)) amenities.push(label);
    }
  }
  return amenities;
}

// ---------------------------------------------------------------------------
// OSM element → TravelioProperty
// ---------------------------------------------------------------------------

function osmToTravelio(element: any, category: string): TravelioProperty {
  const tags = element.tags || {};
  const center = element.center || element;
  return {
    id: `osm-${element.type}-${element.id}`,
    name: tags.name || "Unknown",
    description: tags.description || tags.note || "",
    category,
    type: tags.tourism || "hotel",
    stars: tags.stars ? parseInt(tags.stars, 10) : undefined,
    address: [tags["addr:housenumber"], tags["addr:street"]]
      .filter(Boolean)
      .join(" ") || undefined,
    city: tags["addr:city"] || undefined,
    country: tags["addr:country"] || undefined,
    lat: center.lat,
    lng: center.lon ?? center.lng,
    amenities: extractAmenities(tags),
    images: [], // wikidata-service handles this
    website: tags.website || tags["contact:website"] || undefined,
    phone: tags.phone || tags["contact:phone"] || undefined,
    wikidata: tags.wikidata || tags["brand:wikidata"] || undefined,
  };
}

// ---------------------------------------------------------------------------
// Query building
// ---------------------------------------------------------------------------

function buildCategoryQuery(area: string, types: string[]): string {
  const areaLine = `area[name="${area}"]->.searchArea;`;

  if (types.length === 1) {
    return `[out:json];\n${areaLine}\nnwr["tourism"="${types[0]}"];(area.searchArea);\nout center ${OVERPASS_MAX_RESULTS};`;
  }

  // Multiple types → use union block
  const unionBody = types
    .map((t) => `  nwr["tourism"="${t}"](area.searchArea);`)
    .join("\n");

  return `[out:json];\n${areaLine}\n(\n${unionBody}\n);\nout center ${OVERPASS_MAX_RESULTS};`;
}

// ---------------------------------------------------------------------------
// HTTP fetch with timeout and fallback
// ---------------------------------------------------------------------------

interface OverpassResponse {
  elements: any[];
}

async function fetchOverpass(
  query: string,
  abortSignal: AbortSignal,
): Promise<OverpassResponse | null> {
  // Try each endpoint in order
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": DEFAULT_USER_AGENT,
        },
        body: new URLSearchParams({ data: query }),
        signal: abortSignal,
      });

      if (response.status === 429) {
        // Rate limited — wait 2s and try next mirror
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      if (!response.ok) {
        continue; // try next endpoint
      }

      return (await response.json()) as OverpassResponse;
    } catch {
      // Connection error or timeout — try next endpoint
      continue;
    }
  }

  return null; // all endpoints failed
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch properties for a given Travelio category.
 * Results are cached in memory with a 1-hour TTL.
 *
 * @param category - The category to search for.
 * @param options  - Optional page number for offset-based pagination.
 * @returns An array of TravelioProperty objects (empty if no results or error).
 */
export async function getPropertiesByCategory(
  category: TravelioCategory,
  options?: { page?: number },
): Promise<TravelioProperty[]> {
  const cacheKey = `category:${category}:page:${options?.page ?? 1}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  // Build query
  const mapping = CATEGORY_OSM_MAP[category];
  if (!mapping) {
    return [];
  }

  const query = buildCategoryQuery(mapping.area, mapping.types);
  const page = options?.page ?? 1;
  const offset = (page - 1) * OVERPASS_MAX_RESULTS;

  // Add offset comment to query (Overpass doesn't support LIMIT OFFSET natively,
  // so we fetch and filter in-memory)
  const offsetQuery = `${query}\n// offset: ${offset}`;

  // Rate limit
  await rateLimiter.throttle();

  // Fetch with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OVERPASS_TIMEOUT_MS);

  let result: OverpassResponse | null = null;
  try {
    result = await fetchOverpass(offsetQuery, controller.signal);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!result || !result.elements || result.elements.length === 0) {
    return []; // empty, not an error
  }

  // Map OSM elements to TravelioProperty
  const allProperties = result.elements.map((el) =>
    osmToTravelio(el, category),
  );

  // In-memory pagination: skip to offset, cap at max
  const properties = allProperties.slice(offset, offset + OVERPASS_MAX_RESULTS);

  // Cache the result
  cache.set(cacheKey, { data: properties, timestamp: Date.now() });

  return properties;
}

/**
 * Fetch a single property by its prefixed OSM ID (e.g. "osm-node-12345").
 *
 * @param id - The prefixed OSM ID.
 * @returns The property, or null if not found.
 */
export async function getPropertyById(
  id: string,
): Promise<TravelioProperty | null> {
  // Parse the prefixed ID: osm-{type}-{id}
  const parts = id.match(/^osm-(node|way|relation)-(\d+)$/);
  if (!parts) return null;

  const osmType = parts[1];
  const osmId = parts[2];

  const query = `[out:json];\n${osmType}(${osmId});\nout center 1;`;

  // Rate limit
  await rateLimiter.throttle();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OVERPASS_TIMEOUT_MS);

  let result: OverpassResponse | null = null;
  try {
    result = await fetchOverpass(query, controller.signal);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!result || !result.elements || result.elements.length === 0) {
    return null;
  }

  const element = result.elements[0];
  // We don't know the category at this point, so infer from tags or default
  const tagCategory = element.tags?.tourism || "hotel";
  return osmToTravelio(element, tagCategory);
}
