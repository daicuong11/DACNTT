import { ReviewType } from './review.type'

// Review
export type ReviewResponseType = {
  reviewId: number
  productId: number
  listReview: ReviewType[]
}
