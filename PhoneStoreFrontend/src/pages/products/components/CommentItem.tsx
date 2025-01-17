import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React, { FC } from 'react'

export interface CommentType {
  id: number
  author: string
  content: string
  time: string
  replies?: CommentType[]
}

interface CommentItemProps {
  comment: CommentType
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className='mb-4'>
      {/* Bình luận chính */}
      <div className='flex gap-x-2'>
        <Avatar size='default' icon={<UserOutlined />} />
        <div className='flex flex-col'>
          <div className='flex flex-col px-3 py-2 bg-gray-200 gap-y-1 rounded-xl'>
            <div className='text-xs font-medium'>{comment.author}</div>
            <p className='text-sm'>{comment.content}</p>
          </div>
          <div className='flex items-center text-xs text-gray-700 gap-x-2'>
            <button className='py-1 px-1.5 font-medium'>{comment.time}</button>
            <button className='py-1 px-1.5 font-medium hover:underline'>Phản hồi</button>
          </div>
        </div>
      </div>
      <div className='pl-8'>
        {/* {comment.replies?.map((reply, index) => <CommentItem key={reply.id} comment={reply} />)} */}
      </div>
    </div>
  )
}

export default CommentItem
