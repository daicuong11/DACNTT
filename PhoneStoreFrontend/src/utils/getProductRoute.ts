import { ProductVariantType } from '../types/product_variant.type'

export const getProductRoute = (product: ProductVariantType): string =>
  `/${product.product.category.url}/${product.product.slug}`
