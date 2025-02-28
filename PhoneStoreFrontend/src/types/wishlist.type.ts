import { ProductVariantType } from './product_variant.type'

export interface WishlistType {
  wishListId: number
  userId: number
  productVariantId: number
}

export interface WishListRequestType {
  userId: number
  productVariantId: number
}

export interface WishListItemType {
  wishListItemId: number
  wishListId: number
  productVariantId: number
  productVariant: ProductVariantType
}
