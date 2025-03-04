import VariantCard from '@/components/items/VariantCard'
import { useQueryString } from '@/hooks'
import { useGetAllProducts, useSearchProducts } from '@/hooks/querys/product.query'
import useSetDocTitle from '@/hooks/useSetDocTitle'
import { Spin } from 'antd'
import classNames from 'classnames'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ChevronDown, Sparkles } from 'lucide-react'
import React, { FC, useState } from 'react'
import CarouselProduct from '../home/components/CarouselProduct'
import { motion } from 'framer-motion'
import { LoadingOpacity, SkeletonProductCard } from '@/components'

const sortTypes = ['relative', 'price_asc', 'price_desc']

interface SearchResultPageProps {}

const SearchResultPage: FC<SearchResultPageProps> = () => {
  const [sortType, setSortType] = useState(sortTypes[0])
  const queryString = useQueryString()
  useSetDocTitle(`Kết quả tìm kiếm cho: ${queryString.q}`)

  const {
    data: variants,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage
  } = useSearchProducts(queryString.q, 10, sortType)
  const { data: pros, isLoading: isLoading2 } = useGetAllProducts()

  return (
    <div className='py-4 mb-10'>
      {isFetching && <LoadingOpacity />}
      <div className='text-sm font-medium text-center text-gray-600 font-roboto'>
        Tìm thấy <span className='font-semibold text-gray-700'>{variants ? variants.pages[0].totalItems : 0}</span> sản
        phẩm cho từ khóa '<span className='font-semibold text-gray-700'>{queryString.q}</span>'
      </div>
      <div className='mt-3 text-lg font-semibold text-gray-800 font-roboto'>Sắp xếp theo</div>
      <div className='flex gap-x-2.5 transition-all my-4'>
        <span
          onClick={() => setSortType('relative')}
          className={classNames(
            'text-xs bg-gray-100 border border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
            {
              ' border-primary text-primary bg-red-50': sortType == 'relative'
            }
          )}
        >
          Liên quan
        </span>
        <span
          onClick={() => setSortType(sortTypes[2])}
          className={classNames(
            'text-xs bg-gray-100 border flex items-center gap-x-1 border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
            {
              ' border-primary text-primary bg-red-50': sortType == 'price_desc'
            }
          )}
        >
          <ArrowDownWideNarrow size={18} strokeWidth={2} />
          Giá cao
        </span>
        <span
          onClick={() => setSortType(sortTypes[1])}
          className={classNames(
            'text-xs bg-gray-100 border flex items-center gap-x-1 border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
            {
              ' border-primary text-primary bg-red-50': sortType == 'price_asc'
            }
          )}
        >
          <ArrowDownNarrowWide size={18} strokeWidth={2} />
          Giá thấp
        </span>
      </div>
      <div className='grid gap-2.5 grid-cols-2 min-[610px]:grid-cols-3 min-[940px]:grid-cols-4 min-[1182px]:grid-cols-5'>
        {isLoading && [...Array(10)].map((_, index) => <SkeletonProductCard key={index} />)}
        {variants?.pages.map((group, index) => (
          <React.Fragment key={index}>
            {group.data?.map((variant) => (
              <motion.div
                key={variant.variantId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VariantCard variant={variant} />
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className='mt-2.5'>
          <button
            disabled={!hasNextPage || isFetching || isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className='disabled:opacity-50 disabled:cursor-not-allowed items-center font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'
          >
            {isFetching || isFetchingNextPage ? <span className='flex items-center'>Đang tải...</span> : 'Xem thêm'}
            <span>
              <ChevronDown size={18} strokeWidth={2} />
            </span>
          </button>
        </div>
      )}
      <div className='mt-4 bg-cover bg-gradient-to-br from-indigo-500 via-violet-500 to-teal-400 rounded-xl '>
        <div className='flex items-end p-4 text-white'>
          <span className='mr-2 border-2 border-white rounded-full'>
            <Sparkles size={34} strokeWidth={1.6} />
          </span>
          <span className='text-[24px] font-bold uppercase mr-4'>Sản phẩm nổi bật</span>
        </div>

        {isLoading2 ? (
          <div className='flex justify-center items-center py-10'>
            <Spin size='large' />
          </div>
        ) : (
          <CarouselProduct autoPlay={false} dataSource={pros || []} />
        )}
      </div>
    </div>
  )
}

export default SearchResultPage
