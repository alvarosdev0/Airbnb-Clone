import PropertyCard from "./PropertyCard";
import type { PropertyWithDetails } from "@/types";

interface PropertyGridProps {
  properties: PropertyWithDetails[];
  emptyMessage?: string;
}

/**
 * Server Component: responsive grid of property cards.
 * 4 columns on desktop, 2 on tablet, 1 on mobile.
 * Renders an empty state when no properties match.
 */
export default function PropertyGrid({
  properties,
  emptyMessage = "No properties found",
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-gray-light bg-gray-light/10 px-4 py-16 text-center">
        <div className="mb-3 text-4xl" aria-hidden="true">
          🏡
        </div>
        <p className="text-lg font-medium text-secondary">{emptyMessage}</p>
        <p className="mt-1 text-sm text-gray-soft">
          Try adjusting your filters or explore a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
