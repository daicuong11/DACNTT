import { FC, HTMLAttributes, useState } from 'react'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import formatPrice from '../../utils/formatPrice'
import { ProductVariantType } from '../../types/product_variant.type'
import { iphone1 } from '@/assets/images/iphone'

interface ProductCardSimpleType extends HTMLAttributes<HTMLDivElement> {
  productVariant: ProductVariantType
}

const ProductCardSimple: FC<ProductCardSimpleType> = ({ productVariant, ...props }) => {
  const navigate = useNavigate()

  const handleProductClick = (variant: ProductVariantType) => {
    navigate(getProductRoute(variant.product.category.name, variant.slug))
  }

  return (
    <div
      {...props}
      onClick={() => handleProductClick(productVariant)}
      className='h-[328px] min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md border border-gray-100'
    >
      <div className='flex-[5] flex items-center justify-center'>
        <img src={iphone1} alt={productVariant.product.name} className='w-[160px] h-[160px] object-contain mt-3' />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-2'>
          <h2 className='h-[60px] text-sm font-bold text-black/80 line-clamp-3'>{productVariant.product.name}</h2>
          <div className='flex items-end gap-1 font-sans font-bold'>
            <span className='leading-none text-primary'>{formatPrice(productVariant.price)}</span>
            <span className='text-sm leading-none line-through text-slate-600'>
              {formatPrice(productVariant.price)}
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
