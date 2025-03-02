import axiosInstance from '@/configs/http'
import { BaseResponse } from '@/types/auth.type'
import { CommentRequestType, CommentType, ReplyRequestType, ReplyType } from '@/types/comment.type'

class CommentAPI {
  async getCommentsByVariantId(variantId: number): Promise<CommentType[]> {
    const response = await axiosInstance.get(`comments/product/${variantId}`)
    return response.data
  }

  async createComment(createCommentReq: CommentRequestType): Promise<CommentType> {
    const response = await axiosInstance.post('comments/add-comment', {
      productVariantId: createCommentReq.productVariantId,
      content: createCommentReq.content
    })
    return response.data
  }

  async createReply(createReplyReq: ReplyRequestType): Promise<ReplyType> {
    const response = await axiosInstance.post('comments/add-reply', {
      commentId: createReplyReq.commentId,
      content: createReplyReq.content
    })
    return response.data
  }
}

const commentAPI = new CommentAPI()
export default commentAPI
