import { ProductVariantType } from './product_variant.type'

export interface WishlistType {
  wishListId: number
  userId: number
  wishListItems: WishListItemType[]
}

export interface WishListItemType {
  wishListItemId: number
  wishListId: number
  productVariantId: number
  productVariant: ProductVariantType
}
