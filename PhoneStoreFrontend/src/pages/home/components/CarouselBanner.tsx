import { Carousel } from 'antd'
import { listBanner } from '../../../assets/images'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

// Import required modules for Swiper
import 'swiper/swiper-bundle.css'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { CarouselRef } from 'antd/es/carousel'
import SwiperSlideItem from './SwiperSlideItem'
import { Link } from 'react-router-dom'

const CarouselBanner = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const carouselRef = useRef<CarouselRef>(null)
  const swiperRef = useRef<SwiperRef>(null)

  const onChange = (slideNumber: number) => {
    setCurrentSlide(slideNumber)
  }

  const handleSwiperClick = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(currentSlide)
    }
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(currentSlide)
    }
  }, [currentSlide])

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='w-full'>
        <Carousel
          ref={carouselRef}
          draggable
          arrows
          initialSlide={currentSlide}
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
      </div>

      <div className='h-full'>
        <Swiper
          ref={swiperRef}
          initialSlide={currentSlide}
          slidesPerView={5}
          slidesPerGroup={1}
          spaceBetween={0}
          freeMode={true}
          className='h-full mySwiper rounded-b-xl'
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
