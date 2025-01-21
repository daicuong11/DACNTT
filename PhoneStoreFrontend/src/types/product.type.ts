import { BrandType } from './brand.type'
import { CategoryType } from './category.type'

export interface ProductType {
  productId: number
  name: string
  slug: string
  description: string
  imageUrl?: string
  categoryId: number
  category: CategoryType
  brandId: number
  brand: BrandType
  createdAt: string
  updatedAt: string
}
