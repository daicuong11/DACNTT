import { SpecificationGroupType } from './specification_group.type'

export interface CategoryType {
  categoryId: number
  name: string
  description?: string
  imageUrl: string
  productSpecificationGroups: SpecificationGroupType[]
}

export type CategoryRequestType = {
  id?: number
  name: string
  description?: string
  image: FileList
}

export type ListSelectionOfOptionOfCategoryRenderType = {
  id?: number
  title: string
  params?: string
}

export type OptionOfCategoryRenderType = {
  title: string
  baseUrl: string
  listSelection: ListSelectionOfOptionOfCategoryRenderType[]
}

export type CategoryRenderType = {
  icon: JSX.Element
  name: string
  options: OptionOfCategoryRenderType[]
}

export type ListCategorySaleType = {
  categoryId: number
  name: string
  imageUrl: string
  sale: number
  startTime: string
  endTime: string
}
