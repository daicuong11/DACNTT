import orderDetailApi from '@/apis/order_detail.api'
import { useQuery } from '@tanstack/react-query'

export const useGetOrderDetailById = (id: number) => {
  return useQuery({
    queryKey: ['getOrderDetailById', id],
    queryFn: () => orderDetailApi.getOrderDetailById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  })
}
