import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

interface SkeletonProductCardType extends HTMLAttributes<HTMLDivElement> {}

const SkeletonProductCard: FC<SkeletonProductCardType> = ({ ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        'relative h-[392px] min-w-[224px] rounded-xl bg-white p-[10px] flex flex-col shadow shadow-slate-900/20 animate-pulse'
      )}
    >
      <div className='flex-[5] flex items-center justify-center'>
        <div className='w-full h-[160px] mt-3 bg-gray-300 rounded-md'></div>
      </div>

      <div className='flex-[6] flex flex-col gap-3 mt-2'>
        <div className='h-[60px] bg-gray-300 rounded-md'></div>

        <div className='flex items-end gap-2'>
          <span className='w-24 h-6 bg-gray-300 rounded-md'></span>
          <span className='w-16 h-4 bg-gray-200 rounded-md'></span>
        </div>

        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className='w-16 h-6 bg-gray-300 rounded-full'></div>
          ))}
        </div>
      </div>

      <div className='flex flex-col justify-end flex-1 mt-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-24 h-6 bg-gray-300 rounded-md'></div>
          </div>
          <div className='w-20 h-6 bg-gray-300 rounded-md'></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductCard
