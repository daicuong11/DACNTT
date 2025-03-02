import commentAPI from '@/apis/comment.api'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

export const useGetCommentsByVariantId = (variantId: number, pageSize: number = 4) => {
  return useInfiniteQuery({
    queryKey: ['getCommentByVariantId', variantId],
    queryFn: ({ pageParam }) => commentAPI.getCommentsByVariantId(variantId, pageParam, pageSize),
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
    enabled: !!variantId,
    initialPageParam: 1
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
