import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PropertyInfo from "@/components/properties/PropertyInfo";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyMapWrapper from "@/components/map/PropertyMapWrapper";
import Skeleton from "@/components/ui/Skeleton";
import { getPropertyById } from "@/lib/data-service";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the property detail page.
 */
export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return { title: "Property Not Found" };
  }

  return {
    title: `${property.name} — Travelio`,
    description: property.description ?? `Explore ${property.name} in ${property.city}, ${property.country}.`,
    openGraph: {
      title: `${property.name} — Travelio`,
      description: property.description ?? undefined,
      images: property.images.length > 0 ? [{ url: property.images[0] }] : [],
    },
  };
}

/**
 * Server Page: /properties/[id]
 * Fetches a single Travelio property or returns 404.
 * Shows gallery, info (including amenities, website, phone), and map.
 */
export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Gallery */}
      <Suspense fallback={<Skeleton variant="gallery" />}>
        <PropertyGallery images={property.images} title={property.name} />
      </Suspense>

      {/* Main content: info + map */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Left column: Info + Map */}
        <div className="space-y-10">
          <PropertyInfo property={property} />

          {/* Location map */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-text-primary">
              Location
            </h2>
            <Suspense fallback={<Skeleton variant="map" />}>
              <PropertyMapWrapper
                properties={[property]}
                center={[property.lat, property.lng]}
                zoom={14}
                height="300px"
                singleMode
              />
            </Suspense>
          </section>
        </div>

        {/* Right column: empty sidebar */}
        <aside className="hidden lg:block" />
      </div>
    </div>
  );
}
