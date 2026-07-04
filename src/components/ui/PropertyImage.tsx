"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PropertyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallbackIcon?: React.ReactNode;
}

/**
 * Client Component: wraps next/image with error handling.
 * Shows a placeholder SVG icon when the remote image fails to load
 * (e.g., picsum.photos returns a 404 or network error).
 */
export default function PropertyImage({
  src,
  alt,
  fill,
  sizes,
  className,
  priority,
  fallbackIcon,
}: PropertyImageProps) {
  const [errored, setErrored] = useState(false);

  // Reset error state when the image source changes (e.g. carousel navigation)
  useEffect(() => {
    setErrored(false);
  }, [src]);

  if (errored || !src) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center bg-gray-light/30">
        {fallbackIcon ?? (
          <svg
            className="h-10 w-10 text-gray-soft/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setErrored(true)}
    />
  );
}
