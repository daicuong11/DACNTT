import { CategoryType } from '@/types/category.type'
import http from '../utils/http'

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