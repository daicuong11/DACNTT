import { StarFilled } from '@ant-design/icons'
import { Progress } from 'antd'
import { FC } from 'react'

interface ReviewRatingItemProps {
  rating: number
  productVarinatId: number
}
const ReviewRatingItem: FC<ReviewRatingItemProps> = ({ rating }) => {
  const randomPercent = rating == 5 ? 100 : 0
  const countReview = rating == 5 ? 10 : 0
  return (
    <div className='flex items-center gap-x-3'>
      <div className='flex items-center text-sm'>
        <span className='text-base leading-none'>{rating}</span>
        <span className='ml-1'>
          <StarFilled className='text-yellow-400 ' />
        </span>
      </div>
      <Progress percent={randomPercent} strokeColor={'#d70018'} showInfo={false} />
      <div className='text-xs font-normal text-nowrap'>{countReview} đánh giá</div>
    </div>
  )
}

export default ReviewRatingItem
