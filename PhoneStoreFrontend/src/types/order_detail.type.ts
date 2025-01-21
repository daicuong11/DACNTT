import { ProductVariantType } from './product_variant.type'

export interface OrderDetailType {
  orderDetailId: number
  orderId: number
  productVariantID: number
  productVariant: ProductVariantType
  quantity: number
  price: number
  discount: number
  unitPrice: number
}

export interface OrderDetailPayloadType {
  productVariantID: number
  productVariant: ProductVariantType
  quantity: number
  price: number
  discount: number
  unitPrice: number
}
