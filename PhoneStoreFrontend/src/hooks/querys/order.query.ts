import orderAPI from '@/apis/order.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { data } from 'react-router-dom'

export const useCreateOrder = () => {
  const mutation = useMutation({
    mutationKey: ['order', 'create'],
    mutationFn: orderAPI.createOrder
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
