import axiosInstance from '@/configs/http'
import { DiscountRequestType, DiscountType } from '@/types/discount.type'

// get
export const getAllDiscounts = async (): Promise<DiscountType[]> => {
  try {
    const response = await axiosInstance.get('/discounts')
    return response.data
  } catch (error) {
    console.error('Error fetching discounts:', error)
    throw error
  }
}

// post
export const createDiscount = async (discount: DiscountRequestType): Promise<DiscountType> => {
  const response = await axiosInstance.post('/discounts', discount)
  return response.data
}
