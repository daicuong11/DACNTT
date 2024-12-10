import classNames from 'classnames'
import { Flame } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import CarouselProduct from './CarouselProduct'
import { SkeletonFlashSaleView } from '../../../components'
import CountdownTimer from './CountdownTimer'
import { listItems } from '../../../datas'

interface FlashSaleViewProps {}

const initListCategorySale = [
  {
    categoryId: 1,
    categoryName: 'Điện thoại, Tablet'
  },
  {
    categoryId: 2,
    categoryName: 'Phụ kiện, TV'
  },
  {
    categoryId: 3,
    categoryName: 'Gia dụng'
  }
]

const FlashSaleView: React.FC<FlashSaleViewProps> = ({}) => {
  const [categoryActive, setCategoryActive] = useState<number>(initListCategorySale[0].categoryId)
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }, [])

  // if (isLoading) {
  //   return <SkeletonFlashSaleView />
  // }

  // const handleSaleStatusChange = (saleActive: boolean) => {
  //   console.log('saleActive', saleActive)
  // }

  return (
    <div className='bg-gradient-to-r-from-primary rounded-xl '>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-end text-white'>
          <span className='mr-2 border-2 border-white rounded-full'>
            <Flame size={34} strokeWidth={1.6} />
          </span>
          <span className='text-[38px] font-extrabold leading-[40px] uppercase mr-4'>Flash Sale</span>
          <CountdownTimer
            startTime='2024-12-11T00:23:59'
            endTime='2025-01-01T00:00:00'
            // onSaleStatusChange={handleSaleStatusChange}
          />
        </div>
        <div className='flex gap-x-2'>
          {initListCategorySale.map((category, index) => (
            <button
              key={index}
              disabled={category.categoryId === categoryActive}
              onClick={() => setCategoryActive(category.categoryId)}
              className={classNames('text-sm font-semibold btn ', {
                'btn-light': category.categoryId !== categoryActive,
                'btn-warning': category.categoryId === categoryActive
              })}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
      </div>

      <CarouselProduct dataSource={listItems} />
    </div>
  )
}

export default FlashSaleView
