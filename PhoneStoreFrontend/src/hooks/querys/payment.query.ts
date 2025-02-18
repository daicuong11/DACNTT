import paymentAPI from '@/apis/payment.api'
import { useMutation } from '@tanstack/react-query'

export const useCreatePayCOD = () => {
  const mutation = useMutation({
    mutationKey: ['payment', 'createPayCOD'],
    mutationFn: paymentAPI.addPaymentCod
  })
  return mutation
}
