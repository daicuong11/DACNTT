import { ProductVariantType } from './product_variant.type'
import { UserType } from './user.type'

export interface ReviewType {
  reviewId: number
  productVariantId: number
  productVariant: ProductVariantType
  userId: number
  user: UserType
  rating: number
  comment: string
  hasImages: boolean
  images: string
  verifiedPurchase: boolean
  isReply: boolean
  createdAt: string
  updatedAt: string
}

export interface ReviewRequestType {
  productVariantId: number
  rating: number
  comment: string
  images: File[]
}

export interface ReviewDetailResponse {
  totalReview: number
  total5Rate: number
  total4Rate: number
  total3Rate: number
  total2Rate: number
  total1Rate: number
  rateAverage: number
}
