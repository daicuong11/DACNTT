import { ProductCard } from '@/components'
import { exampleProductVariant } from '@/datas'
import { useQueryString } from '@/hooks'
import useSetDocTitle from '@/hooks/useSetDocTitle'
import classNames from 'classnames'
import { ChevronDown, Sparkles } from 'lucide-react'
import React, { FC, useState } from 'react'
import CarouselProduct from '../home/components/CarouselProduct'

const sortTypes = ['relative', 'price-asc', 'price-desc']

interface SearchResultPageProps {}

const SearchResultPage: FC<SearchResultPageProps> = () => {
  const [sortType, setSortType] = useState(sortTypes[0])
  const queryString = useQueryString()
  useSetDocTitle(`Kết quả tìm kiếm cho: ${queryString.q}`)

  return (
    <div className='py-4 mb-10 max-w-[1200px] mx-auto'>
      <div className='text-sm font-medium text-center text-gray-600 font-roboto'>
        Tìm thấy <span className='font-semibold text-gray-700'>10</span> sản phẩm cho từ khóa '
        <span className='font-semibold text-gray-700'>{queryString.q}</span>'
      </div>
      <div className='mt-3 text-lg font-semibold text-gray-800 font-roboto'>Sắp xếp theo</div>
      <div className='flex my-4'>
        <span
          className={classNames('text-xs border py-1.5 cursor-pointer px-3 rounded-lg', {
            ' border-primary text-primary bg-red-50': sortType == 'relative'
          })}
        >
          Liên quan
        </span>
      </div>
      <div className='grid gap-2.5 grid-cols-5'>
        {exampleProductVariant.slice(10).map((productVariant, index) => (
          <ProductCard key={index} productVariant={productVariant} />
        ))}
      </div>
      <div className='mt-2.5'>
        <button className='items-center font-roboto mx-auto text-[15px] w-min text-nowrap px-20 font-medium border border-gray-200 shadow-md btn btn-light hover:border-primary hover:text-primary hover:!bg-red-50 drop-shadow-sm'>
          Xem thêm
          <span>
            <ChevronDown size={18} strokeWidth={2} />
          </span>
        </button>
      </div>
      <div className='mt-4 bg-cover bg-gradient-to-br from-indigo-500 via-violet-500 to-teal-400 rounded-xl '>
        <div className='flex items-end p-4 text-white'>
          <span className='mr-2 border-2 border-white rounded-full'>
            <Sparkles size={34} strokeWidth={1.6} />
          </span>
          <span className='text-[24px] font-bold uppercase mr-4'>Sản phẩm nổi bật</span>
        </div>

        <CarouselProduct autoPlay={false} dataSource={exampleProductVariant} />
      </div>
    </div>
  )
}

export default SearchResultPage
