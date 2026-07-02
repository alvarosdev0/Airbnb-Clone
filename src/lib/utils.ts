import { clsx } from "clsx";

/**
 * Merge class names with clsx.
 * In a production app, you'd pair this with tailwind-merge.
 * For now, clsx handles conditional classes cleanly.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return clsx(classes);
}

/**
 * Format a number as USD price string.
 * Example: formatPrice(120) → "$120"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate the average rating from an array of review objects.
 * Returns a single rounded to 1 decimal place.
 */
export function averageRating(
  reviews: { rating: number }[],
): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

/**
 * Get a category icon emoji by category name.
 */
export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    Beach: "🏖️",
    Mountain: "🏔️",
    City: "🏙️",
    Countryside: "🌾",
    Modern: "🏗️",
    Lake: "🏞️",
    Cabin: "🪵",
    Tropical: "🌴",
  };
  return iconMap[category] ?? "📍";
}
