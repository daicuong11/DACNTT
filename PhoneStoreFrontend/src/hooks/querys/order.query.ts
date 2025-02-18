import orderAPI from '@/apis/order.api'
import { useMutation } from '@tanstack/react-query'

export const useCreateOrder = () => {
  const mutation = useMutation({
    mutationKey: ['order', 'create'],
    mutationFn: orderAPI.createOrder
  })
  return mutation
}
