import React, { FC, useState } from 'react'
import { ContainerPanel, LoadingOpacity, MyDivider } from '../../../components'
import TextArea from 'antd/es/input/TextArea'
import { robot_img } from '../../../assets/images'
import { ChevronDown, SendHorizonal } from 'lucide-react'
import CommentItem from './CommentItem'
import { ProductVariantType } from '@/types/product_variant.type'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateComment, useGetCommentsByVariantId } from '@/hooks/querys/comment.query'
import classNames from 'classnames'
import { CommentRequestType } from '@/types/comment.type'
import { toast } from 'react-toastify'

interface ProductCommentsProps {
  productVariant: ProductVariantType
}

const ProductComments: FC<ProductCommentsProps> = ({ productVariant }) => {
  const queryClient = useQueryClient()
  const { data: comments, isLoading, isError } = useGetCommentsByVariantId(productVariant.productVariantId)
  const { mutate: createComment, isPending: isPendingCreateComment } = useCreateComment()
  const [commentInput, setCommentInput] = useState<string>('')

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) {
      toast.error('Vui lòng nhập nội dung bình luận')
      return
    }
    const createCommentReq: CommentRequestType = {
      productVariantId: productVariant.productVariantId,
      content: commentInput
    }
    createComment(createCommentReq, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getCommentByVariantId', productVariant.productVariantId]
        })
        setCommentInput('')
      },
      onError: () => {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
      }
    })
  }

  return isError ? null : (
    <ContainerPanel
      className={classNames({
        'animate-pulse': isLoading
      })}
      titleClassName='text-xl'
      title='Hỏi và đáp'
    >
      {isPendingCreateComment && <LoadingOpacity />}
      <div className='relative flex flex-1 w-full p-2 border border-gray-200 rounded-lg shadow-md pb-11'>
        <div className='flex items-start justify-center px-6 pt-6'>
          <img className='w-[60px] h-[60px] object-contain' src={robot_img} />
        </div>
        <TextArea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className='!border-none !outline-none focus:!outline-none focus:!border-none focus:!shadow-none'
          rows={5}
          autoSize={{ minRows: 3, maxRows: 20 }}
          placeholder='Xin mời để lại câu hỏi, chúng tôi sẽ trả lời lại trong 1h, các câu hỏi sau 22h-8h sẽ được trả lời vào sáng hôm sau'
        />
        <button
          disabled={isPendingCreateComment || !commentInput.trim()}
          onClick={handleCommentSubmit}
          className='absolute disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent flex items-center justify-center p-2 rounded-full bottom-1.5 right-4 hover:bg-primary/15 text-primary'
        >
          <SendHorizonal size={20} />
        </button>
      </div>
      {comments && comments?.length > 0 && <MyDivider />}
      {comments && (
        <div className='flex flex-col text-black gap-y-2'>
          {comments?.map((comment, index) => (
            <CommentItem
              key={comment.commentId}
              isShowReply={index < 5}
              comment={comment}
              productVariantId={productVariant.productVariantId}
            />
          ))}
        </div>
      )}
      {comments && comments.length > 4 && (
        <div className='my-2'>
          <button className='items-center font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'>
            Xem thêm
            <span>
              <ChevronDown size={18} strokeWidth={2} />
            </span>
          </button>
        </div>
      )}
    </ContainerPanel>
  )
}

export default ProductComments
