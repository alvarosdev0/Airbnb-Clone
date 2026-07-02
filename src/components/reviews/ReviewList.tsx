import Image from "next/image";
import type { PropertyWithDetails } from "@/types";
import { averageRating } from "@/lib/utils";

interface ReviewListProps {
  reviews: PropertyWithDetails["reviews"];
}

/**
 * Server Component: renders the rating summary and all reviews.
 * Empty state: "No reviews yet" message.
 * Reviews sorted by createdAt descending (handled at query level).
 */
export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-secondary">Reviews</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-light bg-gray-light/10 px-4 py-12 text-center">
          <div className="mb-2 text-3xl" aria-hidden="true">📝</div>
          <p className="text-gray-soft">No reviews yet</p>
          <p className="mt-1 text-sm text-gray-soft/70">
            Be the first to leave a review!
          </p>
        </div>
      </section>
    );
  }

  const avg = averageRating(reviews);

  return (
    <section>
      {/* Rating summary */}
      <h2 className="mb-1 text-lg font-semibold text-secondary">
        <span className="text-primary" aria-hidden="true">★</span>{" "}
        {avg} · {reviews.length}{" "}
        {reviews.length === 1 ? "review" : "reviews"}
      </h2>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-light pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start gap-3">
              {/* User avatar */}
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-light">
                {review.user.image && (
                  <Image
                    src={review.user.image}
                    alt={review.user.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                {/* User name + date */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-secondary">
                    {review.user.name}
                  </p>
                  <time
                    dateTime={review.createdAt.toISOString()}
                    className="text-xs text-gray-soft"
                  >
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                    }).format(new Date(review.createdAt))}
                  </time>
                </div>

                {/* Star rating */}
                <div className="mt-0.5 flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= review.rating
                          ? "text-primary"
                          : "text-gray-light"
                      }`}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-2 text-sm leading-relaxed text-gray-soft">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
