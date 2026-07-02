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
      <div className="mb-4 text-6xl" aria-hidden="true">
        🏠
      </div>
      <h1 className="mb-2 text-2xl font-bold text-secondary">
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
