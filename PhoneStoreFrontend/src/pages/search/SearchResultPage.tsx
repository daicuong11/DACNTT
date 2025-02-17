import { ProductCard } from '@/components'
import { useQueryString } from '@/hooks'
import useSetDocTitle from '@/hooks/useSetDocTitle'
import classNames from 'classnames'
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ChevronDown, Sparkles } from 'lucide-react'
import React, { FC, useState } from 'react'
import CarouselProduct from '../home/components/CarouselProduct'
import { useGetAllProducts } from '@/hooks/querys/product.query'

const sortTypes = ['relative', 'price-asc', 'price-desc']

interface SearchResultPageProps {}

const SearchResultPage: FC<SearchResultPageProps> = () => {
  const [sortType, setSortType] = useState(sortTypes[0])
  const queryString = useQueryString()
  useSetDocTitle(`Kết quả tìm kiếm cho: ${queryString.q}`)

  const { data: products, isLoading } = useGetAllProducts()

  return (
    <div className='py-4 mb-10'>
      <div className='text-sm font-medium text-center text-gray-600 font-roboto'>
        Tìm thấy <span className='font-semibold text-gray-700'>{products ? products.length : 0}</span> sản phẩm cho từ
        khóa '<span className='font-semibold text-gray-700'>{queryString.q}</span>'
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
          onClick={() => setSortType('price-desc')}
          className={classNames(
            'text-xs bg-gray-100 border flex items-center gap-x-1 border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
            {
              ' border-primary text-primary bg-red-50': sortType == 'price-desc'
            }
          )}
        >
          <ArrowDownWideNarrow size={18} strokeWidth={2} />
          Giá cao
        </span>
        <span
          onClick={() => setSortType('price-asc')}
          className={classNames(
            'text-xs bg-gray-100 border flex items-center gap-x-1 border-gray-100 py-1.5 cursor-pointer px-3 rounded-lg box-border',
            {
              ' border-primary text-primary bg-red-50': sortType == 'price-asc'
            }
          )}
        >
          <ArrowDownNarrowWide size={18} strokeWidth={2} />
          Giá thấp
        </span>
      </div>
      <div className='grid gap-2.5 grid-cols-5'>
        {products && products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      {products && products.length !== 0 && (
        <div className='mt-2.5'>
          <button className='items-center font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'>
            Xem thêm
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

        <CarouselProduct autoPlay={false} dataSource={products || []} />
      </div>
    </div>
  )
}

export default SearchResultPage
