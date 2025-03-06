import VariantCard from '@/components/items/VariantCard'
import { useQueryString } from '@/hooks'
import { useGetAllProducts, useGetAllVariantByCategoryName, useSearchProducts } from '@/hooks/querys/product.query'
import useSetDocTitle from '@/hooks/useSetDocTitle'
import { Empty, Popover, Slider, Spin } from 'antd'
import classNames from 'classnames'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ChevronDown, Sparkles, Ticket } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import CarouselProduct from '../home/components/CarouselProduct'
import { motion } from 'framer-motion'
import { LoadingOpacity, SkeletonProductCard } from '@/components'
import { useParams } from 'react-router-dom'
import formatPrice from '@/utils/formatPrice'
import { categoryConfig } from '@/hooks/useBreadcrumbs '

const sortTypes = ['all', 'price_asc', 'price_desc']

interface CategoryPageProps {}

const CategoryPage: FC<CategoryPageProps> = () => {
  const [open, setOpen] = useState(false)
  const [sortType, setSortType] = useState(sortTypes[0])
  const { category } = useParams<{ category: string }>()
  const queryString = useQueryString()
  const [tempPrice, setTempPrice] = useState<[number, number]>([0, 100000000])
  const [price, setPrice] = useState<[number, number]>([0, 0])
  useSetDocTitle(`Kết quả tìm kiếm cho: ${queryString.q}`)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const {
    data: variants,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage
  } = useGetAllVariantByCategoryName(categoryConfig[category || ''], 10, sortType, {
    price: price[1] !== 0 ? `${price[0]}-${price[1]}` : 0
  })
  const { data: pros, isLoading: isLoading2 } = useGetAllProducts()

  useEffect(() => {
    if (queryString.price) {
      const [min, max] = queryString.price.split('-').map(Number)
      setPrice([min, max])
    }
  }, [queryString.price])

  const handleFilterPrice = () => {
    setPrice(tempPrice)
    setOpen(false)
  }

  return (
    <div className='py-4 mb-10'>
      <div className='mt-3 mb-3 text-lg font-semibold text-gray-800 font-roboto'>Lọc theo giá</div>
      <div className='flex gap-x-2.5 transition-all '>
        <Popover
          trigger='click'
          open={open}
          onOpenChange={handleOpenChange}
          placement='right'
          content={
            <div className='min-w-[300px] flex flex-col p-1'>
              <div className='flex items-center justify-between text-base'>
                <span className=''>{formatPrice(tempPrice[0])}</span>
                <span className=''>{formatPrice(tempPrice[1])}</span>
              </div>
              <Slider
                range
                min={0}
                max={100000000}
                step={10000}
                defaultValue={tempPrice}
                classNames={{
                  track: '!bg-primary',
                  rail: '!bg-gray-200'
                }}
                onChange={(value) => setTempPrice(value as [number, number])}
              />
              <div className='flex items-center justify-between gap-x-2.5 mt-3'>
                <button onClick={() => setOpen(false)} className='w-full border rounded-md btn btn-light'>
                  Đóng
                </button>
                <button onClick={handleFilterPrice} className='w-full rounded-md btn btn-danger'>
                  Xác nhận
                </button>
              </div>
            </div>
          }
          title={null}
        >
          <span
            className={classNames(
              'text-xs bg-gray-100 border inline-flex items-center gap-x-1 border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
              {
                ' border-primary text-primary bg-red-50': price[0] !== 0 || price[1] !== 0
              }
            )}
          >
            <Ticket size={18} strokeWidth={2} />
            Giá{price[1] !== 0 ? ` từ: ${formatPrice(price[0])} - ${formatPrice(price[1])}` : ''}
          </span>
        </Popover>
        {price[0] !== 0 || price[1] !== 0 ? (
          <span
            onClick={() => setPrice([0, 0])}
            className={classNames(
              'text-xs bg-gray-100 border inline-flex items-center gap-x-1 border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
              {
                ' border-primary text-primary bg-red-50': price[0] !== 0 || price[1] !== 0
              }
            )}
          >
            <Ticket size={18} strokeWidth={2} />
            Bỏ lọc
          </span>
        ) : null}
      </div>

      <div className='mt-4 text-lg font-semibold text-gray-800 font-roboto'>Sắp xếp theo</div>
      <div className='flex gap-x-2.5 transition-all my-4'>
        <span
          onClick={() => setSortType('all')}
          className={classNames(
            'text-xs bg-gray-100 border border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
            {
              ' border-primary text-primary bg-red-50': sortType == 'all'
            }
          )}
        >
          Tất cả
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
      {variants?.pages[0].totalItems === 0 && (
        <div className='flex items-center justify-center w-full py-20 text-center'>
          <Empty description='Không có sản phẩm nào.' />
        </div>
      )}

      <div className='grid gap-2.5 grid-cols-2 min-[610px]:grid-cols-3 min-[940px]:grid-cols-4 min-[1182px]:grid-cols-5'>
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
        {(isLoading || isFetchingNextPage) && [...Array(10)].map((_, index) => <SkeletonProductCard key={index} />)}
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
          <div className='flex items-center justify-center py-10'>
            <Spin size='large' />
          </div>
        ) : (
          <CarouselProduct autoPlay={false} dataSource={pros || []} />
        )}
      </div>
    </div>
  )
}

export default CategoryPage
