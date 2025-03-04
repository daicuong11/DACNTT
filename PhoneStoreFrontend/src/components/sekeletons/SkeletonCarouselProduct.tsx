import { FC } from 'react'
import SkeletonProductCard from './SkeletonProductCard'

const SkeletonCarouselProduct: FC = () => {
  return (
    <div className='relative w-full mt-6 group'>
      <div className='grid grid-cols-2 min-[713px]:grid-cols-3 min-[972px]:grid-cols-4 min-[1220px]:grid-cols-5 gap-2.5 p-2'>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonProductCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default SkeletonCarouselProduct
