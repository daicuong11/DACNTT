import { ProductType } from './product.type'

export interface ProductVariantType {
  productVariantId: number
  productId: number
  product: ProductType
  color: string
  storage: string
  price: number
  stock: number
}
