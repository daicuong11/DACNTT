import { FC } from 'react'
import { iphone1 } from '../../../assets/images/iphone'
import formatPrice from '../../../utils/formatPrice'
import classNames from 'classnames'
import { ProductVariantType } from '../../../types/product_variant.type'
interface ItemProps {
  productVariant: ProductVariantType
  className?: string
}
const Item: FC<ItemProps> = ({ productVariant, className }) => {
  return (
    <div className={classNames('w-full p-2 rounded-lg bg-white', className)}>
      <div className='flex gap-x-4'>
        <div className='w-[100px] h-[100px] flex-shrink-0'>
          <img src={iphone1} className='object-contain w-full h-full' />
        </div>
        <div className='flex flex-col w-full gap-y-2'>
          <div className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[16px] font-medium'>
            {productVariant.product.name}
          </div>
          <div className='flex items-end justify-between w-full'>
            <div className='flex items-end gap-x-2'>
              <span className='text-lg font-medium leading-none text-primary'>{formatPrice(productVariant.price)}</span>
              <span className='font-medium text-[#707070] text-sm leading-none line-through'>
                {formatPrice(productVariant.price)}
              </span>
            </div>
            <div className='flex gap-x-2 '>
              <div className='font-medium leading-none text-slate-700'>Số lượng:</div>
              <span className='font-medium leading-none text-primary'>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
