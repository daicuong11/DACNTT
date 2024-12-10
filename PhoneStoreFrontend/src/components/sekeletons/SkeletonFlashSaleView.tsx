import { Flame } from 'lucide-react'
import { FC } from 'react'
import SkeletonCarouselProduct from './SkeletonCarouselProduct'

const SkeletonFlashSaleView: FC = () => {
  return (
    <div className='p-[10px] bg-gradient-to-r-from-primary rounded-xl animate-pulse'>
      <div className='flex items-center justify-between px-2'>
        <div className='flex items-end text-white'>
          <span className='mr-2 border-2 border-white rounded-full'>
            <Flame size={34} strokeWidth={1.6} />
          </span>
          <span className='text-[38px] font-extrabold leading-[40px] uppercase'>Flash Sale</span>

          <div className='flex items-center ml-4 gap-x-1'>
            <span className='text-sm font-bold'>Diễn ra sau:</span>
            {Array.from({ length: 3 }).map((_, idx) => (
              <span
                key={idx}
                className='text-sm h-6 w-6 cursor-default py-1.5 leading-none px-1.5 rounded btn bg-black font-bold'
              >
                --
              </span>
            ))}
          </div>
        </div>

        <div className='flex gap-x-2'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className='w-[80px] h-8 bg-gray-300 rounded-lg animate-pulse'></div>
          ))}
        </div>
      </div>

      <SkeletonCarouselProduct />
    </div>
  )
}

export default SkeletonFlashSaleView
