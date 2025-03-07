import { FC } from 'react'
import SkeletonProductCard from './SkeletonProductCard'
import classNames from 'classnames'

interface SkeletonCarouselProductProps {
  rows?: number
}
const SkeletonCarouselProduct: FC<SkeletonCarouselProductProps> = ({ rows }) => {
  return (
    <div className='relative w-full mt-6 group'>
      <div
        className={classNames(
          'grid grid-cols-2 min-[713px]:grid-cols-3 min-[972px]:grid-cols-4 min-[1220px]:grid-cols-5 gap-2.5 p-2',
          {
            'grid-cols-1': rows === 1,
            'grid-cols-2': rows === 2
          }
        )}
      >
        {Array.from({ length: rows == 1 ? 5 : 10 }).map((_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonCarouselProduct
