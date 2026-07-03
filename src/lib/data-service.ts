/**
 * Data Service Layer
 *
 * Provides a consistent async interface for fetching property data.
 * Now powered by OpenStreetMap (Overpass API) + Wikidata (photos).
 *
 * Public interface kept stable — components don't know the source.
 */

import type { TravelioProperty, TravelioCategory } from "@/types";
import { getPropertiesByCategory, getPropertyById as getOsmPropertyById } from "./overpass-service";
import { getWikidataPhotos } from "./wikidata-service";

// ---------------------------------------------------------------------------
// Public interface
// ---------------------------------------------------------------------------

/**
 * Fetch properties, optionally filtered by category.
 * Results are enriched with photos from Wikidata when available.
 *
 * @param filters - Optional filters (category, city).
 * @returns An array of TravelioProperty objects.
 */
export async function getProperties(
  filters?: PropertyFilters,
): Promise<TravelioProperty[]> {
  const category = (filters?.category as TravelioCategory) || "City";
  const properties = await getPropertiesByCategory(category);

  // Enrich with photos from Wikidata (parallel)
  const withPhotos = await Promise.all(
    properties.map(async (prop) => {
      if (prop.wikidata) {
        const photos = await getWikidataPhotos(prop.wikidata);
        return { ...prop, images: photos };
      }
      return prop;
    }),
  );

  return withPhotos;
}

/**
 * Fetch a single property by ID, or null if not found.
 *
 * @param id - The property ID (prefixed OSM ID).
 * @returns A TravelioProperty or null.
 */
export async function getPropertyById(
  id: string,
): Promise<TravelioProperty | null> {
  const property = await getOsmPropertyById(id);
  if (!property) return null;

  // Enrich with photo if it has Wikidata
  if (property.wikidata) {
    const photos = await getWikidataPhotos(property.wikidata);
    return { ...property, images: photos };
  }

  return property;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PropertyFilters {
  category?: string;
  city?: string;
}
