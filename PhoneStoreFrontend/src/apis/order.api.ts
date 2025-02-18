import axiosInstance from '@/configs/http'
import { OrderRequestType, OrderResponseType } from '@/types/order.type'

class OrderAPI {
  async createOrder(orderReq: OrderRequestType): Promise<OrderResponseType> {
    const res = await axiosInstance.post('orders', orderReq)
    return res.data
  }
}

const orderAPI = new OrderAPI()
export default orderAPI
