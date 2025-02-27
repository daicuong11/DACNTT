import axiosInstance from '@/configs/http'
import { OrderStatisticsType } from '@/types/Statistics.type'

class DashboardAPI {
  async totalUsers(): Promise<number> {
    const req = await axiosInstance.get('dashboard/total-users')
    return req.data
  }
  async totalProduts(): Promise<number> {
    const req = await axiosInstance.get('dashboard/total-products')
    return req.data
  }
  async totalOrders(): Promise<number> {
    const req = await axiosInstance.get('dashboard/total-orders')
    return req.data
  }
  async totalRevenue(): Promise<number> {
    const req = await axiosInstance.get('dashboard/total-revenue')
    return req.data
  }

  async getOrdersStatistics(): Promise<OrderStatisticsType[]> {
    const req = await axiosInstance.get('dashboard/orders-statistics')
    return req.data
  }
}

export default new DashboardAPI()
