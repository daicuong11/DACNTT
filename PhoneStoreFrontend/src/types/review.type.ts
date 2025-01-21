import { UserType } from './user.type'

export interface ReviewType {
  reviewId: number
  productId: number
  userId: number
  userCreatedInfo: Pick<UserType, 'id' | 'name' | 'email' | 'numberPhone' | 'address' | 'role' | 'profilePicture'>
  rating: number
  comment: string
  createdAt: string
}
