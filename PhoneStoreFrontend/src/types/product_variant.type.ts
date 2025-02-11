import { DiscountType } from './discount.type'
import { ProductType } from './product.type'

export interface ProductVariantType {
  productVariantId: number
  productId: number
  discountId: number | null
  discount: DiscountType | null
  product: ProductType
  slug: string
  variantName: string
  color: string
  storage: string
  importPrice: number
  price: number
  stock: number
}

export interface ProductVariantRequestType {
  productVariantId?: number
  productId: number
  discountId: number | null
  slug: string
  variantName: string
  color: string
  storage: string
  importPrice: number
  price: number
  stock: number
}
