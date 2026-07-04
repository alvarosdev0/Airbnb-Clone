"use client";

import { useState, useCallback } from "react";
import PropertyImage from "@/components/ui/PropertyImage";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

/**
 * Client Component: image carousel with thumbnail navigation.
 * Wrapped with next/dynamic + { ssr: false } in the parent page.
 */
export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-gray-light/50">
        <svg
          className="h-16 w-16 text-gray-soft/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-light/30">
        <PropertyImage
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${title} — Image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover"
          priority={currentIndex === 0}
          fallbackIcon={
                <svg className="h-10 w-10 text-gray-soft/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              }
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-bg/80 p-2 shadow-soft-md backdrop-blur-sm transition-colors hover:bg-bg"
              aria-label="Previous image"
            >
              <svg
                className="h-5 w-5 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-bg/80 p-2 shadow-soft-md backdrop-blur-sm transition-colors hover:bg-bg"
              aria-label="Next image"
            >
              <svg
                className="h-5 w-5 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-text-primary/70 px-3 py-1 text-xs text-bg">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={cn(
                "relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                idx === currentIndex
                  ? "border-text-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
              aria-label={`View image ${idx + 1}`}
            >
              <PropertyImage
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
          fallbackIcon={
                <svg className="h-6 w-6 text-gray-soft/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              }
               />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
