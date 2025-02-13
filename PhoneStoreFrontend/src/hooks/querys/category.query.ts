import { addCategory, getAllCategories, getCategories, getCategoryById, updateCategory } from '@/apis/category.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
}

export const useAddCategory = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['addCategory'],
    mutationFn: (formData: FormData) => addCategory(formData),
    onSuccess: (data) => {
      toast.success(`Thêm thành công danh mục: ${data.data.name}!`)
      console.log('Add category successful:', data)

      queryClient.invalidateQueries({ queryKey: ['categories'] })
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

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: ({ id, data }: { id: number; data: FormData }) => updateCategory(id, data),
    onSuccess: (data) => {
      toast.success(`Sửa thành công danh mục: ${data.data.name}!`)
      console.log('Update category successful:', data)

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

// cuong create
export const useGetAllCategories = () => {
  const query = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: getAllCategories
  })
  return query
}

export const useGetCategoryById = (categoryId: number) => {
  const query = useQuery({
    queryKey: ['getCategoryById', categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: categoryId >= 0,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false
  })
  return query
}
