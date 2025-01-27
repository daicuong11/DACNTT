import { FC } from 'react'
import { iphone1 } from '../../../assets/images/iphone'
import formatPrice from '../../../utils/formatPrice'
import classNames from 'classnames'
import { CartItemPayloadType } from '../../../types/cart_item.type'
interface ItemProps {
  cartItem: CartItemPayloadType
  className?: string
}
const Item: FC<ItemProps> = ({ cartItem, className }) => {
  return (
    <div className={classNames('w-full rounded-lg bg-white', className)}>
      <div className='flex items-center py-2 gap-x-4'>
        <div className='w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] flex-shrink-0'>
          <img src={iphone1} className='object-contain w-full h-full' />
        </div>
        <div className='flex flex-col w-full gap-y-2'>
          <div className='w-[70%] line-clamp-2 text-[#3a3a3a] text-[16px] font-medium'>
            {cartItem.productVariant.product.name}
          </div>
          <div className='flex items-end justify-between w-full font-roboto gap-x-2'>
            <div className='flex items-end gap-x-2'>
              <span className='text-base font-semibold leading-none sm:text-lg text-primary'>
                {formatPrice(cartItem.productVariant.price)}
              </span>
              <span className='font-medium text-[#707070] text-xs sm:text-sm leading-none line-through'>
                {formatPrice(cartItem.productVariant.price * 1.2)}
              </span>
            </div>
            <div className='flex gap-x-2 '>
              <div className='text-sm font-medium leading-none text-slate-700 sm:text-base text-nowrap'>Số lượng:</div>
              <span className='text-sm font-medium leading-none sm:text-base text-primary'>{cartItem.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
