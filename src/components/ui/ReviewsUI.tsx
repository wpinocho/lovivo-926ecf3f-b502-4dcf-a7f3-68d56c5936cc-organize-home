import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import type { Review } from "@/components/headless/HeadlessReviews"

interface ReviewsUIProps {
  reviews: Review[]
  loading: boolean
  averageRating: number
  reviewCount: number
}

export const ReviewsUI = ({ reviews, loading, averageRating, reviewCount }: ReviewsUIProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      {reviewCount > 0 && (
        <div className="flex items-center gap-4 pb-6 border-b border-border/50">
          <div className="text-center">
            <div className="text-4xl font-light text-foreground mb-1">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating))}
            <div className="text-sm text-muted-foreground mt-2 font-light">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {renderStars(review.rating)}
                    <h4 className="font-medium text-foreground mt-2">
                      {review.title}
                    </h4>
                  </div>
                  <span className="text-xs text-muted-foreground font-light">
                    {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-3">
                  {review.comment}
                </p>
                
                {review.customers && (
                  <div className="text-xs text-muted-foreground font-light">
                    {review.customers.first_name && review.customers.last_name
                      ? `${review.customers.first_name} ${review.customers.last_name}`
                      : review.customers.email}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground font-light">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      )}
    </div>
  )
}