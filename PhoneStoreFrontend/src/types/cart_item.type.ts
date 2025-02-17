import { ProductVariantType } from './product_variant.type'

export interface CartItemType {
  cartItemId: number
  cartId: number
  productVariantId: number
  productVariant: ProductVariantType
  quantity: number
}

export interface CartItemPayloadType {
  productVariantId: number
  productVariant: ProductVariantType
  quantity: number
}
