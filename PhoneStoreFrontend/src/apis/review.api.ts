import axiosInstance from '@/configs/http'
import { BaseResponsePaginate } from '@/types/auth.type'
import { ReviewRequestType, ReviewType } from '@/types/review.type'

class ReviewAPI {
  async getReviews(
    productVariantId: number,
    page: number = 1,
    pageSize: number = 5
  ): Promise<BaseResponsePaginate<ReviewType[]>> {
    return await axiosInstance.get(`reviews/product/${productVariantId}?page=${page}&pageSize=${pageSize}`)
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
}

const reviewAPI = new ReviewAPI()
export default reviewAPI
