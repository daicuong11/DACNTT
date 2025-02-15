import { ProductType } from '@/types/product.type'
import { ProductVariantType } from '../types/product_variant.type'

export const getProductRoute = (product: ProductType): string => {
  const categoriesUrlConfig: { [key: string]: string } = {
    'Điện thoại': 'mobile',
    Laptop: 'laptop'
  }

  return `/${categoriesUrlConfig[product.category.name]}/${product.productVariants[0].slug}`
}
