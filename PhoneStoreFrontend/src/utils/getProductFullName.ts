import { ProductResponse, ProductType, VariantResponse } from '@/types/product.type'

export const getProductFullName = (product: ProductResponse) => {
  const variant: VariantResponse = product.productVariants[0]
  return product.name + ' ' + variant.variantName
}
