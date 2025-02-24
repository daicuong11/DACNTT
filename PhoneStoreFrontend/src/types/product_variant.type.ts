import { BrandType } from './brand.type'
import { CategoryType } from './category.type'
import { DiscountType } from './discount.type'
import { ProductType } from './product.type'
import { ProductImageType } from './product_image.type'
import { SpecificationType } from './specification.type'

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
  imageUrl: string
  price: number
  stock: number

  productImages: ProductImageType[]
  productSpecifications: SpecificationType[]
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

export interface VariantBasicResponse {
  productVariantId: number
  fullNameVariant: string
  productId: number
  brand: BrandType
  category: CategoryType
  discountPercentage: number
  slug: string
  color: string
  storage: string
  price: number
  importPrice: number
  stock: number
  imageUrl: string
}
