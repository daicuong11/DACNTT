import { ProductType } from '@/types/product.type'
import { ProductVariantType } from '@/types/product_variant.type'

export const getProductRoute = (product: ProductType | ProductVariantType): string => {
  const categoriesUrlConfig: { [key: string]: string } = {
    'Điện thoại': 'mobile',
    Laptop: 'laptop'
  }

  if ('productVariants' in product) {
    return `/${categoriesUrlConfig[product.category.name]}/${product.productVariants[0].slug}`
  }

  return `/${categoriesUrlConfig[product.product.category.name]}/${product.slug}`
}
