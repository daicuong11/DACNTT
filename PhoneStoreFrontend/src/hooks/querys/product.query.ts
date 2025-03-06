import {
  addProduct,
  addProductWithVariants,
  get15ProductOfCategoryName,
  get15ProductSimilar,
  getAllProduct,
  getAllProductOfLaptop,
  getAllProductOfMobile,
  getProductById,
  getProductVariants,
  getVariantByBrandName,
  getVariantByCategoryName,
  searchProducts,
  updateProduct
} from '@/apis/product.api'
import { ProductRequestType } from '@/types/product.type'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['getAllProducts'],
    queryFn: getAllProduct
  })
}

export const useGetProductVariants = (productId: number | undefined) => {
  return useQuery({
    queryKey: ['productVariants', productId],
    queryFn: () => getProductVariants(productId!),
    enabled: !!productId
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
    enabled: !!productId
  })
}

export const useGet15ProductOfCategoryName = (categoryName: string) => {
  return useQuery({
    queryKey: ['get15ProductOfCategoryName', categoryName],
    queryFn: () => get15ProductOfCategoryName(categoryName),
    enabled: !!categoryName
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

export const useSearchProducts = (
  name: string,
  pageSize: number = 10,
  sort?: string,
  filters?: Record<string, string | number>
) => {
  return useInfiniteQuery({
    queryKey: ['searchProducts', name, sort, filters],
    queryFn: ({ pageParam }) => searchProducts(name, pageParam, pageSize, sort, filters),
    enabled: !!name,
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetAllVariantByCategoryName = (
  categoryName: string,
  pageSize: number = 10,
  sort?: string,
  filters?: Record<string, string | number>
) => {
  return useInfiniteQuery({
    queryKey: ['getAllVariantByCategoryName', categoryName, sort, filters],
    queryFn: ({ pageParam }) =>
      getVariantByCategoryName(categoryName, pageParam, pageSize, sort, filters?.price === 0 ? undefined : filters),
    enabled: !!categoryName,
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetAllVariantByBrandName = (
  brandName: string,
  pageSize: number = 10,
  sort?: string,
  filters?: Record<string, string | number>
) => {
  return useInfiniteQuery({
    queryKey: ['getAllVariantByBrandName', brandName, sort, filters],
    queryFn: ({ pageParam }) =>
      getVariantByBrandName(brandName, pageParam, pageSize, sort, filters?.price === 0 ? undefined : filters),
    enabled: !!brandName,
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  })
}
