import productVariantAPI from '@/apis/product_variant.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useGetVariantByProductId = (productId: number) => {
  return useQuery({
    queryKey: ['getProductVariantsByProductId', productId],
    queryFn: () => productVariantAPI.getVariantByProductId(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 15,
    placeholderData: keepPreviousData
  })
}

export const useGetAllProductVariants = () => {
  return useQuery({
    queryKey: ['getAllProductVariants'],
    queryFn: () => productVariantAPI.getAllProductVariants(),
    staleTime: 1000 * 60 * 15,
    placeholderData: keepPreviousData
  })
}

export const useGetVariantOfMobile = () => {
  return useQuery({
    queryKey: ['getVariantOfMobile'],
    queryFn: () => productVariantAPI.getVariantOfMobile(),
    staleTime: 1000 * 60 * 15,
    placeholderData: keepPreviousData
  })
}

export const useGetVariantOfLaptop = () => {
  return useQuery({
    queryKey: ['getVariantOfLaptop'],
    queryFn: () => productVariantAPI.getVariantOfLaptop(),
    staleTime: 1000 * 60 * 15,
    placeholderData: keepPreviousData
  })
}

export const useGetVariantBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['getVariantBySlug', slug],
    queryFn: () => productVariantAPI.getVariantBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetProductVariantById = (id: number) => {
  return useQuery({
    queryKey: ['getProductVariantById', id],
    queryFn: () => productVariantAPI.getProductVariantById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  })
}
