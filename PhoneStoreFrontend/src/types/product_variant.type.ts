import { DiscountType } from './discount.type'
import { ProductType } from './product.type'

export interface ProductVariantType {
  productVariantId: number
  productId: number
  discountId: number | null
  discount: DiscountType | null
  product: ProductType
  color: string
  storage: string
  price: number
  stock: number
}
