import { ProductVariantType } from './product_variant.type'

export interface CartItemType {
  cartItemId: number
  cartId: number
  productVariantID: number
  productVariant: ProductVariantType
  quantity: number
  price: number
}

export interface CartItemPayloadType {
  productVariantID: number
  productVariant: ProductVariantType
  quantity: number
  price: number
}
