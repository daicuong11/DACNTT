import { CategoryType } from '@/types/category.type'
import http from '../configs/http'
import { BaseResponse } from '@/types/auth.type'

class CategoryAPI {
  addCategory = async (formData: FormData): Promise<BaseResponse<CategoryType>> => {
    return http.post('categories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  getCategories = async (): Promise<BaseResponse<CategoryType[]>> => {
    return http.get('categories')
  }

  getCategoryById = async (categoryId: number): Promise<BaseResponse<CategoryType>> => {  
    return http.get(`categories/${categoryId}`)
  }

  updateCategory = async (categoryId: number, formData: FormData): Promise<BaseResponse<CategoryType>> => {
    return http.put(`categories/${categoryId}`, formData)
  }
}

export default new CategoryAPI()