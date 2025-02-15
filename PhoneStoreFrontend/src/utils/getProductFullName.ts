import { ProductType } from '@/types/product.type'
import { ProductVariantType } from '@/types/product_variant.type'

export const getProductFullName = (product: ProductType) => {
  const variant = product.productVariants[0] as ProductVariantType
  return product.name + ' ' + variant.variantName
}
