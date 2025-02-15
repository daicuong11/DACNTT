import { FC, HTMLAttributes, useState } from 'react'
import { ConfigProvider, Flex, Rate, Tag } from 'antd'
import FavoriteButton from '../buttons/FavoriteButton'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getProductRoute } from '../../utils/getProductRoute'
import { getRating } from '../../utils/getRating'
import formatPrice from '../../utils/formatPrice'
import { getMainImage } from '@/utils/getMainImage'
import { getProductFullName } from '@/utils/getProductFullName'
import { ProductType } from '@/types/product.type'
import getPriceAfterDiscount from '@/utils/getPriceAfterDiscount'
import { iphone1 } from '@/assets/images/iphone'

interface ProductCardType extends HTMLAttributes<HTMLDivElement> {
  product: ProductType
}

const ProductCard: FC<ProductCardType> = ({ product, ...props }) => {
  const navigate = useNavigate()
  const productVariant = product.productVariants[0]

  const handleProductClick = (product: ProductType) => {
    navigate(getProductRoute(product))
  }
  const findSizeScreen = productVariant.productSpecifications.find(
    (spec) => spec.key.trim().toLowerCase() === 'Kích thước màn hình'.trim().toLowerCase()
  )?.value
  const findRAM = productVariant.productSpecifications.find(
    (spec) => spec.key.trim().toLowerCase() === 'Dung lượng RAM'.trim().toLowerCase()
  )?.value
  const findStorage =
    product.category.name === 'Laptop'
      ? productVariant.productSpecifications
          .find((spec) => spec.key.trim().toLowerCase() === 'Ổ cứng'.trim().toLowerCase())
          ?.value.split(' ')[0]
      : productVariant.productSpecifications.find(
          (spec) => spec.key.trim().toLowerCase() === 'Bộ nhớ trong'.trim().toLowerCase()
        )?.value

  const mainImage = getMainImage(productVariant.productImages)
  const imageUrl = mainImage ? mainImage.imageUrl : iphone1

  return (
    <div
      {...props}
      onClick={() => handleProductClick(product)}
      className='relative h-[392px] md:min-w-[224px] cursor-pointer rounded-xl bg-white p-[10px] flex flex-col drop-shadow-md shadow shadow-gray-300 border border-gray-100'
    >
      <div className='flex-[5] flex items-center justify-center'>
        <img src={imageUrl} alt={getProductFullName(product)} className='w-[160px] h-[160px] object-contain mt-3' />
      </div>
      <div className='flex-[6] flex flex-col'>
        <div className='flex flex-col gap-3 mt-3.5'>
          <h2 className='h-[60px] text-xs sm:text-sm font-bold text-black/80 line-clamp-3'>
            {getProductFullName(product)}
          </h2>
          <div className='flex items-end gap-1 font-sans text-sm font-bold md:text-base'>
            <span className='leading-none text-primary'>
              {formatPrice(getPriceAfterDiscount(productVariant.price, productVariant.discount?.percentage || 0))}
            </span>
            {productVariant.discount && productVariant.discount?.percentage > 0 && (
              <span className='text-sm leading-none line-through text-slate-600'>
                {formatPrice(productVariant.price)}
              </span>
            )}
          </div>
          <Flex className='mt-2' gap='4px 0' wrap>
            {findSizeScreen && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {findSizeScreen}
              </Tag>
            )}
            {findRAM && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {findRAM}
              </Tag>
            )}
            {findStorage && (
              <Tag color='default' className='text-[10px] md:text-[12px] text-gray-500'>
                {findStorage}
              </Tag>
            )}
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
      {productVariant.discount && productVariant.discount?.percentage > 0 && (
        <div className='absolute top-0 flex items-center justify-center w-20 py-1.5 rounded-r-full -left-1 bg-primary'>
          <p className='text-xs font-bold text-white'>Giảm {productVariant.discount?.percentage}%</p>
          <div className='absolute left-0 flex items-center justify-center w-1 h-1 rounded-b-full -bottom-1 bg-[#c2181a]'></div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
