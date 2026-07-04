"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
/**
 * Client Component: city text input, category selector, and clear button.
 * All state is stored in URL searchParams for server-side filtering.
 */
export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") ?? "";
  const category = searchParams.get("category") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, searchParams],
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const hasActiveFilters = !!(city || category);

  return (
    <div className="rounded-xl border border-gray-light bg-bg p-4 shadow-soft-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">Filters</h2>

      <div className="space-y-3">
        {/* City */}
        <div>
          <label
            htmlFor="filter-city"
            className="mb-1 block text-xs font-medium text-gray-soft"
          >
            City
          </label>
          <input
            id="filter-city"
            type="text"
            value={city}
            onChange={(e) => updateParam("city", e.target.value)}
            placeholder="Any city"
            autoComplete="city"
            className="w-full rounded-lg border border-gray-light bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-primary"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="filter-category"
            className="mb-1 block text-xs font-medium text-gray-soft"
          >
            Category
          </label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="w-full rounded-lg border border-gray-light bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-primary"
          >
            <option value="">All categories</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
            <option value="Countryside">Countryside</option>
            <option value="Modern">Modern</option>
            <option value="Lake">Lake</option>
            <option value="Cabin">Cabin</option>
            <option value="Tropical">Tropical</option>
          </select>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-full cursor-pointer rounded-lg border border-secondary px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-bg"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
