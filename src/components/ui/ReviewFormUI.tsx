import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ReviewFormUIProps {
  onSubmit: (rating: number, title: string, comment: string) => Promise<boolean>
  submitting: boolean
  isAuthenticated: boolean
}

export const ReviewFormUI = ({ onSubmit, submitting, isAuthenticated }: ReviewFormUIProps) => {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !comment.trim()) {
      return
    }

    const success = await onSubmit(rating, title, comment)
    
    if (success) {
      setRating(5)
      setTitle("")
      setComment("")
    }
  }

  if (!isAuthenticated) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center font-light">
            Please sign in to leave a review.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-light">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="review-title" className="text-sm font-medium">
              Review Title
            </Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your experience"
              required
              className="mt-1"
            />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="review-comment" className="text-sm font-medium">
              Your Review
            </Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product"
              required
              rows={4}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !title.trim() || !comment.trim()}
            className="w-full"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}