import DiscountService from '@/apis/discount.api'
import { DiscountType } from '@/types/discount.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useGetAllDiscounts = () => {
  return useQuery({
    queryKey: ['getAllDiscounts'],
    queryFn: DiscountService.getAll
  })
}

export const useCreateDiscount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createDiscount'],
    mutationFn: DiscountService.create,
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['getAllDiscounts'] })
    },
    onError: () => {
      message.error('Lỗi khi thêm mã giảm giá!');
    },
  })
}

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (discount: DiscountType) => DiscountService.update(discount),
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['getAllDiscounts'] }); // Cập nhật danh sách
    },
    onError: () => {
      message.error('Cập nhật thất bại!');
    },
  });
};