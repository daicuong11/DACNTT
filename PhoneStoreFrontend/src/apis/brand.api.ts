import { BrandType } from '@/types/brand.type'
import http from '../utils/http'

export const addBrand = async (formData: FormData) => {
  return http.post<BrandType>('brands', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getBrands = async () => {
  return http.get<BrandType[]>('brands')
}

export const updateBrand = async (brandId: number, formData: FormData) => {
    return http.put<BrandType>(`brands/${brandId}`, formData)
}