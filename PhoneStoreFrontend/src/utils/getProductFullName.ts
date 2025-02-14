import { ProductVariantType } from '@/types/product_variant.type'

export const getProductFullName = (variant: ProductVariantType) => {
  return variant.product.name + ' ' + variant.variantName
}
