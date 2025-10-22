import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

/**
 * FORBIDDEN HEADLESS COMPONENT - HeadlessReviews
 * 
 * Manages all review functionality:
 * - Fetching product reviews
 * - Submitting new reviews
 * - Calculating average ratings
 * - Authentication checks
 */

export interface Review {
  id: string
  product_id: string
  customer_id: string
  rating: number
  title: string
  comment: string
  created_at: string
  customers?: {
    first_name?: string
    last_name?: string
    email: string
  }
}

export const useReviewsLogic = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (productId) {
      fetchReviews()
    }
  }, [productId])

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          customers (
            first_name,
            last_name,
            email
          )
        `)
        .eq('product_id', productId)
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setReviews(data as Review[])
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitReview = async (rating: number, title: string, comment: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to leave a review.",
        variant: "destructive"
      })
      return false
    }

    try {
      setSubmitting(true)

      // Get customer_id from user
      const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .eq('store_id', STORE_ID)
        .single()

      if (!customerData) {
        toast({
          title: "Error",
          description: "Customer profile not found.",
          variant: "destructive"
        })
        return false
      }

      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          customer_id: customerData.id,
          store_id: STORE_ID,
          rating,
          title,
          comment
        })

      if (error) throw error

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!"
      })

      await fetchReviews()
      return true
    } catch (error) {
      console.error('Error submitting review:', error)
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      })
      return false
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  return {
    reviews,
    loading,
    submitting,
    averageRating,
    reviewCount: reviews.length,
    submitReview,
    isAuthenticated: !!user
  }
}

interface HeadlessReviewsProps {
  productId: string
  children: (logic: ReturnType<typeof useReviewsLogic>) => React.ReactNode
}

export const HeadlessReviews = ({ productId, children }: HeadlessReviewsProps) => {
  const reviewsLogic = useReviewsLogic(productId)
  return <>{children(reviewsLogic)}</>
}