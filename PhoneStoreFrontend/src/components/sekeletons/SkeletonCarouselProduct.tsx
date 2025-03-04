import { FC } from 'react'
import SkeletonProductCard from './SkeletonProductCard'

const SkeletonCarouselProduct: FC = () => {
  return (
    <div className='relative w-full mt-6 group'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2'>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonCarouselProduct
