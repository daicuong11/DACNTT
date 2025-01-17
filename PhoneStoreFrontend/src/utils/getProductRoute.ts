import { ProductType } from '../types/product.type'

export const getProductRoute = (product: ProductType): string => `/${product.category.url}/${product.slug}`
