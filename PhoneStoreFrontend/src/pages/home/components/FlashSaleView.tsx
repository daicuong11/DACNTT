import classNames from 'classnames'
import { Flame } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import CarouselProduct from './CarouselProduct'
import { LoadingItem, SkeletonFlashSaleView } from '../../../components'
import CountdownTimer from './CountdownTimer'
import { useGetAllProducts } from '@/hooks/querys/product.query'

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
  const { data: products, isLoading } = useGetAllProducts()

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

  return isLoading ? (
    <SkeletonFlashSaleView />
  ) : (
    <div className='bg-gradient-to-r-from-primary rounded-xl '>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-end text-white'>
          <span className='mr-2 border-2 border-white rounded-full'>
            <Flame size={34} strokeWidth={1.6} />
          </span>
          <span className='text-[38px] font-extrabold leading-[40px] uppercase mr-4'>
            {/* Flash Sale */}
            Deadline dacntt
          </span>
          <CountdownTimer
            startTime='2025-02-19T00:23:59'
            endTime='2025-02-20T00:00:00'
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

      <CarouselProduct dataSource={products || []} />
    </div>
  )
}

export default FlashSaleView
