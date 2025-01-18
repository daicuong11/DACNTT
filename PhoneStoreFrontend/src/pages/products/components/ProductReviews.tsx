import React, { FC, useEffect, useState } from 'react'
import { ContainerPanel, FilterButton } from '../../../components'
import { ProductType } from '../../../types/product.type'
import { ConfigProvider, Rate } from 'antd'
import { getRating } from '../../../utils/getRating'
import { StarFilled } from '@ant-design/icons'
import ReviewComment from './ReviewComment'
import { ChevronDown } from 'lucide-react'
import ReviewRatingItem from './ReviewItem'

interface ProductReviewsProps {
  product?: ProductType
}

const initialFilter: string[] = []
const initialFilterRating: string = ''

const ProductReviews: FC<ProductReviewsProps> = ({ product }) => {
  const [activeFilter, setActiveFilter] = useState<string[]>(initialFilter)
  const [activeFilterRating, setActiveFilterRating] = useState<string>(initialFilterRating)

  useEffect(() => {}, [activeFilter, activeFilterRating])

  const handleFilterClick = (filter: string) => {
    setActiveFilter((prevFilters) =>
      prevFilters.includes(filter) ? prevFilters.filter((item) => item !== filter) : [...prevFilters, filter]
    )
  }

  const handleFilterRatingClick = (filter: string) => {
    if (activeFilterRating !== filter) {
      setActiveFilterRating(filter)
    }
  }

  const handleFilterAllClick = () => {
    setActiveFilter(initialFilter)
    setActiveFilterRating(initialFilterRating)
  }

  return (
    <ContainerPanel title={'Đánh giá & nhận xét ' + product?.name}>
      <div className='grid grid-cols-10 gap-4 py-4'>
        <div className='flex flex-col items-center justify-center col-span-4 gap-1 border-r border-gray-300'>
          <h1 className='text-2xl font-semibold text-black'>5.0/5</h1>
          <ConfigProvider
            theme={{
              token: {
                marginXS: 10
              }
            }}
          >
            <Rate value={product ? getRating(product.productId) : 5} allowHalf disabled className='text-base' />
          </ConfigProvider>
          <div className='text-xs font-semibold'>10 đánh giá</div>
        </div>
        <div className='flex flex-col col-span-6 px-6 gap-y-1.5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <ReviewRatingItem key={index} rating={5 - index} productId={product!.productId} />
          ))}
        </div>
      </div>

      <div className='w-full h-[0.5px] bg-slate-200'></div>

      <div className='flex flex-col items-center justify-center p-3 font-normal gap-y-3'>
        <div className='text-base'>Bạn đánh giá sao về sản phẩm này?</div>
        <div className='px-8 py-2 font-medium rounded-md btn btn-danger'>Đánh giá ngay</div>
      </div>

      <div className='w-full h-[0.5px] bg-slate-200'></div>

      <div className='text-[18px] font-bold text-black/70'>Lọc theo</div>
      <div className='flex items-center gap-x-2.5'>
        <FilterButton
          isActive={activeFilter.length === 0 && activeFilterRating.length === 0}
          onClick={() => handleFilterAllClick()}
        >
          Tất cả
        </FilterButton>
        <FilterButton
          isShowCloseIcon
          isActive={activeFilter.includes('Có hình ảnh')}
          onClick={() => handleFilterClick('Có hình ảnh')}
        >
          Có hình ảnh
        </FilterButton>
        <FilterButton
          isShowCloseIcon
          isActive={activeFilter.includes('Đã mua hàng')}
          onClick={() => handleFilterClick('Đã mua hàng')}
        >
          Đã mua hàng
        </FilterButton>
      </div>
      <div className='flex items-center gap-x-2.5'>
        {Array.from({ length: 5 }).map((_, index) => {
          const rating = 5 - index
          return (
            <FilterButton
              key={rating}
              isActive={activeFilterRating === rating.toString()}
              onClick={() => handleFilterRatingClick(rating.toString())}
            >
              <span>
                {rating}
                <StarFilled className='ml-1 text-yellow-400 ' />
              </span>
            </FilterButton>
          )
        })}
      </div>
      <div className='flex flex-col items-start mt-4 gap-y-4'>
        <ReviewComment />
        <ReviewComment />
        <ReviewComment />
        <ReviewComment />
      </div>
      <div className='my-2'>
        <button className='items-end mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-100 shadow-md btn btn-light drop-shadow-sm'>
          Xem thêm
          <span>
            <ChevronDown size={18} strokeWidth={2} />
          </span>
        </button>
      </div>
    </ContainerPanel>
  )
}

export default ProductReviews
