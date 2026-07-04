import Link from "next/link";
import PropertyImage from "@/components/ui/PropertyImage";
import type { PropertyWithDetails } from "@/types";

interface PropertyCardProps {
  property: PropertyWithDetails;
}

/**
 * Server Component: property card for the Travelio grid.
 * Shows thumbnail, title, price, category, city/country, and top amenities.
 * Links to the property detail page.
 */
export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images[0] ?? "";

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block cursor-pointer overflow-hidden rounded-xl transition-all duration-200 hover:shadow-soft-md"
    >
      {/* Thumbnail with fallback */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-light/50">
        {imageUrl ? (
          <PropertyImage
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-12 w-12 text-gray-soft/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5M4.5 21V9.75m15 11.25V9.75M2.25 9.75l9.75-6 9.75 6M6.75 21v-5.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-9 0h19.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 min-w-0">
          <h3 className="line-clamp-1 text-sm font-semibold text-text-primary min-w-0">
            {property.title}
          </h3>
          <span className="shrink-0 text-sm font-semibold text-text-primary">
            ${property.pricePerNight}
          </span>
        </div>

        <p className="line-clamp-1 text-xs text-gray-soft">
          {property.category}
        </p>

        <p className="line-clamp-1 text-sm text-gray-soft">
          {property.city}, {property.country}
        </p>

        {/* Amenities (first 3) */}
        {property.amenities.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-muted/40 px-2 py-0.5 text-[11px] text-text-secondary"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[11px] text-gray-soft">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
