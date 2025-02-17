import axiosInstance from '@/configs/http'
import { BaseResponse } from '@/types/auth.type'
import { BrandType } from '@/types/brand.type'

class BrandAPI {
  addBrand = async (formData: FormData): Promise<BaseResponse<BrandType>> => {
    return axiosInstance.post('brands', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  getBrands = async (): Promise<BaseResponse<BrandType[]>> => {
    return axiosInstance.get('brands')
  }

  updateBrand = async (brandId: number, formData: FormData): Promise<BaseResponse<BrandType>> => {
    return axiosInstance.put(`brands/${brandId}`, formData)
  }
}

export default new BrandAPI()
