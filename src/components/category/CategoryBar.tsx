"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/types";
import { CATEGORIES, CATEGORY_ICONS } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Client Component: horizontal scrollable category pill bar.
 * Clicking a pill updates the URL searchParams to `?category=X`.
 * Active pill is highlighted with the primary Airbnb color.
 */
export default function CategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const handleSelect = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.get("category") === category) {
        // Toggle off if clicking the same category
        params.delete("category");
      } else {
        params.set("category", category);
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="relative">
      {/* Gradient fade on edges for scroll hint */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent" />

      <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-6 py-3">
          {CATEGORIES.map((category: Category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleSelect(category)}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-1.5 pb-2 text-sm transition-colors",
                  isActive
                    ? "border-b-2 border-secondary text-secondary"
                    : "border-b-2 border-transparent text-gray-soft hover:border-gray-light hover:text-secondary",
                )}
              >
                <span className="text-2xl" role="img" aria-label={category}>
                  {CATEGORY_ICONS[category]}
                </span>
                <span className="whitespace-nowrap text-xs font-medium">
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
