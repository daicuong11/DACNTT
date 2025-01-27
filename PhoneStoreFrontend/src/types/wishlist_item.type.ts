import { ProductVariantType } from './product_variant.type'

export interface WishlistItem {
  wishlistItemId: number
  wishListId: number
  productVariantId: number
  ProductVariant: ProductVariantType
}
