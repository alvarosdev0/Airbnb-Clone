// ---------------------------------------------------------------------------
// Travelio — Domain types (mock data — all properties are fictitious)
// ---------------------------------------------------------------------------

export type Category =
  | "Beach" | "Mountain" | "City" | "Countryside"
  | "Modern" | "Lake" | "Cabin" | "Tropical";

export const CATEGORIES: Category[] = [
  "Beach", "Mountain", "City", "Countryside",
  "Modern", "Lake", "Cabin", "Tropical",
];

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

export interface SearchFilters {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
