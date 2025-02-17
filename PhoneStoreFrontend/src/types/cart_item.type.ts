import { ProductVariantType, VariantBasicResponse } from './product_variant.type'

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

export interface CartItemRequestType {
  productVariantId: number
  quantity: number
}

export interface CartItemResponse {
  cartItemId: number
  cartId: number
  productVariant: VariantBasicResponse
  quantity: number
}
