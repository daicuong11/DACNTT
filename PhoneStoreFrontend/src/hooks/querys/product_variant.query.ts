import productVariantAPI from '@/apis/product_variant.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useGetVariantByProductId = (productId: number) => {
  return useQuery({
    queryKey: ['getProductVariantsByProductId', productId],
    queryFn: () => productVariantAPI.getVariantByProductId(productId),
    enabled: !!productId
  })
}

export const useGetAllProductVariants = () => {
  return useQuery({
    queryKey: ['getAllProductVariants'],
    queryFn: () => productVariantAPI.getAllProductVariants()
  })
}

export const useGetVariantOfMobile = () => {
  return useQuery({
    queryKey: ['getVariantOfMobile'],
    queryFn: () => productVariantAPI.getVariantOfMobile()
  })
}

export const useGetVariantOfLaptop = () => {
  return useQuery({
    queryKey: ['getVariantOfLaptop'],
    queryFn: () => productVariantAPI.getVariantOfLaptop()
  })
}

export const useGetVariantBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['getVariantBySlug', slug],
    queryFn: () => productVariantAPI.getVariantBySlug(slug),
    placeholderData: keepPreviousData,
    enabled: !!slug
  })
}

export const useGetProductVariantById = (id: number) => {
  return useQuery({
    queryKey: ['getProductVariantById', id],
    queryFn: () => productVariantAPI.getProductVariantById(id),
    enabled: !!id
  })
}