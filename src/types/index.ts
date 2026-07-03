// ---------------------------------------------------------------------------
// Travelio — Domain types for the destination explorer
// Data comes from OpenStreetMap (Overpass API) + Wikidata (photos)
// ---------------------------------------------------------------------------

export type TravelioCategory =
  | "Beach" | "Mountain" | "City" | "Countryside"
  | "Modern" | "Lake" | "Cabin" | "Tropical";

export const CATEGORIES: TravelioCategory[] = [
  "Beach", "Mountain", "City", "Countryside",
  "Modern", "Lake", "Cabin", "Tropical",
];

export interface TravelioProperty {
  id: string;
  name: string;
  description?: string;
  category: string;
  type: string; // hotel, guest_house, chalet, apartment, etc.
  stars?: number;
  address?: string;
  city?: string;
  country?: string;
  lat: number;
  lng: number;
  amenities: string[];
  images: string[];
  website?: string;
  phone?: string;
  wikidata?: string;
}

export interface CitySearchResult {
  lat: number;
  lng: number;
  bbox: [number, number, number, number];
  displayName: string;
}

// ---------------------------------------------------------------------------
// Backward-compatible aliases — will be removed in PR 3 when old components
// are migrated to TravelioProperty / TravelioCategory.
// ---------------------------------------------------------------------------

/** @deprecated Use TravelioCategory instead. */
export type Category = TravelioCategory;

/** @deprecated Will be removed in PR 3. Replaced by TravelioProperty. */
export interface PropertyWithDetails {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  category: string;
  amenities: string[];
  images: string[];
  hostId: string;
  host: { id: string; name: string; image: string | null; bio?: string | null };
  reviews: Array<{
    id: string; rating: number; comment: string;
    userId: string; propertyId: string; createdAt: Date;
    user: { id: string; name: string; image: string | null };
  }>;
  createdAt: Date;
}
