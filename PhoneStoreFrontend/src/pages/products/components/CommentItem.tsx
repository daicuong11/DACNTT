import { CommentType, ReplyRequestType } from '@/types/comment.type'
import { formatterDay } from '@/utils/formatterDay'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tag } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames'
import { SendHorizonal } from 'lucide-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import ReplyItem from './ReplyItem'
import { formatTime } from '@/utils/fomatTime'
import { useCreateReply } from '@/hooks/querys/comment.query'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { AvatarCustom } from '@/components'

interface CommentItemProps {
  comment: CommentType
  isReply?: boolean
  productVariantId: number
  isShowReply: boolean
}

const CommentItem: FC<CommentItemProps> = ({ comment, isReply, productVariantId, isShowReply = false }) => {
  const queryClient = useQueryClient()

  const [showReply, setShowReply] = useState<boolean>(isShowReply && comment.replies.length > 0)
  const [rep, setRep] = useState<boolean>(false)
  const [commentReply, setCommentReply] = useState<string>('')
  const commentInputRef = useRef<HTMLDivElement>(null)
  const { mutate: createReply, isPending: isPendingCreateRely } = useCreateReply()

  const handleCommentSubmit = () => {
    if (!commentReply.trim()) {
      toast.error('Vui lòng nhập nội dung phản hồi')
      return
    }
    const createReplyReq: ReplyRequestType = {
      commentId: comment.commentId,
      content: commentReply
    }
    createReply(createReplyReq, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getCommentByVariantId', productVariantId]
        })
        setCommentReply('')
        setShowReply(true)
      },
      onError: () => {
        toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
      }
    })
  }

  const handleScrollToCommentInput = () => {
    if (commentInputRef.current) {
      const rect = commentInputRef.current.getBoundingClientRect()
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
      if (!isFullyVisible) commentInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  const handleRepCommentClick = () => {
    setRep(true)
    handleScrollToCommentInput()
  }

  return (
    <div className='pt-1.5 relative'>
      <div className='relative flex gap-x-2'>
        {rep && !showReply && !isReply && (
          <div
            className={classNames('w-[1.5px] bg-gray-300 z-50 absolute rounded-full', {
              hidden: !rep,
              'top-9 left-[16.5px]': rep,
              'h-full': rep
            })}
          ></div>
        )}
        <AvatarCustom name={comment.user.name} role={comment.user.role} />
        <div className='flex flex-col'>
          <div className='flex flex-col px-3 py-2 bg-gray-200 rounded-xl'>
            <div className='flex items-center gap-x-2'>
              <div className='text-xs font-medium'>{comment.user.name}</div>
              {comment.user.role.toLocaleLowerCase() !== 'customer' && (
                <Tag className='text-white bg-primary'>
                  {comment.user.role == 'ADMIN' ? 'Quản trị viên' : 'Nhân viên'}
                </Tag>
              )}
            </div>
            <p className='text-sm'>{comment.content}</p>
          </div>
          <div className='flex items-center text-xs text-gray-700 gap-x-2'>
            <button className='py-1 px-1.5 font-medium'>{formatTime(comment.createdAt)}</button>
            <button onClick={handleRepCommentClick} className='py-1 px-1.5 font-medium hover:underline'>
              Phản hồi
            </button>
          </div>
          <div
            className={classNames('w-0.5 bg-gray-300 absolute rounded-full', {
              hidden: isReply || comment.replies.length === 0,
              'top-9 left-4': !isReply,
              'h-full': showReply,
              'h-2/3': !showReply
            })}
          ></div>
        </div>
      </div>
      {showReply && comment.replies && comment.replies.length > 0 && (
        <div className='pl-11'>
          {comment.replies?.map((reply) => (
            <motion.div
              key={reply.replyId}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReplyItem isReply reply={reply} />
            </motion.div>
          ))}
        </div>
      )}
      <div className='pl-11'>
        {showReply && !isReply && (
          <div className='relative flex flex-1 w-full p-2 pb-8 mt-2 border border-gray-200 rounded-lg shadow-md'>
            <TextArea
              value={commentReply}
              onChange={(e) => setCommentReply(e.target.value)}
              className='!border-none !outline-none focus:!outline-none focus:!border-none focus:!shadow-none'
              rows={1}
              autoSize={{ minRows: 1, maxRows: 20 }}
              placeholder='Trả lời bình luận'
            />
            <button
              disabled={isPendingCreateRely || !commentReply.trim()}
              onClick={handleCommentSubmit}
              className='absolute disabled:opacity-50 disabled:bg-transparent disabled:cursor-not-allowed flex items-center justify-center p-1.5 rounded-full bottom-1 right-4 hover:bg-primary/15 text-primary'
            >
              <SendHorizonal size={18} />
            </button>
            <div
              className={classNames('w-6 h-6 rounded-bl-xl border-b-2 border-l-2 border-gray-300 absolute ', {
                hidden: isReply,
                'top-3.5 -left-[28.5px]': !isReply
              })}
            ></div>
          </div>
        )}
        {!showReply && !isReply && comment.replies.length > 0 && (
          <div
            onClick={() => setShowReply(true)}
            className='relative py-1 text-sm font-medium text-gray-500 cursor-pointer'
          >
            Xem {comment.replies?.length} phản hồi
            <div
              className={classNames('w-6 h-6 rounded-bl-lg border-b-2 border-l-2 border-gray-300 absolute ', {
                hidden: isReply,
                '-top-2 -left-7': !isReply
              })}
            ></div>
          </div>
        )}
      </div>
      <div className='pl-11'>
        {rep && !showReply && !isReply && (
          <div
            ref={commentInputRef}
            className='relative flex flex-1 w-full p-2 pb-8 mt-2 border border-gray-200 rounded-lg shadow-md'
          >
            <TextArea
              value={commentReply}
              onChange={(e) => setCommentReply(e.target.value)}
              className='!border-none !outline-none focus:!outline-none focus:!border-none focus:!shadow-none'
              rows={1}
              autoSize={{ minRows: 1, maxRows: 20 }}
              placeholder='Trả lời bình luận'
            />
            <button
              disabled={isPendingCreateRely || !commentReply.trim()}
              onClick={handleCommentSubmit}
              className='absolute disabled:opacity-50 disabled:bg-transparent disabled:cursor-not-allowed flex items-center justify-center p-1.5 rounded-full bottom-1 right-4 hover:bg-primary/15 text-primary'
            >
              <SendHorizonal size={18} />
            </button>
            <div
              className={classNames('w-6 h-6 rounded-bl-xl border-b-2 border-l-2 border-gray-300 absolute ', {
                hidden: isReply,
                'top-3.5 -left-[28.5px]': !isReply
              })}
            ></div>
            <div
              className={classNames('w-0.5 bg-gray-300 absolute rounded-full', {
                hidden: !rep,
                '-top-8 -left-[28.5px]': rep,
                'h-2/3': rep
              })}
            ></div>
          </div>
        )}
      </div>
      <div
        className={classNames('w-0.5 bg-gray-300 h-full absolute ', {
          hidden: !isReply,
          'top-9 -left-7': isReply
        })}
      ></div>
      <div
        className={classNames('w-6 h-6 rounded-bl-xl border-b-2 border-l-2 border-gray-300 absolute ', {
          hidden: !isReply,
          '-top-1.5 -left-7': isReply
        })}
      ></div>
    </div>
  )
}

export default CommentItem
