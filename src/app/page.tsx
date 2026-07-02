import { Suspense } from "react";
import Link from "next/link";
import PropertyGrid from "@/components/properties/PropertyGrid";
import CategoryBar from "@/components/category/CategoryBar";
import SearchBar from "@/components/ui/SearchBar";
import Skeleton from "@/components/ui/Skeleton";
import { isDbAvailable, getMockProperties, filterMockProperties } from "@/lib/mock-data";

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const category = params.category;

  let properties;

  try {
    if (await isDbAvailable()) {
      const { prisma } = await import("@/lib/prisma");

      const where: Record<string, unknown> = {};
      if (category) {
        const validCategories = [
          "Beach", "Mountain", "City", "Countryside",
          "Modern", "Lake", "Cabin", "Tropical",
        ];
        if (validCategories.includes(category)) {
          where.category = category;
        }
      }

      properties = await prisma.property.findMany({
        where: Object.keys(where).length > 0 ? where : undefined,
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
      properties = category
        ? filterMockProperties({ category })
        : getMockProperties();
    }
  } catch {
    properties = category
      ? filterMockProperties({ category })
      : getMockProperties();
  }

  const allProperties = getMockProperties();
  const totalCount = allProperties.length;

  return (
    <div>
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent pb-8 pt-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
            Discover your next getaway
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-soft">
            Browse unique vacation rentals, cozy cabins, beach houses, and
            mountain retreats around the world.
          </p>
          <Suspense fallback={<div className="mx-auto h-12 w-full max-w-xl animate-pulse rounded-full bg-gray-light/50" />}>
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
          <h2 className="text-xl font-bold text-secondary">
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
              <div className="mb-3 text-4xl" aria-hidden="true">
                🏡
              </div>
              <p className="text-lg font-medium text-secondary">
                No properties match your search
              </p>
              <p className="mt-1 text-sm text-gray-soft">
                Try a different category.
              </p>
              <Link
                href="/"
                className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <PropertyGrid properties={properties} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
