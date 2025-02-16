import { ProductResponse, ProductType, VariantResponse } from '@/types/product.type'
import { ProductVariantType } from '@/types/product_variant.type'

export const getProductRoute = (categoryName: string, slug: string): string => {
  const categoriesUrlConfig: { [key: string]: string } = {
    'Điện thoại': 'mobile',
    Laptop: 'laptop'
  }
  return `/${categoriesUrlConfig[categoryName]}/${slug}`
}
