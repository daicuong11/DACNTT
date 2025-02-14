import { ProductImageType } from '@/types/product_image.type'

export const getMainImage = (images: ProductImageType[]): ProductImageType | undefined => {
  return images.find((img) => img.isMain) || images[0]
}
