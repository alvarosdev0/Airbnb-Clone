interface SkeletonProps {
  variant?: "card" | "map" | "text" | "gallery";
  className?: string;
}

export default function Skeleton({
  variant = "text",
  className = "",
}: SkeletonProps) {
  const baseClasses = "animate-pulse rounded bg-gray-light";

  switch (variant) {
    case "card":
      return (
        <div className={`overflow-hidden rounded-xl border border-gray-light ${className}`}>
          <div className={`${baseClasses} aspect-[4/3] w-full rounded-none`} />
          <div className="space-y-2 p-3">
            <div className={`${baseClasses} h-3 w-3/4`} />
            <div className={`${baseClasses} h-4 w-1/2`} />
            <div className={`${baseClasses} h-3 w-1/3`} />
            <div className="flex items-center gap-2 pt-1">
              <div className={`${baseClasses} h-6 w-6 rounded-full`} />
              <div className={`${baseClasses} h-3 w-1/4`} />
            </div>
          </div>
        </div>
      );

    case "map":
      return (
        <div
          className={`${baseClasses} flex aspect-[21/9] w-full items-center justify-center rounded-xl ${className}`}
        >
          <svg
            className="h-12 w-12 text-gray-soft/40"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
        </div>
      );

    case "gallery":
      return (
        <div className={`space-y-2 ${className}`}>
          <div className={`${baseClasses} aspect-[16/9] w-full rounded-xl`} />
          <div className="flex gap-2">
            <div className={`${baseClasses} h-16 w-16 rounded-lg`} />
            <div className={`${baseClasses} h-16 w-16 rounded-lg`} />
            <div className={`${baseClasses} h-16 w-16 rounded-lg`} />
            <div className={`${baseClasses} h-16 w-16 rounded-lg`} />
          </div>
        </div>
      );

    case "text":
    default:
      return (
        <div className={`space-y-2 ${className}`}>
          <div className={`${baseClasses} h-4 w-full`} />
          <div className={`${baseClasses} h-4 w-3/4`} />
          <div className={`${baseClasses} h-4 w-1/2`} />
        </div>
      );
  }
}
