import axiosInstance from '@/configs/http'
import { BaseResponse } from '@/types/auth.type'
import { BrandType } from '@/types/brand.type'

class BrandAPI {
  addBrand = async (formData: FormData): Promise<BaseResponse<BrandType>> => {
    return axiosInstance.post('brands', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  getBrands = async (categoryName?: string): Promise<BaseResponse<BrandType[]>> => {
    const url = categoryName ? `brands?categoryName=${categoryName}` : 'brands'
    return axiosInstance.get(url)
  }

  updateBrand = async (brandId: number, formData: FormData): Promise<BaseResponse<BrandType>> => {
    return axiosInstance.put(`brands/${brandId}`, formData)
  }
}

export default new BrandAPI()
