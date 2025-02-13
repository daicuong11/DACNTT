import axiosInstance from '@/configs/http'
import { DiscountType } from '@/types/discount.type'

export const getAllDiscounts = async (): Promise<DiscountType[]> => {
  try {
    const response = await axiosInstance.get('/discounts')
    return response.data
  } catch (error) {
    console.error('Error fetching discounts:', error)
    throw error
  }
}
