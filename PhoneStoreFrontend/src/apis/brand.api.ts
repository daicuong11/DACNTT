import { BrandType } from '@/types/brand.type'
import http from '../configs/http'
import { BaseResponse } from '@/types/auth.type'

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

// cuong create
export const getAllBrands = async (): Promise<BaseResponse<BrandType[]>> => {
  return await http.get('brands')
}
