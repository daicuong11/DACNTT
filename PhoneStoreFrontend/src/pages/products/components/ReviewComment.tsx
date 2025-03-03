import { iphone1 } from '@/assets/images/iphone'
import { AvatarCustom } from '@/components'
import { ReviewType } from '@/types/review.type'
import { formatTime } from '@/utils/fomatTime'
import { ConfigProvider, Divider, Flex, Image, Rate, Tag } from 'antd'
import { Clock } from 'lucide-react'
import { FC } from 'react'

interface ReviewCommentProps {
  review: ReviewType
}
const ReviewComment: FC<ReviewCommentProps> = ({ review }) => {
  return (
    <div className='w-full p-4 space-y-3 bg-white border border-gray-200 shadow-sm shadow-gray-200 rounded-xl'>
      <div className='flex items-center gap-x-3'>
        <div className='flex items-center space-x-4'>
          <AvatarCustom name={review.user.name} />
          <div className='text-sm font-medium text-black'>{review.user.name}</div>
        </div>
        <div className='flex items-center gap-1 text-xs text-gray-700'>
          <span>
            <Clock size={16} strokeWidth={1.6} />
          </span>
          {formatTime(review.createdAt)}
        </div>
      </div>
      <div className='flex items-center space-x-3'>
        <ConfigProvider
          theme={{
            token: {
              marginXS: 3
            }
          }}
        >
          <Rate value={review.rating} allowHalf disabled className='text-base' />
        </ConfigProvider>
        {review.verifiedPurchase && <Divider type='vertical' />}
        <Flex gap='4px 0' wrap>
          {review.verifiedPurchase && (
            <Tag color='default' className='text-gray-500'>
              Đã mua hàng
            </Tag>
          )}
        </Flex>
      </div>
      <div className='text-[13px] text-gray-900'>{review.comment}</div>
      <div className='flex flex-wrap gap-4'>
        {review.hasImages &&
          review.images.split(';').map((image, index) => {
            if (image) {
              return (
                <span key={index} className='w-32 h-32 overflow-hidden border border-gray-200 rounded-md'>
                  <Image src={image} alt={`Product image ${index + 1}`} />
                </span>
              )
            }
            return null
          })}
      </div>
      {review.isReply && (
        <div>
          <div className='mt-8 relative bg-primary/5 text-primary py-1.5 px-3 text-sm font-medium text-center border-y border-primary'>
            Hỗ trợ kỹ thuật đã liên hệ hỗ trợ ngày 17/11/2024
            <span className='absolute left-0 h-[calc(100%+8px)] w-1 bg-primary -translate-y-1/2 top-1/2'>
              <span className='absolute w-3 h-2 -translate-x-1/2 rounded-t-sm rounded-b -top-1 left-1/2 bg-primary'></span>
              <span className='absolute w-3 h-2 -translate-x-1/2 rounded-t-sm rounded-b -bottom-1 left-1/2 bg-primary'></span>
            </span>
            <span className='absolute right-0 h-[calc(100%+8px)] w-1 bg-primary -translate-y-1/2 top-1/2'>
              <span className='absolute w-3 h-2 -translate-x-1/2 rounded-t-sm rounded-b -top-1 left-1/2 bg-primary'></span>
              <span className='absolute w-3 h-2 -translate-x-1/2 rounded-t-sm rounded-b -bottom-1 left-1/2 bg-primary'></span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewComment
