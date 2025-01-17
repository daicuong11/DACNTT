import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames'
import { SendHorizonal } from 'lucide-react'
import React, { FC, useEffect } from 'react'

export interface CommentType {
  id: number
  author: string
  content: string
  time: string
  replies?: CommentType[]
}

interface CommentItemProps {
  comment: CommentType
  isReply?: boolean
}

const CommentItem: FC<CommentItemProps> = ({ comment, isReply }) => {
  const [showReply, setShowReply] = React.useState<boolean>(false)
  const [rep, setRep] = React.useState<boolean>(false)
  const [commentReply, setCommentReply] = React.useState<string>('')

  return (
    <div className='pt-1.5 relative'>
      <div className='relative flex gap-x-2'>
        <Avatar size={isReply ? 'small' : 'default'} icon={<UserOutlined />} />
        <div className='flex flex-col'>
          <div className='flex flex-col px-3 py-2 bg-gray-200 gap-y-1 rounded-xl'>
            <div className='text-xs font-medium'>{comment.author}</div>
            <p className='text-sm'>{comment.content}</p>
          </div>
          <div className='flex items-center text-xs text-gray-700 gap-x-2'>
            <button className='py-1 px-1.5 font-medium'>{comment.time}</button>
            <button onClick={() => setRep(true)} className='py-1 px-1.5 font-medium hover:underline'>
              Phản hồi
            </button>
          </div>
          <div
            className={classNames('w-0.5 bg-gray-300 h-full absolute rounded-full', {
              hidden: isReply,
              'top-9 left-4': !isReply,
              'h-full': !isReply && showReply,
              'h-2/3': !isReply && !showReply
            })}
          ></div>
        </div>
      </div>
      {showReply && comment.replies && comment.replies.length > 0 && (
        <div className='pl-11'>
          {comment.replies?.map((reply, index) => <CommentItem key={reply.id} isReply comment={reply} />)}
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
            <button className='absolute flex items-center justify-center p-1.5 rounded-full bottom-1 right-4 hover:bg-primary/15 text-primary'>
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
        {!showReply && !isReply && (
          <div
            onClick={() => setShowReply(true)}
            className='relative py-1 text-sm font-medium text-gray-500 cursor-pointer'
          >
            Xem 1 phản hồi
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
          <div className='relative flex flex-1 w-full p-2 pb-8 mt-2 border border-gray-200 rounded-lg shadow-md'>
            <TextArea
              className='!border-none !outline-none focus:!outline-none focus:!border-none focus:!shadow-none'
              rows={1}
              autoSize={{ minRows: 1, maxRows: 20 }}
              placeholder='Trả lời bình luận'
            />
            <button className='absolute flex items-center justify-center p-1.5 rounded-full bottom-1 right-4 hover:bg-primary/15 text-primary'>
              <SendHorizonal size={18} />
            </button>
            <div
              className={classNames('w-6 h-6 rounded-bl-xl border-b-2 border-l-2 border-gray-300 absolute ', {
                hidden: isReply,
                'top-3.5 -left-[28.5px]': !isReply
              })}
            ></div>
            <div
              className={classNames('w-0.5 bg-gray-300 h-full absolute rounded-full', {
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
