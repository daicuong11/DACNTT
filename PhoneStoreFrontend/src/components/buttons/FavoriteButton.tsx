import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { FC, HTMLAttributes, useState } from 'react'

interface FavoriteButtonProps extends HTMLAttributes<HTMLDivElement> {
  isLove?: boolean
}
const FavoriteButton: FC<FavoriteButtonProps> = ({ isLove, ...props }) => {
  const [liked, setLiked] = useState(false)

  return isLove ? (
    <div {...props} className='p-1 rounded-md'>
      <HeartFilled className='text-xl text-red-500' />
    </div>
  ) : (
    <div
      {...props}
      className='p-1 transition-all duration-300 ease-in-out rounded-md hover:scale-125'
      onMouseEnter={() => setLiked(true)}
      onMouseLeave={() => setLiked(false)}
    >
      {liked ? <HeartFilled className='text-xl text-red-500' /> : <HeartOutlined className='text-xl text-red-500' />}
    </div>
  )
}

export default FavoriteButton
