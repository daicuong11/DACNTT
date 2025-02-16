import { SpecificationType } from './specification.type'

export interface SpecificationGroupType {
  productSpecificationGroupId: number
  groupName: string
  displayOrder: number
  productSpecifications: SpecificationType[]
}
