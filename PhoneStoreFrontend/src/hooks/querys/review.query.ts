import reviewAPI from '@/apis/review.api'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetReview = (
  productVariantId: number,
  pageSize: number = 5,
  filters?: Record<string, string | number | boolean>
) => {
  return useInfiniteQuery({
    queryKey: ['getReview', productVariantId, filters],
    queryFn: ({ pageParam }) => reviewAPI.getReviews(productVariantId, pageParam, pageSize, filters),
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
    enabled: !!productVariantId,
    initialPageParam: 1
  })
}

export const useCreateReview = () => {
  return useMutation({
    mutationKey: ['createReview'],
    mutationFn: reviewAPI.createReview
  })
}

export const useGetReviewDetail = (productVariantId: number) => {
  return useQuery({
    queryKey: ['getReviewDetail', productVariantId],
    queryFn: () => reviewAPI.getReviewDetailByVariantId(productVariantId),
    enabled: !!productVariantId
  })
}

export const useAllReviews = () => {
  return useQuery({
    queryKey: ['getAllReviews'],
    queryFn: () => reviewAPI.getAllReviews(),
  })
}

export const useUpdateReviewReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: reviewAPI.updateReviewReply,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllReviews"] });
        },
  });
};