import { ProductVariantType } from './product_variant.type'
import { UserType } from './user.type'

export interface CommentType {
  commentId: number
  userId: number
  productVariantId: number
  content: string
  createdAt: string
  user: UserType
  productVariant: ProductVariantType
  replies: ReplyType[]
}

export interface ReplyType {
  replyId: number
  userId: number
  commentId: number
  content: string
  createdAt: string
  user: UserType
}

export type CommentRequestType = {
  productVariantId: number
  content: string
}

export type ReplyRequestType = {
  commentId: number
  content: string
}

export type CommentResponse = {
  commentId: number;
  userName: string;
  productName: string;
  variantName: string;
  categoryName: string;
  brandName: string;
  content: string;
  createdAt: string;
  slug: string;
}

