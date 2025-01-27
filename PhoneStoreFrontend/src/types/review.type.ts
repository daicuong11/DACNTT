import { UserType } from './user.type'

export interface ReviewType {
  reviewId: number
  productVariantId: number
  userId: number
  user: Pick<UserType, 'id' | 'name' | 'email' | 'numberPhone' | 'address' | 'role' | 'profilePicture'>
  rating: number
  comment: string
  createdAt: string
}
