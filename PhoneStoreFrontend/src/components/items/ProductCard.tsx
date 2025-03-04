import { FC, HTMLAttributes, useMemo, useState } from 'react'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import FavoriteButton from '../buttons/FavoriteButton'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import formatPrice from '../../utils/formatPrice'
import { getProductFullName } from '@/utils/getProductFullName'
import { ProductResponse } from '@/types/product.type'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { useQueryClient } from '@tanstack/react-query'
import { useAddProductToWishlist, useGetMyWishlist } from '@/hooks/querys/wishlist.query'
import { useAppSelector, useModal } from '@/hooks'
import LoginOfRegisterModal from '../modals/LoginOrRegisterModal'
import { WishListRequestType } from '@/types/wishlist.type'
import { toast } from 'react-toastify'

interface ProductCardType extends HTMLAttributes<HTMLDivElement> {
  product: ProductResponse
}

const ProductCard: FC<ProductCardType> = ({ product, ...props }) => {
  const queryClient = useQueryClient()
  const currentUser = useAppSelector((state) => state.auth.user)
  const { data: wishlist } = useGetMyWishlist(currentUser?.id || 0)
  const { mutate: addProductToWishlist, isPending } = useAddProductToWishlist()
  const navigate = useNavigate()
  const variantFirst = product.productVariants[0]
  const { isOpen, closeModal, openModal } = useModal()

  const isLove = useMemo(() => {
    if (wishlist) {
      return wishlist?.some((item) => item.productVariantId === variantFirst.variantId)
    }
    return false
  }, [wishlist, variantFirst.variantId])

  const handleProductClick = (product: ProductResponse) => {
    navigate(getProductRoute(product.category.name, product.brand.name, variantFirst.slug))
  }

  const handleLoveClick = async () => {
    if (!currentUser) {
      openModal()
    } else {
      const addToWishlistReq: WishListRequestType = {
        userId: currentUser.id,
        productVariantId: variantFirst.variantId
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

  return (
    <div
      {...props}
      onClick={() => handleProductClick(product)}
      className='relative h-[392px] md:min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md shadow shadow-gray-300 border border-gray-100'
    >
      <LoginOfRegisterModal isOpen={isOpen} onClose={closeModal} />
      <div className='flex-[5] flex items-center justify-center'>
        <img
          src={variantFirst.imageUrl}
          alt={getProductFullName(product)}
          className='w-[160px] h-[160px] object-contain mt-3'
        />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-3.5'>
          <h2 className='h-[60px] text-xs sm:text-sm font-bold text-black/80 line-clamp-3'>
            {variantFirst.variantName}
          </h2>
          <div className='flex items-end gap-1.5 font-sans text-sm font-bold md:text-base'>
            <span className='leading-none text-primary'>
              {formatPrice(getPriceAfterDiscount(variantFirst.price, variantFirst.discountPercentage || 0))}
            </span>
            {variantFirst.discountPercentage > 0 && (
              <span className='!leading-none line-through text-xs md:text-sm text-slate-600'>
                {formatPrice(variantFirst.price)}
              </span>
            )}
          </div>
          <Flex className='mt-2' gap='4px 0' wrap>
            {variantFirst.screenSize && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {variantFirst.screenSize}
              </Tag>
            )}
            {variantFirst.ram && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {variantFirst.ram}
              </Tag>
            )}
            {variantFirst.storage && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {variantFirst.storage.length > 10 ? variantFirst.storage.split('GB')[0] + 'GB' : variantFirst.storage}
              </Tag>
            )}
          </Flex>
        </div>
        <div className='flex flex-col justify-end flex-1 mt-2'>
          <div className='flex items-center justify-between'>
            <div className={classNames({ invisible: false })}>
              <ConfigProvider
                theme={{
                  token: {
                    marginXS: 0
                  }
                }}
              >
                <Rate value={4.5} allowHalf disabled className='text-base' />
              </ConfigProvider>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation()
                handleLoveClick()
              }}
              className='flex items-center'
            >
              <span className='text-xs text-gray-500'>Yêu thích</span>
              <FavoriteButton isLove={isLove} />
            </div>
          </div>
        </div>
      </div>
      {variantFirst.discountPercentage > 0 && (
        <div className='absolute top-0 flex items-center justify-center w-20 py-1 md:py-1.5 rounded-r-full -left-1 bg-primary'>
          <p className='text-[10px] md:text-xs font-bold text-white'>Giảm {variantFirst.discountPercentage}%</p>
          <div className='absolute left-0 flex items-center justify-center w-1 h-1 rounded-b-full -bottom-1 bg-[#c2181a]'></div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
