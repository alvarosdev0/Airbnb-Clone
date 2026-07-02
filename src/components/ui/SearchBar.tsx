"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect, type FormEvent } from "react";

/**
 * Popular destination suggestions for autocomplete.
 */
const SUGGESTIONS = [
  "Paris",
  "Tokyo",
  "New York",
  "London",
  "Sydney",
  "Barcelona",
  "Rome",
  "Bali",
  "Amsterdam",
  "Dubai",
  "Santorini",
  "Reykjavík",
  "Cape Town",
  "Kyoto",
  "Lisbon",
];

/**
 * Client Component: destination search input with autocomplete.
 * Shows suggestions as the user types.
 * On submit, navigates to /properties?city={query}.
 */
export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.trim()
    ? SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 6)
    : [];

  const showSuggestions = isFocused && filtered.length > 0;

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/properties?city=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/properties");
      }
    },
    [query, router],
  );

  const selectSuggestion = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      setActiveIndex(-1);
      router.push(`/properties?city=${encodeURIComponent(suggestion)}`);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1,
          );
          break;
        case "Enter":
          if (activeIndex >= 0 && activeIndex < filtered.length) {
            e.preventDefault();
            selectSuggestion(filtered[activeIndex]);
          }
          break;
        case "Escape":
          setActiveIndex(-1);
          setIsFocused(false);
          inputRef.current?.blur();
          break;
      }
    },
    [showSuggestions, filtered, activeIndex, selectSuggestion],
  );

  // Reset active index when filtered list changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [filtered.length]);

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
            setActiveIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay blur to allow click on suggestion
            setTimeout(() => setIsFocused(false), 150);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations"
          className="flex-1 border-0 bg-transparent px-3 py-3 text-sm text-text-primary outline-none placeholder:text-gray-soft"
          aria-label="Search destinations"
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
        />

        <button
          type="submit"
          className="mr-1.5 cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
        >
          Search
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && (
        <ul
          ref={listRef}
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-bg shadow-soft-lg"
        >
          {filtered.map((suggestion, idx) => (
            <li
              key={suggestion}
              id={`suggestion-${idx}`}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(suggestion);
              }}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                idx === activeIndex
                  ? "bg-muted text-text-primary"
                  : "text-text-primary hover:bg-muted"
              }`}
            >
              <svg
                className="h-4 w-4 shrink-0 text-gray-soft"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
