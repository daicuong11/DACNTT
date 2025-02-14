import { createDiscount, getAllDiscounts } from '@/apis/discount.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllDiscounts = () => {
  return useQuery({
    queryKey: ['getAllDiscounts'],
    queryFn: getAllDiscounts
  })
}

export const useCreateDiscount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createDiscount'],

    mutationFn: createDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllDiscounts'] })
    }
  })
}
