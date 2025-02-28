import axiosInstance from '@/configs/http'
import { BaseResponse } from '@/types/auth.type'
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

  async getAllOrders(): Promise<OrderResponseType[]> {
    const res = await axiosInstance.get('orders')
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

  async updateOrderStatus(orderId: number, status: string): Promise<BaseResponse<object>> {
    return await axiosInstance.patch(`orders/${orderId}/status`, { status })
  }
}

const orderAPI = new OrderAPI()
export default orderAPI
