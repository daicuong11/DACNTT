import axiosInstance from '@/configs/http'
import { BaseResponsePaginate } from '@/types/auth.type'
import { ReviewResponseType } from '@/types/response.type'
import { ReviewDetailResponse, ReviewRequestType, ReviewType } from '@/types/review.type'

class ReviewAPI {
  async getReviews(
    productVariantId: number,
    page: number = 1,
    pageSize: number = 5,
    filters?: Record<string, string | number | boolean>
  ): Promise<BaseResponsePaginate<ReviewType[]>> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('pageSize', pageSize.toString())
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value.toString())
      })
    }
    return await axiosInstance.get(`reviews/product/${productVariantId}?${params.toString()}`)
  }

  async createReview(req: ReviewRequestType): Promise<ReviewType> {
    try {
      let formData = new FormData()
      formData.append('productVariantId', req.productVariantId.toString())
      formData.append('rating', req.rating.toString())
      formData.append('comment', req.comment)

      req.images.forEach((image) => formData.append('images', image))

      const res = await axiosInstance.post(`reviews`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return res.data
    } catch (error) {
      console.error('Lỗi khi gửi đánh giá:', error)
      throw error
    }
  }

  async getReviewDetailByVariantId(productVariantId: number): Promise<ReviewDetailResponse> {
    const res = await axiosInstance.get(`reviews/total/${productVariantId}`)
    return res.data
  }

  async getAllReviews(): Promise<ReviewType[]> {
    return (await axiosInstance.get(`reviews`)).data
  }

  async updateReviewReply({ reviewId, isReply }: { reviewId: number; isReply: boolean }): Promise<ReviewResponseType> {
    return (await axiosInstance.put(`reviews/${reviewId}/reply`, { isReply })).data
  }
}
const reviewAPI = new ReviewAPI()
export default reviewAPI
