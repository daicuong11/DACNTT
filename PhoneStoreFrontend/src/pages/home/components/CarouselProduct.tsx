import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import ProductCard from '../../../components/items/ProductCard'

import { ProductResponse } from '@/types/product.type'
import { Autoplay, Grid } from 'swiper/modules'

interface CarouselProductType {
  row?: 1 | 2
  autoPlay?: boolean
  dataSource: ProductResponse[]
}

const CarouselProduct: FC<CarouselProductType> = ({ row = 1, autoPlay = true, dataSource }) => {
  const swiperRef = useRef<SwiperRef>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  return (
    <div className='relative w-full group'>
      <Swiper
        ref={swiperRef}
        initialSlide={0}
        autoplay={autoPlay}
        loop={false}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        grid={{ rows: row }}
        slidesPerGroup={1}
        spaceBetween={10}
        freeMode={true}
        modules={[Autoplay, Grid]}
        breakpoints={{
          0: { slidesPerView: 2, grid: { rows: row } },
          713: { slidesPerView: 3, grid: { rows: row } },
          972: { slidesPerView: 4, grid: { rows: row } },
          1220: { slidesPerView: 5, grid: { rows: row } }
        }}
        style={{ padding: '10px' }}
        className={classNames('mySwiper', { 'h-[814px] ': row !== 1 })}
      >
        {dataSource.map((item, index) => (
          <SwiperSlide key={index} className='h-full'>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {currentSlide !== 0 && (
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className={classNames(
            'absolute z-20 -translate-y-1/2 py-1 left-0 bg-gray-50 shadow-all shadow-slate-900/20 rounded-r-full bg-opacity-60 transition-all top-1/2 text-black/40',
            'hover:text-text hover:bg-gray-100 hover:bg-opacity-60 scale-75 group-hover:scale-100'
          )}
        >
          <ChevronLeft size={32} strokeWidth={1.6} />
        </button>
      )}
      {!swiperRef.current?.swiper.isEnd && (
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className={classNames(
            'absolute z-20 -translate-y-1/2 py-1 right-0 bg-gray-50 shadow-all shadow-slate-400 rounded-l-full bg-opacity-60 transition-all top-1/2 text-black/40',
            'hover:text-text hover:bg-gray-100 hover:bg-opacity-60 scale-75 group-hover:scale-100'
          )}
        >
          <ChevronRight size={32} strokeWidth={1.6} />
        </button>
      )}
    </div>
  )
}

export default CarouselProduct
