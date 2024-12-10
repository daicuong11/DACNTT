import { ProductType } from '../types/product.type'

export const getProductRoute = (product: ProductType): string => `/${product.category.slug}/${product.slug}`
