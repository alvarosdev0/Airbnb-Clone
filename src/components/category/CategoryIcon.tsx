import type { Category } from "@/types";

interface CategoryIconProps {
  category: Category;
  className?: string;
}

/**
 * Server Component: renders the SVG or emoji for a given category.
 * Falls back to emoji for simplicity and visual consistency.
 */
export default function CategoryIcon({
  category,
  className = "text-2xl",
}: CategoryIconProps) {
  const icons: Record<Category, string> = {
    Beach: "🏖️",
    Mountain: "🏔️",
    City: "🏙️",
    Countryside: "🌾",
    Modern: "🏠",
    Lake: "🏞️",
    Cabin: "🪵",
    Tropical: "🌴",
  };

  return (
    <span className={className} role="img" aria-label={category}>
      {icons[category] ?? "📍"}
    </span>
  );
}
