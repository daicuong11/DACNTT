import { Carousel, Image } from 'antd'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { CarouselRef } from 'antd/es/carousel'
import listIphoneImage from '../../../assets/images/iphone'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import getPreviewNumber from '../../../utils/getPreviewNumber'
import { useElementWidth } from '../../../hooks'
import { FavoriteButton } from '../../../components'

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

  return (
    <div className='flex flex-col w-full gap-2.5'>
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
            <div className='w-full h-[400px] p-2.5 rounded-lg bg-gradient-to-r-from-primary'>
              <div className='flex w-full h-full gap-2.5'>
                <div className='flex items-center justify-center flex-1'>
                  <div className='py-2 bg-white rounded-xl'>
                    <Image
                      preview={{ maskClassName: '!hidden' }}
                      width={'100%'}
                      className='object-contain cursor-pointer rounded-xl'
                      src={listIphoneImage[0].img}
                    />
                  </div>
                </div>
                <div className='flex-[1.5] text-white py-16 cursor-default'>
                  <div className='text-xl font-bold text-center uppercase'>Tính năng nổi bật</div>
                  <ul className='pl-5 max-h-[200px] list-disc overflow-y-auto scrollbar-hide mt-2 pr-2 font-semibold'>
                    <li>
                      Màn hình Super Retina XDR 6,9 inch lớn hơn có viền mỏng hơn, đem đến cảm giác tuyệt vời khi cầm
                      trên tay.
                    </li>
                    <li>
                      Điều khiển Camera - Chỉ cần trượt ngón tay để điều chỉnh camera giúp chụp ảnh hoặc quay video đẹp
                      hoàn hảo và siêu nhanh.
                    </li>
                    <li>
                      iPhone 16 Pro Max có thiết kế titan cấp 5 với lớp hoàn thiện mới, tinh tế được xử lý bề mặt vi
                      điểm.
                    </li>
                    <li>
                      iPhone 16 Pro Max được cài đặt sẵn hệ điều hành iOS 18, cho giao diện trực quan, dễ sử dụng và
                      nhiều tính năng hữu ích.
                    </li>
                    <li>
                      iPhone 16 Pro Max được cài đặt sẵn hệ điều hành iOS 18, cho giao diện trực quan, dễ sử dụng và
                      nhiều tính năng hữu ích.
                    </li>
                    <li>
                      iPhone 16 Pro Max được cài đặt sẵn hệ điều hành iOS 18, cho giao diện trực quan, dễ sử dụng và
                      nhiều tính năng hữu ích.
                    </li>
                    <li>
                      iPhone 16 Pro Max được cài đặt sẵn hệ điều hành iOS 18, cho giao diện trực quan, dễ sử dụng và
                      nhiều tính năng hữu ích.
                    </li>
                  </ul>
                </div>
              </div>
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
              'absolute z-20 -translate-y-1/2 py-1 left-0 bg-white invisible shadow-all shadow-slate-900/20 rounded-r-full bg-opacity-40 transition-all top-1/2 text-black/40',
              'hover:text-text hover:bg-black/20 hover:bg-opacity-60 group-hover:visible'
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
              'absolute z-20 -translate-y-1/2 py-1 right-0 bg-white shadow-all invisible shadow-slate-400 rounded-l-full bg-opacity-40 transition-all top-1/2 text-black/40',
              'hover:text-text hover:bg-black/20 hover:bg-opacity-60 group-hover:visible'
            )}
          >
            <ChevronRight size={32} strokeWidth={1.6} />
          </button>
        )}
        <FavoriteButton className='absolute top-1 left-1' />
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
            <div className='flex flex-col items-center pt-0.5 justify-between'>
              <span>
                <Star size={20} strokeWidth={1.6} />
              </span>
              <span className='text-[10px] font-semibold text-gray-500 text-center leading-[12px]'>
                Tính năng nổi bật
              </span>
            </div>
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
