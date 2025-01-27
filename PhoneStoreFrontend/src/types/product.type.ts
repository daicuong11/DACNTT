import { BrandType } from './brand.type'
import { CategoryType } from './category.type'

export interface ProductType {
  productId: number
  name: string
  slug: string
  description: string
  categoryId: number
  category: CategoryType
  brandId: number
  brand: BrandType
}
