import axiosInstance from '@/configs/http'
import { CreatedOrderResponseType, CreateOrderRequest, OrderRequestType, OrderResponseType } from '@/types/order.type'

class OrderAPI {
  async createOrder(orderReq: CreateOrderRequest): Promise<OrderResponseType> {
    const res = await axiosInstance.post('orders', orderReq)
    return res.data
  }

  async createCODOrder(orderReq: CreateOrderRequest): Promise<CreatedOrderResponseType> {
    const res = await axiosInstance.post('orders/cod', orderReq)
    return res.data
  }

  async getOrderById(orderId: number): Promise<OrderResponseType> {
    const res = await axiosInstance.get(`orders/${orderId}`)
    return res.data
  }

  async getOrderByUserId(userId: number): Promise<OrderResponseType[]> {
    const res = await axiosInstance.get(`orders/user/${userId}`)
    return res.data
  }

  async getOrdersByStatus(userId: number, status: string): Promise<OrderResponseType[]> {
    const res = await axiosInstance.get(`orders/user/${userId}?status=${status}`)
    return res.data
  }
}

const orderAPI = new OrderAPI()
export default orderAPI
