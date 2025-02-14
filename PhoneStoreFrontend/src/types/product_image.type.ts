export interface ProductImageType {
  productImageId: number
  productVariantId: number
  imageUrl: string
  isMain: boolean
}

export interface ProductImageRequestType {
  productVariantId: number
  imageUrl: string
  isMain: boolean
}
