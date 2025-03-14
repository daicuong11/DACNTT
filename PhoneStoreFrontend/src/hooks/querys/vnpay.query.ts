import vnpay from '@/apis/vnpay.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useQuery } from "@tanstack/react-query";

export const useCreatePaymentUrl = () => {
  const mutation = useMutation<string, unknown, { orderId: number }>({
    mutationKey: ['useCreatePaymentUrl'],
    mutationFn: async ({ orderId }) => {
      const url = await vnpay.createPaymentUrl(orderId)
      if (!url) throw new Error('Không nhận được URL thanh toán!')
      return url
    },
    onSuccess: (paymentUrl) => {
        toast.success('Tạo link thanh toán thành công!')
      },

    onError: (error: unknown) => {
      // Xử lý lỗi và hiển thị thông báo
      const errorMessage = (error as any)?.response?.data?.message || (error as Error).message
      toast.error(`create failed: ${errorMessage}`)
      console.error('create error:', error)
    }
  })

  return {
    ...mutation,
    createPayment: mutation.mutate // ✅ Đổi tên mutate cho dễ hiểu
  }
}

export const useCheckPayment = (searchParams: URLSearchParams) => {
  return useQuery({
    queryKey: ["checkPayment", searchParams.toString()],
    queryFn: () => vnpay.checkPayment(searchParams),
    retry: 1, // Chỉ thử lại 1 lần nếu lỗi
    staleTime: 0, // Không cache dữ liệu cũ
    enabled: !!searchParams.toString(), // Chỉ chạy khi có searchParams
  });
};