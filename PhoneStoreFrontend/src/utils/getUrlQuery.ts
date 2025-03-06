import { ListSelectionOfOptionOfCategoryRenderType, OptionOfCategoryRenderType } from '../types/category.type'

const getUrlQuery = (item: OptionOfCategoryRenderType, selection: ListSelectionOfOptionOfCategoryRenderType) => {
  return selection.id
    ? item.baseUrl + '/' + selection.id
    : selection.params
      ? item.baseUrl + '?' + new URLSearchParams(selection.params).toString()
      : item.baseUrl + '/' + selection.title
}

export default getUrlQuery
