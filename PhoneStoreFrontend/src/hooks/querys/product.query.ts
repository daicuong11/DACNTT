import {
  addProduct,
  addProductWithVariants,
  get15ProductSimilar,
  getAllProduct,
  getAllProductOfLaptop,
  getAllProductOfMobile,
  getProductById,
  getProductVariants,
  searchProducts,
  updateProduct
} from '@/apis/product.api'
import { ProductRequestType } from '@/types/product.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['getAllProducts'],
    queryFn: getAllProduct
  })
}

export const useGetProductVariants = (productId: number | undefined) => {
  return useQuery({
    queryKey: ['productVariants', productId], // Cache riêng theo productId
    queryFn: () => getProductVariants(productId!), // Dùng ! để đảm bảo không null (có thể check trước)
    enabled: !!productId // Chỉ chạy nếu productId tồn tại
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

export const useAddProductWithVariants = () => {
  const mutation = useMutation({
    mutationKey: ['addProductWithVariants'],
    mutationFn: addProductWithVariants
  })

  return mutation
}

export const useGetProductById = (productId: number) => {
  return useQuery({
    queryKey: ['getProductById', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId // Chỉ chạy nếu productId tồn tại
  })
}

export const useGetAllProductOfMobile = () => {
  return useQuery({
    queryKey: ['getAllProductOfMobile'],
    queryFn: getAllProductOfMobile
  })
}

export const useGetAllProductOfLaptop = () => {
  return useQuery({
    queryKey: ['getAllProductOfLaptop'],
    queryFn: getAllProductOfLaptop
  })
}

export const useGet15ProductSimilar = (id: number) => {
  return useQuery({
    queryKey: ['get15ProductSimilar', id],
    queryFn: () => get15ProductSimilar(id),
    enabled: !!id
  })
}

export const useSearchProducts = (name: string) => {
  return useQuery({
    queryKey: ['searchProducts', name], // Query key có name để caching đúng
    queryFn: () => searchProducts(name), // Truyền name vào API
    enabled: !!name, // Chỉ chạy query nếu name không rỗng
  });
};