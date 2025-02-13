import { CategoryType } from '@/types/category.type'
import http from '../configs/http'
import { BaseResponse } from '@/types/auth.type'

export const addCategory = async (formData: FormData) => {
  return http.post<CategoryType>('categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getCategories = async () => {
  return http.get<CategoryType[]>('categories')
}

export const updateCategory = async (categoryId: number, formData: FormData) => {
  return http.put<CategoryType>(`categories/${categoryId}`, formData)
}

// cuong create
export const getAllCategories = async (): Promise<BaseResponse<CategoryType[]>> => {
  return await http.get('categories')
}

export const getCategoryById = async (categoryId: number): Promise<CategoryType> => {
  const baseRes = await http.get(`categories/${categoryId}`)
  return baseRes.data
}
