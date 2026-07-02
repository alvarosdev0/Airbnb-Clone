import type { PropertyWithDetails } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PropertyInfoProps {
  property: PropertyWithDetails;
}

/**
 * Server Component: displays basic property information.
 * Title, location, price, bed/bath/guest count, and description.
 */
export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <section>
      {/* Title and location */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-secondary sm:text-3xl">
          {property.title}
        </h1>
        <p className="mt-1 text-base text-gray-soft">
          {property.city}, {property.country}
        </p>
      </div>

      {/* Quick stats line */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-secondary">
        {property.maxGuests > 0 && (
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            {property.maxGuests} {property.maxGuests === 1 ? "guest" : "guests"}
          </span>
        )}
        {property.bedrooms > 0 && (
          <>
            <span className="text-gray-light">·</span>
            <span>{property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}</span>
          </>
        )}
        {property.bathrooms > 0 && (
          <>
            <span className="text-gray-light">·</span>
            <span>{property.bathrooms} {property.bathrooms === 1 ? "bathroom" : "bathrooms"}</span>
          </>
        )}
      </div>

      {/* Price */}
      <div className="mb-6 rounded-xl border border-gray-light bg-gray-light/10 p-4">
        <p className="text-2xl font-bold text-secondary">
          {formatPrice(property.pricePerNight)}
          <span className="text-base font-normal text-gray-soft"> night</span>
        </p>
      </div>

      {/* Description */}
      <div className="border-t border-gray-light pt-6">
        <h2 className="mb-3 text-lg font-semibold text-secondary">
          About this place
        </h2>
        <p className="leading-relaxed text-gray-soft">{property.description}</p>
      </div>
    </section>
  );
}
