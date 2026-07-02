import type { Prisma } from "@prisma/client";

// Re-usable includes for property queries
export const propertyWithHostInclude = {
  host: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
} satisfies Prisma.PropertyInclude;

export const propertyWithDetailsInclude = {
  host: {
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
    },
  },
  reviews: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc" as const,
    },
  },
} satisfies Prisma.PropertyInclude;

// Inferred types from Prisma
export type PropertyWithHost = Prisma.PropertyGetPayload<{
  include: typeof propertyWithHostInclude;
}>;

export type PropertyWithDetails = Prisma.PropertyGetPayload<{
  include: typeof propertyWithDetailsInclude;
}>;

// Domain types
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

export const CATEGORY_ICONS: Record<Category, string> = {
  Beach: "🏖️",
  Mountain: "🏔️",
  City: "🏙️",
  Countryside: "🌾",
  Modern: "🏗️",
  Lake: "🏞️",
  Cabin: "🪵",
  Tropical: "🌴",
};

export interface SearchFilters {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}
