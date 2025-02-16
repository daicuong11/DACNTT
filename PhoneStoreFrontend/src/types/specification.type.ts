export interface SpecificationType {
  productSpecificationId: number
  productVariantId: number
  productSpecificationGroupId: number
  key: string
  value: string
  displayOrder: number
  isSpecial: boolean
}

export interface SpecificationRequestType {
  productSpecificationId: number
  productSpecificationGroupId: number
  key: string
  value: string
  displayOrder: number
  isSpecial: boolean
}
