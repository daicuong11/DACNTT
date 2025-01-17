import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import classNames from 'classnames'
import { FC, HTMLAttributes, useState } from 'react'

interface FavoriteButtonProps extends HTMLAttributes<HTMLDivElement> {
  isLove?: boolean
  className?: string
}
const FavoriteButton: FC<FavoriteButtonProps> = ({ isLove, className, ...props }) => {
  const [liked, setLiked] = useState(false)

  return isLove ? (
    <div {...props} className={classNames('p-1 rounded-md cursor-pointer', className)}>
      <HeartFilled className='text-xl text-red-600' />
    </div>
  ) : (
    <div
      {...props}
      className={classNames(
        'p-1 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:animate-smallPing',
        className
      )}
      onMouseEnter={() => setLiked(true)}
      onMouseLeave={() => setLiked(false)}
    >
      {liked ? <HeartFilled className='text-xl text-red-600' /> : <HeartOutlined className='text-xl text-red-600' />}
    </div>
  )
}

export default FavoriteButton
