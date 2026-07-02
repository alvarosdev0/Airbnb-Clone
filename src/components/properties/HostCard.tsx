import PropertyImage from "@/components/ui/PropertyImage";
import type { PropertyWithDetails } from "@/types";

interface HostCardProps {
  host: PropertyWithDetails["host"];
}

/**
 * Server Component: displays the host's avatar, name, and bio.
 * Includes a "Host" badge for visual identification.
 */
export default function HostCard({ host }: HostCardProps) {
  return (
    <section className="rounded-xl border border-gray-light p-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-light">
          {host.image && (
            <PropertyImage
              src={host.image}
              alt={host.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          )}
        </div>

        {/* Name and badge */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-text-primary">
              Hosted by {host.name}
            </h3>
            <span className="rounded-full bg-primary-dark/10 px-2 py-0.5 text-xs font-medium text-primary-dark dark:bg-primary/10 dark:text-primary">
              Host
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {host.bio && (
        <p className="mt-4 text-sm leading-relaxed text-gray-soft">
          {host.bio}
        </p>
      )}
    </section>
  );
}
