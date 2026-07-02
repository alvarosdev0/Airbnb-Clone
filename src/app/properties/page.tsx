import { Suspense } from "react";
import Link from "next/link";
import PropertyGrid from "@/components/properties/PropertyGrid";
import SearchFilters from "@/components/properties/SearchFilters";
import CategoryBar from "@/components/category/CategoryBar";
import Skeleton from "@/components/ui/Skeleton";
import { isDbAvailable, filterMockProperties } from "@/lib/mock-data";

interface PropertiesPageProps {
  searchParams: Promise<{
    category?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

/**
 * Server Page: /properties
 * Reads searchParams from the URL, builds a Prisma `where` clause
 * (or falls back to mock data), and renders filtered results.
 */
export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const category = params.category;
  const city = params.city;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  let properties;

  try {
    if (await isDbAvailable()) {
      const { prisma } = await import("@/lib/prisma");

      // Build Prisma where clause dynamically
      const where: Record<string, unknown> = {};

      if (category) {
        const validCategories = [
          "Beach", "Mountain", "City", "Countryside",
          "Modern", "Lake", "Cabin", "Tropical",
        ];
        if (validCategories.includes(category)) {
          where.category = category;
        }
        // Invalid category → no filter (show all)
      }

      if (city) {
        where.city = { contains: city, mode: "insensitive" };
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        const priceFilter: Record<string, number> = {};
        if (minPrice !== undefined) priceFilter.gte = minPrice;
        if (maxPrice !== undefined) priceFilter.lte = maxPrice;
        where.pricePerNight = priceFilter;
      }

      properties = await prisma.property.findMany({
        where,
        include: {
          host: {
            select: { id: true, name: true, image: true, bio: true },
          },
          reviews: {
            include: {
              user: { select: { id: true, name: true, image: true } },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    } else {
      properties = filterMockProperties({
        category,
        city: city ?? undefined,
        minPrice,
        maxPrice,
      });
    }
  } catch {
    // Fallback on any DB error
    properties = filterMockProperties({
      category,
      city: city ?? undefined,
      minPrice,
      maxPrice,
    });
  }

  const hasActiveFilters = !!(category || city || minPrice !== undefined || maxPrice !== undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Category bar */}
      <Suspense fallback={<div className="h-16 animate-pulse rounded-lg bg-gray-light/50" />}>
        <CategoryBar />
      </Suspense>

      {/* Filters + Results layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar filters */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-gray-light/50" />}>
            <SearchFilters />
          </Suspense>
        </aside>

        {/* Property grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-secondary">
              {category ? `${category} stays` : "All properties"}
            </h1>
            <p className="text-sm text-gray-soft">
              {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"} found
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} variant="card" />
                ))}
              </div>
            }
          >
            {properties.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-gray-light bg-gray-light/10 px-4 py-16 text-center">
                <div className="mb-3 text-4xl" aria-hidden="true">
                  🔍
                </div>
                <p className="text-lg font-medium text-secondary">
                  No properties match your search
                </p>
                <p className="mt-1 text-sm text-gray-soft">
                  Try adjusting your filters or search criteria.
                </p>
                {hasActiveFilters && (
                  <Link
                    href="/properties"
                    className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
                  >
                    Clear all filters
                  </Link>
                )}
              </div>
            ) : (
              <PropertyGrid properties={properties} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
