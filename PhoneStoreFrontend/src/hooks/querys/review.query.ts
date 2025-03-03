import reviewAPI from '@/apis/review.api'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

export const useGetReview = (productVariantId: number, pageSize: number = 5) => {
  return useInfiniteQuery({
    queryKey: ['getReview', productVariantId],
    queryFn: ({ pageParam }) => reviewAPI.getReviews(productVariantId, pageParam, pageSize),
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
