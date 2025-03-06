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
  productVariants: ProductVariantType[]
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

export interface BrandResponse {
  brandId: number
  name: string
}

export interface CategoryResponse {
  categoryId: number
  name: string
}

export interface VariantResponse {
  variantId: number
  slug: string
  variantName: string
  color: string
  screenSize: string
  ram: string
  storage: string
  imageUrl: string
  price: number
  stock: number
  discountPercentage: number
  categoryName: string
  brandName: string
  reviewRate: number
}

export interface ProductResponse {
  productId: number
  name: string
  category: CategoryResponse
  brand: BrandResponse
  productVariants: VariantResponse[]
}
