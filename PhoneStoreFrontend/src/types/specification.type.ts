export interface SpecificationType {
  specificationId: number
  productVariantId: number
  specificationGroupId: number
  key: string
  value: string
  displayOrder: number
  isSpecial: boolean
}

export interface SpecificationRequestType {
  productVariantId: number
  specificationGroupId: number
  key: string
  value: string
  displayOrder: number
  isSpecial: boolean
}
