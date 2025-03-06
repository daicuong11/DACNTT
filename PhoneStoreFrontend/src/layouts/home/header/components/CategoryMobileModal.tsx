import { getLightBgColorByLabel } from '@/utils/getLightBgColorByLabel'
import classNames from 'classnames'
import React from 'react'

const CategoryMobileModal = () => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='absolute inset-0 z-20 flex h-[calc(100vh-64px-74px)] overflow-hidden bg-white gap-x-2'
    >
      <div className='flex flex-col flex-shrink-0 w-20 overflow-y-auto scrollbar-hide'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <button key={item} className={classNames('flex-shrink-0 h-20 w-20', getLightBgColorByLabel(item + ''))}>
            <span>text {item}</span>
          </button>
        ))}
      </div>
      <div className='flex-1 bg-red-50'>content</div>
    </div>
  )
}

export default CategoryMobileModal
