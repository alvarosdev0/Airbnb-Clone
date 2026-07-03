import PropertyCard from "./PropertyCard";
import type { TravelioProperty } from "@/types";

interface PropertyGridProps {
  properties: TravelioProperty[];
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
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-gray-light bg-muted/30 px-4 py-16 text-center">
        <div aria-hidden="true">
          <svg className="mb-2 h-10 w-10 text-gray-soft/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
        </div>
        <p className="text-lg font-medium text-text-primary">{emptyMessage}</p>
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
