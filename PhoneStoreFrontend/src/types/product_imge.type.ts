export interface ProductImageType {
  productImageId: number
  productVariantId: number
  imageUrl: string
  isMainImage: boolean
}

export interface ProductImageRequestType {
  productVariantId: number
  imageUrl: string
  isMainImage: boolean
}
