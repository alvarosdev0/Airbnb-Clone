"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, type FormEvent } from "react";
import { geocodeCity } from "@/lib/nominatim-service";

/**
 * Client Component: destination search with Nominatim geocoding.
 * Calls the Nominatim API on submit and navigates to /properties?city=...
 * Shows loading state while querying and error if city is not found.
 */
export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) {
        router.push("/properties");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await geocodeCity(trimmed);

        if (!result) {
          setError("Ciudad no encontrada — intenta con otro nombre");
          setLoading(false);
          return;
        }

        router.push(`/properties?city=${encodeURIComponent(trimmed)}`);
      } catch {
        setError("Error al buscar la ciudad. Intenta de nuevo.");
        setLoading(false);
      }
    },
    [query, router],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto flex w-full max-w-xl flex-col"
    >
      <div className="flex w-full items-center overflow-hidden rounded-full border border-border bg-bg shadow-soft-sm transition-shadow duration-200 focus-within:border-primary focus-within:shadow-soft-md">
        {/* Search icon */}
        <svg
          className="ml-4 h-5 w-5 shrink-0 text-gray-soft"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(null);
          }}
          placeholder="Search destinations"
          className="flex-1 border-0 bg-transparent px-3 py-3 text-sm text-text-primary outline-none placeholder:text-gray-soft"
          aria-label="Search destinations"
          autoComplete="off"
          inputMode="search"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="mr-1.5 flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Searching</span>
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-center text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
