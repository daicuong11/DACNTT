import axiosInstance from '@/configs/http'
import { DiscountRequestType, DiscountType } from '@/types/discount.type'
import Response from '@/types/response'

class DiscountAPI {
  // Lấy danh sách tất cả discounts
  static async getAll(): Promise<DiscountType[]> {
    try {
      const response = await axiosInstance.get('/discounts')
      return response.data
    } catch (error) {
      console.error('Error fetching discounts:', error)
      throw error
    }
  }

  // Tạo discount mới
  static async create(discount: DiscountRequestType): Promise<Response<DiscountType> > {
    try {
      const response : Response<DiscountType> = await axiosInstance.post('/discounts', discount)
      return response
    } catch (error) {
      console.error('Error creating discount:', error)
      throw error
    }
  }

  static async update(discount: DiscountType): Promise<Response<DiscountType> > {
    try {
      const response : Response<DiscountType> = await axiosInstance.put(`/discounts/${discount.discountId}`, discount)
      return response
    } catch (error) {
      console.error('Error creating discount:', error)
      throw error
    }
  }

  
}

export default DiscountAPI
