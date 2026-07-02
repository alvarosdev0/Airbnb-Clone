import Image from "next/image";
import Link from "next/link";
import PropertyImage from "@/components/ui/PropertyImage";
import type { PropertyWithDetails } from "@/types";
import { formatPrice, averageRating } from "@/lib/utils";

interface PropertyCardProps {
  property: PropertyWithDetails;
}

/**
 * Server Component: Airbnb-style property card.
 * Shows thumbnail, title, price/night, star rating, and host avatar.
 * Entire card links to the property detail page.
 */
export default function PropertyCard({ property }: PropertyCardProps) {
  const rating = averageRating(property.reviews);
  const imageUrl = property.images[0] ?? "/placeholder-house.svg";
  const reviewCount = property.reviews.length;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block cursor-pointer overflow-hidden rounded-xl transition-all duration-200 hover:shadow-soft-md"
    >
      {/* Thumbnail with error fallback */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-light/50">
        <PropertyImage
          src={imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-text-primary">
            {property.title}
          </h3>
          {rating > 0 && (
            <div className="flex shrink-0 items-center gap-0.5 text-sm">
              <svg className="h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium text-text-primary">{rating}</span>
            </div>
          )}
        </div>

        <p className="line-clamp-1 text-sm text-gray-soft">
          {property.city}, {property.country}
        </p>

        <p className="mt-1 text-sm">
          <span className="font-semibold text-text-primary">
            {formatPrice(property.pricePerNight)}
          </span>
          <span className="text-gray-soft"> night</span>
        </p>

        {/* Host avatar and review count */}
        <div className="mt-2 flex items-center gap-2">
          <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-gray-light">
            {property.host.image && (
              <Image
                src={property.host.image}
                alt={property.host.name}
                fill
                sizes="20px"
                className="object-cover"
                loading="lazy"
              />
            )}
          </div>
          <span className="text-xs text-gray-soft">
            Hosted by {property.host.name}
          </span>
          {reviewCount > 0 && (
            <span className="ml-auto text-xs text-gray-soft">
              · {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
