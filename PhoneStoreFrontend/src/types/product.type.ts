import { BrandType } from './brand.type'
import { CategoryType } from './category.type'

export interface ProductType {
  productId: number
  name: string
  description: string
  categoryId: number
  category: CategoryType
  brandId: number
  brand: BrandType
}

export interface ProductRequestType {
  productId?: number
  name: string
  description: string
  categoryId: number
  brandId: number
}
