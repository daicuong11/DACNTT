import { Carousel } from 'antd'
import { listBanner } from '../../../assets/images'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { CarouselRef } from 'antd/es/carousel'
import SwiperSlideItem from './SwiperSlideItem'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CarouselBanner = () => {
  const [slideNumber, setSlideNumber] = useState<number>(0)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const carouselRef = useRef<CarouselRef>(null)
  const swiperRef = useRef<SwiperRef>(null)

  const onChange = (slideNumber: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(slideNumber)
      setCurrentSlide(slideNumber)
    }
    setSlideNumber(slideNumber)
  }

  const handleSwiperClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index)
      setCurrentSlide(index)
    }
    setIsAutoPlay(false)
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='relative w-full group'>
        <Carousel
          ref={carouselRef}
          draggable
          initialSlide={0}
          afterChange={onChange}
          autoplay={isAutoPlay}
          dots={false}
        >
          {listBanner.map((item, index) => (
            <Link to={item.queryUrl + item.id} key={index}>
              <img className='object-center h-[268px] w-full' src={item.imageUrl} alt={item.title} />
            </Link>
          ))}
        </Carousel>

        {slideNumber != 0 && (
          <button
            onClick={() => {
              carouselRef.current?.prev()
            }}
            className={classNames(
              'absolute -translate-y-1/2 z-20 py-1 left-0 bg-white invisible shadow-all shadow-slate-900/20 rounded-r-full bg-opacity-40 transition-all top-1/2 text-black/40',
              ' hover:bg-opacity-60 group-hover:visible'
            )}
          >
            <ChevronLeft size={32} strokeWidth={1.6} />
          </button>
        )}
        {slideNumber != listBanner.length - 1 && (
          <button
            onClick={() => {
              carouselRef.current?.next()
            }}
            className={classNames(
              'absolute z-30 -translate-y-1/2 py-1 right-0 bg-white shadow-all invisible shadow-slate-400 rounded-l-full bg-opacity-40 transition-all top-1/2 text-black/40',
              ' hover:bg-opacity-60 group-hover:visible'
            )}
          >
            <ChevronRight size={32} strokeWidth={1.6} />
          </button>
        )}
      </div>

      <div className='h-full'>
        <Swiper
          ref={swiperRef}
          initialSlide={0}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={0}
          freeMode={true}
          className='h-full mySwiper rounded-b-xl'
          breakpoints={{
            0: {
              slidesPerView: 3
            },
            640: {
              slidesPerView: 4
            },
            910: {
              slidesPerView: 5
            }
          }}
        >
          {listBanner.map((item, index) => (
            <SwiperSlide key={index} className={classNames('h-full')} onClick={() => handleSwiperClick(index)}>
              <SwiperSlideItem active={currentSlide === index} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CarouselBanner
