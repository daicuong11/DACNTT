import { addBrand, getAllBrands, getBrands, updateBrand } from '@/apis/brand.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useGetBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  })
}

export const useAddBrand = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['addBrand'],
    mutationFn: (formData: FormData) => addBrand(formData),
    onSuccess: (data) => {
      toast.success(`Thêm thành công thương hiệu: ${data.data.name}!`)
      console.log('Add brand successful:', data)

      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },

    onError: (error: unknown) => {
      // Xử lý lỗi và hiển thị thông báo
      const errorMessage = (error as any)?.response?.data?.message || (error as Error).message
      toast.error(`Add failed: ${errorMessage}`)
      console.error('Add error:', error)
    }
  })

  return mutation
}

export const useUpdateBrand = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['updateBrand'],
    mutationFn: ({ id, data }: { id: number; data: FormData }) => updateBrand(id, data),
    onSuccess: (data) => {
      toast.success(`Sửa thành công thương hiệu: ${data.data.name}!`)
      console.log('Update brand successful:', data)

      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },

    onError: (error: unknown) => {
      // Xử lý lỗi và hiển thị thông báo
      const errorMessage = (error as any)?.response?.data?.message || (error as Error).message
      toast.error(`Update failed: ${errorMessage}`)
      console.error('Update error:', error)
    }
  })

  return mutation
}

// cuong create

export const useGetAllBrands = () => {
  const query = useQuery({
    queryKey: ['getAllBrands'],
    queryFn: getAllBrands
  })
  return query
}
