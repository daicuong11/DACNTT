import { FC, HTMLAttributes } from 'react'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import FavoriteButton from '../buttons/FavoriteButton'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import formatPrice from '../../utils/formatPrice'
import { VariantResponse } from '@/types/product.type'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { ProductVariantResponse } from '@/types/product_variant.type'

interface VariantCardType extends HTMLAttributes<HTMLDivElement> {
  variant: ProductVariantResponse
  category: string
  brand: string
}

const VariantCard: FC<VariantCardType> = ({ variant, category, brand, ...props }) => {
  const navigate = useNavigate()

  const handleProductClick = () => {
    navigate(getProductRoute(category, brand, variant.slug))
  }

  return (
    <div
      {...props}
      onClick={() => handleProductClick()}
      className='relative h-[392px] md:min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md shadow shadow-gray-300 border border-gray-100'
    >
      <div className='flex-[5] flex items-center justify-center'>
        <img src={variant.imageUrl} alt={variant.variantName} className='w-[160px] h-[160px] object-contain mt-3' />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-3.5'>
          <h2 className='h-[60px] text-xs sm:text-sm font-bold text-black/80 line-clamp-3'>{variant.variantName}</h2>
          <div className='flex items-end gap-1 font-sans text-sm font-bold md:text-base'>
            <span className='leading-none text-primary'>
              {formatPrice(getPriceAfterDiscount(variant.price, variant.discountPercentage || 0))}
            </span>
            {variant.discountPercentage > 0 && (
              <span className='text-sm leading-none line-through text-slate-600'>{formatPrice(variant.price)}</span>
            )}
          </div>
          <Flex className='mt-2' gap='4px 0' wrap>
            {variant.screenSize && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {variant.screenSize}
              </Tag>
            )}
            {variant.ram && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {variant.ram}
              </Tag>
            )}
            {variant.storage && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {variant.storage.length > 10 ? variant.storage.split('GB')[0] + 'GB' : variant.storage}
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
            <div onClick={(e) => e.stopPropagation()} className='flex items-center'>
              <span className='text-xs text-gray-500'>Yêu thích</span>
              <FavoriteButton isLove={true} />
            </div>
          </div>
        </div>
      </div>
      {variant.discountPercentage > 0 && (
        <div className='absolute top-0 flex items-center justify-center w-20 py-1.5 rounded-r-full -left-1 bg-primary'>
          <p className='text-xs font-bold text-white'>Giảm {variant.discountPercentage}%</p>
          <div className='absolute left-0 flex items-center justify-center w-1 h-1 rounded-b-full -bottom-1 bg-[#c2181a]'></div>
        </div>
      )}
    </div>
  )
}

export default VariantCard
