import axiosInstance from '@/configs/http'
import { OrderDetailType } from '@/types/order_detail.type'

class OrderDetail {
  async getOrderDetailById(id: number): Promise<OrderDetailType> {
    const response = await axiosInstance.get(`order-details/${id}`)
    return response.data
  }
}

const orderDetailApi = new OrderDetail()
export default orderDetailApi
