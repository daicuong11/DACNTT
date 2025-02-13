import { getAllDiscounts } from '@/apis/discount.api'
import { useQuery } from '@tanstack/react-query'

export const useGetAllDiscounts = () => {
  return useQuery({
    queryKey: ['getAllDiscounts'],
    queryFn: getAllDiscounts
  })
}
