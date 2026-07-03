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
// Legacy types — used by old components until PR 3 migration.
// ---------------------------------------------------------------------------

export interface Host {
  id: string;
  name: string;
  image: string | null;
  bio?: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  user: Pick<Host, "id" | "name" | "image">;
  propertyId: string;
  createdAt: Date;
}

export interface Property {
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
}

export interface PropertyWithDetails extends Property {
  host: Host;
  reviews: Review[];
  createdAt: Date;
}

/** @deprecated Use TravelioCategory instead. */
export type Category = TravelioCategory;

// Legacy alias kept for backward compat
export const CATEGORY_ICONS: Record<Category, string> = {} as Record<Category, string>;

export interface SearchFilters {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
