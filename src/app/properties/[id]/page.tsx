import { Suspense } from "react";
import { notFound } from "next/navigation";
import PropertyInfo from "@/components/properties/PropertyInfo";
import PropertyGallery from "@/components/properties/PropertyGallery";
import HostCard from "@/components/properties/HostCard";
import AmenitiesGrid from "@/components/properties/AmenitiesGrid";
import ReviewList from "@/components/reviews/ReviewList";
import Skeleton from "@/components/ui/Skeleton";
import { isDbAvailable, getMockPropertyById } from "@/lib/mock-data";
import type { PropertyWithDetails } from "@/types";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Server Page: /properties/[id]
 * Fetches a single property with host + reviews, or returns 404.
 * Falls back to mock data when PostgreSQL is unavailable.
 */
export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;
  let property: PropertyWithDetails | null = null;

  try {
    if (await isDbAvailable()) {
      const { prisma } = await import("@/lib/prisma");

      property = await prisma.property.findUnique({
        where: { id },
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
      property = getMockPropertyById(id) ?? null;
    }
  } catch {
    property = getMockPropertyById(id) ?? null;
  }

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Gallery */}
      <Suspense fallback={<Skeleton variant="gallery" />}>
        <PropertyGallery images={property.images} title={property.title} />
      </Suspense>

      {/* Main content grid */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Left column: Info, Amenities, Reviews */}
        <div className="space-y-10">
          <PropertyInfo property={property} />

          <HostCard host={property.host} />

          <AmenitiesGrid amenities={property.amenities} />

          {/* Divider */}
          <div className="border-t border-gray-light" />

          <ReviewList reviews={property.reviews} />
        </div>

        {/* Right column: sticky booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-gray-light p-6 shadow-sm">
            <div className="mb-4">
              <p className="text-2xl font-bold text-secondary">
                ${property.pricePerNight}
                <span className="text-base font-normal text-gray-soft">
                  {" "}night
                </span>
              </p>
            </div>

            <div className="mb-4 flex items-center gap-1 text-sm">
              <span className="text-primary" aria-hidden="true">★</span>
              <span className="font-medium text-secondary">
                {property.reviews.length > 0
                  ? (
                      property.reviews.reduce(
                        (sum, r) => sum + r.rating,
                        0,
                      ) / property.reviews.length
                    ).toFixed(1)
                  : "New"}
              </span>
              <span className="text-gray-soft">
                · {property.reviews.length}{" "}
                {property.reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
            >
              Reserve
            </button>
            <p className="mt-2 text-center text-xs text-gray-soft">
              You won&apos;t be charged yet
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-soft underline">${property.pricePerNight} x 1 night</span>
                <span className="text-secondary">${property.pricePerNight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-soft underline">Cleaning fee</span>
                <span className="text-secondary">$50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-soft underline">Service fee</span>
                <span className="text-secondary">$25</span>
              </div>
              <div className="flex justify-between border-t border-gray-light pt-2 font-semibold text-secondary">
                <span>Total</span>
                <span>${property.pricePerNight + 75}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
