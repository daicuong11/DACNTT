export interface BrandType {
  brandId: number
  name: string
  description?: string
  imageUrl: string
}

export type BrandRequestType = {
  name: string
  description?: string
  image: FileList
}