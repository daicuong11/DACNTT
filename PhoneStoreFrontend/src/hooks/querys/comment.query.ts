import commentAPI from '@/apis/comment.api'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

export const useGetCommentsByVariantId = (variantId: number) => {
  return useQuery({
    queryKey: ['getCommentByVariantId', variantId],
    queryFn: () => commentAPI.getCommentsByVariantId(variantId),
    enabled: !!variantId,
    placeholderData: keepPreviousData
  })
}

export const useCreateComment = () => {
  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: commentAPI.createComment
  })
}

export const useCreateReply = () => {
  return useMutation({
    mutationKey: ['createReply'],
    mutationFn: commentAPI.createReply
  })
}
