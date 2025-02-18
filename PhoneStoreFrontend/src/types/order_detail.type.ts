import { ProductVariantType } from './product_variant.type'

export interface OrderDetailType {
  orderDetailId: number
  orderId: number
  productVariantId: number
  productVariant: ProductVariantType
  quantity: number
  price: number
  discount: number
  unitPrice: number
}

export interface OrderDetailPayloadType {
  productVariantId: number
  productVariant: ProductVariantType
  quantity: number
  price: number
  discount: number
  unitPrice: number
}

export interface OrderDetailRequestType {
  orderId: number
  productVariantId: number
  quantity: number
  price: number
  discount: number
  unitPrice: number
}
