export interface SpecificationType {
  specificationId: number
  productVariantId: number
  productSpecificationGroupId: number
  key: string
  value: string
  displayOrder: number
  isSpecial: boolean
}

export interface SpecificationRequestType {
  productVariantId: number
  productSpecificationGroupId: number
  key: string
  value: string
  displayOrder: number
  isSpecial: boolean
}
