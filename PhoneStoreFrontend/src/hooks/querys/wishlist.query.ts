import { useAddProduct } from './product.query'
import wishlistAPI from '@/apis/wishlist.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetMyWishlist = (userId: number) => {
  return useQuery({
    queryKey: ['getMyWishlist', userId],
    queryFn: () => wishlistAPI.getMyWishlist(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 15
  })
}

export const useGetWishlistByUserIdAndProductVariantId = (userId: number, productVariantId: number) => {
  return useQuery({
    queryKey: ['getWishlistByUserIdAndProductVariantId', userId, productVariantId],
    queryFn: () => wishlistAPI.getWishlistByUserIdAndProductVariantId(userId, productVariantId),
    enabled: !!userId && !!productVariantId,
    staleTime: 1000 * 60 * 15
  })
}

export const useAddProductToWishlist = () => {
  return useMutation({
    mutationKey: ['addProductToWishlist'],
    mutationFn: wishlistAPI.addProductToWishlist
  })
}

export const useRemoveProductFromWishlist = () => {
  return useMutation({
    mutationKey: ['removeProductFromWishlist'],
    mutationFn: wishlistAPI.removeProductFromWishlist
  })
}
