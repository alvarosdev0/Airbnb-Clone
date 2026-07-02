"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4" aria-hidden="true">
        <svg className="h-16 w-16 text-gray-soft/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
        </svg>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-text-primary">
        Something went wrong
      </h1>
      <p className="mb-6 max-w-md text-gray-soft">
        We encountered an unexpected error while loading this page. Please try
        again or browse other properties.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
      >
        Try again
      </button>
    </div>
  );
}
