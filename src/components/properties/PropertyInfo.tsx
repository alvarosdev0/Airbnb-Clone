import type { PropertyWithDetails } from "@/types";
import AmenitiesGrid from "./AmenitiesGrid";

interface PropertyInfoProps {
  property: PropertyWithDetails;
}

/**
 * Server Component: displays property details.
 * Title, location, price, capacity, description, and amenities.
 */
export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <section>
      {/* Name and location */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
          {property.title}
        </h1>
        <p className="mt-1 text-base text-gray-soft">
          {property.address} — {property.city}, {property.country}
        </p>
      </div>

      {/* Quick stats */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-text-primary">
        <span className="font-semibold">${property.pricePerNight}<span className="font-normal text-gray-soft"> / night</span></span>
        <span className="text-gray-soft" aria-hidden="true">·</span>
        <span>{property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}</span>
        <span className="text-gray-soft" aria-hidden="true">·</span>
        <span>{property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"}</span>
        <span className="text-gray-soft" aria-hidden="true">·</span>
        <span>Up to {property.maxGuests} guests</span>
      </div>

      {/* Category badge */}
      <div className="mb-4">
        <span className="rounded-full bg-primary-dark/10 px-3 py-1 text-xs font-medium text-primary-dark dark:bg-primary/10 dark:text-primary">
          {property.category}
        </span>
      </div>

      {/* Description */}
      <div className="border-t border-gray-light pt-6">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">
          About this place
        </h2>
        <p className="leading-relaxed text-gray-soft">{property.description}</p>
      </div>

      {/* Amenities */}
      <div className="border-t border-gray-light pt-6">
        <AmenitiesGrid amenities={property.amenities} />
      </div>
    </section>
  );
}
