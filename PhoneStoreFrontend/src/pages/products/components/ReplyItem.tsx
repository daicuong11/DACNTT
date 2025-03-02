import { ReplyType } from '@/types/comment.type'
import { formatTime } from '@/utils/fomatTime'
import { formatterDay } from '@/utils/formatterDay'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tag } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames'
import { SendHorizonal } from 'lucide-react'
import React, { FC, useRef } from 'react'

interface ReplyItemProps {
  reply: ReplyType
  isReply?: boolean
}

const ReplyItem: FC<ReplyItemProps> = ({ reply, isReply }) => {
  const [rep, setRep] = React.useState<boolean>(false)
  const [commentReply, setCommentReply] = React.useState<string>('')
  const commentInputRef = useRef<HTMLDivElement>(null)

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
        <Avatar className='flex-shrink-0' size={isReply ? 'small' : 'default'} icon={<UserOutlined />} />
        <div className='flex flex-col'>
          <div className='flex flex-col px-3 py-2 bg-gray-200 rounded-xl'>
            <div className='flex items-center gap-x-2'>
              <div className='text-xs font-medium'>{reply.user.name}</div>
              {reply.user.role.toLocaleLowerCase() !== 'customer' && (
                <Tag className='text-white bg-primary'>
                  {reply.user.role == 'ADMIN' ? 'Quản trị viên' : 'Nhân viên'}
                </Tag>
              )}
            </div>
            <p className='text-sm'>{reply.content}</p>
          </div>
          <div className='flex items-center text-xs text-gray-700 gap-x-2'>
            <button className='py-1 px-1.5 font-medium'>{formatTime(reply.createdAt)}</button>
          </div>
        </div>
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

export default ReplyItem
