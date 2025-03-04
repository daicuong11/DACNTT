import { Carousel, Image } from 'antd'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import classNames from 'classnames'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { CarouselRef } from 'antd/es/carousel'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import getPreviewNumber from '../../../utils/getPreviewNumber'
import { useAppSelector, useElementWidth, useModal } from '../../../hooks'
import { FavoriteButton } from '../../../components'
import { ProductImageType } from '@/types/product_image.type'
import { useGetSpecificationIsSpecialByVariantId } from '@/hooks/querys/spec_group.query'
import { SpecificationType } from '@/types/specification.type'
import { useQueryClient } from '@tanstack/react-query'
import { useAddProductToWishlist, useGetMyWishlist } from '@/hooks/querys/wishlist.query'
import { toast } from 'react-toastify'
import { WishListRequestType } from '@/types/wishlist.type'
import LoginOfRegisterModal from '@/components/modals/LoginOrRegisterModal'

const getListFeatures = (specifications: SpecificationType[]): string[] => {
  return specifications.map((spec) => {
    if (spec.key === 'Kích thước màn hình') {
      return `Màn hình ${spec.value} lớn hơn có viền mỏng hơn, đem đến cảm giác tuyệt vời khi cầm
                      trên tay.`
    } else if (spec.key === 'Độ phân giải màn hình') {
      return `Độ phân giải cao ${spec.value}, hỗ trợ hiển thị màu sắc sống động.`
    } else if (spec.key === 'Tần số quét') {
      return `Tần số quét ${spec.value} cho trải nghiệm mượt mà.`
    } else if (spec.key === 'Dung lượng RAM') {
      return `RAM ${spec.value}, đảm bảo chạy đa nhiệm mượt mà.`
    } else if (spec.key === 'Bộ nhớ trong') {
      return `Bộ nhớ trong (ROM) ${spec.value}, hỗ trợ lưu trữ lớn, nhiều máy còn có khe cắm thẻ nhớ mở rộng.`
    } else if (spec.key === 'Chipset') {
      return `Trang bị chipset mạnh mẽ ${spec.value} giúp trải nghiệm chơi game, xem phim mượt mà.`
    } else if (spec.key === 'Hệ điều hành') {
      return `Chạy ${spec.value}, được cập nhật thường xuyên để nâng cao bảo mật và tính năng mới.`
    }
    return ''
  })
}

interface CarouselProductImagesProps {
  dataSources: ProductImageType[]
  productVariantId: number
}

const CarouselProductImages: FC<CarouselProductImagesProps> = ({ dataSources, productVariantId }) => {
  const { data: specs } = useGetSpecificationIsSpecialByVariantId(productVariantId)
  const queryClient = useQueryClient()
  const currentUser = useAppSelector((state) => state.auth.user)
  const { data: wishlist } = useGetMyWishlist(currentUser?.id || 0)
  const { mutate: addProductToWishlist, isPending } = useAddProductToWishlist()

  const { isOpen, closeModal, openModal } = useModal()

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const carouselRef = useRef<CarouselRef>(null)
  const swiperRef = useRef<SwiperRef>(null)

  const isLove = useMemo(() => {
    if (wishlist) {
      return wishlist?.some((item) => item.productVariantId === productVariantId)
    }
    return false
  }, [wishlist, productVariantId])

  const [swiperContainerRef, containerWidth] = useElementWidth()

  const handleLoveClick = async () => {
    if (!currentUser) {
      openModal()
    } else {
      const addToWishlistReq: WishListRequestType = {
        userId: currentUser.id,
        productVariantId: productVariantId
      }
      addProductToWishlist(addToWishlistReq, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['getMyWishlist', currentUser.id]
          })
          if (data) {
            toast('Đã thêm vào danh sách yêu thích')
          } else {
            toast('Đã xóa khỏi danh sách yêu thích')
          }
        },
        onError: (error) => {
          toast.error('Thêm vào danh sách yêu thích thất bại')
        }
      })
    }
  }

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
      <LoginOfRegisterModal isOpen={isOpen} onClose={closeModal} />

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
                      src={dataSources[0]?.imageUrl || ''}
                    />
                  </div>
                </div>
                <div className='flex-[1.5] text-white py-16 cursor-default'>
                  <div className='text-xl font-bold text-center uppercase'>Tính năng nổi bật</div>
                  <ul className='pl-5 max-h-[200px] list-disc overflow-y-auto scrollbar-hide mt-2 pr-2 font-semibold space-y-2'>
                    {specs && getListFeatures(specs).map((item, index) => item && <li key={index}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            {dataSources.slice(1).map((item, index) => (
              <div className='w-full h-[400px] pb-[1px] rounded-xl' key={index}>
                <Image
                  preview={{ maskClassName: '!hidden' }}
                  width={'100%'}
                  height={'100%'}
                  className='object-contain cursor-pointer rounded-xl'
                  src={item.imageUrl}
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
        {currentSlide != dataSources.length && (
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
        <FavoriteButton onClick={handleLoveClick} isLove={isLove} className='absolute top-1 left-1' />
      </div>

      <div ref={swiperContainerRef} className='h-[50px]'>
        <Swiper
          ref={swiperRef}
          initialSlide={0}
          draggable
          slidesPerView={getPreviewNumber(containerWidth) || dataSources.length + 1}
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
          {dataSources.slice(1).map((item, index) => (
            <SwiperSlide
              key={index + 1}
              className={classNames('!w-[50px] !h-[50px] rounded-lg cursor-pointer', {
                'border border-slate-300': currentSlide !== index + 1,
                'border-primary border': currentSlide === index + 1
              })}
              onClick={() => handleSwiperClick(index + 1)}
            >
              <img className='object-contain w-auto h-full rounded-lg' src={item.imageUrl} alt={item.imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CarouselProductImages
