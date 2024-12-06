import { ListSelectionOfOptionOfCategoryRenderType, OptionOfCategoryRenderType } from '../types/category.type'

const getUrlQuery = (item: OptionOfCategoryRenderType, selection: ListSelectionOfOptionOfCategoryRenderType) => {
  return selection.id ? item.baseUrl + '/' + selection.id : item.baseUrl + '?' + selection.params
}

export default getUrlQuery
