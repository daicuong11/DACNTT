import React, { FC, useEffect, useState } from 'react'
import { ContainerPanel, FilterButton } from '../../../components'
import { ConfigProvider, Rate } from 'antd'
import { StarFilled } from '@ant-design/icons'
import ReviewComment from './ReviewComment'
import { ChevronDown } from 'lucide-react'
import ReviewRatingItem from './ReviewItem'
import { ProductVariantType } from '@/types/product_variant.type'
import { useGetReview } from '@/hooks/querys/review.query'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { useAppSelector, useModal } from '@/hooks'
import CreateReviewModal from '@/components/modals/CreateReviewModal'
import LoginOfRegisterModal from '@/components/modals/LoginOrRegisterModal'

interface ProductReviewsProps {
  productVariant: ProductVariantType
}

const initialFilter: string[] = []
const initialFilterRating: string = ''

const ProductReviews: FC<ProductReviewsProps> = ({ productVariant }) => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const { isOpen: isOpentLogin, openModal: openLoginModal, closeModal: closeLoginModal } = useModal()
  const { isOpen, openModal, closeModal } = useModal()
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, isError } = useGetReview(
    productVariant.productVariantId
  )
  const [activeFilter, setActiveFilter] = useState<string[]>(initialFilter)
  const [activeFilterRating, setActiveFilterRating] = useState<string>(initialFilterRating)

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

  if (isError) {
    return null
  }

  const handleReview = () => {
    if (!currentUser) {
      openLoginModal()
    } else {
      openModal()
    }
  }

  return (
    <ContainerPanel title={'Đánh giá & nhận xét ' + productVariant.product.name}>
      <LoginOfRegisterModal title='Vui lòng đăng nhập để đánh giá' isOpen={isOpentLogin} onClose={closeLoginModal} />
      <CreateReviewModal isOpen={isOpen} closeModal={closeModal} productVariant={productVariant} />
      <div
        className={classNames('grid grid-cols-10 gap-4 py-4', {
          'animate-pulse': isFetching
        })}
      >
        <div className='flex flex-col items-center justify-center col-span-4 gap-1 border-r border-gray-300'>
          <h1 className='text-2xl font-semibold text-black'>5.0/5</h1>
          <ConfigProvider
            theme={{
              token: {
                marginXS: 10
              }
            }}
          >
            <Rate value={5} allowHalf disabled className='text-base' />
          </ConfigProvider>
          <div className='text-xs font-semibold'>10 đánh giá</div>
        </div>
        <div className='flex flex-col col-span-6 px-6 gap-y-1.5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <ReviewRatingItem key={index} rating={5 - index} productVariantId={productVariant.productVariantId} />
          ))}
        </div>
      </div>

      <div className='w-full h-[0.5px] bg-slate-200'></div>

      <div className='flex flex-col items-center justify-center p-3 font-normal gap-y-3'>
        <div className='text-base'>Bạn đánh giá sao về sản phẩm này?</div>
        <button onClick={handleReview} className='px-8 py-2 font-medium rounded-md btn btn-danger'>
          Đánh giá ngay
        </button>
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
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((review) => (
              <motion.div
                key={review.reviewId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='w-full'
              >
                <ReviewComment review={review} />
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className='my-2'>
          <button
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className='items-center font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'
          >
            {isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
            <span>
              <ChevronDown size={18} strokeWidth={2} />
            </span>
          </button>
        </div>
      )}
    </ContainerPanel>
  )
}

export default ProductReviews
