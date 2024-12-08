import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC, useRef } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import ProductCard from '../../../components/items/ProductCard'
import { Autoplay } from 'swiper/modules'
import { ProductType } from '../../../types/product.type'

interface CarouselProductType {
  autoPlay?: boolean
  dataSource: ProductType[]
}
const CarouselProduct: FC<CarouselProductType> = ({ autoPlay = true, dataSource }) => {
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <div className='relative w-full mt-6 group'>
      <Swiper
        ref={swiperRef}
        initialSlide={0}
        autoplay={autoPlay}
        draggable
        slidesPerView={5}
        slidesPerGroup={1}
        spaceBetween={10}
        freeMode={true}
        modules={[Autoplay]}
        className='mySwiper'
      >
        {dataSource.map((item, index) => (
          <SwiperSlide key={index} className={classNames('h-full')}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {!swiperRef.current?.swiper.isBeginning && (
        <button
          onClick={() => {
            swiperRef.current?.swiper.slidePrev()
          }}
          className={classNames(
            'absolute z-20 -translate-y-1/2 py-1 -left-2 bg-gray-50 shadow-all shadow-slate-900/20 rounded-r-full bg-opacity-60 transition-all top-1/2 text-black/40',
            'hover:text-text hover:bg-gray-100 hover:bg-opacity-60 scale-75 group-hover:scale-100'
          )}
        >
          <ChevronLeft size={32} strokeWidth={1.6} />
        </button>
      )}
      {!swiperRef.current?.swiper.isEnd && (
        <button
          onClick={() => {
            swiperRef.current?.swiper.slideNext()
          }}
          className={classNames(
            'absolute z-20 -translate-y-1/2 py-1 -right-2 bg-gray-50 shadow-all shadow-slate-400 rounded-l-full bg-opacity-60 transition-all top-1/2 text-black/40',
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
