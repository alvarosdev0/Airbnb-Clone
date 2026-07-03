import { Suspense } from "react";
import Link from "next/link";
import PropertyGrid from "@/components/properties/PropertyGrid";
import SearchFilters from "@/components/properties/SearchFilters";
import CategoryBar from "@/components/category/CategoryBar";
import Skeleton from "@/components/ui/Skeleton";
import { getProperties } from "@/lib/data-service";

interface PropertiesPageProps {
  searchParams: Promise<{
    category?: string;
    city?: string;
  }>;
}

/**
 * Server Page: /properties
 * Reads searchParams from the URL, fetches data via the data service,
 * and renders filtered results.
 */
export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const category = params.category;
  const city = params.city;

  const properties = await getProperties({
    category,
    city,
  });

  const hasActiveFilters = !!(category || city);

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
            <h1 className="text-xl font-bold text-text-primary">
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
                <div aria-hidden="true">
                  <svg className="mb-2 h-10 w-10 text-gray-soft/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-text-primary">
                  No properties match your search
                </p>
                <p className="mt-1 text-sm text-gray-soft">
                  Try searching for a different city or browsing a category below.
                </p>
                {hasActiveFilters && (
                  <Link
                    href="/properties"
                    className="mt-4 cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
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
