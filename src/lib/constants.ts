import type { TravelioCategory } from "@/types";

// ---------------------------------------------------------------------------
// Overpass API endpoints (mirrors)
// ---------------------------------------------------------------------------

export const OVERPASS_ENDPOINTS = [
  "https://gall.openstreetmap.de/api/interpreter",
  "https://overpass-api.de/api/interpreter",
] as const;

// ---------------------------------------------------------------------------
// Wikidata
// ---------------------------------------------------------------------------

export const WIKIDATA_BASE = "https://www.wikidata.org/wiki/Special:EntityData";
export const WIKIMEDIA_FILE_BASE = "https://commons.wikimedia.org/wiki/Special:FilePath";

// ---------------------------------------------------------------------------
// Nominatim
// ---------------------------------------------------------------------------

export const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_USER_AGENT = "Travelio/1.0";
export const OVERPASS_TIMEOUT_MS = 10_000;
export const OVERPASS_MAX_RESULTS = 50;
export const WIKIDATA_TIMEOUT_MS = 5_000;
export const NOMINATIM_TIMEOUT_MS = 5_000;

// ---------------------------------------------------------------------------
// Cache TTLs (milliseconds)
// ---------------------------------------------------------------------------

export const OVERPASS_CACHE_TTL = 60 * 60 * 1000; // 1 hour
export const WIKIDATA_CACHE_TTL = Infinity; // permanent — wikidata ids don't change
export const NOMINATIM_CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

export const RATE_LIMIT_INTERVAL_MS = 1_000; // 1 request per second

// ---------------------------------------------------------------------------
// Category → OSM query map
// ---------------------------------------------------------------------------

export const CATEGORY_OSM_MAP: Record<TravelioCategory, { area: string; types: string[] }> = {
  Beach:       { area: "Miami",        types: ["hotel", "guest_house"] },
  Mountain:    { area: "Switzerland",  types: ["hotel", "chalet"] },
  City:        { area: "Paris",        types: ["hotel", "apartment"] },
  Countryside: { area: "Tuscany",      types: ["guest_house", "farm"] },
  Modern:      { area: "New York",     types: ["hotel", "apartment"] },
  Lake:        { area: "Lake Como",    types: ["hotel", "chalet"] },
  Cabin:       { area: "Finland",      types: ["chalet", "cabin"] },
  Tropical:    { area: "Bali",         types: ["resort", "hotel"] },
};
