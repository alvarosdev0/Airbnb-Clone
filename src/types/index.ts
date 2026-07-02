// ---------------------------------------------------------------------------
// Domain types — standalone, no Prisma dependency.
// The shape mirrors what the data service returns (currently mock data,
// swappable to any API in the future).
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

// ---------------------------------------------------------------------------
// Domain enums & constants
// ---------------------------------------------------------------------------

export type Category =
  | "Beach"
  | "Mountain"
  | "City"
  | "Countryside"
  | "Modern"
  | "Lake"
  | "Cabin"
  | "Tropical";

export const CATEGORIES: Category[] = [
  "Beach",
  "Mountain",
  "City",
  "Countryside",
  "Modern",
  "Lake",
  "Cabin",
  "Tropical",
];

// Legacy alias kept for backward compat; use CategoryIcon component instead
export const CATEGORY_ICONS: Record<Category, string> = {} as Record<Category, string>;

export interface SearchFilters {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
