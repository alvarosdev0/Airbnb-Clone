/**
 * Data Service Layer
 *
 * Provides a consistent async interface for fetching property data.
 * Current implementation: mock data (25 fictitious properties worldwide)
 *
 * To swap implementations, change the internals below —
 * the public interface stays the same.
 */

import type { PropertyWithDetails } from "@/types";
import {
  getMockProperties,
  getMockPropertyById,
  filterMockProperties,
} from "./mock-data";

// ---------------------------------------------------------------------------
// Public interface — swap the implementation behind these and the app still
// works (as long as you return the same shape).
// ---------------------------------------------------------------------------

/** Fetch all properties, optionally filtered by category / city / price. */
export async function getProperties(
  filters?: PropertyFilters,
): Promise<PropertyWithDetails[]> {
  if (!filters || Object.keys(filters).length === 0) {
    return getMockProperties();
  }
  return filterMockProperties({
    category: filters.category,
    city: filters.city,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });
}

/** Fetch a single property by ID, or null if not found. */
export async function getPropertyById(
  id: string,
): Promise<PropertyWithDetails | null> {
  return getMockPropertyById(id) ?? null;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PropertyFilters {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
