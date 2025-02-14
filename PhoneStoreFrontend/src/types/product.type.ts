import { BrandType } from './brand.type'
import { CategoryType } from './category.type'
import { ProductImageRequestType } from './product_image.type'
import { ProductVariantRequestType, ProductVariantType } from './product_variant.type'
import { SpecificationRequestType } from './specification.type'

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

export interface ListVariantRequestType {
  variant: ProductVariantRequestType
  specifications: SpecificationRequestType[]
  productImages: ProductImageRequestType[]
}

export interface AddProductWithVariantsRequestType {
  product: ProductRequestType
  listVariant: ListVariantRequestType[]
}
