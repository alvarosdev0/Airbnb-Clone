import type { TravelioProperty } from "@/types";
import AmenitiesGrid from "./AmenitiesGrid";

interface PropertyInfoProps {
  property: TravelioProperty;
}

/**
 * Server Component: displays Travelio property information.
 * Name, description, OSM star rating, amenities, website, and phone.
 */
export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <section>
      {/* Name and location */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
          {property.name}
        </h1>
        <p className="mt-1 text-base text-gray-soft">
          {property.city}, {property.country}
        </p>
      </div>

      {/* Quick stats line */}
      {property.stars != null && property.stars > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-text-primary">
          <span className="flex items-center gap-1" aria-label={`${property.stars} out of 5 stars`}>
            <span aria-hidden="true" className="text-accent">⭐</span>
            <span className="font-medium">{property.stars}</span>
            <span className="text-gray-soft">· OSM rating</span>
          </span>
        </div>
      )}

      {/* Category & Type badge */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary-dark/10 px-3 py-1 text-xs font-medium text-primary-dark dark:bg-primary/10 dark:text-primary">
          {property.category}
        </span>
        <span className="rounded-full bg-gray-light/50 px-3 py-1 text-xs font-medium text-text-secondary">
          {property.type}
        </span>
      </div>

      {/* Description */}
      {property.description && (
        <div className="border-t border-gray-light pt-6">
          <h2 className="mb-3 text-lg font-semibold text-text-primary">
            About this place
          </h2>
          <p className="leading-relaxed text-gray-soft">{property.description}</p>
        </div>
      )}

      {/* Amenities */}
      <div className="border-t border-gray-light pt-6">
        <AmenitiesGrid amenities={property.amenities} />
      </div>

      {/* Website & Phone */}
      <div className="mt-6 border-t border-gray-light pt-6">
        <div className="space-y-3">
          {property.website && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="h-4 w-4 shrink-0 text-gray-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-1.707l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              <a
                href={property.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                Sitio web oficial
              </a>
            </div>
          )}
          {property.phone && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="h-4 w-4 shrink-0 text-gray-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <a href={`tel:${property.phone}`} className="text-text-primary hover:underline">
                {property.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
