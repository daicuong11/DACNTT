import orderAPI from '@/apis/order.api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateOrder = () => {
  const mutation = useMutation({
    mutationKey: ['order', 'create'],
    mutationFn: orderAPI.createOrder
  })
  return mutation
}

export const useCreateOrderCOD = () => {
  const mutation = useMutation({
    mutationKey: ['order', 'createCOD'],
    mutationFn: orderAPI.createCODOrder
  })
  return mutation
}

export const useGetOrderById = (orderId: string) => {
  const query = useQuery({
    queryKey: ['getOrderById', orderId],
    queryFn: () => orderAPI.getOrderById(Number(orderId)),
    enabled: !!orderId
  })
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError
  }
}

export const useGetOrderByUserId = () => {
  const mutation = useMutation({
    mutationKey: ['getOrderByUserId'],
    mutationFn: orderAPI.getOrderByUserId
  })
  return mutation
}

export const useGetOrdersByStatus = (userId: number, status: string) => {
  return useQuery({
    queryKey: ['orders', userId, status],
    queryFn: () => orderAPI.getOrdersByStatus(userId, status),
    staleTime: 1000 * 60,
    enabled: !!userId,
    refetchOnWindowFocus: true
  })
}
