import { FC, HTMLAttributes, useState } from 'react'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import formatPrice from '../../utils/formatPrice'
import { ProductVariantType, VariantBasicResponse } from '../../types/product_variant.type'
import { iphone1 } from '@/assets/images/iphone'
import { useGetProductVariantById } from '@/hooks/querys/product_variant.query'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { SkeletonProductCard } from '../sekeletons'

interface ProductCardSimpleType extends HTMLAttributes<HTMLDivElement> {
  productVariantId: number
}

const ProductCardSimple: FC<ProductCardSimpleType> = ({ productVariantId, ...props }) => {
  const navigate = useNavigate()
  const { data: productVariant, isLoading } = useGetProductVariantById(productVariantId)


  const handleProductClick = () => {
    if (productVariant) {
      navigate(getProductRoute(productVariant.category.name, productVariant.slug))
    }
  }

  return isLoading ? (
    <SkeletonProductCard />
  ) : (
    <div
      {...props}
      onClick={() => handleProductClick()}
      className='h-[328px] min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md border border-gray-100'
    >
      <div className='flex-[5] flex items-center justify-center'>
        <img
          src={productVariant?.imageUrl}
          alt={productVariant?.fullNameVariant}
          className='w-[160px] h-[160px] object-contain mt-3'
        />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-2'>
          <h2 className='h-[60px] text-sm font-bold text-black/80 line-clamp-3'>{productVariant?.fullNameVariant}</h2>
          <div className='flex items-end gap-1 font-sans font-bold'>
            <span className='leading-none text-primary'>{formatPrice(productVariant?.price || 0)}</span>
            <span className='text-sm leading-none line-through text-slate-600'>
              {formatPrice(getPriceAfterDiscount(productVariant?.price || 0, productVariant?.discountPercentage || 0))}
            </span>
          </div>
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
                <Rate value={5} allowHalf disabled className='text-base' />
              </ConfigProvider>
            </div>
            <div className='text-xs text-gray-500'>17 đánh giá</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSimple
