import dashboardApi from '@/apis/dashboard.api'
import { useQuery } from '@tanstack/react-query'

export const useGetTotalUsers = () => {
  return useQuery({
    queryKey: ['totalUsers'],
    queryFn: dashboardApi.totalUsers
  })
}

export const useGetTotalProducts = () => {
  return useQuery({
    queryKey: ['totalProduts'],
    queryFn: dashboardApi.totalProduts
  })
}

export const useGetTotalOrders = () => {
  return useQuery({
    queryKey: ['totalOrders'],
    queryFn: dashboardApi.totalOrders
  })
}

export const useGetTotalRevenue = () => {
  return useQuery({
    queryKey: ['totalRevenue'],
    queryFn: dashboardApi.totalRevenue
  })
}

export const useGetOrdersStatistics = (viewMode: "day" | "week" | "month") => {
  return useQuery({
    queryKey: ["getOrdersStatistics", viewMode],
    queryFn: () => dashboardApi.getOrdersStatistics(viewMode),
  });
};

