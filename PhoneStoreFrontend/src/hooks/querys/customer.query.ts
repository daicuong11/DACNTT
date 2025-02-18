import customerAPI from '@/apis/customer.api'
import { useMutation } from '@tanstack/react-query'

export const useAddCustomer = () => {
  const mutation = useMutation({
    mutationKey: ['customer', 'add'],
    mutationFn: customerAPI.addCustomer
  })

  return mutation
}
