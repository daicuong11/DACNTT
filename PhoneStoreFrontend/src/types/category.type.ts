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
