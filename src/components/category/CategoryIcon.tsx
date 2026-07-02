import type { Category } from "@/types";

interface CategoryIconProps {
  category: Category;
  className?: string;
}

/**
 * Server Component: renders an inline SVG icon for a given category.
 */
export default function CategoryIcon({
  category,
  className = "text-2xl",
}: CategoryIconProps) {
  const iconSize = "24";

  return (
    <span className={className} role="img" aria-label={category}>
      <CategorySvg category={category} size={iconSize} />
    </span>
  );
}

function CategorySvg({ category, size }: { category: Category; size: string }) {
  const s = size;

  switch (category) {
    case "Beach":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 22L21 22" />
          <path d="M6 18C6 18 7 12 12 12C17 12 18 18 18 18" />
          <path d="M12 2C12 2 10 5 10 8C10 10 11 11 12 11C13 11 14 10 14 8C14 5 12 2 12 2Z" />
          <path d="M3 22C3 22 7 19 8 16" />
          <path d="M21 22C21 22 17 19 16 16" />
          <path d="M12 11L12 12" />
        </svg>
      );
    case "Mountain":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 22L12 4L22 22" />
          <path d="M7 22L12 12L17 22" />
          <path d="M2 22L22 22" />
        </svg>
      );
    case "City":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="2" width="6" height="20" rx="1" />
          <rect x="14" y="6" width="6" height="16" rx="1" />
          <path d="M4 10L10 10" />
          <path d="M4 14L10 14" />
          <path d="M14 14L20 14" />
          <path d="M14 18L20 18" />
        </svg>
      );
    case "Countryside":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 22L21 22" />
          <path d="M8 22L8 18" />
          <path d="M16 22L16 18" />
          <path d="M12 4L12 8" />
          <path d="M6 12L3 9L6 6" />
          <path d="M18 12L21 9L18 6" />
          <rect x="14" y="12" width="4" height="6" rx="1" />
          <rect x="6" y="12" width="4" height="6" rx="1" />
        </svg>
      );
    case "Modern":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 10L12 3L21 10" />
          <path d="M5 10L5 21L19 21L19 10" />
          <rect x="9" y="14" width="6" height="7" rx="1" />
          <path d="M12 3L12 5" />
        </svg>
      );
    case "Lake":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 16C2 16 4 12 12 12C20 12 22 16 22 16" />
          <path d="M2 18C2 18 4 14 12 14C20 14 22 18 22 18" />
          <path d="M2 20C2 20 4 16 12 16C20 16 22 20 22 20" />
          <path d="M12 2L12 12" />
          <path d="M9 5L12 2L15 5" />
        </svg>
      );
    case "Cabin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11L12 3L21 11" />
          <path d="M5 11L5 21L19 21L19 11" />
          <rect x="9" y="15" width="6" height="6" rx="1" />
          <path d="M12 3L12 5" />
          <path d="M8 21L8 11" />
          <path d="M16 11L16 21" />
        </svg>
      );
    case "Tropical":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22L12 12" />
          <path d="M8 6C8 3 9 2 12 2C15 2 16 3 16 6" />
          <path d="M5 12C5 12 8 8 12 8C16 8 19 12 19 12" />
          <path d="M3 16C3 16 7 12 12 12C17 12 21 16 21 16" />
          <path d="M7 18C7 18 10 16 12 16C14 16 17 18 17 18" />
          <path d="M12 12L12 8" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6L12 12L16 14" />
        </svg>
      );
  }
}
