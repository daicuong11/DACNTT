import { addCategory, getCategories, updateCategory } from '@/apis/category.api'
import { addProduct, getProducts, updateProduct } from '@/apis/product.api'
import { ProductRequestType } from '@/types/product.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
}

export const useAddProduct = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: (formData: ProductRequestType) => addProduct(formData),
    onSuccess: (data) => {
      toast.success(`Thêm thành công sản phẩm: ${data.data.name}!`)
      console.log('Add product successful:', data)

      queryClient.invalidateQueries({ queryKey: ['products'] })
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: ({ id, data }: { id: number; data: FormData }) => updateProduct(id, data),
    onSuccess: (data) => {
      toast.success(`Sửa thành công sản phẩm: ${data.data.name}!`)
      console.log('Update product successful:', data)

      queryClient.invalidateQueries({ queryKey: ['categories'] })
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
