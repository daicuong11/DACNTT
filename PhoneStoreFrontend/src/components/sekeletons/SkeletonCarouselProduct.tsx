import { FC } from 'react'
import SkeletonProductCard from './SkeletonProductCard'

const SkeletonCarouselProduct: FC = () => {
  return (
    <div className='relative w-full mt-6 group'>
      <div className='grid grid-cols-5 gap-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonCarouselProduct
