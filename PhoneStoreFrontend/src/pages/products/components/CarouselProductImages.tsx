import { Carousel, Image } from 'antd'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { CarouselRef } from 'antd/es/carousel'
import listIphoneImage from '../../../assets/images/iphone'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import getPreviewNumber from '../../../utils/getPreviewNumber'
import { useElementWidth } from '../../../hooks'

const CarouselProductImages = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const carouselRef = useRef<CarouselRef>(null)
  const swiperRef = useRef<SwiperRef>(null)

  const [swiperContainerRef, containerWidth] = useElementWidth()

  const onChange = (slideNumber: number) => {
    if (swiperRef.current && currentSlide == 0) {
      swiperRef.current?.swiper.slideReset()
    } else if (swiperRef.current && getPreviewNumber(containerWidth) < currentSlide + 2) {
      swiperRef.current.swiper.slideNext()
    }
    setCurrentSlide(slideNumber)
  }

  const handleSwiperClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index)
      setCurrentSlide(index)
    }
  }

  console.log('currentSlide', currentSlide)
  console.log('getPreviewNumber', getPreviewNumber(containerWidth))

  return (
    <div className='flex flex-col w-full h-full gap-2.5'>
      <div className='w-full h-[400px] border border-gray-400 rounded-xl overflow-hidden relative group'>
        <Image.PreviewGroup>
          <Carousel
            ref={carouselRef}
            infinite={false}
            draggable
            initialSlide={0}
            afterChange={onChange}
            dots={false}
            className=''
          >
            <div className='w-full h-[400px] pb-[1px] rounded-xl'>
              <Image
                preview={{ maskClassName: '!hidden' }}
                width={'100%'}
                height={'100%'}
                className='object-contain cursor-pointer rounded-xl'
                src={listIphoneImage[0].img}
              />
            </div>
            {listIphoneImage.map((item, index) => (
              <div className='w-full h-[400px] pb-[1px] rounded-xl' key={index}>
                <Image
                  preview={{ maskClassName: '!hidden' }}
                  width={'100%'}
                  height={'100%'}
                  className='object-contain cursor-pointer rounded-xl'
                  src={item.img}
                />
              </div>
            ))}
          </Carousel>
        </Image.PreviewGroup>

        {currentSlide != 0 && (
          <button
            onClick={() => {
              carouselRef.current?.prev()
            }}
            className={classNames(
              'absolute z-20 -translate-y-1/2 py-1 left-0.5 bg-gray-50 invisible shadow-all shadow-slate-900/20 rounded-r-full bg-opacity-60 transition-all top-1/2 text-black/40',
              'hover:text-text hover:bg-gray-100 hover:bg-opacity-60 group-hover:visible'
            )}
          >
            <ChevronLeft size={32} strokeWidth={1.6} />
          </button>
        )}
        {currentSlide != listIphoneImage.length && (
          <button
            onClick={() => {
              carouselRef.current?.next()
            }}
            className={classNames(
              'absolute z-20 -translate-y-1/2 py-1 right-0.5 bg-gray-50 shadow-all invisible shadow-slate-400 rounded-l-full bg-opacity-60 transition-all top-1/2 text-black/40',
              'hover:text-text hover:bg-gray-100 hover:bg-opacity-60 group-hover:visible'
            )}
          >
            <ChevronRight size={32} strokeWidth={1.6} />
          </button>
        )}
      </div>

      <div ref={swiperContainerRef} className='h-[50px]'>
        <Swiper
          ref={swiperRef}
          initialSlide={0}
          draggable
          slidesPerView={getPreviewNumber(containerWidth) || listIphoneImage.length + 1}
          spaceBetween={10}
          freeMode={true}
          className='h-full mySwiper'
        >
          <SwiperSlide
            className={classNames('!w-[50px] !h-[50px] rounded-lg cursor-pointer', {
              'border border-slate-300': currentSlide !== 0,
              'border-primary border': currentSlide === 0
            })}
            onClick={() => handleSwiperClick(0)}
          >
            <img
              className='object-contain w-auto h-full rounded-lg'
              src={listIphoneImage[0].img}
              alt={listIphoneImage[0].name}
            />
          </SwiperSlide>
          {listIphoneImage.map((item, index) => (
            <SwiperSlide
              key={index + 1}
              className={classNames('!w-[50px] !h-[50px] rounded-lg cursor-pointer', {
                'border border-slate-300': currentSlide !== index + 1,
                'border-primary border': currentSlide === index + 1
              })}
              onClick={() => handleSwiperClick(index + 1)}
            >
              <img className='object-contain w-auto h-full rounded-lg' src={item.img} alt={item.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CarouselProductImages
