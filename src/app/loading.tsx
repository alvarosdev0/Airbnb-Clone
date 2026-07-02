import Skeleton from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Skeleton CategoryBar */}
      <div className="mb-6 flex gap-3 overflow-x-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-20 animate-pulse rounded-xl bg-gray-light"
          />
        ))}
      </div>

      {/* Skeleton Map */}
      <div className="mb-8">
        <Skeleton variant="map" />
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} variant="card" />
        ))}
      </div>
    </div>
  );
}
