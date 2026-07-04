"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, type FormEvent } from "react";

/**
 * Client Component: destination search bar.
 * Navigates to /properties?city=... on submit.
 * Uses the URL query string for server-side filtering (no external APIs).
 */
export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) {
        router.push("/properties");
        return;
      }
      router.push(`/properties?city=${encodeURIComponent(trimmed)}`);
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
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations"
          className="flex-1 border-0 bg-transparent px-3 py-3 text-sm text-text-primary outline-none placeholder:text-gray-soft"
          aria-label="Search destinations"
          autoComplete="off"
          inputMode="search"
        />

        <button
          type="submit"
          className="mr-1.5 flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
        >
          Search
        </button>
      </div>
    </form>
  );
}
