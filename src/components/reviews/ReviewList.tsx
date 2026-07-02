import PropertyImage from "@/components/ui/PropertyImage";
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
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Reviews</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-light bg-muted/20 px-4 py-12 text-center">
          <div className="mb-2" aria-hidden="true">
            <svg className="h-8 w-8 text-gray-soft/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
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
      <h2 className="mb-1 text-lg font-semibold text-text-primary">
        <svg className="inline-block h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>{" "}
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
                  <PropertyImage
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
                  <p className="text-sm font-medium text-text-primary">
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
                    <svg
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? "text-accent"
                          : "text-gray-light"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
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
