import { Suspense } from "react";
import Link from "next/link";
import PropertyGrid from "@/components/properties/PropertyGrid";
import CategoryBar from "@/components/category/CategoryBar";
import PropertyMapWrapper from "@/components/map/PropertyMapWrapper";
import SearchBar from "@/components/ui/SearchBar";
import Skeleton from "@/components/ui/Skeleton";
import { getProperties } from "@/lib/data-service";

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const category = params.category;

  const properties = await getProperties(
    category ? { category } : undefined,
  );

  const totalCount = (await getProperties()).length;

  return (
    <div>
      {/* Hero Section */}
      <div className="pb-8 pt-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Discover your next getaway
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Browse unique vacation rentals, cozy cabins, beach houses, and
            mountain retreats around the world.
          </p>
          <Suspense fallback={<div className="mx-auto h-12 w-full max-w-xl animate-pulse rounded-md bg-gray-light/50" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-16 animate-pulse rounded-lg bg-gray-light/50" />}>
            <CategoryBar />
          </Suspense>
        </div>
      </div>

      {/* Property Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">
            {category ? `${category} stays` : "Explore all stays"}
          </h2>
          <Link
            href="/properties"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            View all ({totalCount})
          </Link>
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
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-gray-light px-4 py-16 text-center">
              <div aria-hidden="true">
                <svg className="mb-2 h-10 w-10 text-gray-soft/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>
              </div>
              <p className="text-lg font-medium text-text-primary">
                No properties match your search
              </p>
              <p className="mt-1 text-sm text-gray-soft">
                Try a different category.
              </p>
              <Link
                href="/"
                className="mt-4 cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <PropertyGrid properties={properties} />
          )}
        </Suspense>
      </div>

      {/* Map Section */}
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-bold text-text-primary">
          Explore locations
        </h2>
        <Suspense fallback={<Skeleton variant="map" />}>
          <PropertyMapWrapper
            properties={properties}
            zoom={2}
            height="250px"
            className="sm:!h-[400px]"
          />
        </Suspense>
      </div>
    </div>
  );
}
