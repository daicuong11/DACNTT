import { BrandType } from './brand.type'
import { CategoryType } from './category.type'

export interface ProductType {
  productId: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  imageUrl?: string
  category: CategoryType
  brand: BrandType
  createdAt: Date
  updatedAt: Date
}
