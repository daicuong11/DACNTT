import { FC, HTMLAttributes, useState } from 'react'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import FavoriteButton from '../buttons/FavoriteButton'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import { getRating } from '../../utils/getRating'
import formatPrice from '../../utils/formatPrice'
import { ProductVariantType } from '../../types/product_variant.type'
import { iphone1 } from '@/assets/images/iphone'
import { getMainImage } from '@/utils/getMainImage'
import { getProductFullName } from '@/utils/getProductFullName'

interface ProductCardType extends HTMLAttributes<HTMLDivElement> {
  productVariant: ProductVariantType
}

const ProductCard: FC<ProductCardType> = ({ productVariant, ...props }) => {
  const navigate = useNavigate()

  const handleProductClick = (product: ProductVariantType) => {
    navigate(getProductRoute(product))
  }

  if (productVariant.productImages) {
    var mainImage = getMainImage(productVariant.productImages)?.imageUrl
  }

  return (
    <div
      {...props}
      onClick={() => handleProductClick(productVariant)}
      className='relative h-[392px] md:min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md shadow shadow-gray-300 border border-gray-100'
    >
      <div className='flex-[5] flex items-center justify-center'>
        <img
          src={mainImage || iphone1}
          alt={productVariant.product.name}
          className='w-[160px] h-[160px] object-contain mt-3'
        />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-2'>
          <h2 className='h-[60px] text-xs sm:text-sm font-bold text-black/80 line-clamp-3'>
            {getProductFullName(productVariant)}
          </h2>
          <div className='flex items-end gap-1 font-sans font-bold text-sm md:text-base'>
            <span className='leading-none text-primary'>{formatPrice(productVariant.price)}</span>
            <span className='text-sm leading-none line-through text-slate-600'>
              {formatPrice(productVariant.price)}
            </span>
          </div>
          <Flex gap='4px 0' wrap>
            <Tag className='text-[10px] md:text-[12px]' color='green'>
              Free ship
            </Tag>
            <Tag className='text-[10px] md:text-[12px]' color='cyan'>
              Trả góp 0%
            </Tag>
            <Tag className='text-[10px] md:text-[12px]' color='volcano'>
              Đang bán chạy
            </Tag>
            <Tag className='text-[10px] md:text-[12px]' color='purple'>
              Rẻ vô địch
            </Tag>
          </Flex>
        </div>
        <div className='flex flex-col justify-end flex-1 mt-2'>
          <div className='flex items-center justify-between'>
            <div className={classNames({ invisible: getRating(productVariant.productVariantId) === -1 })}>
              <ConfigProvider
                theme={{
                  token: {
                    marginXS: 0
                  }
                }}
              >
                <Rate value={getRating(productVariant.productVariantId)} allowHalf disabled className='text-base' />
              </ConfigProvider>
            </div>
            <div onClick={(e) => e.stopPropagation()} className='flex items-center'>
              <span className='text-xs text-gray-500'>Yêu thích</span>
              <FavoriteButton isLove={true} />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute top-0 flex items-center justify-center w-20 py-1.5 rounded-r-full -left-1 bg-primary'>
        <p className='text-xs font-bold text-white'>Giảm 10%</p>
        <div className='absolute left-0 flex items-center justify-center w-1 h-1 rounded-b-full -bottom-1 bg-[#c2181a]'></div>
      </div>
    </div>
  )
}

export default ProductCard
